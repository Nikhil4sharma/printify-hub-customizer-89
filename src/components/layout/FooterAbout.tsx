
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterAbout: React.FC = () => {
  return (
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
  );
};

export default FooterAbout;
