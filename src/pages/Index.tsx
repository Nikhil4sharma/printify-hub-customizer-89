
import React from 'react';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeatureSection from '@/components/home/FeatureSection';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeatureSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
