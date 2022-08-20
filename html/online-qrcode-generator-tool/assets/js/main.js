let newWorker;

document.getElementById("reload").addEventListener("click", function () {
  newWorker.postMessage({ action: "skipWaiting" });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/html/online-qrcode-generator-tool/sw.js").then((reg) => {
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
let refreshing;

navigator.serviceWorker.addEventListener("controllerchange", function () {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});

$(function () {
  function runEffect() {
    $(".setting_block").toggle("slide", 100);
  }

  $(".setting_btn").on("click", function () {
    runEffect();
  });
});
