"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute hidden lg:flex right-[46%] -bottom-[7%] z-10 text-gray-800 p-2 rounded-full cursor-pointer transition"
    onClick={onClick}
  >
    &#10095;
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute hidden lg:flex left-[46%] -bottom-[7%] z-10 text-gray-800 p-2 rounded-full cursor-pointer transition"
    onClick={onClick}
  >
    &#10094;
  </div>
);

const Part12 = () => {
  const images = [
    '/IMG_3859.png',
    '/IMG_3859.png',
    '/IMG_3859.png',
    '/IMG_3859.png',
    '/IMG_3859.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <div className="relative pb-8 w-[95%]  lg:w-[72%] flex-col flex justify-self-center border-1 border-gray-200">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="relative h-[230px] lg:h-[500px] w-full">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover shadow-md"
            />
          </div>
        ))}
      </Slider>

      {/* Numeric Counter Below the Slider */}
      <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
};

export default Part12;
  