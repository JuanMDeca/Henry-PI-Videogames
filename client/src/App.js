import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";
import Search from "./components/Search/Search";

function App() {
  const pathname = useLocation().pathname; //← useLocation me tira data de la url en la que estoy
  return (
    <div className="App">
      {pathname !== "/" ? <NavBar /> : null}
      {/*↑ Si la url es diferente de "/"" mostra la Nav, sino no hagas nada*/}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/videogame/:id" component={Detail} />
        <Route path="/form" component={Form} />
        {/* <Route path="/home" component={NavBar} /> */}
        <Route path={`/search`} component={Search} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
