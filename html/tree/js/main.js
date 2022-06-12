function categories() {
  document.getElementById("categories_menu").innerHTML = null;
  var categories_menu = JSON.parse(localStorage.getItem("echo_database"));

  for (var i = 0; i < categories_menu.categories.length; i++) {
    var categories_list = `<li><a onclick="categories_filter('` + categories_menu.categories[i].categorie + `')">` + categories_menu.categories[i].categorie + `</a></li>`;
    document.getElementById("categories_menu").innerHTML += categories_list;
  }
}

function categories_filter(a) {
  var settings = JSON.parse(localStorage.getItem("echo_settings"));

  for (var i = 0; i < settings.length; i++) {
    if (settings[0] == settings[i]) {
      settings[0].select_categories = a;
      localStorage.setItem("echo_settings", JSON.stringify(settings));
      print_product_menu();
    }
  }
}

// Print Product
function print_product_menu() {
  document.getElementById("produt_list").innerHTML = "";
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  for (let i = 0; i < echo_database.product.length; i++) {
    var categories_list = JSON.parse(localStorage.getItem("echo_settings"));
    if (echo_database.product[i].categories == categories_list[0].select_categories || "all" == categories_list[0].select_categories) {
      var print_product_menu_html =
        `     <div class="products" onclick="show_product_detalis(` +
        echo_database.product[i].id +
        `)" data-drawer-trigger aria-controls="show_product_detalis" aria-expanded="false">
        <div class="img">
          <img src="` +
        echo_database.product[i].image +
        `" alt="" />
        </div>
        <div class="pro_details">
          <div class="pro_heading">` +
        echo_database.product[i].name +
        `</div>
          <div class="pro_decs"><p>` +
        echo_database.product[i].note +
        `</p></div>
          <div class="pro_rates">

            <span>Rs. ` +
        echo_database.product[i].price +
        `</span>
            <span><s>Rs.1200</s></span>
            <!-- <span>60% OFF</span> -->
          </div>
        </div>
      </div>`;
      document.getElementById("produt_list").innerHTML += print_product_menu_html;
    }
  }
}
// Print Product

function show_product_detalis(id) {
  document.getElementById("products_detail").innerHTML = "";
  var product = JSON.parse(localStorage.getItem("echo_products"));
  for (var i = 0; i < echo_database.product.length; i++) {
    if (id == echo_database.product[i].id) {
      settings[0].product_detiels_categories = echo_database.product[i].categories;
      localStorage.setItem("echo_settings", JSON.stringify(settings));
      var Note_list =
        `
        <div class="products_detail">
        <div class="product_detail_img_side">
          <div class="product_detail_img">
            <img src="` +
        echo_database.product[i].image +
        `" alt="" />
          </div>
          <div class="product_detail_btns">
            <button onclick="Add_to_cart(` +
        echo_database.product[i].id +
        `)"  data-drawer-close aria-label="Close Drawer"  data-drawer-trigger aria-controls="my_cart" aria-expanded="false">Add To Cart</button>
            <button>BUy Now</button>
          </div>
        </div>
        <div class="product_detail_dec">
          <div class="product_detail_heading">
            <h2>` +
        echo_database.product[i].name +
        `</h2>
          </div>
          <div class="product_detail_reviews">
            <span>199 Ratings & 34 Reviews</span>
          </div>
          <div class="product_detail_rate">
            <span>` +
        echo_database.product[i].price +
        `</span>
            <span><s>Rs. 1200</s></span>
          </div>

          <div class="product_detail_decs">
            <div class="product_detail_desc_heading">Description</div>
            <div class="product_detail_decs_p">
              <p>` +
        echo_database.product[i].note +
        `</p>
            </div>
          </div>
        </div>
      </div>
        `;
      document.getElementById("products_detail").innerHTML += Note_list;
    }
    show_product_detalis_print_list();
  }
}
function show_product_detalis_print_list() {
  document.getElementById("product_details_inside").innerHTML = "";
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  for (let i = 0; i < echo_database.product.length; i++) {
    var categories_list = JSON.parse(localStorage.getItem("echo_settings"));
    if (echo_database.product[i].categories == categories_list[0].product_detiels_categories) {
      var print_product_menu_html =
        `     <div class="products" onclick="show_product_detalis(` +
        echo_database.product[i].id +
        `)" data-drawer-trigger aria-controls="show_product_detalis" aria-expanded="false">
        <div class="img">
          <img src="` +
        echo_database.product[i].image +
        `" alt="" />
        </div>
        <div class="pro_details">
          <div class="pro_heading">` +
        echo_database.product[i].name +
        `</div>
          <div class="pro_decs"><p>` +
        echo_database.product[i].note +
        `</p></div>
          <div class="pro_rates">

            <span>Rs. ` +
        echo_database.product[i].price +
        `</span>
            <span><s>Rs.1200</s></span>
            <!-- <span>60% OFF</span> -->
          </div>
        </div>
      </div>`;
      document.getElementById("product_details_inside").innerHTML += print_product_menu_html;
    }
  }
}

