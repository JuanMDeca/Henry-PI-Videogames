/*{ genres, name, description }*/
const { Videogame, Genre } = require("../db");
const { dBGenres } = require("../controllers/getGenres");

module.exports = postGame = async (
  genres,
  name,
  description,
  platforms,
  date,
  rating,
  image
) => {
  const newVideogame = await Videogame.create({
    name,
    description,
    platforms,
    date,
    rating,
    image,
  });
  const databaseEmplity = await Genre.findAll();

  if (databaseEmplity.length == 0) await dBGenres();

  const genreDB = await Genre.findAll({
    //hago un findAll de todos los generos coincidentes para despues relacionarlo con el juego nuevo
    where: { name: genres }, //← Si uso nombres lo hago así y si lo hago con el id, tengo que usar el id
  });
  newVideogame.addGenre(genreDB);
};
