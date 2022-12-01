"use strict";

var barcode_db = JSON.parse(localStorage.getItem("barcode_db"));
if (barcode_db === null) {
  barcode_db = {
    input: {
      cart_type: "",
      cart_id: "",
      lable_count: "",
    },
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

  // get date in database
  let get_DB = JSON.parse(localStorage.getItem("barcode_db"));

  console.log(get_DB);

  if (cart_id != "") {
    get_DB.input.cart_type = cart_type;
    get_DB.input.cart_id = cart_id;
    get_DB.input.lable_count = lable_count;
  } else {
    alert("Pleas enterValue");
  }

  // Update data in database
  localStorage.setItem("barcode_db", JSON.stringify(get_DB));

  // call function
  Setup();
  autoFill();
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

document.getElementById("PrintBTN").addEventListener("click", () => {
  window.print();
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
};

allFunctions();
JsBarcode(".barcode").init();
let year = (document.getElementById("year").innerHTML = new Date().getFullYear());
