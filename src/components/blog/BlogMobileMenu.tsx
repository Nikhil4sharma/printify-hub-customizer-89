
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ name: string; slug: string }>;
}

const BlogMobileMenu: React.FC<BlogMobileMenuProps> = ({ isOpen, onClose, categories }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-background z-40 pt-16">
      <ScrollArea className="h-full">
        <nav className="container px-4 py-6">
          <div className="space-y-4">
            <Link 
              to="/" 
              className="block text-lg py-2" 
              onClick={onClose}
            >
              Home
            </Link>
            <div className="py-2 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Categories</h3>
              {categories.map((category) => (
                <Link 
                  key={category.slug}
                  to={`/category/${category.slug}`} 
                  className="block py-2 pl-4" 
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link 
              to="/about" 
              className="block text-lg py-2 border-t border-border" 
              onClick={onClose}
            >
              About
            </Link>
            <Link 
              to="https://printify.com" 
              className="block text-lg py-2 border-t border-border" 
              onClick={onClose}
            >
              Main Site
            </Link>
          </div>

          <div className="mt-8 pt-4 border-t border-border">
            <ThemeToggle variant="switch" />
          </div>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default BlogMobileMenu;
