import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../lib/mockProducts'; // Replace with Supabase fetch later
import { Loader } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      // Replace this with Supabase later
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  const getProductAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-sm" />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-sm">By {product.brand}</p>
          <p className="text-gray-400 text-xs">Added: {getProductAge(product.createdAt)}</p>
          <p className="text-xl font-semibold text-gray-900">₹{product.price}</p>

          <p className="text-sm text-gray-600">Color: {product.color}</p>

          <div className="space-x-4 mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
              Add to Cart
            </button>
            <button className="border px-6 py-2 rounded-md hover:bg-gray-100 transition">
              Try On
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description || 'This is a high-quality menswear item with premium fabric, tailored fit, and timeless design. Perfect for all occasions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
