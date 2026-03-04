import { Suspense } from "react";
import ShopAllPageClient from "./ShopAllPageClient";

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="px-2 pt-24 lg:px-[10%]">Loading...</div>}>
      <ShopAllPageClient />
    </Suspense>
  );
}
