import { Component } from "react";
import style from "./NotFound.module.css";
import { Link } from "react-router-dom";
import img from "../../assets/images/Not Found.png";
//import { Connect } from "react-redux"; //← Para el mapStateToProps

class NotFound extends Component {
  /*   constructor(props) {
       super(props);
       this.state = {estadoLocal:0} //← Seteo estados locales
       this.handleClick=this.handleClick.bind(this)   //← Bindeo los manejadores
     }

     const mapStateToProps = state => {estadoLocal: state.estadoGlobal}
     const estadoParaElComponente = state => state
     const conexion = connect(mapStateToProps)(estadoParaElComponente)

     handleClick(){
      this.setState({estadoLocal:...estadoLocal+1})
     }
*/
  render() {
    return (
      <div className={style.container}>
        <hr className={style.line}></hr>
        <img src={img} alt="Error 404" className={style.image} />
        <h1>404 PAGE NOT FOUND</h1>
        <Link to="/home">
          <button className={style.button}>VOLVER A HOME</button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
