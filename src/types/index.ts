export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: 'rings' | 'necklaces' | 'bracelets' | 'earrings';
  material: 'gold' | 'silver' | 'platinum' | 'rose-gold';
  stone?: 'diamond' | 'sapphire' | 'emerald' | 'ruby' | 'pearl' | 'none';
  sizes?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
}


export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface FilterState {
  categories: string[];
  materials: string[];
  stones: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}
