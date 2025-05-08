import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import Logo from './ui/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'FitRoom', path: '/fitroom' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const IconLink = ({ to, children, label }) => (
    <Link 
      to={to} 
      className="relative p-2 text-primary hover:text-accent transition-colors"
      aria-label={label}
    >
      {children}
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-poppins font-medium text-sm hover:text-accent transition-colors ${
                  location.pathname === link.path ? 'text-accent' : 'text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <IconLink to="/search" label="Search">
              <Search size={20} />
            </IconLink>
            <IconLink to="/account" label="Account">
              <User size={20} />
            </IconLink>
            <IconLink to="/cart" label="Cart">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </IconLink>
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 md:hidden text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-primary bg-opacity-95 z-40 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-poppins text-secondary py-4 text-xl border-b border-primary-light"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;