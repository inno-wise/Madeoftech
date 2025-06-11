// src/components/Projects.jsx

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code, Shield, Bot, Microscope, LayoutTemplate, PenTool, Lock,
  Palette // Icons for various project types
} from 'lucide-react'; // Removed unused icons like Globe, Server, Database from import

// --- ProjectCard Component (New) ---
// This component encapsulates the logic for a single project card,
// including its own useRef and useInView hooks for individual animation.
const ProjectCard = ({ project, index, cardVariants }) => {
  const ref = useRef(null);
  // useInView hook is correctly called at the top level of ProjectCard component
  const inView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% of item is visible

  return (
    <motion.div
      ref={ref}
      key={index}
      className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start border border-gray-700 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      // Animate based on the 'inView' state from useInView
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }} // Staggered animation
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-3 bg-gray-700 rounded-full text-white mb-4 shadow-md">
        {project.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-50 mb-3">{project.title}</h3>
      <p className="text-gray-300 leading-relaxed text-sm mb-4">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-700 w-full">
        {project.tech.map((tech, techIndex) => (
          <motion.span
            key={techIndex}
            className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600"
            whileHover={{ scale: 1.05, backgroundColor: '#CD5C5C', color: '#fff' }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};


// Projects Component
const Projects = () => {
  // Define a list of example projects
  const projectsData = [
    {
      title: "SecureAuth Web Portal",
      description: "A robust web application demonstrating secure user authentication, role-based access control, and data encryption.",
      category: "Cybersecurity & Ethical Hacking",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "OAuth"],
      icon: <Lock size={24} className="text-[#FFD700]" /> // Gold accent
    },
    {
      title: "E-commerce Web Scraper",
      description: "Python-based web scraper to collect product data (prices, reviews, availability) from major e-commerce platforms.",
      category: "Web Scraping & Automation",
      tech: ["Python", "BeautifulSoup", "Scrapy", "Selenium"],
      icon: <Bot size={24} className="text-[#87CEEB]" /> // SkyBlue accent
    },
    {
      title: "Portfolio Website Builder",
      description: "An interactive platform allowing users to drag-and-drop components to build personalized online portfolios with responsive designs.",
      category: "Web Development & Design",
      tech: ["React", "Tailwind CSS", "Drag-and-Drop API", "Firebase"],
      icon: <Palette size={24} className="text-[#98FB98]" /> // PaleGreen accent
    },
    {
      title: "Digital Forensics Toolkit",
      description: "A command-line tool for basic digital forensics tasks, including file carving, metadata extraction, and deleted file recovery.",
      category: "Computer Forensics",
      tech: ["Python", "Forensics Libraries", "CLI"],
      icon: <Microscope size={24} className="text-[#FFA07A]" /> // LightSalmon accent
    },
    {
      title: "Automated CV & Cover Letter Generator",
      description: "Generates professional CVs and cover letters from user input, with various customizable templates and export options.",
      category: "Writing & CV Templates",
      tech: ["React", "HTML2PDF", "Template Engine"],
      icon: <PenTool size={24} className="text-[#ADD8E6]" /> // LightBlue accent
    },
    {
      title: "Cyber Threat Intelligence Dashboard",
      description: "Visualizes real-time cyber threat data from open-source intelligence feeds, offering insights into attack trends and vulnerabilities.",
      category: "Cybersecurity & Ethical Hacking",
      tech: ["React", "D3.js", "REST API", "Elasticsearch"],
      icon: <Shield size={24} className="text-[#FFD700]" /> // Gold accent
    },
  ];

  // Variants for section title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variants for individual project cards animation (scroll-in effect)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] text-center mb-12"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Our Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index} // Using index as key is generally fine for static lists without reordering
            project={project}
            index={index}
            cardVariants={cardVariants}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
