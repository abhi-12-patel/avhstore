// import React, { useState, useEffect, useRef } from 'react';

// Part4Common component, now explicitly using a standard <img> tag
const Part4Common = ({ p4comment, p4img, p4name }) => {
  return (
    // Set a fixed width for consistent carousel item sizing
    <div className="flex flex-col items-center p-4 mx-2 w-[280px] flex-shrink-0">
      {/* Star rating display */}
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
        <span className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
        <span className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
        <span className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
        <span className="text-yellow-500 pr-1 font-bold antialiased">⭐</span>
      </div>
      {/* Comment section */}
      <h1 className="text-center text-gray-700 text-sm h-12 overflow-hidden">{p4comment}</h1>
      {/* Image and Name section */}
      <div className="flex flex-col items-center">
        {/* Using standard <img> tag instead of next/image */}
        <img
          src={p4img}
          alt={p4name}
          className=" w-16 h-25 object-cover mb-2" // Adjusted size for profile picture look
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=User`; // Fallback for image
          }}
        />
        <h1 className="text-md font-semibold text-gray-900">{p4name}</h1>
      </div>
    </div>
  );
};
export default Part4Common