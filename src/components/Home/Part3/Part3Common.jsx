'use client';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import React from 'react';

const Part3Common = ({ imageUrl, title, linkHref = '#' }) => {
  return (
    <Link
      href={linkHref}
      className="group flex w-full max-w-[400px] flex-col overflow-hidden cursor-pointer transition-transform duration-500"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if fallback also fails
            e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
          }}
        />
      </div>

      <div className="pt-3">
        <h3 className="w-full text-left text-base sm:text-lg text-gray-800">
          {title} →
        </h3>
      </div>
    </Link>
  );
};

export default Part3Common; 
