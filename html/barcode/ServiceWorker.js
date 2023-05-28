// const staticDevCoffee = "dev-coffee-site-v1";
// const assets = ["/"];

// self.addEventListener("install", (installEvent) => {
//   installEvent.waitUntil(
//     caches.open(staticDevCoffee).then((cache) => {
//       cache.addAll(assets);
//     })
//   );
// });

// self.addEventListener("fetch", (fetchEvent) => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then((res) => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });

(function () {
  "use strict";

  var cacheNameStatic = "cloudinary-pwa-react-v10";

  var currentCacheNames = [cacheNameStatic];

  var cachedUrls = [
    // 3rd party CDN
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css",
    // Local assets
    "/",
  ];

  //   // A new ServiceWorker has been registered
  self.addEventListener("install", function (event) {
    console.log("Installing Service Worker");
    event.waitUntil(
      caches
        .delete(cacheNameStatic)
        .then(function () {
          console.log("Delete cache: %s", cacheNameStatic);
          return caches.open(cacheNameStatic);
        })
        .then(function (cache) {
          console.log("Cache: %s", cachedUrls);
          return cache.addAll(cachedUrls);
        })
        .catch(function (e) {})
    );
  });

  //   // A new ServiceWorker is now active
  self.addEventListener("activate", function (event) {
    console.log("Activate Service Worker");
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (currentCacheNames.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  //   // Save thing to cache in process of use
  self.addEventListener("fetch", function (event) {
    console.log("Fetch item");
    event.respondWith(
      caches.open(cacheNameStatic).then(function (cache) {
        return cache.match(event.request.url).then(function (response) {
          if (event.request.url.indexOf("/monu") > -1) {
            let urlArray = event.request.url.split("/");
            let publicId = urlArray[urlArray.length - 1];
            console.log("Grab the bigger version of %s", publicId);
            let newUrl = "./update.js" + publicId;
            fetch(newUrl).then(function (newNetworkResponse) {
              console.log("Caching larger version of %s", publicId);
              cache.put(newUrl, newNetworkResponse);
            });
          }
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          });
          if (response) {
            console.log("Use Cache Version: %s", event.request.url);
          } else {
            console.log("Use Network Version: %s", event.request.url);
          }
          return response || fetchPromise;
        });
      })
    );
  });
})();
