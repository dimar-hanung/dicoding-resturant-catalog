import UrlParser from '../../routes/url-parser';
import Api from '../../utils/api';

const html = (str) => str[0];

const fetchDetail = async (id) => {
  const response = await Api.fetch({
    url: `https://restaurant-api.dicoding.dev/detail/${id}`,
    cache: 'cache',
  });

  console.log('responseJson', response);
  return response;
};

const Detail = {
  data: {
    message: 'lih',
  },
  async render() {
    return `
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
        `
          )
          .join('')}
        </div>
        </section>
      </main>
    `;
  },

  async beforeRender() {
    // Fungsi ini akan dipanggil sebelum render()
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();

    this.data = await fetchDetail(parsedUrl.id);
  },

  async afterRender() {
    return true;
  },
};

export default Detail;
