'use client';

import React from 'react';
import Slider from 'react-slick';
import Part4Common from './Part4Common';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute -left-[5%] z-10 text-gray-200 text-4xl cursor-pointer"
    style={{ background: 'none', top: '40%', transform: 'translateY(-50%)' }}
  >
    &#10094;
  </div>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute -right-[5%] z-10 text-gray-200 text-4xl cursor-pointer"
    style={{ background: 'none', top: '40%', transform: 'translateY(-50%)' }}
  >
    &#10095;
  </div>
);

const Part4 = () => {
  const carouselItems = [
    { id: 1, p4comment: "This product exceeded my expectations!", p4img: "/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg", p4name: "Alice Smith" },
    { id: 2, p4comment: "Absolutely love it!", p4img: "/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg", p4name: "Bob Johnson" },
    { id: 3, p4comment: "A fantastic purchase.", p4img: "/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg", p4name: "Charlie Brown" },
    { id: 4, p4comment: "Great value for money.", p4img: "/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg", p4name: "Diana Prince" },
    { id: 5, p4comment: "Stunning piece!", p4img: "/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg", p4name: "Eve Adams" },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="text-gray-600 flex flex-col justify-center py-10 px-5 items-center w-full">
      <h1 className="text-2xl">Our high vibe tribe</h1>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
        ))}
      </div>
      <h2>from 53 reviews</h2>

      <div className="w-full max-w-5xl px-4 py-5 relative">
        <Slider {...settings}>
          {carouselItems.map((item) => (
            <Part4Common
              key={item.id}
              p4comment={item.p4comment}
              p4img={item.p4img}
              p4name={item.p4name}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Part4;
