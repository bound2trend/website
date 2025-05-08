import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'How do I determine my correct size?',
    answer: 'We recommend using our FitRoom feature which uses AI to help find your perfect size. Alternatively, you can refer to our detailed size guide available on each product page. If you\'re still unsure, feel free to contact our customer support for assistance.',
    category: 'Sizing & Fit',
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unworn items in their original packaging. Returns are free for orders above $50. For orders below $50, a shipping fee of $5 will be deducted from your refund amount.',
    category: 'Orders & Returns',
  },
  {
    id: 3,
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping varies by country and can take 7-14 business days.',
    category: 'Shipping',
  },
  {
    id: 4,
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer support team. After this window, we begin processing orders for shipment and cannot guarantee changes can be made.',
    category: 'Orders & Returns',
  },
  {
    id: 5,
    question: 'How does the AI FitRoom work?',
    answer: 'Our AI FitRoom uses advanced body measurement technology to create a virtual model based on your measurements or uploaded photo. This allows you to see how clothes will fit your unique body type before purchasing. The technology considers your height, weight, body type, and other measurements to provide accurate fit recommendations.',
    category: 'Sizing & Fit',
  },
  {
    id: 6,
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can view specific shipping information for your country during checkout.',
    category: 'Shipping',
  },
  {
    id: 7,
    question: 'Can I track my order?',
    answer: 'Yes, once your order ships, you\'ll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.',
    category: 'Shipping',
  },
  {
    id: 8,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and various UPI methods for customers in India.',
    category: 'Payment',
  },
  {
    id: 9,
    question: 'Are my measurements and data secure in the FitRoom?',
    answer: 'Absolutely. We take your privacy seriously. All data collected through our FitRoom is encrypted and stored securely. We never share your measurements or photos with third parties. You can delete your data at any time from your account settings.',
    category: 'Privacy & Security',
  },
  {
    id: 10,
    question: 'Do you offer gift wrapping?',
    answer: 'Yes, we offer premium gift wrapping for $5 per item. You can select this option during checkout and add a personalized message to be included with your gift.',
    category: 'Orders & Returns',
  },
];

const FaqPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  
  useEffect(() => {
    // Set page title
    document.title = 'FAQs | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  // Toggle FAQ expansion
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Filter FAQs based on search and category
  useEffect(() => {
    let result = faqs;
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(faq => faq.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredFaqs(result);
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">Frequently Asked Questions</h1>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our products, shipping, returns, and more.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-inter transition-colors ${
                  activeCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {filteredFaqs.map((faq, index) => (
                <div key={faq.id} className={index !== 0 ? 'border-t border-gray-100' : ''}>
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 focus:outline-none flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-poppins font-medium text-primary">{faq.question}</span>
                    {expandedId === faq.id ? (
                      <ChevronUp size={18} className="text-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 font-inter text-gray-600 bg-gray-50 animate-slide-down">
                      <p>{faq.answer}</p>
                      <div className="mt-3 text-xs text-gray-400">
                        Category: {faq.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="font-inter text-gray-600 mb-2">
                No results found for "{searchQuery}"
              </p>
              <p className="font-inter text-sm text-gray-500">
                Try a different search term or browse by category
              </p>
            </div>
          )}
          
          {/* Still Have Questions */}
          <div className="mt-12 bg-primary rounded-lg shadow-sm p-8 text-center">
            <h2 className="font-poppins font-bold text-xl text-white mb-3">Still Have Questions?</h2>
            <p className="font-inter text-secondary-dark mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-light text-white font-poppins font-medium py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;