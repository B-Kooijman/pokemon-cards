import { newSpecPage } from '@stencil/core/testing';
import { PokemonButton } from '../pokemon-button';

describe('pokemon-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PokemonButton],
      html: `<pokemon-button></pokemon-button>`,
    });
    expect(page.root).toEqualHtml(`
      <pokemon-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pokemon-button>
    `);
  });
});
