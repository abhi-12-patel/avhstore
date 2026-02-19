'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { products, collectionCategoryLinks } from '@/data';

const Header = () => {
  const pathname = usePathname();
  const logo = '/Logo.png';
  const { getCartCount, wishlist } = useStore();
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    measureHeaderHeight();
    window.addEventListener('resize', measureHeaderHeight);
    return () => window.removeEventListener('resize', measureHeaderHeight);
  }, [showAnnouncementBar, showSearchBar]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const oneThirdOfScreen = window.innerHeight / 3;

      if (currentScrollY > lastScrollY && currentScrollY > oneThirdOfScreen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setShowAnnouncementBar(currentScrollY < oneThirdOfScreen);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white text-black border-b border-gray-200 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {showAnnouncementBar && <AnnouncementBar />}

      {showSearchBar && (
        <div className="absolute left-0 right-0 z-40 bg-white text-gray-600 px-4 py-3 md:py-12 border-b border-gray-200 flex justify-center items-center md:px-6 lg:px-8">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or category"
              className="w-full border border-black p-3 pr-10 text-sm focus:outline-none"
            />
            <button
              onClick={() => {
                setShowSearchBar(false);
                setSearchQuery('');
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
            >
              x
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

      <div className="container mx-auto flex items-center px-4 py-3 md:px-6 lg:px-8">
        <div className="flex w-20 md:w-40 shrink-0 items-center space-x-3 md:space-x-4">
          <button
            className="shrink-0 text-gray-600 md:hidden"
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
            className="w-6 h-6 shrink-0 cursor-pointer text-gray-600 sm:block hidden"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        <div className="flex flex-1 justify-center text-center">
          <Link href="/">
            <Image
              src={logo}
              alt="TARAKAYA Artificial Logo"
              width={200}
              height={60}
              priority
              className="w-20 h-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex w-20 md:w-40 shrink-0 items-center justify-end space-x-3 text-gray-700 md:space-x-4 ">
              <svg
            onClick={() => setShowSearchBar(true)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6 shrink-0 cursor-pointer text-gray-600 lg:hidden block"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <Link href="/wishlist" className="relative shrink-0 sm:block hidden">
            <Heart size={20} />
            {isHydrated && wishlistCount > 0 && (
              <span className="absolute -top-3 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative shrink-0 sm:block hidden">
            <ShoppingBag size={20} />
            {isHydrated && cartCount > 0 && (
              <span className="absolute -top-3 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="hidden md:flex container mx-auto px-4 pt-2 pb-4 justify-center space-x-8 text-gray-700 text-sm tracking-wider">
        <Link href="/" className={`hover:text-gray-900 border-b-1 ${pathname === '/' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Home</Link>
        <Link href="/categories" className={`hover:text-gray-900 border-b-1 ${pathname === '/categories' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Categories</Link>
        <Link href="/shopall" className={`hover:text-gray-900 border-b-1 ${pathname === '/shopall' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Shop all</Link>
        <Link href="/contact" className={`hover:text-gray-900 border-b-1 ${pathname === '/contact' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Contact</Link>
        <Link href="/ourstory" className={`hover:text-gray-900 border-b-1 ${pathname === '/ourstory' ? 'border-b-black' : 'border-b-white'} hover:border-b-gray-900`}>Our Story</Link>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed left-0 w-[90%] bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
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
