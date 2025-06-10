// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './components/Auth';
import Blog from './components/Blog';
import Chatbox from './components/Chatbox';
import Comments from './components/Comments';
import Footer from './components/Footer';
import Header from './components/Header';
import LanguageSwitcher from './components/LanguageSwitcher';
import NewsletterForm from './components/NewsletterForm';
import Projects from './components/Projects';
import Quiz from './components/Quiz';
import Skills from './components/Skills';
import VideoSection from './components/VideoSection';

function App() {
  // Simulated authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <LanguageSwitcher />

        <Routes>
          <Route path="/" element={<VideoSection />} />
          <Route path="/auth" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/chat" element={isAuthenticated ? <Chatbox /> : <Navigate to="/auth" />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/newsletter" element={<NewsletterForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/videos" element={<VideoSection />} />
          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
