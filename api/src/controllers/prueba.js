const axios = require("axios");
const url =
  "https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e";
const url2 = "https://rickandmortyapi.com/api/character";
`https://api.rawg.io/api/games/3328?key=1bcb2b8a069149bc893ce1a14401080e`;

/*
{
    "count": 853708,
    "next": "https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e&page=2",
    "previous": null,
    "results": [
        */
/*
module.exports = prueba = async () => {
  let array = [];
  let url = "https://rickandmortyapi.com/api/character";
  for (let i = 0; i < 100; i = array.length) {
    const axio = await axios
      .get(url, {
        headers: {
          "accept-encoding": "true",
        },
      })
      .then((resp) => {
        const info = resp.data;
        const direccion = resp.data.info.next;
        console.log(direccion);
        url = direccion;
        console.log(url);
        array = [...array, ...info.results];
        console.log(array.length);
      });
  }
  return array;
};

*/
module.exports = prueba = async () => {
  const data = await axios.get(
    `https://api.rawg.io/api/games?key=1bcb2b8a069149bc893ce1a14401080e&search=grand%theft%auto`
  );
  const lala = data.data;
  return lala;
};
