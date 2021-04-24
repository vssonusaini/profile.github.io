
var id_order_food = JSON.parse(localStorage.getItem('id_order_food'));
if (id_order_food === null) {
          id_order_food = [];
          var id_order_food = 0;
          localStorage.setItem("id_order_food", JSON.stringify(id_order_food));
}
function demOrder() {
          var demOrder = 0;
          for (let i = 0; i < orderFood.length; i++) {
                    if (checkLogin == orderFood[i].user_id_order)
                              demOrder++;
                    document.getElementById("order_number").innerHTML = demOrder;

          }
}
var orderFood = JSON.parse(localStorage.getItem('orderFood'));

if (orderFood === null) {
          orderFood = [{}];
          localStorage.setItem("orderFood", JSON.stringify(orderFood));
}
function checkorder(id) {
          if (checkLogin == -1) {
                    alert("Vui long dang nhap");
          } else {


                    for (let i = 0; i < orderFood.length; i++) {
                              var checkordervalue = 0;

                              if (id == orderFood[i].id_food && checkLogin == orderFood[i].user_id_order) {

                                        checkordervalue = 1;
                                        orderFood[i].quanlity_order++;

                                        orderFood[i].quanlity_order;
                                        localStorage.setItem("orderFood", JSON.stringify(orderFood));
                                        orderprinf();

                              }

                    } if (checkordervalue == 0) {
                              orderpush(id);
                              orderprinf();

                    }
          }
}

function orderpush(id) {
          var paymentFood = JSON.parse(localStorage.getItem('paymentFood'));
          id_order = id_order_food;
          var name_order = food[id].name;
          var price_order = food[id].price;
          var image_order = food[id].image;
          var note_order = food[id].note;
          var quanlity_order = 1;
          var user_id_order = checkLogin;
          var id_food = id;
          food_order = { id_order, name_order, price_order, image_order, note_order, quanlity_order, user_id_order, id_food };
          orderFood.push(food_order);

          localStorage.setItem("orderFood", JSON.stringify(orderFood));

          console.log(food_order);
          id_order_food++;
          localStorage.setItem("id_order_food", JSON.stringify(id_order_food));
          demOrder();


          orderprinf();

          console.log(orderFood);


}
function orderprinf() {
          document.getElementById("prinf_order_cart").innerHTML = '';
          var orderFood = JSON.parse(localStorage.getItem('orderFood'));
          totalMoney(checkLogin);
          for (let i = 0; i < orderFood.length; i++) {
                    if (checkLogin == orderFood[i].user_id_order) {
                              var prinf_order_cart = `<tr>  
          <td><div>
            <div class="cart_img_box float-left">
                <img src="`+ orderFood[i].image_order + `" width="100%" height="100%">
            </div>
            <div class="cart_info_box float-left pl-3">
                <p class="mb-1 font-weight-bold" style="font-size: 115%;">`+ orderFood[i].name_order + `</p>
                <p style="font-size: 85%">`+ orderFood[i].note_order + `</p>
            </div>
          </div> </td>
          <td class="text-center"><input id="quality_input_change`+ i + `" onchange ="upQuality(` + orderFood[i].id_order + `)" class="cart_input_quanlity mt-2" type="number" value="` + orderFood[i].quanlity_order + `" name="" min="1" max="20" style=""> </td>
          <td class="text-center"><p class="mt-2" style="padding:5px;">`+ orderFood[i].price_order * orderFood[i].quanlity_order + `đ</p></td>
          <td class="text-center"><div onclick="delete_order(`+ orderFood[i].id_order + `)" class="cart_button_delete"><i class="fa fa-trash" aria-hidden="true" style="color: #fb9200;font-size: 180%"></i></div> </td>
        </tr>`
                              document.getElementById("prinf_order_cart").innerHTML += prinf_order_cart;






                    }

          }

}