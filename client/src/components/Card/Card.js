import style from "./Card.module.css";
import { Link } from "react-router-dom";
import imageDefault from "../../assets/images/No image.jpg";

const Card = ({ id, image, name, genres }) => {
  //Como acá desestructuré, cuadno haga el mapeo en card container mando desestructurado
  return (
    <div className={style.card} key={id}>
      <Link to={`/videogame/${id}`} key={id} className={style.link}>
        {/*REVISAR ESTE LINK POR LAS DEUDAS*/}
        <div className={style.image}>
          <img alt={`${name}`} src={`${image ? image : imageDefault}`} />
        </div>

        <div className={style.details}>
          <h3 className={style.name}>{`${name}`}</h3>
          <div className={style.genres}>
            {
              /* Tengo que hacer en el css diferentes clases segun el nombre del genero para que lo muestre
             acá tengo que hacer un map del tipo de generos que tiene:*/
              genres.map((genre) => {
                return (
                  <span className={style.map} key={genre.id}>
                    {genre.name}
                  </span>
                );
              })
            }
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
