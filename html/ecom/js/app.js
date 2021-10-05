function login_form() {
  var menu_toggle_Icons = document.querySelector(".slider_form");
  menu_toggle_Icons.classList.toggle("login_form_class");

  setTimeout(function () {
    var menu_toggle_Icons = document.querySelector(".login_form");
    menu_toggle_Icons.classList.toggle("login_class");
  }, 100);
}

function cluse() {
  var menu_toggle_Icons = document.querySelector(".login_form");
  menu_toggle_Icons.classList.toggle("login_class");

  setTimeout(function () {
    var menu_toggle_Icons = document.querySelector(".slider_form");
    menu_toggle_Icons.classList.toggle("login_form_class");
  }, 100);
}

function singup_form_toggle() {
  document.getElementById("login").style.display = "none";
  document.getElementById("sign_up").style.display = "flex";
  document.querySelector(".login_form").setAttribute("style", "height:22rem");
  document.getElementById("Heading_Value").innerText = "Sing Up";
}

function login_form_toggle() {
  document.getElementById("login").style.display = "flex";
  document.getElementById("sign_up").style.display = "none";
  document.getElementById("Heading_Value").innerText = "Login";
  document.querySelector(".login_form").setAttribute("style", "height:18rem");
}

function app() {
  Swal.fire({
    title: "Custom width, padding, background.",
    width: 600,
    padding: "3em",
    background: "#fff url(/images/trees.png)",
    filter: `
      blur(2px)
      `,
  });
}
