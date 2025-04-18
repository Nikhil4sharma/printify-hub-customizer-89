
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Categories for navigation menu
  const categories = [
    { name: 'Business Cards', path: '/products/business-cards' },
    { name: 'Stationery', path: '/products/stationery' },
    { name: 'Carry Bags', path: '/products/bags' },
    { name: 'Boxes', path: '/products/boxes' },
    { name: 'Wedding Cards', path: '/products/wedding-cards' },
  ];

  const isProductPage = location.pathname.includes('/products/');
  const isCartPage = location.pathname === '/cart';
  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isProductPage || isCartPage || isCheckoutPage
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight flex items-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Printify</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <li key={category.path}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={category.path}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location.pathname.includes(category.path.split('/').pop() || '') ? 
                              "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
        <div className="md:hidden flex items-center gap-3">
          {/* Cart icon always visible in mobile */}
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
          
          <button
            className="p-2 rounded-full hover:bg-secondary transition-colors"
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
      </div>

      {/* Mobile Menu - Fixed with solid background */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto flex flex-col h-full py-16">
          {/* Close button in corner */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} className="text-foreground" />
          </button>
          
          {/* Scrollable mobile menu content */}
          <ScrollArea className="flex-1">
            <nav className="flex flex-col space-y-6 px-4 py-4 text-lg">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
              
              <div className="border-t border-border pt-4">
                <span className="text-sm font-semibold text-muted-foreground">Products</span>
              </div>
              {categories.map(category => (
                <Link 
                  key={category.path} 
                  to={category.path} 
                  className="nav-link" 
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
              
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link>
              
              {/* Add profile links to mobile menu */}
              {isAuthenticated && (
                <>
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-muted-foreground">Account</span>
                  </div>
                  <Link to="/account/profile" className="nav-link" onClick={closeMobileMenu}>Profile</Link>
                  <Link to="/account/orders" className="nav-link" onClick={closeMobileMenu}>Orders</Link>
                </>
              )}
            </nav>
          </ScrollArea>
          
          <div className="mt-auto flex items-center justify-between border-t border-border p-4">
            <ThemeToggle variant="switch" />
            
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
