"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Heart, Minus, Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/common/productCart/ProductCart";
import ProductImageSlider from "@/components/common/ProductImageSlider";
import { products as catalogProducts } from "@/data";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function ProductPageClient({ product }) {
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentProduct = useMemo(() => {
    if (!product) return null;

    const images =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image || product.imageUrl || "/placeholder.jpg"];

    return {
      ...product,
      name: product.name || product.title || "Product",
      image: product.image || product.imageUrl || images[0],
      images,
      price: Number(product.price) || 0,
      originalPrice: Number(product.originalPrice) || 0,
      inStock: product.inStock !== false,
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      description: product.description || "",
      details: product.details || "",
    };
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!currentProduct) return [];

    const sameCategory = catalogProducts.filter(
      (item) =>
        item.category === currentProduct.category &&
        String(item.id) !== String(currentProduct.id)
    );

    const fallback = catalogProducts.filter(
      (item) => String(item.id) !== String(currentProduct.id)
    );

    return (sameCategory.length > 0 ? sameCategory : fallback).slice(0, 4);
  }, [currentProduct]);

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
          <Link href="/collections" className="text-blue-600 hover:underline">
            Return to Collections
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = mounted ? isInWishlist(currentProduct.id) : false;

  const handleAddToCart = () => {
    const chosenSize = selectedSize || currentProduct.sizes?.[0] || "Free Size";
    addToCart(currentProduct, quantity, chosenSize);
  };

  const handleBuyNow = () => {
    const chosenSize = selectedSize || currentProduct.sizes?.[0] || "Free Size";
    addToCart(currentProduct, quantity, chosenSize);
    router.push("/cart");
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(currentProduct.id);
      return;
    }
    addToWishlist(currentProduct);
  };

  return (
    <div className="bg-white min-h-screen text-black">
      

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <ChevronRight size={14} />
          <Link href="/collections" className="hover:text-gray-800">Collections</Link>
          <ChevronRight size={14} />
          <span className="capitalize">{currentProduct.category || "Product"}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <ProductImageSlider images={currentProduct.images} productName={currentProduct.name} />

          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">{currentProduct.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold">{formatPrice(currentProduct.price)}</span>
              {currentProduct.originalPrice > currentProduct.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(currentProduct.originalPrice)}
                </span>
              )}
            </div>

            {currentProduct.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size ? "bg-black text-white border-black" : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="text-sm mb-2">Quantity</p>
              <div className="flex items-center border border-gray-300 w-fit rounded">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!currentProduct.inStock}
                className={`flex-1 py-3 rounded ${
                  currentProduct.inStock ? "bg-[#01203D] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentProduct.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="px-5 py-3 border border-black rounded"
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`px-4 py-3 border rounded ${
                  inWishlist ? "bg-black text-white border-black" : "border-gray-300"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} className={inWishlist ? "fill-current" : ""} />
              </button>
            </div>

            {currentProduct.description && (
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{currentProduct.description}</p>
            )}

            {currentProduct.details && (
              <div className="text-sm text-gray-700 space-y-1">
                {String(currentProduct.details)
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <p key={`${line}-${idx}`}>{line}</p>
                  ))}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
