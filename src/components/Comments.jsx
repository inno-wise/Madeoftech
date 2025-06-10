import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, MessageCircle, ThumbsUp, User } from "lucide-react"; // Icons for reactions and user

// --- Security Notes for Client-Side React Component ---
// 1. Helmet.js: Helmet is a server-side middleware (e.g., for Node.js/Express)
//    that sets HTTP security headers. It cannot be directly implemented within
//    this client-side React component. For production, ensure your server
//    (e.g., your hosting provider or backend) uses security headers.

// 2. IP-based Restriction: Preventing "IP from commenting twice or doing anything twice"
//    requires a robust backend. Client-side IP detection is unreliable and easily
//    spoofed. This component uses localStorage for a 'sessionUserId' to prevent
//    repeated actions *within the same browser session*. It does NOT prevent
//    different browsers or devices from the same IP from performing actions.

// 3. Data Persistence: Comments are stored in localStorage for demonstration.
//    localStorage is NOT secure for sensitive data and can be easily manipulated
//    by the user. For a real application, comments must be stored and managed
//    on a secure backend database with proper authentication and authorization.

// 4. Input Sanitization: User input is displayed as plain text, preventing XSS
//    attacks. If you were to render user-supplied HTML (e.g., using dangerouslySetInnerHTML),
//    you MUST sanitize the input thoroughly on the server-side before storing or rendering.
// ----------------------------------------------------

// Helper function to get a unique user ID for the current browser session
const getSessionUserId = () => {
  let userId = localStorage.getItem('sessionUserId');
  if (!userId) {
    // Generate a unique ID based on timestamp and random string
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionUserId', userId);
  }
  return userId;
};

