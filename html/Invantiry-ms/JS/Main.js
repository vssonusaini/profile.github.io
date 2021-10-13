// Product Master database
var Product_data = JSON.parse(localStorage.getItem("Product_data"));
if (Product_data === null) {
  Product_data = [];
  Product_data = [];
  localStorage.setItem("Product_data", JSON.stringify(Product_data));
}

// Transactions database
var Transactions = JSON.parse(localStorage.getItem("Transactions"));
if (Transactions === null) {
  Transactions = [];
  Transactions = [];
  localStorage.setItem("Transactions", JSON.stringify(Transactions));
}

// Available Stocks database
var Available_Stock = JSON.parse(localStorage.getItem("Available_Stock"));
if (Available_Stock === null) {
  Available_Stock = [];
  Available_Stock = [];
  localStorage.setItem("Available_Stock", JSON.stringify(Available_Stock));
}

//  Product Id
var idupProduct = JSON.parse(localStorage.getItem("idupProduct"));
if (idupProduct === null) {
  idupProduct = [];
  var idupProduct = 1;
  localStorage.setItem("idupProduct", JSON.stringify(idupProduct));
}

// Transactions id
var idupProductTransactions = JSON.parse(localStorage.getItem("idupProductTransactions"));
if (idupProductTransactions === null) {
  idupProductTransactions = [];
  var idupProductTransactions = 1;
  localStorage.setItem("idupProductTransactions", JSON.stringify(idupProductTransactions));
}

// Input Product Master function
function Product_master() {
  var id = idupProduct;
  var Product_Name = document.getElementById("Product_Name").value;
  var Product_Price = document.getElementById("Product_Price").value;
  var Sale_Price = document.getElementById("Sale_Price").value;

  if (Product_Name != "" && Product_Price != "" && Sale_Price != "") {
    var Add_Product = { id, Product_Name, Product_Price, Sale_Price };
    Product_data.push(Add_Product);
    localStorage.setItem("Product_data", JSON.stringify(Product_data));

    idupProduct++;
    localStorage.setItem("idupProduct", JSON.stringify(idupProduct));
    // console.log(Product_data);

    var Product_Name = (document.getElementById("Product_Name").value = "");
    var Product_Price = (document.getElementById("Product_Price").value = "");
    var Sale_Price = (document.getElementById("Sale_Price").value = "");

    Managementproduct();
  } else {
    alert("Plase enter Value");
  }
}

// print product Master table
function Managementproduct() {
  document.getElementById("product_data_print").innerHTML = "";
  var Product_data = JSON.parse(localStorage.getItem("Product_data"));
  for (let i = 0; i < Product_data.length; i++) {
    var prinfManage =
      ` <tr>
      <td>` +
      i +
      `</td>
      <td>` +
      Product_data[i].Product_Name +
      `</td>
      <td>` +
      Product_data[i].Product_Price +
      `</td>
      <td>` +
      Product_data[i].Sale_Price +
      `</td>
      <td style="display: flex;">
      <button style="margin-right: 1rem;" onclick="UpdateProduct(` +
      Product_data[i].id +
      `)">Edit</button>
    
      <button onclick="DeleteProduct(` +
      Product_data[i].id +
      `)">Delete</button>
    </td>
    </tr>`;
    document.getElementById("product_data_print").innerHTML += prinfManage;
  }
}

// delete Product_master function
function DeleteProduct(id) {
  for (var i = 0; i < Product_data.length; i++) {
    if (id == Product_data[i].id) {
      Product_data.splice(i, 1);

      localStorage.setItem("Product_data", JSON.stringify(Product_data));
      Managementproduct();
    }
  }
}

// Update product Master Function
function UpdateProduct(id) {
  for (var i = 0; i < Product_data.length; i++) {
    if (id == Product_data[i].id) {
      document.getElementById("txtId").value = Product_data[i].id;
      document.getElementById("Product_Name").value = Product_data[i].Product_Name;
      document.getElementById("Product_Price").value = Product_data[i].Product_Price;
      document.getElementById("Sale_Price").value = Product_data[i].Sale_Price;
      break;
    }
  }
}

