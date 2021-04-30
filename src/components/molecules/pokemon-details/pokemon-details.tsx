import { Component, Prop, h } from '@stencil/core';

export type Pokemon = {
  id: number;
  species: {
    name: string;
  }
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      }
    }
  },
  types: [
    {
      type: {
        name: string;
      };
    }
  ]
}

@Component({
  tag: 'pokemon-details',
  styleUrl: 'pokemon-details.css',
  shadow: false,
})
export class PokemonDetails {

  @Prop() pokemon: Pokemon;

  render() {
    return (
      <div class="poke-details">
        <pokemon-image src={this.pokemon.sprites.other.dream_world.front_default} />
        <h3>Name</h3>
        <pokemon-paragraph text={this.pokemon.species.name} />
        <div>
          <h3>Types</h3>
          {this.pokemon.types.map(type => {
            return (
              <pokemon-paragraph text={type.type.name} />
            )
          })}
        </div>
      </div>
    );
  }
}