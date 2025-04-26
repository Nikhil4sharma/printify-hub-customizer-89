
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="text-2xl font-semibold tracking-tight flex items-center"
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Printify</span>
    </Link>
  );
};

export default HeaderLogo;
