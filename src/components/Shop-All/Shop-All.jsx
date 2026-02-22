'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import ImageWithFallback from '../ImageWithFallback';

const ShopAll = ({
  id,
  imageUrl,
  title,
  linkHref,
  price,
  productData,
  inStock = true,
  // material = 'Premium Silver',
  isNew = false,
  isBestseller = false,
}) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [mounted, setMounted] = useState(false);
  const normalizedId = String(id ?? productData?.id ?? '');

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted ? isInWishlist(normalizedId) : false;

  const safeHref =
    typeof linkHref === 'string' && linkHref.trim().length > 0
      ? linkHref
      : id
      ? `/product/${id}`
      : '/shopall';

  const product = {
    ...(productData || {}),
    id: normalizedId,
    name: productData?.name || title || 'Product',
    title: productData?.title || title || productData?.name || 'Product',
    price: Number(productData?.price ?? price) || 0,
    image: productData?.image || productData?.imageUrl || imageUrl || productData?.images?.[0] || '/placeholder.jpg',
    imageUrl: productData?.imageUrl || imageUrl || productData?.images?.[0] || '/placeholder.jpg',
    images:
      Array.isArray(productData?.images) && productData.images.length > 0
        ? productData.images
        : [productData?.image || productData?.imageUrl || imageUrl || '/placeholder.jpg'],
    category: productData?.category || '',
    material: productData?.material || '',
    stone: productData?.stone || '',
    inStock: productData?.inStock ?? inStock,
    isNew: productData?.isNew ?? isNew,
    isBestseller: productData?.isBestseller ?? isBestseller,
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1, 'Free Size');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      return;
    }
    addToWishlist(product);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      
      {/* IMAGE */}
      <Link href={safeHref} className="relative block aspect-square overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          // style={{ width: "300px", height: "300px" }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found';
          }}
        />

        {/* Soft Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10"></div>
      </Link>

      {/* BADGES */}
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        {isNew && (
          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-md">
            New
          </span>
        )}
        {isBestseller && (
          <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black shadow-md">
            Best Seller
          </span>
        )}
      </div>

      {/* WISHLIST BUTTON */}
      <button
        onClick={handleWishlist}
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 z-10"
        aria-label="Toggle wishlist"
      >
        <FaHeart
          className={`h-4 w-4 transition-colors duration-300 ${
            inWishlist ? 'text-red-500 scale-110' : 'text-gray-400'
          }`}
        />
      </button>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`absolute bottom-[90px] right-4 z-10 rounded-full p-3 shadow-lg transition-all duration-500 ${
          product.inStock
            ? 'bg-black text-white opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 hover:bg-gray-800'
            : 'bg-gray-300 text-gray-500 opacity-100 cursor-not-allowed'
        }`}
        aria-label="Add to cart"
      >
        <FaShoppingBag className="h-4 w-4" />
      </button>

      {/* CONTENT */}
      <div className="p-5">
        <Link href={safeHref}>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-black">
            {product.name || product.title}
          </h3>
        </Link>

        {/* <p className="mb-1 text-xs text-gray-400 tracking-wide">{material}</p> */}

        <p className="text-lg font-bold text-black">
          ₹ {product.price.toLocaleString()}
        </p>
        {!product.inStock && (
          <p className="text-xs font-semibold text-red-600 mt-1">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ShopAll;
