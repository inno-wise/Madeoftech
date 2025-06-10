// Placeholder content for Auth.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, UserPlus, LogOut, Lock, Mail, User, Key, CheckCircle, XCircle,
  Award, Heart, Share2, MessageCircle, ThumbsUp, HelpCircle, RefreshCw, AlertTriangle, Timer, Info,
  BookOpen, FolderDot, BarChart, Settings, ShoppingBag, DollarSign // Added icons for new features
} from 'lucide-react';

// Helper function to get a unique session ID for reactions (if not using actual user IDs)
const getSessionReactionId = () => {
  let sessionId = localStorage.getItem('authSessionReactionId');
  if (!sessionId) {
    sessionId = `auth_reaction_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('authSessionReactionId', sessionId);
  }
  return sessionId;
};

// Function to get Lucide icon component by name
const getAuthIcon = (iconName, size = 20, className = "") => {
  const IconComponent = {
    LogIn, UserPlus, LogOut, Lock, Mail, User, Key, CheckCircle, XCircle,
    Award, Heart, Share2, MessageCircle, ThumbsUp, HelpCircle, RefreshCw, AlertTriangle, Timer, Info,
    BookOpen, FolderDot, BarChart, Settings, ShoppingBag, DollarSign
  }[iconName];

  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }
  return null;
};

// Initial state for authentication system reactions (like/love/share)
// Stored in localStorage to persist across sessions
const getInitialAuthReactions = () => {
  const storedReactions = localStorage.getItem('authSystemReactions');
  if (storedReactions) {
    try {
      return JSON.parse(storedReactions);
    } catch (e) {
      console.error("Error parsing auth reactions from localStorage:", e);
      return {
        likes: 0,
        loves: 0,
        shares: 0,
        reactedBy: [],
      };
    }
  }
  return {
    likes: 0,
    loves: 0,
    shares: 0,
    reactedBy: [],
  };
};

const AuthComponent = () => {
  const sessionReactionId = getSessionReactionId();

  // --- Auth States ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // {username: '...', role: 'student'|'teacher'|'admin'}
  const [users, setUsers] = useState(() => {
    // Pre-populate with some demo users including an admin
    const initialUsers = [
      { username: 'admin', passwordHash: btoa('adminpass123!@#'), role: 'admin' }, // Stronger default admin pass
      { username: 'teacher1', passwordHash: btoa('teacherpass'), role: 'teacher' },
      { username: 'student1', passwordHash: btoa('studentpass'), role: 'student' },
    ];
    const storedUsers = localStorage.getItem('authUsers');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });

  // --- UI States ---
  const [authFormType, setAuthFormType] = useState('login'); // 'login' or 'signup'
  const [selectedLoginRole, setSelectedLoginRole] = useState(null); // 'student', 'teacher', 'admin' for login buttons
  const [selectedSignupRole, setSelectedSignupRole] = useState('student'); // Default for signup
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const progressBarIntervalRef = useRef(null);

  // --- Form States ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTips, setPasswordTips] = useState([]);

  // --- CAPTCHA States ---
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaTimer, setCaptchaTimer] = useState(10); // 10 seconds for CAPTCHA
  const captchaTimerRef = useRef(null);
  const CAPTCHA_MAX_TIME = 10;
  const CAPTCHA_RETRY_DELAY = 2000; // Delay in ms before user can try CAPTCHA again after failure

  // --- Failed Auth Attempts & 404 Redirect ---
  const [failedAuthAttempts, setFailedAuthAttempts] = useState(() => {
    const storedAttempts = localStorage.getItem('failedAuthAttempts');
    return storedAttempts ? parseInt(storedAttempts, 10) : 0;
  });
  const MAX_FAILED_ATTEMPTS = 3;
  const [show404Page, setShow404Page] = useState(false);

  // --- Modals ---
  const [showForgotPwdModal, setShowForgotPwdModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false); // New modal for services
  const [forgotPwdUsername, setForgotPwdUsername] = useState('');
  const [forgotPwdMessage, setForgotPwdMessage] = useState({ type: '', text: '' });

  // --- Auth System Reactions State ---
  const [authReactions, setAuthReactions] = useState(getInitialAuthReactions);

  // --- Utility Functions ---

  // Generate CAPTCHA on component mount or reset
  const generateCaptcha = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaChallenge(`${num1} + ${num2}`);
    setCaptchaAnswer(num1 + num2);
    setUserCaptchaInput('');
    setCaptchaError('');
    setCaptchaTimer(CAPTCHA_MAX_TIME); // Reset timer
    if (captchaTimerRef.current) {
      clearInterval(captchaTimerRef.current);
    }
    captchaTimerRef.current = setInterval(() => {
      setCaptchaTimer(prev => {
        if (prev <= 1) {
          clearInterval(captchaTimerRef.current);
          generateCaptcha(); // Auto-refresh if time runs out
          setCaptchaError('CAPTCHA timed out. New CAPTCHA generated.');
          return CAPTCHA_MAX_TIME;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Simulate password hashing (VERY BASIC AND INSECURE FOR DEMO PURPOSES ONLY!)
  // In a real application, passwords MUST be hashed server-side using a strong,
  // slow hashing algorithm like bcrypt, scrypt, or Argon2.
  // DO NOT USE btoa() FOR PRODUCTION PASSWORD STORAGE.
  const hashPassword = (password) => {
    // This is a placeholder. Real hashing involves complex algorithms like bcrypt.
    // E.g., const hashedPassword = await bcrypt.hash(password, saltRounds);
    return btoa(password); // Base64 encode as a simple "hash"
  };

  // Check password strength and provide tips
  const checkPasswordStrength = useCallback((pwd) => {
    const tips = [];
    if (pwd.length < 8) tips.push('At least 8 characters long');
    if (!/[A-Z]/.test(pwd)) tips.push('At least one uppercase letter');
    if (!/[a-z]/.test(pwd)) tips.push('At least one lowercase letter');
    if (!/[0-9]/.test(pwd)) tips.push('At least one number');
    if (!/[!@#$%^&*()]/.test(pwd)) tips.push('At least one special character (!@#$%^&*())');
    setPasswordTips(tips);
    return tips.length === 0;
  }, []);

  // Helper for showing messages
  const showMessage = (type, text) => {
    setAuthMessage({ type, text });
    setTimeout(() => setAuthMessage({ type: '', text: '' }), 5000);
  };

  // Resets the authentication flow after a 404 or logout
  const resetAuthFlow = useCallback(() => {
    setFailedAuthAttempts(0);
    setShow404Page(false);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setAuthMessage({ type: '', text: '' });
    generateCaptcha();
    setSelectedLoginRole(null); // Reset selected login role
    setSelectedSignupRole('student'); // Default signup to student
    setAuthFormType('login'); // Default back to login view
  }, [generateCaptcha]);

  // --- Effects ---

  // Load current user, failed attempts, and initial CAPTCHA on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        setCurrentUser(JSON.parse(loggedInUser));
        setIsLoggedIn(true);
        // If user was logged in, reset failed attempts and CAPTCHA
        localStorage.removeItem('failedAuthAttempts');
        setFailedAuthAttempts(0);
        generateCaptcha();
      } catch (e) {
        console.error("Error parsing loggedInUser from localStorage:", e);
        localStorage.removeItem('loggedInUser');
        setIsLoggedIn(false);
        generateCaptcha(); // Generate CAPTCHA if parsing fails
      }
    } else {
      // If no user was logged in, check failed attempts and generate CAPTCHA
      const storedAttempts = localStorage.getItem('failedAuthAttempts');
      const attempts = storedAttempts ? parseInt(storedAttempts, 10) : 0;
      setFailedAuthAttempts(attempts);
      if (attempts >= MAX_FAILED_ATTEMPTS) {
        setShow404Page(true);
      } else {
        generateCaptcha();
      }
    }

    return () => {
      // Cleanup captcha timer on unmount
      if (captchaTimerRef.current) {
        clearInterval(captchaTimerRef.current);
      }
    };
  }, [generateCaptcha]); // Dependency on generateCaptcha

  // Persist users data to localStorage
  useEffect(() => {
    localStorage.setItem('authUsers', JSON.stringify(users));
  }, [users]);

  // Persist auth reactions to localStorage
  useEffect(() => {
    localStorage.setItem('authSystemReactions', JSON.stringify(authReactions));
  }, [authReactions]);

  // Persist failed auth attempts to localStorage
  useEffect(() => {
    localStorage.setItem('failedAuthAttempts', failedAuthAttempts.toString());
    if (failedAuthAttempts >= MAX_FAILED_ATTEMPTS && !isLoggedIn) {
      setShow404Page(true);
    }
  }, [failedAuthAttempts, isLoggedIn]);

  // Simulate progress bar
  useEffect(() => {
    if (isLoading) {
      setProgressBar(0);
      progressBarIntervalRef.current = setInterval(() => {
        setProgressBar(prev => {
          if (prev >= 100) {
            clearInterval(progressBarIntervalRef.current);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      clearInterval(progressBarIntervalRef.current);
      setProgressBar(0);
    }
    return () => clearInterval(progressBarIntervalRef.current);
  }, [isLoading]);

  // Handle password strength check for signup form
  useEffect(() => {
    if (authFormType === 'signup') {
      checkPasswordStrength(password);
    }
  }, [password, authFormType, checkPasswordStrength]);

  // --- Authentication Logic ---

  // Centralized authentication attempt handler (for login and signup)
  const handleAuthAttempt = useCallback((authLogicCallback) => {
    setIsLoading(true);
    setAuthMessage({ type: '', text: '' });
    setCaptchaError('');

    // CAPTCHA Validation
    if (parseInt(userCaptchaInput, 10) !== captchaAnswer) {
      setCaptchaError('Incorrect CAPTCHA answer. Please try again.');
      setFailedAuthAttempts(prev => prev + 1);
      // Introduce a slight delay before regenerating CAPTCHA to prevent rapid attempts
      setTimeout(() => generateCaptcha(), CAPTCHA_RETRY_DELAY);
      setIsLoading(false);
      return;
    }

    // CAPTCHA Timer Check
    if (captchaTimer <= 0) {
      setCaptchaError('CAPTCHA timed out. Please try again.');
      setFailedAuthAttempts(prev => prev + 1);
      setTimeout(() => generateCaptcha(), CAPTCHA_RETRY_DELAY);
      setIsLoading(false);
      return;
    }

    // Simulate server-side processing
    setTimeout(() => {
      const success = authLogicCallback();
      if (success) {
        setFailedAuthAttempts(0);
        setShow404Page(false);
      } else {
        setFailedAuthAttempts(prev => prev + 1);
      }
      generateCaptcha(); // Always generate new CAPTCHA after attempt (success or fail)
      setIsLoading(false);
    }, 1500); // Simulate network delay
  }, [userCaptchaInput, captchaAnswer, captchaTimer, generateCaptcha, failedAuthAttempts]); // Added failedAuthAttempts to dependencies


  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    handleAuthAttempt(() => {
      const user = users.find(u => u.username === username && u.passwordHash === hashPassword(password));
      if (user) {
        // Automatic redirect for Admin if credentials match
        if (user.role === 'admin') {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          setCurrentUser(user);
          setIsLoggedIn(true);
          showMessage('success', `Welcome, Admin ${user.username}! Redirecting to dashboard.`);
          setShowWelcomeModal(true);
          return true;
        }
        // For other roles, check if the selected role matches
        else if (user.role === selectedLoginRole) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          setCurrentUser(user);
          setIsLoggedIn(true);
          showMessage('success', `Welcome back, ${user.username}! You are on the ${user.role} role.`);
          setShowWelcomeModal(true);
          return true;
        } else {
          showMessage('error', `You do not have ${selectedLoginRole} access with this account. Your role is ${user.role}.`);
          return false;
        }
      } else {
        showMessage('error', 'Invalid username or password.');
        return false;
      }
    });
  };

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    handleAuthAttempt(() => {
      if (!username || !password || !confirmPassword) {
        showMessage('error', 'All fields are required.');
        return false;
      }
      if (password !== confirmPassword) {
        showMessage('error', 'Passwords do not match.');
        return false;
      }
      if (!checkPasswordStrength(password)) {
        showMessage('error', 'Password does not meet strength requirements.');
        return false;
      }
      if (users.some(u => u.username === username)) {
        showMessage('error', 'Username already exists.');
        return false;
      }

      // In a real app, this would involve sending data to a server and waiting for a response
      // For security, you would never store plaintext passwords or simple base64 hashes.
      // A server would handle salting and hashing (e.g., using bcrypt).
      const newUser = {
        username: username,
        passwordHash: hashPassword(password), // Simulated hash
        role: selectedSignupRole, // Assign role based on selection
      };
      setUsers([...users, newUser]);
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      showMessage('success', `Account created successfully for ${newUser.username}! Welcome as a ${newUser.role}!`);
      setShowWelcomeModal(true);
      return true;
    });
  };

  // Handle Logout
  const handleLogout = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('loggedInUser');
      setCurrentUser(null);
      setIsLoggedIn(false);
      showMessage('success', 'You have been logged out.');
      resetAuthFlow(); // Full reset after logout
      setIsLoading(false);
    }, 1000);
  }, [resetAuthFlow]);

  // Handle Forgot Password submission
  const handleForgotPwdSubmit = (e) => {
    e.preventDefault();
    setForgotPwdMessage({ type: '', text: '' });
    if (!forgotPwdUsername) {
      setForgotPwdMessage({ type: 'error', text: 'Please enter your username.' });
      return;
    }

    // In a real app, this would trigger a server-side password reset flow.
    const userExists = users.some(user => user.username === forgotPwdUsername);
    if (userExists) {
      setForgotPwdMessage({ type: 'success', text: 'Password reset link sent to your email (simulated). Check your inbox!' });
    } else {
      setForgotPwdMessage({ type: 'error', text: 'Username not found.' });
    }
  };

  // Handle Auth System Reactions (like/love/share)
  const handleAuthReaction = (type) => {
    setAuthReactions(prevReactions => {
      const hasReacted = prevReactions.reactedBy.some(
        (reaction) => reaction.sessionId === sessionReactionId && reaction.type === type
      );

      if (type === 'shares') {
        return {
          ...prevReactions,
          shares: prevReactions.shares + 1,
        };
      }

      if (!hasReacted) {
        return {
          ...prevReactions,
          [type]: prevReactions[type] + 1,
          reactedBy: [...prevReactions.reactedBy, { sessionId: sessionReactionId, type }],
        };
      } else {
        showMessage('error', `You've already reacted with ${type} to the auth system.`);
        return prevReactions;
      }
    });
  };

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const inputItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } },
  };

  const passwordTipVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, staggerChildren: 0.05 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const passwordTipItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };


  // --- Render Logic ---
  const renderDashboard = () => {
    if (!currentUser) return null; // Should not happen

    // Apply color themes based on role
    const dashboardColors = {
      student: { bg: 'bg-green-700', border: 'border-green-600', icon: 'text-green-300', header: 'text-green-400' },
      teacher: { bg: 'bg-tomato-700', border: 'border-tomato-600', icon: 'text-tomato-300', header: 'text-tomato-400' },
      admin: { bg: 'bg-gray-700', border: 'border-gray-600', icon: 'text-yellow-400', header: 'text-yellow-400' }, // Admin retains a distinct color, not strictly green/tomato, for visual hierarchy
    };
    const colors = dashboardColors[currentUser.role];

    return (
      <motion.div
        key={`${currentUser.role}-dashboard`}
        className={`w-full ${colors.bg} rounded-lg p-6 shadow-xl ${colors.border} text-white text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${colors.header}`}>
          {getAuthIcon(
            currentUser.role === 'student' ? 'User' : currentUser.role === 'teacher' ? 'BookOpen' : 'Lock',
            30, colors.icon
          )}
          {currentUser.role === 'admin' ? 'Admin Control Panel' : `${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard`}
        </h3>
        <p className="text-lg">Welcome, {currentUser.username}!</p>
        <p className="text-sm mt-2">
          {currentUser.role === 'student' && "Here you can access your courses, track progress, and submit assignments."}
          {currentUser.role === 'teacher' && "Manage your classes, students, and curriculum. Grade assignments and publish content."}
          {currentUser.role === 'admin' && "You have full control over user restrictions, subscriptions, and system settings."}
        </p>

        {currentUser.role === 'admin' && (
          <ul className="mt-4 text-gray-300 list-disc list-inside space-y-2 text-left mx-auto max-w-sm">
            <li>Manage user accounts (students, teachers)</li>
            <li>Adjust subscription tiers and access levels</li>
            <li>Configure global system settings and security</li>
            <li>Override content restrictions for all users</li>
          </ul>
        )}

        <motion.button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 transform active:scale-98 flex items-center justify-center mx-auto space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging Out...' : getAuthIcon('LogOut', 20)}
          <span>{isLoading ? 'Please wait...' : 'Logout'}</span>
        </motion.button>
      </motion.div>
    );
  };


  return (
    <motion.section
      className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"
          animate={{ x: ['-25%', '100%', '-25%'], y: ['-25%', '100%', '-25%'], rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-tomato-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"
          animate={{ x: ['-25%', '100%', '-25%'], y: ['-25%', '100%', '-25%'], rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      {/* Main content z-10 to be above background */}
      <div className="relative z-10 w-full flex flex-col items-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-8 flex items-center space-x-3 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {getAuthIcon('Lock', 36, "text-green-300")}
        <span>Secure User Authentication</span>
      </motion.h2>

      {/* Auth Message Display */}
      <AnimatePresence>
        {authMessage.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`px-4 py-2 rounded-lg mb-6 text-sm font-semibold w-full max-w-md ${
              authMessage.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {authMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {show404Page && !isLoggedIn ? (
          // Simulated 404 Page (triggered by too many failed attempts)
          <motion.div
            key="404-page"
            className="w-full bg-gray-700 rounded-lg p-8 shadow-xl border border-gray-600 flex flex-col items-center justify-center text-center space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {getAuthIcon('AlertTriangle', 80, "text-red-500 mb-4 animate-pulse")}
            <h3 className="text-4xl font-bold text-red-400">404 Not Found</h3>
            <p className="text-gray-300 text-lg">
              It looks like you've tried to access a page that doesn't exist, or you've made too many failed authentication attempts.
            </p>
            <p className="text-gray-400 text-sm">
              Please check your credentials or contact support if you believe this is an error.
            </p>
            <motion.button
              onClick={resetAuthFlow}
              className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform active:scale-98"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Back / Try Again
            </motion.button>
          </motion.div>
        ) : isLoggedIn && currentUser ? (
          // Logged In State (Dashboard View)
          renderDashboard()
        ) : (
          // Login/Signup Forms
          <motion.div
            key="auth-forms"
            className="w-full bg-gray-700 rounded-lg p-6 shadow-xl border border-gray-600 flex flex-col items-center"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Progress Bar for Loading */}
            {isLoading && (
              <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4 relative overflow-hidden">
                <motion.div
                  className="bg-green-500 h-2.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressBar}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                  style={{ width: `${progressBar}%` }}
                ></motion.div>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white opacity-80 z-10">
                  {Math.round(progressBar)}%
                </p>
              </div>
            )}

            {/* Toggle between Login and Signup */}
            <motion.div
              className="flex space-x-4 mb-8 w-full justify-center"
              variants={inputItemVariants} // Apply animation to this container
            >
              <button
                onClick={() => { setAuthFormType('login'); setAuthMessage({ type: '', text: '' }); generateCaptcha(); }}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  authFormType === 'login' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {getAuthIcon('LogIn', 20)} <span>Login</span>
              </button>
              <button
                onClick={() => { setAuthFormType('signup'); setAuthMessage({ type: '', text: '' }); generateCaptcha(); }}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  authFormType === 'signup' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {getAuthIcon('UserPlus', 20)} <span>Sign Up</span>
              </button>
            </motion.div>

            {authFormType === 'login' ? (
              // Login Form
              <motion.form
                key="login-form"
                onSubmit={handleLogin}
                className="w-full space-y-5"
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {/* Role Selection for Login */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4"
                  variants={inputItemVariants}
                >
                  {['student', 'teacher', 'admin'].map(role => (
                    <motion.button
                      key={role}
                      type="button"
                      onClick={() => setSelectedLoginRole(role)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        selectedLoginRole === role
                          ? 'bg-tomato-600 text-white shadow-md border-2 border-tomato-400'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-900 border border-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {getAuthIcon(
                        role === 'student' ? 'User' : role === 'teacher' ? 'BookOpen' : 'Lock',
                        20
                      )}
                      <span>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    </motion.button>
                  ))}
                </motion.div>
                {selectedLoginRole === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2 animate-pulse"
                  >
                    Please select a login role to proceed.
                  </motion.p>
                )}

                <motion.div className="relative" variants={inputItemVariants}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    disabled={isLoading || selectedLoginRole === null}
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('User')}</span>
                </motion.div>
                <motion.div className="relative" variants={inputItemVariants}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    disabled={isLoading || selectedLoginRole === null}
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('Key')}</span>
                </motion.div>

                {/* CAPTCHA for Login */}
                <motion.div
                  className="relative flex items-center space-x-2 bg-gray-800 p-3 rounded-lg border border-gray-600"
                  variants={inputItemVariants}
                >
                  <span className="text-gray-300 font-semibold">{captchaChallenge} =</span>
                  <input
                    type="number"
                    placeholder="Your Answer"
                    value={userCaptchaInput}
                    onChange={(e) => setUserCaptchaInput(e.target.value)}
                    className="flex-grow p-2 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 w-24"
                    disabled={isLoading || selectedLoginRole === null}
                    required
                  />
                  <span className="text-gray-400 flex items-center space-x-1">
                    {getAuthIcon('Timer', 18)}
                    <span className="font-medium">{captchaTimer}s</span>
                  </span>
                  <motion.button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-300 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    title="Refresh CAPTCHA"
                    disabled={isLoading || selectedLoginRole === null}
                  >
                    {getAuthIcon('RefreshCw', 20)}
                  </motion.button>
                </motion.div>
                {captchaError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 text-center"
                  >
                    {captchaError}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transform active:scale-98"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading || selectedLoginRole === null}
                >
                  {isLoading ? 'Logging In...' : 'Login'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowForgotPwdModal(true)}
                  className="mt-4 text-sm text-gray-400 hover:text-gray-200 transition-colors block mx-auto focus:outline-none"
                  disabled={isLoading}
                  variants={inputItemVariants}
                >
                  Forgot Password?
                </motion.button>
              </motion.form>
            ) : (
              // Signup Form
              <motion.form
                key="signup-form"
                onSubmit={handleSignup}
                className="w-full space-y-5"
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {/* Role Selection for Signup */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4"
                  variants={inputItemVariants}
                >
                  {['student', 'teacher'].map(role => ( // Admin accounts are not created via signup
                    <motion.button
                      key={role}
                      type="button"
                      onClick={() => setSelectedSignupRole(role)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        selectedSignupRole === role
                          ? 'bg-tomato-600 text-white shadow-md border-2 border-tomato-400'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-900 border border-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {getAuthIcon(
                        role === 'student' ? 'User' : 'BookOpen',
                        20
                      )}
                      <span>Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div className="relative" variants={inputItemVariants}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    disabled={isLoading}
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('User')}</span>
                </motion.div>
                <motion.div className="relative" variants={inputItemVariants}>
                  <input
                    type="password"
                    placeholder="Password (min 8 chars, incl. uppercase, lowercase, num, special)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    disabled={isLoading}
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('Key')}</span>
                </motion.div>
                {/* Password Strength Tips */}
                <AnimatePresence>
                  {password.length > 0 && passwordTips.length > 0 && (
                    <motion.ul
                      className="text-sm text-yellow-400 list-disc list-inside bg-gray-800 p-3 rounded-lg border border-gray-600 space-y-1"
                      variants={passwordTipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p className="font-semibold text-gray-300 mb-1 flex items-center space-x-1">
                        {getAuthIcon('Info', 16, "text-yellow-300")}
                        <span>Password Tips:</span>
                      </p>
                      {passwordTips.map((tip, index) => (
                        <motion.li key={index} variants={passwordTipItemVariants}>
                          {tip}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <motion.div className="relative" variants={inputItemVariants}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    disabled={isLoading}
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('Key')}</span>
                </motion.div>

                {/* CAPTCHA for Signup */}
                <motion.div
                  className="relative flex items-center space-x-2 bg-gray-800 p-3 rounded-lg border border-gray-600"
                  variants={inputItemVariants}
                >
                  <span className="text-gray-300 font-semibold">{captchaChallenge} =</span>
                  <input
                    type="number"
                    placeholder="Your Answer"
                    value={userCaptchaInput}
                    onChange={(e) => setUserCaptchaInput(e.target.value)}
                    className="flex-grow p-2 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 w-24"
                    disabled={isLoading}
                    required
                  />
                   <span className="text-gray-400 flex items-center space-x-1">
                    {getAuthIcon('Timer', 18)}
                    <span className="font-medium">{captchaTimer}s</span>
                  </span>
                  <motion.button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-300 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    title="Refresh CAPTCHA"
                    disabled={isLoading}
                  >
                    {getAuthIcon('RefreshCw', 20)}
                  </motion.button>
                </motion.div>
                {captchaError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 text-center"
                  >
                    {captchaError}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transform active:scale-98"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  variants={inputItemVariants}
                >
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Space as Art" Separator */}
      <motion.div
        className="my-10 w-3/4 h-1 bg-gradient-to-r from-green-400 via-gray-600 to-tomato-400 rounded-full shadow-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Services & Pricing Section */}
      <motion.button
        onClick={() => setShowServicesModal(true)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform active:scale-98 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getAuthIcon('ShoppingBag', 20)}
        <span>Our Services & Pricing</span>
      </motion.button>

      {/* Auth System Reactions Section */}
      <div className="mt-10 pt-6 border-t border-gray-700 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-50 mb-4">Rate our Authentication Experience!</h3>
        <div className="flex justify-center space-x-6 text-gray-400">
          <motion.button
            className={`flex items-center space-x-2 ${authReactions.reactedBy.some(r => r.sessionId === sessionReactionId && r.type === 'likes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
            onClick={() => handleAuthReaction('likes')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getAuthIcon('ThumbsUp', 22)}
            <span>{authReactions.likes}</span>
          </motion.button>
          <motion.button
            className={`flex items-center space-x-2 ${authReactions.reactedBy.some(r => r.sessionId === sessionReactionId && r.type === 'loves') ? 'text-red-400' : 'hover:text-red-300'}`}
            onClick={() => handleAuthReaction('loves')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getAuthIcon('Heart', 22)}
            <span>{authReactions.loves}</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-2 hover:text-green-300"
            onClick={() => handleAuthReaction('shares')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getAuthIcon('Share2', 22)}
            <span>{authReactions.shares}</span>
          </motion.button>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">Your feedback helps us improve!</p>
      </div>
      </div> {/* End of relative z-10 div */}

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPwdModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForgotPwdModal(false)}
          >
            <motion.div
              className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md relative border border-gray-700"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowForgotPwdModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                {getAuthIcon('XCircle', 24)}
              </button>
              <h3 className="text-2xl font-bold text-gray-50 mb-6 flex items-center space-x-2 justify-center">
                {getAuthIcon('HelpCircle', 28, "text-yellow-400")} <span>Forgot Password?</span>
              </h3>
              <form onSubmit={handleForgotPwdSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={forgotPwdUsername}
                    onChange={(e) => {
                      setForgotPwdUsername(e.target.value);
                      setForgotPwdMessage({ type: '', text: '' });
                    }}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-600"
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{getAuthIcon('User')}</span>
                </div>
                {forgotPwdMessage.text && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm text-center ${forgotPwdMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {forgotPwdMessage.text}
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transform active:scale-98"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Reset Link (Simulated)
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome/Tier Explanation Modal */}
      <AnimatePresence>
        {showWelcomeModal && currentUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWelcomeModal(false)}
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
                onClick={() => setShowWelcomeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                {getAuthIcon('XCircle', 24)}
              </button>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-tomato-400 mb-4">
                Welcome, {currentUser.username}!
              </h3>
              <p className="text-gray-300 mb-6">
                You've successfully logged in as a <span className="font-semibold text-yellow-400">{currentUser.role}</span> user.
                Here's what your role offers:
              </p>

              {currentUser.role === 'student' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                    {getAuthIcon('User', 24, "text-gray-400")} Student Benefits:
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Access to all free tutorials and tips.</li>
                    <li>Basic commenting and reaction features.</li>
                    <li>Ability to enroll in courses (simulated).</li>
                  </ul>
                  <p className="mt-4 text-blue-300 font-semibold text-center">
                    Enjoy your learning journey!
                  </p>
                </div>
              )}

              {currentUser.role === 'teacher' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                    {getAuthIcon('BookOpen', 24, "text-gray-400")} Teacher Privileges:
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Create and manage courses.</li>
                    <li>View student progress and assignments.</li>
                    <li>Moderate comments and discussions.</li>
                  </ul>
                  <p className="mt-4 text-green-400 font-semibold text-center">
                    Thank you for empowering learners!
                  </p>
                </div>
              )}

              {currentUser.role === 'admin' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                    {getAuthIcon('Lock', 24, "text-yellow-400")} Admin Superpowers:
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li><span className="font-bold">Full control</span> over all user accounts and roles.</li>
                    <li>Manage subscriptions and pricing tiers.</li>
                    <li>System settings, security policies, and analytics.</li>
                    <li><span className="font-bold">Override</span> any content restrictions.</li>
                  </ul>
                  <p className="mt-4 text-red-400 font-semibold text-center">
                    With great power comes great responsibility, {currentUser.username}!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services & Pricing Modal */}
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
                {getAuthIcon('XCircle', 24)}
              </button>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6 flex items-center space-x-2">
                {getAuthIcon('ShoppingBag', 32, "text-yellow-400")} <span>Our Services & Pricing</span>
              </h3>

              <div className="space-y-6">
                {/* General Services */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-3">
                    {getAuthIcon('CheckCircle', 20, "text-green-400")} Core Platform Access
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
                    {getAuthIcon('Award', 20, "text-yellow-400")} Premium Membership (500 KES/month)
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
                    {getAuthIcon('FolderDot', 20, "text-tomato-400")} Creative & Design Services
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
    </motion.section>
  );
};

export default AuthComponent;
