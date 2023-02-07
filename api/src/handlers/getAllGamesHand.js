const getAllGames = require("../controllers/getAllGames");
const getGamesbyName = require("../controllers/getGamesbyName");

module.exports = getGames = async (req, res) => {
  const name = req.query.name;

  if (!name) {
    const resAllGames = await getAllGames();
    res.status(200).send(resAllGames);
  } else {
    const resbyName = await getGamesbyName(name);
    try {
      resbyName.length === 0
        ? res.status(400).send({ error: "no hay nada" })
        : res.status(200).send(resbyName);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};
