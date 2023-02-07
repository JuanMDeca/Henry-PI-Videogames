const getGamebyIdController = require("../controllers/getGamebyId");

module.exports = getGamebyId = async (req, res) => {
  const { id } = req.params;
  const resp = await getGamebyIdController(id);
  try {
    id
      ? res.status(200).send(resp)
      : res.status(400).send("No existe el juego");
    //Si el ID no existe es un error. El id lo uso cuando cliqueo en la ficha
  } catch (error) {
    res.status(400).send(error.message);
  }
};
