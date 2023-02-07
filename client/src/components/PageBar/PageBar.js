import React from "react";
import style from "./PageBar.module.css";

const PageBar = ({ cardsXPage, games, setPage, currentPage }) => {
  const numberOfPages = Math.ceil(games.length / cardsXPage); //←La cantidad de páginas que va a tener la barrita
  const pageNumbers = []; //←Los números en la barrita

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const back = () => {
    console.log(`pagebar ${currentPage}`);
    const number = currentPage - 1;

    if (currentPage > 1) return setPage(number);
  };

  const forward = () => {
    const number = currentPage + 1;

    if (currentPage < numberOfPages) return setPage(number);
  };

  return (
    <nav className={style.container}>
      <button className={style.number} onClick={() => back()}>
        ←
      </button>
      {pageNumbers &&
        pageNumbers.map((number) => {
          return (
            <button
              key={number}
              className={number === currentPage ? style.numberOn : style.number}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          );
        })}
      <button className={style.number} onClick={() => forward()}>
        →
      </button>
    </nav>
  );
};

export default PageBar;
