const app = () => {
  // all btn
  let makeBtn = document.getElementById("makeBtn");
  let downloadBtn = document.getElementById("download");
  let clear = document.getElementById("clear");

  // Display
  let canves = document.getElementById("canves");
  let diplay_value = document.getElementById("diplay_value");

  // input
  let inputVal = document.getElementById("inputVal");

  let database_v1 = {
    image: "img",
    input: "123123123",
    T_mode: ["light", true],
    input_setting: ["none", true],
    input_History_DB: {},
  };

  const generate = () => {
    // console.log("Generate function coll");

    var qr = {
      text: inputVal.value,
      render: "image",
      fill: "#000",
      size: 290,
    };

    diplay_value.innerHTML = qr.text;

    var el = kjua(qr);
    Array.prototype.forEach.call(canves.childNodes, (child) => {
      canves.removeChild(child);
    });
    canves.appendChild(el);
  };

  const clear_ = () => {
    inputVal.value = "";
    generate();
  };

  // coll function
  generate();

  // all events
  inputVal.addEventListener("change", generate);
  clear.addEventListener("click", clear_);
  // keydownHandler
  var keydownHandler = function (event) {
    // console.log(event);
    if (event.key === "Enter" || event.keyCode === 27) {
      generate();
    }
  };

  document.addEventListener("keydown", keydownHandler, false);

  console.log("DOMContentLoaded");
};

document.addEventListener("DOMContentLoaded", app);

let Url = document.URL + "sw.js";
console.log(Url);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(Url)
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered"));
}
