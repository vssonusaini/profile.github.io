// nav_bar_mo
document.getElementById("mobile_toggle").addEventListener("click", mobile_toggle);
function mobile_toggle() {
          var mobile_toggle = document.getElementById("pc_menu");
          mobile_toggle.classList.toggle("pc_menu_toggle");
}


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

document.getElementById("search_btn").addEventListener("click", search_btn);
function search_btn() {
          document.getElementById('search_bar_div').style.display = 'block';
          document.getElementById('main_bar_div').style.display = 'none';
}
document.getElementById("remove_search_btn").addEventListener("click", remove_search_btn);
function remove_search_btn() {
          document.getElementById('search_bar_div').style.display = 'none';
          document.getElementById('main_bar_div').style.display = 'flex';
}

$('.full_img').owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          autoHeight: false,
          autoWidth: false,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: true,
          responsive: {
                    0: {
                              items: 1
                    },
                    600: {
                              items: 3
                    },
                    1000: {
                              items: 1
                    }
          }
});
