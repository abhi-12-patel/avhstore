'use client'; 
import Link from 'next/link';
import React from 'react';

const Part13Common = ({ imageUrl, title, linkHref = '#' }) => {
  return (

    <Link
      href={linkHref}
      className="block w-45 md:w-54 h-45 md:h-60 overflow-hidden group cursor-pointer transform transition-transform duration-500"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >

      <div className="relative w-full h-full group overflow-hidden">
  <img
    src={imageUrl}
    alt={title}
    className="w-full h-full object-cover transform transition-transform duration-300"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <img
      src="/pngwing.com.png" // Use your actual Instagram icon path here
      alt="Instagram"
      className="w-10 h-6.5"
    />
  </div>
</div>

    </Link>
  );
};

export default Part13Common;
