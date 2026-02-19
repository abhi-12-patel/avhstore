"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ShopAll from "@/components/Shop-All/Shop-All";
import { collectionCategoryLinks, products } from "@/data";

export default function ShopAllPageClient() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  // Filter products
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [selectedCategory]);

  // Pagination State
  const PRODUCTS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  return (
    <div
      className="bg-white px-4 pt-24 text-gray-600 lg:px-[14%] lg:py-8"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
<h1 className="pb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
  Shop All Products
</h1>


      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/collections"
          className={`rounded-full border px-4 py-2 text-sm transition ${
            selectedCategory
              ? "border-gray-300 text-gray-700"
              : "border-black bg-black text-white"
          }`}
        >
          All
        </Link>

        {collectionCategoryLinks.map((item) => {
          const category = item.to.split("category=")[1];
          const isActive = selectedCategory === category;

          return (
            <Link
              key={item.to}
              href={item.to}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-700 hover:border-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <ShopAll
            key={product.id}
            id={product.id}
            productData={product}
            imageUrl={product.images?.[0] || ""}
            title={product.name}
            price={product.price}
            linkHref={`/product/${product.id}`}
            inStock={product.inStock}
            isNew={product.isNew}
            isBestseller={product.isBestseller}
          />
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleViewMore}
            className="rounded-full border border-black px-8 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            View More
          </button>
        </div>
      )}

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-sm text-gray-500">
          No products found for this category.
        </p>
      )}
    </div>
  );
}
