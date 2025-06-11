// src/components/Blog.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  // Removed unused icons, keeping only those that are actually used in the component
  BookOpen, Shield, Code, Bot, Microscope, LayoutTemplate,
  Heart, Share2, MessageCircle, ThumbsUp, XCircle, Calendar, User, // Added Calendar and User as they are used
} from 'lucide-react';

// --- Security & PWA Notes for Client-Side React Component ---
// 1. Helmet.js: Helmet is a server-side middleware (e.g., for Node.js/Express)
//    that sets HTTP security headers (CSP, X-Frame-Options, etc.). It cannot
//    be directly implemented within this client-side React component. For production,
//    ensure your server (e.g., your hosting provider or backend) uses security headers.

// 2. Progressive Web App (PWA): Full PWA implementation involves:
//    - manifest.json: A JSON file defining the app's metadata (icons, theme colors, etc.).
//    - Service Worker: A JavaScript file registered to cache assets for offline use,
//      push notifications, etc.
//    - HTTPS: Essential for service workers and security.
//    These are project-level configurations and cannot be fully implemented within
//    a single React component. This component focuses on client-side interactivity.

// 3. User Identity (Client-Side Limitation): Preventing actions (like commenting twice,
//    or liking multiple times) from the "same IP" requires a robust backend.
//    Client-side IP detection is unreliable. This component uses `localStorage`
//    to generate a 'sessionUserId' for the current browser session to track actions.
//    It does NOT prevent different browsers or devices from the same IP from acting.

// 4. Data Persistence & Security: Blog content, comments, and reactions are
//    currently stored in the component's local state and `localStorage` for demonstration.
//    `localStorage` is NOT secure for sensitive data and is easily manipulated by the user.
//    For a real application, all blog data, comments, and reaction counts must be
//    managed securely on a backend database with proper user authentication,
//    authorization, and server-side input validation/sanitization.

// 5. Input Sanitization (XSS): User-supplied comment content is displayed as plain text,
//    which inherently prevents Cross-Site Scripting (XSS) attacks. If you were to
//    allow rich text or render user-supplied HTML (e.g., via `dangerouslySetInnerHTML`),
//    you MUST sanitize the input rigorously on the server-side before storing or rendering.
// -------------------------------------------------------------------------

