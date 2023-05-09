import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import App from './views/app';
import './components/router-link';

const app = new App({
  button: document.querySelector('#navbarButton'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#maincontent'),
  callback: (isActive) => {
    const navbarOverlay = document.querySelector('.navbar__overlay');

    if (isActive) {
      navbarOverlay.style.display = 'block';
      navbarOverlay.classList.toggle('--active');

      return;
    }

    navbarOverlay.classList.remove('--active');
    setTimeout(() => {
      navbarOverlay.style.display = 'none';
    }, 400);
  },
});

const originalPushState = window.history.pushState;
const stateChangeEvent = new Event('statechange');

// init db

const openRequest = indexedDB.open('dapurKota', 1);
openRequest.onupgradeneeded = () => {
  const db = openRequest.result;
  if (!db.objectStoreNames.contains('restaurantsHeader')) {
    db.createObjectStore('restaurantsHeader', { keyPath: 'id' });
  }
  if (!db.objectStoreNames.contains('restaurantsDetail')) {
    db.createObjectStore('restaurantsDetail', { keyPath: 'id' });
  }
};

//

window.history.pushState = function (state, title, url) {
  originalPushState.apply(this, arguments);
  window.dispatchEvent(stateChangeEvent);
};
window.addEventListener('popstate', () => {
  app.renderPage();
});

window.addEventListener('statechange', (state, title, url) => {
  app.renderPage();
});

window.addEventListener('load', () => {
  console.log('load');
  app.renderPage();
});
