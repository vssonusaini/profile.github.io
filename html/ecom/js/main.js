// --------accounts Users````````````````````````````````````
var account = JSON.parse(localStorage.getItem("account"));
if (account === null) {
  account = [];
  var account = [
    {
      id: 0,
      username: "admin",
      password: "123456",
      level: 1,
    },
    {
      id: 1,
      username: "b",
      password: "b",
      level: 0,
    },
    {
      id: 2,
      username: "a",
      password: "a",
      level: 0,
    },
  ];
  localStorage.setItem("account", JSON.stringify(account));
}
// -------User counts------
var idup = JSON.parse(localStorage.getItem("idup"));
if (idup === null) {
  idup = [];
  var idup = 3;
  localStorage.setItem("idup", JSON.stringify(idup));
}

// -------checkLogin----
var checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
if (checkLogin === null) {
  checkLogin = [];
  var checkLogin = -1;
  localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
}
if (checkLogin == -1) {
} else if (account[checkLogin].level == 0) {
  // -----------Root User------
  document.getElementById("statusLogin").innerHTML = "Logged in successfully";
  document.getElementById("username").innerHTML = account[checkLogin].username;
  document.getElementById("menu_account_login").style.display = "block";
  document.getElementById("menu_login_button").style.display = "none";
  document.getElementById("hello_user").innerHTML = "Hello " + account[checkLogin].username + " !";
} else if (account[checkLogin].level == 1) {
  // ------------normal User---------
  document.getElementById("statusLogin").innerHTML = "Logged in successfully";
  document.getElementById("username").innerHTML = account[checkLogin].username;
  document.getElementById("menu_account_login").style.display = "block";
  document.getElementById("admin").style.display = "block";
  document.getElementById("menu_login_button").style.display = "none";
  document.getElementById("hello_user").innerHTML = "Hello  " + account[checkLogin].username + " !";
}

// ------login------
function Login() {
  for (i = 0; i < account.length; i++) {
    if (document.getElementById("usernameLogin").value == account[i].username && document.getElementById("passwordLogin").value == account[i].password) {
      checkLogin = account[i].id;
      localStorage.setItem("checkLogin", JSON.stringify(checkLogin));

      if (account[i].level == 0) {
        document.getElementById("statusLogin").innerHTML = "Logged in successfully";
        document.getElementById("username").innerHTML = account[i].username;
        document.getElementById("menu_account_login").style.display = "block";
        document.getElementById("menu_login_button").style.display = "none";
        document.getElementById("hello_user").innerHTML = "Hello " + account[i].username + " !";

        location.reload();
      } else if (account[i].level == 1) {
        document.getElementById("statusLogin").innerHTML = "Logged in successfully";
        document.getElementById("username").innerHTML = account[i].username;
        document.getElementById("menu_account_login").style.display = "block";
        document.getElementById("menu_login_button").style.display = "none";
        document.getElementById("hello_user").innerHTML = "Hello " + account[i].username + " !";

        location.reload();
      }
    }
  }
  if (checkLogin == -1) {
    document.getElementById("statusLogin").innerHTML = "sai mật khẩu hoặc tài khoản";
  }
}

function Logout() {
  document.getElementById("menu_account_login").style.display = "none";
  document.getElementById("menu_login_button").style.display = "block";
  checkLogin = -1;
  localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
}

function Noteprinf() {
  document.getElementById("product_list").innerHTML = "";
  var Notes = JSON.parse(localStorage.getItem("Notes"));
  for (let i = 0; i < 5; i++) {
    var Note_list = `   <div class="products">
        <div class="img">
          <img src="./image/foody-upload-api-foody-mobile-canadian-lobster-res-180711100420.jpg" alt="" />
        </div>
        <div class="detelis">
          <div class="rating">
            <div class="product_rateing_icons"><i class="bx bx-star"></i><i class="bx bx-star"></i><i class="bx bx-star"></i><i class="bx bx-star"></i></div>
            <div class="product_rate">Rs: 100.0</div>
          </div>
          <div class="product_title">Grilled Lamb Thighs</div>
          <div class="p">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque vitae optio odio!</p>
          </div>
          <div class="product_add_btn">
            <button>Add</button>
          </div>
        </div>
      </div>`;
    document.getElementById("product_list").innerHTML += Note_list;
  }
}

Noteprinf();
