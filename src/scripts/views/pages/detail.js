import UrlParser from '../../routes/url-parser';
import Api from '../../utils/api';

const fetchDetail = async (id) => {
  const response = await Api.fetch({
    url: `https://restaurant-api.dicoding.dev/detail/${id}`,
    cache: 'cache',
  });

  console.log('responseJson', response);
  return response;
};

class Detail {
  constructor(content) {
    this.content = content;
    this.data = {
      restaurant: {},
    };
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
          resolve(restaurantStore.result);
        };
        r.onerror = () => {
          reject(new Error('Restaurant not found'));
        };
      });

      if (restaurantData) {
        this.data.restaurant = restaurantData;
        this.render();
      }

      this.data = await fetchDetail(parsedUrl.id);

      if (!restaurantData) {
        db.transaction('restaurantsDetail', 'readwrite').objectStore('restaurantsDetail').put(this.data.restaurant);
      }

      this.render();
    };
  }

  render() {
    this.content.innerHTML = `
      <main class="main">
        
        <div class="detail__header">
          <section><img src="https://restaurant-api.dicoding.dev/images/large/${
  this.data.restaurant.pictureId
}" /> </section>
          <section id="detail">
            <h2>${this.data.restaurant.name}</h2>
            <dl>
              <dt>🏢 City</dt>
              <dd>${this.data.restaurant.city}</dd>
              <dt>📌 Address</dt>
              <dd>${this.data.restaurant.address}</dd>
              <dt>⭐ Rating</dt>
              <dd>${this.data.restaurant.rating}</dd>
              <dt>📚 Categories</dt>
              <dd>${this.data.restaurant.categories
    .map((item) => item.name)
    .join(', ')}</dd>
              <dt>🔍 Description</dt>
              <dd>${this.data.restaurant.description}</dd>
            
            <dl/>


            
            
            
          </section>
        </div>
        <section id="menu" class="menu">
        <h2>📖 Menu</h2>
        <hr/>
        <div class="menu__list">
        <h3>🍴 Food</h3>
        <ul>
          ${this.data.restaurant.menus.foods
    .map((item) => `<li>${item.name}</li>`)
    .join('')}
        </ul>


        <h3>🍹 Drink</h3>
        <ul>
          ${this.data.restaurant.menus.drinks
    .map((item) => `<li>${item.name}</li>`)
    .join('')}
        </ul>
        </div>
</section>
        <section id="review">
        <h2>Review</h2>
        <div class="review__list">
        ${this.data.restaurant.customerReviews
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
  }

  // async beforeRender() {
  //   // Fungsi ini akan dipanggil sebelum render()
  //   const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();

  //   this.data = await fetchDetail(parsedUrl.id);
  // }
}

export default Detail;