// Main Comments Component
export default function Comments() {
  const sessionUserId = getSessionUserId(); // Get or create session ID for current browser

  // State to hold the list of comments, now with more properties
  const [comments, setComments] = useState(() => {
    // Initialize comments from localStorage or an empty array
    const savedComments = localStorage.getItem('comments');
    try {
      return savedComments ? JSON.parse(savedComments) : [];
    } catch (e) {
      console.error("Failed to parse comments from localStorage:", e);
      return []; // Return empty array on parse error
    }
  });
  // State for the main comment text input
  const [mainCommentText, setMainCommentText] = useState("");
  // State for the user's name when posting a new comment
  // Use a functional update for initial state to avoid re-running localStorage.getItem on every render
  const [authorName, setAuthorName] = useState(() => localStorage.getItem('authorName') || "");
  // State for showing error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Effect to save authorName to localStorage
  useEffect(() => {
    localStorage.setItem('authorName', authorName);
  }, [authorName]);

  // Function to add a new top-level comment
  const addComment = () => {
    const trimmedComment = mainCommentText.trim();
    const trimmedAuthor = authorName.trim();

    if (trimmedComment === "") {
      setErrorMessage("Please write your comment.");
      return;
    }
    // Only require name if it's not provided, otherwise allow optional
    // If you want to enforce a name, remove || "Anonymous" from newComment
    if (trimmedAuthor === "") {
      setErrorMessage("Please enter your name for the comment.");
      return;
    }

    // Check if this sessionUserId has already posted a top-level comment
    // This is a client-side check and can be bypassed.
    const hasAlreadyCommented = comments.some(
      (comment) => comment.commentedBy === sessionUserId
    );

    if (hasAlreadyCommented) {
      setErrorMessage("You have already posted a comment in this session.");
      return;
    }


    const newComment = {
      id: Date.now(),
      author: trimmedAuthor || "Anonymous", // Use trimmed author, default to Anonymous
      content: trimmedComment,
      likes: 0,
      loves: 0,
      shares: 0,
      replies: [],
      reactedBy: [], // To track who reacted to this comment {userId, type}
      commentedBy: sessionUserId, // To track who posted this comment
      showReplyInput: false,
    };

    setComments((prev) => [newComment, ...prev]);
    setMainCommentText("");
    setErrorMessage("");
  };

  // Function to handle reactions (like, love, share)
  const handleReaction = (commentId, type) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          // For 'shares', always allow incrementing
          if (type === 'shares') {
            return {
              ...comment,
              shares: comment.shares + 1,
              // No need to track 'shares' in reactedBy if it can be done multiple times
            };
          }

          // For 'likes' and 'loves', check if this user has already reacted with this type
          const hasReacted = comment.reactedBy.some(
            (reaction) => reaction.userId === sessionUserId && reaction.type === type
          );

          if (!hasReacted) {
            // Increment the count and record the user's reaction
            return {
              ...comment,
              [type]: comment[type] + 1,
              reactedBy: [...comment.reactedBy, { userId: sessionUserId, type }],
            };
          } else {
            // Optional: allow undoing reaction or notify user they've already reacted
            // For now, we just prevent multiple reactions of the same type.
            setErrorMessage(`You've already ${type === 'likes' ? 'liked' : type === 'loves' ? 'loved' : 'reacted'} this.`);
            return comment; // Return original comment if already reacted
          }
        }
        return comment;
      })
    );
  };

  // Function to toggle reply input for a specific comment
  const toggleReplyInput = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplyInput: !comment.showReplyInput }
          : { ...comment, showReplyInput: false } // Hide other reply inputs
      )
    );
  };

  // Function to add a reply to a specific comment
  const addReply = (parentId, replyText) => {
    const trimmedReply = replyText.trim();
    const trimmedAuthor = authorName.trim();

    if (trimmedReply === "") {
      setErrorMessage("Please write your reply.");
      return;
    }
    if (trimmedAuthor === "") {
      setErrorMessage("Please enter your name for the reply.");
      return;
    }

    // Check if this sessionUserId has already replied to this specific parent comment
    const parentComment = comments.find(c => c.id === parentId);
    if (parentComment && parentComment.replies.some(reply => reply.commentedBy === sessionUserId)) {
      setErrorMessage("You have already replied to this comment in this session.");
      return;
    }

    const newReply = {
      id: Date.now(),
      author: trimmedAuthor || "Anonymous", // Use trimmed author, default to Anonymous
      content: trimmedReply,
      commentedBy: sessionUserId, // To track who posted this reply
      // Replies can also have reactions if desired, extend this structure
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, newReply], showReplyInput: false }
          : comment
      )
    );
    setErrorMessage(""); // Clear error message after successful reply
    // Clear the reply input field after posting
    document.getElementById(`reply-input-${parentId}`).value = '';
  };

  // Variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  };

  // Variants for individual comment entry animation
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
      className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-gray-100 mb-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#CD5C5C] mb-6 text-center">
        Leave a Comment
      </h3>

      {/* User Name Input - Optional but recommended */}
      <motion.input
        type="text"
        placeholder="Your Name (optional)"
        value={authorName}
        onChange={(e) => {
          setAuthorName(e.target.value);
          if (errorMessage) setErrorMessage(""); // Clear error message on typing
        }}
        className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-600 mb-3"
        whileFocus={{ boxShadow: "0px 0px 10px rgba(255,99,71,0.5)" }}
      />

      {/* Main Comment Textarea */}
      <motion.textarea
        rows={4}
        value={mainCommentText}
        onChange={(e) => {
          setMainCommentText(e.target.value);
          if (errorMessage) setErrorMessage(""); // Clear error message on typing
        }}
        placeholder="Share your thoughts..."
        className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6347] border border-gray-600 resize-y"
        whileFocus={{ boxShadow: "0px 0px 10px rgba(255,99,71,0.5)" }}
      />

      {/* Error message display */}
      {errorMessage && (
        <motion.p
          className="text-red-400 text-sm mt-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Submit button */}
      <motion.button
        onClick={addComment}
        className="mt-4 w-full py-3 bg-[#FF6347] text-white font-semibold rounded-lg shadow-md hover:bg-[#CD5C5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-75 transform active:scale-98"
        whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(255,99,71,0.6)" }}
        whileTap={{ scale: 0.98 }}
      >
        Submit Comment
      </motion.button>

      {/* Comments List */}
      <ul className="mt-8 space-y-6">
        {comments.length === 0 && (
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
          {comments.map((comment) => (
            <motion.li
              key={comment.id}
              className="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 break-words flex flex-col"
              variants={commentItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center mb-2">
                <User size={18} className="text-gray-400 mr-2" />
                <p className="font-semibold text-gray-200">{comment.author}</p>
              </div>
              <p className="text-gray-200 leading-relaxed mb-3">{comment.content}</p>

              {/* Reaction Section */}
              <div className="flex items-center space-x-4 text-gray-400 text-sm mt-auto border-t border-gray-600 pt-3">
                <motion.button
                  className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'likes') ? 'text-blue-400' : 'hover:text-blue-300'}`}
                  onClick={() => handleReaction(comment.id, 'likes')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ThumbsUp size={18} />
                  <span>{comment.likes}</span>
                </motion.button>
                <motion.button
                  className={`flex items-center space-x-1 ${comment.reactedBy.some(r => r.userId === sessionUserId && r.type === 'loves') ? 'text-red-400' : 'hover:text-red-300'}`}
                  onClick={() => handleReaction(comment.id, 'loves')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={18} />
                  <span>{comment.loves}</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-1 hover:text-green-300" // Corrected: removed template literal if not needed, or ensure correct use.
                  onClick={() => handleReaction(comment.id, 'shares')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={18} />
                  <span>{comment.shares}</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-1 hover:text-purple-300 ml-auto"
                  onClick={() => toggleReplyInput(comment.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle size={18} />
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
                      id={`reply-input-${comment.id}`} // Unique ID for each reply textarea
                    ></textarea>
                    <motion.button
                      onClick={() => {
                        const replyText = document.getElementById(`reply-input-${comment.id}`).value;
                        addReply(comment.id, replyText);
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
                          <User size={16} className="text-gray-400 mr-2" />
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
    </motion.section>
  );
}
