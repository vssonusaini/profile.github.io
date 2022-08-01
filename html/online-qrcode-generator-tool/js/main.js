// ----------Dark theme btn
const themeButton = document.getElementById("theme-button");

const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "bx-toggle-right" : "bx-toggle-left");
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "bx-toggle-right" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
// -----------------clear function
document.getElementById("clear").addEventListener("click", () => {
  localStorage.setItem("Qr_title", "Scan Me");
  make_qrcode();
});

// ----------Setting
const inputButton = document.getElementById("input-Button");

const darkinput = "dark-theme";
const iconinput = "bx-toggle-right";

const selectedinput = localStorage.getItem("selected-input");
const selectedinputIcon = localStorage.getItem("selected-input-icon");
const getCurrentinput = () => (document.body.classList.contains(darkinput) ? "on" : "off");
const getCurrentinputIcon = () => (inputButton.classList.contains(iconinput) ? "bx-toggle-right" : "bx-toggle-left");
if (selectedTheme) {
  document.body.classList[selectedTheme === "on" ? "add" : "remove"](darkinput);
  inputButton.classList[selectedinputIcon === "bx-toggle-right" ? "add" : "remove"](iconinput);
}

inputButton.addEventListener("click", () => {
  // document.body.classList.toggle(darkinput);
  inputButton.classList.toggle(iconinput);
  localStorage.setItem("selected-input", getCurrentinput());
  localStorage.setItem("selected-input-icon", getCurrentinputIcon());
});

// ----------------------select Box-------------
// -------------------------
localStorage.setItem("select_value", "qr_preview");
function secter() {
  var select_value = document.getElementById("selecter").value;
  localStorage.setItem("select_value", select_value);
  show();
}
function show() {
  var a = localStorage.getItem("select_value");
  document.getElementById("selecter").value = a;
  console.log(a);
  if (a == "qr_preview") {
    document.getElementById("Qr_title").setAttribute("placeholder", "Make Qr Code Click Me");
    document.getElementById("qr_preview").style.display = "flex";
    document.getElementById("bar_preview").style.display = "none";
    document.getElementById("logo").innerText = "Qr.";
    // document.getElementById("work").innerText = "Qr Code";
  }
  if (a == "bar_preview") {
    document.getElementById("Qr_title").setAttribute("placeholder", "Make Bar Code Click Me");
    document.getElementById("qr_preview").style.display = "none";
    document.getElementById("bar_preview").style.display = "flex";
    document.getElementById("logo").innerText = "Bar.";
  }
}

show();

// ----------------------Make Qr & Bar Code ------------------
// ----------------
var History_DB = JSON.parse(localStorage.getItem("Notes"));
if (History_DB === null) {
  History_DB = [];
  History_DB = [
    {
      id: 0,
      Note_title: "Sonu Saini",
      date_D: "17-9",
    },
  ];
  localStorage.setItem("History_DB", JSON.stringify(History_DB));
}

var History_DB_Id = JSON.parse(localStorage.getItem("History_DB_Id"));
if (History_DB_Id === null) {
  History_DB_Id = [];
  var History_DB_Id = 0;
  localStorage.setItem("History_DB_Id", JSON.stringify(History_DB_Id));
}

function code_value() {
  var id = History_DB_Id;
  var Qr_title = document.getElementById("Qr_title").value;
  localStorage.setItem("Qr_title", Qr_title);

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var date_D = +day + "-" + month;

  if (Qr_title != "" && date != "") {
    var pushHistory_DB = { id, Qr_title, date_D };
    History_DB.push(pushHistory_DB);
    localStorage.setItem("History_DB", JSON.stringify(History_DB));
    History_DB_Id++;
    localStorage.setItem("History_DB_Id", JSON.stringify(History_DB_Id));

    var Qr_title = (document.getElementById("Qr_title").value = "");
  } else {
    alert("Enter Plasea");
  }
  make_qrcode();
}
var qrcode = new QRCode(document.getElementById("code_preview"), {
  correctLevel: QRCode.CorrectLevel.H,
});

