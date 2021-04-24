function listFood() {
        document.getElementById("product_div").innerHTML = '';
        var food = JSON.parse(localStorage.getItem('food'));
        for (let i = 0; i < food.length; i++) {
                var prinf = `   <div class="card">
                                                    <div class="img">
                                                             <img src="./img/led_pic_1.jpeg" alt="">
                                                   </div>
                                                  <div class="product_ditalis">
                                                            <div class="product_name">
                                                                                         ` + food[i].name + `
                                                            </div>
                                                            <div class="product_disc">
                                                                      `+ food[i].note + `
                                                            </div>
                                                            <div class="product_rate">
                                                                      <div class="rate">`+ food[i].price + `</div>
                                                            </div>
                                                  </div>
                                                   <div class="card_btn">
                                                            <button class="add" onclick="checkorder(`+ food[i].id + `)" >Add</button>
                                                            <button>buy</button>
                                                  </div>
                                          </div>`;
                document.getElementById("product_div").innerHTML += prinf;
        }
}
listFood();
