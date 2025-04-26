
import React from 'react';
import { Check, Clock, Shield } from 'lucide-react';
import Feature from './Feature';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Check,
      title: 'Premium Materials',
      description: 'We use only the highest quality materials for all our printing products, ensuring durability and a premium feel.'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Fast production and shipping without compromising on quality. Most orders are completed within 2-3 business days.'
    },
    {
      icon: Shield,
      title: 'Satisfaction Guarantee',
      description: 'If you\'re not completely satisfied with your order, we\'ll reprint it or refund your money. Your satisfaction is our priority.'
    }
  ];

  return (
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
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
