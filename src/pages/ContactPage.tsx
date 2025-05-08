import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    // Set page title
    document.title = 'Contact Us | Bound';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-secondary min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">Contact Us</h1>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is here to help with any inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-10 p-3 rounded-full mr-4">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-poppins font-medium text-lg text-primary mb-1">Email Us</h3>
                  <p className="font-inter text-sm text-gray-600 mb-2">
                    Our friendly team is here to help.
                  </p>
                  <a 
                    href="mailto:hello@bound.com" 
                    className="font-inter text-accent hover:text-accent-dark transition-colors"
                  >
                    hello@bound.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-10 p-3 rounded-full mr-4">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-poppins font-medium text-lg text-primary mb-1">Call Us</h3>
                  <p className="font-inter text-sm text-gray-600 mb-2">
                    Mon-Fri from 9am to 6pm.
                  </p>
                  <a 
                    href="tel:+11234567890" 
                    className="font-inter text-accent hover:text-accent-dark transition-colors"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start">
                <div className="bg-accent bg-opacity-10 p-3 rounded-full mr-4">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-poppins font-medium text-lg text-primary mb-1">Visit Us</h3>
                  <p className="font-inter text-sm text-gray-600 mb-2">
                    Come and say hello at our office.
                  </p>
                  <p className="font-inter text-accent">
                    123 Fashion Street, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 animate-fade-in">
              <h2 className="font-poppins font-bold text-2xl text-primary mb-6">Send a Message</h2>
              
              {formSubmitted ? (
                <div className="bg-success bg-opacity-10 border border-success rounded-lg p-4 animate-fade-in">
                  <p className="font-inter text-success font-medium">
                    Thank you for your message! We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block font-inter font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-inter font-medium mb-1">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-inter font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-inter font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mr-2"
                      required
                    />
                    <label htmlFor="consent" className="font-inter text-sm text-gray-600">
                      I agree to the <a href="/privacy" className="text-accent hover:text-accent-dark">Privacy Policy</a> and consent to being contacted.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-poppins font-medium py-3 rounded-md transition-colors flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;