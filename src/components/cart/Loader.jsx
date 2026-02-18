import React from "react";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-30">
    <div className="w-16 h-16 border-4 border-[#01203D] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Loader; 