function make_qrcode() {
  var qrcode_value = localStorage.getItem("Qr_title");
  document.getElementById("display_value").innerText = qrcode_value;
  var input_check = localStorage.getItem("selected-input-icon");
  if (input_check != "bx-toggle-right") {
    document.getElementById("Qr_title").value = qrcode_value;
  } else {
    document.getElementById("Qr_title").value = " ";
  }
  qrcode.makeCode(qrcode_value);
  JsBarcode("#barcode", qrcode_value, {
    width: 2,
    height: 220,
    displayValue: false,
  });
}
make_qrcode();

// -----------------------------------Download code-------------
// Generate filenames for the image which is to be downloaded
// Capturing Download button
const download = document.getElementById("download");
download.addEventListener("click", takeScreenshot);

// Generate filenames for the image which is to be downloaded
function generateFileName() {
  return `code${Math.floor(Math.random() * 90000) + 10000}`;
}

// Download it to the local machine
function saveAs(uri, filename) {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

// Take screenshot of the tweet
function takeScreenshot() {
  var take = localStorage.getItem("select_value");

  window.scrollTo(0, 0);
  html2canvas(document.querySelector(`#${take}`), {
    allowTaint: true,
    useCORS: true,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), generateFileName());
  });
}

// ----------------Slider   ---------------
var drawer = function () {
  /**
   * Element.closest() polyfill
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
   */
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }

  //
  // Settings
  //
  var settings = {
    speedOpen: 50,
    speedClose: 350,
    activeClass: "is-active",
    visibleClass: "is-visible",
    selectorTarget: "[data-drawer-target]",
    selectorTrigger: "[data-drawer-trigger]",
    selectorClose: "[data-drawer-close]",
  };

  //
  // Methods
  //

  // Toggle accessibility
  var toggleccessibility = function (event) {
    if (event.getAttribute("aria-expanded") === "true") {
      event.setAttribute("aria-expanded", false);
    } else {
      event.setAttribute("aria-expanded", true);
    }
  };

  // Open Drawer
  var openDrawer = function (trigger) {
    // Find target
    var target = document.getElementById(trigger.getAttribute("aria-controls"));

    // Make it active
    target.classList.add(settings.activeClass);

    // Make body overflow hidden so it's not scrollable
    document.documentElement.style.overflow = "hidden";

    // Toggle accessibility
    toggleccessibility(trigger);

    // Make it visible
    setTimeout(function () {
      target.classList.add(settings.visibleClass);
    }, settings.speedOpen);
  };

  // Close Drawer
  var closeDrawer = function (event) {
    // Find target
    var closestParent = event.closest(settings.selectorTarget),
      childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');

    // Make it not visible
    closestParent.classList.remove(settings.visibleClass);

    // Remove body overflow hidden
    document.documentElement.style.overflow = "";

    // Toggle accessibility
    toggleccessibility(childrenTrigger);

    // Make it not active
    setTimeout(function () {
      closestParent.classList.remove(settings.activeClass);
    }, settings.speedClose);
  };

  // Click Handler
  var clickHandler = function (event) {
    // Find elements
    var toggle = event.target,
      open = toggle.closest(settings.selectorTrigger),
      close = toggle.closest(settings.selectorClose);

    // Open drawer when the open button is clicked
    if (open) {
      openDrawer(open);
    }

    // Close drawer when the close button (or overlay area) is clicked
    if (close) {
      closeDrawer(close);
    }

    // Prevent default link behavior
    if (open || close) {
      event.preventDefault();
    }
  };

  // Keydown Handler, handle Escape button
  var keydownHandler = function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      // Find all possible drawers
      var drawers = document.querySelectorAll(settings.selectorTarget),
        i;

      // Find active drawers and close them when escape is clicked
      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  //
  // Inits & Event Listeners
  //
  document.addEventListener("click", clickHandler, false);
  document.addEventListener("keydown", keydownHandler, false);
};

drawer();

const swDev = () => {
  let swUrl = "https://sainisahab.com/html/online-qrcode-generator-tool/sw.js";
  // console.log(swUrl);
  navigator.serviceWorker.register(swUrl).then((response) => {
    // console.log("Response", response);
  });
};
swDev();
