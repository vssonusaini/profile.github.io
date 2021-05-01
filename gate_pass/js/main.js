var hun_name = document.getElementById('input_hub_value');
var destination_dc_value = document.getElementById('destination_dc');
var big_crates = document.getElementById('Big_crates');
var cust_crate = document.getElementById('cust_crate');
var small_Crate = document.getElementById('Small_Crate');
var nc = document.getElementById('NC');
var box = document.getElementById('Box');
var bag = document.getElementById('Bag');
var pallets = document.getElementById('pallets');
var belt = document.getElementById('belt');
var total = document.getElementById('Total');


function search_hub() {
          // Declare variables
          var input, filter, ul, li, a, i, txtValue;
          input = document.getElementById('input_hub_value');
          filter = input.value.toUpperCase();
          ul = document.getElementById("Hub_list");
          li = ul.getElementsByTagName('li');

          // Loop through all list items, and hide those who don't match the search query
          for (i = 0; i < li.length; i++) {
                    a = li[i].getElementsByTagName("a")[0];
                    txtValue = a.textContent || a.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                              li[i].style.display = "";
                    } else {
                              li[i].style.display = "none";
                    }
          }
}

document.getElementById('destination_dc').addEventListener('change', function () {
          var destination_dc = document.getElementById('destination_dc').value;
          localStorage.setItem('destination_dc', destination_dc);
});

document.getElementById('close').addEventListener('click', function () {
          document.getElementById('add_hub_value').style.display = 'none';
})

document.getElementById('destination_dc').value = localStorage.getItem('destination_dc')


var input_hub_value = document.getElementById('input_hub_value');
input_hub_value.addEventListener('change', function () {
          document.getElementById('add_hub_value').style.display = 'block';
          document.getElementById('hun_name').innerHTML = input_hub_value.value;
          document.getElementById('destination_dc_value').innerHTML = localStorage.getItem('destination_dc');
});




document.getElementById('add_data_btn').addEventListener('click', function () {
          var hun_name = document.getElementById('input_hub_value');
          var destination_dc_value = document.getElementById('destination_dc');
          var big_crates = document.getElementById('Big_crates');
          var cust_crate = document.getElementById('cust_crate');
          var small_Crate = document.getElementById('Small_Crate');
          var nc = document.getElementById('NC');
          var box = document.getElementById('Box');
          var bag = document.getElementById('Bag');
          var pallets = document.getElementById('pallets');
          var belt = document.getElementById('belt');
          // var total = document.getElementById('Total');

          let notes = localStorage.getItem('notes');
          if (notes == null) {
                    notesObj = [];
          } else {
                    notesObj = JSON.parse(notes);
          }

          let myObj = {
                    hun_name: hun_name.value,
                    destination_dc_value: destination_dc_value.value,
                    big_crates: big_crates.value,
                    cust_crate: cust_crate.value,
                    small_Crate: small_Crate.value,
                    nc: nc.value,
                    box: box.value,
                    bag: bag.value,
                    pallets: pallets.value,
                    belt: belt.value,
                    // total: total.value
          }
          notesObj.push(myObj);
          localStorage.setItem("notes", JSON.stringify(notesObj));

          show_gatepass();
          show_gatepass_format();
          sun();
          location.reload();

          document.getElementById('add_hub_value').style.display = "none";
});

function sun() {
          var i;
          let notes = localStorage.getItem('notes');
          if (notes == null) {
                    notesObj = [];
          } else {
                    notesObj = JSON.parse(notes);
          }
          var big_crates = 0;
          var cust_crate = 0;
          var small_Crate = 0;
          var nc = 0;
          var box = 0;
          var bag = 0;
          var pallets = 0;
          var belt = 0;
          for (i = 0; i < notesObj.length; i++) {
                    big_crates = big_crates + parseInt(notesObj[i].big_crates)
                    cust_crate = cust_crate + parseInt(notesObj[i].cust_crate)
                    small_Crate = small_Crate + parseInt(notesObj[i].small_Crate)
                    nc = nc + parseInt(notesObj[i].nc)
                    box = box + parseInt(notesObj[i].box)
                    bag = bag + parseInt(notesObj[i].bag)
                    pallets = pallets + parseInt(notesObj[i].pallets)
                    belt = belt + parseInt(notesObj[i].belt)
          }

          var total_count = `  <tr>
          <td >Total Assets</td>
          <td></td>
          <td>${big_crates}</td>
          <td>${cust_crate}</td>
          <td>${small_Crate}</td>
          <td>${nc}</td>
          <td>${box}</td>
          <td>${bag}</td>
          <td>${pallets}</td>
          <td>${belt}</td>
          <td>${belt}</td>

</tr>`;
          let total_div = document.getElementById('total_count');
          let total_count_edit = document.getElementById('total_count_edit');
          if (notesObj.lenght != 0) {
                    total_div.innerHTML = total_count;
                    total_count_edit.innerHTML = total_count;
          } else {
                    total_div.innerHTML = "No Note Value";
                    total_count_edit.innerHTML = "No Note Value";
          }

}

