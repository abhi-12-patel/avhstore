import Cart from '@/components/cart/Cart';
import React from 'react';

const EmptyCartSection = () => {
  return (
    <div className="flex flex-col pt-18 lg:pt-0  items-center justify-start bg-white w-full text-black"> {/* Adjusted for top alignment */}
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center w-full text-center"> 
        <h2 className="text-4xl font-normal text-gray-800 mb-8">Your cart is empty</h2>
        
        {/* Continue Shopping Button */}
        <div className="border-1 flex justify-self-center border-[#01203D] w-fit mb-16"> {/* Added margin bottom */}
          <button
            type="button"
            className="flex cursor-pointer justify-self-center bg-[#01203D] text-white border-white border-1 px-8 py-3"
          >
            Continue shopping
          </button>
        </div>

        {/* Have an account? Section */}
        <h3 className="text-xl font-normal text-gray-800 mb-4">Have an account?</h3>
        <div className="mb-16"> {/* Added margin bottom */}
          <a href="/login" className="text-sm border-b-1 text-gray-600">
            Log in to check out faster.
          </a>
        </div>

        {/* Free Wooden Celestial Boxes Section */}
        <h3 className="text-xl font-normal text-gray-800 mb-4">Free Wooden Celestial Boxes on orders above ₹ 899/-</h3>
        <p className="text-gray-600 mb-2 max-w-2xl"> {/* Added max-w-lg to constrain text width */}
          You will get one wooden box for free per order. for example, if you order 5 products you will get only one sustainable wooden box.
        </p>
        <p className="text-gray-600 mb-8 max-w-2xl"> {/* Added max-w-lg to constrain text width */}
          If you wish to get additional boxes please add them to your cart for Rs.199
        </p>
        
        {/* Add additional boxes Button */}
        <div className="border-1 flex justify-self-center border-[#E0E0E0] w-fit"> {/* Adjusted border color to light gray */}
          <button
            type="button"
            className="flex cursor-pointer justify-self-center bg-white text-gray-700 border-white border-1 px-8 py-3" // Changed button style
          >
            Add 1 additional Celestial boxes for Rs.199
          </button>
        </div>

      </div>
      <Cart/>
    </div>
  );
};

export default EmptyCartSection; 