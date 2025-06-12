import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: "The Rise of AI in Cybersecurity",
    date: "June 1, 2025",
    excerpt: "Explore how artificial intelligence is reshaping the cybersecurity landscape, enabling faster threat detection and prevention.",
    author: "Jane Doe",
    tags: ["AI", "Cybersecurity", "Tech"],
  },
  {
    title: "Dark Web 101: What You Should Know",
    date: "May 25, 2025",
    excerpt: "Understand the structure of the dark web, what’s legal vs illegal, and how tools like Tor are used.",
    author: "John Smith",
    tags: ["Dark Web", "Privacy", "Security"],
  },
  {
    title: "Botnets Explained: How They Work",
    date: "May 18, 2025",
    excerpt: "Learn how botnets are created, used by attackers, and how you can defend against them.",
    author: "Alice Tech",
    tags: ["Networking", "Botnets", "Hacking"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Blog = () => {
  return (
    <section className="py-12 px-6 sm:px-10 lg:px-20 bg-gray-950 text-white">
      <h2 className="text-4xl font-bold mb-12 text-center">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-sm text-gray-400 mb-1">{post.date}</p>
            <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
            <p className="text-xs text-gray-500 mb-2">By {post.author}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-gray-300 hover:bg-pink-600 hover:text-white transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
