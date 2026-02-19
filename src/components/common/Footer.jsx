'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Info, ShoppingBag, Store } from 'lucide-react';
import { useStore } from '@/store/useStore';

const logo = "/Logo.png";

const Footer = () => {
  const pathname = usePathname();
    const { getCartCount, wishlist } = useStore();
    const cartCount = getCartCount();
      const [isHydrated, setIsHydrated] = useState(false);
        useEffect(() => {
          setIsHydrated(true);
        }, []);
  const wishlistCount = wishlist.length;
  const quickLinks = [
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Return and Refund Policy', href: '/retunpolicy' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Terms and Conditions', href: '/terms' },
    { name: 'Terms of service', href: '/terms-of-service' },
    { name: 'Size Guide', href: '/size-guide' },
  ];

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
  ];

  return (
    <>
    <footer className="mt-auto border-t border-stone-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* CENTER LOGO */}
       

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 lg:grid-cols-3 md:text-left">

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-stone-900">
              Crafted for everyday elegance
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Artificial pieces designed to be worn daily, gifted often, and remembered always.
            </p>

            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              <a href="#" className="rounded-full border border-stone-300 p-2.5 text-stone-700 hover:border-stone-900 hover:text-stone-900 transition">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="rounded-full border border-stone-300 p-2.5 text-stone-700 hover:border-stone-900 hover:text-stone-900 transition">
                <FaPinterestP className="text-sm" />
              </a>
              <a href="#" className="rounded-full border border-stone-300 p-2.5 text-stone-700 hover:border-stone-900 hover:text-stone-900 transition">
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>
 <div className="flex justify-center mb-10">
          <Image
            src={logo}
            alt="AVH Store Jewels Logo"
            width={180}
            height={60}
            className="h-auto object-contain"
            priority
          />
        </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition hover:text-stone-900 ${
                      pathname === link.href
                        ? 'font-medium text-stone-900 underline underline-offset-4'
                        : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          

        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-stone-200 pt-6 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 AVH Store Jewels. All rights reserved.</p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-300 px-3 py-1">Visa</span>
            <span className="rounded-full border border-stone-300 px-3 py-1">Mastercard</span>
            <span className="rounded-full border border-stone-300 px-3 py-1">RuPay</span>
            <span className="rounded-full border border-stone-300 px-3 py-1">UPI</span>
          </div>
        </div>

      </div>
      <nav className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full">
        <div className="flex justify-between items-center gap-6 px-6 py-3 rounded-3 bg-[#01203D] py-[0.9%] text-primary-foreground shadow-lg">
          <Link
            href="/cart"
            className="relative flex flex-col items-center text-xs font-body tracking-wide"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {isHydrated && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-background text-foreground text-[10px] rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/ourstory"
            className="flex flex-col items-center text-xs font-body tracking-wide"
            aria-label="Our Story"
          >
            <Info size={18} />
            <span>Our Story</span>
          </Link>
          <Link
            href="/wishlist"
            className="relative flex flex-col items-center text-xs font-body tracking-wide"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            <span>Like</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-background text-foreground text-[10px] rounded-full flex items-center justify-center font-body">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </footer>
   
    </>
  );
};

export default Footer;
