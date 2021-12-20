import axios from "axios";
import React, { Component } from "react";

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      specialAttack: "",
      specialDefense: "",
      speed: "",
    },
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    //console.log(pokemonUrl)
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    //console.log(pokemonSpeciesUrl)
    //get info
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    //console.log(name)

    const imageUrl = `https://github.com/saurabhdudhalwar/pokemon/blob/main/${name}.png?raw=true`;
    //console.log(imageUrl)
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
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
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
      }
    });

    // convert to feet
    const height = Math.round(pokemonRes.data.height);

    //convert to pounds
    const weight = Math.round(pokemonRes.data.weight);

    const types = pokemonRes.data.types.map((types) => {
      return types.type.name
        .toLowerCase()
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    const abilities = pokemonRes.data.abilities.map((ability) => {
      return ability.ability.name;
    });
    //console.log(abilities)

    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name}`;
      });
    //console.log(evs)

    //get pokemon Decribe

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"].map((group) => {
        return group.name;
      });

      const hetchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hetchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs,
    });
    //  console.log(this.state)
  }
  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right" style={{ float: "right" }}>
                  {this.state.types.map((type) => (
                    <span key={type} style={{ fontSize: "18px" }}>
                      {type
                        .toLowerCase()
                        .split(" ")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img
                    src={this.state.imageUrl}
                    className="card-img-top rounded mx-auto mt-2"
                  />
                </div>
                <div className="col-md-8">
                  <h4 className="mx-auto">
                    {this.state.name
                      .toLowerCase()
                      .split(" ")
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                  </h4>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{ width: `${this.state.stats.hp}%` }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{ width: `${this.state.stats.attack}%` }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{ width: `${this.state.stats.defense}%` }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">Special-Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.specialAttack}%`,
                          }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">Special-Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.specialDefense}%`,
                          }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-item-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{ width: `${this.state.stats.speed}%` }}
                          aria-valuenow="25"
                          aria-aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col">
                    <p className="p-2" style={{textAlign: "center"}}>{this.state.description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h6 style={{ textAlign: "center" }}>
                     : Gender Ratio :
                    </h6>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${this.state.genderRatioFemale}%`,
                        background: "red",
                      }}
                      aria-valuenow="15"
                      aria-aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.genderRatioFemale} %</small>
                    </div>

                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${this.state.genderRatioMale}%`,
                        background: "green",
                      }}
                      aria-valuenow="30"
                      aria-aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.genderRatioMale} %</small>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <hr style={{ height: "4px" }} />
              </div>
              <div className="card-body">
                <div className="card-title text-center">
                  <h5>Profile</h5>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                          Height :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.height} unit
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                          Weight :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.weight} pounds
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                          Catch Ratio :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.catchRate} %
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                        Egg Group: :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.eggGroups} 
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                        HatchSteps :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.hetchSteps} 
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right" style={{ float: "right" }}>
                        EVS :
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 style={{ float: "left" }}>
                          {this.state.evs} 
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <hr style={{ height: "2px" }} />

            <h6 style={{float: "right"}}>Design And developed by Saurabh Dudhalwar</h6>
          </div>
          
        </div>
        
      </div>
    );
  }
}
