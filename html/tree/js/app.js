// --ui script------
document.documentElement.style.setProperty("--animate-duration", ".2s");
$(function () {
  $("#user_details").tabs();
  $("#user_login_singup").tabs();
  $("#root_tabs").tabs();

  // run the currently selected effect
  function user_details() {
    $("#user_details").toggle("slide", 100);
  }
  function user_login_singup_toggle() {
    $("#user_login_singup").toggle("slide", 100);
  }

  // Set effect from select menu value
  $("#user_toggle").on("click", function () {
    user_details();
  });
  $("#user_login_singup_toggle").on("click", function () {
    user_login_singup_toggle();
  });
});

// ----End-ui script------

// -------checkLogin----
function checkLogin() {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  if (echo_database.echo_status.login_label == -1) {
    console.log("plases Login");
  } else if (echo_database.echo_status.login_label == 0) {
    // -----------Root User------
    document.getElementById("admin_btn").style.display = "block";
    document.getElementById("user_toggle").style.display = "flex";
    document.getElementById("user_login_singup_toggle").style.display = "none";
    document.getElementById("user_name").innerText = echo_database.echo_status.login_user_name;
    console.log("root");
  } else if (echo_database.echo_status.login_label == 1) {
    // ---normal user----
    document.getElementById("user_toggle").style.display = "flex";
    document.getElementById("user_login_singup_toggle").style.display = "none";
    console.log("normal");
    document.getElementById("user_name").innerText = echo_database.echo_status.login_user_name;
  }
}

//-------- login-singup

function singup() {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  var id = echo_database.echo_status.upid;
  var user_name = document.getElementById("sing_nser_name").value;
  var user_password = document.getElementById("sing_user_password").value;
  var user_password_confirm = document.getElementById("sing_user_password_con").value;
  var user_lable = "1";
  var singup_user = { id, user_name, user_password, user_password_confirm, user_lable };

  for (var i = 0; i < echo_database.account.length; i++) {
    if (user_name == echo_database.account[i].user_name) {
      console.log("hai");
      document.getElementById("sing_up_status").innerHTML = "this username is already in use";
      return;
    }
  }

  if (user_password == user_password_confirm) {
    echo_database.echo_status.upid = parseInt(echo_database.echo_status.upid) + 1;

    echo_database.account.push(singup_user);
    localStorage.setItem("echo_database", JSON.stringify(echo_database));
    document.getElementById("sing_up_status").innerHTML = "Your account has been created";
    var user_name = (document.getElementById("sing_nser_name").value = "");
    var user_password = (document.getElementById("sing_user_password").value = "");
    var user_password_confirm = (document.getElementById("sing_user_password_con").value = "");
  } else {
    document.getElementById("sing_up_status").innerHTML = "Password do not match!";
  }
}

function Login() {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  var login_user_name = document.getElementById("login_user_name").value;
  var login_user_password = document.getElementById("login_user_password").value;

  for (i = 0; i < echo_database.account.length; i++) {
    if (login_user_name == echo_database.account[i].user_name && login_user_password == echo_database.account[i].user_password) {
      echo_database.echo_status.login_label = echo_database.account[i].user_lable;
      echo_database.echo_status.login_user_name = echo_database.account[i].user_name;
      localStorage.setItem("echo_database", JSON.stringify(echo_database));
      document.getElementById("statusLogin").innerHTML = "Logged in successfully";
      location.reload();
      return;
    } else {
      document.getElementById("statusLogin").innerHTML = "wrong password or account";
    }
  }
}

function Logout() {
  echo_database.echo_status.login_label = "-1";
  localStorage.setItem("echo_database", JSON.stringify(echo_database));
  checkLogin();
  location.reload();
}

// Print Product

