import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://game-of-requests-six.vercel.app/api/login",
        {
          username: "admin",
          password: "wrongPassword",
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Nice try, but not good enough!");
    }
  };

  const fetchFlag = async () => {
    try {
      const response = await axios.get(
        "http://game-of-requests-six.vercel.app/api/flag",
        {
          headers: { "x-custom-header": "wrong-key" },
        }
      );
      setFlag(response.data.flag);
    } catch (error) {
      setFlag("Oops! The flag is locked tight. Can you unlock it?");
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
        Fetch Flag
      </button>
      <p style={paragraphStyle}>{flag}</p>
      <p style={teaserStyle}>
        {/* Hint: Sometimes, the answer lies in places you haven’t looked yet. */}
      </p>
    </div>
  );
}

export default App;
