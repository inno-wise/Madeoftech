import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
    FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs,
    FaPython, FaGitAlt, FaAws, FaDocker, FaVuejs
} from 'react-icons/fa'; // Keep these if you want to use them for other icons later

// Import your 12 components
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


// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background-color: #f7f7f7; // A light background for contrast
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

// --- Color Palette (Tomato and its shades) ---
const colors = {
    tomato: '#FF6347',        // Original Tomato
    tomatoLight: '#FF856A',   // Lighter shade
    tomatoLighter: '#FFA78D', // Even lighter shade
    tomatoDark: '#E0472C',    // Darker shade
    tomatoDarker: '#C12B11',  // Even darker shade
    textPrimary: '#333333',
    textLight: '#ffffff'
};

// --- Background Animation Styles ---
const iconAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
`;

const BackgroundIconsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const BackgroundIcon = styled(motion.div)`
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: ${colors.tomatoLight};
  animation: ${iconAnimation} 25s linear infinite;
  bottom: -150px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

  // Individual variations for background icons (optional, for more randomness)
  &:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
  &:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
  &:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
  &:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
  &:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
  &:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
  &:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
  &:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
  &:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
  &:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }
`;

// --- Main App Container ---
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: transparent; // Background is handled by BackgroundIconsContainer
  position: relative;
  z-index: 1; // Ensure content is above background
`;

const HeaderTitle = styled(motion.h1)`
  color: ${colors.tomatoDarker};
  margin-bottom: 60px;
  font-size: 3.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  @media (max-width: 768px) {
    font-size: 2.5em;
    margin-bottom: 40px;
  }
`;

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// --- Reusable Component Card (for the 12 components) ---
const ComponentCard = styled(motion.div)`
  background-color: ${colors.tomatoLight};
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid ${colors.tomato};
  min-height: 200px; // Ensure cards have a minimum height for consistent layout

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    border-color: ${colors.tomatoDark};
  }
`;


// --- App Component ---
function App() {
    // Array of your actual components
    const componentsToRender = [
        Auth, Blog, Chatbox, Comments, Footer, Header,
        LanguageSwitcher, NewsletterForm, Projects, Quiz, Skills, VideoSection
    ];

    return (
        <>
            <GlobalStyle />
            <BackgroundIconsContainer>
                {/* Dynamically create background icons for varied animation */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <BackgroundIcon
                        key={i}
                        style={{
                            left: `${Math.random() * 90 + 5}%`,
                            width: `${Math.random() * 80 + 20}px`,
                            height: `${Math.random() * 80 + 20}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 20 + 10}s`,
                            opacity: 0.7,
                            background: i % 2 === 0 ? colors.tomatoLighter : colors.tomatoLight,
                            borderRadius: i % 3 === 0 ? '0' : '50%'
                        }}
                    />
                ))}
            </BackgroundIconsContainer>

            <AppContainer>
                <HeaderTitle
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.5 }}
                >
                    My Animated React App
                </HeaderTitle>

                <ComponentsGrid>
                    <AnimatePresence>
                        {componentsToRender.map((Component, index) => (
                            <ComponentCard
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Component /> {/* Render the actual component here */}
                            </ComponentCard>
                        ))}
                    </AnimatePresence>
                </ComponentsGrid>
            </AppContainer>
        </>
    );
}

export default App;

      
