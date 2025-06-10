import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Lucide Icons imports (ensure you have installed lucide-react: npm install lucide-react)
import {
    User, Book, MessageCircle, MessageSquare, Info, Menu, Languages,
    Mail, FolderGit2, HelpCircle, Wrench, Youtube,
    Cpu, Coffee, Heart, Star, Cloud, Sun, Zap, Award, Gem, Compass // More icons for variety in background
} from 'lucide-react';

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background-color: #f7f7f7; // A light background for contrast
    line-height: 1.6;
  }

  code {
    font-family: 'Roboto Mono', monospace;
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
    textLight: '#ffffff',
    bgLight: '#f7f7f7',
};

// --- Background Animation Styles ---
const floatingAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
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

const BackgroundIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em; /* Base size for icons */
  color: rgba(255, 255, 255, 0.7); /* Slightly transparent white for icons */
  background: ${props => props.bgColor}; /* Use dynamic background color */
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  animation: ${floatingAnimation} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  bottom: -150px;
  left: ${props => props.left}%;
  width: ${props => props.size};
  height: ${props => props.size};
  opacity: 0.8;
  transform: scale(${props => props.scale}); /* Vary initial scale */
`;

const lucideBackgroundIcons = [
    Cpu, Coffee, Heart, Star, Cloud, Sun, Zap, Award, Gem, Compass,
    User, Book, MessageCircle, MessageSquare, Info, Menu, Languages, Mail, FolderGit2, HelpCircle, Wrench, Youtube
];


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
  box-sizing: border-box; /* Include padding in element's total width and height */
`;

const HeaderTitle = styled(motion.h1)`
  color: ${colors.tomatoDarker};
  margin-bottom: 60px;
  font-size: 3.8em;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.15);
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.8em;
    margin-bottom: 40px;
  }
  @media (max-width: 480px) {
    font-size: 2em;
    margin-bottom: 30px;
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

// --- Reusable Component Card wrapper ---
const ComponentCard = styled(motion.div)`
  background-color: ${colors.tomatoLight};
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distribute space for content */
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid ${colors.tomato};
  min-height: 250px; /* Slightly taller cards */
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* For flip effect */
  cursor: pointer; /* Indicate interactivity */

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    border-color: ${colors.tomatoDark};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* Allows content to expand */
`;

const CardTitle = styled.h2`
  color: ${colors.textLight};
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 1.8em;
  font-weight: 600;
`;

const CardText = styled.p`
  color: ${colors.textLight};
  font-size: 1.1em;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const CardIcon = styled.div`
  color: ${colors.tomatoDarker}; /* Darker tomato for icon */
  background-color: ${colors.tomatoLighter}; /* Lighter tomato background */
  border-radius: 50%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.1);

  & > svg {
    width: 48px; /* Fixed size for Lucide icons */
    height: 48px;
    stroke-width: 2.2; /* Slightly thicker stroke for Lucide icons */
  }
`;

const InteractiveButton = styled.button`
  background-color: ${colors.tomatoDarker}; /* Even darker tomato */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${colors.tomatoDark};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

// --- The 12 Components (inlined for a single file preview) ---

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLogin = () => { setLoggedIn(!loggedIn); };
  return (
    <CardContent>
      <CardIcon><User /></CardIcon>
      <CardTitle>Authentication</CardTitle>
      <CardText>Manage user login, registration, and profiles.</CardText>
      <InteractiveButton onClick={toggleLogin}>
        {loggedIn ? 'Logged In' : 'Logged Out'}
      </InteractiveButton>
    </CardContent>
  );
};

const Blog = () => {
  const [articlesRead, setArticlesRead] = useState(0);
  const readArticle = () => { setArticlesRead(articlesRead + 1); };
  return (
    <CardContent>
      <CardIcon><Book /></CardIcon>
      <CardTitle>Blog Posts</CardTitle>
      <CardText>Explore our latest articles, news, and insights.</CardText>
      <InteractiveButton onClick={readArticle}>
        Read ({articlesRead})
      </InteractiveButton>
    </CardContent>
  );
};

const Chatbox = () => {
  const [messagesSent, setMessagesSent] = useState(0);
  const sendMessage = () => { setMessagesSent(messagesSent + 1); };
  return (
    <CardContent>
      <CardIcon><MessageCircle /></CardIcon>
      <CardTitle>Chat Module</CardTitle>
      <CardText>Connect and chat in real-time with others.</CardText>
      <InteractiveButton onClick={sendMessage}>
        Send Message ({messagesSent})
      </InteractiveButton>
    </CardContent>
  );
};

const Comments = () => {
  const [commentsPosted, setCommentsPosted] = useState(0);
  const postComment = () => { setCommentsPosted(commentsPosted + 1); };
  return (
    <CardContent>
      <CardIcon><MessageSquare /></CardIcon>
      <CardTitle>Comment Section</CardTitle>
      <CardText>Share your thoughts and interact with content.</CardText>
      <InteractiveButton onClick={postComment}>
        Post Comment ({commentsPosted})
      </InteractiveButton>
    </CardContent>
  );
};

const Footer = () => {
  const [infoClicks, setInfoClicks] = useState(0);
  const incrementInfo = () => { setInfoClicks(infoClicks + 1); };
  return (
    <CardContent>
      <CardIcon><Info /></CardIcon>
      <CardTitle>Website Footer</CardTitle>
      <CardText>Essential links, contact info, and copyright.</CardText>
      <InteractiveButton onClick={incrementInfo}>
        View Details ({infoClicks})
      </InteractiveButton>
    </CardContent>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  return (
    <CardContent>
      <CardIcon><Menu /></CardIcon>
      <CardTitle>Navigation Header</CardTitle>
      <CardText>The main navigation bar and site branding.</CardText>
      <InteractiveButton onClick={toggleMenu}>
        Menu is: {menuOpen ? 'Open' : 'Closed'}
      </InteractiveButton>
    </CardContent>
  );
};

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('EN');
  const switchLanguage = () => { setLanguage(language === 'EN' ? 'ES' : 'EN'); };
  return (
    <CardContent>
      <CardIcon><Languages /></CardIcon>
      <CardTitle>Language Switcher</CardTitle>
      <CardText>Change the application's display language.</CardText>
      <InteractiveButton onClick={switchLanguage}>
        Current: {language}
      </InteractiveButton>
    </CardContent>
  );
};

const NewsletterForm = () => {
  const [subscribed, setSubscribed] = useState(false);
  const toggleSubscription = () => { setSubscribed(!subscribed); };
  return (
    <CardContent>
      <CardIcon><Mail /></CardIcon>
      <CardTitle>Newsletter Signup</CardTitle>
      <CardText>Subscribe to our exclusive updates and offers.</CardText>
      <InteractiveButton onClick={toggleSubscription}>
        {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </InteractiveButton>
    </CardContent>
  );
};

const Projects = () => {
  const [projectsViewed, setProjectsViewed] = useState(0);
  const viewProject = () => { setProjectsViewed(projectsViewed + 1); };
  return (
    <CardContent>
      <CardIcon><FolderGit2 /></CardIcon>
      <CardTitle>Our Projects</CardTitle>
      <CardText>A showcase of our completed and ongoing work.</CardText>
      <InteractiveButton onClick={viewProject}>
        View Project ({projectsViewed})
      </InteractiveButton>
    </CardContent>
  );
};

const Quiz = () => {
  const [quizAttempts, setQuizAttempts] = useState(0);
  const takeQuiz = () => { setQuizAttempts(quizAttempts + 1); };
  return (
    <CardContent>
      <CardIcon><HelpCircle /></CardIcon>
      <CardTitle>Interactive Quiz</CardTitle>
      <CardText>Test your knowledge with fun and engaging quizzes.</CardText>
      <InteractiveButton onClick={takeQuiz}>
        Take Quiz ({quizAttempts})
      </InteractiveButton>
    </CardContent>
  );
};

const Skills = () => {
  const [skillPoints, setSkillPoints] = useState(0);
  const addSkillPoint = () => { setSkillPoints(skillPoints + 1); };
  return (
    <CardContent>
      <CardIcon><Wrench /></CardIcon>
      <CardTitle>Our Skills</CardTitle>
      <CardText>Discover the expertise and capabilities we possess.</CardText>
      <InteractiveButton onClick={addSkillPoint}>
        Learn Skill ({skillPoints})
      </InteractiveButton>
    </CardContent>
  );
};

const VideoSection = () => {
  const [videosWatched, setVideosWatched] = useState(0);
  const watchVideo = () => { setVideosWatched(videosWatched + 1); };
  return (
    <CardContent>
      <CardIcon><Youtube /></CardIcon>
      <CardTitle>Video Content</CardTitle>
      <CardText>Browse our collection of informative videos.</CardText>
      <InteractiveButton onClick={watchVideo}>
        Watch Video ({videosWatched})
      </InteractiveButton>
    </CardContent>
  );
};


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
                {Array.from({ length: 25 }).map((_, i) => {
                    const RandomIcon = lucideBackgroundIcons[Math.floor(Math.random() * lucideBackgroundIcons.length)];
                    const size = `${Math.random() * 60 + 30}px`; // Size between 30px and 90px
                    const colorIndex = Math.floor(Math.random() * 3);
                    const bgColor = i % 2 === 0 ? colors.tomatoLighter : colors.tomatoLight;
                    const borderRadius = Math.random() > 0.5 ? '50%' : '10%'; // Randomly round or square

                    return (
                        <BackgroundIcon
                            key={i}
                            size={size}
                            left={`${Math.random() * 90 + 5}%`}
                            delay={`${Math.random() * 5}s`}
                            duration={`${Math.random() * 20 + 10}s`}
                            bgColor={bgColor}
                            borderRadius={borderRadius}
                            scale={Math.random() * 0.5 + 0.7} // Scale between 0.7 and 1.2
                        >
                            <RandomIcon size={24} /> {/* Small icons inside the background shapes */}
                        </BackgroundIcon>
                    );
                })}
            </BackgroundIconsContainer>

            <AppContainer>
                <HeaderTitle
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.5 }}
                >
                    Interactive React Showcase
                </HeaderTitle>

                <ComponentsGrid>
                    <AnimatePresence>
                        {componentsToRender.map((Component, index) => (
                            <ComponentCard
                                key={index}
                                initial={{ opacity: 0, y: 50, rotateX: 0 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)' }}
                                whileTap={{ scale: 0.98 }}
                                // Add a subtle flip on click
                                onClick={e => e.currentTarget.classList.toggle('flipped')}
                                // Style for the flip effect (can be added globally or here)
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.6s',
                                    '&.flipped': {
                                        transform: 'rotateY(180deg)'
                                    }
                                }}
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

        
