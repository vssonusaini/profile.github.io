function function_refresh() {
  // --------Time & Date
  var x = new Date();
  var ampm = x.getHours() >= 12 ? " PM" : " AM";
  hours = x.getHours() % 12;
  hours = hours ? hours : 12;
  var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
  x1 = x1 + " - " + hours + ":" + x.getMinutes() + ":" + x.getSeconds() + ":" + ampm;
  document.querySelector(".time").innerHTML = "Today: " + x1;

  // ---------Show -- battery
  navigator.getBattery().then(function (battery) {
    if (battery.charging) {
      document.querySelector(".battery").innerHTML = "Battery level: " + battery.level * 100 + "%" + " Charging";
    } else {
      document.querySelector(".battery").innerHTML = "Battery level: " + battery.level * 100 + "%";
    }
  });

  // internet connectivity
  if (navigator.onLine) {
    document.querySelector(".status").textContent = "Status: Online";
    connectivity = "online";
  } else {
    document.querySelector(".status").textContent = "Status: Offline";
    connectivity = "offline";
  }
  window.requestAnimationFrame(function_refresh);
}
window.requestAnimationFrame(function_refresh);

// -------Device About
function Device_about() {
  const browser = new window.BrowserDtector(window.navigator.userAgent); // or new BrowserDtector()
  // console.log(browser.getBrowserInfo());
  var app = browser.getBrowserInfo();
  const name = app.name;
  const platform = app.platform;
  const userAgent = app.userAgent;
  var show = (document.querySelector(".deivce_about").innerHTML = `Deivce: ${name}, ${platform}`);
}
Device_about();
