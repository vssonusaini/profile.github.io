"use strict";

import { w2popup, w2grid, w2alert } from "../libraries/master/min.js";

const AppName = "BRcode";
const version = "v32132";

const cType = document.getElementById("cType");
const cartId = document.getElementById("cartId");
const nmLabels = document.getElementById("nmLabels");
const yser = (document.getElementById("year").innerHTML = new Date().getFullYear());
const Version = (document.getElementById("Version").innerHTML = version);
const MakeBTN = document.getElementById("MakeBTN");
const PrintBTN = document.getElementById("PrintBTN");
const RsetBTN = document.getElementById("RsetBTN");
const barcode_preview = document.getElementById("barcode_preview");

const barcode_lable = (value, id) => {
  return `<div class="barcodeSvg" id="svg_${id}"><div class="svgprintBTN"><button onclick="oneprint(${id})">Print</button></div>
  <svg class="barcode" jsbarcode-format="code128" jsbarcode-value="${value}"jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg></div>
  `;
};

// ------------ database
const dbname = AppName + "-" + version;
var database = JSON.parse(localStorage.getItem(dbname));
if (database === null) {
  database = {
    formInput: {
      cartType: "1",
      cartId: "1",
      nmLabels: "",
    },
    siteSetting: {
      background: "",
    },
    userdata: [],
  };
  localStorage.setItem(dbname, JSON.stringify(database));
}

const datetime = () => {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var currentDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  var currentTime = hours + ":" + minutes + " " + ampm;

  return { currentDate, currentTime };
};

const setData = (e) => {
  let labels, cTypePush;

  if (cType.value != "" && cartId.value != "" && nmLabels.value < 13) {
    if (cType.value == 1) {
      cTypePush = "Single";
      labels = 12;
    } else if (cType.value == 2) {
      cTypePush = "Double";
      labels = 9;
    } else if (cType.value == 3) {
      cTypePush = "Triple";
      labels = 6;
    }

    if (nmLabels.value != "") {
      labels = nmLabels.value;
    }

    database.formInput.cartType = cType.value;
    database.formInput.cartId = cartId.value;
    database.formInput.nmLabels = labels;

    var puchData = {
      recid: new Date().getTime().toString(),
      cartType: cTypePush,
      cartId: cartId.value,
      nmLabels: labels,
      filter: cTypePush + "-" + cartId.value,
      currentTime: datetime().currentTime,
      currentDate: datetime().currentDate,
    };

    database.userdata.push(puchData);

    notify({
      message: `Cart Created Successfully ${cTypePush}-${cartId.value}-${labels}`,
      color: "success",
      timeout: 3000,
    });
    // update db
    localStorage.setItem(dbname, JSON.stringify(database));

    console.log(puchData);
  } else {
    notify({
      message: "Please Enter A Valid Format",
      color: "danger",
      timeout: 3000,
    });
  }

  makeLabels();
  printTableDB();
};

const makeLabels = () => {
  let i, getDB, set_label_value, cart_position, cart_position_no;
  cart_position = "R";
  cart_position_no = 0;
  getDB = JSON.parse(localStorage.getItem(dbname));

  if (getDB.formInput.cartType == 1) {
    set_label_value = "S";
  } else if (getDB.formInput.cartType == 2) {
    set_label_value = "D";
  } else if (getDB.formInput.cartType == 3) {
    set_label_value = "T";
  }

  //   Print labels
  barcode_preview.innerHTML = null;

  // cart id print
  barcode_preview.innerHTML = barcode_lable(`${set_label_value}-${getDB.formInput.cartId}`, 13);

  for (i = 0; i < getDB.formInput.nmLabels; i++) {
    cart_position_no++;

    if (database.formInput.cartType == 1) {
      // Single Cart
      if (cart_position_no > 6) {
        cart_position_no = 0;
        cart_position_no++;
        cart_position = "L";
      }
    }

    barcode_preview.innerHTML += barcode_lable(`${set_label_value}${getDB.formInput.cartId}${cart_position}-0${cart_position_no}`, i);
  }

  JsBarcode(".barcode").init();
};

const printTableDB = () => {
  let config = {
    grid: {
      name: "grid",
      show: {
        selectColumn: true,
        footer: true,
        toolbar: true,
        toolbarDelete: true,
      },
      onDelete: function (z) {
        if (z.detail.force) {
          setTimeout(() => {
            database.userdata = [];
            localStorage.setItem(dbname, JSON.stringify(database));
            for (var x = 0; x < z.owner.records.length; x++) {
              database.userdata.push(z.owner.records[x]);
              localStorage.setItem(dbname, JSON.stringify(database));
            }
          }, 1000);
        }
        // console.log("delete has default behavior", z);
        console.log("delete has default behavior", z.detail.force);
      },
      columns: [
        { field: "personid", text: "ID", size: "50px", sortable: true, searchable: "int", resizable: true },
        { field: "cart_type", text: "Cart Type", size: "140px", sortable: true, searchable: "text", resizable: true },
        { field: "cart_id", text: "Cart ID", size: "140px", sortable: true, searchable: "text", resizable: true },
        { field: "labels", text: "Number Of Label", size: "100%", resizable: true, sortable: true },
        { field: "currentTime", text: "Time", size: "200px", resizable: true, sortable: true },
        { field: "currentDate", text: "Date", size: "200px", resizable: true, sortable: true },
      ],
    },
  };

  // initialization
  let grid = new w2grid(config.grid);

  for (let i = 0; i < database.userdata.length; i++) {
    grid.records.push({
      recid: i + 1,
      personid: i + 1,
      cart_type: database.userdata[i].cartType,
      cart_id: database.userdata[i].cartId,
      labels: database.userdata[i].nmLabels,
      currentTime: database.userdata[i].currentTime,
      currentDate: database.userdata[i].currentDate,
    });
  }

  grid.render("#main");
};

const setting = () => {
  document.getElementById("background_select").value = database.siteSetting.background;
  document.body.setAttribute("style", `background: url(./assets/background/${database.siteSetting.background})`);
};

document.getElementById("background_select").addEventListener("change", () => {
  database.siteSetting.background = document.getElementById("background_select").value;
  localStorage.setItem(dbname, JSON.stringify(database));
  setting();
});

window.oneprint = (id) => {
  printDiv("svg_" + id);
};

const printDiv = (divName) => {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;

  console.log("reload");
  location.reload();
};

// Event Listener
MakeBTN.addEventListener("click", setData);
PrintBTN.addEventListener("click", () => {
  window.print();
  notify({
    message: "Printed Successfully",
    color: "success",
    timeout: 3000,
  });
});

RsetBTN.addEventListener("click", () => {
  notify({
    message: "Reset Successfully",
    color: "success",
    timeout: 3000,
  });

  cType.value = "";
  cartId.value = null;
  nmLabels.value = null;
});

// Define function
makeLabels();
printTableDB();
setting();
