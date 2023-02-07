import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMEBYID,
  GET_VIDEOGAMEBYNAME,
  GET_GENRES,
  ERROR,
  POST_VIDEOGAME,
  CLEAN,
  CLEAN_ERROR,

  //FILTROS
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,

  //ORDENAMIENTOS
  ORDER_BY_NAME,
  ORDER_BY_RANKING,
} from "./actions";

const initialState = {
  allVideogames: [], //Guardo un espejo para que los filtros saquen la data de acá
  videogames: [],
  byName: [],
  videogame: [], //Lo uso solo para el detalle
  genres: [],
  error: "",
};

//EL REDUCER ES UNA FUNCION PURA. HACE PURO CALCULO Y NO LE GUSTA LA INSERTIDUMBRE, SIEMPRE RETORNA LO MISMO PARA LA MISMA OPERACION. APIS FUERA DE ACA!
//LA UNICA FN QUE PUEDE MODIFICAR AL ESTADO
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAMEBYID:
      return {
        ...state,
        videogame: action.payload,
      };
    case GET_VIDEOGAMEBYNAME:
      return {
        ...state,
        videogames: action.payload, //Lo uso para los filtrados
        byName: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case POST_VIDEOGAME:
      return { ...state };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAN:
      return {
        ...state,
        [action.payload]: [],
      };

    case CLEAN_ERROR:
      return {
        ...state,
        error: "",
      };

    //FILTROS

    case FILTER_BY_GENRE:
      const gamesByGenre = state.allVideogames;
      const genre = action.payload;
      let filtered = [];
      if (state.byName.length === 0) {
        if (genre === "all") filtered = gamesByGenre;
        for (let i = 0; i < gamesByGenre.length; i++) {
          if (gamesByGenre[i].genres.find((gen) => gen.name === genre)) {
            filtered.push(gamesByGenre[i]);
          }
        }
        //Esta parte de abajo es para filtrar los de los nombres
      } else {
        if (genre === "all") filtered = state.byName;
        for (let i = 0; i < state.byName.length; i++) {
          if (state.byName[i].genres.find((gen) => gen.name === genre)) {
            filtered.push(state.byName[i]);
          }
        }
      }

      return {
        ...state,
        videogames: filtered,
      };

    case FILTER_BY_ORIGIN:
      let originFiltered = [];
      if (state.byName.length === 0) {
        action.payload === "all"
          ? (originFiltered = state.allVideogames)
          : (originFiltered = state.allVideogames.filter(
              (game) => game.origin === action.payload
            ));
      } else {
        action.payload === "all"
          ? (originFiltered = state.byName)
          : (originFiltered = state.byName.filter(
              (game) => game.origin === action.payload
            ));
      }
      return {
        ...state,
        videogames: originFiltered,
      };

    //ORDENAMIENTOS

    case ORDER_BY_NAME:
      let orderByName = [];
      //if (state.byName.length === 0) {
      orderByName =
        action.payload === "A-Z"
          ? state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      /* } else {
        orderByName =
          action.payload === "A-Z"
            ? state.videogames.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
              })
            : state.videogames.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                return 0;
              });
      }*/
      return {
        ...state,
        videogames: orderByName,
      };

    case ORDER_BY_RANKING:
      let orderByRanking = [];
      //if (state.byName.length === 0) {
      orderByRanking =
        action.payload === "ascendente"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            });
      /*} else {
        orderByRanking =
          action.payload === "ascendente"
            ? state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return 1;
                if (b.rating > a.rating) return -1;
                return 0;
              })
            : state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return -1;
                if (b.rating > a.rating) return 1;
                return 0;
              });
      }*/
      return {
        ...state,
        videogames: orderByRanking,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
