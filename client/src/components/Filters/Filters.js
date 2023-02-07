import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Filters.module.css";
import {
  getGenres,
  filterByGenre,
  filterByOrigin,
  orderByName,
  orderByRanking,
} from "../../redux/actions";

const Filters = ({ reloader }) => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres); //← Extrae info del store. En este caso de generos
  //Cuando hago un dispatch, ejecuto una action que hace cambiar algo en el store y con el useSelector capturo los cambios que hubo en el store y los traigo a este componente

  useEffect(() => {
    if (genres.length < 1) dispatch(getGenres());
  }, [dispatch, genres.length]);
  //↑No hace falta porque el estado lo lleno con el dispatch del home

  const handleFilterByGenre = (event) => {
    const value = event.target.value;
    dispatch(filterByGenre(value));
    reloader();
  };

  const handleFilterByOrigin = (event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(filterByOrigin(value));
    reloader();
  };

  //ORDENAMIENTOS

  const handleOrderByRanking = (event) => {
    const value = event.target.value;
    dispatch(orderByRanking(value));
    console.log(value);
    reloader();
  };

  const handleOrderByName = (event) => {
    const value = event.target.value;
    dispatch(orderByName(value));
    console.log(value);
    reloader();
  };

  return (
    <div>
      <div className={style.butContainer}>
        <div className={style.optionsCont}>
          generos
          <select
            className={style.select}
            onChange={(event) => handleFilterByGenre(event)}
          >
            <option value="all">all</option>
            {genres.length ? (
              genres.map((genre) => {
                return (
                  <option value={genre.name} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })
            ) : (
              <option></option>
            )}
          </select>
        </div>
        <div className={style.optionsCont}>
          procedencia{/*origin*/}
          <select
            className={style.select}
            onChange={(event) => handleFilterByOrigin(event)}
          >
            <option value="all">Todos</option>
            <option value="api">Existente</option>
            <option value="db">Creado</option>
          </select>
        </div>
        <div className={style.optionsCont}>
          ranking
          <select
            className={style.select}
            onChange={(event) => handleOrderByRanking(event)}
          >
            <option value="nothing"> </option>
            <option value="ascendente">De menor a mayor</option>
            <option value="descendente">De mayor a menor</option>
          </select>
        </div>
        <div className={style.optionsCont}>
          alfabetico
          <select
            className={style.select}
            onChange={(event) => handleOrderByName(event)}
          >
            <option value="nothing"> </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>
      <div></div>
      <hr className={style.line}></hr>
    </div>
  );
};

export default Filters;
