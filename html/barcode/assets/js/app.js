"use strict";

var barcode_db = JSON.parse(localStorage.getItem("barcode_db"));
if (barcode_db === null) {
  barcode_db = {
    input: {
      cart_type: "1",
      cart_id: "01",
      lable_count: "",
    },
    dataTable_DB: [{ Milliseconds: 1, selectCart: "Single", cart_id: "1", lable_count: "", currentDate: "12/11/2022 - 15:32", action: "" }],
  };
  localStorage.setItem("barcode_db", JSON.stringify(barcode_db));
}

// -----------------barcode lable function---------------------
const barcode_lable = (value) => {
  return `<svg class="barcode" 
  jsbarcode-format="code128" 
  jsbarcode-value="${value}"
  jsbarcode-textmargin="0" 
  jsbarcode-fontoptions="bold"></svg>`;
};

// ----------------Get User Value------------
const GetUserValue = () => {
  // define
  let cart_type = document.getElementById("cart_type").value;
  let cart_id = document.getElementById("cart_id").value;
  let lable_count = document.getElementById("lable_count").value;

  //   add dataTable
  var dt = new Date();
  var Milliseconds = dt.getMilliseconds();
  var time = dt.getHours() + ":" + dt.getMinutes();
  var date = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
  var currentDate = date + " - " + time;

  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));

  console.log(get_DB);

  if (cart_id != "") {
    get_DB.input.cart_type = cart_type;
    get_DB.input.cart_id = cart_id;
    get_DB.input.lable_count = lable_count;

    var cart = ["", "Single", "Double", "Triple"];
    var selectCart = cart[cart_type];
    var action = "";
    var lable_count_update;

    if (lable_count == "") {
      console.log("ok");
      if (cart_type == 1) {
        console.log("ok");
        // Single Cart
        lable_count_update = 12;
      } else if (cart_type == 2) {
        // Double Cart
        lable_count_update = 9;
      } else if (lable_count == 3) {
        // Triple Cart
        lable_count_update = 6;
      }
    } else {
      lable_count_update = lable_count;
    }
    // get date in database
    var pushData = { Milliseconds, selectCart, cart_id, currentDate, lable_count_update, action };
    get_DB.dataTable_DB.push(pushData);
  } else {
    alert("Pleas enterValue");
  }

  // Update data in database
  localStorage.setItem("barcode_db", JSON.stringify(get_DB));

  // call function
  Setup();
  autoFill();
  printDateTable();
};

const autoFill = () => {
  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));

  // status bar
  document.getElementById("status_bar").innerHTML = `<p>
  Cart Type: ${get_DB.input.cart_type} 
  Cart Id: ${get_DB.input.cart_id} 
  Barcode Lables: ${get_DB.input.lable_count} 
  </p>`;
  // auto fill data in database
  let cart_type = (document.getElementById("cart_type").value = get_DB.input.cart_type);
  let cart_id = (document.getElementById("cart_id").value = get_DB.input.cart_id);
  let lable_count = (document.getElementById("lable_count").value = get_DB.input.lable_count);
};

const Setup = () => {
  // define
  var i;
  var count = 2;
  var SetValue;
  var cart_position_no = 0;
  var cart_position = "R";

  // input & Output Elements
  let diplay = document.getElementById("barcode_lable_perviwe");

  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));
  let lable_count = document.getElementById("lable_count").value;
  //count if condition
  if (get_DB.input.cart_type == 1) {
    // Single Cart
    count = 12;
    SetValue = `S${get_DB.input.cart_id}`;
  } else if (get_DB.input.cart_type == 2) {
    // Double Cart
    SetValue = `D${get_DB.input.cart_id}`;
    count = 9;
  } else if (get_DB.input.cart_type == 3) {
    // Triple Cart
    SetValue = `T${get_DB.input.cart_id}`;
    count = 6;
  } else {
    console.log("ok");
  }

  if (get_DB.input.lable_count != "") {
    count = get_DB.input.lable_count;
  }
  // print lable
  diplay.innerHTML = "";

  diplay.innerHTML += barcode_lable(`${SetValue[0]}-${get_DB.input.cart_id}`);
  for (i = 1; i <= count; i++) {
    cart_position_no++;

    if (get_DB.input.cart_type == 1) {
      // Single Cart
      if (cart_position_no > 6) {
        cart_position_no = 0;
        cart_position_no++;
        cart_position = "L";
      }
    }

    diplay.innerHTML += barcode_lable(`${SetValue}${cart_position}-0${cart_position_no}`);
  }

  JsBarcode(".barcode").init();
};

const printDateTable = () => {
  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));

  console.log(get_DB.dataTable_DB);

  let dataTable_div = document.getElementById("dataTable");
  dataTable_div.innerHTML = "";
  for (var i = 0; i < get_DB.dataTable_DB.length; i++) {
    var html = `<tr>
      <td>${get_DB.dataTable_DB[i].selectCart}</td>
      <td>${get_DB.dataTable_DB[i].cart_id}</td>
      <td>${get_DB.dataTable_DB[i].lable_count_update}</td>
      <td>${get_DB.dataTable_DB[i].currentDate}</td>
      <td> <div class="input_form">
      <div class="input">
        <button type="button" onclick="DeleteNote(${get_DB.dataTable_DB[i].Milliseconds})">Delete</button>
      </div>
    </div></td>
    </tr>`;

    dataTable_div.innerHTML += html;
  }
};

function DeleteNote(id) {
  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));
  for (var i = 0; i < get_DB.dataTable_DB.length; i++) {
    if (id == get_DB.dataTable_DB[i].Milliseconds) {
      get_DB.dataTable_DB.splice(i, 1);

      // Update data in database
      localStorage.setItem("barcode_db", JSON.stringify(get_DB));
      printDateTable();
    }
  }
}

document.getElementById("PrintBTN").addEventListener("click", () => {
  window.print();
});
document.getElementById("ResetTBTN").addEventListener("click", () => {
  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));

  get_DB.dataTable_DB = [];
  printDateTable();
  // Update data in database
  localStorage.setItem("barcode_db", JSON.stringify(get_DB));
});
document.getElementById("MakeBTN").addEventListener("click", GetUserValue);
document.getElementById("ResetBTN").addEventListener("click", () => {
  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));
  get_DB.input.cart_type = "";
  get_DB.input.cart_id = "";
  get_DB.input.lable_count = "";
  // Update data in database
  localStorage.setItem("barcode_db", JSON.stringify(get_DB));

  let cart_type = (document.getElementById("cart_type").value = "");
  let cart_id = (document.getElementById("cart_id").value = "");
  let lable_count = (document.getElementById("lable_count").value = "");
  allFunctions();
  autoFill();
});

const allFunctions = () => {
  Setup();
  autoFill();
  printDateTable();
};

allFunctions();
JsBarcode(".barcode").init();
let year = (document.getElementById("year").innerHTML = new Date().getFullYear());

$(document).ready(function () {
  $("#table_id").DataTable({
    scrollY: 400,
  });
});
