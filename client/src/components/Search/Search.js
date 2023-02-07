import CardContainer from "../CardsContainer/CardsContainer";
import Filters from "../Filters/Filters";
import style from "./Search.module.css";
import { clean } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameByName } from "../../redux/actions";

const Search = () => {
  const [, /*renderizador*/ setRenderizador] = useState(""); //Guarda el valor del value. Cuando cambia, renderiza el orden nuevo
  const games = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  //acá recibo el query gracias a useLocation 👍
  const name = useLocation().search;

  useEffect(() => {
    dispatch(clean("videogames"));
    dispatch(getGameByName(name));
    return () => dispatch(clean("videogames"));
  }, [dispatch, name]);

  const reloader = () => {
    setRenderizador(`Acomoda en ${Math.random()}`);
  };

  return (
    <div className={style.container}>
      <Filters reloader={reloader} />
      <CardContainer cards={games} />
    </div>
  );
};

export default Search;
