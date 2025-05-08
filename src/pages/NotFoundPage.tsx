import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Page Not Found | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="font-poppins font-bold text-7xl text-primary mb-2">404</h1>
        <h2 className="font-poppins font-bold text-2xl text-primary mb-4">Page Not Found</h2>
        <p className="font-inter text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="border border-primary hover:bg-primary hover:text-white text-primary font-poppins font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            <Search size={18} className="mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;