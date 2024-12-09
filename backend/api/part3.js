export default function handler(req, res) {
  if (req.method === "POST") {
    const { secret } = req.body;
    if (secret === "unlock_the_door") {
      return res.json({ part: "_b3h!Nd" });
    } else {
      return res.status(400).json({ error: "Incorrect payload" });
    }
  }
  res.status(405).json({ error: "Method Not Allowed" });
}
