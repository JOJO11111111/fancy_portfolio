import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Export a ref type for use in other components
export type KonamiFormRef = {
  showForm: () => void;
};

const KonamiContactForm = forwardRef<KonamiFormRef>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Expose the showForm method via ref
  useImperativeHandle(ref, () => ({
    showForm: () => {
      console.log('Showing form via ref method');
      setIsVisible(true);
    }
  }));

  // Simplified Konami code detector
  useEffect(() => {
    // Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'];
    let konamiIndex = 0;

    const checkKonami = (e: KeyboardEvent) => {
      // Get the key pressed (handling both key and code)
      const key = e.key.toLowerCase();

      // Debug
      console.log(`Key pressed: ${key}, expecting: ${konamiCode[konamiIndex].toLowerCase()}`);

      // Reset if wrong key
      if (key !== konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex = 0;

        // If the wrong key is the first key of sequence, give it another chance
        if (key === konamiCode[0].toLowerCase()) {
          konamiIndex = 1;
        }
        return;
      }

      // Increment the index
      konamiIndex++;

      // Check if complete sequence
      if (konamiIndex === konamiCode.length) {
        console.log('KONAMI CODE DETECTED!');
        setIsVisible(true);
        konamiIndex = 0;
      }
    };

    document.addEventListener('keydown', checkKonami);

    return () => {
      document.removeEventListener('keydown', checkKonami);
    };
  }, []);

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

  const closeForm = () => {
    setIsVisible(false);
    setShowSuccess(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cyber-grid-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
            />

            {/* Form Container */}
            <motion.div
              className="relative bg-cyber-dark border border-cyber-blue/50 rounded-lg max-w-md w-full p-8 z-10 overflow-hidden"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              {/* Access Granted Animation */}
              <AnimatePresence>
                {!showSuccess && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-cyber-dark z-20 access-granted-overlay pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3.0, delay: 0.5 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.5 }}
                    >
                      <div className="text-center">
                        <h2 className="font-cyber text-3xl text-cyber-red mb-2 neon-text-red">ACCESS GRANTED</h2>
                        {/* <p className="font-futuristic text-gray-300">Secret communication channel unlocked</p> */}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyber-blue"
                onClick={closeForm}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="mb-6">
                <h2 className="font-cyber text-xl mb-2 text-white">ENCRYPTED TRANSMISSION</h2>
                <p className="text-gray-300 font-futuristic text-sm">Your message will be securely transmitted to my database.</p>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div className="relative mt-6">
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-cyber-black border border-cyber-blue/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-blue transition-colors"
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
                          className="w-full bg-cyber-black border border-cyber-blue/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-blue transition-colors"
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
                          className="w-full bg-cyber-black border border-cyber-blue/30 text-white rounded px-4 py-3 outline-none focus:border-cyber-blue transition-colors"
                          placeholder="Your message"
                        ></textarea>
                        <span className="absolute -top-5 left-2 text-sm text-gray-400 bg-cyber-dark px-2">
                          MESSAGE
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-cyber-blue text-cyber-black font-cyber py-3 px-4 rounded mt-6 hover:bg-cyber-blue/80 transition-colors duration-300 shadow-neon-blue"
                    >
                      TRANSMIT MESSAGE
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    className="text-center py-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
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
                    <h3 className="font-cyber text-xl mb-2 text-white">TRANSMISSION COMPLETE</h3>
                    <p className="text-gray-300 font-futuristic">Message received. I will decrypt and respond soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative circuit lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-purple via-transparent to-cyber-blue"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default KonamiContactForm;