
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface HeaderActionsProps {
  totalItems: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ totalItems }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
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
  );
};

export default HeaderActions;