function show_product_detalis(id) {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  document.getElementById("products_detail").innerHTML = "";

  for (var i = 0; i < echo_database.product.length; i++) {
    if (id == echo_database.product[i].id) {
      echo_database.echo_status.product_list_categories = echo_database.product[i].categories;
      localStorage.setItem("echo_database", JSON.stringify(echo_database));

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
    if (echo_database.product[i].categories == echo_database.echo_status.product_list_categories) {
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

// -----add to my cart
function Add_to_cart(id) {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

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

// -----cart list
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

function categories() {
  document.getElementById("categories_menu").innerHTML = null;
  var categories_menu = JSON.parse(localStorage.getItem("echo_database"));

  for (var i = 0; i < categories_menu.categories.length; i++) {
    var categories_list = `<li class="` + categories_menu.categories[i].active + `" ><a  onclick="categories_filter('` + categories_menu.categories[i].categorie + `','` + i + `')">` + categories_menu.categories[i].categorie + `</a></li>`;
    document.getElementById("categories_menu").innerHTML += categories_list;
  }
}

function categories_filter(a, id) {
  var categories_menu = JSON.parse(localStorage.getItem("echo_database"));

  categories_menu.echo_status.select_categories = a;

  for (var i = 0; i < categories_menu.categories.length; i++) {
    if (i == id) {
      categories_menu.categories[i].active = "ui-state-active";
    } else {
      categories_menu.categories[i].active = "";
    }
  }
  localStorage.setItem("echo_database", JSON.stringify(categories_menu));
  print_product_menu();
  categories();
}

// Print Product
function print_product_menu() {
  document.getElementById("produt_list").innerHTML = "";
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  for (let i = 0; i < echo_database.product.length; i++) {
    if (echo_database.product[i].categories == echo_database.echo_status.select_categories || "all" == echo_database.echo_status.select_categories) {
      var print_product_menu_html =
        `     <div class="products animate__animated animate__fadeInDown" onclick="show_product_detalis(` +
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

// --footer-

function Footer() {
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));
  var footer_sort = echo_database.site_settings.footer;
  document.getElementById("footer").innerHTML = "";
  var footer_html =
    `<div class="footer_grid">
  <aside>
    <div class="logo">
      <span>` +
    footer_sort.logo +
    `</span>
    </div>
    <p>` +
    footer_sort.footer_desc +
    `</p>
  </aside>
  <div>
    <ul id="footer_links">
   
    </ul>
  </div>
</div>`;

  document.getElementById("footer").innerHTML = footer_html;
  for (var i = 0; i < footer_sort.links.length; i++) {
    console.log("a");
    var footer_links = '<li><a href="' + footer_sort.links[i].link_href + '">' + footer_sort.links[i].link_name + "</a></li>";
    document.getElementById("footer_links").innerHTML += footer_links;
  }
}

// ---root
// Print Product
function add_items_list() {
  document.getElementById("add_product_list").innerHTML = "";
  var echo_database = JSON.parse(localStorage.getItem("echo_database"));

  for (let i = 0; i < echo_database.product.length; i++) {
    var add_items_html =
      `
    <div class="add_product_item">
    <div class="item_img">
      <img src="` +
      echo_database.product[i].image +
      `" alt="" />
    </div>
    <div class="item_details">
      <div class="item_heading">` +
      echo_database.product[i].name +
      `</div>
      <div class="item_desc"><p>` +
      echo_database.product[i].note +
      `</p></div>
      <div class="item_action">
        <div class="item_price"><span>Price </span> ` +
      echo_database.product[i].price +
      `</div>
        <div class="item_categorie">Categorie :  ` +
      echo_database.product[i].categories +
      `</div>
      </div>
    </div>
    <div class="item_active">
  <div>
  <input type="checkbox" id="items_` +
      echo_database.product[i].id +
      `" />
  <label for="items_` +
      echo_database.product[i].id +
      `">Active</label>
  </div>
  <a href="#">edit </a>
  <a href="#">delete </a>
    </div>
  </div>`;

    document.getElementById("add_product_list").innerHTML += add_items_html;
  }
}

// call all function
function call_all_function() {
  checkLogin();
  categories();
  print_product_menu();
  my_cart_items_list();
  Footer();

  // -root
  add_items_list();
}

call_all_function();
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
    speedOpen: 10,
    speedClose: 200,
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
