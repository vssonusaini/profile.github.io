const staticCacheName = "site-static-v0.4";
const assets = ["/"];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        0;
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching assets");
      cache.addAll(assets);
    })
  );
});

//Gera o CACHE dos arquivos estáticos
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Ativando...");

  evt.waitUntil(
    caches.keys().then((keylist) => {
      return Promise.all(
        keylist.map((key) => {
          //console.log('[ServiceWorker] Removendo cache antigo...');
          if (key !== staticCacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// fetch event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(staticCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              // limitCacheSize(staticCacheName, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
