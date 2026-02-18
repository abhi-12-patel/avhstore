'use clint'
import Common from "@/components/Catagories/Common";
import { categories, products } from "@/data";
import Link from "next/link";

const catagories = () => {
  return (
    <div className="text-gray-600 px-4 lg:px-[14%] pt-22 lg:pt-8 pb-20 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        <h1 className="text-4xl pb-[3%]">Categories</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 justify-items-center">
        {/* {categories.map((product) => {
          const categoryProducts = products.filter((item) => item.category === product.id);
          const minPrice = categoryProducts.length
            ? Math.min(...categoryProducts.map((item) => item.price))
            : 0;
          return (
          <Common
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            title={product.name}
            price={minPrice}
            linkHref={`/collections?category=${product.id}`}
          />
          );
        })} */}

             {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections?category=${cat.id}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-semibold text-cream tracking-widest uppercase border border-cream/40 px-6 py-2 group-hover:theme-accent group-hover:theme-accent   transition-colors">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default catagories;
