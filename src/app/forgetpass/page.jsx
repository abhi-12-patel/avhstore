// This component can be a client component if you need client-side interactivity
// like form submission or state management for input fields.
// For a purely static UI, it can remain a server component.
// 'use client'; 

import React from 'react';

const ResetPasswordSection = () => {
  return (
    <div className="flex items-center justify-center bg-white pt-20 lg:pt-0 w-full text-black">
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center shadow-md w-full text-center"> 
        <h2 className="text-4xl font-normal text-gray-800 mb-2">Reset your password</h2> {/* Adjusted mb- for text below */}
        <p className="text-gray-600 mb-8">We will send you an email to reset your password</p> {/* Added descriptive text */}
        <form className='w-auto md:min-w-md'>
          <div className="mb-6"> {/* Increased mb- for spacing before button */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="border-1 flex justify-self-center border-[#01203D] w-fit">
            <button
              type="submit"
              className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-6">
          <a href="/login" className="text-sm border-b-1 text-gray-600">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSection;