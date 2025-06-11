import React from 'react';
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

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Auth />
        <Blog />
        <Chatbox />
        <Comments />
        <LanguageSwitcher />
        <NewsletterForm />
        <Projects />
        <Quiz />
        <Skills />
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
