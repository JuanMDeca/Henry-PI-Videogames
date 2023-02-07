//GET https://api.rawg.io/api/games/{id}
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

module.exports = getGamebyId = async (id) => {
  if (isNaN(id)) {
    if (id.length !== 36) return "No existe ese id";
    const dbGame = await Videogame.findOne({
      where: { id: id },
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });
    return [
      {
        id: dbGame.id,
        image: dbGame.image,
        name: dbGame.name,
        genres: dbGame.genres.map((genre) => {
          return { name: genre.name };
        }),
        description: dbGame.description,
        date: dbGame.date,
        rating: dbGame.rating,
        platforms: dbGame.platforms.map((platform) => {
          return { name: platform };
        }),
      },
    ];
  }
  try {
    const axio = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const game = axio.data;
    return [
      {
        id: game.id,
        image: game.background_image,
        name: game.name,
        genres: game.genres.map((genre) => {
          return { id: genre.id, name: genre.name };
        }),
        description: game.description.replace(/<[^>]*>/g, ""),
        date: game.released,
        rating: game.rating,
        platforms: game.platforms.map((platform) => {
          return {
            id: platform.platform.id,
            name: platform.platform.name,
          };
        }),
      },
    ];
  } catch (error) {
    return "No existe ese ID";
  }
};
