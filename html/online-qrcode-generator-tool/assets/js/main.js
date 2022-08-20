// navigator.serviceWorker.register("/sw.js");

let newWorker;

// The click event on the notification
document.getElementById("reload").addEventListener("click", function () {
  newWorker.postMessage({ action: "skipWaiting" });
});

if ("serviceWorker" in navigator) {
  // Register the service worker
  navigator.serviceWorker.register("/html/online-qrcode-generator-tool/sw.js").then((reg) => {
    reg.addEventListener("updatefound", () => {
      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener("statechange", () => {
        // Has service worker state changed?
        switch (newWorker.state) {
          case "installed":
            // There is a new service worker available, show the notification
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
let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener("controllerchange", function () {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});

$(function () {
  // run the currently selected effect
  function runEffect() {
    // Run the effect
    $(".setting_block").toggle("slide", 100);
  }

  // Set effect from select menu value
  $(".setting_btn").on("click", function () {
    runEffect();
  });
});
