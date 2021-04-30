import { Component, State, h } from '@stencil/core';

type PokemonListItem = {
  name: string;
}

type PokemonList = {
  results: PokemonListItem[];
}

type ViewState = "SUCCESS" | "LOADING" | "ERROR"

const url = 'https://pokeapi.co/api/v2/pokemon?limit=50';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @State() allPokemon: PokemonList;
  @State() selectedPokemon: string = "pikachu";
  @State() view: ViewState;

  async componentWillLoad() {
    this.view = "LOADING";

    await fetch(url)
      .then(response => response.json())
      .then(response => {
        this.allPokemon = { ...this.allPokemon, results: response.results };
        this.selectedPokemon = response.results[0].name;
        this.view = "SUCCESS";
      })
      .catch(error => {
        this.view = "ERROR";
        console.error("Something went wrong!: ", error.message)
      })
  }

  watchHandler(event) {
    console.log('The selected Pokemon is:', event.currentTarget.value);
    this.selectedPokemon = event.currentTarget.value;
  }

  render() {
    return (
      <div class="app-home">
        {this.view === "LOADING" && <pokemon-spinner />}
        {this.view === "SUCCESS" &&
          <div>
            <pokemon-header>
              {/* notice the order! */}
              <h3 slot="subheader">Have fun!</h3> 
              <h1 slot="header">Welcome to the Pokemon Cards App. You can find any pokemon here!</h1> 
              <pokemon-paragraph text={"this won't be rendered on the page, unless you uncomment the slot"}/>
            </pokemon-header>

            {this.allPokemon &&
              <select onChange={event => this.watchHandler(event)}>
                {
                  this.allPokemon.results.map(pokemon => <option value={pokemon.name}>{pokemon.name}</option>)
                }
              </select>
            }

            <pokemon-paragraph text={`You selected: ${this.selectedPokemon}`} />
            <pokemon-button text={"Go to Profile"} url={`/profile/${this.selectedPokemon}`} />
          </div>
        }
        {this.view === "ERROR" && <pokemon-error />}
      </div>
    );
  }
}
