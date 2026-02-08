"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Heart, ShoppingBag, Info } from 'lucide-react';
import { useEffect,  useState } from "react";
const Footer = () => {
    const { getCartCount, wishlist } = useStore();
    const cartCount = getCartCount();
      const [isHydrated, setIsHydrated] = useState(false);
        useEffect(() => {
          setIsHydrated(true);
        }, []);
  const wishlistCount = wishlist.length;
  return (
    <footer className="bg-gradient-to-b from-card via-card to-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <h2 className="font-display text-2xl tracking-wide mb-4">
                <span className="gold-text-gradient font-semibold">AVH Store</span>
              </h2>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Crafting timeless elegance since 1987. Each piece tells a story of exceptional craftsmanship and enduring beauty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-lg mb-6 text-foreground">Shop</h3>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'New Arrivals', 'Bestsellers'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/collections?category=${item.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-display text-lg mb-6 text-foreground">Customer Care</h3>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', to: '/contact' },
                { label: 'About', to: '/about' },
                { label: 'Store Policy', to: '/store-policy' },
                { label: 'Return & Refund', to: '/return-refund-policy' },
                { label: 'Shipping Policy', to: '/shipping-policy' },
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    href={item.to}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store */}
          <div>
            <h3 className="font-display text-lg mb-6 text-foreground">Visit Us</h3>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <p>Flagship Atelier</p>
              <p>Open: 10:00 AM – 8:00 PM</p>
              <p>Phone: +91 90164 57163</p>
              <p>Email: hello@avhstore.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-body text-xs text-muted-foreground">
            © 2024 AVH Store. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
        <nav className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full">
        <div className="flex justify-between items-center gap-6 px-6 py-3 rounded-3 bg-primary text-primary-foreground shadow-lg">
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
            href="/about"
            className="flex flex-col items-center text-xs font-body tracking-wide"
            aria-label="About"
          >
            <Info size={18} />
            <span>About</span>
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
  );
};

export default Footer;
