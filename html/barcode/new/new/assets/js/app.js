"use strict";

import { w2popup, w2grid, w2alert } from "../../libraries/wui/w2ui-1.5.min.js";

const $ = (id) => document.getElementById(id);

const AppName = "BRcode";
const version = "v08201222";

// ------------ barcode label html
const barcode_lable = (value) => {
  return `<svg class="barcode" 
    jsbarcode-format="code128" 
    jsbarcode-value="${value}"
    jsbarcode-textmargin="0" 
    jsbarcode-fontoptions="bold"></svg>`;
};

// ------------ database
const dbname = AppName + "-" + version;
var database = JSON.parse(localStorage.getItem(dbname));
if (database === null) {
  database = {
    input: {
      cart_type: "1",
      cart_id: "01",
      number_of: "",
      update_count: "",
    },
    dataTable_DB: [],
    setting: {
      background: "",
    },
  };
  localStorage.setItem(dbname, JSON.stringify(database));
}

// --------------- Set Value In Database
const setData = async () => {
  let labels;
  let cart_type = $("cart_type").value;
  let cart_id = $("cart_id").value;
  let cart_number = $("cart_number").value;

  if (cart_type != "" && cart_id != "" && cart_number < 13) {
    database.input.cart_type = cart_type;
    database.input.cart_id = cart_id;
    database.input.number_of = cart_number;

    // data and time
    var date = new Date();
    var id = date.getMilliseconds();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var currentDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    var currentTime = hours + ":" + minutes + " " + ampm;

    if (cart_type == 1) {
      cart_type = "Single";
      labels = 12;
    } else if (cart_type == 2) {
      cart_type = "Double";
      labels = 9;
    } else if (cart_type == 3) {
      cart_type = "Triple";
      labels = 6;
    }

    if (cart_number != "") {
      labels = cart_number;
    }

    database.input.number_of = labels;
    database.dataTable_DB.push({ id, cart_type, cart_id, labels, currentTime, currentDate });

    notify({
      message: `Cart Created Successfully ${cart_type}-${cart_id}-${labels}`,
      color: "success",
      timeout: 3000,
    });
    // update db
    localStorage.setItem(dbname, JSON.stringify(database));
  } else {
    notify({
      message: "Please Enter A Valid Format",
      color: "danger",
      timeout: 3000,
    });
  }

  // Call Function
  makeLabels();
  printTableDB();
};

const makeLabels = () => {
  let i, getDB, barcode_preview, set_label_value, cart_position, cart_position_no;
  cart_position = "R";
  cart_position_no = 0;
  barcode_preview = $("barcode_preview");
  getDB = JSON.parse(localStorage.getItem(dbname));

  if (getDB.input.cart_type == 1) {
    set_label_value = "S";
  } else if (getDB.input.cart_type == 2) {
    set_label_value = "D";
  } else if (getDB.input.cart_type == 3) {
    set_label_value = "T";
  }

  //   Print labels
  barcode_preview.innerHTML = null;

  // cart id print
  barcode_preview.innerHTML = barcode_lable(`${set_label_value}-${getDB.input.cart_id}`);
  for (i = 0; i < getDB.input.number_of; i++) {
    cart_position_no++;

    if (database.input.cart_type == 1) {
      // Single Cart
      if (cart_position_no > 6) {
        cart_position_no = 0;
        cart_position_no++;
        cart_position = "L";
      }
    }

    barcode_preview.innerHTML += barcode_lable(`${set_label_value}${getDB.input.cart_id}${cart_position}-0${cart_position_no}`);
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
            database.dataTable_DB = [];
            localStorage.setItem(dbname, JSON.stringify(database));
            for (var x = 0; x < z.owner.records.length; x++) {
              database.dataTable_DB.push(z.owner.records[x]);
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

  for (let i = 0; i < database.dataTable_DB.length; i++) {
    grid.records.push({
      recid: i + 1,
      personid: i + 1,
      cart_type: database.dataTable_DB[i].cart_type,
      cart_id: database.dataTable_DB[i].cart_id,
      labels: database.dataTable_DB[i].labels,
      currentTime: database.dataTable_DB[i].currentTime,
      currentDate: database.dataTable_DB[i].currentDate,
    });
  }

  grid.render("#main");
};

const setting = () => {
  $("background_select").value = database.setting.background;
  document.body.setAttribute("style", `background: url(./assets/background/${database.setting.background})`);
};
// Event Listener;
$("year").innerHTML = new Date().getFullYear();
$("MakeBTN").addEventListener("click", setData);
$("PrintBTN").addEventListener("click", () => {
  window.print();
  notify({
    message: "Printed Successfully",
    color: "success",
    timeout: 3000,
  });
});
$("RsetBTN").addEventListener("click", () => {
  notify({
    message: "Reset Successfully",
    color: "success",
    timeout: 3000,
  });
  $("cart_type").value = "";
  $("cart_id").value = null;
  $("cart_number").value = null;
});

$("background_select").addEventListener("change", () => {
  database.setting.background = $("background_select").value;
  localStorage.setItem(dbname, JSON.stringify(database));
  setting();
});
// Define function
setting();
makeLabels();
printTableDB();
JsBarcode(".barcode").init();
