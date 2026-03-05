"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
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

const formatTypeLabel = (value) => {
  if (value === "jewelleryset") return "Jewelleryset";
  if (value === "rajwadiset") return "Rajwadiset";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ShopAllPageClient() {
  const searchParams = useSearchParams();
  const selectedCategoryFromUrl = (searchParams.get("category") || "").trim().toLowerCase();

  const [openMenu, setOpenMenu] = useState("");
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedPriceId, setSelectedPriceId] = useState("all");
  const [selectedShopFor, setSelectedShopFor] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!selectedCategoryFromUrl) return;
    setSelectedProductTypes([selectedCategoryFromUrl]);
  }, [selectedCategoryFromUrl]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) setOpenMenu("");
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const productTypeCounts = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      const key = String(product.category || "").trim().toLowerCase();
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([id, count]) => ({ id, label: formatTypeLabel(id), count }))
      .sort((a, b) => a.label.localeCompare(b.label));
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

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedProductTypes.length > 0) {
      const selectedSet = new Set(selectedProductTypes);
      list = list.filter((product) =>
        selectedSet.has(String(product.category || "").trim().toLowerCase())
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

    if (sortBy === "price_low_high") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "price_high_low") {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === "best_selling") {
      list.sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));
    }

    return list;
  }, [selectedProductTypes, selectedPriceId, selectedShopFor, sortBy]);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedProductTypes, selectedPriceId, selectedShopFor, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const activeFilterCount =
    selectedProductTypes.length +
    (selectedPriceId !== "all" ? 1 : 0) +
    selectedShopFor.length;

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsLoadingMore(true);
        setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length));
        setTimeout(() => setIsLoadingMore(false), 350);
      },
      { root: null, rootMargin: "250px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, filteredProducts.length]);

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

  const clearAllFilters = () => {
    setSelectedProductTypes([]);
    setSelectedPriceId("all");
    setSelectedShopFor([]);
    setSortBy("default");
  };

  return (
    <div className="bg-gradient-to-b from-[#faf9ff] via-white to-white px-2 pt-2 text-gray-700 lg:px-[5%] lg:pt-3 lg:pb-6 mainCatgeroryContainer">
      <div className="mb-5 rounded-2xl  p-5 sm:p-7">
     
        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#111a2e]">
          Products
        </h1>
       
      </div>

      <div
        ref={menuRef}
        className="relative rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-gray-200 px-4 py-3">
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => (prev === "productType" ? "" : "productType"))}
            className={`inline-flex items-center gap-1 text-[18px] transition ${
              openMenu === "productType" ? "text-rose-500" : "text-gray-700"
            }`}
          >
            Product type <ChevronDown size={16} />
          </button>
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => (prev === "price" ? "" : "price"))}
            className={`inline-flex items-center gap-1 text-[18px] transition ${
              openMenu === "price" ? "text-rose-500" : "text-gray-700"
            }`}
          >
            Price <ChevronDown size={16} />
          </button>
      
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-black focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="best_selling">Best selling</option>
              <option value="price_low_high">Price low to high</option>
              <option value="price_high_low">Price high to low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <p className="text-xs text-gray-500">{filteredProducts.length} products found</p>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-medium text-white">
              {activeFilterCount} filters active
            </span>
          )}
        </div>

        {openMenu && (
          <div className="absolute left-0 top-full z-20 mt-1 w-full max-w-[460px] rounded-xl border border-gray-200 bg-white shadow-xl">
            <div className="max-h-[340px] overflow-y-auto p-3">
              {openMenu === "productType" &&
                productTypeCounts.map((type) => (
                  <label
                    key={type.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedProductTypes.includes(type.id)}
                        onChange={() => toggleProductType(type.id)}
                        className="h-4 w-4 accent-black"
                      />
                      <span>{type.label}</span>
                    </span>
                    <span className="text-gray-500">({type.count})</span>
                  </label>
                ))}

              {openMenu === "price" &&
                PRICE_RANGES.map((range) => (
                  <label
                    key={range.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceId === range.id}
                        onChange={() => setSelectedPriceId(range.id)}
                        className="h-4 w-4 accent-black"
                      />
                      <span>{range.label}</span>
                    </span>
                    <span className="text-gray-500">({priceCounts[range.id] || 0})</span>
                  </label>
                ))}

              {openMenu === "shopFor" &&
                SHOP_FOR_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedShopFor.includes(option.id)}
                        onChange={() => toggleShopFor(option.id)}
                        className="h-4 w-4 accent-black"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:border-black hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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

        {hasMore && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <div ref={loadMoreRef} aria-hidden="true" className="h-2 w-full" />
            {isLoadingMore ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Loading more products...</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500">Scroll to load more products</p>
            )}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-500">
            No products found for selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
