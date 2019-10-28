import { newE2EPage } from '@stencil/core/testing';

describe('tag-cloud', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tag-cloud></tag-cloud>');

    const element = await page.find('tag-cloud');
    expect(element).toHaveClass('hydrated');
  });
});