function Add_to_cart(id) {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  for (var i = 0; i < echo_database.product.length; i++) {
    if (id == echo_database.product[i].id) {
      var id = echo_database.product[i].id;
      var image = echo_database.product[i].image;
      var name = echo_database.product[i].name;
      var price = echo_database.product[i].price;
      var note = echo_database.product[i].note;
      var categories = echo_database.product[i].categories;

      var push_my_cart = { id, name, price, note, image, categories };
      echo_database.my_cart.push(push_my_cart);
      localStorage.setItem("echo_database", JSON.stringify(echo_database));
    }
    my_cart_items_list();
  }
}

function my_cart_items_list() {
  document.getElementById("my_cart_items").innerHTML = "";
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  var cart_items_count = echo_database.my_cart.length;
  document.getElementById("my_cart_items_count_a").innerText = cart_items_count;
  for (let i = 0; i < cart_items_count; i++) {
    var my_cart_html =
      `
           <div class="products my_cart_item" onclick="show_product_detalis(` +
      echo_database.my_cart[i].id +
      `)">
      <div class="my_cart_uplerr_btn"  data-drawer-trigger aria-controls="show_product_detalis" aria-expanded="false"  data-drawer-close aria-label="Close Drawer"></div>
          <div class="img">
            <img src="` +
      echo_database.my_cart[i].image +
      `" alt="" />
          </div>
          <div class="pro_details">
            <div class="pro_heading">` +
      echo_database.my_cart[i].name +
      `</div>
            <div class="pro_decs"><p>` +
      echo_database.my_cart[i].note +
      `</p></div>
            <div class="pro_rates">
  
              <span>Rs. <spen  id="quantity_rate_` +
      echo_database.my_cart[i].id +
      `">` +
      echo_database.my_cart[i].price +
      `</spen> </span>
              <span><s >Rs.1200</s></span>
              <!-- <span>60% OFF</span> -->
            </div>
          </div>
          <div class="my_cart_btns">
          <a href="#"  onclick="decrementQuantityValue(` +
      echo_database.my_cart[i].id +
      `,` +
      echo_database.my_cart[i].price +
      ` );"><i class="bx bx-minus-circle"></i></a>
          <input type="text" disabled id="quantity_value_` +
      echo_database.my_cart[i].id +
      `" value="1" />
          <a href="#" onclick="incrementQuantityValue(` +
      echo_database.my_cart[i].id +
      `,` +
      echo_database.my_cart[i].price +
      `);"><i class="bx bx-plus-circle"></i></a>
          <a href="#" onclick="my_cart_delete(` +
      echo_database.my_cart[i].id +
      `)"><i class="bx bx-message-square-x"></i></a>
        </div>
        </div>
      `;
    document.getElementById("my_cart_items").innerHTML += my_cart_html;
  }
}

