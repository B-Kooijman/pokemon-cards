import { newE2EPage } from '@stencil/core/testing';

describe('pokemon-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pokemon-button></pokemon-button>');

    const element = await page.find('pokemon-button');
    expect(element).toHaveClass('hydrated');
  });
});
