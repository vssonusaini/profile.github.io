// ----------history_toggle-------
function toggle_btn() {
  var container = document.getElementById("container");
  var history = document.getElementById("history");
  container.classList.toggle("container_toggle");
  history.classList.toggle("history_toggle");
}
//   -------------
// -------------------------
function change() {
  var select_value = document.getElementById("barcode_data").value;
  localStorage.setItem("select_value", select_value);
  show();
}
function show() {
  var a = localStorage.getItem("select_value");
  document.getElementById("barcode_data").value = a;
  console.log(a);
  if (a == "qrcode") {
    document.getElementById("qrcode").style.display = "block";
    document.getElementById("barcodea").style.display = "none";
    document.getElementById("logo").innerText = "Qr.";
    document.getElementById("work").innerText = "Qr Code";
  }
  if (a == "barcodea") {
    document.getElementById("barcodea").style.display = "block";
    document.getElementById("qrcode").style.display = "none";
    document.getElementById("logo").innerText = "Br.";
    document.getElementById("work").innerText = "BarCode";
  }
}
// --------------------------
// --------------------------
const themeButton = document.getElementById("theme-button");
console.log(themeButton);
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun");
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
// ----------------
var Notes = JSON.parse(localStorage.getItem("Notes"));
if (Notes === null) {
  Notes = [];
  Notes = [
    {
      id: 0,
      Note_title: "Sonu SAini",
      date_D: "17-9",
    },
  ];
  localStorage.setItem("Notes", JSON.stringify(Notes));
}

var idupnote = JSON.parse(localStorage.getItem("idupnote"));
if (idupnote === null) {
  idupnote = [];
  var idupnote = 1;
  localStorage.setItem("idupnote", JSON.stringify(idupnote));
}

function AddNote() {
  var id = idupnote;
  var Note_title = document.getElementById("data").value;

  // ----------
  localStorage.setItem("qrcode_value", Note_title);
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;

  var date_D = +day + "-" + month;

  if (Note_title != "" && date != "") {
    var pushFood = { id, Note_title, date_D };
    Notes.push(pushFood);
    localStorage.setItem("Notes", JSON.stringify(Notes));
    idupnote++;
    localStorage.setItem("idupnote", JSON.stringify(idupnote));

    var Note_title = (document.getElementById("data").value = "");
  } else {
    alert("Enter Plasea");
  }
  Noteprinf();
  make_qrcode();
}

function Noteprinf() {
  document.getElementById("history_list").innerHTML = "";
  var Notes = JSON.parse(localStorage.getItem("Notes"));
  for (let i = 0; i < Notes.length; i++) {
    var Note_list =
      ` <li>
    <a href="#"  onclick="viwo(` +
      Notes[i].id +
      `)"
      ><div class="type_data">` +
      Notes[i].Note_title +
      `</div>
      <div class="left_side">
        <div class="date"><span>` +
      Notes[i].date_D +
      `</span></div>
        <div class="icons"><i class="bx bxs-edit"></i><i class="bx bxs-trash"  onclick="DeleteNote(` +
      Notes[i].id +
      `)"></i></div>
      </div>
    </a>
  </li>`;
    document.getElementById("history_list").innerHTML += Note_list;
  }
}

function DeleteNote(id) {
  for (var i = 0; i < Notes.length; i++) {
    if (id == Notes[i].id) {
      Notes.splice(i, 1);

      localStorage.setItem("Notes", JSON.stringify(Notes));
      Noteprinf();
    }
  }
}
function viwo(id) {
  for (var i = 0; i < Notes.length; i++) {
    if (id == Notes[i].id) {
      console.log(Notes[i].Note_title);
      localStorage.setItem("qrcode_value", Notes[i].Note_title);
      make_qrcode();
    }
  }
}

var qrcode = new QRCode(document.getElementById("qrcode"), {
  correctLevel: QRCode.CorrectLevel.H,
});

function make_qrcode() {
  var qrcode_value = localStorage.getItem("qrcode_value");
  document.getElementById("display_code_value").innerText = qrcode_value;
  qrcode.makeCode(qrcode_value);
  JsBarcode("#barcode", qrcode_value, {
    width: 2,
    height: 220,
    displayValue: false,
  });
}
make_qrcode();
Noteprinf();
show();
