"use strict";

let canves = document.getElementById("qr");
let inputVal = document.getElementById("inputVal");
let loader = document.getElementById("loader");
let year = (document.getElementById("year").innerHTML = new Date().getFullYear());

let clearBtn = document.getElementById("clearBtn");
let makeBtn = document.getElementById("makeBtn");
let autoClaerBtn = document.getElementById("autoClaerBtn");
let rangeBtn = document.getElementById("blurTheme");

let theme_list = document.getElementById("theme_list-block");

let wallpaper = ["back", "https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/952/536/1006/winter-4k-pc-desktop-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/297/288/1009/5bd320d590bcf-wallpaper-preview.jpg", "https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/05.jpg?3"];

// loacl host
var setting = JSON.parse(localStorage.getItem("setting"));
if (setting === null) {
  setting = [];
  var setting = {
    theme: {
      id: "0",
      src: "",
      blur: "",
    },
    autoClear: false,
    qrSet: {
      text: inputVal.value,
      fill: "#000",
      rounded: 100,
    },
  };
  localStorage.setItem("setting", JSON.stringify(setting));
}

// print  THEME Function Start
for (var i = 0; i < wallpaper.length; i++) {
  var html = `
        <div class="grid_items"  style="background-image: url(${wallpaper[i]})">
          <label for="list_${i}">
            <input type="radio" name="radio" id="list_${i}" onclick="themeSet(${i})" />
          </label>
       
        </div>`;

  theme_list.innerHTML += html;
}

// qr code function
const QRgenerator = (o, c) => {
  var el = kjua(o);
  Array.prototype.forEach.call(canves.childNodes, (child) => {
    canves.removeChild(child);
  });
  c.appendChild(el);
};

// make function
const sutup = () => {
  let host_setting = JSON.parse(localStorage.getItem("setting"));

  host_setting.qrSet.text = inputVal.value;

  if (autoClaerBtn.checked == true) {
    host_setting.autoClear = true;
    autoClaerBtn.getAttribute("checked");
  } else {
    host_setting.autoClear = false;
  }

  localStorage.setItem("setting", JSON.stringify(host_setting));

  // coll to reload
  onLoad();
};

// DOMContentLoaded function
const onLoad = () => {
  let host_setting = JSON.parse(localStorage.getItem("setting"));

  loader.style.display = "flex"; //loader
  setTimeout(() => {
    loader.style.display = "none"; //loader

    QRgenerator(host_setting.qrSet, canves);

    if (host_setting.autoClear) {
      inputVal.value = null;
      autoClaerBtn.setAttribute("checked", "");
    }
  }, 200);

  //   THEME Function start
  document.body.style.backgroundImage = `url(` + host_setting.theme.src + `)`;
  document.getElementById(`list_` + host_setting.theme.id + ``).setAttribute("checked", "");

  document.getElementById("background-image").setAttribute("style", `backdrop-filter: blur(${host_setting.theme.blur}px)`);
  rangeBtn.value = host_setting.theme.blur;
  document.getElementById("blurVal").innerHTML = host_setting.theme.blur;
};

// set theme function
const themeSet = (a) => {
  let host_setting = JSON.parse(localStorage.getItem("setting"));
  host_setting.theme.src = wallpaper[a];
  host_setting.theme.id = a;
  localStorage.setItem("setting", JSON.stringify(host_setting));
  onLoad();
};

// key down Handler
var keydownHandler = (event) => {
  if (event.key === "Enter" || event.keyCode === 27) {
    sutup();
  }
};

// Evensts
clearBtn.addEventListener("click", () => {
  let host_setting = JSON.parse(localStorage.getItem("setting"));
  host_setting.qrSet.text = "";
  inputVal.value = "";
  localStorage.setItem("setting", JSON.stringify(host_setting));
  onLoad();
});

rangeBtn.addEventListener("change", () => {
  let host_setting = JSON.parse(localStorage.getItem("setting"));
  host_setting.theme.blur = rangeBtn.value;
  localStorage.setItem("setting", JSON.stringify(host_setting));
  onLoad();
});

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("DOMContentLoaded", onLoad);
makeBtn.addEventListener("click", sutup);
autoClaerBtn.addEventListener("click", sutup);
