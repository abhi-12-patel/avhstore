'use client'

import React from 'react';

const SearchSection = () => {


  return (
    <div className="flex items-center justify-center bg-white pt-20 lg:pt-0 w-full text-black">
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center shadow-md w-full text-center">
        <h2 className="text-4xl font-normal text-gray-800 mb-8">Search</h2>

        {/* Removed onSubmit from the form as no form submission logic is desired */}
        <form className='w-auto md:min-w-md'>
          <div className="relative"> {/* Use relative positioning for the icon */}
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 pr-10" // Added rounded-md for consistency
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">

              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
