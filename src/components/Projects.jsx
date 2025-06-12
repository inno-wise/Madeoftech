// src/components/Projects.jsx

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Shield, Bot, Microscope
} from 'lucide-react';

// --- Card animation variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// --- Individual Card ---
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      key={index}
      className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start border border-gray-700 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
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

// --- Main Projects Component ---
const Projects = () => {
  const projects = [
    {
      title: "AI Cyber Sentinel",
      description: "An AI-powered system that automatically detects and neutralizes cyber threats in real-time.",
      icon: <Shield size={20} className="text-[#FFD700]" />,
      tech: ["Python", "TensorFlow", "Snort"],
    },
    {
      title: "BotNet Tracker",
      description: "Tracks and maps botnet activity using honeypots and global sensors.",
      icon: <Bot size={20} className="text-[#00FFFF]" />,
      tech: ["Go", "Elasticsearch", "Grafana"],
    },
    {
      title: "Dark Web Scanner",
      description: "A tool for monitoring illicit activity on the dark web using AI NLP and Tor.",
      icon: <Microscope size={20} className="text-[#FF69B4]" />,
      tech: ["Node.js", "MongoDB", "Tor"],
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-8 lg:px-16 bg-black text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
