export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username === "admin" && password === "securePassword123") {
      return res.json({ message: "Access denied" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
  res.status(405).json({ error: "Method Not Allowed" });
}
