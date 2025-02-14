import React, { Component } from "react";
import axios from "axios";
import BlocoPokemon from "./BlocoPokemon";

export default class ListaPokemon extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <BlocoPokemon
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              ></BlocoPokemon>
            ))}
          </div>
        ) : (
          <h1>Carregando Pokemons</h1>
        )}
      </React.Fragment>
    );
  }
}
