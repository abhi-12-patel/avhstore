'use client';

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import AnnouncementBar from './AnnouncementBar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { products, collectionCategoryLinks } from '@/data';
const Header = () => {
    const pathname = usePathname();
    const logo = `/Logo.png`;
  const { getCartCount, wishlist } = useStore();
    const headerRef = useRef(null); // Ref for the main header element
    const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
 const [isHydrated, setIsHydrated] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const cartCount = getCartCount();
   useEffect(() => {
    setIsHydrated(true);
  }, []);
  const wishlistCount = wishlist.length;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products
        .filter((product) => {
          const name = (product.name || product.title || '').toLowerCase();
          const category = (product.category || '').toLowerCase();
          return name.includes(normalizedQuery) || category.includes(normalizedQuery);
        })
        .slice(0, 8)
    : [];

  const filteredCategories = normalizedQuery
    ? collectionCategoryLinks.filter((item) => {
        const category = (item.to.split('category=')[1] || '').toLowerCase();
        const label = (item.label || '').toLowerCase();
        return category.includes(normalizedQuery) || label.includes(normalizedQuery);
      })
    : [];
    // Effect to measure header height
    useEffect(() => {
        const measureHeaderHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        // Measure on mount and on window resize
        measureHeaderHeight();
        window.addEventListener('resize', measureHeaderHeight);

        // Clean up event listener
        return () => window.removeEventListener('resize', measureHeaderHeight);
    }, [showAnnouncementBar]); // Re-measure if announcement bar visibility changes

    useEffect(() => {
  const handleScroll = () => {
    const currentScrollY   = window.scrollY;
    const oneThirdOfScreen = window.innerHeight / 3;

    // ─── Hide header when scrolling down past ⅓ screen ────────────
    if (currentScrollY > lastScrollY && currentScrollY > oneThirdOfScreen) {
      setIsVisible(false);          // slide header (and everything inside it) up
    } else {
      setIsVisible(true);           // slide it back down
    }

    // ─── AnnouncementBar visible only within first ⅓ screen ───────
    setShowAnnouncementBar(currentScrollY < oneThirdOfScreen);

    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);


    // Effect to prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            ref={headerRef} // Attach ref here
            className={`fixed  top-0 left-0 right-0 z-50 bg-white text-black border-b border-gray-200 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            {/* Announcement bar always on top */}
            {showAnnouncementBar && <AnnouncementBar />}

            {/* 🔍 Search Bar BELOW announcement bar */}
            {showSearchBar && (
                <div
                    className="absolute left-0 right-0 z-40 bg-white text-gray-600 px-4 py-3 md:py-12  border-b border-gray-200 flex justify-center items-center md:px-6 lg:px-8"
                    style={{ top: showAnnouncementBar ? '90px' : '0' }} // This `top` calculation might need adjustment depending on AnnouncementBar's actual height
                >
                    <div className="relative w-full max-w-xl mx-auto">
                        <input
                            type="text"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products or category"
                            className="w-full border border-black p-3 pr-10 text-sm focus:outline-none"
                        />
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197a7.5 7.5 0 1 0-10.607 0 7.5 7.5 0 0 0 10.607 0Z" />
                            </svg>
                        </div>
                        <button
                            onClick={() => {
                                setShowSearchBar(false);
                                setSearchQuery('');
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
                        >
                            ✕
                        </button>

                        {normalizedQuery && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg max-h-80 overflow-auto z-50">
                                {filteredCategories.length > 0 && (
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Categories</p>
                                        <div className="flex flex-col">
                                            {filteredCategories.map((item) => (
                                                <Link
                                                    key={`cat-${item.to}`}
                                                    href={item.to}
                                                    className="px-2 py-2 text-sm hover:bg-gray-50"
                                                    onClick={() => {
                                                        setShowSearchBar(false);
                                                        setSearchQuery('');
                                                    }}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3">
                                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Products</p>
                                    {filteredProducts.length > 0 ? (
                                        <div className="flex flex-col">
                                            {filteredProducts.map((product) => (
                                                <Link
                                                    key={`product-${product.id}`}
                                                    href={`/product/${product.id}`}
                                                    className="px-2 py-2 text-sm hover:bg-gray-50 flex justify-between gap-3"
                                                    onClick={() => {
                                                        setShowSearchBar(false);
                                                        setSearchQuery('');
                                                    }}
                                                >
                                                    <span className="truncate">{product.name || product.title}</span>
                                                    <span className="text-gray-500 text-xs capitalize">{product.category}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 px-2 py-2">No products found.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="container mx-auto flex justify-between items-center md:px-6 lg:px-8">
                {/* Left: Search Icon and Mobile Menu Toggle */}
                <div className="flex items-center space-x-4">
                    {/* Hamburger Icon for Mobile */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <svg
                        onClick={() => setShowSearchBar(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-gray-600"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>

                {/* Center: Logo */}
              {/* Center: Logo */}
<div className="flex justify-center text-center">
  <Image
    src={logo}
    alt="TARAKAYA Artificial Logo"
    width={200}
    height={60}
    priority
    className="w-20 sm:w-20 md:w-20 lg:w-20 h-auto object-contain"
  />
</div>


                {/* Right: Icons */}
                <div className="flex items-center space-x-4">
                    {/* <Link href="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 cursor-pointer text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link> */}
                    <Link href="/wishlist" className="relative">
                          <Heart  size={20} />
              {isHydrated && wishlistCount > 0 && (
                <span className="absolute -top-3 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                  {wishlistCount}
                </span>
              )}
                    </Link>
                    <Link href="/cart" className="relative">
                          <ShoppingBag size={20} />
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-3 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                  {cartCount}
                </span>
              )}
                    </Link>
                </div>
            </div>

            {/* Bottom Nav - Hidden on small screens, shown on medium and larger */}
            <nav className="hidden md:flex container mx-auto px-4 pt-2 pb-[2%] justify-center space-x-8 text-gray-700 text-sm tracking-wider">
                <Link href="/" className={`hover:text-gray-900 border-b-1 ${pathname === '/' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Home</Link>
                <Link href="/categories" className={`hover:text-gray-900 border-b-1 ${pathname === '/categories' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Categories</Link>
                <Link href="/shopall" className={`hover:text-gray-900 border-b-1 ${pathname === '/shopall' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Shop all</Link>
                <Link href="/contact" className={`hover:text-gray-900 border-b-1 ${pathname === '/contact' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Contact</Link>
                <Link href="/ourstory" className={`hover:text-gray-900 border-b-1 ${pathname === '/ourstory' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Our Story</Link>
            </nav>

            {/* Mobile Navigation Menu (visible only when isMobileMenuOpen is true and on small screens) */}
            {isMobileMenuOpen && (
                // Overlay
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
            <div
                className={`fixed left-0 w-[90%] bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    top: `${headerHeight}px`, // Position below the header
                    height: `calc(100vh - ${headerHeight}px)` // Full height minus header height
                }}
            >
                <nav className="flex flex-col items-start space-y-6 p-8">
                    <Link href="/" className={`hover:text-gray-900 text-lg ${pathname === '/' ? 'text-gray-900 font-semibold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/categories" className={`hover:text-gray-900 text-lg ${pathname === '/categories' ? 'text-gray-900 font-semibold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
                    <Link href="/shopall" className={`hover:text-gray-900 text-lg ${pathname === '/shopall' ? 'text-gray-900 font-semibold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Shop all</Link>
                    <Link href="/contact" className={`hover:text-gray-900 text-lg ${pathname === '/contact' ? 'text-gray-900 font-semibold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    <Link href="/ourstory" className={`hover:text-gray-900 text-lg ${pathname === '/ourstory' ? 'text-gray-900 font-semibold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
