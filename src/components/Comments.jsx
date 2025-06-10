import React, { useState } from "react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const addComment = () => {
    if (text.trim() !== "") {
      setComments((prev) => [...prev, text]);
      setText("");
    }
  };

  return (
    <section style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h3>Comments</h3>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        style={{ width: "100%", padding: 8 }}
      />
      <button onClick={addComment} style={{ marginTop: 8 }}>
        Submit
      </button>
      <ul style={{ marginTop: "1rem", listStyle: "none", paddingLeft: 0 }}>
        {comments.length === 0 && <li>No comments yet.</li>}
        {comments.map((comment, idx) => (
          <li
            key={idx}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "0.5rem 0",
            }}
          >
            {comment}
          </li>
        ))}
      </ul>
    </section>
  );
}
