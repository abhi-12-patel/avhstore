"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc =
    product?.image ||
    product?.imageUrl ||
    product?.images?.[0] ||
    "/placeholder.jpg";

  const productName = product?.name || product?.title || "Product";
  const productPrice = Number(product?.price) || 0;
  const isBestSelling = product?.isBestseller || product?.isBestSeller;

  const wished = mounted ? isInWishlist(product?.id) : false;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product,1,'Free Size');
  };

  // INR format
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(productPrice);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Image Section */}
      <Link
        href={`/product/${product.id}`}
        className="block aspect-square overflow-hidden bg-gray-100 relative"
      >
        <ImageWithFallback
          src={imageSrc}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isBestSelling && (
            <span className="bg-amber-400 text-black text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider shadow-md w-fit">
              BEST SELLING
            </span>
          )}
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider shadow-md w-fit">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/20 p-2 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition z-10"
          aria-label="Wishlist"
        >
          <Heart
            className={`h-4 w-4 transition ${
              wished ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Add to Cart Icon */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 p-2 bg-black text-white rounded-full shadow-md hover:scale-110 transition z-10"
          aria-label="Add to Cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </Link>

      {/* Description Section */}
      <div className="bg-white p-4 border-t border-gray-100 space-y-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm truncate font-semibold text-gray-900 hover:text-black transition">
            {productName}
          </h3>
        </Link>

        <p className="text-base font-bold text-gray-900">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
