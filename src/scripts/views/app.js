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

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    // console.log('renderPage');
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log('url2', url);

    const page = routes[url];

    if (page.beforeRender) {
      await page.beforeRender();
    }

    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
