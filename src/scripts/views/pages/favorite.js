import UrlParser from '../../routes/url-parser';

const fetchDetail = async (id) => {
  // const response = await fetch(`https://api.football-data.org/v2/teams/${id}`);
  // const responseJson = await response.json();
  // return responseJson;
};

const createDetailTemplate = (detail) => `

  <div class="detail">
  ${detail}
  </div>`;

const Detail = {
  async render() {
    console.log('favorite');
    return `
            <h2>Favorite Page</h2>
          `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await fetchDetail(parsedUrl.id);

    createDetailTemplate(detail);
  },
};

export default Detail;
