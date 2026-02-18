// This component can be a client component if you need client-side interactivity
// like form submission or state management for input fields.
// For a purely static UI, it can remain a server component.
// 'use client'; 

import React from 'react';

const LoginCard = () => {
  return (
    <div className="flex items-center pt-18 lg:pt-0 justify-center bg-white w-full text-black"> {/* Added responsive padding */}
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center shadow-md w-full text-center"> 
        <h2 className="text-4xl font-normal text-gray-800 mb-8">Login</h2>
        <form className='w-auto md:min-w-md'>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="text-left mb-6">
            <a href="/forgetpass" className="border-b-1 text-sm text-gray-600">
              Forgot your password?
            </a>
          </div>
             <div className="border-1 flex justify-self-center border-[#01203D] w-fit">
      <button className="flex justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3" >
        Sign In
      </button>
        </div>
        </form>
        <div className="mt-6">
          <a href="/signup" className="text-sm border-b-1  text-gray-600">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;