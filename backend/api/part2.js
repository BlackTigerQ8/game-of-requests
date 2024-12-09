export default function handler(req, res) {
  const headerValue = req.headers["x-part-key"];
  if (headerValue === "key123") {
    return res.json({ part: "a04wY2tfS24wQ2s=" });
  }
  return res.status(403).json({ error: "Forbidden" });
}
