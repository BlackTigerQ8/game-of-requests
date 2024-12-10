import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState("");
  const [emoji, setEmoji] = useState("");
  const [teaser, setTeaser] = useState("");

  const REACT_APP_URL = "https://game-of-requests.onrender.com";

  const emojis = ["😂", "🙃", "🎉", "🧐", "😏", "🤔", "💥", "🪄", "🎭", "🔥"];
  const teasers = [
    "Come on, you can do better!",
    "Is that all you've got?",
    "The flag is laughing at you!",
    "Think harder!",
    "Keep going, you're almost there!",
    "Do you even hack, bro?",
    "Nice try, but nope!",
    "Try harder next time!",
    "The flag is well-guarded!",
    "Oops! Missed again!",
  ];

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${REACT_APP_URL}/api/login`, {
        username: "admin",
        password: "wrongPassword",
      });
      setMessage(response.data.message);
    } catch (error) {
      setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      setMessage("Nice try, but not good enough! " + emoji);
    }
  };

  const fetchFlag = async () => {
    try {
      const response = await axios.get(`${REACT_APP_URL}/api/flag`, {
        headers: { "x-custom-header": "wrong-key" },
      });
    } catch (error) {
      const randomTeaser = teasers[Math.floor(Math.random() * teasers.length)];
      setTeaser(randomTeaser);
      setFlag(randomTeaser);
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    textAlign: "center",
    padding: "20px",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#45a049",
  };

  const headingStyle = {
    fontSize: "28px",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "18px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const teaserStyle = {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#666",
    marginTop: "15px",
  };

  const [hoverLogin, setHoverLogin] = useState(false);
  const [hoverFlag, setHoverFlag] = useState(false);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>CTF Challenge</h1>
      <p style={teaserStyle}>
        Think you’re clever? Prove it. The flag won’t give itself up so easily!
      </p>
      <button
        style={hoverLogin ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoverLogin(true)}
        onMouseLeave={() => setHoverLogin(false)}
        onClick={handleLogin}
      >
        Try Login
      </button>
      <p style={paragraphStyle}>{message}</p>
      <button
        style={hoverFlag ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoverFlag(true)}
        onMouseLeave={() => setHoverFlag(false)}
        onClick={fetchFlag}
      >
        Get Flag
      </button>
      <p style={paragraphStyle}>{flag}</p>
      <p style={teaserStyle}>
        {/* Hint: Sometimes, the answer lies in places you haven’t looked yet. */}
      </p>
    </div>
  );
}

export default App;
