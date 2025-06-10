import React from 'react';
import { motion } from 'framer-motion';
import { Home, GraduationCap } from 'lucide-react'; // Using Lucide icons as discussed

// Header Component
const Header = () => {
  return (
    <motion.header
      // Using a direct hex color for 'tomato' as it's not defined in Tailwind by default
      className="bg-[#FF6347] text-white py-4 shadow-md w-full"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        borderRadius: "0 0 1rem 1rem" // Rounded bottom corners for the header
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
        <motion.h1
          className="text-xl sm:text-2xl font-bold tracking-wide flex items-center"
          whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.7)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <GraduationCap size={30} className="inline-block mr-2 text-[#FFD700]" /> {/* Gold color, adjusted size */}
          MadeOfTech
        </motion.h1>
        <nav className="space-x-4">
          <motion.a
            href="#"
            className="hover:text-[#FFD700] transition-colors flex items-center p-2 rounded-md"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Home size={20} className="inline-block mr-1" /> Home {/* Adjusted size */}
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
