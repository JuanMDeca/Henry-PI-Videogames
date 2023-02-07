import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMEBYID = "GET_VIDEOGAMEBYID";
export const GET_VIDEOGAMEBYNAME = "GET_VIDEOGAMEBYNAME";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const ERROR = "ERROR";
export const CLEAN = "CLEAN";
export const CLEAN_ERROR = "CLEAN_ERROR";

export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RANKING = "ORDER_BY_RANKING";

//LAS ACTIONS MANDAN INFO PARA QUE EL REDUCER TRABAJE
export const getAllgames = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/videogames");
      const videogames = apiData.data;
      dispatch({ type: GET_VIDEOGAMES, payload: videogames });
    } catch (error) {
      const err = error.message;
      dispatch({ type: ERROR, payload: err });
    }
  };
};

export const getGamebyId = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/videogame/${id}`);
      const videogame = apiData.data;
      console.log(videogame);
      dispatch({ type: GET_VIDEOGAMEBYID, payload: videogame });
    } catch (error) {
      const err = error.message;
      dispatch({ type: ERROR, payload: err });
    }
  };
};

export const getGameByName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/videogames${name}`
      );
      const videogame = apiData.data;
      dispatch({ type: GET_VIDEOGAMEBYNAME, payload: videogame });
    } catch (error) {
      const err = error.message;
      dispatch({ type: ERROR, payload: err });
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/genres`);
      const genres = apiData.data;
      dispatch({ type: GET_GENRES, payload: genres });
    } catch (error) {
      const err = error.message;
      console.log(error);
      dispatch({ type: ERROR, payload: err });
    }
  };
};

export const postGame = (value) => {
  return async function (dispatch) {
    try {
      return await axios.post(`http://localhost:3001/videogames`, value);
    } catch (error) {
      const err = error.message;
      dispatch({ type: ERROR, payload: err });
      console.log("action: " + err);
    }
  };
};

export const clean = (payload) => {
  return { type: CLEAN, payload: payload };
};

export const cleanError = (payload) => {
  return { type: CLEAN_ERROR, payload: payload };
};

//FILTROS

export const filterByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload: payload };
};
export const filterByOrigin = (payload) => {
  return { type: FILTER_BY_ORIGIN, payload: payload };
};

//ORDENAMIENTOS

export const orderByName = (payload) => {
  return { type: ORDER_BY_NAME, payload: payload };
};

export const orderByRanking = (payload) => {
  return { type: ORDER_BY_RANKING, payload: payload };
};
