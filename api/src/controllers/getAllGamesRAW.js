const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const url = `https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e`;
const url2 = "https://rickandmortyapi.com/api";
const url3 = "https://rickandmortyapi.com/api/character";

/*
{
    "count": 853708,
    "next": "https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e&page=2",
    "previous": null,
    "results": [
        */

module.exports = getAllGames = async () => {
  let array = [];
  let url = `https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e`;

  for (let i = 0; i < 100; i = array.length) {
    const get = await axios
      .get(url, {
        headers: {
          "accept-encoding": "true",
        },
      })
      .then((resp) => {
        const data = resp.data;
        const next = data.next;
        console.log(next);
        url = next;
        console.log(url);
        array = [...array, ...data.results];
        console.log(array.length);
      });
  }
  // const mapAPI = array.map((game) => {
  //   return {
  //     id: game.id,
  //     image: game.background_image,
  //     name: game.name,
  //     genres: game.genres,
  //     origin: "api",
  //   };
  // });

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
      description: game.description,
      platforms: game.platforms,
      date: game.date,
      rating: game.rating,
      origin: "db",
    };
  });

  return [...mapAPI, ...mapDB];
};

const mapeoApi = (array) => {
  const mapAPI = array.map((game) => {
    return {
      id: game.id,
      image: game.background_image,
      name: game.name,
      genres: game.genres,
      origin: "api",
    };
  });
  return mapAPI;
};

const mapeoDB = (array) => {
  const mapDB = dbGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      date: game.date,
      rating: game.rating,
      origin: "db",
    };
  });
  return mapDB;
};

const getApiGames = async () => {
  let array = [];
  let url = `https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e`;

  for (let i = 0; i < 100; i = array.length) {
    const get = await axios
      .get(url, {
        headers: {
          "accept-encoding": "true",
        },
      })
      .then((resp) => {
        const data = resp.data;
        const next = data.next;
        console.log(next);
        url = next;
        console.log(url);
        array = [...array, ...data.results];
        console.log(array.length);
      });
  }
  return array;
};

const DBGames = async () => {
  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });
  return dbGames;
};

/*
Esto va en el map del detalle (es con el ID): 
      released: game.released,
      rating: game.rating,
      platforms: game.platforms,
      description: game.tags, //OJO AL PIOJO CON ESTO!, tags no se si cuenta como descripcion
      */
