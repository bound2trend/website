import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

// Mock products data
const allProducts = [
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: 89.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'classic-oxford-shirt',
    category: 'tops',
    brand: 'Bound Essentials',
    color: 'blue',
  },
  {
    id: 2,
    name: 'Slim Fit Chinos',
    price: 69.99,
    image: 'https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'slim-fit-chinos',
    category: 'bottoms',
    brand: 'Urban Style',
    color: 'beige',
  },
  {
    id: 3,
    name: 'Premium Leather Watch',
    price: 129.99,
    image: 'https://images.pexels.com/photos/9979804/pexels-photo-9979804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'premium-leather-watch',
    category: 'accessories',
    brand: 'Lux Time',
    color: 'brown',
  },
  {
    id: 4,
    name: 'Casual Denim Jacket',
    price: 119.99,
    image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'casual-denim-jacket',
    category: 'outerwear',
    brand: 'Bound Essentials',
    color: 'blue',
  },
  {
    id: 5,
    name: 'Designer Sunglasses',
    price: 99.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'designer-sunglasses',
    category: 'accessories',
    brand: 'Vista',
    color: 'black',
  },
  {
    id: 6,
    name: 'Premium Sneakers',
    price: 139.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'premium-sneakers',
    category: 'footwear',
    brand: 'Step Elite',
    color: 'white',
  },
  {
    id: 7,
    name: 'Merino Wool Sweater',
    price: 109.99,
    image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'merino-wool-sweater',
    category: 'tops',
    brand: 'Bound Essentials',
    color: 'gray',
  },
  {
    id: 8,
    name: 'Leather Belt',
    price: 59.99,
    image: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'leather-belt',
    category: 'accessories',
    brand: 'Urban Style',
    color: 'brown',
  },
];

// Filter options
const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];
const brands = ['All', 'Bound Essentials', 'Urban Style', 'Lux Time', 'Vista', 'Step Elite'];
const colors = ['All', 'Black', 'White', 'Blue', 'Brown', 'Beige', 'Gray'];
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $150', min: 100, max: 150 },
  { label: 'Over $150', min: 150, max: Infinity },
];

interface FilterOption {
  category: string;
  brand: string;
  color: string;
  priceRange: typeof priceRanges[0];
}

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState<FilterOption>({
    category: 'All',
    brand: 'All',
    color: 'All',
    priceRange: priceRanges[0],
  });
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  // Toggle filter section on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Toggle filter category expand/collapse
  const toggleFilterExpand = (filterName: string) => {
    if (expandedFilter === filterName) {
      setExpandedFilter(null);
    } else {
      setExpandedFilter(filterName);
    }
  };

  // Update filters
  const handleFilterChange = (filterType: keyof FilterOption, value: any) => {
    setFilters({ ...filters, [filterType]: value });
  };

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply brand filter
    if (filters.brand !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.brand === filters.brand
      );
    }
    
    // Apply color filter
    if (filters.color !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.color.toLowerCase() === filters.color.toLowerCase()
      );
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      product => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );
    
    // Apply sorting
    if (sortOption === 'price-low-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-a-z') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-z-a') {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setProducts(filteredProducts);
  }, [filters, sortOption]);

  useEffect(() => {
    // Set page title
    document.title = 'Shop | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Filter component for mobile/desktop
  const FilterSection = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFilterExpand('category')}
          >
            <h3 className="font-poppins font-medium text-lg">Categories</h3>
            {expandedFilter === 'category' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedFilter === 'category' && (
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={filters.category === category}
                    onChange={() => handleFilterChange('category', category)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category}`} className="font-inter text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Brand Filter */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFilterExpand('brand')}
          >
            <h3 className="font-poppins font-medium text-lg">Brands</h3>
            {expandedFilter === 'brand' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedFilter === 'brand' && (
            <div className="mt-3 space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="radio"
                    id={`brand-${brand}`}
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={() => handleFilterChange('brand', brand)}
                    className="mr-2"
                  />
                  <label htmlFor={`brand-${brand}`} className="font-inter text-sm cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Color Filter */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFilterExpand('color')}
          >
            <h3 className="font-poppins font-medium text-lg">Colors</h3>
            {expandedFilter === 'color' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedFilter === 'color' && (
            <div className="mt-3 space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="radio"
                    id={`color-${color}`}
                    name="color"
                    checked={filters.color === color}
                    onChange={() => handleFilterChange('color', color)}
                    className="mr-2"
                  />
                  <label htmlFor={`color-${color}`} className="font-inter text-sm cursor-pointer">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Price Filter */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFilterExpand('price')}
          >
            <h3 className="font-poppins font-medium text-lg">Price</h3>
            {expandedFilter === 'price' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedFilter === 'price' && (
            <div className="mt-3 space-y-2">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${index}`}
                    name="price"
                    checked={filters.priceRange.label === range.label}
                    onChange={() => handleFilterChange('priceRange', range)}
                    className="mr-2"
                  />
                  <label htmlFor={`price-${index}`} className="font-inter text-sm cursor-pointer">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-8">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary">Shop</h1>
          <p className="font-inter text-gray-600 mt-2">
            Discover our curated collection of premium menswear
          </p>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="w-full flex items-center justify-center bg-white border border-gray-200 rounded-md py-2 px-4 font-inter text-sm"
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile (Collapsible) */}
          <div className={`md:hidden ${showFilters ? 'block' : 'hidden'} mb-4 animate-slide-in-left`}>
            <FilterSection />
          </div>
          
          {/* Filters - Desktop (Always Visible) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSection />
          </div>
          
          {/* Products */}
          <div className="flex-grow">
            {/* Sort Options */}
            <div className="bg-white p-3 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <div className="font-inter text-sm">
                Showing <span className="font-semibold">{products.length}</span> products
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="font-inter text-sm mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="font-inter text-sm p-1 border border-gray-200 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="font-poppins font-medium text-xl text-primary mb-2">
                  No products found
                </div>
                <p className="font-inter text-gray-600">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;