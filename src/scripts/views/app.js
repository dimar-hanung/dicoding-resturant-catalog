import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, callback = () => true,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._callback = callback;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      callback: this._callback,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();

    const page = new routes[url](this._content);

    if (page.beforeRender) {
      await page.beforeRender();
    }

    await page.init();

    if (page.afterRender) {
      await page.afterRender();
    }
  }
}

export default App;
