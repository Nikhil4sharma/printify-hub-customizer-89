
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Search, Rss, Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';

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
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-semibold tracking-tight flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Printify Blog</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Categories
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link 
                        key={category.slug}
                        to={`/category/${category.slug}`} 
                        className="block px-4 py-2 text-sm hover:bg-secondary"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="https://printify.com" className="text-foreground hover:text-primary transition-colors">Main Site</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-secondary transition-colors">
                <Search size={18} />
              </button>
              <a href="/rss" className="p-2 rounded-full hover:bg-secondary transition-colors">
                <Rss size={18} />
              </a>
              <ThemeToggle variant="icon" />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-secondary transition-colors mr-2">
                <Search size={18} />
              </button>
              <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-secondary transition-colors">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 py-3' : 'max-h-0 py-0'}`}>
            <form className="flex gap-2">
              <Input 
                placeholder="Search articles..." 
                className="flex-1"
                autoFocus={searchOpen}
              />
              <Button type="submit" size="sm">Search</Button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 pt-16">
          <ScrollArea className="h-full">
            <nav className="container px-4 py-6">
              <div className="space-y-4">
                <Link 
                  to="/" 
                  className="block text-lg py-2" 
                  onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Link 
                  to="/about" 
                  className="block text-lg py-2 border-t border-border" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="https://printify.com" 
                  className="block text-lg py-2 border-t border-border" 
                  onClick={() => setMobileMenuOpen(false)}
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
      )}

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
      <footer className="bg-muted/30 border-t">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Printify Blog</h3>
              <p className="text-muted-foreground">Expert printing tips, design inspiration, and business growth strategies for print entrepreneurs.</p>
              <div className="flex space-x-4 pt-2">
                <a href="https://facebook.com/printify" className="text-muted-foreground hover:text-primary">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/printify" className="text-muted-foreground hover:text-primary">
                  <Twitter size={20} />
                </a>
                <a href="https://instagram.com/printify" className="text-muted-foreground hover:text-primary">
                  <Instagram size={20} />
                </a>
                <a href="https://linkedin.com/company/printify" className="text-muted-foreground hover:text-primary">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link to={`/category/${category.slug}`} className="text-muted-foreground hover:text-primary">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="https://printify.com/faq" className="text-muted-foreground hover:text-primary">FAQs</a></li>
                <li><a href="https://printify.com/help-center" className="text-muted-foreground hover:text-primary">Help Center</a></li>
                <li><a href="https://printify.com/shipping-policy" className="text-muted-foreground hover:text-primary">Shipping Policy</a></li>
                <li><a href="https://printify.com/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Subscribe to our Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Stay updated with our latest articles, printing tips, and industry news</p>
              <form className="space-y-2">
                <Input placeholder="Your email address" />
                <Button className="w-full">Subscribe</Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Printify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
