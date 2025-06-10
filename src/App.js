import React, { useState, useEffect } from "react"; import { Helmet } from "react-helmet"; import { motion } from "framer-motion"; import { FaSun, FaMoon, FaRocket } from "react-icons/fa"; import "./App.css"; import "./dark-mode.css"; import Header from "./components/Header"; import Footer from "./components/Footer"; import Comments from "./components/Comments"; import Chatbox from "./components/Chatbox";

function App() { const [darkMode, setDarkMode] = useState(() => { return localStorage.getItem("darkMode") === "true"; });

useEffect(() => { localStorage.setItem("darkMode", darkMode); }, [darkMode]);

useEffect(() => { if ("serviceWorker" in navigator) { navigator.serviceWorker .register("/service-worker.js") .then(() => console.log("✅ Service Worker registered")) .catch(console.error); } }, []);

return ( <div className={${ darkMode ? "dark-mode bg-black text-white" : "bg-white text-black" } min-h-screen transition-all duration-700 ease-in-out} > <Helmet> <title>MadeOfTech - Jaydaplug</title> <meta
name="description"
content="Official site of Jaydaplug - Developer, Hacker, Innovator."
/> <meta name="theme-color" content="#ff6347" /> <meta name="author" content="Jaydaplug | Madeoftech" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <meta
httpEquiv="Content-Security-Policy"
content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
/> <meta
httpEquiv="Permissions-Policy"
content="camera=(), microphone=(), geolocation=()"
/> <meta name="referrer" content="strict-origin-when-cross-origin" /> </Helmet>

{/* Dark Mode Toggle */}
  <motion.button
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="fixed top-4 right-4 p-3 rounded-full bg-tomato text-white shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
    onClick={() => setDarkMode((prev) => !prev)}
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <FaSun className="text-yellow-400 text-xl" />
    ) : (
      <FaMoon className="text-gray-200 text-xl" />
    )}
  </motion.button>

  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    <Header />
  </motion.div>

  {/* Main Intro */}
  <motion.main
    className="px-6 py-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
  >
    <motion.h1
      className="text-4xl md:text-5xl font-extrabold text-tomato mb-6"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <FaRocket className="inline-block mr-2 text-green-600" />
      Welcome to <span className="text-green-600">MadeOfTech</span>
    </motion.h1>

    <motion.p
      className="text-lg max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Jaydaplug’s upgraded web app built with React, Framer Motion, Font Awesome, Tailwind, and offline-first features!
    </motion.p>
  </motion.main>

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
</div>

); }

export default App;

  
