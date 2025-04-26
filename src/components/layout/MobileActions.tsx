
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';

interface MobileActionsProps {
  totalItems: number;
  onMenuToggle: () => void;
}

const MobileActions: React.FC<MobileActionsProps> = ({ totalItems, onMenuToggle }) => {
  return (
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
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-foreground" />
      </button>
    </div>
  );
};

export default MobileActions;
