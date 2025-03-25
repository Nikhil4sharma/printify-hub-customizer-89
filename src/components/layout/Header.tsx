
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight flex items-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Printify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/products/business-cards" className="nav-link">Business Cards</Link>
          <Link to="/products/stationery" className="nav-link">Stationery</Link>
          <Link to="/products/bags" className="nav-link">Carry Bags</Link>
          <Link to="/products/boxes" className="nav-link">Boxes</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle variant="icon" />

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 rounded-full hover:bg-secondary transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} className="text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="relative group">
              <Link
                to="/account/profile"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Account"
              >
                <User size={20} className="text-foreground" />
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link to="/account/profile" className="block px-4 py-2 text-sm hover:bg-secondary">Profile</Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-sm hover:bg-secondary">Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-foreground border border-border hover:bg-secondary transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-20 flex flex-col h-full">
          <nav className="flex flex-col space-y-8 text-lg">
            <Link to="/products/business-cards" className="nav-link" onClick={closeMobileMenu}>Business Cards</Link>
            <Link to="/products/stationery" className="nav-link" onClick={closeMobileMenu}>Stationery</Link>
            <Link to="/products/bags" className="nav-link" onClick={closeMobileMenu}>Carry Bags</Link>
            <Link to="/products/boxes" className="nav-link" onClick={closeMobileMenu}>Boxes</Link>
          </nav>
          
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            {/* Updated: Use a component with onClick callback */}
            <div onClick={closeMobileMenu}>
              <ThemeToggle variant="switch" />
            </div>
            
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="p-2 text-primary"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="p-2 text-primary"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
