import { FourConnectPage } from './app.po';

describe('four-connect App', function() {
  let page: FourConnectPage;

  beforeEach(() => {
    page = new FourConnectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
