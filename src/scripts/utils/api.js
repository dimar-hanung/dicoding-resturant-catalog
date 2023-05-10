export default class Api {
  static async fetch({
    url,
    method = 'GET',
    body = null,

  }) {
    const data = await fetch(url, {
      method,
      body,
    }).then((response) => response.json());

    return data;
  }
}
