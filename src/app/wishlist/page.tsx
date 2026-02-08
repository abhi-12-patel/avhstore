"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleMoveToCart = (productId: string) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (item) {
      // For items with sizes, we'd normally show a size selector
      // For now, just add without size
      addToCart(item.product, 1);
      removeFromWishlist(productId);
      toast.success('Moved to cart');
    }
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl text-foreground mb-4">Your Wishlist</h1>
            <p className="font-body text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <Heart size={64} className="mx-auto mb-6 text-muted-foreground/30" />
              <h2 className="font-display text-2xl text-foreground mb-4">
                Your wishlist is empty
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Save your favorite pieces to revisit later. Click the heart icon on any product to add it to your wishlist.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map(({ product }) => (
                <div key={product.id} className="group">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                          <span className="px-4 py-2 bg-muted text-muted-foreground font-body text-sm uppercase">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="text-center">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    {/* <p className="font-body text-sm text-muted-foreground mb-2">
                      {product.shortDescription}
                    </p> */}
                    <p className="font-body text-foreground mb-4">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleMoveToCart(product.id)}
                        disabled={!product.inStock}
                        className="flex-1 max-w-[160px] py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-3 border border-border hover:border-destructive hover:text-destructive transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
