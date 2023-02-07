const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

//Esta fn la uso para crear juegos nuevos
const dBGenres = async () => {
  const db = await Genre.findAll();
  if (db.length === 0) {
    //console.log("entra en el if");
    const axio = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = axio.data.results;
    const map = genres.map((genre) => {
      return { id: genre.id, name: genre.name };
    });

    //Este for manda los generos a la base de datos 👍 hace falta el id porque lo tengo como obligatorio
    for (let i = 0; i < map.length; i++) {
      const name = map[i].name;
      const id = map[i].id;
      //console.log(name);
      Genre.findOrCreate({
        where: { id: id, name: name },
      });
    }
  }
  //return await Genre.findAll();
};

//Esta la uso para la ruta de traer los generos
const getGenres = async () => {
  await dBGenres();
  return await Genre.findAll();
};

module.exports = { dBGenres, getGenres };

//ACA ME PUEDO MANDAR UN FOR CON genres.length E IR MANDANDO LOS GENEROS ADENTRO DE LA DB USANDO Genres.create(genres[i])

//module.exports = getGenres = async ()
