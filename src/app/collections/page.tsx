"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { useProductStore } from '@/store/productStore';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortBy = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

const CollectionsContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const { products, loadProducts, isLoading } = useProductStore();

  const [sortBy, setSortBy] = useState<SortBy>('featured');
  const [gridSize, setGridSize] = useState<'small' | 'large'>('small');

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryParam) {
      if (categoryParam === 'newly-launched') {
        result = result.filter((p) => p.isNew);
      } else {
        result = result.filter((p) => p.category === categoryParam);
      }
    }

    // Search filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - bestsellers first
        result = result.sort((a, b) => (a.isBestseller ? -1 : 1));
    }

    return result;
  }, [products, categoryParam, sortBy, searchParam]);

  const getPageTitle = () => {
    if (searchParam) {
      return `Search: ${searchParam}`;
    }
    if (categoryParam) {
      const titles: Record<string, string> = {
        rings: 'Rings',
        necklaces: 'Necklaces',
        bracelets: 'Bracelets',
        earrings: 'Earrings',
        'newly-launched': 'Newly Launched',
      };
      return titles[categoryParam] || 'All Collections';
    }
    return 'All Collections';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse font-body text-muted-foreground">
            Loading products...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              {getPageTitle()}
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of fine jewelry, each piece crafted with exceptional attention to detail.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <p className="font-body text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>

            <div className="flex items-center gap-4">
              {/* Grid Toggle */}
              {/* <div className="hidden md:flex items-center gap-2 border-r border-border pr-4">
                <button
                  onClick={() => setGridSize('large')}
                  className={cn(
                    'p-2 transition-colors',
                    gridSize === 'large' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Grid2X2 size={18} />
                </button>
                <button
                  onClick={() => setGridSize('small')}
                  className={cn(
                    'p-2 transition-colors',
                    gridSize === 'small' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Grid3X3 size={18} />
                </button>
              </div> */}

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                <SelectTrigger className="w-[180px] border-0 bg-transparent font-body text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-foreground mb-4">
                No products found
              </p>
              <p className="font-body text-muted-foreground">
                Check back soon for new arrivals.
              </p>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-6 md:gap-8',
                gridSize === 'large'
                  ? 'grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              )}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Collections = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-pulse font-body text-muted-foreground">
              Loading products...
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
};

export default Collections;
