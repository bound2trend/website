import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../lib/mockProducts';
import { Loader, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import FitRoomModal from '../components/FitRoomModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [pincode, setPincode] = useState('');
  const [showTryOn, setShowTryOn] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
    setActiveImage(foundProduct?.images?.[0] || foundProduct?.image);
    setLoading(false);
  }, [id]);

  const getProductAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} days ago`;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Loader className="animate-spin w-6 h-6" /></div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen"><p>Product not found.</p></div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    // Add to cart logic (connect with Supabase later)
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Gallery */}
        <div>
          <div className="overflow-hidden rounded-xl border">
            <img src={activeImage} alt="Product" className="w-full object-cover hover:scale-105 transition-transform" />
          </div>
          <div className="flex gap-2 mt-4">
            {product.images?.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 rounded border cursor-pointer ${activeImage === img ? 'ring-2 ring-black' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-500">by {product.brand}</p>
            <p className="text-xs text-gray-400">Added: {getProductAge(product.createdAt)}</p>
          </div>

          <div className="text-2xl font-bold">₹{product.price}</div>

          {/* Size Selector */}
          <div>
            <h2 className="font-medium text-sm mb-1">Select Size</h2>
            <div className="flex gap-2">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded px-4 py-1 text-sm ${
                    selectedSize === size ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Add to Cart</button>
            <button onClick={() => setShowTryOn(true)} className="border px-6 py-2 rounded hover:bg-gray-100">Try On</button>
            <button className="text-gray-500 hover:text-black"><Heart className="w-5 h-5 inline" /> Save</button>
          </div>

          {/* Pincode Delivery */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Check Delivery:</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Pincode"
                className="border px-3 py-1 rounded w-40"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
              />
              <button className="text-sm underline">Check</button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 text-sm text-gray-600 border-t pt-4">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Fast Delivery</div>
            <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Easy Returns</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Payment</div>
          </div>

          {/* Fabric Info */}
          <div>
            <h3 className="font-semibold text-sm mt-6 mb-2">Fabric & Material</h3>
            <p className="text-sm text-gray-700">{product.fabric || 'Premium cotton blend for all-day comfort and breathability.'}</p>
          </div>

          {/* Fabric Care Instructions */}
          <div>
            <h3 className="font-semibold text-sm mt-6 mb-2">Care Instructions</h3>
            <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
              <li>Dry clean preferred</li>
              <li>Do not tumble dry</li>
              <li>Iron at medium temperature</li>
            </ul>
          </div>

          {/* Model Measurements */}
          <div>
            <h3 className="font-semibold text-sm mt-6 mb-1">Model Measurements</h3>
            <p className="text-sm text-gray-700">Model is 6'1" / 185 cm and wears size M.</p>
          </div>

          {/* Reviews Tab */}
          <div className="mt-8 border-t pt-6">
            <h2 className="font-bold text-lg mb-2">Customer Reviews</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>⭐️⭐️⭐️⭐️⭐️ &nbsp;Great fabric and fit. Loved the quality!</p>
              <p>⭐️⭐️⭐️⭐️ &nbsp;Perfect for summer. Value for money.</p>
            </div>
          </div>

          {/* Accordion-style FAQ */}
          <div className="mt-6 border-t pt-6 space-y-4">
            <details className="cursor-pointer">
              <summary className="font-semibold text-sm">What is the return policy?</summary>
              <p className="text-sm text-gray-600 mt-1">You can return the product within 10 days.</p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-semibold text-sm">Is COD available?</summary>
              <p className="text-sm text-gray-600 mt-1">Yes, we support Cash on Delivery in most regions.</p>
            </details>
          </div>

          {/* Similar Products (mocked) */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Complete the Look</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.slice(0, 2).map((item) => (
                <div key={item.id} className="text-sm">
                  <img src={item.image} className="w-full h-40 object-cover rounded" />
                  <p className="mt-1">{item.name}</p>
                  <p className="text-gray-500 text-sm">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FitRoom Modal */}
      {showTryOn && <FitRoomModal product={product} onClose={() => setShowTryOn(false)} />}
    </div>
  );
};

export default ProductDetailPage;
