"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Search, Menu, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
const collectionCategories = [
  { to: '/collections?category=earrings', label: 'Ear Rings' },
  { to: '/collections?category=jewelleryset', label: 'Jewellery Sets' },
  // { to: '/collections?category=newly-launched', label: 'Newly Launched' },
  // { to: '/collections?category=bracelets', label: 'Bracelets' },
  // { to: '/collections?category=bangle-bracelets', label: 'Bangle Bracelets' },
  // { to: '/collections?category=rings', label: 'Rings' },
  // { to: '/collections?category=scrunchies', label: 'Scrunchies' },
  // { to: '/collections?category=handpicked', label: 'Handpicked' },
  // { to: '/collections?category=hair-pins', label: 'Hair Pins/Slides' },
  // { to: '/collections?category=hair-bows', label: 'Hair Bows' },
  // { to: '/collections?category=stud-earrings', label: 'Stud Earrings' },
  // { to: '/collections?category=keychains', label: 'Keychains' },
  // { to: '/collections?category=layered-necklaces', label: 'Layered Necklaces' },
  // { to: '/collections?category=combo-sets', label: 'Combo Sets' },
  // { to: '/collections?category=hampers', label: 'Hampers' },
  // { to: '/collections?category=unisex-necklaces', label: 'Unisex Necklaces' },
  // { to: '/collections?category=unisex-bracelets', label: 'Unisex Bracelets' },
  // { to: '/collections?category=anklets', label: 'Anklets' },
];

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const { getCartCount, wishlist } = useStore();
  
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navLinks = [
    { to: '/collections', label: 'Collections', hasDropdown: true },
    { to: '/about', label: 'About' },
    { to: '/store-policy', label: 'Policy' },
  ];

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query && !searchCategory) return;
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (searchCategory) params.set('category', searchCategory);
    router.push(`/collections?${params.toString()}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchCategory('');
  };

  return (
  <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-xs font-body tracking-wider uppercase">
          Complimentary Shipping on Orders Over ₹1000
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b border-border">
                {/* <SheetTitle className="font-display text-xl gold-text-gradient text-left">
                  LUMIÈRE
                </SheetTitle> */}
                  <img
    src="/logo.png"
    alt="AVH Store logo"
    className="w-9 h-9 object-contain"
  />
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)]">
                <nav className="p-4">
                  <div className="space-y-4">
                    <div className="font-display text-lg text-foreground mb-2">Collections</div>
                    <div className="pl-2 space-y-2">
                      {collectionCategories.map((cat) => (
                        <Link
                          key={cat.to}
                          href={cat.to}
                          onClick={() => setIsMenuOpen(false)}
                          className="block font-body text-sm text-foreground/80 hover:text-primary transition-colors py-1"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border space-y-3">
                      <Link
                        href="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-body text-base text-foreground/80 hover:text-primary transition-colors"
                      >
                        About
                      </Link>
                      <Link
                        href="/store-policy"
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-body text-base text-foreground/80 hover:text-primary transition-colors"
                      >
                        Store Policy
                      </Link>
                      <Link
                        href="/return-refund-policy"
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-body text-base text-foreground/80 hover:text-primary transition-colors"
                      >
                        Return & Refund
                      </Link>
                      <Link
                        href="/shipping-policy"
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-body text-base text-foreground/80 hover:text-primary transition-colors"
                      >
                        Shipping Policy
                      </Link>
                    </div>
                  </div>
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Logo */}
        {/* Logo */}
<Link
  href="/"
  className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 flex items-center gap-2"
>
  <img
    src="/logo.png"
    alt="AVH Store"
    className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
  />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsCollectionsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsCollectionsOpen(false)}
              >
                <Link
                  href={link.to}
                  className="flex items-center gap-1 font-body text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors uppercase"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </Link>
                
                {/* Collections Dropdown */}
                {link.hasDropdown && isCollectionsOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-background border border-border shadow-lg py-2 max-h-[70vh] overflow-y-auto">
                      {collectionCategories.map((cat) => (
                        <Link
                          key={cat.to}
                          href={cat.to}
                          className="block px-4 py-2 font-body text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                          onClick={() => setIsCollectionsOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-2 pt-2">
                        <Link
                          href="/collections"
                          className="block px-4 py-2 font-body text-sm text-primary hover:bg-secondary transition-colors"
                          onClick={() => setIsCollectionsOpen(false)}
                        >
                          View all collections
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/wishlist"
              className=" hidden md:flex relative p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {isHydrated && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="hidden md:flex relative p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isSearchOpen ? 'max-h-40 pb-4' : 'max-h-0'
          )}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name or category..."
              className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
    
    </header>
  );
};

export default Header;
