
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-16"> {/* Added padding top for header and bottom for footer */}
        <div className={`${fullWidth ? 'w-full' : 'container mx-auto px-4'} py-8`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
