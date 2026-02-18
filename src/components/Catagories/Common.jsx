'use client'; 
import Link from 'next/link';
import React from 'react';
import { useStore } from '@/store/useStore';

const Common = ({ id, imageUrl, title, linkHref = '#', price }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(id);



  return (
    <div
      className="block overflow-hidden group transform transition-transform duration-500"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <Link href={linkHref} className="block cursor-pointer">
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-103"
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
