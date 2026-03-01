'use client'; 
import Link from 'next/link';
import React from 'react';
import { useStore } from '@/store/useStore';
import ImageWithFallback from '../ImageWithFallback';

const Common = ({ id, imageUrl, title, linkHref = '#', price }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(id);



  return (
    <div
      className="block w-full max-w-[280px] overflow-hidden group transform transition-transform duration-500"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <Link href={linkHref} className="block cursor-pointer">
        {/* Image Section */}
        <div className="w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
            }}
          />
        </div>

        {/* Text Section */}
        <div className="py-4 w-full flex-col items-center justify-center">
          <h3 className="text-md font-extralight text-gray-800 w-full text-left hover:underline">
            {title} →
          </h3>
          <h3 className="text-md font-light text-gray-800 w-full text-left"></h3>
        </div>
      </Link>

   
    </div>
  );
};

export default Common;
