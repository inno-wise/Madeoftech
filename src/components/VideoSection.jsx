// Placeholder content for VideoSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Video, PlayCircle, Eye, Link2, Heart, Share2, MessageCircle, ThumbsUp, XCircle, User,
  DollarSign, BookOpen, Laptop, Lock, Globe, HardDrive, Shield, Code
} from 'lucide-react';

// Helper function to get a unique user ID for the current browser session
const getSessionUserId = () => {
  let userId = localStorage.getItem('videoSectionUserId');
  if (!userId) {
    userId = `video_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('videoSectionUserId', userId);
  }
  return userId;
};

// Function to get Lucide icon component by name
const getLucideIcon = (iconName, size = 20, className = "") => {
  const IconComponent = {
    Video, PlayCircle, Eye, Link2, Heart, Share2, MessageCircle, ThumbsUp, XCircle, User,
    DollarSign, BookOpen, Laptop, Lock, Globe, HardDrive, Shield, Code
  }[iconName];

  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }
  return null; // Return null if icon not found
};


// Initial Video/Content Data (augmented with pricing, reaction counts, and comments)
const initialVideoData = [
  // Existing Paid Videos
  {
    id: '1',
    title: "Intro to Ethical Hacking (Part 1)",
    description: "Learn the foundational concepts of ethical hacking and cybersecurity methodologies. This video covers reconnaissance and scanning techniques.",
    category: "Cybersecurity",
    thumbnail: "https://placehold.co/400x225/30475E/FFFFFF?text=Cybersecurity+Video",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    price: 500, // KES
    contentType: 'video', // New field
    icon: 'Shield', // Storing icon name as string
    iconColor: '#FFD700', // Storing color separately
    postLikes: 15, postLoves: 8, postShares: 5, postReactedBy: [], comments: [],
  },
  {
    id: '2',
    title: "React Hooks: useState & useEffect Deep Dive",
    description: "A comprehensive guide to understanding and effectively using the useState and useEffect hooks in React applications.",
    category: "Web Development",
    thumbnail: "https://placehold.co/400x225/4A78A0/FFFFFF?text=React+Hooks+Video",
    embedUrl: "https://www.youtube.com/embed/S_nczMhS5c4?autoplay=1",
    externalLink: "https://www.youtube.com/watch?v=S_nczMhS5c4",
    price: 750,
    contentType: 'video',
    icon: 'Code', // Storing icon name as string
    iconColor: '#98FB98', // Storing color separately
    postLikes: 22, postLoves: 12, postShares: 7, postReactedBy: [], comments: [],
  },
  {
    id: '3',
    title: "SQL Injection Prevention Strategies",
    description: "Understand how SQL Injection attacks work and discover best practices to protect your web applications and databases.",
    category: "Cybersecurity",
    thumbnail: "https://placehold.co/400x225/6C5B7B/FFFFFF?text=SQL+Injection+Video",
    embedUrl: "https://www.youtube.com/embed/e1S9_J7D_2s?autoplay=1",
    externalLink: "https://www.youtube.com/watch?v=e1S9_J7D_2s",
    price: 600,
    contentType: 'video',
    icon: 'Shield', // Storing icon name as string
    iconColor: '#FFD700', // Storing color separately
    postLikes: 18, postLoves: 9, postShares: 4, postReactedBy: [], comments: [],
  },
  {
    id: '4',
    title: "Building Responsive Layouts with Tailwind CSS",
    description: "A practical guide to creating adaptive and beautiful web interfaces using Tailwind CSS's utility-first framework.",
    category: "Web Development",
    thumbnail: "https://placehold.co/400x225/9C89B8/FFFFFF?text=Tailwind+CSS+Video",
    embedUrl: "https://www.youtube.com/embed/D_h86g5k76Y?autoplay=1",
    externalLink: "https://www.youtube.com/watch?v=D_h86g5k76Y",
    price: 550,
    contentType: 'video',
    icon: 'Code', // Storing icon name as string
    iconColor: '#98FB98', // Storing color separately
    postLikes: 30, postLoves: 18, postShares: 10, postReactedBy: [], comments: [],
  },
  // New Free OS Tutorials
  {
    id: '11',
    title: "Windows 10/11 Tips: Shortcuts & Explorer",
    description: "Boost your productivity with essential Windows keyboard shortcuts and efficient File Explorer tips for everyday use.",
    category: "Windows Tips",
    thumbnail: "https://placehold.co/400x225/1E90FF/FFFFFF?text=Windows+Tips",
    embedUrl: "https://www.youtube.com/embed/example-windows-tips?autoplay=1", // Placeholder
    externalLink: "https://www.udemy.com/course/windows-10-tips-tricks-and-techniques/",
    price: 0,
    contentType: 'video',
    icon: 'Laptop', // Storing icon name as string
    iconColor: '#60A5FA', // Tailwind blue-400
    postLikes: 45, postLoves: 20, postShares: 15, postReactedBy: [], comments: [],
  },
  {
    id: '12',
    title: "Linux Command Line Basics: Navigate & Manage",
    description: "Get started with Linux! Learn fundamental command line operations for navigating directories, creating files, and managing permissions.",
    category: "Linux Tutorials",
    thumbnail: "https://placehold.co/400x225/FF4500/FFFFFF?text=Linux+CLI+Video",
    embedUrl: "https://www.youtube.com/embed/example-linux-cli?autoplay=1", // Placeholder
    externalLink: "https://ubuntu.com/tutorials/command-line-for-beginners",
    price: 0,
    contentType: 'video',
    icon: 'HardDrive', // Storing icon name as string
    iconColor: '#FB923C', // Tailwind orange-400
    postLikes: 50, postLoves: 25, postShares: 18, postReactedBy: [], comments: [],
  },
  {
    id: '13',
    title: "macOS Productivity: Gestures & Workflows",
    description: "Master macOS with advanced trackpad gestures, Mission Control, and other productivity workflows to enhance your daily computing.",
    category: "Mac Tips",
    thumbnail: "https://placehold.co/400x225/7B68EE/FFFFFF?text=macOS+Tips",
    embedUrl: "https://www.youtube.com/embed/example-macos-gestures?autoplay=1", // Placeholder
    externalLink: "https://macmost.com/mac-basics",
    price: 0,
    contentType: 'video',
    icon: 'Laptop', // Storing icon name as string
    iconColor: '#A78BFA', // Tailwind purple-400
    postLikes: 38, postLoves: 16, postShares: 10, postReactedBy: [], comments: [],
  },
  // New Free Password Education
  {
    id: '14',
    title: "Password Power: Strong & Unique Credentials",
    description: "Learn the secrets to creating truly strong and unique passwords that resist cracking. Understand length, complexity, and passphrase methods.",
    category: "Password Education",
    thumbnail: "https://placehold.co/400x225/4682B4/FFFFFF?text=Password+Security",
    embedUrl: "https://www.youtube.com/embed/example-password-strong?autoplay=1", // Placeholder
    externalLink: "https://www.staysafeonline.org/articles/passwords",
    price: 0,
    contentType: 'video',
    icon: 'Lock', // Storing icon name as string
    iconColor: '#93C5FD', // Tailwind blue-300
    postLikes: 60, postLoves: 30, postShares: 25, postReactedBy: [], comments: [],
  },
  // New Free HTML Course Notes (Text Content)
  {
    id: '15',
    title: "Free HTML Basics Course Notes",
    description: "Comprehensive notes on HTML fundamentals, including document structure, common tags, attributes, and building your first webpage.",
    category: "HTML Course",
    thumbnail: "https://placehold.co/400x225/A52A2A/FFFFFF?text=HTML+Notes",
    price: 0,
    contentType: 'text', // This is text content, not a video
    icon: 'BookOpen', // Storing icon name as string
    iconColor: '#FCA5A5', // Tailwind red-300
    fullContent: `
      <h3>HTML for Beginners: Your First Webpage</h3>
      <p>Welcome to the world of HTML! HTML (HyperText Markup Language) is the backbone of all web pages. It defines the structure and content of a webpage. Think of it as the skeleton of your website.</p>
      <h4>Basic HTML Document Structure:</h4>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Webpage&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
    &lt;p&gt;This is my first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      <p>The <code>&lt;!DOCTYPE html&gt;</code> declaration defines that this document is an HTML5 document.</p>
      <p>The <code>&lt;html&gt;</code> element is the root element of an HTML page.</p>
      <p>The <code>&lt;head&gt;</code> element contains meta-information about the HTML page (e.g., character set, title, links to stylesheets, scripts). This content is usually not visible to the user.</p>
      <p>The <code>&lt;body&gt;</code> element contains the visible page content.</p>
      <h4>Common Tags:</h4>
      <ul>
        <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>: Headings. <code>&lt;h1&gt;</code> is the most important, <code>&lt;h6&gt;</code> is the least important.</li>
        <li><code>&lt;p&gt;</code>: Paragraph. Used for blocks of text.</li>
        <li><code>&lt;a&gt;</code>: Anchor. Used for hyperlinks. Example: <code>&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;</code></li>
        <li><code>&lt;img&gt;</code>: Image. Used to embed images. Example: <code>&lt;img src="image.jpg" alt="Description"&gt;</code></li>
        <li><code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code>: Unordered and Ordered Lists. Used for lists of items.</li>
        <li><code>&lt;li&gt;</code>: List Item. Used inside <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code>.</li>
      </ul>
      <h4>Attributes:</h4>
      <p>Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like: <code>name="value"</code>.</p>
      <p>For example, the <code>href</code> attribute in an <code>&lt;a&gt;</code> tag specifies the URL of the page the link goes to.</p>
      <p>This is just the beginning! HTML is the fundamental step to building any website.</p>
    `,
    postLikes: 70, postLoves: 40, postShares: 30, postReactedBy: [], comments: [],
  },
];

// VideoCard Component to encapsulate individual card logic and hooks
const VideoCard = ({ content, sessionUserId, handleContentReaction, openModal, cardVariants }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Determine card overlay icon based on content type
  const cardOverlayIcon = content.contentType === 'text'
    ? getLucideIcon('BookOpen', 60, "text-white opacity-90")
    : getLucideIcon('PlayCircle', 60, "text-white opacity-90");

  return (
    <motion.div
      ref={ref}
      key={content.id}
      className="bg-gray-700 rounded-xl shadow-lg border border-gray-600 cursor-pointer overflow-hidden flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(255,99,71,0.4)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openModal(content)}
    >
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        <img
          src={content.thumbnail}
          alt={`${content.title} thumbnail`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x225/444444/FFFFFF?text=Content+Not+Available"; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          {cardOverlayIcon}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col items-start text-left">
        <div className="flex items-center space-x-2 mb-2 text-gray-400 text-sm">
          {getLucideIcon(content.icon, 20, `text-[${content.iconColor}]`)} {/* Render icon based on name */}
          <span className="font-semibold text-gray-300">{content.category}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-50 mb-2 leading-tight">{content.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 mb-3 flex-grow">{content.description}</p>
        <div className="w-full flex justify-between items-center text-gray-400 text-xs mt-auto pt-3 border-t border-gray-600">
          <span className="bg-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{content.category}</span>
          {content.price === 0 ? (
            <span className="font-semibold text-green-400">FREE</span>
          ) : (
            <p className="flex items-center space-x-1 font-semibold text-[#FFD700]">
              {getLucideIcon('DollarSign', 16, "text-[#FFD700]")}
              <span>{content.price} KES</span>
            </p>
          )}
        </div>

        {/* Content Reactions on Card */}
        <div className="flex items-center space-x-3 text-gray-400 text-xs mt-3 w-full justify-between">
          <motion.button
            className={`flex items-center space-x-1 ${content.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLikes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
            onClick={(e) => { e.stopPropagation(); handleContentReaction(content.id, 'postLikes'); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getLucideIcon('ThumbsUp', 16)}
            <span>{content.postLikes}</span>
          </motion.button>
          <motion.button
            className={`flex items-center space-x-1 ${content.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLoves') ? 'text-red-400' : 'hover:text-red-300'}`}
            onClick={(e) => { e.stopPropagation(); handleContentReaction(content.id, 'postLoves'); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getLucideIcon('Heart', 16)}
            <span>{content.postLoves}</span>
          </motion.button>
          <motion.button
            className={`flex items-center space-x-1 hover:text-green-300`}
            onClick={(e) => { e.stopPropagation(); handleContentReaction(content.id, 'postShares'); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getLucideIcon('Share2', 16)}
            <span>{content.postShares}</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-1 hover:text-purple-300 ml-auto"
            onClick={(e) => { e.stopPropagation(); openModal(content); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getLucideIcon('MessageCircle', 16)}
            <span>{content.comments.length}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};


// VideoSection Component
const VideoSection = () => {
  const sessionUserId = getSessionUserId();

  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem('videoDataWithInteractions_V2');
    if (savedVideos) {
      try {
        return JSON.parse(savedVideos);
      } catch (e) {
        console.error("Failed to parse videos from localStorage:", e);
        return initialVideoData;
      }
    }
    return initialVideoData;
  });

  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userNameForComment, setUserNameForComment] = useState(() => localStorage.getItem('videoCommentUserName') || "");
  const [commentErrorMessage, setCommentErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  // Effect to save video data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('videoDataWithInteractions_V2', JSON.stringify(videos));
  }, [videos]);

  // Effect to save comment user name to localStorage
  useEffect(() => {
    localStorage.setItem('videoCommentUserName', userNameForComment);
  }, [userNameForComment]);

  // Effect for progress bar animation
  useEffect(() => {
    if (isModalOpen && selectedContent) {
      const totalDuration = 30; // seconds
      const intervalTime = 1000; // ms
      const increment = (100 / totalDuration) * (intervalTime / 1000);

      setProgress(0);

      progressIntervalRef.current = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(progressIntervalRef.current);
            return 100;
          }
          return prevProgress + increment;
        });
      }, intervalTime);
    } else {
      clearInterval(progressIntervalRef.current);
      setProgress(0);
    }

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [isModalOpen, selectedContent]);


  // Open modal handler
  const openModal = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    setCommentErrorMessage("");
  };

  // Handle content-level reactions (likes, loves, shares)
  const handleContentReaction = (contentId, type) => {
    setVideos(prevVideos =>
      prevVideos.map(content => {
        if (content.id === contentId) {
          if (type === 'postShares') {
            return {
              ...content,
              postShares: content.postShares + 1,
            };
          }

          const hasReacted = content.postReactedBy.some(
            (reaction) => reaction.userId === sessionUserId && reaction.type === type
          );

          if (!hasReacted) {
            return {
              ...content,
              [type]: content[type] + 1,
              postReactedBy: [...content.postReactedBy, { userId: sessionUserId, type }],
            };
          } else {
            console.log(`User ${sessionUserId} already reacted with ${type} to content ${contentId}`);
            return content;
          }
        }
        return content;
      })
    );
  };

  // Handle adding a new comment to a specific content item
  const addCommentToContent = (contentId, commentText) => {
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

    const targetContent = videos.find(v => v.id === contentId);
    if (targetContent && targetContent.comments.some(c => c.commentedBy === sessionUserId)) {
      setCommentErrorMessage("You have already posted a comment on this item in this session.");
      return;
    }

    const newComment = {
      id: Date.now(),
      author: trimmedAuthor || "Anonymous",
      content: trimmedComment,
      likes: 0, loves: 0, shares: 0,
      replies: [], reactedBy: [],
      commentedBy: sessionUserId,
      showReplyInput: false,
    };

    setVideos(prevVideos =>
      prevVideos.map(content =>
        content.id === contentId
          ? { ...content, comments: [newComment, ...content.comments] }
          : content
      )
    );
    setCommentErrorMessage("");
    const commentInput = document.getElementById(`comment-input-${contentId}`);
    if (commentInput) commentInput.value = '';
  };

  // Handle reactions for a specific comment within a content item
  const handleCommentReaction = (contentId, commentId, type) => {
    setVideos(prevVideos =>
      prevVideos.map(content => {
        if (content.id === contentId) {
          return {
            ...content,
            comments: content.comments.map(comment => {
              if (comment.id === commentId) {
                if (type === 'shares') {
                  return { ...comment, shares: comment.shares + 1 };
                }
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
        return content;
      })
    );
  };

  // Toggle reply input for a specific comment
  const toggleReplyInputForComment = (contentId, commentId) => {
    setVideos(prevVideos =>
      prevVideos.map(content => {
        if (content.id === contentId) {
          return {
            ...content,
            comments: content.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, showReplyInput: !comment.showReplyInput }
                : { ...comment, showReplyInput: false }
            ),
          };
        }
        return content;
      })
    );
  };

  // Add reply to a specific comment within a content item
  const addReplyToComment = (contentId, parentCommentId, replyText) => {
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

    const targetContent = videos.find(v => v.id === contentId);
    const parentComment = targetContent?.comments.find(c => c.id === parentCommentId);
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

    setVideos(prevVideos =>
      prevVideos.map(content => {
        if (content.id === contentId) {
          return {
            ...content,
            comments: content.comments.map(comment =>
              comment.id === parentCommentId
                ? { ...comment, replies: [...comment.replies, newReply], showReplyInput: false }
                : comment
            ),
          };
        }
        return content;
      })
    );
    setCommentErrorMessage("");
    const replyInput = document.getElementById(`reply-input-${parentCommentId}`);
    if (replyInput) replyInput.value = '';
  };


  // Variants for section title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variants for content card animation
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

  // Variants for comment entry and reply
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
    <motion.section
      className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-6 flex items-center space-x-3 justify-center"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {getLucideIcon('Video', 36, "text-[#FFD700]")}
        <span>Tutorials & Demos</span>
      </motion.h2>

      <AnimatePresence mode="wait">
        {isModalOpen && selectedContent ? (
          // Modal for Full Content (Video Player or Text Notes)
          <motion.div
            key="content-modal"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-gray-900 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-gray-700"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                {getLucideIcon('XCircle', 28)}
              </button>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 relative overflow-hidden">
                <motion.div
                  className="bg-[#FF6347] h-2.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'linear' }}
                  style={{ width: `${progress}%` }} // Ensure it stays updated
                ></motion.div>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white opacity-80 z-10">
                  {Math.round(progress)}% Complete (Simulated)
                </p>
              </div>
              <p className="text-gray-500 text-xs text-center italic mb-4">
                Note: Progress bar is simulated for demonstration purposes. Actual video progress tracking requires YouTube IFrame Player API.
              </p>

              {/* Content Specific Rendering */}
              {selectedContent.contentType === 'video' ? (
                <>
                  <div className="aspect-video w-full rounded-md overflow-hidden bg-black flex items-center justify-center mb-6">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedContent.embedUrl}
                      title={selectedContent.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                      onError={(e) => console.error("Error loading video iframe:", e)}
                    ></iframe>
                  </div>

                  <div className="text-left mb-6 pb-4 border-b border-gray-700">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-2 leading-tight">{selectedContent.title}</h3>
                    <p className="text-gray-300 text-base mt-1">{selectedContent.description}</p>
                    <div className="flex items-center justify-between text-gray-400 text-sm mt-3">
                      <span className="bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{selectedContent.category}</span>
                      {selectedContent.price === 0 ? (
                        <span className="font-semibold text-green-400">FREE</span>
                      ) : (
                        <p className="flex items-center space-x-1 font-semibold text-[#FFD700]">
                            {getLucideIcon('DollarSign', 18, "text-[#FFD700]")}
                            <span>{selectedContent.price} KES</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Video Reactions Section in Modal */}
                  <div className="flex items-center space-x-6 text-gray-400 text-base mb-8 border-b border-gray-700 pb-4">
                    <motion.button
                      className={`flex items-center space-x-2 ${selectedContent.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLikes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postLikes')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('ThumbsUp', 22)}
                      <span>{selectedContent.postLikes} Likes</span>
                    </motion.button>
                    <motion.button
                      className={`flex items-center space-x-2 ${selectedContent.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLoves') ? 'text-red-400' : 'hover:text-red-300'}`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postLoves')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('Heart', 22)}
                      <span>{selectedContent.postLoves} Loves</span>
                    </motion.button>
                    <motion.button
                      className={`flex items-center space-x-2 hover:text-green-300`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postShares')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('Share2', 22)}
                      <span>{selectedContent.postShares} Shares</span>
                    </motion.button>
                    <a
                      href={selectedContent.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-[#FFD700] transition-colors ml-auto"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('Link2', 22)}
                      <span>Watch on YouTube</span>
                    </a>
                  </div>
                </>
              ) : ( // Render text content for content type 'text'
                <>
                  <div className="text-left mb-6 pb-4 border-b border-gray-700">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-2 leading-tight">{selectedContent.title}</h3>
                    <p className="text-gray-300 text-base mt-1">{selectedContent.description}</p>
                    <div className="flex items-center justify-between text-gray-400 text-sm mt-3">
                      <span className="bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{selectedContent.category}</span>
                      {selectedContent.price === 0 ? (
                        <span className="font-semibold text-green-400">FREE</span>
                      ) : (
                        <p className="flex items-center space-x-1 font-semibold text-[#FFD700]">
                            {getLucideIcon('DollarSign', 18, "text-[#FFD700]")}
                            <span>{selectedContent.price} KES</span>
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Dangerously set innerHTML for full text content.
                      In a real application, content should be sanitized server-side
                      to prevent Cross-Site Scripting (XSS) attacks. */}
                  <div
                    className="text-gray-200 leading-relaxed text-base prose prose-invert max-w-none mb-8 pb-4 border-b border-gray-700"
                    dangerouslySetInnerHTML={{ __html: selectedContent.fullContent }}
                  ></div>

                  {/* Text Content Reactions (if applicable) */}
                  <div className="flex items-center space-x-6 text-gray-400 text-base mb-8 border-b border-gray-700 pb-4">
                    <motion.button
                      className={`flex items-center space-x-2 ${selectedContent.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLikes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postLikes')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('ThumbsUp', 22)}
                      <span>{selectedContent.postLikes} Likes</span>
                    </motion.button>
                    <motion.button
                      className={`flex items-center space-x-2 ${selectedContent.postReactedBy.some(r => r.userId === sessionUserId && r.type === 'postLoves') ? 'text-red-400' : 'hover:text-red-300'}`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postLoves')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('Heart', 22)}
                      <span>{selectedContent.postLoves} Loves</span>
                    </motion.button>
                    <motion.button
                      className={`flex items-center space-x-2 hover:text-green-300`}
                      onClick={() => handleContentReaction(selectedContent.id, 'postShares')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getLucideIcon('Share2', 22)}
                      <span>{selectedContent.postShares} Shares</span>
                    </motion.button>
                  </div>
                </>
              )}


              {/* Comment Section within Modal (applies to both video and text content) */}
              <div className="mt-8">
                <h4 className="text-2xl font-bold text-gray-50 mb-6">Comments ({selectedContent.comments.length})</h4>

                {/* User Name Input for Comments */}
                <motion.input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={userNameForComment}
                  onChange={(e) => {
                    setUserNameForComment(e.target.value);
                    if (commentErrorMessage) setCommentErrorMessage("");
                  }}
                  className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-600 mb-3"
                  whileFocus={{ boxShadow: "0px 0px 10px rgba(255,99,71,0.5)" }}
                />

                {/* Comment Textarea */}
                <textarea
                  rows={4}
                  placeholder="Write a comment..."
                  className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-600 resize-y"
                  id={`comment-input-${selectedContent.id}`}
                ></textarea>

                {commentErrorMessage && (
                  <motion.p
                    className="text-red-400 text-sm mt-2 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {commentErrorMessage}
                  </motion.p>
                )}

                {/* Submit Comment Button */}
                <motion.button
                  onClick={() => {
                    const commentText = document.getElementById(`comment-input-${selectedContent.id}`).value;
                    addCommentToContent(selectedContent.id, commentText);
                  }}
                  className="mt-4 w-full py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75 transform active:scale-98"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Post Comment
                </motion.button>

                {/* List of Comments */}
                <ul className="mt-8 space-y-6">
                  {selectedContent.comments.length === 0 && (
                    <motion.li
                      className="text-gray-400 text-center py-4 rounded-md bg-gray-700 border border-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      No comments yet. Be the first to share your thoughts!
                    </motion.li>
                  )}
                  <AnimatePresence>
                    {selectedContent.comments.map((comment) => (
                      <motion.li
                        key={comment.id}
                        className="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 break-words flex flex-col"
                        variants={commentItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex items-center mb-2">
                          {getLucideIcon('User', 18, "text-gray-400 mr-2")}
                          <p className="font-semibold text-gray-200">{comment.author}</p>
                        </div>
                        <p className="text-gray-200 leading-relaxed mb-3">{comment.content}</p>

                        {/* Comment Reaction Section */}
                        <div className="flex items-center space-x-4 text-gray-400 text-sm mt-auto border-t border-gray-600 pt-3">
                          <motion.button
                            className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'likes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                            onClick={() => handleCommentReaction(selectedContent.id, comment.id, 'likes')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {getLucideIcon('ThumbsUp', 18)}
                            <span>{comment.likes}</span>
                          </motion.button>
                          <motion.button
                            className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'loves') ? 'text-red-400' : 'hover:text-red-300'}`}
                            onClick={() => handleCommentReaction(selectedContent.id, comment.id, 'loves')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {getLucideIcon('Heart', 18)}
                            <span>{comment.loves}</span>
                          </motion.button>
                          <motion.button
                            className={`flex items-center space-x-1 hover:text-green-300`}
                            onClick={() => handleCommentReaction(selectedContent.id, comment.id, 'shares')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {getLucideIcon('Share2', 18)}
                            <span>{comment.shares}</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center space-x-1 hover:text-purple-300 ml-auto"
                            onClick={() => toggleReplyInputForComment(selectedContent.id, comment.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {getLucideIcon('MessageCircle', 18)}
                            <span>Reply</span>
                          </motion.button>
                        </div>

                        {/* Reply Input Section */}
                        <AnimatePresence>
                          {comment.showReplyInput && (
                            <motion.div
                              className="mt-4 pt-4 border-t border-gray-600"
                              variants={replyInputVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                            >
                              <textarea
                                rows={2}
                                placeholder={`Reply to ${comment.author}...`}
                                className="w-full p-3 rounded-lg bg-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-500 resize-y text-sm"
                                id={`reply-input-${comment.id}`}
                              ></textarea>
                              <motion.button
                                onClick={() => {
                                  const replyText = document.getElementById(`reply-input-${comment.id}`).value;
                                  addReplyToComment(selectedContent.id, comment.id, replyText);
                                }}
                                className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Post Reply
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Replies List */}
                        {comment.replies.length > 0 && (
                          <ul className="mt-4 ml-8 space-y-3 border-l-2 border-gray-600 pl-4">
                            <p className="text-gray-400 text-xs italic mb-2">{comment.replies.length} replies</p>
                            <AnimatePresence>
                              {comment.replies.map((reply) => (
                                <motion.li
                                  key={reply.id}
                                  className="bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-500 break-words"
                                  variants={commentItemVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  <div className="flex items-center mb-1">
                                    {getLucideIcon('User', 16, "text-gray-400 mr-2")}
                                    <p className="font-semibold text-gray-300 text-sm">{reply.author}</p>
                                  </div>
                                  <p className="text-gray-300 text-sm leading-relaxed">{reply.content}</p>
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Video/Content List Grid
          <motion.div
            key="content-list"
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {videos.map((content) => (
              <VideoCard
                key={content.id}
                content={content}
                sessionUserId={sessionUserId}
                handleContentReaction={handleContentReaction}
                openModal={openModal}
                cardVariants={cardVariants}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        className="mt-8 text-gray-400 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Explore our comprehensive collection of tutorials, tips, and course notes on various tech topics!
      </motion.p>
    </motion.section>
  );
};

export default VideoSection;
