import React from 'react';
//import {Auth} from './components/Auth';
import Blogs from './components/Blog';
import Chatbox from './components/Chatbox';
import Comments from './components/Comments';
import Footer from './components/Footer';
import Header from './components/Header';
//import {LanguageSwitcher} from './components/LanguageSwitcher';
import NewsletterForm from './components/NewsletterForm';
import Skills from './components/Skills';
import VideoSection from './components/VideoSection';
import Projects from './components/Projects';
import Quiz from './components/Quiz';


const App = () => {
  return (
    <div>
      <Header />
       <main>
       <section id="skills"><Skills /></section>
       <section id="projects"><Projects /></section>
       <section id="blogs"><Blogs /></section>
       <section id="quiz"><Quiz /></section>
       <section id="chatbox"><Chatbox /></section>
       <section id="comments"><Comments /></section>
       <section id="video"><VideoSection /></section>
       <section id="newsletter"><NewsletterForm /></section>
    </main>

      <Footer />
    </div>
  );
};

export default App;
