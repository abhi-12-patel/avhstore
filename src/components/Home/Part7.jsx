'use client'
import Link from "next/link";
import Part5Common from "@/components/Home/Part5/Part5Common"; // Ensure this path is correct
import React, { useRef, useState, useEffect } from 'react';
import ProductCard from "../common/productCart/ProductCart";
import { products } from "@/data";

const Part7 = () => {
   const scrollContainerRef = useRef(null);
   const getShuffled = (list) => [...list].sort(() => Math.random() - 0.5);
   const newProducts = products.filter((item) => item?.isNew && item.inStock);
 
   const getFeaturedProducts = () => {
     return getShuffled(newProducts).slice(0, 5);
   };
 
   // Deterministic first render to avoid server/client HTML mismatch.
   const [featuredProducts, setFeaturedProducts] = useState(() =>
     newProducts.slice(0, 5)
   );
 
   useEffect(() => {
     setFeaturedProducts(getFeaturedProducts());
     const intervalId = setInterval(() => {
       setFeaturedProducts(getFeaturedProducts());
     }, 60000);
 
     return () => {
       clearInterval(intervalId);
     };
   }, []);

  return (
       <div className="text-gray-600 px-4 py-8 md:px-[14%]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header and 'View all' for PC */}
            <h1 className="text-2xl">Most Loved</h1>
            <span className="text-2xl">Bestsellers</span>

      {/* PC View Grid */}
      <div className="hidden md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {featuredProducts.map((product) => (
          <div key={product.id} className="w-full max-w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Mobile View Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto whitespace-nowrap hidden-scrollbar gap-4 py-4 relative" ref={scrollContainerRef}>
        {featuredProducts.map((product) => (
          <div key={product.id} className="inline-block w-48 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* "View All" button for Mobile, and for PC when there's no "View all" in header */}
      <div className="border-1 flex border-[#01203D] w-fit justify-self-center mx-auto mt-8"> {/* Added mx-auto and mt-8 */}
        <Link href="collections?category=bestselling"className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3" >
          View All
        </Link>
      </div>
    </div>
  );
};

export default Part7;
