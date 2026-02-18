"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import ImageWithFallback from "@/components/ImageWithFallback";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleMoveToCart = (productId) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (item) {
      addToCart(item.product, 1);
      removeFromWishlist(productId);
    }
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="py-14">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Your Wishlist
            </h1>
            <p className="text-gray-500">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {/* Empty State */}
          {wishlist.length === 0 ? (
            <div className="text-center py-24 max-w-md mx-auto bg-white rounded-2xl shadow-sm">
              <Heart size={60} className="mx-auto mb-6 text-gray-300" />
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Save your favorite products and find them here anytime.
              </p>
              <Link
                href="/collections"
                className="inline-block px-8 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-900 transition"
              >
                Explore Collections
              </Link>
            </div>
          ) : (

            /* Grid */
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {wishlist.map(({ product }) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Link href={`/product/${product.id}`}>
                      <ImageWithFallback
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="text-[10px] px-3 py-1 bg-black text-white rounded-full font-semibold tracking-wider">
                          NEW
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="text-[10px] px-3 py-1 bg-amber-400 text-black rounded-full font-semibold tracking-wider">
                          BEST SELLER
                        </span>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase rounded">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 text-center space-y-2">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-black transition line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="font-bold text-lg text-gray-900">
                      {formatPrice(product.price)}
                    </p>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleMoveToCart(product.id)}
                      disabled={!product.inStock}
                      className="w-full mt-3 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
