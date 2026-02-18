"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

// Custom Next Arrow - Adjusted for responsiveness
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 md:right-8 lg:right-170 -bottom-[10%] -translate-y-1/2 z-10 text-gray-800 p-2 md:p-3 rounded-full cursor-pointer transition bg-transparent bg-opacity-70 hidden sm:block" // Added responsive classes, hidden on xs
    onClick={onClick}
  >
    &#10095;
  </div>
);

// Custom Prev Arrow - Adjusted for responsiveness
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 md:left-8 lg:left-170 -bottom-[10%] -translate-y-1/2 z-10 text-gray-800 p-2 md:p-3 rounded-full cursor-pointer transition bg-transparent bg-opacity-70 hidden sm:block" // Added responsive classes, hidden on xs
    onClick={onClick}
  >
    &#10094;
  </div>
);

const ImageSlider = () => {
  const images = [
    '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
    '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
    '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
    '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
    '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          arrows: false,
          dots: false, // Show dots on small screens

        }
      },
      {
        breakpoint: 768, // md
        settings: {
          arrows: false, // Show arrows from md up
          dots: false, // Show dots on small screens

        }
      },
      {
        breakpoint: 640, // sm
        settings: {
          arrows: false, // Hide arrows on small screens
          dots: false, // Show dots on small screens
        }
      },
       {
        breakpoint: 480, // xs (custom breakpoint, typically default in Tailwind is sm: 640px)
        settings: {
          arrows: false, // Hide arrows on very small screens
          dots: false, // Show dots on very small screens
        }
      }
    ]
  };

  return (
    <div className="relative pb-8 w-full border-1 border-gray-200 overflow-hidden"> {/* Added overflow-hidden */}
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="relative h-100 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[600px] w-full"> {/* Responsive Height */}
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw" // More accurate sizes for Next.js Image optimization
              className="object-cover shadow-md"
              priority={i === 0} // Prioritize only the first image
            />
            <Link href="/" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
              <button className='text-gray-200 border border-gray-400 py-2 px-4 md:py-3 md:px-6 bg-transparent cursor-pointer transition-all duration-300 text-sm sm:text-base md:text-lg'> {/* Responsive padding and text size */}
                Shop Now
              </button>
            </Link>
          </div>
        ))}
      </Slider>

      {/* Numeric Counter Below the Slider */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700 z-20"> {/* Adjusted bottom position, added z-index */}
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageSlider;