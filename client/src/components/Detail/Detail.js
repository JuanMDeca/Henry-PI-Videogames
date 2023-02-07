import style from "./Detail.module.css";
import imageLoading from "../../assets/images/Loading.gif";
import imageDefault from "../../assets/images/No image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clean, getGamebyId } from "../../redux/actions";
import { useParams } from "react-router-dom";

// NO TENGO IDEA SI TODO ESTO FUNCIONA O QUE ONDA

const Detail = () => {
  const game = useSelector((state) => state.videogame); //← Me trae todo lo que está en el estado de videogames
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch(); //← Me despacha (manda) las cosas al estore de ridux

  const { id } = useParams();
  console.log(game);

  useEffect(() => {
    dispatch(getGamebyId(id)); // ←Manda el contenido de la fn al store

    return () => {
      dispatch(clean("videogame"));
    };
  }, [dispatch, id]); //← De que depende que funcione o no el useEffect

  return (
    <div className={style.container}>
      <hr className={style.line}></hr>
      {game.length === 1 ? (
        <div className={style.detailContainer}>
          <img
            className={style.img}
            alt={`${game[0].name}`}
            src={`${game[0].image ? game[0].image : imageDefault}`}
          />
          <div className={style.gameName}>{game[0].name}</div>
          <div className={style.mapContainer}>
            {game[0].genres.map((genre) => {
              return (
                <span className={style.map} key={genre.id}>
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className={style.descContainer}>
            <h4 className={style.description}>{game[0].description}</h4>
          </div>
          <div className={style.mapContainer}>
            {game[0].platforms.map((platform) => {
              return (
                <div className={style.map} key={platform.id}>
                  {platform.name}
                </div>
              );
            })}
          </div>
          <div className={style.rating}>Rating: {`${game[0].rating}`}</div>
          <div className={style.publication}>Released date: {game[0].date}</div>
        </div>
      ) : error ? (
        <div className={style.error}>
          <img
            alt="error"
            src="https://www.seekpng.com/png/full/152-1529734_fallout-vault-boy-png.png"
          />
          <h1>{error}</h1>
        </div>
      ) : (
        <img className={style.loading} alt="Loading..." src={imageLoading} />
      )}
    </div>
  );
};

export default Detail;
