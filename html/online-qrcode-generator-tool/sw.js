console.log("Index Service Worker Run");

let cacheVer = "qrcode_generator_0.1v";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheVer).then((cache) => {
      cache.addAll(["index.html", "/js/qrcode.min.js", "https://sainisahab.com/html/fake-twitter-image-generator/js/html2canvas.min.js", "/js/barcode.js", "/js/main.js", "/css/style.css", "/css/root.css", "/sw.js"]);
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
