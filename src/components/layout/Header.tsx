
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import HeaderLogo from './HeaderLogo';
import DesktopNavigation from './DesktopNavigation';
import HeaderActions from './HeaderActions';
import MobileActions from './MobileActions';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Categories for navigation menu
  const categories = [
    { name: 'Business Cards', path: '/products/business-cards' },
    { name: 'Stationery', path: '/products/stationery' },
    { name: 'Carry Bags', path: '/products/bags' },
    { name: 'Boxes', path: '/products/boxes' },
    { name: 'Wedding Cards', path: '/products/wedding-cards' },
  ];

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
        <HeaderLogo />

        {/* Desktop Navigation */}
        <DesktopNavigation categories={categories} />

        {/* Desktop Actions */}
        <HeaderActions totalItems={totalItems} />

        {/* Mobile Menu Toggle */}
        <MobileActions 
          totalItems={totalItems} 
          onMenuToggle={toggleMobileMenu} 
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        categories={categories}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
