function Noteprinf() {
  document.getElementById("prosuct_list").innerHTML = "";

  for (let i = 0; i < 6; i++) {
    var Note_list = `     <div class="products">
    <div class="img">
      <img src="https://staticfanpage.akamaized.net/wp-content/uploads/sites/22/2021/07/Chicken-samosa-16-1200x675.jpg" alt="" />
    </div>
    <div class="pro_details">
      <div class="pro_heading">Applw</div>
      <div class="pro_decs"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus</p></div>
      <div class="pro_rates">
        <span><s>1200</s></span>
        <span>Rs. 430</span>
        <!-- <span>60% OFF</span> -->
      </div>
    </div>
  </div>`;
    document.getElementById("prosuct_list").innerHTML += Note_list;
  }
}
Noteprinf();
