let newWorker;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./html/barcode/demo/ServiceWorker.js").then((reg) => {
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
