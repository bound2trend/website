import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, RefreshCw, ShoppingBag } from 'lucide-react';

// Mock cart items data
const initialCartItems = [
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  useEffect(() => {
    // Set page title
    document.title = 'Your Cart | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim() !== '') {
      setPromoApplied(true);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.1 : 0;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 5.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-poppins font-bold text-3xl text-primary mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-poppins font-medium text-sm text-gray-600">Product</th>
                      <th className="py-3 px-4 text-center font-poppins font-medium text-sm text-gray-600 hidden sm:table-cell">Price</th>
                      <th className="py-3 px-4 text-center font-poppins font-medium text-sm text-gray-600">Quantity</th>
                      <th className="py-3 px-4 text-right font-poppins font-medium text-sm text-gray-600">Subtotal</th>
                      <th className="py-3 px-4 text-center font-poppins font-medium text-sm text-gray-600 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div>
                              <h3 className="font-poppins font-medium text-primary">{item.name}</h3>
                              <div className="text-sm font-inter text-gray-500 mt-1">
                                <span>Size: {item.size}</span> | <span>Color: {item.color}</span>
                              </div>
                              <div className="sm:hidden font-inter font-medium text-accent mt-1">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-inter text-primary hidden sm:table-cell">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center font-inter text-primary">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-inter font-medium text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-error transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <Link
                  to="/shop"
                  className="font-inter font-medium text-sm text-accent hover:text-accent-dark flex items-center transition-colors"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Continue Shopping
                </Link>
                
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md font-inter text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-primary hover:bg-primary-light text-white font-inter font-medium text-sm rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="font-poppins font-bold text-xl text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-inter text-gray-600">Subtotal</span>
                    <span className="font-inter font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-success">
                      <span className="font-inter">Discount (10%)</span>
                      <span className="font-inter font-medium">-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
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
                
                <Link
                  to="/checkout"
                  className="block w-full bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 rounded-md text-center transition-colors"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6">
                  <h3 className="font-poppins font-medium text-sm mb-3">We Accept</h3>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="font-poppins font-bold text-2xl text-primary mb-2">Your cart is empty</h2>
            <p className="font-inter text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 px-8 rounded-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;