import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react"; // Using Lucide icon for chat

export default function Chatbox() {
  // Variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  };

  // Variants for text animation
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12 flex flex-col items-center justify-center min-h-[250px]"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-4 flex items-center space-x-3"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <MessageSquareText size={36} className="text-[#FFD700]" /> {/* Gold accent icon */}
        <span>Chatbox</span>
      </motion.h3>

      <motion.p
        className="text-gray-300 text-lg mt-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, ...textVariants.visible.transition }}
      >
        Live chat functionality is currently under development.
      </motion.p>
      <motion.p
        className="text-gray-400 text-sm mt-2"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4, ...textVariants.visible.transition }}
      >
        Stay tuned for real-time conversations!
      </motion.p>

      {/* You could add a simple placeholder for future chat input/messages here */}
      {/* <div className="mt-8 w-full bg-gray-700 rounded-lg p-4 h-48 flex items-center justify-center text-gray-500 italic">
        [Future Chat Messages Here]
      </div>
      <button className="mt-4 px-6 py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200">
        Start Chat
      </button> */}
    </motion.section>
  );
}
