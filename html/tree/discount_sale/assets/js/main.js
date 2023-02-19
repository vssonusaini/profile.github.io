var database = JSON.parse(localStorage.getItem("import_excel"));

document.getElementById("upload").addEventListener("change", handleFileSelect, false);

let canves = document.getElementById("qr");

var x = database;
console.log(x);

import { w2popup, w2grid, w2alert } from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";

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
        { field: "id", text: "SKU Code", size: "140px", sortable: true, searchable: "text", resizable: true },
        { field: "name", text: "Qty", size: "140px", sortable: true, searchable: "text", resizable: true },
      ],
    },
  };

  // initialization
  let grid = new w2grid(config.grid);

  for (let i = 0; i < x.length; i++) {
    grid.records.push({
      recid: i + 1,
      id: x[i].id,
      name: x[i].name,
    });
  }

  grid.render("#grid");
};

for (let i = 0; i < x.length; i++) {
  console.log(x[i].id, x[i].name);
}

printTableDB();
var qrcode = new QRCode("qr", {
  text: "http://jindo.dev.naver.com/collie",

  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});
