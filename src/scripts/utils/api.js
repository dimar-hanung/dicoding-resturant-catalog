export default class Api {
  static async fetch({
    url,
    method = 'GET',
    body = null,
    cacheKey = [],
    onComplete = () => true,
  }) {
    // if (cacheKey.length > 0) {
    //   const openRequest = await indexedDB.open('dapurKota', 1);
    //   const cache = {};
    //   openRequest.onsuccess = async (event) => {
    //     const db = event.target.result;
    //     const transaction = db.transaction('restaurants', 'readonly');
    //     const store = transaction.objectStore('restaurants');

    //     const data = await Promise.all(
    //       cacheKey.map(
    //         (key) =>
    //           new Promise((resolve) => {
    //             const r = store.getAll();

    //             r.onsuccess = () => {
    //               cache[key] = r.result;
    //               resolve(r.result);
    //             };

    //             r.onerror = (error) => {
    //               console.error('Error getting data from indexedDB:', error);
    //               resolve(null);
    //             };
    //           })
    //       )
    //     );
    //     // console.log('data', data);
    //     console.log('datax', cache);
    //     // data.forEach((item, i) => {
    //     //   item.onsuccess = () => {
    //     //     console.log('item', item.result);
    //     //     cache[cacheKey[i]] = item.result;
    //     //     console.log('cache', cache);
    //     //   };
    //     // });
    //     // onComplete(cache);

    //     // data.onsuccess = () => {
    //     //   if (data.result.length > 0) {
    //     //     onComplete(data.result);
    //     //     return data.result;
    //     //   }
    //     // };

    //     data.onerror = () => {
    //       console.error('Error getting data from database:', data.error);
    //     };

    //     db.close();
    //   };
    // }

    const data = await fetch(url, {
      method,
      body,
    }).then((response) => response.json());
    console.log('cachekey', cacheKey);
    if (cacheKey.length > 0) {
      console.log('step 2');
      const openRequest = indexedDB.open('dapurKota', 1);
      console.log('step 3');
      openRequest.onupgradeneeded = (event) => {
        console.log('step 4');
        const db = event.target.result;
        console.log('db', db);
        for (let i = 0; i < cacheKey.length; i++) {
          if (!db.objectStoreNames.contains(cacheKey[i])) {
            // db.createObjectStore('myObjectStore');
            db.createObjectStore(cacheKey[i]);
          }
        }

        // const objectStore = db.createObjectStore('restaurant', { keyPath: 'id' });
      };
      // Handling database opening success
      // openRequest.onsuccess = async (event) => {
      //   const db = event.target.result;
      //   for (let i = 0; i < cacheKey.length; i++) {
      //     console.log('transactiona', data);
      //     console.log(
      //       'transaction',
      //       // Api.resolve(data, cacheKey[i])
      //       cacheKey[i]
      //     );
      //     const transaction = db.transaction(cacheKey[i], 'readwrite');
      //     console.log('transaction v', transaction);
      //     const store = transaction.objectStore(cacheKey[i]);

      //     // Adding data array to the object store
      //     const x = Api.resolve(data, cacheKey[i]);
      //     x.forEach((item) => {
      //       store.add(item);
      //     });
      //     console.log('x', x);

      //     // Close the database when the transaction is complete
      //     transaction.oncomplete = () => {
      //       db.close();
      //     };
      //   }
      // };

      // Handling database opening errors
      openRequest.onerror = (event) => {
        console.error('Error opening database:', event.target.errorCode);
      };
    }

    //   const openRequest = indexedDB.open('restaurant', 1);

    // Handling database upgrade (creating object store)

    // onComplete(data);
    return data;
  }

  // array & object string path resolver
  static resolve(obj, path) {
    const pathSegments = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');

    let result = obj;
    // eslint-disable-next-line no-restricted-syntax
    for (const segment of pathSegments) {
      if (result === undefined || result === null) {
        return undefined;
      }

      result = result[segment];
    }

    return result;
  }
}
