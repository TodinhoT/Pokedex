import React, { Component } from "react";
import ListaPokemon from "../Pokemons/ListaPokemon";

export default class MainPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <ListaPokemon></ListaPokemon>
        </div>
      </div>
    );
  }
}
