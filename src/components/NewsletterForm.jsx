// Placeholder content for NewsletterForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, XCircle } from 'lucide-react'; // Added XCircle for error

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [isError, setIsError] = useState(false); // New state to show submission error

  // Function to handle newsletter subscription
  const handleSubscribe = async () => {
    // Reset states before new attempt
    setIsSubscribed(false);
    setErrorMessage('');
    setIsError(false);

    // Basic email validation
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      setIsError(true);
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // --- Simulated Backend Integration ---
      // Replaced fetch with a setTimeout to simulate an asynchronous operation
      // in a client-side only environment. In a real application, you would
      // replace this with an actual fetch request to your backend API.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate a successful response
      setIsSubscribed(true);
      setEmail(''); // Clear the input field on success

      // You could also simulate an error if needed for testing:
      // throw new Error('Simulated network error');

    } catch (error) {
      // Handle simulated network errors or other exceptions
      console.error('Error subscribing:', error);
      setErrorMessage('A simulated error occurred. Please try again.'); // Or more descriptive
      setIsError(true);
    } finally {
      setIsLoading(false); // End loading regardless of success or failure
    }
  };

  // Variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  };

  // Variants for button animation
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 12px rgba(255,99,71,0.6)" },
    tap: { scale: 0.98 },
  };

  // Variants for success/error message
  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
  };

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12 flex flex-col items-center justify-center text-center"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-4 flex items-center space-x-3 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Mail size={36} className="text-[#FFD700]" /> {/* Gold accent icon */}
        <span>Stay Updated!</span>
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg mb-8 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Subscribe to our newsletter for the latest updates on cybersecurity, web development, and more.
      </motion.p>

      {/* Conditional rendering for success, error, or input form */}
      {isSubscribed ? (
        <motion.div
          className="bg-green-600 text-white p-4 rounded-lg flex items-center space-x-3 shadow-lg"
          variants={messageVariants}
          initial="hidden"
          animate="visible"
        >
          <CheckCircle2 size={24} />
          <p className="font-semibold">Thank you for subscribing!</p>
        </motion.div>
      ) : isError ? (
        <motion.div
          className="bg-red-600 text-white p-4 rounded-lg flex items-center space-x-3 shadow-lg"
          variants={messageVariants}
          initial="hidden"
          animate="visible"
        >
          <XCircle size={24} />
          <p className="font-semibold">{errorMessage}</p>
        </motion.div>
      ) : (
        <>
          <motion.input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear error messages when user starts typing again
              if (errorMessage) setErrorMessage('');
              if (isError) setIsError(false);
            }}
            className="w-full max-w-md p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-600 mb-4"
            whileFocus={{ boxShadow: "0px 0px 10px rgba(255,99,71,0.5)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            disabled={isLoading} // Disable input while loading
          />

          <motion.button
            onClick={handleSubscribe}
            className="w-full max-w-md py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75 transform active:scale-98"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Subscribe Now"
            )}
          </motion.button>
        </>
      )}
    </motion.section>
  );
};

export default Newsletter;
