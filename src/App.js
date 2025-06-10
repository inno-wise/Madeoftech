import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Search, Mail, Phone, Coffee, Rocket, Users, BookOpen, Settings, Info,
  ShoppingBag, FolderDot, BarChart, Sun, Moon,
  XCircle, CheckCircle, Award, Heart, Share2, MessageCircle, ThumbsUp, HelpCircle, RefreshCw, AlertTriangle, Timer, User, Key,
  Palette, Code, GraduationCap, PlayCircle, Rss, Globe // Added for new components
} from 'lucide-react';

// Global helper for Lucide icons (centralized)
const getAppIcon = (iconName, size = 20, className = "") => {
  const IconComponent = {
    Zap, Search, Mail, Phone, Coffee, Rocket, Users, BookOpen, Settings, Info,
    ShoppingBag, FolderDot, BarChart, Sun, Moon,
    XCircle, CheckCircle, Award, Heart, Share2, MessageCircle, ThumbsUp, HelpCircle, RefreshCw, AlertTriangle, Timer, User, Key,
    Palette, Code, GraduationCap, PlayCircle, Rss, Globe
  }[iconName];
  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }
  return null;
};

// --- Inlined Components Start Here ---

// Header Component
const Header = () => {
  return (
    <motion.header
      className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-40 rounded-b-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          {getAppIcon('Zap', 28, "text-green-400")} {/* Changed to green-400 */}
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-tomato-500"> {/* Ensured green-to-tomato */}
            MadeOfTech
          </h1>
        </div>
        <nav>
          {/* Navigation links will be handled in App.js directly for simplicity here */}
        </nav>
      </div>
    </motion.header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-400 p-8 mt-12 shadow-inner rounded-t-xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="container mx-auto text-center px-4">
        <div className="flex justify-center space-x-6 mb-6">
          {/* Icons without specific colors here will inherit text-gray-400 */}
          <a href="#" className="hover:text-white transition-colors">Twitter (Placeholder)</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn (Placeholder)</a>
          <a href="#" className="hover:text-white transition-colors">GitHub (Placeholder)</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} MadeOfTech by Jaydaplug. All rights reserved.</p>
        <p className="text-xs mt-2">Innovating the future, one line of code at a time.</p>
      </div>
    </motion.footer>
  );
};

// Comments Component (Placeholder)
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, author: 'Anonymous' }]);
      setNewComment('');
    }
  };

  return (
    <motion.section
      id="comments-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tomato-400 to-green-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to tomato-green gradient */}
        {getAppIcon('MessageCircle', 30, "text-green-300")} {/* Changed to green-300 */}
        <span>Comments & Feedback</span>
      </h2>
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <textarea
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
            rows="4"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <motion.button
            onClick={addComment}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Comment
          </motion.button>
        </div>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-center italic">No comments yet. Be the first to share!</p>
          ) : (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-200 mb-1">{comment.text}</p>
                <p className="text-sm text-gray-400">- {comment.author}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
};

