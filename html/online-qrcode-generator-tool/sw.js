const staticCacheName = "site-static";
const assets = ["/"];

cache_file = ["/index.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll(cache_file);
    })
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

            caches.open("v1").then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function () {
            return caches.match("/sw-test/gallery/myLittleVader.jpg");
          });
      }
    })
  );
});

// // install event
// self.addEventListener("install", (evt) => {
//     //console.log('service worker installed');
//     evt.waitUntil(
//       caches.open(staticCacheName).then((cache) => {
//         console.log("caching shell assets");
//         cache.addAll(assets);
//       })
//     );
//   });

//   // activate event
//   self.addEventListener("activate", (evt) => {
//     //console.log('service worker activated');
//   });

//   // fetch event
//   self.addEventListener("fetch", (evt) => {
//     //console.log('fetch event', evt);
//   });
