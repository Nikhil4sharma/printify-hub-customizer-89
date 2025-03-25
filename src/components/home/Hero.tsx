
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 dark:to-background/30 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
              <Link
                to="/products/business-cards"
                className="btn-primary px-6 py-3 rounded-md flex items-center justify-center gap-2 text-base"
              >
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary px-6 py-3 rounded-md flex items-center justify-center text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-4 h-[500px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div 
                ref={(el) => (imageRefs.current[0] = el)}
                className="bg-card rounded-lg h-64 overflow-hidden opacity-0"
                style={{ animationDelay: '0.3s' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                  alt="Business card design" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div 
                ref={(el) => (imageRefs.current[1] = el)}
                className="bg-card rounded-lg flex-1 overflow-hidden opacity-0"
                style={{ animationDelay: '0.4s' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1616628188804-7e95a06697e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                  alt="Envelope design" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div 
                ref={(el) => (imageRefs.current[2] = el)}
                className="bg-card rounded-lg flex-1 overflow-hidden opacity-0"
                style={{ animationDelay: '0.5s' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1576466759225-c6154466f4dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                  alt="Letterhead design" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div 
                ref={(el) => (imageRefs.current[3] = el)}
                className="bg-card rounded-lg h-64 overflow-hidden opacity-0"
                style={{ animationDelay: '0.6s' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80" 
                  alt="Box design" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Column 3 */}
            <div 
              ref={(el) => (imageRefs.current[4] = el)}
              className="bg-card rounded-lg overflow-hidden opacity-0"
              style={{ animationDelay: '0.7s' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                alt="Carry bag design" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Mobile images */}
          <div className="lg:hidden">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                alt="Business card design" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
