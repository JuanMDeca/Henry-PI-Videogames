import CardContainer from "../CardsContainer/CardsContainer";
import PageBar from "../PageBar/PageBar";
import Filters from "../Filters/Filters";
import style from "./Home.module.css";
//import imageLoading from "../../assets/images/Loading.gif"; junto con allVideogames lo usaba para cargar
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cleanError, getAllgames, getGenres } from "../../redux/actions";

const Home = () => {
  //CONEXIONES STORE:

  const games = useSelector((state) => state.videogames); //← Extrae info del store. En este caso de videogames
  // const allVideogames = useSelector((state) => state.allVideogames); ←Lo usaba para cargar
  // const error = useSelector((state) => state.error);

  //MONTADORES:

  const dispatch = useDispatch(); //← Dispara actions para hacer algo

  useEffect(() => {
    dispatch(getGenres());
    dispatch(cleanError());
  }, [dispatch]);
  //↑Es el encargado de los ciclos de vida de los componentenes. Es componentDidMount, DidUpdate y WillUnmount juntos

  useEffect(() => {
    if (games.length < 100) dispatch(getAllgames());
  }, [dispatch]);

  //PAGINADO:

  const [cardsXPage /*setCardsXPage*/] = useState(15); //Guarda la cantidad de targetas en la página. ES FIJO
  const [currentPage, setCurrentPage] = useState(1); //Guarda la página en la que estoy. Arranco en la 1
  const [, /*renderizador*/ setRenderizador] = useState(""); //Guarda el valor de un value. Cuando cambia, renderiza el orden nuevo
  const indexOfLastCard = currentPage * cardsXPage; //Es el último juego de la página y lo uso para slicear el array 👍
  const indexOfFirstCard = indexOfLastCard - cardsXPage; //Busco el primer juego de la página, para mandar al slice 👍
  const currentCards = games.slice(indexOfFirstCard, indexOfLastCard); //Efectivamente corto con el primero indice y el último indice

  //Logs de control
  // console.log("home todos " + allVideogames.length);
  // console.log("home games " + games.length);
  // console.log("home currentCards " + currentCards.length);

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reloader = () => {
    setCurrentPage(1);
    setRenderizador(`acomoda en ${Math.random()}`);
  };

  return (
    <div className={style.container}>
      <Filters reloader={reloader} />
      <div>
        <PageBar
          cardsXPage={cardsXPage}
          games={games}
          setPage={setPage}
          currentPage={currentPage}
        />
        <hr className={style.line}></hr>
      </div>
      <div className={style.cardContainer}>
        <CardContainer cards={currentCards} />
      </div>
    </div>
  );
};

export default Home;