function incrementQuantityValue(id, price) {
  var input_val = document.getElementById("quantity_value_" + id);
  var input_rate = document.getElementById("quantity_rate_" + id);

  if (input_val.value >= 5) {
    input_val.style.backgroundColor = "red";
    input_val.style.color = "#fff";
  } else {
    input_val.value = parseInt(input_val.value) + 1;
    input_rate.innerHTML = price * input_val.value;
  }
}

function decrementQuantityValue(id, price) {
  var input_val = document.getElementById("quantity_value_" + id);
  var input_rate = document.getElementById("quantity_rate_" + id);

  if (input_val.value <= 1) {
    input_val.value = 1;
  } else {
    input_val.value = parseInt(input_val.value) - 1;
    input_val.style.backgroundColor = null;
    input_val.style.color = "#000";
    input_rate.innerHTML = price * input_val.value;
  }
}
function my_cart_delete(id) {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  for (var i = 0; i < echo_database.my_cart.length; i++) {
    if (id == echo_database.my_cart[i].id) {
      echo_database.my_cart.splice(i, 1);

      localStorage.setItem("echo_database", JSON.stringify(echo_database));
      my_cart_items_list();
    }
  }
}

function All_Function_Cell() {
  categories();
  print_product_menu();
  show_product_detalis_print_list();
  my_cart_items_list();
}

All_Function_Cell();

//  Slider
var drawer = function () {
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }

  //
  // Settings
  //
  var settings = {
    speedOpen: 50,
    speedClose: 350,
    activeClass: "is-active",
    visibleClass: "is-visible",
    selectorTarget: "[data-drawer-target]",
    selectorTrigger: "[data-drawer-trigger]",
    selectorClose: "[data-drawer-close]",
  };

  //
  // Methods
  //

  // Toggle accessibility
  var toggleccessibility = function (event) {
    if (event.getAttribute("aria-expanded") === "true") {
      event.setAttribute("aria-expanded", false);
    } else {
      event.setAttribute("aria-expanded", true);
    }
  };

  // Open Drawer
  var openDrawer = function (trigger) {
    // Find target
    var target = document.getElementById(trigger.getAttribute("aria-controls"));

    // Make it active
    target.classList.add(settings.activeClass);

    // Make body overflow hidden so it's not scrollable
    document.documentElement.style.overflow = "hidden";

    // Toggle accessibility
    toggleccessibility(trigger);

    // Make it visible
    setTimeout(function () {
      target.classList.add(settings.visibleClass);
    }, settings.speedOpen);
  };

  // Close Drawer
  var closeDrawer = function (event) {
    // Find target
    var closestParent = event.closest(settings.selectorTarget),
      childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');

    // Make it not visible
    closestParent.classList.remove(settings.visibleClass);

    // Remove body overflow hidden
    document.documentElement.style.overflow = "";

    // Toggle accessibility
    toggleccessibility(childrenTrigger);

    // Make it not active
    setTimeout(function () {
      closestParent.classList.remove(settings.activeClass);
    }, settings.speedClose);
  };

  // Click Handler
  var clickHandler = function (event) {
    // Find elements
    var toggle = event.target,
      open = toggle.closest(settings.selectorTrigger),
      close = toggle.closest(settings.selectorClose);

    // Open drawer when the open button is clicked
    if (open) {
      openDrawer(open);
    }

    // Close drawer when the close button (or overlay area) is clicked
    if (close) {
      closeDrawer(close);
    }

    // Prevent default link behavior
    if (open || close) {
      event.preventDefault();
    }
  };

  // Keydown Handler, handle Escape button
  var keydownHandler = function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      // Find all possible drawers
      var drawers = document.querySelectorAll(settings.selectorTarget),
        i;

      // Find active drawers and close them when escape is clicked
      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  //
  // Inits & Event Listeners
  //
  document.addEventListener("click", clickHandler, false);
  document.addEventListener("keydown", keydownHandler, false);
};

drawer();
