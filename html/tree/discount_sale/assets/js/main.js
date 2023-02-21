"use strict";

import { w2popup, w2grid, w2alert } from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";

let canves = document.getElementById("qr");
let UploadBTN = document.getElementById("UploadBTN");
let inputSKU = document.getElementById("inputSKU");
let matchSKU = document.getElementById("matchSKU");
let matchQty = document.getElementById("matchQty");
let status = document.getElementById("status");
let submitBTN = document.getElementById("submitBTN");

document.getElementById("upload").addEventListener("change", handleFileSelect, false);

var discount_sale = JSON.parse(localStorage.getItem("discount_sale"));
if (discount_sale === null) {
  discount_sale = {
    input: {
      coden: "",
    },
    table: [],
  };
  localStorage.setItem("discount_sale", JSON.stringify(discount_sale));
}

console.log(discount_sale);

var x = discount_sale.table;

const VSqrcode = (a) => {
  var qrcode = new QRCode("qr", {
    text: a,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const statushtml = (a, b, c) => {
  return `<div class="status"><span>${a}</span><span>Total SKU</span></div>
    <div class="status"><span>${b}</span><span>Total Qty</span></div>
<div class="status"><span>${c}</span><span>Completed SKU</span></div>`;
};

function sumArray(array) {
  let sum = 0;

  for (let i = 0; i < array.length; i += 1) {
    sum = array[i].qty;
  }

  var a = sum;

  return sum;
}

const statusbar = () => {
  var total_sku, total_qty, status_qty, i;

  total_sku = discount_sale.table.length;

  const sum = discount_sale.table.reduce((accumulator, object) => {
    console.log(JSON.parse(object.qty));
    var a = JSON.parse(object.qty);
    return accumulator + a;
  }, 0);

  const sum_b = discount_sale.table.reduce((accumulator, object) => {
    console.log(JSON.parse(object.completed));
    var a = JSON.parse(object.completed);
    return accumulator + a;
  }, 0);

  status.innerHTML = statushtml(total_sku, sum, sum_b);
};

const printTableDB = () => {
  let config = {
    grid: {
      name: "grid",
      sortData: [{ field: "status", direction: "asc" }],
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
        { field: "recid", text: "ID", size: "50px", sortable: true, searchable: "int", resizable: true },
        { field: "sku", text: "SKU Code", size: "140px", sortable: true, clipboardCopy: true, searchable: "text", resizable: true },
        { field: "qty", text: "Total Qty", size: "140px", sortable: true, searchable: "text", resizable: true },
        { field: "status", text: "Status", size: "140px", sortable: true, searchable: "text", resizable: true },
      ],
    },
  };

  // initialization
  let grid = new w2grid(config.grid);

  for (let i = 0; i < x.length; i++) {
    grid.records.push({
      recid: i + 1,
      sku: x[i].sku,
      qty: x[i].qty,
      status: x[i].sonu,
    });
  }

  grid.render("#grid");
};

const UploadToDB = () => {
  var i;
  var database = JSON.parse(localStorage.getItem("import_excel"));
  discount_sale.table = [];
  for (i = 0; i < database.length; i++) {
    discount_sale.table.push(database[i]);
    discount_sale.table[i].completed = 0;
    localStorage.setItem("discount_sale", JSON.stringify(discount_sale));
  }

  printTableDB();
  console.log(discount_sale);
  location.reload();
};

const makeqrcode = () => {
  var i;
  canves.innerHTML = null;
  matchSKU.value = null;
  matchQty.value = null;
  for (i = 0; i < discount_sale.table.length; i++) {
    if (discount_sale.table[i].value == inputSKU.value) {
      alert("duplicte");
      break;
    }

    if (discount_sale.table[i].sku == inputSKU.value) {
      matchSKU.value = discount_sale.table[i].sku;
      matchQty.value = discount_sale.table[i].qty;
      discount_sale.table[i].value = inputSKU.value;
      discount_sale.table[i].sonu = "Done";
      discount_sale.table[i].completed = 1;
      discount_sale.table[i].w2ui = { style: "background-color: #C2F5B4" };
      localStorage.setItem("discount_sale", JSON.stringify(discount_sale));
      printTableDB();
      statusbar();
    }
  }
  VSqrcode(inputSKU.value);
  inputSKU.value = null;

  console.log(inputSKU.value);
};

statusbar();
printTableDB();

VSqrcode("hello");

inputSKU.addEventListener("change", makeqrcode);
submitBTN.addEventListener("click", makeqrcode);
UploadBTN.addEventListener("click", UploadToDB);
