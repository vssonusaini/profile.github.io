"use strict";
import { w2popup, w2grid, w2alert } from "../../libraries/wui/w2ui-1.5.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const AppName = "BRcode";
  const version = "v1";

  const a = AppName + "-" + version;
  var database = JSON.parse(localStorage.getItem(a));
  if (database === null) {
    database = {
      input: {
        cart_type: "1",
        cart_id: "01",
        lable_count: "",
        update_count: "",
      },
      dataTable_DB: [],
    };
    localStorage.setItem(a, JSON.stringify(database));
  }

  // -----------------barcode lable function---------------------
  const barcode_lable = (value) => {
    return `<svg class="barcode" 
    jsbarcode-format="code128" 
    jsbarcode-value="${value}"
    jsbarcode-textmargin="0" 
    jsbarcode-fontoptions="bold"></svg>`;
  };

  // Get input in form and add data in database ============
  const getDatfrominput = () => {
    // input Elements.
    let cart_type = $("cart_type").value;
    let cart_id = $("cart_id").value;
    let cart_number = $("cart_number").value;

    // data and time
    var dt = new Date();
    var id = dt.getMilliseconds();
    var time = dt.getHours() + ":" + dt.getMinutes();
    var date = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
    var currentDate = date + " - " + time;

    if (cart_type != "" && cart_id != "") {
      database.input.cart_type = cart_type;
      database.input.cart_id = cart_id;
      database.input.lable_count = cart_number;

      var select_cart_type;
      if (cart_type == 1) {
        select_cart_type = "Single";
      } else if (cart_type == 2) {
        select_cart_type = "Double";
      } else if (cart_type == 3) {
        select_cart_type = "Triple";
      }

      setTimeout(() => {
        {
          if (cart_number == "") {
            cart_number = database.input.update_count;
            console.log("null", cart_number);
          }

          let pushData = { id, select_cart_type, cart_id, cart_number, currentDate };

          database.dataTable_DB.push(pushData);

          SnackBar({
            message: `Cart: ${select_cart_type},     Id: ${cart_id},      Labels: ${cart_number}`,
            // status: "warning",
            timeout: 3000,
          });
        }
        //   update database
        localStorage.setItem(a, JSON.stringify(database));
        printTable();
      }, 500);
    } else {
      w2alert("Please Enter The Values").ok(() => {});
    }

    //   update database
    localStorage.setItem(a, JSON.stringify(database));
    printTable();
    makelabel();
  };

  const makelabel = () => {
    // define
    var i;
    var count = 2;
    var SetValue;
    var cart_position_no = 0;
    var cart_position = "R";

    //count if condition
    if (database.input.cart_type == 1) {
      // Single Cart
      count = 12;
      SetValue = `S${database.input.cart_id}`;
    } else if (database.input.cart_type == 2) {
      // Double Cart
      SetValue = `D${database.input.cart_id}`;
      count = 9;
    } else if (database.input.cart_type == 3) {
      // Triple Cart
      SetValue = `T${database.input.cart_id}`;
      count = 6;
    } else {
      console.log("ok");
    }

    if (database.input.lable_count != "") {
      count = database.input.lable_count;
    }

    database.input.update_count = count;
    //   update database
    localStorage.setItem(a, JSON.stringify(database));
    // print lable
    $("barcode_preview").innerHTML = "";

    $("barcode_preview").innerHTML += barcode_lable(`${SetValue[0]}-${database.input.cart_id}`);
    for (i = 1; i <= count; i++) {
      cart_position_no++;

      if (database.input.cart_type == 1) {
        // Single Cart
        if (cart_position_no > 6) {
          cart_position_no = 0;
          cart_position_no++;
          cart_position = "L";
        }
      }

      $("barcode_preview").innerHTML += barcode_lable(`${SetValue}${cart_position}-0${cart_position_no}`);
    }

    JsBarcode(".barcode").init();
  };
  // -----------------------------------------------------------------------
  // print dataTable_DB
  // ----------------------------------------------------------------------
  const printTable = () => {
    let config = {
      grid: {
        name: "grid",
        show: {
          footer: true,
          toolbar: true,
          toolbarDelete: true,
        },
        onDelete: function (z) {
          if (z.detail.force) {
            setTimeout(() => {
              database.dataTable_DB = [];
              localStorage.setItem(a, JSON.stringify(database));
              for (var x = 0; x < z.owner.records.length; x++) {
                database.dataTable_DB.push(z.owner.records[x]);
                localStorage.setItem(a, JSON.stringify(database));
              }
            }, 1000);
          }
          // console.log("delete has default behavior", z);
          console.log("delete has default behavior", z.detail.force);
        },
        columns: [
          { field: "personid", text: "ID", size: "50px", sortable: true, searchable: "int", resizable: true },
          { field: "select_cart_type", text: "Cart Type", size: "140px", sortable: true, searchable: "text", resizable: true },
          { field: "cart_id", text: "Cart ID", size: "140px", sortable: true, searchable: "text", resizable: true },
          { field: "cart_number", text: "Number Of Label", size: "100%", resizable: true, sortable: true },
          { field: "currentDate", text: "Label Date - Time", size: "200px", resizable: true, sortable: true },
        ],
      },
    };

    // initialization
    let grid = new w2grid(config.grid);

    for (let i = 0; i < database.dataTable_DB.length; i++) {
      grid.records.push({
        recid: i + 1,
        personid: i + 1,
        select_cart_type: database.dataTable_DB[i].select_cart_type,
        cart_id: database.dataTable_DB[i].cart_id,
        cart_number: database.dataTable_DB[i].cart_number,
        currentDate: database.dataTable_DB[i].currentDate,
      });
    }

    grid.render("#main");
  };

  window.popup = function () {
    w2popup.open({
      width: 580,
      height: 350,
      title: "Setting",
      text: ``,
      showMax: true,
    });
  };

  printTable();
  makelabel();

  $("MakeBTN").addEventListener("click", getDatfrominput);
  $("PrintBTN").addEventListener("click", () => window.print());
  $("RsetBTN").addEventListener("click", () => {
    // input Elements.
    $("cart_type").value = "";
    $("cart_id").value = "";
    $("cart_number").value = "";
  });
  let year = (document.getElementById("year").innerHTML = new Date().getFullYear());
});

// ------------------------------------
// data completed next step print barcode labels ------------------------------------------
// -------------------------------------------
