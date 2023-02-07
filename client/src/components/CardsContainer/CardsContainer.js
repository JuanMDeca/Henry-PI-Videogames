import style from "./CardsContainer.module.css";
import imageLoading from "../../assets/images/Loading.gif";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const CardContainer = (cards) => {
  console.log("conteiner tiene " + cards.cards.length + " elementos");
  const error = useSelector((state) => state.error);

  return (
    <div>
      <div className={style.container}>
        {cards.cards.length ? (
          cards.cards.map((game, index) => {
            return (
              <Card
                key={index}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
              />
            );
          })
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
    </div>
  );
};

export default CardContainer;
