'use client';
import Link from 'next/link';
import React from 'react';

const Part3Common = ({ imageUrl, title, linkHref = '#' }) => {
  return (
    <Link
      href={linkHref}
      className="block w-full h-auto overflow-hidden group cursor-pointer transform transition-transform duration-500"
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

      <div className="py-4 h-1/6 w-full flex items-center justify-center">
        <h3 className="text-lg text-gray-800 w-full text-left">
          {title} →
        </h3>
      </div>
    </Link>
  );
};

export default Part3Common; 