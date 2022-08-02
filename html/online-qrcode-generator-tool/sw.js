const CACHE_NAME = "v0.4";
cache_file = ["/index.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(cache_file);
    })
  );
});

self.addEventListener("activate", (event) => {
  // delete any unexpected caches
  event.waitUntil(
    caches
      .keys()
      .then((keys) => keys.filter((key) => key !== CACHE_NAME))
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            console.log(`Deleting cache ${key}, New Cache ${CACHE_NAME} `);
            return caches.delete(key);
          })
        )
      )
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (response) {
            // response may be used only once
            // we need to save clone to put one copy in cache
            // and serve second one
            let responseClone = response.clone();

            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function () {
            return caches.match("/html/online-qrcode-generator-tool.jpg");
          });
      }
    })
  );
});
