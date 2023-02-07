import React from "react"; //Hay que importar React para los de clase
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.landing}>WELCOME TO GAMES APP</h1>
      <div className={style.imgContainer}>
        <Link className={style.button} to="/home">
          <img
            className={style.image}
            alt="imagen de inicio"
            src="https://www.pngplay.com/wp-content/uploads/12/Joystick-PNG-HD-Quality.png"
          />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
