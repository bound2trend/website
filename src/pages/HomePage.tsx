import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellers from '../components/home/BestSellers';
import FitRoomTeaser from '../components/home/FitRoomTeaser';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Bound | Premium Menswear';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <FitRoomTeaser />
      <Newsletter />
    </div>
  );
};

export default HomePage;