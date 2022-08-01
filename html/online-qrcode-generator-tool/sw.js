console.log("Index Service Worker Run");

let cacheVer = "qrcode_generator_0.1v";
let root = "https://sainisahab.com/html/fake-twitter-image-generator";
cache_file = [
  `${root}https://sainisahab.com/html/fake-twitter-image-generator/index.html`, 
  `${root}/js/qrcode.min.js`,
  `${root}/js/html2canvas.min.js`, 
  `${root}/js/barcode.js`, 
  `${root}/js/main.js`, 
  `${root}/css/style.css`, 
  `${root}/css/root.css`, 
  `${root}/sw.js`
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheVer).then((cache) => {
      cache.addAll(cache_file);
    })
  );
});

this.addEventListener("fetch", (event) => {
  // chack online
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) {
          return result;
        }
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
