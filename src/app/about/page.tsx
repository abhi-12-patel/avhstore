"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-foreground/50" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-display text-5xl md:text-6xl text-background mb-4">
              Our Story
            </h1>
            <p className="font-body text-lg text-background/80 max-w-2xl mx-auto">
              Crafting timeless elegance since 1987
            </p>
          </div>
        </section>

        {/* Heritage */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                  Our Heritage
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                  A Legacy of Excellence
                </h2>
                <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                  <p>
                    AVH Store was founded in 1987 by master jeweler Henri Beaumont in the heart of Paris. What began as a small atelier has grown into a globally recognized maison, yet our commitment to exceptional craftsmanship remains unchanged.
                  </p>
                  <p>
                    Every piece that leaves our workshop carries with it the legacy of generations of master artisans. We believe that fine jewelry should be more than beautiful—it should tell a story, mark a moment, and become a cherished heirloom.
                  </p>
                  <p>
                    Today, AVH Store continues to honor its founding principles while embracing contemporary design. Our collections blend timeless elegance with modern sensibility, creating pieces that are as relevant today as they will be for generations to come.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
                  alt="Jewelry craftsmanship"
                  className="w-full aspect-[4/5] object-cover luxury-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                Our Values
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Exceptional Craftsmanship',
                  description: 'Each piece is meticulously handcrafted by master artisans using techniques passed down through generations. We never compromise on quality.',
                },
                {
                  title: 'Ethical Sourcing',
                  description: 'We are committed to responsible practices. All our gemstones are conflict-free, and we work exclusively with certified suppliers who share our values.',
                },
                {
                  title: 'Timeless Design',
                  description: 'Our designs transcend trends. We create pieces meant to be treasured for a lifetime and passed down as heirlooms to future generations.',
                },
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-4">{value.title}</h3>
                  <p className="font-body text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
                  alt="Jewelry making process"
                  className="w-full aspect-[4/5] object-cover luxury-shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                  Our Process
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                  From Vision to Reality
                </h2>
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Design', description: 'Each piece begins as a sketch, inspired by nature, architecture, and the stories of those who will wear it.' },
                    { step: '02', title: 'Selection', description: 'We hand-select each gemstone for exceptional clarity, color, and fire. Only the finest materials make it to our workshop.' },
                    { step: '03', title: 'Crafting', description: 'Our master artisans bring the design to life, using techniques refined over decades of practice.' },
                    { step: '04', title: 'Perfection', description: 'Every piece undergoes rigorous quality inspection before receiving the AVH Store hallmark.' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <span className="font-display text-2xl text-primary shrink-0">{item.step}</span>
                      <div>
                        <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
                        <p className="font-body text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
              Experience Lumière
            </h2>
            <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Discover our collections and find a piece that speaks to your story.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-body text-sm uppercase tracking-wider hover:bg-background/90 transition-colors"
            >
              Shop Collections
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
