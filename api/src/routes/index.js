const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGames = require("../handlers/getAllGamesHand");
const getGamebyId = require("../handlers/getGamebyIDHand");
const validator = require("../middlewares/Validator");
const postGame = require("../handlers/postGameHand");
const getGenres = require("../handlers/getGenresHand");
const prueba = require("../controllers/prueba");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

router.get("/videogame/:id", getGamebyId);

router.get("/videogames", getGames);

router.get("/genres", getGenres);

//Tengo que hacer la validacion todavia ✔
router.post("/videogames", validator, postGame);

router.get("/prueba", async (req, res) => {
  const resp = await prueba();

  res.status(200).send(resp);
});

module.exports = router;
