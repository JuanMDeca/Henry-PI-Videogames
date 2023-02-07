import style from "./Form.module.css";
import { clean, cleanError } from "../../redux/actions";
import { useState, useEffect } from "react";
import { getGenres, postGame } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();

  //ESTADOS
  const error = useSelector((state) => state.error);
  const genres = useSelector((state) => state.genres);

  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    // image: "",
    date: 0,
    rating: 0,
    genres: [],
    platforms: [],
  });

  const platforms = [
    "PC",
    "iOS",
    "Android",
    "macOS",
    "PlayStation 4",
    "PlayStation 5",
    "Xbox",
    "PS Vita",
  ];

  const [validations, setValidations] = useState({
    name: "",
    description: "",
    platforms: "",
    rating: "",
  });

  const [warnings, setWarnings] = useState({
    date: "",
    rating: "",
    genres: "",
    // image: "",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //MANEJADORES

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewGame({
      ...newGame, //←ademas de lo que tiene
      [name]: value, //←metele esto
    });
  };

  const handleSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    //Pregunto si la opcion ya fue elegida o no
    newGame[name].find((arr) => arr === value)
      ? setNewGame({
          ...newGame,
        })
      : setNewGame({
          ...newGame,
          [name]: [...newGame[name], value],
        });
  };

  /*MANDAR OTRO IF PREGUNTANDO SI HAY ERROR ✔
    SI HAY ERROR QUE LO MUESTRE EN UN ALERT ✔
  SI NO HAY ERROR QUE MUESTRE UN ALERT DE JUEGO CREADO ✔
  Y CAPAZ REDIRECCIONE A HOME */
  const handleSubmit = (event) => {
    event.preventDefault(); //← ESTE VA PORQUE RECARGA Y VUELA TODO
    if (error) {
      alert(`a ocurrido un error: "${error}"`);
      setNewGame({
        name: "",
        description: "",
        image: "",
        date: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      return dispatch(cleanError());
    } else if (validations) dispatch(postGame(newGame));
    alert(`${newGame.name} se creó con éxito!`);
    setNewGame({
      name: "",
      description: "",
      image: "",
      date: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    dispatch(clean("videogames"));
    return dispatch(cleanError());
  };

  //VALIDACIONES

  const validation = () => {
    const objV = {
      name: "",
      description: "",
      platforms: "",
      rating: "",
    };

    const objW = {
      date: "",
      genres: "",
      rating: "",
      // image: "",
    };
    !newGame.name ? (objV.name = "falta nombre") : (objV.name = "");
    !newGame.description
      ? (objV.description = "falta descripcion")
      : newGame.description.length < 10
      ? (objV.description = "al menos 10 caracteres")
      : (objV.description = "");
    newGame.platforms.length < 1
      ? (objV.platforms = "falta plataformas")
      : (objV.platforms = "");
    newGame.rating > 5
      ? (objV.rating = "exede el maximo")
      : newGame.rating < 0
      ? (objV.rating = "excede el minimo")
      : (objW.rating = "");
    setValidations(objV);

    !newGame.date
      ? (objW.date = "falta año")
      : newGame.date.length === 4
      ? (objW.date = "")
      : !isNaN(newGame.date)
      ? (objW.date = "")
      : (objW.date = "fecha invalida");
    !newGame.rating ? (objW.rating = "falta rating") : (objW.rating = "");
    newGame.genres.length < 1
      ? (objW.genres = "faltan generos")
      : (objW.genres = "");
    // !newGame.image ? (objW.image = "no image") : (objW.image = "");
    setWarnings(objW);
  };

  const activeButton =
    validations.name ||
    validations.description ||
    validations.platforms ||
    validations.rating
      ? true
      : false;

  useEffect(() => {
    validation();
  }, [newGame]);
  //↑ que ejecute validation cada vez que cambia newGame

  return (
    <div className={style.container}>
      <hr className={style.line}></hr>
      <div className={style.formContainer}>
        <h1>Crear un juego nuevo</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className={style.form}>
            <div className={style.labels}>
              <label>Nombre:</label>
              <input
                key="name"
                type="text"
                value={newGame.name}
                name="name"
                placeholder="escriba aqui..."
                onChange={(event) => handleChange(event)}
                className={validations.name ? style.error : style.good}
              ></input>
              <div className={validations.name ? style.errorDiv : null}>
                {validations.name}
              </div>
            </div>
            {/* <div className={style.labels}>
              <label>Imagen:</label>
              <input
                key="image"
                type="text"
                value={newGame.image}
                name="image"
                onChange={(event) => handleChange(event)}
                className={warnings.date ? style.warning : style.good}
              ></input>
            </div> */}
            <div className={style.labels}>
              <label>Año de lanzamiento:</label>
              <input
                key="date"
                type="number"
                value={newGame.date}
                name="date"
                onChange={(event) => handleChange(event)}
                className={warnings.date ? style.warning : style.good}
              ></input>
              <div className={warnings.date ? style.warningDiv : null}>
                {warnings.date}
              </div>
            </div>
            <div className={style.labels}>
              <label>Rating:</label>
              <input
                key="rating"
                type="number"
                value={newGame.rating}
                name="rating"
                onChange={(event) => handleChange(event)}
                className={
                  warnings.rating
                    ? style.warning
                    : validations.rating
                    ? style.error
                    : style.good
                }
              ></input>
              <div
                className={
                  warnings.rating
                    ? style.warningDiv
                    : validations.rating
                    ? style.errorDiv
                    : null
                }
              >
                {warnings.rating || validations.rating}
              </div>
            </div>
            <div className={style.labelSelect}>
              <label>Genero:</label>
              <select
                key="genres"
                onChange={(event) => handleSelect(event)}
                name="genres"
                className={warnings.genres ? style.warning : style.good}
              >
                {genres.map((genre, index) => {
                  return (
                    <option key={index} value={genre.name}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
              <div className={style.list}>
                {newGame.genres.map((genre) => (
                  <span className={style.component}>{genre}</span>
                ))}
              </div>
              <div className={warnings.genres ? style.warningDiv : null}>
                {warnings.genres}
              </div>
            </div>
            <div className={style.labelSelect}>
              <label>Plataformas:</label>
              <select
                key="platforms"
                onChange={(event) => handleSelect(event)}
                name="platforms"
                className={validations.platforms ? style.error : style.good}
              >
                {platforms.map((platform, index) => {
                  return (
                    <option key={index} value={platform}>
                      {platform}
                    </option>
                  );
                })}
              </select>
              <div className={style.list}>
                {newGame.platforms.map((plat) => {
                  return <span className={style.component}>{plat}</span>;
                })}
              </div>
              <div className={validations.platforms ? style.errorDiv : null}>
                {validations.platforms}
              </div>
            </div>
            <div className={style.labels}>
              <label>Descripción:</label>
              <textarea
                key="description"
                type="text"
                value={newGame.description}
                name="description"
                placeholder="escriba aqui..."
                onChange={(event) => handleChange(event)}
                className={
                  validations.description ? style.errorDesc : style.goodDesc
                }
              ></textarea>
              <div className={validations.description ? style.errorDiv : null}>
                {validations.description}
              </div>
            </div>

            <button
              className={activeButton ? style.buttonOff : style.button}
              type="submit"
              disabled={activeButton}
            >
              Agregar juego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

/*
const handleCHeck=(event)=>{
  if(event.target.checked){
    setNewGame({
      ...input,
      status:e.target.value
    })
  }
}


{
  genres.map((genre, index) => {
    return (
      <label key={index}>
        <input type="checkbox" name={genre.name} value={genre.name} onChange={(event)=>handleCheck(event)}/>
        {genre.name}
      </label>
    );
  });
}
*/
