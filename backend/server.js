const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Decoy login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "securePassword123") {
    res.json({ message: "Access denied" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Part 1 of the flag
app.get("/api/part1", (req, res) => {
  res.json({ part: "CODED{" }); // First part of the flag
});

// Part 2 of the flag: requires a specific header
app.get("/api/part2", (req, res) => {
  const headerValue = req.headers["x-part-key"];
  if (headerValue === "key123") {
    res.json({ part: "a04wY2tfS24wQ2s=" }); // Second part of the flag
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

// Part 3 of the flag: requires a POST request with specific data
app.post("/api/part3", (req, res) => {
  const { secret } = req.body;
  if (secret === "unlock_the_door") {
    res.json({ part: "_b3h!Nd" }); // Third part of the flag
  } else {
    res.status(400).json({ error: "Incorrect payload" });
  }
});

// Part 4 of the flag: requires a specific query parameter
app.get("/api/part4", (req, res) => {
  const queryParam = req.query.key;
  if (queryParam === "door123") {
    res.json({ part: "_tH3_d0oR}" }); // Fourth part of the flag
  } else {
    res.status(403).json({ error: "Invalid query parameter" });
  }
});

// Catch-all route for decoys or invalid routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
