const CACHE_NAME = "0.2v";
const STATIC_CACHE_URLS = ["/", "./index.html", "./js/app.js", "./js/ui.js", "./css/styles.css"];

// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(STATIC_CACHE_URLS);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
});

// fetch event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
});
