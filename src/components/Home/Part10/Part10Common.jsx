'use client';
import Link from 'next/link';
import React from 'react';

const Part10Common = ({ imageUrl, title, linkHref = '#', price }) => {
  return (
    <Link
      href={linkHref}
      // Adjusted width and height for better fit in mobile horizontal scroll
      // On desktop, the grid parent will define the width, so w-full is effectively applied.
      // For mobile horizontal scroll, w-48 and h-60 gives better proportion.
      className="block w-full sm:w-50 sm:h-75 h-60 overflow-hidden group cursor-pointer transform transition-transform duration-500"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="w-full h-3/4 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-103 "
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if fallback also fails
            e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
          }}
        />
      </div>

      <div className="py-4 h-1/6 w-full flex-col items-center justify-center">
        <h3 className="text-sm font-extralight text-gray-800 w-full text-left hover:underline">
          {title} →
        </h3>
        <h3 className="text-md font-light text-gray-800 w-full text-left">
          From Rs.{price}
        </h3>
      </div>
    </Link>
  );
};

export default Part10Common;