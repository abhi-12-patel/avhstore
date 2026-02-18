import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '@/data';

const productMap = new Map(
  (Array.isArray(products) ? products : []).map((product) => [
    String(product?.id ?? ''),
    product,
  ])
);

const resolveProduct = (input) => {
  const id =
    typeof input === 'object' && input !== null
      ? String(input?.id ?? '')
      : String(input ?? '');

  if (!id) return null;

  const fromCatalog = productMap.get(id) || null;
  if (typeof input === 'object' && input !== null) {
    return { ...(fromCatalog || {}), ...input, id };
  }
  if (fromCatalog) {
    return { ...fromCatalog, id };
  }
  return null;
};

const normalizeCart = (cart) =>
  Array.isArray(cart)
    ? cart.map((item) => ({
        ...item,
        product: resolveProduct(item?.product ?? item?.id),
        quantity: Math.max(1, Number(item?.quantity) || 1),
        size: item?.size,
      })).filter((item) => item?.product?.id)
    : [];

const normalizeWishlist = (wishlist) =>
  Array.isArray(wishlist)
    ? wishlist.map((item) => ({
        ...item,
        product: resolveProduct(item?.product ?? item?.id),
      })).filter((item) => item?.product?.id)
    : [];

export const useStore = create()(
  persist(
    (set, get) => ({
      // ======================
      // Cart State
      // ======================
      cart: [],

      addToCart: (product, quantity = 1, size) => {
        set((state) => {
          const resolvedProduct = resolveProduct(product);
          const productId = String(resolvedProduct?.id ?? '');
          if (!resolvedProduct || !productId) return state;
          const existingItem = state.cart.find(
            (item) =>
              String(item.product.id) === productId &&
              item.size === size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                String(item.product.id) === productId &&
                item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              { product: resolvedProduct, quantity, size },
            ],
          };
        });
      },

      removeFromCart: (productId) => {
        const normalizedProductId = String(productId ?? '');
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item.product.id) !== normalizedProductId
          ),
        }));
      },

      updateQuantity: (productId, quantity) => {
        const normalizedProductId = String(productId ?? '');
        set((state) => ({
          cart: state.cart.map((item) =>
            String(item.product.id) === normalizedProductId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) =>
            total + item.product.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce(
          (count, item) => count + item.quantity,
          0
        );
      },

      // ======================
      // Wishlist State
      // ======================
      wishlist: [],

      addToWishlist: (product) => {
        set((state) => {
          const resolvedProduct = resolveProduct(product);
          const productId = String(resolvedProduct?.id ?? '');
          if (!resolvedProduct || !productId) return state;
          if (
            state.wishlist.some(
              (item) => String(item.product.id) === productId
            )
          ) {
            return state;
          }

          return {
            wishlist: [
              ...state.wishlist,
              { product: resolvedProduct, addedAt: new Date() },
            ],
          };
        });
      },

      removeFromWishlist: (productId) => {
        const normalizedProductId = String(productId ?? '');
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => String(item.product.id) !== normalizedProductId
          ),
        }));
      },

      isInWishlist: (productId) => {
        const normalizedProductId = String(productId ?? '');
        const { wishlist } = get();
        return wishlist.some(
          (item) => String(item.product.id) === normalizedProductId
        );
      },

      moveToCart: (productId, size) => {
        const normalizedProductId = String(productId ?? '');
        const { wishlist, addToCart, removeFromWishlist } =
          get();

        const item = wishlist.find(
          (item) => String(item.product.id) === normalizedProductId
        );

        if (item) {
          addToCart(item.product, 1, size);
          removeFromWishlist(normalizedProductId);
        }
      },
    }),
    {
      name: 'jewelry-store',
      version: 3,
      partialize: (state) => ({
        cart: Array.isArray(state.cart)
          ? state.cart
              .map((item) => ({
                id: String(item?.product?.id ?? item?.id ?? ''),
                qty: Math.max(1, Number(item?.quantity) || 1),
                size: item?.size,
              }))
              .filter((item) => item.id)
          : [],
        wishlist: Array.isArray(state.wishlist)
          ? state.wishlist
              .map((item) => ({
                id: String(item?.product?.id ?? item?.id ?? ''),
              }))
              .filter((item) => item.id)
          : [],
      }),
      migrate: (persistedState) => {
        const state = persistedState || {};
        const migratedCart = Array.isArray(state.cart)
          ? state.cart.map((item) => ({
              id: item?.id ?? item?.product?.id,
              quantity: item?.quantity ?? item?.qty ?? 1,
              size: item?.size,
            }))
          : [];

        const migratedWishlist = Array.isArray(state.wishlist)
          ? state.wishlist.map((item) => ({
              id: item?.id ?? item?.product?.id,
            }))
          : [];

        return {
          ...state,
          cart: normalizeCart(migratedCart),
          wishlist: normalizeWishlist(migratedWishlist),
        };
      },
      merge: (persistedState, currentState) => {
        const state = persistedState || {};
        return {
          ...currentState,
          ...state,
          cart: normalizeCart(state.cart),
          wishlist: normalizeWishlist(state.wishlist),
        };
      },
    }
  )
);
