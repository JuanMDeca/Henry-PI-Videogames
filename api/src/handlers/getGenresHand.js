const { getGenres } = require("../controllers/getGenres");

module.exports = getGenre = async (req, res) => {
  const resp = await getGenres();
  try {
    res.status(200).send(resp);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
