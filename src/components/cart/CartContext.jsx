// "use client";

// import React, { createContext, useContext, useMemo, useState } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       const saved = window.localStorage.getItem("jewelry-store-cart");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });
//   const [wishlist, setWishlist] = useState(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       const saved = window.localStorage.getItem("jewelry-store-wishlist");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });
//   const [loading, setLoading] = useState(false);

//   const updateCart = (updater) => {
//     setCartItems((prev) => {
//       const next = typeof updater === "function" ? updater(prev) : updater;
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem("jewelry-store-cart", JSON.stringify(next));
//       }
//       return next;
//     });
//   };

//   const updateWishlist = (updater) => {
//     setWishlist((prev) => {
//       const next = typeof updater === "function" ? updater(prev) : updater;
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem("jewelry-store-wishlist", JSON.stringify(next));
//       }
//       return next;
//     });
//   };

//   // Simulate async cart update
//   const simulateAsync = (fn) => {
//     setLoading(true);
//     setTimeout(() => {
//       fn();
//       setLoading(false);
//     }, 500); // 0.5s loader for UX
//   };

//   // Add item to cart
//   const addToCart = (product, size, quantity = 1) => {
//     simulateAsync(() => {
//       updateCart((prev) => {
//         const existingIndex = prev.findIndex(
//           item => item.id === product.id && item.size === size
//         );
//         if (existingIndex !== -1) {
//           const updated = [...prev];
//           updated[existingIndex].quantity += quantity;
//           return updated;
//         }
//         return [
//           ...prev,
//           {
//             id: product.id,
//             title: product.title,
//             price: product.price,
//             image: (product.images && product.images[0]) || product.image || product.imageUrl || "",
//             size,
//             quantity,
//           },
//         ];
//       });
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (id, size) => {
//     simulateAsync(() => {
//       updateCart((prev) => prev.filter(item => !(item.id === id && item.size === size)));
//     });
//   };

//   // Update quantity
//   const updateQuantity = (id, size, quantity) => {
//     simulateAsync(() => {
//       updateCart((prev) => prev.map(item =>
//         item.id === id && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item
//       ));
//     });
//   };

//   // Clear cart
//   const clearCart = () => updateCart([]);

//   // Wishlist
//   const addToWishlist = (product) => {
//     updateWishlist((prev) => {
//       const exists = prev.some((item) => item.id === product.id);
//       if (exists) return prev;
//       return [
//         ...prev,
//         {
//           id: product.id,
//           title: product.title,
//           price: product.price,
//           image: (product.images && product.images[0]) || product.image || product.imageUrl || "",
//           product,
//           addedAt: new Date().toISOString(),
//         },
//       ];
//     });
//   };

//   const removeFromWishlist = (productId) => {
//     updateWishlist((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

//   const moveToCart = (productId, size = "Free Size") => {
//     const item = wishlist.find((entry) => entry.id === productId);
//     if (!item) return;
//     addToCart(item.product || item, size, 1);
//     removeFromWishlist(productId);
//   };

//   const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

//   const value = useMemo(
//     () => ({
//       cartItems,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       getCartTotal,
//       getCartCount,
//       wishlist,
//       addToWishlist,
//       removeFromWishlist,
//       isInWishlist,
//       moveToCart,
//       loading,
//       setLoading,
//     }),
//     [cartItems, wishlist, loading]
//   );

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// } 
