import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
const Hero: React.FC = () => {
  return <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 dark:to-background/30 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div className="space-y-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <div>
              <h4 className="text-sm md:text-base uppercase tracking-wider text-primary font-medium mb-2">Premium Print Solutions</h4>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">Elevate Your Brand</span>
                <span className="block mt-2">Through Print</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              High-quality, customizable printing services with an attention to detail that sets your business apart.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/products/business-cards" className="btn-primary px-6 py-3 rounded-md flex items-center justify-center gap-2 text-base">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary px-6 py-3 rounded-md flex items-center justify-center text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          {/* Image Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-4 h-[500px]">
            {/* Column 1 */}
            <motion.div className="flex flex-col gap-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <div className="bg-card rounded-lg h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" alt="Business card design" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
              <div className="bg-card rounded-lg flex-1 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1616628188804-7e95a06697e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" alt="Envelope design" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
            </motion.div>
            
            {/* Column 2 */}
            <motion.div className="flex flex-col gap-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
              <div className="bg-card rounded-lg flex-1 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576466759225-c6154466f4dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" alt="Letterhead design" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
              <div className="bg-card rounded-lg h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80" alt="Box design" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
            </motion.div>
            
            {/* Column 3 */}
            <motion.div className="bg-card rounded-lg overflow-hidden" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <img src="https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" alt="Carry bag design" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </motion.div>
          </div>
          
          {/* Mobile images */}
          <motion.div className="lg:hidden" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img alt="Business card design" loading="lazy" src="/lovable-uploads/4826bb45-df05-4ab3-a8b0-511270393412.png" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;