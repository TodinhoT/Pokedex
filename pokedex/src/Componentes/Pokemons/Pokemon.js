import React, { Component } from "react";
import Axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default class Pokemon extends Component {
  state = {
    name: "",
    imageUrl: "",
    numPokemon: "",
    tipos: [],
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    altura: "",
    peso: "",
    habilidades: "",
    descricao: ""
  };

  async componentDidMount() {
    const { numPokemon } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${numPokemon}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${numPokemon}/`;

    const pokemonResp = await Axios.get(pokemonUrl);
    const name = pokemonResp.data.name;
    const imageUrl = pokemonResp.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonResp.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    const altura = pokemonResp.data.height;
    const peso = pokemonResp.data.weight / 10;
    const tipos = pokemonResp.data.types.map(type => type.type.name);
    const habilidades = pokemonResp.data.abilities.map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    await Axios.get(pokemonSpeciesUrl).then(res => {
      let descricao = "";
      res.data.flavor_text_entries.some(flavor => {
        descricao = flavor.flavor_text;
        return;
      });

      this.setState({ descricao });
    });

    this.setState({
      name,
      imageUrl,
      numPokemon,
      tipos,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      altura,
      peso,
      habilidades
    });
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.numPokemon}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.tipos.map(type => (
                    <span
                      key={type}
                      className="badge badge-primary badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white"
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split("-")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split("-")
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">HP</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.hp}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Attack</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.attack}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Defense</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.defense}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Speed</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.speed}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Special Attack</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.specialAttack}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Special Defense</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{ width: `${this.state.stats.specialDefense}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">
                  <p className="p-2">{this.state.descricao}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <div className="card-title text-center">
              <h5>Perfil</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-rigth">Altura:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.altura} m.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-rigth">Peso:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.peso} kg.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-rigth">Habilidades:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.habilidades}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
