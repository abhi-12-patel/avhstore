"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useProductStore } from '@/store/productStore';

const Index = () => {
  const { products, categories, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const bestsellers = useMemo(() => 
    products.filter((p) => p.isBestseller).slice(0, 10),
    [products]
  );

  const newArrivals = useMemo(() => 
    products.filter((p) => p.isNew).slice(0, 4),
    [products]
  );

  const displayCategories = useMemo(() => 
    categories.filter(c => c.id !== 'newly-launched'),
    [categories]
  );

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex flex-col">
  //       <Header />
  //       <main className="flex-1 flex items-center justify-center">
  //         <div className="animate-pulse font-body text-muted-foreground">
  //           Loading...
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl animate-fade-in-up">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                The New Collection
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6 leading-tight">
                Timeless
                <br />
                <span className="gold-text-gradient">Elegance</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover our curated collection of fine jewelry, where exceptional craftsmanship meets contemporary design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Shop Collection
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-foreground text-foreground font-body text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                Explore our carefully curated collections, each piece designed to celebrate life's precious moments.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {displayCategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/collections?category=${category.id}`}
                  className="group relative aspect-[3/4] overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl text-background mb-2">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center font-body text-sm text-background/80 group-hover:text-gold-light transition-colors">
                      Explore
                      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
                  Most Loved
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Bestsellers
                </h2>
              </div>
              <Link
                href="/collections?sort=bestseller"
                className="hidden md:inline-flex items-center font-body text-sm text-foreground hover:text-primary transition-colors"
              >
                View All
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            <div className="relative">
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent>
                  {bestsellers.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/collections?sort=bestseller"
                className="inline-flex items-center font-body text-sm text-foreground hover:text-primary transition-colors"
              >
                View All Bestsellers
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Banner */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-gold-light mb-4">
              Limited Edition
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-background mb-6">
              The Serpentine Collection
            </h2>
            <p className="font-body text-background/80 max-w-2xl mx-auto mb-8 text-lg">
              Inspired by nature's most elegant curves, each piece is hand-crafted in solid 18k gold.
            </p>
            <Link
              href="/collections?collection=serpentine"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-background font-body text-sm uppercase tracking-wider hover:bg-gold-light transition-colors"
            >
              Discover the Collection
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
                  Just Landed
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/collections?sort=newest"
                className="hidden md:inline-flex items-center font-body text-sm text-foreground hover:text-primary transition-colors"
              >
                View All
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                What Our Clients Say
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "The craftsmanship is extraordinary. I've never owned jewelry that feels this precious.",
                  author: "Sarah M.",
                  location: "New York",
                },
                {
                  quote: "AVH Store pieces have become family heirlooms. The quality speaks for itself.",
                  author: "Jennifer L.",
                  location: "Los Angeles",
                },
                {
                  quote: "Exceptional service and even more exceptional jewelry. Worth every penny.",
                  author: "Amanda K.",
                  location: "London",
                },
              ].map((testimonial, index) => (
                <div key={index} className="text-center p-8 bg-card rounded-sm luxury-shadow">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-primary fill-current" />
                    ))}
                  </div>
                  <p className="font-display text-lg text-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.author} — {testimonial.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Preview */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                  Our Heritage
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                  Crafted with Passion Since 1987
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  For over three decades, AVH Store has been at the forefront of fine jewelry design. Our master artisans combine time-honored techniques with contemporary aesthetics, creating pieces that transcend trends and become cherished heirlooms.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Each creation begins with ethically sourced materials and ends with our signature polish—a testament to our unwavering commitment to excellence.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center font-body text-sm text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
                  alt="Artisan crafting jewelry"
                  className="w-full aspect-square object-cover luxury-shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-3xl text-primary-foreground block">37</span>
                    <span className="font-body text-xs text-primary-foreground uppercase tracking-wider">Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
