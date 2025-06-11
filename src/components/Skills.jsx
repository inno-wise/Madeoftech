// src/components/Skills.jsx

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code, Shield, Laptop, Palette, BookText, Bot // Kept only used icons
  // Removed unused icons like Server, Bug, Search, PenTool, Database from import
} from 'lucide-react';

// --- SkillCategoryCard Component (New) ---
// This component encapsulates the logic for a single skill category card,
// including its own useRef and useInView hooks for individual animation.
const SkillCategoryCard = ({ category, index, categoryVariants, skillTagVariants }) => {
  const ref = useRef(null);
  // useInView hook is correctly called at the top level of SkillCategoryCard component
  const inView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% of item is visible

  return (
    <motion.div
      ref={ref}
      key={index}
      className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start border border-gray-700"
      variants={categoryVariants}
      initial="hidden"
      // Animate based on the 'inView' state from useInView
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
    >
      <div className="p-3 bg-gray-700 rounded-full text-white mb-4 shadow-md">
        {category.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-50 mb-4">{category.title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skillIndex}
            className="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full border border-gray-600 cursor-pointer hover:bg-[#CD5C5C] transition-colors duration-200"
            variants={skillTagVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate skill tags when category is in view
            transition={{ delay: index * 0.15 + skillIndex * 0.05 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 6px rgba(255,99,71,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};


// Skills Component
const Skills = () => {
  // Define skill categories and their respective skills
  const skillCategories = [
    {
      title: "Cybersecurity & Ethical Hacking",
      icon: <Shield size={24} className="text-[#FFD700]" />, // Gold
      skills: [
        "Network Security", "Penetration Testing", "Vulnerability Assessment",
        "Incident Response", "Malware Analysis", "Security Auditing",
        "Web Application Security", "Cloud Security", "Cryptography"
      ]
    },
    {
      title: "Web Development & Design",
      icon: <Code size={24} className="text-[#98FB98]" />, // PaleGreen
      skills: [
        "React.js", "Next.js", "Node.js", "Express.js", "JavaScript (ES6+)",
        "HTML5", "CSS3", "Tailwind CSS", "RESTful APIs", "Responsive Design",
        "UI/UX Principles", "Figma", "Webflow"
      ]
    },
    {
      title: "Web Scraping & Automation",
      icon: <Bot size={24} className="text-[#87CEEB]" />, // SkyBlue
      skills: [
        "Python (BeautifulSoup, Scrapy)", "Selenium", "Puppeteer",
        "Data Extraction", "Browser Automation", "API Integration",
        "Data Cleaning", "Proxy Management"
      ]
    },
    {
      title: "Computer Forensics",
      icon: <Laptop size={24} className="text-[#FFA07A]" />, // LightSalmon
      skills: [
        "Digital Evidence Collection", "Data Recovery", "Disk Imaging",
        "Forensic Tools (Autopsy, FTK Imager)", "Chain of Custody",
        "Malware Forensics", "Network Forensics"
      ]
    },
    {
      title: "Writing & Content Creation",
      icon: <BookText size={24} className="text-[#ADD8E6]" />, // LightBlue
      skills: [
        "Technical Writing", "CV/Resume Writing", "Content Strategy",
        "Copywriting", "Blog Posts", "Research & Reporting", "Proofreading"
      ]
    },
    {
      title: "Graphic Design & UI/UX",
      icon: <Palette size={24} className="text-[#EE82EE]" />, // Violet
      skills: [
        "Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva",
        "Branding", "Layout Design", "Typography", "Color Theory",
        "User Interface (UI) Design", "User Experience (UX) Design"
      ]
    }
  ];

  // Variants for scroll-in animation for categories
  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variants for individual skill tags
  const skillTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Our Expertise
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard
            key={index} // Using index as key is generally fine for static lists without reordering
            category={category}
            index={index}
            categoryVariants={categoryVariants}
            skillTagVariants={skillTagVariants}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
