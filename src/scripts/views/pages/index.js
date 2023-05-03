import Api from '../../utils/api';

const fetchCatalog = async () => {
  const response = await Api.fetch({
    url: 'https://restaurant-api.dicoding.dev/list',
    cache: 'cache',
    cacheKey: [
      'restaurants',
    ],
    onComplete: (data) => {
      console.log('data', data);
    },
  });

  return response;
};

function createCatalogTemplate(catalogs) {
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

                <button
                  aria-label="Add ${catalog.name} to favorite"
                  class="catalog__bookmark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0,0,256,256"
                    width="44px"
                    height="44px"
                    fill-rule="nonzero"
                  >
                    <g
                      class="catalog__bookmark__stroke"
                      fill-rule="nonzero"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="butt"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path
                        transform="scale(5.12,5.12)"
                        d="M37,48c-0.17578,0 -0.34766,-0.04687 -0.50391,-0.13672l-11.49609,-6.70703l-11.49609,6.70703c-0.30859,0.17969 -0.69141,0.18359 -1,0.00391c-0.3125,-0.17969 -0.50391,-0.50781 -0.50391,-0.86719v-44c0,-0.55078 0.44922,-1 1,-1h24c0.55469,0 1,0.44922 1,1v44c0,0.35938 -0.19141,0.6875 -0.50391,0.86719c-0.15234,0.08984 -0.32422,0.13281 -0.49609,0.13281z"
                        id="strokeMainSVG"
                      ></path>
                    </g>
                    <g
                      class="catalog__bookmark__fill"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path
                          d="M37,48c-0.17578,0 -0.34766,-0.04687 -0.50391,-0.13672l-11.49609,-6.70703l-11.49609,6.70703c-0.30859,0.17969 -0.69141,0.18359 -1,0.00391c-0.3125,-0.17969 -0.50391,-0.50781 -0.50391,-0.86719v-44c0,-0.55078 0.44922,-1 1,-1h24c0.55469,0 1,0.44922 1,1v44c0,0.35938 -0.19141,0.6875 -0.50391,0.86719c-0.15234,0.08984 -0.32422,0.13281 -0.49609,0.13281z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
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

class Detail {
  constructor(content) {
    this.content = content;
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
    <main id="catalogListContainer" class="main">Main Page</main>`;

    const catalogListContainer = document.getElementById('catalogListContainer');
    const catalog = await fetchCatalog();
    // console.log(catalog.restaurants);
    catalogListContainer.innerHTML = createCatalogTemplate(catalog.restaurants);
  }
}

export default Detail;
