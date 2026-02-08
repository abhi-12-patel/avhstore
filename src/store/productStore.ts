import { create } from 'zustand';
import { Product, Review } from '@/types';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Material {
  id: string;
  name: string;
}

interface Stone {
  id: string;
  name: string;
}

interface ProductStore {
  products: Product[];
  reviews: Review[];
  categories: Category[];
  materials: Material[];
  stones: Stone[];
  isLoading: boolean;
  error?: string;
  
  // Actions
  loadProducts: () => Promise<void>;
  setCatalog: (data: {
    products?: Product[];
    reviews?: Review[];
    categories?: Category[];
    materials?: Material[];
    stones?: Stone[];
  }) => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const API_BASE_URL = 'data';

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: [],
  reviews: [],
  categories: [],
  materials: [],
  stones: [],
  isLoading: false,
  error: undefined,

  loadProducts: async () => {
    set({ isLoading: true, error: undefined });
    try {
       const localProducts = get().products;
          if (localProducts.length > 0) {
            set({ isLoading: false });
            return;
          }
  // Load from JSON file
          const response = await fetch('/data/products.json');
          const data = await response.json();
   

      set({
             products: data.products || [],
            reviews: data.reviews || [],
            categories: data.categories || [],
            materials: data.materials || [],
            stones: data.stones || [],
            isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load products:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load products.',
      });
    }
  },

  setCatalog: (data) => {
    set((state) => ({
      products: data.products ?? state.products,
      reviews: data.reviews ?? state.reviews,
      categories: data.categories ?? state.categories,
      materials: data.materials ?? state.materials,
      stones: data.stones ?? state.stones,
    }));
  },

  addProduct: async (product) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product.');
    }
    const created = await response.json();
    set((state) => ({
      products: [...state.products, created],
    }));
  },

  updateProduct: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update product.');
    }
    const updated = await response.json();
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    }));
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product.');
    }
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },

  getProductsByCategory: (category) => {
    if (category === 'newly-launched') {
      return get().products.filter((p) => p.isNew);
    }
    return get().products.filter((p) => p.category === category);
  },
}));
