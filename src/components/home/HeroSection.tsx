import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fade-in');
    }
    if (ctaRef.current) {
      setTimeout(() => {
        ctaRef.current?.classList.add('animate-slide-up');
      }, 300);
    }
  }, []);

  const handleScrollToCategories = () => {
    const categoriesSection = document.getElementById('featured-categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 
            ref={headingRef}
            className="font-poppins font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6 opacity-0 transition-opacity duration-1000"
          >
            Elevate Your Style with Bound
          </h1>
          <p className="font-inter text-lg text-secondary mb-8 animate-fade-in">
            Premium menswear for the modern gentleman
          </p>
          <button
            ref={ctaRef}
            onClick={handleScrollToCategories}
            className="bg-accent hover:bg-accent-light text-white font-poppins font-medium py-3 px-8 rounded-md transition-colors opacity-0 transform scale-95 transition-all duration-500 hover:shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;