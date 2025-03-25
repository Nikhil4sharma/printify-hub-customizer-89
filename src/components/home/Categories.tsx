
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

const categories: Category[] = [
  {
    id: 'business-cards',
    name: 'Business Cards',
    description: 'Make a lasting impression with premium business cards',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    url: '/products/business-cards',
  },
  {
    id: 'stationery',
    name: 'Stationery',
    description: 'Elevate your brand with custom letterheads and envelopes',
    image: 'https://images.unsplash.com/photo-1576466759225-c6154466f4dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    url: '/products/stationery',
  },
  {
    id: 'bags',
    name: 'Carry Bags',
    description: 'Custom carry bags for a complete branded experience',
    image: 'https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    url: '/products/bags',
  },
  {
    id: 'boxes',
    name: 'Boxes',
    description: 'Custom packaging solutions for products of all sizes',
    image: 'https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80',
    url: '/products/boxes',
  },
];

const Categories: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="text-center mx-auto max-w-2xl mb-16 space-y-4">
          <h4 className="text-sm md:text-base uppercase tracking-wider text-primary font-medium">Our Products</h4>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Premium Printing Categories
          </h2>
          <p className="text-muted-foreground">
            Explore our range of high-quality printing services designed to elevate your brand identity
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.url}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden">
                {/* Category image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  <p className="text-white/90 text-sm mt-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
