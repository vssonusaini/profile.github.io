let canves = document.getElementById("qr");
let inputVal = document.getElementById("inputVal");
let loader = document.getElementById("loader");
let year = (document.getElementById("year").innerHTML = new Date().getFullYear());

let clearBtn = document.getElementById("clearBtn");
let makeBtn = document.getElementById("makeBtn");
let autoClaerBtn = document.getElementById("autoClaerBtn");

let setting = {
  autoClear: false,
  qrSet: {
    text: inputVal.value,
    fill: "#000",
    rounded: 100,
  },
};

// qrcode generator function
const QRgenerator = (o, c) => {
  var el = kjua(o);
  Array.prototype.forEach.call(canves.childNodes, (child) => {
    canves.removeChild(child);
  });
  c.appendChild(el);
};

// make qr code function
const makeCode = () => {
  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    setting.qrSet.text = inputVal.value;
    QRgenerator(setting.qrSet, canves);
    if (setting.autoClear) {
      inputVal.value = null;
    }
  }, 200);
};

// ----coll function block
QRgenerator(setting.qrSet, canves);

//-----events block
//
// clear button
clearBtn.addEventListener("click", () => {
  inputVal.value = null;
  makeCode();
});

// make button
makeBtn.addEventListener("click", (event) => {
  makeCode();
});

// auto Claer Button
autoClaerBtn.addEventListener("click", (e) => {
  if (autoClaerBtn.checked == true) {
    setting.autoClear = true;
  } else {
    setting.autoClear = false;
  }
});

// key up event
inputVal.addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.keyCode === 27) {
    makeCode();
  }
});

window.addEventListener("offline", (event) => {
  document.getElementById("status").style.display = "block";
});

window.addEventListener("online", (event) => {
  document.getElementById("status").style.display = "none";
});
