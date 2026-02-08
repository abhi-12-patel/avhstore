"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { toast } from '../ui/sonner';
import ImageWithFallback from "../ui/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist,addToCart } = useStore();
  const inWishlist = isInWishlist(product.id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasMultipleImages = product.images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };
  const handleAddToCart = (e: React.MouseEvent) => {
    if (product.sizes && product.sizes.length > 0) {
      toast.error('Please select a size on the product page');
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('Added to cart');
  };
  return (
    <Link 
      href={`/product/${product.id}`}
      className={cn(
        'group block',
        className
      )}
    >
      <div className="relative overflow-hidden bg-cream  aspect-[3/4] mb-4">
        {/* Product Image */}
        <ImageWithFallback
          src={product.images[currentIndex]}
          alt={`${product.name} image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Wishlist Button */}
       <button
  onClick={handleWishlistClick}
  className={cn(
    'absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10',
    inWishlist
      ? 'bg-primary text-primary-foreground'
      : 'bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground'
  )}
  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
>
  <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
</button>


        {/* Image Slider Controls */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-foreground" />
            </button>
          </>
        )}

        {/* Badges */}
        {/* Badges */}
<div className="
  absolute top-2 left-2 
  flex flex-col gap-1 
  sm:top-4 sm:left-4 sm:gap-2
  z-10
">
  {product.isNew && (
    <span className="
      px-2 py-0.5 
      sm:px-3 sm:py-1
      bg-foreground text-background 
      text-[10px] sm:text-xs 
      font-body uppercase tracking-wider
      rounded
      w-fit
    ">
      New
    </span>
  )}

  {product.isBestseller && (
    <span className="
      px-2 py-0.5 
      sm:px-3 sm:py-1
      bg-primary text-primary-foreground 
      text-[10px] sm:text-xs 
      font-body uppercase tracking-wider
      rounded
      w-fit
    ">
      Bestseller
    </span>
  )}

  {product.originalPrice && (
    <span className="
      px-2 py-0.5 
      sm:px-3 sm:py-1
      bg-rose text-background 
      text-[10px] sm:text-xs 
      font-body uppercase tracking-wider
      rounded
      w-fit
    ">
      Sale
    </span>
  )}

  {!product.inStock && (
    <span className="
      px-2 py-0.5 
      sm:px-3 sm:py-1
      bg-muted text-muted-foreground 
      text-[10px] sm:text-xs 
      font-body uppercase tracking-wider
      rounded
      w-fit
    ">
      Sold Out
    </span>
  )}
</div>

        {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
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
          {product.originalPrice && (
            <span className="px-3 py-1 bg-rose text-background text-xs font-body uppercase tracking-wider">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-body uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div> */}

        {/* Quick Add - shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-background text-foreground font-body text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Slider Dots */}
      {hasMultipleImages && (
        <div className="flex justify-center gap-2 mb-4 -mt-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                currentIndex === index ? 'bg-primary' : 'bg-muted'
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-display text-base sm:text-lg text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        {/* <p className="font-body text-[11px] sm:text-xs text-muted-foreground mb-2 uppercase tracking-wider line-clamp-1">
          {product.shortDescription}
        </p> */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-body text-sm sm:text-base text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm sm:text-base text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Rating */}
        {/* <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-3 h-3',
                i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-muted'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="font-body text-xs text-muted-foreground ml-1">
            ({product.reviewCount})
          </span>
        </div> */}
      </div>
    </Link>
  );
};

export default ProductCard;
