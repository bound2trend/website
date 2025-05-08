import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart functionality would go here
    console.log('Added to cart:', product.name);
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-primary bg-opacity-80 p-3 transform transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-md font-inter font-medium text-sm transition-colors"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-poppins font-medium text-primary text-lg mb-1 truncate">
            {product.name}
          </h3>
          <p className="font-inter font-semibold text-accent">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;