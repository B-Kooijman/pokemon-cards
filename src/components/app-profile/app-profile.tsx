import { Component, State, Prop, Watch, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Pokemon, ViewState } from '../../types/types';
import { getPokemon } from '../../utils/helpers';

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

  @Watch('match')
  matchWatchHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.updateView();
    }
  }

  async componentWillLoad() {
    this.updateView();
  }

  async updateView() {
    this.view = "LOADING";

    await getPokemon(this.match.params.name)
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
      <div>
        <pokemon-link text={"Back"} url={"/"} />
        <div class="app-profile">
          {this.view === "LOADING" && <pokemon-spinner />}
          {this.view === "SUCCESS" && <pokemon-details pokemon={this.currentPokemon} />}
          {this.view === "ERROR" && <pokemon-error />}
        </div>
      </div>
    );
  }
}
