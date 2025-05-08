import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating form submission
    setTimeout(() => {
      setSubmitted(true);
      setEmail('');
    }, 500);
  };
  
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="inline-block p-3 bg-accent rounded-full mb-6">
            <Mail size={24} className="text-white" />
          </div>
          
          <h2 className="font-poppins font-bold text-3xl text-primary mb-3">
            Join Our Newsletter
          </h2>
          
          <p className="font-inter text-gray-600 mb-8">
            Subscribe to our newsletter and get 10% off your first order, plus early access to new arrivals and exclusive sales.
          </p>
          
          {submitted ? (
            <div className="bg-success bg-opacity-10 border border-success rounded-lg p-4 animate-fade-in">
              <p className="font-inter text-success font-medium">
                Thank you for subscribing! Your discount code will be sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white font-inter font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center group"
              >
                Subscribe
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;