// Helper function to get a unique user ID for the current browser session
const getSessionUserId = () => {
  let userId = localStorage.getItem('blogSessionUserId');
  if (!userId) {
    userId = `blog_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('blogSessionUserId', userId);
  }
  return userId;
};

// Data for blog posts (augmented with full content, comments, and reactions)
const initialBlogPosts = [
  {
    id: 1,
    title: "The Rise of AI in Cybersecurity: Friend or Foe?",
    excerpt: "Artificial intelligence is rapidly changing the landscape of cybersecurity. While offering powerful defense capabilities, it also introduces new threats...",
    fullContent: `
      <p>Artificial intelligence (AI) is transforming every industry, and cybersecurity is no exception. On one hand, AI offers unprecedented capabilities for defending against sophisticated cyber threats. Machine learning algorithms can detect anomalies, identify new malware variants, and predict attack patterns with remarkable accuracy, often faster than human analysts. AI-powered security systems can automate routine tasks, analyze vast amounts of data, and provide real-time threat intelligence, making our digital defenses more robust.</p>
      <p>However, the rise of AI also presents a dual-edged sword. Adversaries are quickly adopting AI and machine learning to develop more advanced and evasive attack techniques. AI can be used to create highly convincing phishing campaigns, generate polymorphic malware that evades traditional antivirus, and automate brute-force attacks at scale. The ethical implications are also significant: who is responsible when an AI system makes a critical security decision? As AI becomes more integrated into critical infrastructure, ensuring its security and preventing malicious manipulation becomes paramount.</p>
      <p>Ultimately, AI is a tool. Its impact on cybersecurity will depend on how we, as security professionals and a society, choose to wield it. Continuous research, ethical AI development, and collaboration between AI and security experts are crucial to harness AI's defensive power while mitigating its potential as a weapon in the cyber realm.</p>
    `,
    category: "Cybersecurity",
    author: "Jaydaplug",
    date: "May 28, 2024",
    icon: <Shield size={20} className="text-[#FFD700]" />,
    postLikes: 15,
    postLoves: 8,
    postShares: 5,
    postReactedBy: [], // [{userId: 'user_xyz', type: 'likes'}]
    comments: [], // {id, author, content, likes, loves, shares, replies, reactedBy, commentedBy}
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Deep Dive for Web Developers",
    excerpt: "React Hooks have revolutionized how we write functional components. This post explores common hooks and best practices for modern React development...",
    fullContent: `
      <p>React Hooks, introduced in React 16.8, fundamentally changed how we write React components. Before Hooks, managing state and side effects in functional components was impossible, requiring class components for anything beyond simple UI rendering. Hooks like &#96;useState&#96; and &#96;useEffect&#96; brought the power of state and lifecycle methods directly to functional components, leading to cleaner, more readable, and more reusable code.</p>
      <p>&#96;useState&#96; allows you to add state to functional components, making them "stateful." Instead of &#96;this.state&#96; and &#96;this.setState&#96;, you get a state variable and a setter function. &#96;useEffect&#96; handles side effects, such as data fetching, subscriptions, or manually changing the DOM, allowing you to run code after every render, or only when certain dependencies change.</p>
      <p>Beyond these, &#96;useContext&#96; simplifies accessing context, &#96;useReducer&#96; offers an alternative for complex state logic, and custom Hooks allow for powerful logic reuse. Embracing Hooks leads to less boilerplate, better separation of concerns, and more composable React applications. Understanding how to use them effectively is key for any modern React developer.</p>
    `,
    category: "Web Development",
    author: "Jaydaplug",
    date: "May 20, 2024",
    icon: <Code size={20} className="text-[#98FB98]" />,
    postLikes: 22,
    postLoves: 12,
    postShares: 7,
    postReactedBy: [],
    comments: [],
  },
  {
    id: 3,
    title: "Ethical Web Scraping: Data Collection with Integrity",
    excerpt: "Web scraping can be a powerful tool, but it comes with ethical and legal considerations. Learn how to scrape responsibly...",
    fullContent: `
      <p>Web scraping is the automated extraction of data from websites. It's a powerful technique for market research, data analysis, content aggregation, and much more. Tools like Python's BeautifulSoup, Scrapy, and Selenium make it relatively easy to programmatically navigate web pages and pull desired information.</p>
      <p>However, with great power comes great responsibility. Ethical and legal considerations are paramount. Always check a website's &#96;robots.txt&#96; file (e.g., &#96;www.example.com/robots.txt&#96;) to understand their scraping policies. Respect terms of service and avoid overwhelming servers with too many requests (rate limiting). Consider data privacy laws like GDPR and CCPA, especially when dealing with personal data. Scraping publicly available data is generally permissible, but violating copyrights, privacy, or causing undue burden on a server can lead to legal issues.</p>
      <p>Responsible scraping involves acting like a respectful user: making requests at a reasonable pace, identifying your scraper, and understanding the source's policies. When done ethically, web scraping can unlock vast amounts of valuable information.</p>
    `,
    category: "Web Scraping",
    author: "Jaydaplug",
    date: "April 15, 2024",
    icon: <Bot size={20} className="text-[#87CEEB]" />,
    postLikes: 18,
    postLoves: 9,
    postShares: 4,
    postReactedBy: [],
    comments: [],
  },
  {
    id: 4,
    title: "Understanding Digital Forensics: Uncovering Digital Footprints",
    excerpt: "Digital forensics is crucial for incident response and legal investigations. Dive into the methodologies for extracting evidence from digital devices...",
    fullContent: `
      <p>Digital forensics is the science of recovering and investigating material found in digital devices, often in relation to computer crime. It's a critical discipline in cybersecurity and legal investigations, helping to reconstruct events, identify attackers, and gather admissible evidence.</p>
      <p>The process typically involves several key stages: <strong>Identification</strong> (recognizing digital evidence), <strong>Preservation</strong> (protecting evidence from alteration, e.g., disk imaging), <strong>Collection</strong> (extracting relevant data), <strong>Analysis</strong> (interpreting the collected data), and <strong>Reporting</strong> (documenting findings clearly for legal or incident response teams). Tools like Autopsy, FTK Imager, and EnCase are commonly used by forensic investigators.</p>
      <p>Digital footprints are everywhere, from browser history and email logs to deleted files and network traffic. Understanding how to meticulously follow these trails is essential for uncovering the truth in an increasingly digital world, whether it's for responding to a data breach or prosecuting a cybercriminal.</p>
    `,
    category: "Computer Forensics",
    author: "Jaydaplug",
    date: "March 10, 2024",
    icon: <Microscope size={20} className="text-[#FFA07A]" />,
    postLikes: 10,
    postLoves: 5,
    postShares: 2,
    postReactedBy: [],
    comments: [],
  },
  {
    id: 5,
    title: "Crafting a Winning CV: Tips for Tech Professionals",
    excerpt: "Your CV is your first impression. Learn how to highlight your technical skills and experience to stand out in the competitive tech job market...",
    fullContent: `
      <p>In the highly competitive tech industry, a strong CV (Curriculum Vitae) or resume is your golden ticket to landing an interview. It's more than just a list of past jobs; it's a strategic document that showcases your skills, experience, and value proposition to potential employers.</p>
      <p>Key tips for tech professionals include: <strong>Tailor it:</strong> Customize your CV for each job application by using keywords from the job description. <strong>Quantify achievements:</strong> Instead of saying "managed projects," say "managed 5 concurrent projects, resulting in a 20% efficiency increase." <strong>Highlight technical skills:</strong> Create a dedicated section for programming languages, frameworks, tools, and certifications. <strong>Showcase projects:</strong> Include links to your GitHub, live demos, or online portfolios, especially for junior roles. <strong>Keep it concise:</strong> Aim for one to two pages; recruiters spend limited time on each CV.</p>
      <p>Finally, proofread meticulously. A well-crafted, error-free CV demonstrates attention to detail, a quality highly valued in tech. Invest time in your CV, and it will pay dividends in your job search.</p>
    `,
    category: "Writing & Templates",
    author: "Jaydaplug",
    date: "February 25, 2024",
    icon: <LayoutTemplate size={20} className="text-[#ADD8E6]" />,
    postLikes: 14,
    postLoves: 6,
    postShares: 3,
    postReactedBy: [],
    comments: [],
  },
  {
    id: 6,
    title: "Securing Your API: Common Vulnerabilities and Solutions",
    excerpt: "APIs are the backbone of modern web applications. This article covers common API security flaws and how to protect your endpoints...",
    fullContent: `
      <p>Application Programming Interfaces (APIs) are the crucial connectors enabling different software systems to communicate. They are the backbone of most modern web and mobile applications, but their ubiquity also makes them prime targets for cyberattacks. Securing your APIs is as critical as securing your web application itself.</p>
      <p>Common API vulnerabilities include: <strong>Broken Object Level Authorization (BOLA):</strong> Attackers bypass authorization by manipulating object IDs. <strong>Broken User Authentication:</strong> Weak authentication mechanisms allowing attackers to impersonate users. <strong>Excessive Data Exposure:</strong> APIs returning more data than necessary. <strong>Lack of Resources &#38; Rate Limiting:</strong> APIs vulnerable to DDoS or brute-force attacks due to insufficient rate limiting.</p>
      <p>Solutions involve: Implementing robust authentication (e.g., OAuth 2.0, JWTs). Enforcing strict authorization checks at every request. Using input validation and sanitization. Applying strong rate limiting. Implementing logging and monitoring. Regular security testing, including penetration testing, is also essential. By adopting these best practices, you can significantly harden your APIs against common threats.</p>
    `,
    category: "Cybersecurity",
    author: "Jaydaplug",
    date: "January 30, 2024",
    icon: <Shield size={20} className="text-[#FFD700]" />,
    postLikes: 19,
    postLoves: 10,
    postShares: 6,
    postReactedBy: [],
    comments: [],
  },
];


// --- BlogPostCard Component (New) ---
// This component encapsulates the logic for a single blog post card,
// including its own useRef and useInView hooks for individual animation.
const BlogPostCard = ({ post, index, sessionUserId, openModal, handlePostReaction, cardVariants }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      key={post.id}
      className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start border border-gray-700 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openModal(post)} // Open modal on card click
    >
      <div className="flex items-center space-x-2 mb-3 text-gray-400 text-sm">
        {post.icon}
        <span className="font-semibold text-gray-300">{post.category}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-50 mb-3 leading-tight">{post.title}</h3>
      <p className="text-gray-300 leading-relaxed text-sm mb-4 line-clamp-3">{post.excerpt}</p>

      <div className="flex items-center space-x-4 text-gray-400 text-xs mt-auto pt-4 border-t border-gray-700 w-full">
        <div className="flex items-center space-x-1">
          <User size={16} />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>{post.date}</span>
        </div>
      </div>

      {/* Post-level Reactions on Card (optional, can be moved to modal only) */}
      <div className="flex items-center space-x-4 text-gray-400 text-sm mt-4">
        <motion.button
          className={`flex items-center space-x-1 ${post.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLikes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
          onClick={(e) => { e.stopPropagation(); handlePostReaction(post.id, 'postLikes'); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ThumbsUp size={18} />
          <span>{post.postLikes}</span>
        </motion.button>
        <motion.button
          className={`flex items-center space-x-1 ${post.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLoves') ? 'text-red-400' : 'hover:text-red-300'}`}
          onClick={(e) => { e.stopPropagation(); handlePostReaction(post.id, 'postLoves'); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={18} />
          <span>{post.postLoves}</span>
        </motion.button>
        <motion.button
          className={`flex items-center space-x-1 hover:text-green-300`}
          onClick={(e) => { e.stopPropagation(); handlePostReaction(post.id, 'postShares'); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 size={18} />
          <span>{post.postShares}</span>
        </motion.button>
        <motion.button
          className="flex items-center space-x-1 hover:text-purple-300 ml-auto"
          onClick={(e) => { e.stopPropagation(); openModal(post); }} // Ensure modal opens
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};


// --- Blog Component ---
const Blog = () => {
  const sessionUserId = getSessionUserId(); // Get unique user ID for session

  // Use localStorage to persist blog posts data, including comments and reactions
  const [blogPosts, setBlogPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blogPostsData');
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch (e) {
        console.error("Failed to parse blog posts from localStorage:", e);
        return initialBlogPosts;
      }
    }
    // Initialize with full content if not in localStorage or if parse fails
    return initialBlogPosts;
  });

  // State for modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userNameForComment, setUserNameForComment] = useState(() => localStorage.getItem('blogCommentUserName') || "");
  const [currentCommentText, setCurrentCommentText] = useState(""); // For new comment input
  const [currentReplyText, setCurrentReplyText] = useState({}); // For reply inputs, keyed by commentId

  // Error message for comments/replies
  const [commentErrorMessage, setCommentErrorMessage] = useState("");

  // Effect to save blog posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPostsData', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Effect to save comment user name to localStorage
  useEffect(() => {
    localStorage.setItem('blogCommentUserName', userNameForComment);
  }, [userNameForComment]);

  // Open modal handler
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setCommentErrorMessage(""); // Clear any error message when opening modal
    setCurrentCommentText(""); // Clear comment input
    setCurrentReplyText({}); // Clear all reply inputs
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setCommentErrorMessage(""); // Clear any error message when closing modal
    setCurrentCommentText(""); // Clear comment input
    setCurrentReplyText({}); // Clear all reply inputs
  };

  // Handle post-level reactions (likes, loves, shares)
  const handlePostReaction = (postId, type) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          // For 'postShares', always allow incrementing
          if (type === 'postShares') {
            return {
              ...post,
              postShares: post.postShares + 1,
            };
          }

          // For 'postLikes' and 'postLoves', restrict to once per user session
          const hasReacted = post.postReactedBy.some(
            (reaction) => reaction.userId === sessionUserId && reaction.type === type
          );

          if (!hasReacted) {
            return {
              ...post,
              [type]: post[type] + 1,
              postReactedBy: [...post.postReactedBy, { userId: sessionUserId, type }],
            };
          } else {
            // Optional: visual feedback that user already reacted
            console.log(`User ${sessionUserId} already reacted with ${type} to post ${postId}`);
            return post; // Return original post if already reacted
          }
        }
        return post;
      })
    );
  };

  // Handle adding a new comment to a specific post
  const addCommentToPost = (postId, commentText) => {
    const trimmedComment = commentText.trim();
    const trimmedAuthor = userNameForComment.trim();

    if (trimmedComment === "") {
      setCommentErrorMessage("Please write your comment.");
      return;
    }
    if (trimmedAuthor === "") {
      setCommentErrorMessage("Please enter your name for the comment.");
      return;
    }

    // Client-side check: prevent multiple comments from the same sessionUserId on the same post
    const targetPost = blogPosts.find(p => p.id === postId);
    if (targetPost && targetPost.comments.some(c => c.commentedBy === sessionUserId)) {
      setCommentErrorMessage("You have already posted a comment on this article in this session.");
      return;
    }

    const newComment = {
      id: Date.now(), // Unique ID for comment
      author: trimmedAuthor || "Anonymous",
      content: trimmedComment,
      likes: 0,
      loves: 0,
      shares: 0, // Shares for comments (optional)
      replies: [],
      reactedBy: [], // For comment reactions
      commentedBy: sessionUserId, // Session ID of the commenter
      showReplyInput: false,
    };

    setBlogPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] } // Prepend new comments
          : post
      )
    );
    setCommentErrorMessage("");
    setCurrentCommentText(""); // Clear comment input after submission
  };

  // Handle reactions for a specific comment within a post
  const handleCommentReaction = (postId, commentId, type) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                // For comment 'shares', allow multiple
                if (type === 'shares') {
                  return { ...comment, shares: comment.shares + 1 };
                }

                // For comment 'likes' and 'loves', restrict to once per user session
                const hasReacted = comment.reactedBy.some(
                  (reaction) => reaction.userId === sessionUserId && reaction.type === type
                );
                if (!hasReacted) {
                  return {
                    ...comment,
                    [type]: comment[type] + 1,
                    reactedBy: [...comment.reactedBy, { userId: sessionUserId, type }],
                  };
                }
              }
              return comment;
            }),
          };
        }
        return post;
      })
    );
  };

  // Toggle reply input for a specific comment
  const toggleReplyInputForComment = (postId, commentId) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, showReplyInput: !comment.showReplyInput }
                : { ...comment, showReplyInput: false } // Hide other reply inputs
            ),
          };
        }
        return post;
      })
    );
  };

  // Add reply to a specific comment within a post
  const addReplyToComment = (postId, parentCommentId, replyText) => {
    const trimmedReply = replyText.trim();
    const trimmedAuthor = userNameForComment.trim();

    if (trimmedReply === "") {
      setCommentErrorMessage("Please write your reply.");
      return;
    }
    if (trimmedAuthor === "") {
      setCommentErrorMessage("Please enter your name for the reply.");
      return;
    }

    // Client-side check: prevent multiple replies from the same user to the same parent comment
    const targetPost = blogPosts.find(p => p.id === postId);
    const parentComment = targetPost?.comments.find(c => c.id === parentCommentId);
    if (parentComment && parentComment.replies.some(r => r.commentedBy === sessionUserId)) {
      setCommentErrorMessage("You have already replied to this comment in this session.");
      return;
    }

    const newReply = {
      id: Date.now(),
      author: trimmedAuthor || "Anonymous",
      content: trimmedReply,
      commentedBy: sessionUserId,
    };

    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === parentCommentId
                ? { ...comment, replies: [...comment.replies, newReply], showReplyInput: false }
                : comment
            ),
          };
        }
        return post;
      })
    );
    setCommentErrorMessage("");
    setCurrentReplyText(prev => ({ ...prev, [parentCommentId]: "" })); // Clear the specific reply input field
  };


  // Variants for section title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variants for individual blog post cards animation (scroll-in effect)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variants for modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } },
  };

  // Variants for comment entry
  const commentItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  // Variants for reply input animation
  const replyInputVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeOut" } },
  };


  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] text-center mb-12"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Our Blog
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            post={post}
            index={index}
            sessionUserId={sessionUserId}
            openModal={openModal}
            handlePostReaction={handlePostReaction}
            cardVariants={cardVariants}
          />
        ))}
      </div>

      {/* Modal for Full Blog Post */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Close modal when clicking outside
          >
            <motion.div
              className="bg-gray-900 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-gray-700"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                <XCircle size={28} />
              </button>

              {/* Blog Post Content */}
              <div className="mb-8 pb-4 border-b border-gray-700">
                <div className="flex items-center space-x-2 mb-2 text-gray-400 text-sm">
                  {selectedPost.icon}
                  <span className="font-semibold text-gray-300">{selectedPost.category}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-3 leading-tight">{selectedPost.title}</h3>
                <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <User size={18} />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={18} />
                    <span>{selectedPost.date}</span>
                  </div>
                </div>
                {/* Dynamically set innerHTML for full content (requires careful sanitization in real app) */}
                <div
                  className="text-gray-200 leading-relaxed text-base prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                ></div>
              </div>

              {/* Post-level Reaction Section in Modal */}
              <div className="flex items-center space-x-6 text-gray-400 text-base mb-8 border-b border-gray-700 pb-4">
                <motion.button
                  className={`flex items-center space-x-2 ${selectedPost.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLikes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                  onClick={() => handlePostReaction(selectedPost.id, 'postLikes')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ThumbsUp size={22} />
                  <span>{selectedPost.postLikes} Likes</span>
                </motion.button>
                <motion.button
                  className={`flex items-center space-x-2 ${selectedPost.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLoves') ? 'text-red-400' : 'hover:text-red-300'}`}
                  onClick={() => handlePostReaction(selectedPost.id, 'postLoves')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={22} />
                  <span>{selectedPost.postLoves} Loves</span>
                </motion.button>
                <motion.button
                  className={`flex items-center space-x-2 hover:text-green-300`}
                  onClick={() => handlePostReaction(selectedPost.id, 'postShares')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={22} />
                  <span>{selectedPost.postShares} Shares</span>
                </motion.button>
              </div>

              {/* Comment Section within Modal */}
              <div className="mt-8">
                <h4 className="text-2xl font-bold text-gray-50 mb-6">Comments ({selectedPost.comments.length})</h4>

                {/* User Name Input for Comments */}
                <motion.input
                  type="text"
                  placeholder="Your Name (for comment/reply)"
                  value={userNameForComment}
                  onChange={(e) => setUserNameForComment(e.target.value)}
                  className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* New Comment Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addCommentToPost(selectedPost.id, currentCommentText);
                  }}
                  className="mb-8"
                >
                  <textarea
                    placeholder="Write your comment..."
                    value={currentCommentText}
                    onChange={(e) => setCurrentCommentText(e.target.value)}
                    rows="4"
                    className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  ></textarea>
                  {commentErrorMessage && (
                    <p className="text-red-400 text-sm mt-2">{commentErrorMessage}</p>
                  )}
                  <motion.button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Post Comment
                  </motion.button>
                </form>

                {/* Existing Comments List */}
                <AnimatePresence mode="popLayout">
                  {selectedPost.comments.length > 0 ? (
                    <div className="space-y-6">
                      {selectedPost.comments.map((comment) => (
                        <motion.div
                          key={comment.id}
                          className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md"
                          variants={commentItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                            <User size={16} />
                            <span className="font-semibold text-gray-300">{comment.author}</span>
                            <span className="text-xs opacity-75">
                              (ID: {comment.commentedBy.substring(0, 8)}...)
                            </span>
                          </div>
                          <p className="text-gray-200 leading-relaxed text-sm mb-3">
                            {comment.content}
                          </p>

                          {/* Comment Reactions */}
                          <div className="flex items-center space-x-4 text-gray-400 text-xs mt-3 border-t border-gray-700 pt-3">
                            <motion.button
                              className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'likes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                              onClick={() => handleCommentReaction(selectedPost.id, comment.id, 'likes')}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ThumbsUp size={16} />
                              <span>{comment.likes}</span>
                            </motion.button>
                            <motion.button
                              className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'loves') ? 'text-red-400' : 'hover:text-red-300'}`}
                              onClick={() => handleCommentReaction(selectedPost.id, comment.id, 'loves')}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart size={16} />
                              <span>{comment.loves}</span>
                            </motion.button>
                            <motion.button
                              className="flex items-center space-x-1 hover:text-green-300"
                              onClick={() => handleCommentReaction(selectedPost.id, comment.id, 'shares')}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 size={16} />
                              <span>{comment.shares}</span>
                            </motion.button>
                            <motion.button
                              className="flex items-center space-x-1 hover:text-purple-300 ml-auto"
                              onClick={() => toggleReplyInputForComment(selectedPost.id, comment.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageCircle size={16} />
                              <span>Reply</span>
                            </motion.button>
                          </div>

                          {/* Reply Input Section */}
                          <AnimatePresence>
                            {comment.showReplyInput && (
                              <motion.div
                                className="mt-4"
                                variants={replyInputVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                              >
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    addReplyToComment(selectedPost.id, comment.id, currentReplyText[comment.id] || "");
                                  }}
                                  className="flex flex-col space-y-2"
                                >
                                  <textarea
                                    id={`reply-input-${comment.id}`}
                                    placeholder="Write your reply..."
                                    value={currentReplyText[comment.id] || ""}
                                    onChange={(e) => setCurrentReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                    rows="2"
                                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
                                  ></textarea>
                                  <motion.button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 self-end"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Post Reply
                                  </motion.button>
                                </form>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Replies List */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 pl-6 border-l border-gray-600 space-y-3">
                              <h5 className="text-md font-semibold text-gray-300 mb-2">Replies ({comment.replies.length})</h5>
                              {comment.replies.map((reply) => (
                                <motion.div
                                  key={reply.id}
                                  className="bg-gray-700 p-3 rounded-lg border border-gray-600 text-sm"
                                  variants={commentItemVariants} // Re-using comment item variants for replies
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  <div className="flex items-center space-x-2 text-gray-400 text-xs mb-1">
                                    <User size={14} />
                                    <span className="font-medium text-gray-300">{reply.author}</span>
                                    <span className="opacity-75">(ID: {reply.commentedBy.substring(0, 8)}...)</span>
                                  </div>
                                  <p className="text-gray-200 leading-relaxed">
                                    {reply.content}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
