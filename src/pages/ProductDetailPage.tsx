import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Check, Star, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock product data - in a real app, this would come from an API
const productData = {
  id: 1,
  name: 'Classic Oxford Shirt',
  slug: 'classic-oxford-shirt',
  price: 89.99,
  description: 'Our signature Oxford shirt crafted from premium cotton with a comfortable fit. Perfect for both casual and formal occasions.',
  brand: 'Bound Essentials',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Blue', 'White', 'Light Blue'],
  images: [
    'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6069958/pexels-photo-6069958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5082975/pexels-photo-5082975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ],
  stock: 15,
  care: 'Machine wash cold with similar colors. Tumble dry low. Do not bleach.',
  materials: '100% Premium Cotton',
  reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Perfect fit and excellent quality. Will definitely buy more colors.' },
    { id: 2, user: 'Michael R.', rating: 4, comment: 'Great shirt, but runs slightly small. Order one size up.' },
    { id: 3, user: 'David K.', rating: 5, comment: 'Exceptional quality and the blue is exactly as pictured.' },
  ],
};

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState(productData);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, fetch product data based on slug
    // For now, we're using mock data
    document.title = `${productData.name} | Bound`;
    
    // Reset selections when product changes
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setCurrentImageIndex(0);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    // Validation
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    
    // Add to cart logic would go here
    console.log('Added to cart:', {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const handleQuantityChange = (val: number) => {
    const newQuantity = quantity + val;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const calculateAverageRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  };

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center text-sm font-inter text-gray-500">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative bg-white rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '600px' }}
              />
              
              {/* Image Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-accent' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <h1 className="font-poppins font-bold text-2xl md:text-3xl text-primary mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index}
                        size={16}
                        className={`${
                          index < Math.round(calculateAverageRating())
                            ? 'text-warning fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-inter text-gray-500">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                <div className="font-poppins font-semibold text-2xl text-accent mb-4">
                  ${product.price.toFixed(2)}
                </div>
                <p className="font-inter text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  <span className="font-inter font-medium mr-2">Brand:</span>
                  <span className="font-inter text-gray-600">{product.brand}</span>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                    {product.stock > 0 ? (
                      <>
                        <Check size={16} className="mr-1" />
                        <span className="font-inter text-sm">In Stock</span>
                      </>
                    ) : (
                      <span className="font-inter text-sm">Out of Stock</span>
                    )}
                  </div>
                  {product.stock > 0 && product.stock <= 5 && (
                    <span className="font-inter text-sm text-warning ml-2">
                      Only {product.stock} left!
                    </span>
                  )}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
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
              
              {/* Color Selection */}
              <div className="mb-6">
                <label className="block font-poppins font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md font-inter text-sm transition-colors ${
                        selectedColor === color
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-primary border-gray-300 hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-poppins font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center font-inter"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  className="sm:flex-grow-0 bg-primary hover:bg-primary-light text-white font-poppins font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Buy Now
                </button>
                <button
                  className="sm:flex-grow-0 border border-gray-300 hover:border-primary text-primary hover:text-accent p-3 rounded-md transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>
                <button
                  className="sm:flex-grow-0 border border-gray-300 hover:border-primary text-primary hover:text-accent p-3 rounded-md transition-colors"
                  aria-label="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Product Tabs */}
            <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-grow py-3 px-4 font-poppins font-medium text-sm transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-grow py-3 px-4 font-poppins font-medium text-sm transition-colors ${
                    activeTab === 'care'
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  Care Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-grow py-3 px-4 font-poppins font-medium text-sm transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="animate-fade-in">
                    <p className="font-inter text-gray-600">
                      {product.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-poppins font-medium mb-2">Materials</h4>
                      <p className="font-inter text-gray-600">{product.materials}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'care' && (
                  <div className="animate-fade-in">
                    <h4 className="font-poppins font-medium mb-2">Care Instructions</h4>
                    <p className="font-inter text-gray-600">{product.care}</p>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-fade-in">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index}
                                size={14}
                                className={`${
                                  index < review.rating
                                    ? 'text-warning fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-poppins font-medium text-sm">{review.user}</span>
                        </div>
                        <p className="font-inter text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;