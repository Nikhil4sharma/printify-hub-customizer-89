
import React from 'react';

const FooterCopyright: React.FC = () => {
  return (
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
  );
};

export default FooterCopyright;
