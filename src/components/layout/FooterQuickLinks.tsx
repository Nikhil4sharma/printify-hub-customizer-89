
import React from 'react';
import { Link } from 'react-router-dom';

const FooterQuickLinks: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-3">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products/business-cards" className="text-muted-foreground hover:text-primary transition-colors">
            Business Cards
          </Link>
        </li>
        <li>
          <Link to="/products/stationery" className="text-muted-foreground hover:text-primary transition-colors">
            Stationery
          </Link>
        </li>
        <li>
          <Link to="/products/bags" className="text-muted-foreground hover:text-primary transition-colors">
            Carry Bags
          </Link>
        </li>
        <li>
          <Link to="/products/boxes" className="text-muted-foreground hover:text-primary transition-colors">
            Boxes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
