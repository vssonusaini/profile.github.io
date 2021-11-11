import * as Snow from "./snow.js";
let glass = document.getElementById("glass");
let blur_ctrl = document.getElementById("blur");
let blur_val = document.getElementById("blur_value");
let transparency_ctrl = document.getElementById("transparency");
let transparency_val = document.getElementById("transparency_value");
let code = document.getElementById("code");
let preview = document.getElementById("preview");

let setting = {
  blur: "0px",
  transparency: "0px",
};

controls(setting);

function controls(setting) {
  blur_ctrl.addEventListener("input", () => {
    setting.blur = blur_ctrl.value / 5 + "px";
    update();
  });
  transparency_ctrl.addEventListener("input", () => {
    setting.transparency = transparency_ctrl.value / 100;
    update();
  });
}

function update() {
  blur_val.innerText = setting.blur;
  transparency_val.innerText = setting.transparency;
  glass.style.backdropFilter = `blur(${setting.blur})`;
  glass.style.background = `rgba(255 , 255 , 255 , ${setting.transparency})`;

  code.innerText = getCssText();
}

function getCssText() {
  return `background: rgba(255, 255, 255, ${setting.transparency});\n backdrop-filter: blur(${setting.blur}); \n -webkit-backdrop-filter: blur(${setting.blur});`;
}

window.onload = function () {
  //create new snow
  var snow = new Snow.default({
    id: "snow",
    theme: "colors",
    min_size: 1,
    max_size: 5,
  });
  snow.start();

  document.getElementById("bg-theme").addEventListener("change", app);
  function app() {
    var select = document.getElementById("bg-theme");
    var option = select.options[select.selectedIndex];

    console.log(option.value);
    preview.style.backgroundImage = `url(../image/${option.value})`;
  }
  app();
  code.innerText = getCssText();
};
