
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Rss, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface BlogHeaderProps {
  toggleMenu: () => void;
  mobileMenuOpen: boolean;
  categories: Array<{ name: string; slug: string }>;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ toggleMenu, mobileMenuOpen, categories }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
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
  );
};

export default BlogHeader;
