import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ProductCard from '../ui/ProductCard';

// Mock data for best sellers
const bestSellers = [
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: 89.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'classic-oxford-shirt',
  },
  {
    id: 2,
    name: 'Slim Fit Chinos',
    price: 69.99,
    image: 'https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'slim-fit-chinos',
  },
  {
    id: 3,
    name: 'Premium Leather Watch',
    price: 129.99,
    image: 'https://images.pexels.com/photos/9979804/pexels-photo-9979804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'premium-leather-watch',
  },
  {
    id: 4,
    name: 'Casual Denim Jacket',
    price: 119.99,
    image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'casual-denim-jacket',
  },
  {
    id: 5,
    name: 'Designer Sunglasses',
    price: 99.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'designer-sunglasses',
  },
  {
    id: 6,
    name: 'Premium Sneakers',
    price: 139.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'premium-sneakers',
  },
];

const BestSellers: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth / 2;
      
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.min(scrollWidth - clientWidth, scrollPosition + scrollAmount));
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-poppins font-bold text-3xl text-primary">
            Best Sellers
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-secondary hover:bg-secondary-dark transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-secondary hover:bg-secondary-dark transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 sm:w-72 snap-start animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;