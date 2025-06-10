import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaGraduationCap } from "react-icons/fa";

const Header = () => {
  return (
    <motion.header
      className="bg-tomato text-white py-4 shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.h1
          className="text-xl font-bold tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          <FaGraduationCap className="inline-block mr-2 text-green-300" />
          MadeOfTech
        </motion.h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-green-300 transition-colors">
            <FaHome className="inline-block mr-1" /> Home
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

