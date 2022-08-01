if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((serviceWorker) => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch((error) => {
      console.error("Error registering the Service Worker: ", error);
    });
}

function registerNotification() {
  Notification.requestPermission((permission) => {
    if (permission === "granted") {
      registerBackgroundSync();
    } else console.error("Permission was not granted.");
  });
}

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error("Service Worker not supported");
  }

  navigator.serviceWorker.ready
    .then((registration) => registration.sync.register("syncAttendees"))
    .then(() => console.log("Registered background sync"))
    .catch((err) => console.error("Error registering background sync", err));
}
self.addEventListener("sync", function (event) {
  console.log("sync event", event);
  if (event.tag === "syncAttendees") {
    event.waitUntil(syncAttendees()); // on lance la requête de synchronisation
  }
});

function syncAttendees() {
  return update({ url: `https://reqres.in/api/users` })
    .then(refresh)
    .then((attendees) => self.registration.showNotification(`${attendees.length} attendees to the PWA Workshop`));
}


let deferredPrompt; // Allows to show the install prompt
const installButton = document.getElementById("install_button");

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt fired");
  // Prevent Chrome 76 and earlier from automatically showing a prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show the install button
  installButton.hidden = false;
  installButton.addEventListener("click", installApp);
});

function installApp() {
  // Show the prompt
  deferredPrompt.prompt();
  installButton.disabled = true;

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
      installButton.hidden = true;
    } else {
      console.log("PWA setup rejected");
    }
    installButton.disabled = false;
    deferredPrompt = null;
  });
}

window.addEventListener("appinstalled", (evt) => {
  console.log("appinstalled fired", evt);
});
