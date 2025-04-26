
import React from 'react';
import FooterAbout from './FooterAbout';
import FooterQuickLinks from './FooterQuickLinks';
import FooterLinks from './FooterLinks';
import FooterContact from './FooterContact';
import FooterCopyright from './FooterCopyright';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary dark:bg-secondary/30 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FooterAbout />
          <FooterQuickLinks />
          <FooterLinks />
          <FooterContact />
        </div>
        
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
