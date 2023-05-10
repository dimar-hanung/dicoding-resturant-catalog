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

let lastUrl = location.href;
window.history.pushState = function pushStateHandler(...args) {
  originalPushState.apply(this, args);
  window.dispatchEvent(stateChangeEvent);
  lastUrl = location.href;
};

window.addEventListener('popstate', () => {
  const newUrl = location.href;

  // Remove hashes and compare
  const oldUrlSansHash = lastUrl.split('#')[0];
  const newUrlSansHash = newUrl.split('#')[0];

  if (oldUrlSansHash !== newUrlSansHash) {
    app.renderPage();
  }

  lastUrl = newUrl;
});

window.addEventListener('statechange', () => {
  lastUrl = location.href;
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
