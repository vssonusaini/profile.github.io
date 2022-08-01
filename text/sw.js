const CACHE_NAME = "V5";
const STATIC_CACHE_URLS = ["/", "./index.html", "/app.js"];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_URLS)));
});

self.addEventListener("fetch", (event) => {
  // Stratégie Cache-First
  event.respondWith(
    caches
      .match(event.request) // On vérifie si la requête a déjà été mise en cache
      .then((cached) => cached || fetch(event.request)) // sinon on requête le réseau
      .then(
        (response) =>
          cache(event.request, response) // on met à jour le cache
            .then(() => response) // et on résout la promesse avec l'objet Response
      )
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

function cache(request, response) {
  if (response.type === "error" || response.type === "opaque") {
    return Promise.resolve(); // do not put in cache network errors
  }

  return caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
}

// installs;
