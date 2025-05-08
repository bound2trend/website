import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image, Ruler, Heart, Share2, ChevronRight, Check } from 'lucide-react';

interface MeasurementsForm {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  inseam: string;
}

const FitRoomPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bodyType, setBodyType] = useState<string>('');
  const [uploadMethod, setUploadMethod] = useState<'photo' | 'measurements'>('measurements');
  const [photo, setPhoto] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<MeasurementsForm>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    inseam: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Set page title
    document.title = 'FitRoom | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return uploadMethod === 'photo' 
          ? !!photo
          : !!measurements.height && !!measurements.weight;
      case 2:
        return !!bodyType;
      default:
        return true;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 h-1 w-full bg-gray-200 -z-10 transform -translate-y-1/2"></div>
      {[1, 2, 3, 4].map((step) => (
        <div 
          key={step}
          className={`flex flex-col items-center z-10 ${
            step === currentStep ? 'animate-pulse-light' : ''
          }`}
        >
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step < currentStep
                ? 'bg-success text-white'
                : step === currentStep
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step < currentStep ? <Check size={18} /> : step}
          </div>
          <span className={`text-xs font-inter ${
            step === currentStep ? 'font-medium text-primary' : 'text-gray-500'
          }`}>
            {step === 1 && 'Measurements'}
            {step === 2 && 'Body Type'}
            {step === 3 && 'Try On'}
            {step === 4 && 'Results'}
          </span>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Step 1: Enter Your Measurements</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setUploadMethod('photo')}
            className={`flex-1 py-3 px-4 rounded-md flex flex-col items-center transition-colors ${
              uploadMethod === 'photo' 
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload size={24} className="mb-2" />
            <span className="font-inter font-medium">Upload Photo</span>
          </button>
          <button
            onClick={() => setUploadMethod('measurements')}
            className={`flex-1 py-3 px-4 rounded-md flex flex-col items-center transition-colors ${
              uploadMethod === 'measurements' 
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Ruler size={24} className="mb-2" />
            <span className="font-inter font-medium">Enter Measurements</span>
          </button>
        </div>
        
        {uploadMethod === 'photo' ? (
          <div className="text-center">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {photo ? (
              <div className="relative">
                <img 
                  src={photo} 
                  alt="Uploaded user" 
                  className="max-h-80 mx-auto rounded-lg"
                />
                <button
                  onClick={handleUploadClick}
                  className="mt-4 text-accent font-inter font-medium"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-accent transition-colors"
              >
                <Image size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="font-inter text-gray-600 mb-2">
                  Click to upload a full-body photo
                </p>
                <p className="text-xs font-inter text-gray-500">
                  For best results, use a photo where you're standing straight with arms slightly away from your body
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={measurements.height}
                onChange={handleMeasurementChange}
                placeholder="e.g., 175"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-inter font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={measurements.weight}
                onChange={handleMeasurementChange}
                placeholder="e.g., 70"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-inter font-medium mb-1">Chest (cm)</label>
              <input
                type="number"
                name="chest"
                value={measurements.chest}
                onChange={handleMeasurementChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-inter font-medium mb-1">Waist (cm)</label>
              <input
                type="number"
                name="waist"
                value={measurements.waist}
                onChange={handleMeasurementChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-inter font-medium mb-1">Inseam (cm)</label>
              <input
                type="number"
                name="inseam"
                value={measurements.inseam}
                onChange={handleMeasurementChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Step 2: Choose Your Body Type</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {['Slim', 'Average', 'Athletic', 'Bulky'].map((type) => (
          <button
            key={type}
            onClick={() => setBodyType(type)}
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              bodyType === type
                ? 'border-accent bg-accent bg-opacity-10 transform scale-105'
                : 'border-gray-200 hover:border-accent hover:bg-accent hover:bg-opacity-5'
            }`}
          >
            <div 
              className={`w-24 h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center ${
                bodyType === type ? 'border-2 border-accent' : ''
              }`}
            >
              {/* Body type illustration would go here */}
              <span className="text-3xl font-light">
                {type === 'Slim' && '🧍‍♂️'}
                {type === 'Average' && '🧍‍♂️'}
                {type === 'Athletic' && '🏃‍♂️'}
                {type === 'Bulky' && '🏋️‍♂️'}
              </span>
            </div>
            <span className={`font-poppins font-medium ${bodyType === type ? 'text-accent' : 'text-primary'}`}>
              {type}
            </span>
          </button>
        ))}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="font-poppins font-medium text-lg mb-2">Body Type Descriptions:</h3>
        <ul className="space-y-2 font-inter text-sm text-gray-600">
          <li><span className="font-medium">Slim:</span> Lean build with narrow shoulders and waist</li>
          <li><span className="font-medium">Average:</span> Proportionate build with balanced shoulders and waist</li>
          <li><span className="font-medium">Athletic:</span> Broader shoulders than waist, with a more muscular build</li>
          <li><span className="font-medium">Bulky:</span> Larger frame with broader shoulders and chest</li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => {
    // Mock product for virtual try-on
    const product = {
      name: 'Classic Oxford Shirt',
      price: 89.99,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['S', 'M', 'L', 'XL'],
    };
    
    const [selectedSize, setSelectedSize] = useState('M');
    
    return (
      <div className="animate-fade-in">
        <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Step 3: Try On Clothes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-poppins font-medium text-xl mb-4">Virtual Preview</h3>
            
            <div className="relative border border-gray-200 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              {/* This would be the virtual try-on preview */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="font-inter text-gray-500 text-center p-6">
                  Based on your {uploadMethod === 'photo' ? 'photo' : 'measurements'} and {bodyType} body type,
                  here's how the {selectedSize} would fit you.
                </p>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-inter text-primary">
                Your fit score: <span className="font-medium text-success">92%</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-poppins font-medium mb-2">Fit Analysis</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-inter text-sm">Shoulders</span>
                    <span className="font-inter text-sm font-medium text-success">Good Fit</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-inter text-sm">Chest</span>
                    <span className="font-inter text-sm font-medium text-success">Perfect Fit</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-inter text-sm">Length</span>
                    <span className="font-inter text-sm font-medium text-warning">Slightly Long</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-poppins font-medium text-lg">{product.name}</h3>
                  <p className="font-inter font-semibold text-accent">${product.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block font-poppins font-medium mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md font-inter text-sm transition-colors ${
                        selectedSize === size
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-primary border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-success bg-opacity-10 border border-success rounded-md p-3 mb-4">
                <p className="font-inter text-sm text-success flex items-start">
                  <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Based on your body type, we recommend size <strong>{selectedSize}</strong> for the best fit.</span>
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-grow bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-2 rounded-md transition-colors">
                  Add to Cart
                </button>
                <button className="flex-grow-0 border border-gray-300 hover:border-primary text-primary hover:text-accent p-2 rounded-md transition-colors">
                  <Heart size={20} />
                </button>
                <button className="flex-grow-0 border border-gray-300 hover:border-primary text-primary hover:text-accent p-2 rounded-md transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="bg-primary text-white p-6 rounded-lg shadow-sm">
              <h3 className="font-poppins font-medium text-lg mb-3">Try More Items</h3>
              <p className="font-inter text-sm text-secondary-dark mb-4">
                Browse our collection and see how each item would fit on your body type.
              </p>
              <button className="flex items-center justify-between w-full bg-accent hover:bg-accent-light text-white font-poppins font-medium py-2 px-4 rounded-md transition-colors">
                <span>Browse Collection</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Step 4: Save Your Results</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success bg-opacity-10 rounded-full mb-4">
            <Check size={32} className="text-success" />
          </div>
          <h3 className="font-poppins font-bold text-xl text-primary mb-2">Profile Saved Successfully!</h3>
          <p className="font-inter text-gray-600 mb-6">
            Your body measurements and preferences have been saved. You'll now receive personalized fit recommendations across our site.
          </p>
          
          <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-poppins font-medium text-lg text-primary mb-2">Your Fit Profile</h4>
            <ul className="space-y-2 font-inter text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Body Type:</span>
                <span className="font-medium text-primary">{bodyType}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium text-primary">{measurements.height} cm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium text-primary">{measurements.weight} kg</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Recommended Shirt Size:</span>
                <span className="font-medium text-primary">M</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Recommended Pants Size:</span>
                <span className="font-medium text-primary">32</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-grow bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 px-6 rounded-md transition-colors">
              Continue Shopping
            </button>
            <button className="flex-grow bg-primary hover:bg-primary-light text-white font-poppins font-medium py-3 px-6 rounded-md transition-colors">
              View Recommendations
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-accent bg-opacity-10 rounded-lg p-6">
        <h3 className="font-poppins font-medium text-lg text-accent mb-2">Prepay & Save 5%</h3>
        <p className="font-inter text-sm text-gray-600 mb-4">
          Add items to your cart now and enjoy a 5% discount when you complete your purchase!
        </p>
        <button className="bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-2 px-6 rounded-md transition-colors">
          View Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary text-center mb-2">
          AI FitRoom
        </h1>
        <p className="font-inter text-gray-600 text-center mb-8">
          Find your perfect fit with our virtual try-on technology
        </p>
        
        {renderStepIndicator()}
        
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 rounded-md font-inter font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain layout with flex justify-between
            )}
            
            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                disabled={!isStepComplete()}
                className={`px-6 py-2 rounded-md font-inter font-medium transition-colors ${
                  isStepComplete()
                    ? 'bg-accent hover:bg-accent-dark text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <div></div> // Empty div for the last step
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitRoomPage;