// Placeholder content for Quiz.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Share2} from 'lucide-react';

// Helper function to get a unique user ID for the current browser session
const getSessionUserId = () => {
  let userId = localStorage.getItem('quizSessionUserId');
  if (!userId) {
    userId = `quiz_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('quizSessionUserId', userId);
  }
  return userId;
};

// Quiz Questions Data structured by levels
const quizLevels = [
  {
    topic: "Introduction to Cybersecurity",
    questions: [
      { question: "Which of the following is NOT a common cybersecurity threat?", options: ["Phishing", "DDoS Attack", "SQL Injection", "Rainbow Table"], correctAnswerIndex: 3, explanation: "Rainbow table is a cryptographic technique used to reverse cryptographic hash functions, not a direct threat like phishing or DDoS." },
      { question: "What is the practice of tricking individuals into revealing sensitive information?", options: ["Malware", "Phishing", "Spyware", "Adware"], correctAnswerIndex: 1, explanation: "Phishing is a cybercrime in which targets are contacted by email, telephone or text messages by someone posing as a legitimate institution to lure individuals into providing sensitive data." },
      { question: "What does 'DDoS' stand for?", options: ["Distributed Denial of Service", "Dynamic Data on Server", "Direct Data Output System", "Digital Defense Operating System"], correctAnswerIndex: 0, explanation: "DDoS stands for Distributed Denial of Service, an attack where multiple compromised computer systems attack a target, such as a server, website or other network resource, and cause a denial of service for users of the targeted resource." },
      { question: "Which principle ensures that data is accurate and trustworthy?", options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"], correctAnswerIndex: 1, explanation: "Integrity ensures that data is accurate, complete, and trustworthy throughout its lifecycle." },
      { question: "What is a 'zero-day' vulnerability?", options: ["A vulnerability known for zero days", "A vulnerability that has been patched", "A vulnerability discovered on the day of an attack", "A vulnerability that has no known exploit"], correctAnswerIndex: 2, explanation: "A zero-day vulnerability is a software vulnerability that is unknown to those who should be interested in mitigating it." },
    ]
  },
  {
    topic: "Web Development Fundamentals (HTML/CSS)",
    questions: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High-level Text Management Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctAnswerIndex: 0, explanation: "HTML stands for Hyper Text Markup Language, the standard markup language for documents designed to be displayed in a web browser." },
      { question: "In web development, what is the purpose of CSS?", options: ["To define website structure", "To add interactivity to web pages", "To style the appearance of web pages", "To manage server-side logic"], correctAnswerIndex: 2, explanation: "CSS (Cascading Style Sheets) is used for describing the presentation of a document written in a markup language like HTML." },
      { question: "Which HTML tag is used to define an internal style sheet?", options: ["<script>", "<css>", "<style>", "<link>"], correctAnswerIndex: 2, explanation: "The <style> tag is used to define internal CSS." },
      { question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "font-color", "color", "background-color"], correctAnswerIndex: 2, explanation: "The `color` property is used to set the foreground color of an element's text content." },
      { question: "What is the correct HTML element for inserting a line break?", options: ["<lb>", "<break>", "<br>", "<newline>"], correctAnswerIndex: 2, explanation: "The `<br>` tag inserts a single line break." },
    ]
  },
  {
    topic: "Network Security Basics",
    questions: [
      { question: "What protocol is commonly used for secure web browsing?", options: ["HTTP", "FTP", "SMTP", "HTTPS"], correctAnswerIndex: 3, explanation: "HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP, which uses SSL/TLS for encryption." },
      { question: "Which device controls network traffic and enforces security policies?", options: ["Router", "Switch", "Firewall", "Modem"], correctAnswerIndex: 2, explanation: "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
      { question: "What does VPN stand for?", options: ["Virtual Private Network", "Very Personal Network", "Verified Public Network", "Virtual Protected Node"], correctAnswerIndex: 0, explanation: "VPN stands for Virtual Private Network, which extends a private network across a public network." },
      { question: "What is the default port for HTTP?", options: ["21", "22", "80", "443"], correctAnswerIndex: 2, explanation: "The default port for HTTP is 80, while for HTTPS it is 443." },
      { question: "Which of these is a common authentication method?", options: ["DNS", "DHCP", "MFA", "ARP"], correctAnswerIndex: 2, explanation: "MFA (Multi-Factor Authentication) is an authentication method that requires two or more verification factors to grant access to a user." },
    ]
  },
  {
    topic: "JavaScript & React Basics",
    questions: [
      { question: "Which React hook is used for side effects?", options: ["useState", "useContext", "useEffect", "useReducer"], correctAnswerIndex: 2, explanation: "The `useEffect` hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM." },
      { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function myFunction()"], correctAnswerIndex: 0, explanation: "The correct syntax to declare a function in JavaScript is `function myFunction()`." },
      { question: "What is JSX in React?", options: ["A JavaScript library", "A syntax extension for React", "A CSS preprocessor", "A state management tool"], correctAnswerIndex: 1, explanation: "JSX (JavaScript XML) is a syntax extension for JavaScript, recommended by React, that allows you to write HTML-like syntax within JavaScript." },
      { question: "Which JavaScript keyword declares a constant variable?", options: ["var", "let", "const", "static"], correctAnswerIndex: 2, explanation: "The `const` keyword is used to declare a constant variable, meaning its value cannot be reassigned after initialization." },
      { question: "In React, what is a 'prop'?", options: ["A local state variable", "A function that updates state", "A way to pass data from parent to child components", "A type of event handler"], correctAnswerIndex: 2, explanation: "Props (short for properties) are arguments passed into React components, allowing data to be passed from a parent component to a child component." },
    ]
  },
  {
    topic: "Malware and Threats",
    questions: [
      { question: "A program that appears legitimate but performs malicious activity is known as a:", options: ["Virus", "Worm", "Trojan Horse", "Spyware"], correctAnswerIndex: 2, explanation: "A Trojan horse (or Trojan) is a type of malware that disguises itself as legitimate software to gain access to a system." },
      { question: "What type of malware records user keystrokes?", options: ["Ransomware", "Adware", "Rootkit", "Keylogger"], correctAnswerIndex: 3, explanation: "A keylogger is a type of surveillance technology used to monitor and record each keystroke typed on a specific computer's keyboard." },
      { question: "Which of these is a self-replicating malicious program?", options: ["Trojan", "Worm", "Adware", "Spyware"], correctAnswerIndex: 1, explanation: "A worm is a standalone malware computer program that replicates itself in order to spread to other computers." },
      { question: "Malware that encrypts files and demands payment for decryption is called:", options: ["Spyware", "Adware", "Ransomware", "Virus"], correctAnswerIndex: 2, explanation: "Ransomware is a type of malware that holds a victim's data or system hostage, typically by encrypting it, and demands a ransom payment." },
      { question: "What is a 'botnet'?", options: ["A robot that cleans networks", "A network of compromised computers controlled by an attacker", "A secure messaging app", "A type of antivirus software"], correctAnswerIndex: 1, explanation: "A botnet is a network of private computers infected with malicious software and controlled as a group without the owners' knowledge." },
    ]
  },
  {
    topic: "Backend Development (Node.js/APIs)",
    questions: [
      { question: "What command is used to install a new package in a Node.js project?", options: ["npm run", "npm start", "npm install", "npm build"], correctAnswerIndex: 2, explanation: "`npm install` is the command used to install packages from the npm registry." },
      { question: "Which HTTP method is typically used to retrieve data from a server?", options: ["POST", "PUT", "GET", "DELETE"], correctAnswerIndex: 2, explanation: "The GET method is used to request data from a specified resource." },
      { question: "What is Express.js primarily used for?", options: ["Frontend development", "Database management", "Building RESTful APIs and web applications", "Mobile app development"], correctAnswerIndex: 2, explanation: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
      { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Instruction", "Automated Process Integration", "Application Performance Indicator"], correctAnswerIndex: 0, explanation: "API stands for Application Programming Interface, a set of defined rules that enable different applications to communicate with each other." },
      { question: "Which built-in Node.js module is used for handling file paths?", options: ["http", "fs", "path", "url"], correctAnswerIndex: 2, explanation: "The `path` module provides utilities for working with file and directory paths." },
    ]
  },
  {
    topic: "Ethical Hacking Methodologies",
    questions: [
      { question: "What is the primary goal of ethical hacking?", options: ["To cause damage to computer systems", "To steal sensitive data", "To identify and fix security vulnerabilities", "To develop new hacking tools"], correctAnswerIndex: 2, explanation: "Ethical hacking, or penetration testing, aims to find security weaknesses in systems and networks so they can be fixed before malicious attackers exploit them." },
      { question: "Which phase of ethical hacking involves gathering information about a target without actively engaging with it?", options: ["Scanning", "Gaining Access", "Reconnaissance", "Maintaining Access"], correctAnswerIndex: 2, explanation: "Reconnaissance (or information gathering) is the first phase, involving passive collection of information about the target." },
      { question: "What is a 'vulnerability assessment'?", options: ["Actively exploiting vulnerabilities", "Identifying and quantifying security weaknesses", "Defending against attacks", "Developing security policies"], correctAnswerIndex: 1, explanation: "Vulnerability assessment is the process of identifying, quantifying, and prioritizing (or ranking) the vulnerabilities in a system." },
      { question: "What is the final phase of a penetration test, where findings are presented?", options: ["Reporting", "Scanning", "Exploitation", "Clean-up"], correctAnswerIndex: 0, explanation: "Reporting is the final phase where the ethical hacker documents all findings, vulnerabilities, and recommendations." },
      { question: "What is 'social engineering' in a cybersecurity context?", options: ["Building social media apps securely", "Manipulating people to divulge confidential information", "Designing secure social networks", "Using social algorithms for encryption"], correctAnswerIndex: 1, explanation: "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information." },
    ]
  },
  {
    topic: "Databases & SQL Security",
    questions: [
      { question: "What does SQL Injection primarily target?", options: ["Web server configuration", "User's browser", "Database", "Operating System"], correctAnswerIndex: 2, explanation: "SQL Injection is a code injection technique used to attack data-driven applications, in which malicious SQL statements are inserted into an entry field for execution." },
      { question: "Which command is used to retrieve data from a database?", options: ["INSERT", "UPDATE", "DELETE", "SELECT"], correctAnswerIndex: 3, explanation: "The SQL `SELECT` statement is used to fetch data from a database." },
      { question: "What is a 'stored procedure' in database security?", options: ["A type of database attack", "A pre-compiled SQL code that can be executed repeatedly", "A logging mechanism for database access", "A method for encrypting database files"], correctAnswerIndex: 1, explanation: "Stored procedures can enhance security by encapsulating SQL operations and limiting direct table access." },
      { question: "What is the term for unauthorized access to a database?", options: ["Data mining", "Data leakage", "Data corruption", "Data breach"], correctAnswerIndex: 3, explanation: "A data breach is a security violation in which sensitive, protected or confidential data is copied, transmitted, viewed, stolen or used by an individual unauthorized to do so." },
      { question: "Which of the following is crucial for protecting data in transit to/from a database?", options: ["Hashing", "Firewall", "Encryption", "Backup"], correctAnswerIndex: 2, explanation: "Encryption helps protect data privacy and integrity while it is being transmitted over a network." },
    ]
  },
  {
    topic: "Web Security Best Practices",
    questions: [
      { question: "What is the purpose of a 'responsive design' in web development?", options: ["To make websites load faster", "To adjust website layout for different screen sizes", "To secure the website from attacks", "To connect to external APIs"], correctAnswerIndex: 1, explanation: "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and screen sizes." },
      { question: "What is a common method to prevent Cross-Site Request Forgery (CSRF) attacks?", options: ["Input validation", "SQL Injection", "CSRF tokens", "DDoS protection"], correctAnswerIndex: 2, explanation: "CSRF tokens are unique, secret, and unpredictable values generated by the server and included in web requests to prevent CSRF attacks." },
      { question: "What does 'HTTPS' primarily provide for web communication?", options: ["Faster loading times", "Improved SEO", "Encryption and authentication", "Dynamic content delivery"], correctAnswerIndex: 2, explanation: "HTTPS encrypts communications between a user's browser and a website's server, providing data confidentiality and integrity, and authenticating the server." },
      { question: "Which HTTP header helps prevent clickjacking attacks?", options: ["Strict-Transport-Security", "Content-Security-Policy", "X-Frame-Options", "X-Content-Type-Options"], correctAnswerIndex: 2, explanation: "The `X-Frame-Options` HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>`, or `<object>`." },
      { question: "What is the purpose of 'rate limiting' in web security?", options: ["To limit the number of users", "To control the speed of website loading", "To restrict the number of requests a user can make in a given time", "To limit data transfer size"], correctAnswerIndex: 2, explanation: "Rate limiting is a security measure to control the number of requests a client can make to a server in a specific timeframe, protecting against brute-force attacks and resource exhaustion." },
    ]
  },
  {
    topic: "Advanced Cybersecurity Concepts",
    questions: [
      { question: "What is 'fuzzing' in cybersecurity?", options: ["A type of encryption", "A testing technique that involves providing invalid, unexpected, or random data to a computer program", "A method for securing cloud environments", "A way to obscure malicious code"], correctAnswerIndex: 1, explanation: "Fuzzing is an automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program." },
      { question: "Which framework provides a common language for describing cyber attacks?", options: ["ISO 27001", "NIST CSF", "MITRE ATT&CK", "GDPR"], correctAnswerIndex: 2, explanation: "MITRE ATT&CK is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations." },
      { question: "What is the purpose of a 'honeypot'?", options: ["To store sensitive data securely", "To attract and detect cyber attackers", "To encrypt network traffic", "To monitor employee activity"], correctAnswerIndex: 1, explanation: "A honeypot is a security mechanism that serves as a decoy, designed to attract, deceive, and study attackers." },
      { question: "What is 'endpoint detection and response' (EDR)?", options: ["A system for managing network devices", "A solution that continuously monitors and responds to threats on end-user devices", "A method for secure data backup", "A tool for web vulnerability scanning"], correctAnswerIndex: 1, explanation: "EDR solutions continuously monitor end-user devices to detect and respond to cyber threats." },
      { question: "Which term describes a type of cyberattack that involves intercepting communication between two parties?", options: ["Phishing", "Man-in-the-Middle (MitM) attack", "Denial of Service (DoS)", "Brute-force attack"], correctAnswerIndex: 1, explanation: "A Man-in-the-Middle (MitM) attack is when an attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other." },
    ]
  },
];

// Shuffle array function (Fisher-Yates)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

// Quiz Component
export default function Quiz() {
  const sessionUserId = getSessionUserId(); // Get or create session ID

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0); // New: Track current level
  const [questions, setQuestions] = useState([]); // Questions for the current level
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Score for the current level
  const [totalScore, setTotalScore] = useState(0); // Total score across all levels
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // 'correct', 'incorrect'
  const [showResults, setShowResults] = useState(false); // Results for current level
  const [isQuizFinished, setIsQuizFinished] = useState(false); // New: Flag for overall quiz completion

  const [userNameForBadge, setUserNameForBadge] = useState(() => localStorage.getItem('quizUserName') || "");
  const [badgeShared, setBadgeShared] = useState(() => {
    // Badge shared status for the ENTIRE quiz completion, linked to sessionUserId
    const sharedStatus = localStorage.getItem(`badgeShared_fullQuiz_${sessionUserId}`);
    return sharedStatus === 'true';
  });
  const [shareFeedback, setShareFeedback] = useState(null); // 'success', 'error'
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  // Animation variants for questions
  const questionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
  };

  // Animation variants for options
  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: { scale: 1.02, backgroundColor: '#CD5C5C' }, // Slightly darker tomato on hover
    tap: { scale: 0.98 }
  };

  // Animation variants for badge
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 } }
  };

  // Effect to save user name to local storage
  useEffect(() => {
    localStorage.setItem('quizUserName', userNameForBadge);
  }, [userNameForBadge]);

  // Effect to save badge shared status to local storage (for overall quiz completion)
  useEffect(() => {
    localStorage.setItem(`badgeShared_fullQuiz_${sessionUserId}`, badgeShared);
  }, [badgeShared, sessionUserId]);

  // Function to start the quiz (or a new level)
  const startQuiz = (levelIndex = 0) => {
    setCurrentLevelIndex(levelIndex);
    const levelQuestions = quizLevels[levelIndex].questions;
    // Take a random subset of questions (e.g., all 5 questions for a level) and shuffle them
    const shuffled = shuffleArray([...levelQuestions]).slice(0, 5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0); // Reset score for the current level
    setSelectedOption(null);
    setFeedbackMessage(null);
    setShowResults(false);
    setIsQuizFinished(false); // Reset overall quiz finish status
    setQuizStarted(true);
    setIsSubmitButtonDisabled(true); // Disable submit until option is selected
    setShareFeedback(null); // Clear share feedback for new quiz/level
  };

  // Handle option selection
  const handleOptionSelect = (index) => {
    if (selectedOption === null) { // Only allow selection if not already selected
      setSelectedOption(index);
      setIsSubmitButtonDisabled(false); // Enable submit button
    }
  };

  // Handle submitting answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return; // Should not happen if button is disabled correctly

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(score + 1); // Increment current level score
      setTotalScore(prevTotal => prevTotal + 1); // Increment total score
      setFeedbackMessage('correct');
    } else {
      setFeedbackMessage('incorrect');
    }
    setIsSubmitButtonDisabled(true); // Re-disable after submission
  };

  // Handle moving to the next question or next level
  const handleNextAction = () => {
    setFeedbackMessage(null);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      // Go to next question in current level
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsSubmitButtonDisabled(true); // Disable for next question until new selection
    } else {
      // Current level is completed
      setShowResults(true); // Show results for current level
      if (currentLevelIndex < quizLevels.length - 1) {
        // More levels to go
        // Logic to move to next level will be in the results screen (Next Level button)
      } else {
        // All levels completed
        setIsQuizFinished(true);
      }
    }
  };

  // Handle badge sharing (client-side simulation)
  const handleShareBadge = () => {
    if (!userNameForBadge.trim()) {
      setShareFeedback("Please enter your name to share the badge.");
      return;
    }

    if (badgeShared) {
      setShareFeedback("You've already shared this badge for this session!");
      return;
    }

    // Simulate sharing (e.g., to a social media platform)
    // In a real app, this would involve integrating with social media APIs
    // or generating an image for download.
    console.log(`Badge shared by ${userNameForBadge} for quiz score ${totalScore} across all levels!`);
    setShareFeedback("Badge shared successfully!");
    setBadgeShared(true); // Mark as shared for this user session

    // Optional: Reset feedback after some time
    setTimeout(() => setShareFeedback(null), 5000);
  };

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
    >
      <motion.h2
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-6 flex items-center space-x-3 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Award size={36} className="text-[#FFD700]" />
        <span>Tech Knowledge Quiz</span>
      </motion.h2>

      {!quizStarted ? (
        // Welcome Screen
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-300 text-lg mb-6">Test your knowledge on Cybersecurity and Web Development!</p>
          <motion.button
            onClick={() => startQuiz(0)} // Start from Level 0
            className="mt-4 px-8 py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75 transform active:scale-98"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quiz
          </motion.button>
        </motion.div>
      ) : showResults ? (
        // Results Screen for Current Level
        <motion.div
          className="text-center w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-gray-50 mb-4">Level {currentLevelIndex + 1} Complete!</h3>
          <p className="text-gray-300 text-xl mb-6">Your Score for this Level: {score} out of {questions.length}</p>
          <p className="text-gray-400 text-lg mb-8">Total Score: {totalScore} out of {quizLevels.slice(0, currentLevelIndex + 1).reduce((acc, level) => acc + level.questions.length, 0)}</p>

          {isQuizFinished ? (
            // Final Quiz Complete Screen
            <motion.div
              className="mt-8 bg-gray-700 rounded-xl p-6 shadow-xl border border-gray-600 flex flex-col items-center"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <Award size={64} className="text-[#FFD700] mb-4" />
              <h4 className="text-2xl font-bold text-gray-50 mb-2">Quiz Master Badge!</h4>
              <p className="text-gray-300 text-lg">Congratulations, <span className="font-semibold text-[#FFD700]">{userNameForBadge.trim() || 'Anonymous'}</span>!</p>
              <p className="text-gray-400 text-sm mt-1">You've successfully completed all {quizLevels.length} levels with a total score of {totalScore}!</p>

              <motion.input
                type="text"
                placeholder="Enter your name for the badge (optional)"
                value={userNameForBadge}
                onChange={(e) => setUserNameForBadge(e.target.value)}
                className="w-full max-w-sm p-3 rounded-lg bg-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-500 mt-6"
              />

              <motion.button
                onClick={handleShareBadge}
                className={`mt-4 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${badgeShared ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#FF6347] hover:bg-[#CD5C5C]'}`}
                whileHover={{ scale: badgeShared ? 1 : 1.05 }}
                whileTap={{ scale: badgeShared ? 1 : 0.95 }}
                disabled={badgeShared || !userNameForBadge.trim()}
              >
                {badgeShared ? (
                  <>
                    <CheckCircle size={20} className="inline-block mr-2" /> Badge Shared!
                  </>
                ) : (
                  <>
                    <Share2 size={20} className="inline-block mr-2" /> Share My Badge
                  </>
                )}
              </motion.button>
              {shareFeedback && (
                <motion.p
                  className={`mt-2 text-sm ${shareFeedback.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {shareFeedback}
                </motion.p>
              )}
            </motion.div>
          ) : (
            // Button to proceed to the next level
            <motion.button
              onClick={() => startQuiz(currentLevelIndex + 1)}
              className="mt-10 px-8 py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75 transform active:scale-98"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Level ({currentLevelIndex + 2} / {quizLevels.length})
            </motion.button>
          )}

          <motion.button
            onClick={() => startQuiz(0)} // Allows restarting the entire quiz
            className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform active:scale-98 ml-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start New Quiz
          </motion.button>
        </motion.div>
      ) : (
        // Question Display
        <AnimatePresence mode="wait">
          {questions.length > 0 && (
            <motion.div
              key={currentQuestionIndex} // Key changes to trigger exit/enter animations
              className="w-full text-center"
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="text-gray-400 mb-2">Level {currentLevelIndex + 1} / {quizLevels.length}: {quizLevels[currentLevelIndex].topic}</p>
              <p className="text-gray-400 mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
              <h3 className="text-2xl font-semibold text-gray-50 mb-8 px-4 leading-relaxed">{questions[currentQuestionIndex].question}</h3>

              <div className="grid grid-cols-1 gap-4 px-4">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`
                      w-full py-3 px-4 rounded-lg border-2
                      ${selectedOption === index
                        ? feedbackMessage === 'correct'
                          ? 'bg-green-700 border-green-600 text-white'
                          : feedbackMessage === 'incorrect'
                            ? 'bg-red-700 border-red-600 text-white'
                            : 'bg-[#CD5C5C] border-[#FF6347] text-white' // Selected but not yet submitted
                        : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' // Unselected
                      }
                      transition-colors duration-200 font-medium text-left
                      ${selectedOption !== null && index === questions[currentQuestionIndex].correctAnswerIndex ? 'border-green-600 bg-green-700' : ''} /* Highlight correct answer after submission */
                    `}
                    onClick={() => handleOptionSelect(index)}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={selectedOption === null ? "hover" : {}} // No hover after selection
                    whileTap={selectedOption === null ? "tap" : {}} // No tap after selection
                    disabled={selectedOption !== null} // Disable after selection
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {feedbackMessage && (
                <motion.p
                  className={`mt-6 text-lg font-semibold ${feedbackMessage === 'correct' ? 'text-green-400' : 'text-red-400'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {feedbackMessage === 'correct' ? 'Correct!' : 'Incorrect.'}
                </motion.p>
              )}

              {feedbackMessage === 'incorrect' && (
                <motion.p
                  className="mt-2 text-gray-400 text-sm px-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Explanation: {questions[currentQuestionIndex].explanation}
                </motion.p>
              )}

              <div className="mt-8 flex justify-center space-x-4">
                <motion.button
                  onClick={handleSubmitAnswer}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform active:scale-98"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitButtonDisabled || selectedOption === null}
                >
                  Submit Answer
                </motion.button>
                <motion.button
                  onClick={handleNextAction}
                  className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 transform active:scale-98
                    ${feedbackMessage ? 'bg-[#FF6347] hover:bg-[#CD5C5C] text-white focus:ring-[#FF6347]' : 'bg-gray-600 text-gray-300 cursor-not-allowed focus:ring-gray-500'}`}
                  whileHover={{ scale: feedbackMessage ? 1.05 : 1 }}
                  whileTap={{ scale: feedbackMessage ? 0.95 : 1 }}
                  disabled={!feedbackMessage} // Only enable after feedback is shown
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Level Results"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.section>
  );
}
