'use client'
import Link from "next/link";
import Part5Common from "./Part5/Part5Common"; // Ensure this path is correct
import React, { useRef, useState, useEffect } from 'react';

const Part11 = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const products = [
    {
      id: 1,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', // Replace with your actual image path
      title: 'Rings Artificial 925',
      linkHref: '/product/1',
    },
    {
      id: 2,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', // Placeholder
      title: 'Pendants',
      linkHref: '/product/2',
    },
    {
      id: 3,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', // Placeholder
      title: 'Artificial 925 Earrings',
      linkHref: '/product/3',
    },
    {
      id: 4,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', // Placeholder
      title: 'Nose rings / Nose pins / Septums / Clip ons',
      linkHref: '/product/4',
    },
    // You can add more product items here if needed for testing horizontal scroll
    {
      id: 5,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
      title: 'Bracelets Gold Plated',
      linkHref: '/product/5',
    },
    {
      id: 6,
      imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
      title: 'Necklaces Pearl',
      linkHref: '/product/6',
    },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
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
      {/* Header for PC and Mobile */}
      <h1 className="text-2xl py-0 lg:py-[5%]">Most unique Pinterest Collections</h1> {/* Adjusted to text-2xl for consistency with Part3 */}
      {/* PC View Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((product) => (
          <Part5Common
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            linkHref={product.linkHref}
          />
        ))}
      </div>

      {/* Mobile View Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto whitespace-nowrap hidden-scrollbar gap-4 py-4 relative" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="inline-block w-48 flex-shrink-0"> {/* Adjusted width for smaller cards */}
            <Part5Common
              imageUrl={product.imageUrl}
              title={product.title}
              linkHref={product.linkHref}
            />
          </div>
        ))}
      </div>

      {/* "View All" button for Desktop */}
      <div className="border-1 hidden lg:flex border-[#01203D] w-fit justify-self-center mx-auto mt-8">
        <button className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3" >
          View All
        </button>
      </div>
    </div>
  );
};

export default Part11;