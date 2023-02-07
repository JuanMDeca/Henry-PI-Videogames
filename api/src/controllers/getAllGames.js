require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

//FUNCION 1/3: JUEGOS DE API
const getApiGames = async () => {
  let array = [];
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    for (let i = 0; i < 100; i = array.length) {
      await axios //Aca borre una const get que capaz hace quilombo
        .get(url, {
          headers: {
            "accept-encoding": "true",
          },
        })
        .then((resp) => {
          const data = resp.data;
          const next = data.next;
          url = next;
          array = [...array, ...data.results];
          console.log(array.length); //<------------------------------ CONSOLE.LOG
        });
    }
  } catch (error) {
    return error.message;
  }
  return (mapAPI = array.map((game) => {
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
  }));
};

//FUNCION 2/3: JUEGOS DE DB
const getDBGames = async () => {
  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });

  const mapDB = dbGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      rating: game.rating,
      genres: game.genres, //ESTO SALE DE LA OTRA LISTA. REVISAR COMO SE HACE 👍
      origin: "db",
    };
  });
  return mapDB;
};

//FUNCION 3/3
module.exports = getAllGames = async () => {
  const api = await getApiGames();
  const db = await getDBGames();
  return [...api, ...db];
};
