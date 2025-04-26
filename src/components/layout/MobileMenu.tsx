
import React from 'react';
import { Link } from 'react-router-dom';
import { X, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
  categories: Array<{ name: string; path: string }>;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  categories, 
  isOpen, 
  onClose 
}) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      className="md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out"
    >
      <div className="container mx-auto flex flex-col h-full py-16">
        {/* Close button in corner */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} className="text-foreground" />
        </button>
        
        {/* Scrollable mobile menu content */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col space-y-6 px-4 py-4 text-lg">
            <Link to="/" className="nav-link" onClick={onClose}>Home</Link>
            
            <div className="border-t border-border pt-4">
              <span className="text-sm font-semibold text-muted-foreground">Products</span>
            </div>
            {categories.map(category => (
              <Link 
                key={category.path} 
                to={category.path} 
                className="nav-link" 
                onClick={onClose}
              >
                {category.name}
              </Link>
            ))}
            
            <Link 
              to="https://blog.printify.com" 
              className="nav-link flex items-center gap-2" 
              onClick={onClose}
              target="_blank"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              Blog
            </Link>
            
            <Link to="/contact" className="nav-link" onClick={onClose}>Contact</Link>
            
            {/* Add profile links to mobile menu */}
            {isAuthenticated && (
              <>
                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-muted-foreground">Account</span>
                </div>
                <Link to="/account/profile" className="nav-link" onClick={onClose}>Profile</Link>
                <Link to="/account/orders" className="nav-link" onClick={onClose}>Orders</Link>
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
                onClose();
              }}
              className="p-2 text-primary"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="p-2 text-primary"
              onClick={onClose}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