// Sava update product Master
function SaveUpdateProduct() {
  var idchange = document.getElementById("txtId").value;

  for (var i = 0; i < Product_data.length; i++) {
    if (idchange == Product_data[i].id) {
      Product_data[i].Product_Name = document.getElementById("Product_Name").value;
      Product_data[i].Product_Price = document.getElementById("Product_Price").value;
      Product_data[i].Sale_Price = document.getElementById("Sale_Price").value;
      localStorage.setItem("Product_data", JSON.stringify(Product_data));
      Managementproduct();
      break;
    }
  }

  document.getElementById("Product_Name").value = "";
  document.getElementById("Product_Price").value = "";
  document.getElementById("Sale_Price").value = "";
}

// Available_Stock add data
function Available_Stockset() {
  var id = idupProduct;
  var Product_Name = document.getElementById("Product_Name").value;
  var Qty = document.getElementById("Product_Price").value;

  if (Product_Name != "" && Qty != "") {
    var Available_Stock_input = { id, Product_Name, Qty };
    Available_Stock.push(Available_Stock_input);
    localStorage.setItem("Available_Stock", JSON.stringify(Available_Stock));

    idupProduct++;
    localStorage.setItem("idupProduct", JSON.stringify(idupProduct));
  } else {
    alert("Plase enter Value");
  }
}

// print available Stocks
function Available_Stocks() {
  document.getElementById("Available_Stocks").innerHTML = "";
  var Available_Stock = JSON.parse(localStorage.getItem("Available_Stock"));
  for (let i = 0; i < Transactions.length; i++) {
    var prinfAvailable_Stockge =
      `  <tr>
      <td>` +
      Available_Stock[i].Product_Name +
      `</td>
      <td>` +
      Available_Stock[i].Quantity +
      `</td>
    </tr>`;
    document.getElementById("Available_Stocks").innerHTML += prinfAvailable_Stockge;
  }

  // console.log(`produvt Name ${print_product_name} total ${print_qty}`);
}

// Show Product name By Product Sale_Purchase
function show_Sale_Price(value) {
  var Transaction_type = document.getElementById("Transaction_type").value;
  console.log(Transaction_type);
  var Product_dataa = JSON.parse(localStorage.getItem("Product_data"));

  for (var i = 0; i < Product_dataa.length; i++) {
    if (value == Product_dataa[i].id) {
      if (Transaction_type == "Sale") {
        document.getElementById("Sale_Purchase").value = Product_dataa[i].Sale_Price;
      } else if (Transaction_type == "Purchase") {
        document.getElementById("Sale_Purchase").value = Product_dataa[i].Product_Price;
      }
      // break;
    }
  }
}

// print product name in input box
function Product() {
  document.getElementById("Product").innerHTML = "";
  var Product_data = JSON.parse(localStorage.getItem("Product_data"));
  for (let i = 0; i < Product_data.length; i++) {
    var prinfManage = `<option value="` + Product_data[i].id + `"   >` + Product_data[i].Product_Name + `  </option>`;
    document.getElementById("Product").innerHTML += prinfManage;
  }
}

// print Transactions table function`
function ManagementproductTransactions() {
  document.getElementById("Transactions_data_print").innerHTML = "";
  var Transactions = JSON.parse(localStorage.getItem("Transactions"));
  for (let i = 0; i < Transactions.length; i++) {
    var prinfManageTransactions =
      ` <tr>
        <td>` +
      Transactions[i].Product_Name +
      `</td>
        <td>` +
      Transactions[i].type +
      `</td>
        <td>` +
      Transactions[i].Quantity +
      `</td>
        <td>` +
      Transactions[i].Purchase_Price +
      `</td>
        <td>` +
      Transactions[i].Amount +
      `</td>
        <td>` +
      Transactions[i].date +
      `</td>
      </tr>`;
    document.getElementById("Transactions_data_print").innerHTML += prinfManageTransactions;
  }
}

// get value with id
function getvalue_id(value) {
  var Product_dataa = JSON.parse(localStorage.getItem("Product_data"));
  for (var i = 0; i < Product_dataa.length; i++) {
    if (value == Product_dataa[i].id) {
      getname = Product_dataa[i].Product_Name;
      return getname;
      break;
    }
  }
}

