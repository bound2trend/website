import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, User, Shirt } from 'lucide-react';

const FitRoomTeaser: React.FC = () => {
  return (
    <section className="py-16 bg-primary text-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-slide-in-left">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              AI FitRoom: Find Your Perfect Fit
            </h2>
            <p className="font-inter text-secondary-dark mb-6">
              Tired of ordering clothes online only to find they don't fit? Our AI-powered FitRoom
              helps you visualize how garments will look on your unique body type before you buy.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-4">
                  <Ruler size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-lg">Enter Your Measurements</h4>
                  <p className="font-inter text-sm text-secondary-dark">
                    Input your height, weight, and body type for accurate recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-4">
                  <Shirt size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-lg">Try Clothes Virtually</h4>
                  <p className="font-inter text-sm text-secondary-dark">
                    See exactly how each size will fit your body type
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-4">
                  <User size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-lg">Save Your Profile</h4>
                  <p className="font-inter text-sm text-secondary-dark">
                    Get personalized fit recommendations for all future purchases
                  </p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/fitroom"
              className="inline-block bg-accent hover:bg-accent-light text-white font-poppins font-medium py-3 px-8 rounded-md transition-colors animate-pulse-light"
            >
              Try FitRoom Now
            </Link>
          </div>
          
          <div className="order-1 md:order-2 animate-slide-in-right">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Man trying on stylish outfit"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-4 rounded-lg shadow-lg font-poppins font-bold">
                95% Fit Accuracy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitRoomTeaser;