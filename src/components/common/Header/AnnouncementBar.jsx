import React from "react";
import "./announcement.css"; // 👈 import css file

const AnnouncementBar = () => {
  return (
    <div className="bg-taraya-brown text-white text-xs tracking-wider overflow-hidden">

      {/* Welcome Text */}
      <p className="text-center py-2 text-gray-600">
        AVH Store ~ Welcome to our store
      </p>

      {/* Scrolling Offer Bar */}
      <div className="bg-[#01203D] overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            <span>🚚 Free Shipping on orders above ₹2999/-</span>
            <span>🎉 Get 3% OFF above ₹2999/-</span>
            <span>🔥 Get 5% OFF above ₹5999/-</span>
            <span>🔥 Get 7% OFF above ₹8999/-</span>

            {/* Duplicate for smooth loop */}
            <span>🚚 Free Shipping on orders above ₹2999/-</span>
            <span>🎉 Get 3% OFF above ₹2999/-</span>
            <span>🔥 Get 5% OFF above ₹5999/-</span>
            <span>🔥 Get 7% OFF above ₹8999/-</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnnouncementBar;
