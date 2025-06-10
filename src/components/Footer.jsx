import React from 'react';
import { motion } from 'framer-motion';

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      // Matched background color to the header (Tomato) and text color to white
      className="bg-[#FF6347] text-white py-6 mt-12 w-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }} // Delayed to appear after content
      style={{
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)",
        borderRadius: "1rem 1rem 0 0" // Rounded top corners for the footer
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          &copy; 2023 - {new Date().getFullYear()} MadeOfTech - Jaydaplug. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
