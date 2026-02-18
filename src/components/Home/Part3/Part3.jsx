'use client'
import Link from "next/link";
import Part3Common from "./Part3Common";
import React, { useRef, useState, useEffect } from 'react';
import { categories } from "@/data";

const Part3 = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Explicitly defined product items with unique image URLs and titles


  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust as needed
      scrollContainerRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  return (
    <div className="text-gray-600 px-4 py-8 md:px-[14%]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header and 'View all' for PC */}
      <h1 className="text-2xl py-0  text-center lg:py-[5%]">Shop By Category</h1>
      <div className="flex md:hidden justify-between items-center mb-8">
        <Link href="/categories" className="text-[#000000] relative -top-5 justify-end w-full text-sm flex lg:hidden underline underline-offset-2">
          View all
        </Link>
      </div>

      {/* Header for Mobile */}


      {/* PC View Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {categories.map((product) => (
          <Part3Common
            key={product.id}
            imageUrl={product.image}
            title={product.name}
            linkHref={`/collections?category=${product.id}`}
          />
        ))}
      </div>

      {/* Mobile View Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto whitespace-nowrap hidden-scrollbar gap-4 py-4 relative" ref={scrollContainerRef}>
        {/* Removed explicit left/right arrow buttons here to match image's implicit arrows */}
        {categories.map((product) => (
          <div key={product.id} className="inline-block w-48 flex-shrink-0"> {/* Adjusted width for smaller cards */}
            <Part3Common
              imageUrl={product.image}
              title={product.name}
              linkHref={`/collections?category=${product.id}`}
            />
          </div>
        ))}
      </div>

      {/* "View All" button gorisfor Mobile, and for PC when there's no "View all" in header */}
      <div className="border-1 hidden lg:flex border-[#01203D] w-fit justify-self-center ">
        <Link href="/categories"className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3" >
          View All
        </Link>
      </div>
    </div>
  );
};

export default Part3;
