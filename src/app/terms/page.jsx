// This component is a static display of policy text.
// 'use client'; is not strictly necessary unless you plan to add interactivity later.

import React from 'react';

const TermsConditionsSection = () => {
  return (
    <div className="flex flex-col items-center justify-start pt-20 lg:pt-0 bg-white w-full text-black py-16 mainCatgeroryContainer">
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col items-center w-full max-w-2xl lg:max-w-xl text-left">
        
        <h1 className="text-4xl font-normal text-gray-800 mb-8 text-center">Terms and Conditions</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          Welcome to Tarakaya Artificial OPC private Limited! Before you start exploring our exquisite collection of sterling Artificial jewelry, please take a moment to read and understand our terms and conditions. By using our website and making a purchase, you agree to comply with these terms and conditions.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">1. Product Availability and Description</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          At Tarakaya Silver, we strive to provide accurate and detailed descriptions of our jewelry pieces. However, please note that the actual product may slightly differ in appearance due to variations in lighting and natural variations in crystals. We maintain the originality in our photographs to the utmost extent, but it's important to embrace the beauty of their natural variations.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">2. Ordering and Shipping</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Once you place an order, it will take 2-3 working days for order processing of readymade products. For made-to-order products like bracelets, it will take 3-4 working days (you will be informed if it will take more time). We offer free delivery and currently ship through Shree Maruti, Delivery Courier, and Indian Speed Post. If you require faster shipping, express services are available at an additional cost. The estimated delivery time is 4-7 working days after dispatch, depending on your location. However, please note that delays may occur due to local postal services, weather conditions, and unforeseen circumstances. We kindly request that you wait for at least 8-10 working days from the dispatch date before raising any concerns regarding the delivery. Please also check with your family members or security guard in case they received the parcel on your behalf.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">3. Returns and Refunds</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At Tarakaya Silver, we do not offer returns or refunds unless there has been severe damage during the shipping process. In case a defective product has arrived, we accept returns with a full refund, but it is mandatory to send an unboxing video of the package. No claims will be accepted without the unboxing video. If an incorrect item has been sent, we will require photos/videos of the package, items, and invoice to rectify the mistake. Please note that you must ship the incorrect item back to us before we send the correct item within 7 days.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          For any complaints or concerns, please contact us at <a href="mailto:abhihothi524@gmail.com" className="text-blue-600 hover:underline">abhihothi524@gmail.com</a>.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">4. Contact Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you need to reach out to us for any reason, here are our contact details:
        </p>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-8">
          <li className="mb-2"><strong>Trade name:</strong> Tarakaya Silver</li>
          <li className="mb-2"><strong>Phone number:</strong> 7004515415</li>
          <li className="mb-2"><strong>Email:</strong> <a href="mailto:abhihothi524@gmail.com" className="text-blue-600 hover:underline">abhihothi524@gmail.com</a></li>
          <li className="mb-4"><strong>Physical address:</strong> SHREE JEWELLERS Kani bazar, 38A house number, 825301 Hazaribagh JH, India</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-8">
          Thank you for choosing Tarakaya Silver. We hope you enjoy your shopping experience and find the perfect jewelry piece to elevate your style.
        </p>

      </div>
    </div>
  );
};

export default TermsConditionsSection;