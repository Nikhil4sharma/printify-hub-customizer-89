
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import { ImageIcon } from 'lucide-react';

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
    image: '/placeholder.svg', // Using placeholder until admin updates
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
        <motion.div 
          className="text-center mx-auto max-w-2xl mb-16 space-y-4"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h4 className="text-sm md:text-base uppercase tracking-wider text-primary font-medium">Our Products</h4>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Premium Printing Categories
          </h2>
          <p className="text-muted-foreground">
            Explore our range of high-quality printing services designed to elevate your brand identity
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Link
                to={category.url}
                className="group block"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                    <p className="text-white/90 text-sm mt-2">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
