// This component is a static display of policy text.
// 'use client'; is not strictly necessary unless you plan to add interactivity later.

import React from 'react';

const ShippingPolicySection = () => {
  return (
    <div className="flex flex-col items-center pt-20 lg:pt-0 justify-start bg-white w-full text-black py-16">
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col items-center w-full max-w-2xl lg:max-w-xl text-left">
        
        <h1 className="text-4xl font-normal text-gray-800 mb-8 text-center">Shipping policy</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          At Tarakaya Silver, we strive to provide a seamless and efficient shipping experience for our customers. Please take a moment to familiarize yourself with our shipping policy to ensure a smooth delivery process.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Free Delivery</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          We are pleased to offer free delivery on all orders. This means that you can enjoy our exquisite jewelry pieces without any additional shipping costs.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Order Processing Time</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Once your order is confirmed, our team will begin processing it promptly. For readymade products, please allow 2-3 working days for order processing. If you have ordered a made-to-order product, such as bracelets, please allow 3-4 working days for processing. In some cases, if additional time is required, we will inform you accordingly.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Shipping Options</h2>
        <p className="text-gray-700 text-left w-full leading-relaxed mb-2">
          We currently offer the following shipping options:
        </p>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed text-left w-full mb-4">
          <li className="mb-2">Shree Maruti</li>
          <li className="mb-2">Delivery Courier (Private)</li>
          <li className="mb-4">Indian Speed Post</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-8">
          If you require a faster shipping service, such as Fastrack or express delivery, please note that additional shipping costs may apply.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Estimated Delivery Time</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Once your order has been dispatched, the estimated delivery time is 4-7 working days, depending on your location. However, please keep in mind that delays can occur due to factors beyond our control, such as local postal services, weather conditions, and unforeseen circumstances.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          We kindly request that you wait for at least 8-10 working days from the dispatch date before raising any concerns regarding the delivery. In some cases, the delivery may have been received by a family member or security guard without your knowledge, so we recommend checking with them first.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          If you have any further questions or concerns regarding our shipping policy, please do not hesitate to contact us at <a href="mailto:abhihothi524@gmail.com" className="text-blue-600 hover:underline">abhihothi524@gmail.com</a>. Our dedicated team is here to assist you and ensure your complete satisfaction.
        </p>

      </div>
    </div>
  );
};

export default ShippingPolicySection;