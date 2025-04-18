import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  HelpCircle, 
  FileText, 
  Truck, 
  FileQuestion 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary dark:bg-secondary/30 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Printify</h3>
            <p className="text-muted-foreground">
              Premium printing solutions for businesses and individuals. Quality that speaks volumes.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Support */}
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

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  123 Print Avenue, Design District, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <a href="mailto:hello@printify.com" className="text-muted-foreground hover:text-primary transition-colors">
                  hello@printify.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Printify. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
