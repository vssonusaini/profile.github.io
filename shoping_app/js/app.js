// nav_bar_mo
document.getElementById("user_profile_btn").addEventListener("click", user_profile);
function user_profile() {
          var user_profile_div = document.getElementById("user_profile_div");
          user_profile_div.classList.toggle("user_profile_toggle");
}


document.getElementById("login_btn").addEventListener("click", login);
function login() {
          var login = document.getElementById("login_signin");
          login.classList.toggle("login_signin_toggle");
}


document.getElementById("move_login").addEventListener("click", move_login);
function move_login() {
          document.getElementById('login_div').style.display = 'block';
          document.getElementById('sign_div').style.display = 'none';
}
document.getElementById("move_Sign").addEventListener("click", move_Sign);
function move_Sign() {
          document.getElementById('login_div').style.display = 'none';
          document.getElementById('sign_div').style.display = 'block';
}




