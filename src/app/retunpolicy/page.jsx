// This component is a static display of policy text.
// 'use client'; is not strictly necessary unless you plan to add interactivity later.

import React from 'react';

const RefundPolicySection = () => {
  return (
    <div className="flex flex-col pt-20 lg:pt-0 items-center justify-start bg-white w-full text-black py-16">
      <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col items-center w-full max-w-2xl lg:max-w-xl text-left">
        
        <h1 className="text-4xl font-normal text-gray-800 mb-8 text-center">Refund policy</h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          We do not have a return option, which means you cannot exchange or return the product after receiving the product.
        </p>
        
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li className="mb-2">Orders once placed cannot be cancelled or exchanged.</li>
          <li className="mb-2">We do not offer returns or refunds on our products unless there has been severe damage during the shipping process.
            (for only Artificial jewelry products not packaging-wood boxes)</li>
          <li className="mb-2">In case a defective product has arrived, we accept returns with full refund to you on the item. In order to claim the refund, it is MANDATORY to send an unboxing video of the package.
            <br />No claims would be accepted without the unboxing video.</li>
          <li className="mb-2">In case an incorrect item has been sent, we will ask for photos/videos of your package, items and invoice to better understand how the mistake happened on our end. After verifying, we will issue a refund or send the correct item. It is mandatory for you to return the incorrect item back to us within 7 days and the refund will be processed in 2-3 working days and will be credited to your account within 10-12 working days.</li>
          <li className="mb-2">Please make sure you give us an accurate ring size as all our rings are fixed sized rings (mentioned size guide if it's Indian, USA, or inner diameter).</li>
          <li className="mb-4">Please check our size guide highlights; you can use a ring sizer app if you have an existing ring that fits you well.</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-8">
          You can always contact us for any complaints at <a href="mailto:abhihothi524@gmail.com" className="text-blue-600 hover:underline">abhihothi524@gmail.com</a>.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Damages and issues</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In case a defective product has arrived, we accept returns with full refund to you on the item. In order to claim the refund, it is MANDATORY to send an unboxing video of the package.
          <br />No claims would be accepted without the unboxing video.
        </p>

        <h2 className="text-3xl font-normal text-gray-800 mb-4">Things to keep in mind while making a purchase</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li className="mb-2">The units have been photographed under lights and the actual product may differ slightly when seen under normal lights, though we maintain the originality in the photographs to utmost extent.</li>
          <li className="mb-4">Note- NO two crystals will be exactly alike in terms of their color, pattern, shape etc. This uniqueness adds to the charm and allure of crystals, as it highlights their individuality and distinctiveness. It's important to embrace their differences and appreciate the beauty of their natural variations. This understanding allows individuals to form personal connections with their crystals and to work with them in ways that resonate with their own energy and intentions.</li>
        </ul>

      </div>
    </div>
  );
};

export default RefundPolicySection;