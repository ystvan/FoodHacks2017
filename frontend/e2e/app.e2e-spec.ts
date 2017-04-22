import { CopenhacksPage } from './app.po';

describe('copenhacks App', () => {
  let page: CopenhacksPage;

  beforeEach(() => {
    page = new CopenhacksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
