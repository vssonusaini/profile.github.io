"use strict";

const AppName = "Barcode";
const varsion = "2.2.3";

const cType = document.getElementById("cType");
const cartId = document.getElementById("cartId");
const nmLabels = document.getElementById("nmLabels");
const yser = (document.getElementById("year").innerHTML =
 new Date().getFullYear());
const Version = (document.getElementById("version").innerHTML = version);
const MakeBTN = document.getElementById("MakeBTN");
const PrintBTN = document.getElementById("PrintBTN");
const RsetBTN = document.getElementById("RsetBTN");
const barcode_preview = document.getElementById("barcode");

const barcode_lable = (value, id) => {
 return `<div class="barcodeSvg" id="svg_${id}"><div class="svgprintBTN"><button onclick="oneprint(${id})">Print</button></div>
  <svg class="barcode" jsbarcode-format="code128" jsbarcode-value="${value}"jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg></div>
  `;
};

// ------------ database
const dbname = AppName + "-" + version;
var database = JSON.parse(localStorage.getItem(dbname));
if (database === null) {
 database = {};
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
 var currentDate =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
 var currentTime = hours + ":" + minutes + " " + ampm;

 return { currentDate, currentTime };
};

const setData = () => {};
