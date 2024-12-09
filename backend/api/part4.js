export default function handler(req, res) {
  const queryParam = req.query.key;
  if (queryParam === "door123") {
    return res.json({ part: "_tH3_d0oR}" });
  }
  return res.status(403).json({ error: "Invalid query parameter" });
}