function sum_value_id() {
  var Quantity = document.getElementById("Quantity").value;
  var Sale_Purchase = document.getElementById("Sale_Purchase").value;
  var Amount = Sale_Purchase * Quantity;
  return Amount;
}

// input Sale_Purchase data in databaea
function Sale_Purchase() {
  var id = idupProductTransactions;
  var Product_id = document.getElementById("Product").value;
  var Product_Name = getvalue_id(Product_id);

  var type = document.getElementById("Transaction_type").value;
  var Quantity = document.getElementById("Quantity").value;
  var Purchase_Price = document.getElementById("Sale_Purchase").value;
  var Amount = sum_value_id();
  console.log(Amount);
  var date = document.getElementById("datePicker").value;

  if (Product_Name != "" && type != "" && Quantity != "" && Amount != "" && date != "") {
    var Sale_PurchaseTransactions = { id, Product_Name, type, Quantity, Purchase_Price, Amount, date };
    Transactions.push(Sale_PurchaseTransactions);
    localStorage.setItem("Transactions", JSON.stringify(Transactions));

    idupProductTransactions++;
    localStorage.setItem("idupProductTransactions", JSON.stringify(idupProductTransactions));
    // console.log(Product_data);
    ManagementproductTransactions();

    var Product_Name = (document.getElementById("Product").value = "");
    var Quantity = (document.getElementById("Quantity").value = "");
    var Purchase_Price = (document.getElementById("Sale_Purchase").value = "");
    Inventory_qty();
    Inventory_amt();
    Purchase_Amount();
    Sale_Amount();
  } else {
    alert("Plase enter Value");
  }
}

// print purchace_amount
function Purchase_Amount() {
  var i;
  let notes = localStorage.getItem("Transactions");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  var big_crates = 0;

  for (i = 0; i < notesObj.length; i++) {
    if (Transactions[i].type == "Purchase") {
      big_crates = big_crates + parseInt(Transactions[i].Amount);
    }
  }
  document.getElementById("Purchase_Amount").innerHTML = big_crates;
}

// print Sale_amount
function Sale_Amount() {
  var i;
  let notes = localStorage.getItem("Transactions");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  var big_crates = 0;

  for (i = 0; i < notesObj.length; i++) {
    if (Transactions[i].type == "Sale") {
      big_crates = big_crates + parseInt(Transactions[i].Amount);
    }
  }
  document.getElementById("Sale_Amount").innerHTML = big_crates;
}

// print Inventory_qty function
function Inventory_qty() {
  var Inventory_qty = localStorage.getItem("idupProduct");
  document.getElementById("Inventory_qty").innerHTML = --Inventory_qty;
}

// print Inventory_amt with sum function
function Inventory_amt() {
  var i;
  let notes = localStorage.getItem("Product_data");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  var big_crates = 0;

  for (i = 0; i < notesObj.length; i++) {
    big_crates = big_crates + parseInt(Product_data[i].Sale_Price);
  }
  document.getElementById("Inventory_amt").innerHTML = big_crates;
}

// index_page function
function index_page() {
  Inventory_qty();
  Inventory_amt();
  Purchase_Amount();
  Sale_Amount();
  Available_Stocks();
  Product();
  ManagementproductTransactions();
  Purchase_Amount();
  Sale_Amount();
}

function print() {
  var obj = JSON.parse(localStorage.getItem("Transactions"));
  var holder = {};
  var id = "1";
  obj.forEach(function (d) {
    if (holder.hasOwnProperty(d.Product_Name)) {
      holder[d.Product_Name] = holder[d.Product_Name] + d.Quantity;
    } else {
      holder[d.Product_Name] = d.Quantity;
    }
  }); 
  var obj2 = [];
  for (var prop in holder) {
    obj2.push({id, Product_Name: prop, Quantity: holder[prop] });
  }
  console.log(obj2);
  Available_Stock.push(obj2);
  localStorage.setItem("Available_Stock", JSON.stringify(obj2));
}

print();
