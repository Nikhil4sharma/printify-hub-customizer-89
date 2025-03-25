
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        
        {/* Features Section */}
        <section className="py-24 bg-secondary/50 dark:bg-secondary/10">
          <div className="container-custom">
            <div className="text-center mx-auto max-w-2xl mb-16 space-y-4">
              <h4 className="text-sm md:text-base uppercase tracking-wider text-primary font-medium">Why Choose Us</h4>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Exceptional Print Quality
              </h2>
              <p className="text-muted-foreground">
                We combine cutting-edge technology with craftsmanship to deliver print products that exceed expectations
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
                <p className="text-muted-foreground">
                  We use only the highest quality materials for all our printing products, ensuring durability and a premium feel.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Turnaround</h3>
                <p className="text-muted-foreground">
                  Fast production and shipping without compromising on quality. Most orders are completed within 2-3 business days.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Satisfaction Guarantee</h3>
                <p className="text-muted-foreground">
                  If you're not completely satisfied with your order, we'll reprint it or refund your money. Your satisfaction is our priority.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24">
          <div className="container-custom">
            <div className="rounded-2xl bg-gradient-to-r from-primary/90 to-primary overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-12 md:p-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Create Your Custom Print?
                  </h2>
                  <p className="text-white/90 text-lg mb-8">
                    Get started today and elevate your brand with our premium printing solutions.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/products/business-cards"
                      className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Start Designing
                    </a>
                    <a
                      href="/contact"
                      className="bg-transparent text-white border border-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80"
                    alt="Premium printing products"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
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
