
import React from 'react';

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection;
