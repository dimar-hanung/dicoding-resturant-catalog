import Api from '../../utils/api';
import '../../components/icon-favorite';

class Page {
  constructor(content) {
    this.content = content;
  }

  static createCatalogTemplate(catalogs) {
    return `
      ${catalogs
    .map(
      (catalog) => `
            <div class="catalog">
              <div class="catalog__header" tabindex="0">
                <img
                  class="catalog__header__poster"
                  src="https://restaurant-api.dicoding.dev/images/medium/${catalog.pictureId}"
                  alt="Foto Lokasi ${catalog.name}"
                />
  
                <a is="router-link" class="catalog__header__title" href="/detail/${catalog.id}">
                  <div>
                    <h1>${catalog.name}</h1>
                    <p>${catalog.city}</p>
                  </div>
                </a>
  
                <div class="catalog__header__rating">
                  <p>
                    ⭐️<span class="catalog__header__rating__score"
                      >${catalog.rating}</span
                    >
                  </p>
                </div>
              </div>
  
              <div class="catalog__description" tabindex="0">
                <p>${catalog.description}</p>
              </div>
            </div>
          `,
    )
    .join('')}
    `;
  }

  static async fetchCatalog() {
    const response = await Api.fetch({
      url: 'https://restaurant-api.dicoding.dev/list',
    });

    return response;
  }

  async init() {
    this.content.innerHTML = `
    <header class="hero">
        <img src="/images/heros/hero-image_2.jpg" alt="Background Makanan" />
        <div class="content">
          <h1>DapurKota</h1>
          <hr />
          <p>
            Cicipi Berbagai Hidangan di Seluruh Kota, Hanya dengan Beberapa
            Sentuhan! 🍽️
          </p>
        </div>
      </header>
    <main id="catalogListContainer" class="main"></main>`;

    const catalogListContainer = document.getElementById(
      'catalogListContainer',
    );

    const openRequest = indexedDB.open('dapurKota', 1);

    openRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const tx = db.transaction('restaurantsHeader', 'readonly');
      const store = tx.objectStore('restaurantsHeader');
      const data = await new Promise((resolve) => {
        store.getAll().onsuccess = (e) => {
          resolve(e.target.result);
        };
      });

      if (!data.length) {
        catalogListContainer.innerHTML = Page.createCatalogTemplate(data);
      }
      const catalog = await Page.fetchCatalog();
      if (catalog) {
        catalog.restaurants.forEach((restaurant) => {
          db.transaction('restaurantsHeader', 'readwrite')
            .objectStore('restaurantsHeader')
            .put(restaurant);
        });
        catalogListContainer.innerHTML = Page.createCatalogTemplate(
          catalog.restaurants,
        );
      }
    };
  }
}

export default Page;
