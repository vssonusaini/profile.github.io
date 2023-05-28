let newWorker;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./ServiceWorker.js").then((reg) => {
    reg.addEventListener("updatefound", () => {
      newWorker = reg.installing;

      newWorker.addEventListener("statechange", () => {
        switch (newWorker.state) {
          case "installed":
            if (navigator.serviceWorker.controller) {
              let notification = document.getElementById("notification");
              notification.style.display = "block";
            }

            break;
        }
      });
    });
  });
}

// navigator.serviceWorker.getRegistrations().then(function (registrations) {
//   for (let registration of registrations) {
//     registration.unregister();
//   }
// });
// if (window.navigator && navigator.serviceWorker) {
//   navigator.serviceWorker.getRegistrations().then(function (registrations) {
//     for (let registration of registrations) {
//       registration.unregister();
//     }
//   });
// }

// if ("caches" in window) {
//   caches.keys().then(function (keyList) {
//     return Promise.all(
//       keyList.map(function (key) {
//         return caches.delete(key);
//       })
//     );
//   });
// }
