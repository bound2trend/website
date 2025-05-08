import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <PackageOpen size={28} className="text-accent mr-2" />
      <span className="font-poppins font-bold text-xl text-primary">Bound</span>
    </Link>
  );
};

export default Logo;