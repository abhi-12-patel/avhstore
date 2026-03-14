"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

// Custom Next Arrow - Adjusted for responsiveness
const NextArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Next slide"
    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
    onClick={onClick}
  >
    &#10095;
  </button>
);

// Custom Prev Arrow - Adjusted for responsiveness
const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Previous slide"
    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-sm backdrop-blur transition hover:bg-white"
    onClick={onClick}
  >
    &#10094;
  </button>
);

const ImageSlider = () => {
  const slides = [
    {
      img: '/earring.jpg',
      href: '/collections?category=earrings',
      title: 'Earrings',
      subtitle: 'Everyday sparkle, party ready shine. Find your perfect pair.',
    },
    {
      img: '/jewellerySet.jpg',
      href: '/collections?category=jewelleryset',
      title: 'Jewellery Sets',
      subtitle: 'Co-ordinated looks for weddings, festivals, and special days.',
    },
    {
      img: '/breslet.jpg',
      href: '/collections?category=bracelets',
      title: 'Bracelets',
      subtitle: 'Stack, style, repeat. Minimal to bold, all in one place.',
    },
    {
      img: '/nackles.jpg',
      href: '/collections?category=Pendants',
      title: 'Necklaces & Pendants',
      subtitle: 'Statement pieces and delicate drops, made to elevate every outfit.',
    },
    {
      img: '/jewellerySet.jpg',
      href: '/collections?category=rajwadiset',
      title: 'Rajwadi Sets',
      subtitle: 'Traditional designs with a royal touch for grand occasions.',
    },
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
        {slides.map((slide, i) => (
          <div key={i} className="relative h-100 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[600px] w-full"> {/* Responsive Height */}
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw" // More accurate sizes for Next.js Image optimization
              className="object-cover shadow-md"
              priority={i === 0} // Prioritize only the first image
            />

            {/* Readable overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Slide content */}
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="w-full px-4 pb-10 sm:px-8 sm:pb-12 md:px-12">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold tracking-widest text-white/85 uppercase">
                    New Collection
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                    {slide.subtitle}
                  </p>

                  <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                    <Link
                      href={slide.href}
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-white/90"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href="/collections"
                      className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Numeric Counter Below the Slider */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700 z-20"> {/* Adjusted bottom position, added z-index */}
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default ImageSlider;
