import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import clsx from 'clsx';

const allProducts = [/* ... your mock products here ... */];

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
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    let filtered = [...allProducts];
    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.brand !== 'All') {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.color !== 'All') {
      filtered = filtered.filter(p => p.color.toLowerCase() === filters.color.toLowerCase());
    }
    filtered = filtered.filter(
      p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-a-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-z-a') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(filtered);
  }, [filters, sortOption]);

  const handleFilterChange = (type: keyof FilterOption, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const FilterSection = () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="block">
            <input
              type="radio"
              name="category"
              checked={filters.category === cat}
              onChange={() => handleFilterChange('category', cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="radio"
              name="brand"
              checked={filters.brand === brand}
              onChange={() => handleFilterChange('brand', brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Color</h3>
        {colors.map((color) => (
          <label key={color} className="block">
            <input
              type="radio"
              name="color"
              checked={filters.color === color}
              onChange={() => handleFilterChange('color', color)}
              className="mr-2"
            />
            {color}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        {priceRanges.map((range, i) => (
          <label key={i} className="block">
            <input
              type="radio"
              name="price"
              checked={filters.priceRange.label === range.label}
              onChange={() => handleFilterChange('priceRange', range)}
              className="mr-2"
            />
            {range.label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Shop</h1>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center border px-4 py-2 rounded-md text-sm bg-white"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-3 py-2 text-sm rounded-md bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A-Z</option>
              <option value="name-z-a">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Drawer for filters */}
        <div
          className={clsx(
            'fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity',
            showDrawer ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
          onClick={() => setShowDrawer(false)}
        />
        <div
          className={clsx(
            'fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out',
            'w-full h-[80%] bottom-0 left-0 md:w-[400px] md:h-full md:right-0 md:top-0',
            showDrawer
              ? 'translate-y-0 md:translate-x-0'
              : 'translate-y-full md:translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowDrawer(false)}>
              <X size={20} />
            </button>
          </div>
          <FilterSection />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
