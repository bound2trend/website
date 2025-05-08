import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Check, ShoppingBag } from 'lucide-react';

// Mock cart items data
const cartItems = [
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: 89.99,
    quantity: 1,
    size: 'M',
    color: 'Blue',
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'Casual Denim Jacket',
    price: 119.99,
    quantity: 1,
    size: 'L',
    color: 'Blue',
    image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  useEffect(() => {
    // Set page title
    document.title = 'Checkout | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 5.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Process payment and complete order
      setOrderComplete(true);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 1: // Contact Info
        return contactInfo.email.includes('@') && contactInfo.phone.length >= 10;
      case 2: // Shipping Info
        return (
          shippingInfo.firstName.trim() !== '' &&
          shippingInfo.lastName.trim() !== '' &&
          shippingInfo.address.trim() !== '' &&
          shippingInfo.city.trim() !== '' &&
          shippingInfo.state.trim() !== '' &&
          shippingInfo.zip.trim() !== ''
        );
      case 3: // Payment Info
        if (paymentMethod === 'credit-card') {
          return (
            paymentInfo.cardNumber.replace(/\s/g, '').length >= 16 &&
            paymentInfo.nameOnCard.trim() !== '' &&
            paymentInfo.expiry.includes('/') &&
            paymentInfo.cvv.length >= 3
          );
        }
        return true;
      default:
        return false;
    }
  };
  
  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 h-1 w-full bg-gray-200 -z-10 transform -translate-y-1/2"></div>
      {[1, 2, 3].map((step) => (
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
            {step === 1 && 'Information'}
            {step === 2 && 'Shipping'}
            {step === 3 && 'Payment'}
          </span>
        </div>
      ))}
    </div>
  );
  
  const renderContactInfo = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Contact Information</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-inter font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-inter font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactChange}
              placeholder="e.g., 555-123-4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveInfo"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
              className="mr-2"
            />
            <label htmlFor="saveInfo" className="font-inter text-sm text-gray-600">
              Save this information for next time
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderShippingInfo = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Shipping Information</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-inter font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={shippingInfo.firstName}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-inter font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block font-inter font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-inter font-medium mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block font-inter font-medium mb-1">State / Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="zip" className="block font-inter font-medium mb-1">ZIP / Postal Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingInfo.zip}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block font-inter font-medium mb-1">Country</label>
            <select
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderPaymentInfo = () => (
    <div className="animate-fade-in">
      <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Payment Method</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={paymentMethod === 'credit-card'}
                onChange={() => setPaymentMethod('credit-card')}
                className="form-radio"
              />
              <span className="font-inter">Credit / Debit Card</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="form-radio"
              />
              <span className="font-inter">PayPal</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="form-radio"
              />
              <span className="font-inter">UPI</span>
            </label>
          </div>
          
          {paymentMethod === 'credit-card' && (
            <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
              <div>
                <label htmlFor="cardNumber" className="block font-inter font-medium mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CreditCard size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="nameOnCard" className="block font-inter font-medium mb-1">Name on Card</label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  value={paymentInfo.nameOnCard}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block font-inter font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block font-inter font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="font-inter text-sm text-gray-600">
                You will be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          )}
          
          {paymentMethod === 'upi' && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div>
                <label htmlFor="upiId" className="block font-inter font-medium mb-1">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderOrderComplete = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center animate-fade-in">
      <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-white" />
      </div>
      <h2 className="font-poppins font-bold text-2xl text-primary mb-2">Order Confirmed!</h2>
      <p className="font-inter text-gray-600 mb-4">
        Thank you for your order. We've received your payment and will process your order shortly.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-6 mx-auto max-w-sm">
        <div className="font-inter font-medium text-primary mb-2">Order #BND23782</div>
        <div className="text-sm font-inter text-gray-600">A confirmation email has been sent to {contactInfo.email}</div>
      </div>
      <Link
        to="/"
        className="inline-block bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 px-8 rounded-md transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {!orderComplete ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Link to="/cart" className="inline-flex items-center font-inter font-medium text-sm text-accent hover:text-accent-dark mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Cart
              </Link>
              
              {renderStepIndicator()}
              
              {currentStep === 1 && renderContactInfo()}
              {currentStep === 2 && renderShippingInfo()}
              {currentStep === 3 && renderPaymentInfo()}
              
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
                
                <button
                  onClick={handleNextStep}
                  disabled={!isStepComplete()}
                  className={`px-6 py-2 rounded-md font-inter font-medium transition-colors ${
                    isStepComplete()
                      ? 'bg-accent hover:bg-accent-dark text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentStep < 3 ? 'Continue' : 'Place Order'}
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="font-poppins font-bold text-xl text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white font-inter text-xs">
                          {item.quantity}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-inter font-medium text-primary">{item.name}</h3>
                        <div className="text-sm font-inter text-gray-500">
                          <span>Size: {item.size}</span> | <span>Color: {item.color}</span>
                        </div>
                        <div className="font-inter font-medium text-accent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-inter text-gray-600">Subtotal</span>
                    <span className="font-inter font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-inter text-gray-600">Shipping</span>
                    <span className="font-inter font-medium">
                      {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-poppins font-medium text-primary">Total</span>
                      <span className="font-poppins font-semibold text-lg text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderOrderComplete()
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;