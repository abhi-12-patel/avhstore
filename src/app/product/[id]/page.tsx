"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, Minus, Plus, Star, Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import SizeGuide from '@/components/product/SizeGuide';
import ProductImageSlider from '@/components/product/ProductImageSlider';
import { useProductStore } from '@/store/productStore';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, reviews, loadProducts, isLoading } = useProductStore();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const product = useMemo(() => 
    products.find((p) => p.id === id),
    [products, id]
  );

  const productReviews = useMemo(() => 
    reviews.filter((r) => r.productId === id),
    [reviews, id]
  );

  const relatedProducts = useMemo(() => 
    product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [],
    [products, product]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse font-body text-muted-foreground">
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Product Not Found</h1>
            <Link href="/collections" className="font-body text-primary hover:underline">
              Return to Collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-in', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
    toast.success('Added to cart');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
            <ChevronRight size={14} />
            <Link 
              href={`/collections?category=${product.category}`} 
              className="hover:text-foreground transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Images with Slider */}
            <ProductImageSlider images={product.images} productName={product.name} />

            {/* Details */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="px-3 py-1 bg-foreground text-background text-xs font-body uppercase tracking-wider">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {/* {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < Math.floor(product.rating) 
                          ? 'text-primary fill-current' 
                          : 'text-muted'
                      )}
                    />
                  ))} */}
                </div>
                {/* <span className="font-body text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span> */}
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-2xl text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* <p className="font-body text-muted-foreground leading-relaxed mb-8">
                {product.shortDescription}
              </p> */}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-sm text-foreground">Size</span>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="font-body text-sm text-primary hover:underline"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'w-12 h-12 border font-body text-sm transition-colors',
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <span className="font-body text-sm text-foreground block mb-3">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-body">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={cn(
                    'flex-1 py-4 font-body text-sm uppercase tracking-wider transition-colors',
                    product.inStock
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={cn(
                    'w-14 h-14 border flex items-center justify-center transition-colors',
                    inWishlist
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  )}
                >
                  <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
                </button>
              </div>

            </div>
          </div>

          {/* Tabs */}
          <div className="mb-20">
            <div className="flex border-b border-border mb-8">
              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  'px-6 py-4 font-body text-sm uppercase tracking-wider transition-colors border-b-2 -mb-px',
                  activeTab === 'description'
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                Description
              </button>
            </div>

            {activeTab === 'description' ? (
              <div className="max-w-3xl">
                <p className="font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl space-y-8">
                {productReviews.length === 0 ? (
                  <p className="font-body text-muted-foreground">
                    No reviews yet. Be the first to review this product.
                  </p>
                ) : (
                  productReviews.map((review) => (
                    <div key={review.id} className="pb-8 border-b border-border">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex">
                          {/* {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={cn(
                                i < review.rating
                                  ? 'text-primary fill-current'
                                  : 'text-muted'
                              )}
                            />
                          ))} */}
                        </div>
                        {review.verified && (
                          <span className="font-body text-xs text-primary uppercase tracking-wider">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-lg text-foreground mb-2">
                        {review.title}
                      </h4>
                      {/* <p className="font-body text-muted-foreground leading-relaxed mb-3">
                        {review.content}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {review.author} — {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p> */}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-foreground mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
};

export default ProductDetail;
