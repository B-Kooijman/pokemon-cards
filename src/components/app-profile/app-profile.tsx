import { Component, State, Prop, Host, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Pokemon } from '../molecules/pokemon-details/pokemon-details';

type ViewState = "SUCCESS" | "LOADING" | "ERROR"

const url = 'https://pokeapi.co/api/v2/pokemon/';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})

export class AppProfile {
  @State() currentPokemon: Pokemon;
  @State() view: ViewState;
  @State() imageLoaded: boolean;
  @Prop() match: MatchResults;

  async componentWillLoad() {
    this.view = "LOADING";

    await fetch(`${url}${this.match.params.name}`)
      .then(response => response.json())
      .then((response: Pokemon) => {
        this.currentPokemon = {
          ...this.currentPokemon,
          id: response.id,
          sprites: response.sprites,
          species: response.species,
          types: response.types
        };
        this.view = "SUCCESS";
      })
      .catch(error => {
        console.error("Something went wrong!: ", error.message);
        this.view = "ERROR";
      })
  }

  render() {
    return (
      <div class="app-profile">
        <pokemon-button text={"Back"} url={"/"} />
        {this.view === "LOADING" && <pokemon-spinner />}
        {this.view === "SUCCESS" && <pokemon-details pokemon={this.currentPokemon} />}
        {this.view === "ERROR" && <pokemon-error />}
      </div>
    );
  }
}
