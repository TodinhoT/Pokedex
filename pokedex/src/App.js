import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./Componentes/Layout/NavBar";
import MainPage from "./Componentes/Layout/MainPage";
import Pokemon from "./Componentes/Pokemons/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/Pokemon/:numPokemon" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
