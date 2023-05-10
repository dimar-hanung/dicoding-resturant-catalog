class Page {
  constructor(content) {
    this.content = content;
    this.restaurants = [];
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

              <button catalog-id="${catalog.id}" class="delete__favorite">Delete Favorite</button>

            </div>
          `,
    )
    .join('')}
    `;
  }

  getFavorites() {
    // get favorites from indexedDB
    const openRequest = indexedDB.open('dapurKota', 1);
    openRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const restaurants = db.transaction('restaurantsDetail', 'readwrite');
      const restaurantStore = restaurants.objectStore('restaurantsDetail');

      await new Promise((resolve, reject) => {
        const r = restaurantStore.getAll();
        r.onsuccess = () => {
          resolve(r.result);
          this.restaurants = r.result.filter((restaurant) => restaurant.isFavorite);
          this.render();
        };
        r.onerror = () => {
          reject(new Error('Restaurant not found'));
        };
      });
    };
  }

  async init() {
    this.getFavorites();
  }

  async render() {
    this.content.innerHTML = `<main id="catalogListContainer" class="main">${Page.createCatalogTemplate(this.restaurants)}</main>`;
    // add event listener to delete favorite button
    const deleteFavoriteButtons = document.querySelectorAll('.delete__favorite');
    // add listener and delete favorite by catalog-id attribute
    deleteFavoriteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const catalogId = event.target.getAttribute('catalog-id');
        // delete favorite from indexedDB
        const openRequest = indexedDB.open('dapurKota', 1);
        openRequest.onsuccess = async (e) => {
          const db = e.target.result;
          const restaurants = db.transaction('restaurantsDetail', 'readwrite');
          const restaurantStore = restaurants.objectStore('restaurantsDetail');

          await new Promise((resolve, reject) => {
            const r = restaurantStore.delete(catalogId);
            r.onsuccess = () => {
              resolve(r.result);
              this.getFavorites();
            };
            r.onerror = () => {
              reject(new Error('Restaurant not found'));
            };
          });
        };
      });
    });
  }
}

export default Page;
