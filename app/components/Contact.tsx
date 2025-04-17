import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call our API route to send the email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', result);

        // Show success message
        setShowSuccess(true);

        // Reset form after a delay
        setTimeout(() => {
          setFormState({
            name: '',
            email: '',
            message: ''
          });

          // Hide success message after 3 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        }, 500);
      } else {
        // Handle API error
        console.error('Form submission error:', result.error);
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="py-20 relative cyber-grid-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cyber text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">DIRECT</span>
            <span className="text-cyber-purple">.CONTACT</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-futuristic">
            Contact me directly through this form.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-cyber-dark/60 backdrop-blur-sm p-6 rounded border border-cyber-purple/20 relative">
          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative mt-6">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-cyber-black border border-cyber-purple/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-purple transition-colors"
                  placeholder="Your name"
                />
                <span className="absolute -top-5 left-2 text-sm text-gray-400 bg-cyber-dark px-2">
                  NAME
                </span>
              </div>

              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-cyber-black border border-cyber-purple/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-purple transition-colors"
                  placeholder="Your email"
                />
                <span className="absolute -top-5 left-2 text-sm text-gray-400 bg-cyber-dark px-2">
                  EMAIL
                </span>
              </div>

              <div className="relative mt-6">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-cyber-black border border-cyber-purple/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-purple transition-colors"
                  placeholder="Your message"
                ></textarea>
                <span className="absolute -top-5 left-2 text-sm text-gray-400 bg-cyber-dark px-2">
                  MESSAGE
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-cyber-purple text-white font-cyber py-3 px-4 rounded mt-6 hover:bg-cyber-purple/80 transition-colors duration-300 shadow-neon-purple"
              >
                SEND MESSAGE
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="font-cyber text-xl mb-2 text-white">MESSAGE SENT</h3>
              <p className="text-gray-300 font-futuristic">I'll get back to you soon!</p>
            </div>
          )}

          {/* Decorative circuit lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-transparent to-cyber-purple"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 