// Chatbox Component (Placeholder)
const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputMessage, sender: 'You' }]);
      setInputMessage('');
      // Simulate AI response (or integrate actual AI later)
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { id: Date.now() + 1, text: "I received your message!", sender: 'AI' }]);
      }, 1000);
    }
  };

  return (
    <motion.section
      id="chatbox-section" // Added ID for navigation
      className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-2xl z-50 border border-gray-700"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-400 flex items-center">
          {getAppIcon('MessageCircle', 20, "mr-2")} AI Chatbot
        </h3>
        <motion.button className="text-gray-400 hover:text-white" whileHover={{ scale: 1.1 }}>
          {getAppIcon('XCircle', 20)}
        </motion.button>
      </div>
      <div className="h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center italic text-sm mt-8">Start a conversation!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <motion.div
                className={`max-w-[75%] p-3 rounded-lg ${msg.sender === 'You' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-100'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {msg.text}
              </motion.div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-gray-700 flex">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <motion.button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {getAppIcon('Zap', 20)}
        </motion.button>
      </div>
    </motion.section>
  );
};

// Auth Component (Placeholder)
const AuthComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'test' && password === 'password') {
      setIsLoggedIn(true);
      setMessage('Login successful!');
    } else {
      setMessage('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('Logged out.');
  };

  return (
    <motion.section
      id="auth-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('User', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Authentication</span>
      </h2>
      <div className="max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-md border border-gray-600">
        {isLoggedIn ? (
          <div>
            <p className="text-xl text-green-400 mb-4">Welcome back, {username}!</p>
            <motion.button
              onClick={handleLogout}
              className="px-6 py-3 bg-tomato-600 text-white font-semibold rounded-lg shadow-md hover:bg-tomato-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            {message && <p className={`mt-4 text-sm ${isLoggedIn ? 'text-green-400' : 'text-tomato-400'}`}>{message}</p>}
          </form>
        )}
      </div>
    </motion.section>
  );
};

// Blog Component (Placeholder)
const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is shaping the landscape of modern web development and its impact on developer workflows.",
      date: "May 20, 2025",
      icon: "Code"
    },
    {
      id: 2,
      title: "Demystifying Blockchain: A Beginner's Guide",
      excerpt: "An easy-to-understand introduction to blockchain technology, its core concepts, and real-world applications beyond cryptocurrency.",
      date: "April 15, 2025",
      icon: "Globe"
    },
    {
      id: 3,
      title: "Enhancing User Experience with Micro-interactions",
      excerpt: "Discover the power of subtle animations and feedback to create delightful and intuitive user interfaces.",
      date: "March 10, 2025",
      icon: "Palette"
    },
  ];

  return (
    <motion.section
      id="blog-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('Rss', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Our Latest Blog Posts</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(34,139,34,0.4)" }}
          >
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-green-300 mb-2 flex items-center"> {/* Changed to green-300 */}
                {getAppIcon(post.icon, 24, "mr-2")} {post.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3 flex-grow">{post.excerpt}</p>
              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-600">
                <span className="text-xs font-semibold px-2 py-1 bg-gray-600 rounded-full text-gray-400">{post.date}</span>
                <a href="#" className="text-tomato-400 hover:underline font-medium text-sm">Read More →</a> {/* Changed to tomato-400 */}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

// LanguageSwitcher Component (Placeholder)
const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // In a real app, you would load translations here
    console.log(`Language changed to: ${e.target.value}`);
  };

  return (
    <motion.div
      id="language-switcher-section" // Added ID for navigation
      className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-800 p-4 rounded-lg shadow-lg mb-12 border border-gray-700 max-w-sm mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {getAppIcon('Globe', 24)}
      <label htmlFor="language-select" className="text-lg">Language:</label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </motion.div>
  );
};

// NewsletterForm Component (Placeholder)
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      setSubscribed(true);
      setMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <motion.section
      id="newsletter-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('Mail', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Subscribe to Our Newsletter</span>
      </h2>
      <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
        Get the latest insights, tutorials, and exclusive offers delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Your Email Address"
          className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" // Changed ring color
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>
      {message && (
        <motion.p
          className={`mt-4 text-sm ${subscribed ? 'text-green-400' : 'text-tomato-400'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.section>
  );
};

// Projects Component (Placeholder)
const Projects = () => {
  const projectList = [
    {
      id: 1,
      title: "AI-Powered Cybersecurity Dashboard",
      description: "A real-time threat intelligence dashboard leveraging AI for anomaly detection and predictive analysis.",
      technologies: ["React", "Python (Flask)", "TensorFlow", "D3.js"],
      icon: "BarChart"
    },
    {
      id: 2,
      title: "Interactive E-learning Platform",
      description: "A comprehensive platform with gamified learning modules, progress tracking, and live coding environments.",
      technologies: ["Next.js", "Node.js", "MongoDB", "WebSockets"],
      icon: "GraduationCap"
    },
    {
      id: 3,
      title: "Mobile-First UI/UX Design System",
      description: "A reusable and scalable design system focused on accessibility and intuitive user experiences across devices.",
      technologies: ["Figma", "Storybook", "Tailwind CSS"],
      icon: "Palette"
    },
  ];

  return (
    <motion.section
      id="projects-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('FolderDot', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Our Showcase Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectList.map((project, index) => (
          <motion.article
            key={project.id}
            className="bg-gray-700 rounded-lg shadow-md p-6 border border-gray-600 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(34,139,34,0.4)" }}
          >
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-green-300 mb-2 flex items-center"> {/* Changed to green-300 */}
                {getAppIcon(project.icon, 24, "mr-2")} {project.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4 flex-grow">{project.description}</p>
              <div className="mt-auto">
                <p className="text-xs text-gray-400 mb-2">Technologies Used:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-600 rounded-full text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#" className="mt-4 inline-block text-tomato-400 hover:underline font-medium text-sm">View Project →</a> {/* Changed to tomato-400 */}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

// Quiz Component (Placeholder)
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      question: "Which of the following is NOT a core principle of UI/UX design?",
      options: ["Usability", "Learnability", "Affordance", "Monetization"],
      answer: "Monetization"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High-level Text Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which of these is a common cybersecurity threat?",
      options: ["Phishing", "Cloud Computing", "Version Control", "Containerization"],
      answer: "Phishing"
    }
  ];

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <motion.section
      id="quiz-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('HelpCircle', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Test Your Tech Knowledge!</span>
      </h2>
      <div className="max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-md border border-gray-600">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4">Quiz Complete!</h3>
            <p className="text-lg text-gray-200 mb-6">You scored {score} out of {quizQuestions.length}!</p>
            <motion.button
              onClick={resetQuiz}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion} // Key for re-rendering motion.div on question change
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-200 mb-6">{quizQuestions[currentQuestion].question}</p>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-green-500 transition-colors duration-200 text-left"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Skills Component (Placeholder)
const Skills = () => {
  const categories = {
    Development: [
      { name: "React.js", level: "Advanced", icon: "Code" },
      { name: "Next.js", level: "Intermediate", icon: "Code" },
      { name: "Node.js", level: "Intermediate", icon: "Code" },
      { name: "Python", level: "Advanced", icon: "Code" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette" },
      { name: "Firebase", level: "Intermediate", icon: "Zap" },
    ],
    Cybersecurity: [
      { name: "Network Security", level: "Advanced", icon: "Key" },
      { name: "Penetration Testing", level: "Intermediate", icon: "AlertTriangle" },
      { name: "Security Auditing", level: "Advanced", icon: "Search" },
      { name: "Incident Response", level: "Intermediate", icon: "RefreshCw" },
    ],
    "UI/UX Design": [
      { name: "Figma", level: "Advanced", icon: "Palette" },
      { name: "User Research", level: "Intermediate", icon: "Users" },
      { name: "Wireframing & Prototyping", level: "Advanced", icon: "Rocket" },
      { name: "Design Systems", level: "Intermediate", icon: "Settings" },
    ],
  };

  return (
    <motion.section
      id="skills-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
        {getAppIcon('Award', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
        <span>Our Expertise & Skills</span>
      </h2>
      <div className="space-y-10">
        {Object.entries(categories).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-tomato-300 mb-6 flex items-center space-x-2"> {/* Changed to green-tomato gradient */}
              {getAppIcon(skills[0].icon, 28, "text-green-200")} {/* Using first skill's icon as category icon */}
              <span>{category}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="bg-gray-700 rounded-lg shadow-md p-5 border border-gray-600 flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: skillIndex * 0.05 + index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 10px rgba(255,99,71,0.4)" }}
                >
                  {getAppIcon(skill.icon, 24, "text-tomato-400")} {/* Changed to tomato-400 */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-100">{skill.name}</h4>
                    <p className="text-sm text-gray-400">{skill.level}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// VideoSection Component (Placeholder)
const VideoSection = () => {
  const videos = [
    {
      id: "video1",
      title: "Introduction to React Hooks",
      youtubeId: "dpw9EHDh2bM", // Example YouTube ID
      description: "A comprehensive guide to understanding and using React Hooks for efficient component development.",
      icon: "Code"
    },
    {
      id: "video2",
      title: "Cybersecurity Best Practices for Small Businesses",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube ID (Rick Roll, replace with real one)
      description: "Essential tips and strategies to protect your business from common cyber threats and data breaches.",
      icon: "Key"
    },
    {
      id: "video3",
      title: "Mastering Figma for UI/UX Design",
      youtubeId: "sB0BnUUEf6Y", // Example YouTube ID
      description: "Learn advanced techniques in Figma to create stunning and functional user interfaces.",
      icon: "Palette"
    },
  ];

  return (
    <motion.section
      id="video-section" // Added ID for navigation
      className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tomato-400 to-green-400 mb-8 flex items-center justify-center space-x-2"> {/* Changed to tomato-green gradient */}
        {getAppIcon('PlayCircle', 30, "text-green-300")} {/* Changed to green-300 */}
        <span>Featured Video Tutorials</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(255,99,71,0.4)" }}
          >
            <div className="relative w-full h-48 bg-black flex items-center justify-center">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-tomato-300 mb-2 flex items-center"> {/* Changed to tomato-300 */}
                {getAppIcon(video.icon, 24, "mr-2")} {video.title}
              </h3>
              <p className="text-sm text-gray-300 flex-grow mb-3">{video.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-green-400 hover:underline font-medium text-sm"
              >
                Watch on YouTube →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};


// --- Inlined Components End Here ---


// Simulated Article Data (for "Latest Articles" section)
const latestArticles = [
  {
    id: 'art1',
    title: 'Mastering React Hooks for Modern Web Development',
    summary: 'Dive deep into useState, useEffect, and custom hooks to build scalable and maintainable React applications. Essential for every developer.',
    category: 'Web Development',
    image: 'https://placehold.co/400x225/228B22/FFFFFF?text=React+Hooks',
    link: '#', // Placeholder link
  },
  {
    id: 'art2',
    title: 'Cybersecurity Fundamentals: Protecting Your Digital Footprint',
    summary: 'Learn essential strategies to enhance your online security, from strong passwords to understanding common cyber threats. Stay safe online!',
    category: 'Cybersecurity',
    image: 'https://placehold.co/400x225/DC143C/FFFFFF?text=Cyber+Security',
    link: '#', // Placeholder link
  },
  {
    id: 'art3',
    title: 'The Art of UI/UX Design: Creating Intuitive User Experiences',
    summary: 'Explore the principles of user interface and user experience design that captivate users and drive engagement. Design with empathy.',
    category: 'Design',
    image: 'https://placehold.co/400x225/228B22/FFFFFF?text=UI/UX+Design',
    link: '#', // Placeholder link
  },
];


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // State for services modal
  const [showServicesModal, setShowServicesModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    // Apply or remove dark mode class to body for global styling
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [darkMode]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker registered for offline caching"))
        .catch(error => console.error("❌ Service Worker registration failed:", error));
    }
    // Set default font
    document.documentElement.style.fontFamily = "'Inter', sans-serif";
  }, []);

  // Simulate search functionality
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filteredArticles = latestArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredArticles);
  }, []);


  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
  };

  const mainIntroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
  };

  const articleCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } },
  };


  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out font-inter relative overflow-hidden ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Global Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-[10%] left-[10%]"
          animate={{ x: ['0%', '100%', '0%'], y: ['0%', '100%', '0%'], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-tomato-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 bottom-[15%] right-[10%]"
          animate={{ x: ['0%', '-100%', '0%'], y: ['0%', '-100%', '0%'], rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 top-[30%] right-[20%]" /* Changed to green-500 */
          animate={{ x: ['0%', '50%', '0%'], y: ['0%', '-50%', '0%'], rotate: [0, -360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear", delay: 4 }}
        />
      </div>

      {/* Manual Helmet (for environment without react-helmet) */}
      <head>
        <title>MadeOfTech - Jaydaplug</title>
        <meta name="description" content="Official site of Jaydaplug | Madeoftech - Developer, Cybersecurity Expert, UI/UX Designer, and Innovator. Explore tutorials, services, and creative works." />
        <meta name="theme-color" content="#228B22" /> {/* Green theme color */}
        <meta name="author" content="Jaydaplug | Madeoftech" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />

        {/* Enhanced Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            img-src 'self' https://placehold.co data:;
            font-src 'self' https://fonts.gstatic.com;
            connect-src 'self';
            frame-src 'self' https://www.youtube.com;
            media-src 'self';
          `}
        />
        {/* Permissions Policy for Camera, Microphone, Geolocation */}
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        {/* Referrer Policy for enhanced privacy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-4 right-4 p-3 rounded-full bg-tomato-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out z-50"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          getAppIcon('Sun', 24, "text-yellow-300")
        ) : (
          getAppIcon('Moon', 24, "text-gray-200")
        )}
      </motion.button>

      {/* Main Content Area (z-10 to be above background blobs) */}
      <div className="relative z-10">
          {/* Header */}
          <motion.div variants={headerVariants} initial="hidden" animate="visible">
            <Header />
          </motion.div>

          {/* Main Navigation */}
          <motion.nav
            className="bg-gray-900 text-white py-3 shadow-md border-b border-gray-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ul className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-md font-medium">
              <li><a href="#auth-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Auth</a></li>
              <li><a href="#blog-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Blog</a></li>
              <li><a href="#language-switcher-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Language</a></li>
              <li><a href="#newsletter-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Newsletter</a></li>
              <li><a href="#projects-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Projects</a></li>
              <li><a href="#quiz-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Quiz</a></li>
              <li><a href="#skills-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Skills</a></li>
              <li><a href="#video-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Videos</a></li>
              <li><a href="#comments-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Comments</a></li>
              <li><a href="#chatbox-section" className="hover:text-green-400 transition-colors py-1 px-3 rounded-md">Chatbox</a></li>
            </ul>
          </motion.nav>

          {/* Language Switcher (could also be placed in Header) */}
          <motion.section
            className="py-6 px-4 text-center container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <LanguageSwitcher />
          </motion.section>

          {/* Main Intro Section */}
          <motion.main
            className="px-6 py-16 text-center container mx-auto"
            variants={mainIntroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-tomato-500 mb-6"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {getAppIcon('Rocket', 36, "inline-block mr-3 text-green-400")}
              Welcome to <span className="text-tomato-500">MadeOfTech</span>
            </motion.h1>

            <motion.p
              className="text-lg max-w-2xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Jaydaplug’s upgraded web app. Explore a world of expertise in **Development**, **Cybersecurity**, **UI/UX Design**, and **Innovation**!
            </motion.p>
          </motion.main>

          {/* Authentication Section */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AuthComponent />
          </motion.section>

          {/* Search Section */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-6 flex items-center justify-center space-x-2"> {/* Changed to green-tomato gradient */}
              {getAppIcon('Search', 30, "text-tomato-300")} {/* Changed to tomato-300 */}
              <span>Search Our Content</span>
            </h2>
            <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 max-w-md mx-auto shadow-inner">
              <input
                type="text"
                placeholder="Search articles, tutorials, or services..."
                className="flex-grow bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <motion.button
                className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSearch(searchQuery)}
              >
                {getAppIcon('Search', 24)}
              </motion.button>
            </div>
            {searchResults.length > 0 && (
              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <h3 className="col-span-full text-xl font-semibold text-gray-200 text-left mb-4">Search Results:</h3>
                {searchResults.map((article, index) => (
                  <motion.article
                    key={article.id}
                    className="bg-gray-700 rounded-lg shadow-md p-4 text-left border border-gray-600"
                    variants={articleCardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index} // For staggered animation
                  >
                    <h4 className="text-lg font-bold text-green-300 mb-2">{article.title}</h4>
                    <p className="text-sm text-gray-300 line-clamp-2">{article.summary}</p>
                    <a href={article.link} className="mt-3 inline-block text-tomato-400 hover:underline text-sm font-medium">Read More →</a>
                  </motion.article>
                ))}
              </motion.div>
            )}
            {searchQuery && searchResults.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-gray-400 italic"
                >
                  No results found for "{searchQuery}".
                </motion.p>
              )}
          </motion.section>

          {/* Latest Articles Section (existing) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center justify-center space-x-2">
              {getAppIcon('BookOpen', 30, "text-green-300")}
              <span>Latest Insights & Tutorials</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 flex flex-col"
                  variants={articleCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(34,139,34,0.4)" }}
                >
                  <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-green-300 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-300 mb-3 flex-grow">{article.summary}</p>
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-600">
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-600 rounded-full text-gray-400">{article.category}</span>
                      <a href={article.link} className="text-tomato-400 hover:underline font-medium text-sm">Read More →</a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Blog Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Blog />
          </motion.section>

          {/* Skills Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Skills />
          </motion.section>

          {/* Projects Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Projects />
          </motion.section>

          {/* Video Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <VideoSection />
          </motion.section>

          {/* Quiz Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Quiz />
          </motion.section>

          {/* Call to Actions / Contact Info */}
          <motion.aside
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto bg-gray-800 rounded-xl shadow-lg mb-12 border border-gray-700 text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tomato-400 to-green-400 mb-6 flex items-center justify-center space-x-2"> {/* Changed to tomato-green gradient */}
              {getAppIcon('Info', 30, "text-green-300")} {/* Changed to green-300 */}
              <span>Connect with Jaydaplug</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Ready to elevate your tech presence or need expert consultation? Reach out today!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:innocent@madeoftech.net"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform active:scale-98"
                target="_blank" rel="noopener noreferrer"
              >
                {getAppIcon('Mail', 20)}
                <span>Email: innocent@madeoftech.net</span>
              </a>
              <a
                href="tel:+254702250123"
                className="flex items-center space-x-2 px-6 py-3 bg-tomato-600 text-white font-semibold rounded-lg shadow-md hover:bg-tomato-700 transition-colors duration-200 transform active:scale-98"
              >
                {getAppIcon('Phone', 20)}
                <span>Call: 0702250123</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <motion.button
                onClick={() => setShowServicesModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform active:scale-98"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getAppIcon('ShoppingBag', 20)}
                <span>Our Services & Pricing</span>
              </motion.button>
              <a
                href="https://wa.me/254702250123" // Replace with actual WhatsApp link
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 transform active:scale-98"
                target="_blank" rel="noopener noreferrer"
              >
                {getAppIcon('Users', 20)}
                <span>Hire Me (WhatsApp)</span>
              </a>
              <a
                href="https://buy.stripe.com/test_dummy_link" // Placeholder: Replace with actual M-Pesa payment link or info
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform active:scale-98"
                target="_blank" rel="noopener noreferrer"
              >
                {getAppIcon('Coffee', 20)}
                <span>Buy Me A Coffee (M-Pesa)</span>
              </a>
            </div>
          </motion.aside>

          {/* Newsletter Form Section (new) */}
          <motion.section
            className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <NewsletterForm />
          </motion.section>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Comments />
          </motion.div>

          {/* Chatbox */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Chatbox />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Footer />
          </motion.div>
      </div> {/* End of relative z-10 div */}

      {/* Services & Pricing Modal (placed at App level for global access) */}
      <AnimatePresence>
        {showServicesModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowServicesModal(false)}
          >
            <motion.div
              className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative border border-gray-700 text-left"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowServicesModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                {getAppIcon('XCircle', 24)}
              </button>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-6 flex items-center space-x-2"> {/* Changed to green-tomato gradient */}
                {getAppIcon('ShoppingBag', 32, "text-green-400")} {/* Changed to green-400 */}
                <span>Our Services & Pricing</span>
              </h3>

              <div className="space-y-6">
                {/* General Services */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-3">
                    {getAppIcon('CheckCircle', 20, "text-green-400")} Core Platform Access
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Interactive tutorials & demos</li>
                    <li>Community forums & support</li>
                    <li>Basic content access (Free Tier)</li>
                  </ul>
                </div>

                {/* Premium Subscription */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-3">
                    {getAppIcon('Award', 20, "text-green-400")} Premium Membership (500 KES/month) {/* Changed to green-400 */}
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Full access to all premium content</li>
                    <li>Ad-free experience</li>
                    <li>Priority customer support</li>
                    <li>Early access to new features</li>
                  </ul>
                </div>

                {/* Specific Creative Services */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-3">
                    {getAppIcon('FolderDot', 20, "text-tomato-400")} Creative & Design Services
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Custom CV/Resume Design: <span className="font-semibold text-green-300">from 300 KES</span></li>
                    <li>Poster/Flyer Design: <span className="font-semibold text-green-300">from 300 KES</span></li>
                    <li>Presentation Design</li>
                    <li>Branding & Logo Creation</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-2 italic">
                    Contact us for a custom quote on creative services!
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowServicesModal(false)}
                className="mt-8 w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform active:scale-98"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Got It!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