sun();


function show_gatepass() {
          let notes = localStorage.getItem('notes');
          if (notes == null) {
                    notesObj = [];
          } else {
                    notesObj = JSON.parse(notes);
          }

          let html = " ";

          notesObj.forEach(function (element, index) {
                    html += `   <tr>
                    <td class="nub">${element.hun_name}</td>
                    <td>${element.destination_dc_value}</td>
                    <td>${element.big_crates}</td>
                    <td>${element.cust_crate}</td>
                    <td>${element.small_Crate}</td>
                    <td>${element.nc}</td>
                    <td>${element.box}</td>
                    <td>${element.bag}</td>
                    <td>${element.pallets}</td>
                    <td>${element.belt}</td>
                    <td>${element.total}</td>
                    <td><i class="fas fa-pencil-alt" id="${index}" onclick="edithub(this.id)"></i></td>
                    <td><i class="fas fa-trash" id="${index}" onclick="deletehub(this.id)"></i></td>
                 
          </tr>
`;
          });

          let noteElm = document.getElementById('show_gata_pass_data');
          if (notesObj.lenght != 0) {
                    noteElm.innerHTML = html;
          } else {
                    noteElm.innerHTML = "No Note Value";
          }

}

function show_gatepass_format() {
          let notes = localStorage.getItem('notes');
          if (notes == null) {
                    notesObj = [];
          } else {
                    notesObj = JSON.parse(notes);
          }

          let html = " ";

          notesObj.forEach(function (element, index) {
                    html += `   <tr>
                    <td class="nub">${element.hun_name}</td>
                    <td>${element.destination_dc_value}</td>
                    <td>${element.big_crates}</td>
                    <td>${element.cust_crate}</td>
                    <td>${element.small_Crate}</td>
                    <td>${element.nc}</td>
                    <td>${element.box}</td>
                    <td>${element.bag}</td>
                    <td>${element.pallets}</td>
                    <td>${element.belt}</td>
                    <td>${element.total}</td>
          </tr>
`;
          });

          let noteElm = document.getElementById('show_gata_format');
          if (notesObj.lenght != 0) {
                    noteElm.innerHTML = html;
          } else {
                    noteElm.innerHTML = "No Note Value";
          }

}
function deletehub(index) {
          let confirmdel = confirm('You are deleting this Hub !!')


          if (confirmdel == true) {
                    let notes = localStorage.getItem('notes');
                    if (notes == null) {
                              notesObj = [];
                    } else {
                              notesObj = JSON.parse(notes);
                    }
                    notesObj.splice(index, 1);
                    localStorage.setItem('notes', JSON.stringify(notesObj));

                    show_gatepass()
                    sun();
                    show_gatepass_format()
          }
}

function edithub(index) {
          var big_crates = document.getElementById('Big_crates');
          var cust_crate = document.getElementById('cust_crate');
          var small_Crate = document.getElementById('Small_Crate');
          var nc = document.getElementById('NC');
          var box = document.getElementById('Box');
          var bag = document.getElementById('Bag');
          var pallets = document.getElementById('pallets');
          var belt = document.getElementById('belt');
          let notes = localStorage.getItem('notes');

          if (notes == null) {
                    notesObj = [];
          } else {
                    notesObj = JSON.parse(notes);
          }

          notesObj.findIndex((element, index) => {
                    big_crates.value = element.big_crates;
                    cust_crate.value = element.cust_crate;
                    small_Crate.value = element.small_Crate;
                    nc.value = element.nc;
                    box.value = element.box;
                    bag.value = element.bag;
                    pallets.value = element.pallets;
                    belt.value = element.belt;
          })
          notesObj.splice(index, 1);
          localStorage.setItem('notes', JSON.stringify(notesObj));
          document.getElementById('add_hub_value').style.display = "block";
}

show_gatepass();
show_gatepass_format();