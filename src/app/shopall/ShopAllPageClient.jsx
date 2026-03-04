"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ShopAll from "@/components/Shop-All/Shop-All";
import { products } from "@/data";

const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-100", label: "Under Rs 100", min: 0, max: 99 },
  { id: "100-199", label: "Rs 100 - Rs 199", min: 100, max: 199 },
  { id: "200-399", label: "Rs 200 - Rs 399", min: 200, max: 399 },
  { id: "400-799", label: "Rs 400 - Rs 799", min: 400, max: 799 },
  { id: "800-plus", label: "Rs 800+", min: 800, max: Number.POSITIVE_INFINITY },
];

const SHOP_FOR_OPTIONS = [
  { id: "women", label: "Women" },
  { id: "girls", label: "Girls" },
  { id: "men", label: "Men" },
];

export default function ShopAllPageClient() {
  const searchParams = useSearchParams();
  const selectedCategory = (searchParams.get("category") || "").trim().toLowerCase();

  const [activeFilterPanel, setActiveFilterPanel] = useState("productType");
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedPriceId, setSelectedPriceId] = useState("all");
  const [selectedShopFor, setSelectedShopFor] = useState([]);
  const [showBestSellerOnly, setShowBestSellerOnly] = useState(false);
  const [priceSort, setPriceSort] = useState("default");
  const [specialSort, setSpecialSort] = useState("default");

  const productTypes = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => {
      const key = String(product.category || "").trim().toLowerCase();
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([id, count]) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const getShopForTags = (product) => {
    const text = `${product?.name || ""} ${product?.description || ""}`.toLowerCase();
    const tags = [];
    if (text.includes("women")) tags.push("women");
    if (text.includes("girls") || text.includes("girl")) tags.push("girls");
    if (text.includes("men") || text.includes("man's")) tags.push("men");
    if (tags.length === 0) tags.push("women");
    return tags;
  };

  const shopForCounts = useMemo(() => {
    const counts = { women: 0, girls: 0, men: 0 };
    products.forEach((product) => {
      const tags = getShopForTags(product);
      Object.keys(counts).forEach((key) => {
        if (tags.includes(key)) counts[key] += 1;
      });
    });
    return counts;
  }, []);

  const priceCounts = useMemo(() => {
    const counts = {};
    PRICE_RANGES.forEach((range) => {
      counts[range.id] = products.filter((product) => {
        const price = Number(product.price) || 0;
        return price >= range.min && price <= range.max;
      }).length;
    });
    return counts;
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setSelectedProductTypes([selectedCategory]);
    setActiveFilterPanel("productType");
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedProductTypes.length > 0) {
      const selectedSet = new Set(selectedProductTypes);
      list = list.filter((product) =>
        selectedSet.has(String(product.category || "").trim().toLowerCase())
      );
    } else if (selectedCategory) {
      list = list.filter(
        (product) => String(product.category || "").trim().toLowerCase() === selectedCategory
      );
    }

    if (selectedPriceId !== "all") {
      const activeRange = PRICE_RANGES.find((range) => range.id === selectedPriceId);
      if (activeRange) {
        list = list.filter((product) => {
          const price = Number(product.price) || 0;
          return price >= activeRange.min && price <= activeRange.max;
        });
      }
    }

    if (selectedShopFor.length > 0) {
      list = list.filter((product) => {
        const tags = getShopForTags(product);
        return selectedShopFor.some((tag) => tags.includes(tag));
      });
    }

    if (showBestSellerOnly) {
      list = list.filter((product) => product.isBestseller);
    }

    if (specialSort === "bestseller_first") {
      list.sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));
    } else if (priceSort === "price_low_high") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (priceSort === "price_high_low") {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return list;
  }, [
    selectedCategory,
    selectedProductTypes,
    selectedPriceId,
    selectedShopFor,
    showBestSellerOnly,
    priceSort,
    specialSort,
  ]);

  const PRODUCTS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [
    selectedCategory,
    selectedProductTypes,
    selectedPriceId,
    selectedShopFor,
    showBestSellerOnly,
    priceSort,
    specialSort,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  const clearAllFilters = () => {
    setSelectedProductTypes([]);
    setSelectedPriceId("all");
    setSelectedShopFor([]);
    setShowBestSellerOnly(false);
    setPriceSort("default");
    setSpecialSort("default");
  };

  const toggleProductType = (id) => {
    setSelectedProductTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleShopFor = (id) => {
    setSelectedShopFor((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedFilterChips = [
    ...selectedProductTypes.map((id) => ({ type: "product", id, label: `Type: ${id}` })),
    ...(selectedPriceId !== "all"
      ? [
          {
            type: "price",
            id: selectedPriceId,
            label: `Price: ${
              PRICE_RANGES.find((r) => r.id === selectedPriceId)?.label || selectedPriceId
            }`,
          },
        ]
      : []),
    ...selectedShopFor.map((id) => ({ type: "shopFor", id, label: `Shop For: ${id}` })),
    ...(showBestSellerOnly ? [{ type: "best", id: "best", label: "Bestselling" }] : []),
  ];

  const removeChip = (chip) => {
    if (chip.type === "product") {
      setSelectedProductTypes((prev) => prev.filter((item) => item !== chip.id));
    } else if (chip.type === "price") {
      setSelectedPriceId("all");
    } else if (chip.type === "shopFor") {
      setSelectedShopFor((prev) => prev.filter((item) => item !== chip.id));
    } else if (chip.type === "best") {
      setShowBestSellerOnly(false);
    }
  };

  return (
    <div
      className="bg-white px-2 pt-2 text-gray-600 lg:px-[5%] lg:pt-3 lg:pb-5 mainCatgeroryContainer"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <h1 className="pb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
        Products
      </h1>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
          <div className="grid grid-cols-2 border-b border-gray-200 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveFilterPanel("productType")}
              className={`flex items-center justify-between px-3 py-4 text-left transition ${
                activeFilterPanel === "productType"
                  ? "border-b-2 border-rose-500 text-rose-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Product type <span className="text-xs">⌄</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterPanel("price")}
              className={`flex items-center justify-between px-3 py-4 text-left transition ${
                activeFilterPanel === "price"
                  ? "border-b-2 border-rose-500 text-rose-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Price <span className="text-xs">⌄</span>
            </button>
          </div>

          <div className="max-h-[470px] overflow-y-auto px-3 py-2">
            {activeFilterPanel === "productType" &&
              productTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(type.id)}
                      onChange={() => toggleProductType(type.id)}
                      className="h-4 w-4 border-gray-300 accent-black"
                    />
                    <span className="capitalize">{type.label}</span>
                  </span>
                  <span className="text-gray-500">({type.count})</span>
                </label>
              ))}

            {activeFilterPanel === "price" &&
              PRICE_RANGES.map((range) => (
                <label
                  key={range.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceId === range.id}
                      onChange={() => setSelectedPriceId(range.id)}
                      className="h-4 w-4 border-gray-300 accent-black"
                    />
                    <span>{range.label}</span>
                  </span>
                  <span className="text-gray-500">({priceCounts[range.id] || 0})</span>
                </label>
              ))}

            {activeFilterPanel === "shopFor" &&
              SHOP_FOR_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedShopFor.includes(option.id)}
                      onChange={() => toggleShopFor(option.id)}
                      className="h-4 w-4 border-gray-300 accent-black"
                    />
                    <span>{option.label}</span>
                  </span>
                  <span className="text-gray-500">({shopForCounts[option.id] || 0})</span>
                </label>
              ))}
          </div>

          <div className="border-t border-gray-200 p-3">
            <button
              type="button"
              onClick={clearAllFilters}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-black"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        <section>
          {selectedFilterChips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedFilterChips.map((chip) => (
                <button
                  key={`${chip.type}-${chip.id}`}
                  type="button"
                  onClick={() => removeChip(chip)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:border-black"
                >
                  <span className="capitalize">{chip.label}</span>
                  <span>x</span>
                </button>
              ))}
            </div>
          )}

          <div className="grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          {filteredProducts.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500">
              No products found for selected filters.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
