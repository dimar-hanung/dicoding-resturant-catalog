import UrlParser from '../../routes/url-parser';
import Api from '../../utils/api';
import '../../components/icon-favorite';

class Page {
  constructor(content) {
    this.content = content;
    this.restaurant = {};
    this.data = {
      restaurant: {},
    };
  }

  static async fetchDetail(id) {
    const response = await Api.fetch({
      url: `https://restaurant-api.dicoding.dev/detail/${id}`,
      cache: 'cache',
    });

    return response;
  }

  async init() {
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
    const openRequest = indexedDB.open('dapurKota', 1);

    openRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const restaurants = db.transaction('restaurantsDetail', 'readwrite');
      const restaurantStore = restaurants.objectStore('restaurantsDetail');

      const restaurantData = await new Promise((resolve, reject) => {
        const r = restaurantStore.get(parsedUrl.id);
        r.onsuccess = () => {
          resolve(r.result);
        };
        r.onerror = () => {
          reject(new Error('Restaurant not found'));
        };
      });

      if (restaurantData) {
        this.restaurant = { ...restaurantData, isFavorite: restaurantData?.isFavorite };

        this.render();
      }

      this.restaurant = await Page.fetchDetail(parsedUrl.id).then((res) => res.restaurant);

      if (this.data) {
        db.transaction('restaurantsDetail', 'readwrite')
          .objectStore('restaurantsDetail')
          .put({ ...this.restaurant, isFavorite: restaurantData?.isFavorite });
        this.restaurant.isFavorite = restaurantData?.isFavorite;
      }

      this.render();
    };
  }

  render() {
    this.content.innerHTML = `
      <main class="main">
        <div class="detail__header">
          <section><img src="https://restaurant-api.dicoding.dev/images/large/${
  this.restaurant.pictureId
}" /> </section>
          <section id="detail">
            <header class="flex w-full justify-between">
              <h2>${this.restaurant.name}</h2>
              <icon-favorite is-favorite="${this.restaurant?.isFavorite}"></icon-favorite>
            </header>
            <dl>
              <dt>🏢 City</dt>
              <dd>${this.restaurant.city}</dd>
              <dt>📌 Address</dt>
              <dd>${this.restaurant.address}</dd>
              <dt>⭐ Rating</dt>
              <dd>${this.restaurant.rating}</dd>
              <dt>📚 Categories</dt>
              <dd>${this.restaurant.categories
    .map((item) => item.name)
    .join(', ')}</dd>
              <dt>🔍 Description</dt>
              <dd>${this.restaurant.description}</dd>
            <dl/>
          </section>
        </div>
        <section id="menu" class="menu">
        <h2>📖 Menu</h2>
        <hr/>
        <div class="menu__list">
        <h3>🍴 Food</h3>
        <ul>
          ${this.restaurant.menus.foods
    .map((item) => `<li>${item.name}</li>`)
    .join('')}
        </ul>


        <h3>🍹 Drink</h3>
        <ul>
          ${this.restaurant.menus.drinks
    .map((item) => `<li>${item.name}</li>`)
    .join('')}
        </ul>
        </div>
</section>
        <section id="review">
        <h2>Review</h2>
        <div class="review__list">
        ${this.restaurant.customerReviews
    .map(
      (item) => `
          <div class="review__item">
            <div class="review__item__header">
              <p>${item.name}</p>
              <p>${item.date}</p>
            </div>
            <p>${item.review}</p>
          </div>
        `,
    )
    .join('')}
        </div>
        </section>
      </main>
    `;

    const favoriteButton = document.querySelector('icon-favorite');
    favoriteButton.addEventListener('click', async () => {
      // set isFavorite to true in indexedDB by id
      // get id from url and set isFavorite to true
      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      const openRequest = indexedDB.open('dapurKota', 1);
      openRequest.onsuccess = async (event) => {
        const db = event.target.result;
        const restaurants = db.transaction('restaurantsDetail', 'readwrite');
        const restaurantStore = restaurants.objectStore('restaurantsDetail');
        const restaurantData = await new Promise((resolve, reject) => {
          const r = restaurantStore.get(parsedUrl.id);
          r.onsuccess = () => {
            resolve(r.result);
          };
          r.onerror = () => {
            reject(new Error('Restaurant not found'));
          };
        });

        if (restaurantData) {
          restaurantData.isFavorite = !restaurantData.isFavorite;
        }
        if (restaurantData?.isFavorite) {
          favoriteButton.setAttribute('is-favorite', true);
        } else {
          favoriteButton.setAttribute('is-favorite', false);
        }

        db.transaction('restaurantsDetail', 'readwrite')
          .objectStore('restaurantsDetail')
          .put(restaurantData);
      };
    });
  }
}

export default Page;
