
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const FooterContact: React.FC = () => {
  return (
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
  );
};

export default FooterContact;
