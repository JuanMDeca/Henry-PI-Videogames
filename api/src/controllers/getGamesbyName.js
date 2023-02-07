//GET https://api.rawg.io/api/games?search={game}
const axios = require("axios");
const { Videogame, Genre } = require("../db");

module.exports = getGamesbyName = async (name) => {
  const nameLower = name.toLowerCase();
  const axio = await axios.get(
    `https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e&search=${name}`
  );
  const data = axio.data.results;
  //console.log(data);

  const apiResults = data.map((game) => {
    return {
      id: game.id,
      image: game.background_image,
      name: game.name,
      rating: game.rating,
      genres: game.genres.map((genre) => {
        return { id: genre.id, name: genre.name };
      }),
      origin: "api",
    };
  });

  const results = [...apiResults];

  //↓ Le podía mandar un where :{name:name}
  const db = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });
  for (let i = 0; i < db.length; i++) {
    if (db[i].name.toLowerCase().includes(nameLower)) results.unshift(db[i]);
  }
  if (results.length > 15) return results.slice(0, 15);
  return results;
};
