import { w2grid, w2utils } from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";

let grid = new w2grid({
  name: "main",
  box: "#main",
  show: {
    toolbar: true,
    footer: true,
  },
  multiSearch: true,
  searches: [
    { field: "recid", label: "ID ", type: "int" },
    { field: "lname", label: "Last Name", type: "text" },
    { field: "fname", label: "First Name", type: "text" },
    { field: "email", label: "Email", type: "list", options: { items: ["peter@gmail.com", "jim@gmail.com", "jdoe@gmail.com"] } },
    { field: "status", label: "Status", type: "enum", style: "width1: 350px", options: { items: ["active", "selected", "submitted"] } },
    { field: "sdate", label: "Start Date", type: "date" },
  ],
  columns: [
    { field: "recid", text: "ID", size: "50px", sortable: true, attr: "align=center" },
    { field: "lname", text: "Last Name", size: "30%", sortable: true },
    { field: "fname", text: "First Name", size: "30%", sortable: true },
    { field: "email", text: "Email", size: "40%" },
    { field: "sdate", text: "Start Date", render: "date:mm/dd/yyyy", size: "120px" },
    { field: "status", text: "Status", size: "120px" },
  ],
  records: [
    { recid: 1, fname: "Jane", lname: "Doe", email: "jdoe@gmail.com", sdate: 384052483664, status: ["active"] },
    { recid: 2, fname: "Stuart", lname: "Motzart", email: "jdoe@gmail.com", sdate: 1384052583664, status: ["active"] },
    { recid: 3, fname: "Jin", lname: "Franson", email: "peter@gmail.com", sdate: 1383620688314, status: ["active"] },
    { recid: 4, fname: "Susan", lname: "Ottie", email: "jim@gmail.com", sdate: 1384052463664, status: ["active"] },
    { recid: 5, fname: "Kelly", lname: "Silver", email: "peter@gmail.com", sdate: 1383793476323, status: ["active", "selected"] },
    { recid: 6, fname: "Francis", lname: "Gatos", email: "jdoe@gmail.com", sdate: 1383620688314, status: ["active"] },
    { recid: 7, fname: "Mark", lname: "Welldo", email: "jim@gmail.com", sdate: 1383361499126 },
    { recid: 8, fname: "Thomas", lname: "Bahh", email: "jdoe@gmail.com", sdate: 1383793476323 },
    { recid: 9, fname: "Sergei", lname: "Rachmaninov", email: "jdoe@gmail.com", sdate: 1383620688314 },
    { recid: 20, fname: "Jill", lname: "Doe", email: "jdoe@gmail.com", sdate: 1383361499126 },
    { recid: 21, fname: "Frank", lname: "Motzart", email: "jdoe@gmail.com", sdate: 1384052383664 },
    { recid: 22, fname: "Peter", lname: "Franson", email: "jdoe@gmail.com", sdate: 1383793476323 },
    { recid: 23, fname: "Andrew", lname: "Ottie", email: "jdoe@gmail.com", sdate: 1384054483664 },
    { recid: 24, fname: "Manny", lname: "Silver", email: "jdoe@gmail.com", sdate: 1383361499126 },
    { recid: 25, fname: "Ben", lname: "Gatos", email: "peter@gmail.com", sdate: 1383793476323 },
    { recid: 26, fname: "Doer", lname: "Welldo", email: "jdoe@gmail.com", sdate: 1383361499126 },
    { recid: 27, fname: "Shashi", lname: "Bahh", email: "jim@gmail.com", sdate: 1384052483664 },
    { recid: 28, fname: "Av", lname: "Rachmaninov", email: "jim@gmail.com", sdate: 1383620688314 },
  ],
});

window.multi = function (el) {
  grid.multiSearch = el.checked;
  grid.searchReset();
  grid.refresh();
};
