import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Watch, Footprints, Layers } from 'lucide-react';

interface CategoryCard {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  direction: 'left' | 'right';
}

const categories: CategoryCard[] = [
  {
    title: 'Tops & Shirts',
    icon: <Shirt size={32} />,
    description: 'Premium shirts and t-shirts for every occasion',
    link: '/shop?category=tops',
    direction: 'left',
  },
  {
    title: 'Accessories',
    icon: <Watch size={32} />,
    description: 'Complete your look with our curated accessories',
    link: '/shop?category=accessories',
    direction: 'right',
  },
  {
    title: 'Footwear',
    icon: <Footprints size={32} />,
    description: 'Step out in style with our premium footwear collection',
    link: '/shop?category=footwear',
    direction: 'left',
  },
  {
    title: 'Outerwear',
    icon: <Layers size={32} />,
    description: 'Stay warm and stylish with our outerwear selection',
    link: '/shop?category=outerwear',
    direction: 'right',
  },
];

const CategoryCard: React.FC<CategoryCard> = ({ title, icon, description, link, direction }) => {
  return (
    <div 
      className={`group bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-${direction === 'left' ? 'slide-in-left' : 'slide-in-right'}`}
    >
      <Link to={link} className="block h-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="text-accent mr-3">{icon}</div>
            <h3 className="font-poppins font-semibold text-xl">{title}</h3>
          </div>
          <p className="font-inter text-sm text-gray-600 mb-4">{description}</p>
          <div className="font-inter font-medium text-sm text-accent group-hover:translate-x-1 transition-transform">
            Explore →
          </div>
        </div>
      </Link>
    </div>
  );
};

const FeaturedCategories: React.FC = () => {
  return (
    <section id="featured-categories" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-primary text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;