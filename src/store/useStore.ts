import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, WishlistItem } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string, size?: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      
      addToCart: (product, quantity = 1, size) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.size === size
          );
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            cart: [...state.cart, { product, quantity, size }],
          };
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ cart: [] }),
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      
      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist state
      wishlist: [],
      
      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.some((item) => item.product.id === product.id)) {
            return state;
          }
          return {
            wishlist: [...state.wishlist, { product, addedAt: new Date() }],
          };
        });
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.product.id !== productId),
        }));
      },
      
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.product.id === productId);
      },
      
      moveToCart: (productId, size) => {
        const { wishlist, addToCart, removeFromWishlist } = get();
        const item = wishlist.find((item) => item.product.id === productId);
        if (item) {
          addToCart(item.product, 1, size);
          removeFromWishlist(productId);
        }
      },
    }),
    {
      name: 'jewelry-store',
    }
  )
);
