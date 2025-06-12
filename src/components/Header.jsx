// src/components/Header.jsx

import React, { useRef } from 'react'; // useEffect is not used in Header, removed from import
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck, LayoutTemplate, FileText, Code, Bot, Fingerprint, // Icons for categories
  Home, GraduationCap, // Used in Header component
  // Removed BookOpen from imports as it's not used in this file
} from 'lucide-react';

// --- CategoryCard Component (New) ---
// This component encapsulates the logic for a single category card,
// including its own useRef and useInView hooks for individual animation.
const CategoryCard = ({ category, index, cardVariants }) => {
  const ref = useRef(null);
  // useInView hook is correctly called at the top level of CategoryCard component
  const inView = useInView(ref, { once: true, amount: 0.3 }); // Trigger when 30% of item is visible

  return (
    <motion.div
      ref={ref}
      key={index}
      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 sm:p-8 flex flex-col items-start space-y-4 border border-gray-700 cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      // Animate based on the 'inView' state from useInView
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }} // Click animation for the card
    >
      <div className="p-3 bg-gray-700 rounded-full text-white flex items-center justify-center shadow-md">
        {category.icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-50">{category.title}</h2>
      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{category.description}</p>
      <motion.button
        className="mt-auto px-5 py-2 bg-[#FF6347] text-white rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,99,71,0.5)" }}
        whileTap={{ scale: 0.95 }} // Click animation for the button
      >
        Learn More
      </motion.button>
    </motion.div>
  );
};


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

// Main App component
function App() {
  // Define the categories with their titles, descriptions, and icons
  const categories = [
    {
      title: "Cybersecurity & Ethical Hacking",
      description: "Explore the world of digital defense and learn ethical hacking techniques to secure systems.",
      icon: <ShieldCheck size={24} className="text-[#FFD700]" /> // Gold accent
    },
    {
      title: "Canvas & Posters Design",
      description: "Unleash your creativity with tools and tips for designing stunning digital canvases and print-ready posters.",
      icon: <LayoutTemplate size={24} className="text-[#98FB98]" /> // PaleGreen accent
    },
    {
      title: "Writing & CV Templates",
      description: "Master the art of effective communication and create professional CVs that stand out.",
      icon: <FileText size={24} className="text-[#87CEEB]" /> // SkyBlue accent
    },
    {
      title: "Web Development & Design",
      description: "Build and design responsive, user-friendly websites from scratch to advanced frameworks.",
      icon: <Code size={24} className="text-[#FFA07A]" /> // LightSalmon accent
    },
    {
      title: "Web Scraping & Automation",
      description: "Automate data collection and repetitive web tasks with powerful web scraping techniques.",
      icon: <Bot size={24} className="text-[#ADD8E6]" /> // LightBlue accent
    },
    {
      title: "Computer Forensics",
      description: "Dive into digital forensics, investigating cyber crimes and recovering crucial digital evidence.",
      icon: <Fingerprint size={24} className="text-[#EE82EE]" /> // Violet accent
    }
  ];

  // Variants for scroll-in animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-inter flex flex-col items-center overflow-x-hidden">
      {/* Tailwind CSS CDN and Font Import - placed here for self-containment */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Custom tomato shade */
        .bg-tomato-dark {
          background-color: #CD5C5C; /* IndianRed - a shade of tomato */
        }
        `}
      </style>

      {/* Header Section */}
      <Header />
       
       <nav className="flex space-x-4">
  <motion.a href="#home" className="hover:text-[#FFD700] transition-colors flex items-center px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    <Home size={18} className="mr-1" /> Home
  </motion.a>
  <motion.a href="#skills" className="hover:text-[#FFD700] transition-colors flex items-center px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    <GraduationCap size={18} className="mr-1" /> Skills
  </motion.a>
  <motion.a href="#projects" className="hover:text-[#FFD700] transition-colors px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    Projects
  </motion.a>
  <motion.a href="#blogs" className="hover:text-[#FFD700] transition-colors px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    Blog
  </motion.a>
  <motion.a href="#quiz" className="hover:text-[#FFD700] transition-colors px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    Quiz
  </motion.a>
  <motion.a href="#video" className="hover:text-[#FFD700] transition-colors px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    Video
  </motion.a>
  <motion.a href="#newsletter" className="hover:text-[#FFD700] transition-colors px-3 py-2 rounded-md"
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.95 }}>
    Newsletter
  </motion.a>
</nav>


      {/* Main Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4 pt-8">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] text-center mb-8 col-span-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Digital Horizon Hub
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-12 col-span-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Your comprehensive resource for cybersecurity, creative design, web development, and digital investigation.
        </motion.p>

        {/* Render Category Cards using the new component */}
        {categories.map((category, index) => (
          <CategoryCard
            key={index} // Using index as key is generally fine for static lists without reordering
            category={category}
            index={index}
            cardVariants={cardVariants}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
