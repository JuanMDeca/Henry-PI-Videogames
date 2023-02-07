const postGameController = require("../controllers/postGame");

module.exports = postGame = async (req, res) => {
  const { genres, name, description, platforms, date, rating, image } =
    req.body;
  try {
    const post = await postGameController(
      genres,
      name,
      description,
      platforms,
      date,
      rating,
      image
    );
    res.status(200).send("se creo el juego nuevo");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
