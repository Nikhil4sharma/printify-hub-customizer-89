
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  FileText, 
  Truck, 
  FileQuestion 
} from 'lucide-react';

const FooterLinks: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Support</h3>
      <ul className="space-y-3">
        <li>
          <Link 
            to="/help-center" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <HelpCircle size={16} />
            Help Center
          </Link>
        </li>
        <li>
          <Link 
            to="/terms-of-service" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <FileText size={16} />
            Terms of Service
          </Link>
        </li>
        <li>
          <Link 
            to="/privacy-policy" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <FileText size={16} />
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link 
            to="/shipping-policy" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Truck size={16} />
            Shipping Policy
          </Link>
        </li>
        <li>
          <Link 
            to="/faq" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <FileQuestion size={16} />
            FAQ
          </Link>
        </li>
        <li>
          <a 
            href="https://blog.printify.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <FileText size={16} />
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterLinks;
