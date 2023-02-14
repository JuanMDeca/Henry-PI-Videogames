import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import style from "./NavBar.module.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import UserData from "../UserData/UserData";

const NavBar = () => {
  const history = useHistory();

  const [name, setName] = useState("");

  //↓ Acá mando lo que escribo en el buscador al estado local
  const handleInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setName(value);
  };

  //Al clickear el botón redirijo a /search query y search recibe el query
  const handleSubmit = () => {
    history.replace(`/search?name=${name}`);
    setName("");
  };

  return (
    <div className={style.color}>
      <div className={style.container}>
        <div>
          <Link to="/home" className={style.button}>
            <button className={style.button}>Home</button>
          </Link>
          <Link to="/form" className={style.button}>
            <button className={style.button}>Crear juego</button>
          </Link>
          <Login />
          <Logout />
        </div>
        <div>
          <UserData />
        </div>
        <div>
          <input
            className={style.input}
            type="text"
            value={name}
            placeholder="buscar..."
            onChange={(event) => handleInput(event)}
          />
          <button
            className={name ? style.submit : style.submitOff}
            type="submit"
            onClick={(event) => handleSubmit(event)}
            disabled={!name}
          >
            buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
