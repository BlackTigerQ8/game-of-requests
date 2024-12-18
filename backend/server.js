const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-part-key"],
  })
);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API Routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "securePassword123") {
    res.json({ message: "Access denied" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/part1", (req, res) => {
  res.json({ part1: "CODED{" }); // First part of the flag
});

app.get("/api/part2", (req, res) => {
  const headerValue = req.headers["x-part-key"];
  if (headerValue === "key123") {
    res.json({ part2: "a04wY2tfS24wQ2s=" }); // Second part of the flag
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

app.post("/api/part3", (req, res) => {
  const { secret } = req.body;
  if (secret === "unlock_the_door") {
    res.json({ part3: "_b3h!Nd" }); // Third part of the flag
  } else {
    res.status(400).json({ error: "Incorrect payload" });
  }
});

app.get("/api/part4", (req, res) => {
  const queryParam = req.query.key;
  if (queryParam === "door123") {
    res.json({ part4: "_tH3_d0oR}" }); // Fourth part of the flag
  } else {
    res.status(403).json({ error: "Invalid query parameter" });
  }
});

app.post("/api/validate", (req, res) => {
  const { part1, part2, part3, part4 } = req.body;

  if (
    part1 === "CODED{" &&
    part2 === "a04wY2tfS24wQ2s=" &&
    part3 === "_b3h!Nd" &&
    part4 === "_tH3_d0oR}"
  ) {
    res.json({ flag: "CODED{a04wY2tfS24wQ2s=_b3h!Nd_tH3_d0oR}" });
  } else {
    res.status(400).json({ error: "Incorrect flag parts!" });
  }
});

// Catch-all route for React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Catch-all route for invalid requests
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
