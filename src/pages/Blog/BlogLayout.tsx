
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogMobileMenu from '@/components/blog/BlogMobileMenu';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const categories = [
  { name: "Printing Tips", slug: "printing-tips" },
  { name: "Design Inspiration", slug: "design-inspiration" },
  { name: "Business Growth", slug: "business-growth" },
  { name: "Industry News", slug: "industry-news" },
  { name: "Case Studies", slug: "case-studies" },
];

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <BlogHeader 
        toggleMenu={toggleMenu}
        mobileMenuOpen={mobileMenuOpen}
        categories={categories}
      />

      {/* Mobile Menu */}
      <BlogMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
      />

      {/* Main Content */}
      <motion.main 
        className="flex-grow"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <BlogFooter categories={categories} />
    </div>
  );
};

export default BlogLayout;
