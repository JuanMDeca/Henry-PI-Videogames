module.exports = validate = (req, res, next) => {
  const { genres, name, description, platforms } = req.body;
  if (!genres) return res.status(400).json({ error: "Missing genre" });
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!description)
    return res.status(400).json({ error: "Missing description" });
  if (platforms.length == 0)
    return res.status(400).json({ error: "Missing platforms" });

  next();
};
