'use client'
import Link from "next/link";
import Part10Common from "./Part10Common";
import React, { useRef, useState, useEffect } from 'react';
import products from "./products";

const Part10 = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
      {/* Header and 'View all' for PC */}
      <h1 className="text-2xl py-0 lg:py-[5%]">Featured Products</h1> {/* Adjusted to text-2xl for consistency with Part3 */}
      

      <h1 className="text-sm pb-[3%] hidden md:block">Top Best Sellers</h1> {/* Keep this for desktop only */}

      {/* PC View Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 justify-items-center">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
              <Part10Common
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                linkHref={product.linkHref}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto whitespace-nowrap hidden-scrollbar gap-4 py-4 relative" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="inline-block w-48 flex-shrink-0"> {/* Adjusted width for smaller cards */}
            <Part10Common
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              linkHref={product.linkHref}
            />
          </div>
        ))}
      </div>

      {/* "View All" button for Mobile, and for PC when there's no "View all" in header */}
      <div className="border-1 flex border-[#01203D] w-fit justify-self-center mx-auto mt-8">
        <button className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3" >
          View All
        </button>
      </div>
    </div>
  );
};

export default Part10;