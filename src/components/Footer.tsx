import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="animate-fade-in">
            <Link to="/" className="flex items-center mb-4">
              <PackageOpen size={28} className="text-accent mr-2" />
              <span className="font-poppins font-bold text-xl text-secondary">Bound</span>
            </Link>
            <p className="font-inter text-sm text-secondary-dark mb-6 max-w-xs">
              Elevating menswear with curated fashion that blends style, comfort, and quality.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="mailto:hello@bound.com" className="text-secondary hover:text-accent transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="animate-fade-in">
            <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="font-inter text-secondary-dark hover:text-accent transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/fitroom" className="font-inter text-secondary-dark hover:text-accent transition-colors">
                  FitRoom
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-inter text-secondary-dark hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-inter text-secondary-dark hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="font-inter text-secondary-dark hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="animate-fade-in">
            <h4 className="font-poppins font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="font-inter text-sm text-secondary-dark mb-4">
              Subscribe and get 10% off your first order
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-primary-light border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-secondary"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white font-inter font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-light">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-inter text-xs text-secondary-dark text-center md:text-left">
              © {new Date().getFullYear()} Bound. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="font-inter text-xs text-secondary-dark hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-inter text-xs text-secondary-dark hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;