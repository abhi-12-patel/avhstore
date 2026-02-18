import { Suspense } from "react";
import ShopAllPageClient from "./ShopAllPageClient";

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-24 lg:px-[14%]">Loading...</div>}>
      <ShopAllPageClient />
    </Suspense>
  );
}
