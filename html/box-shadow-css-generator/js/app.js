function get() {
  var Horizontal = document.getElementById("Horizontal").value;
  document.getElementById("Horizontal_post").innerHTML = Horizontal + "px";
  var Vertical = document.getElementById("Vertical").value;
  document.getElementById("Vertical_post").innerHTML = Vertical + "px";
  var Blur = document.getElementById("Blur").value;
  document.getElementById("Blur_post").innerHTML = Blur + "px";
  var Spread = document.getElementById("Spread").value;
  document.getElementById("Spread_post").innerHTML = Spread + "px";
  var color = document.getElementById("color").value;
  document.getElementById("color_post").innerHTML = color;
  var Background_color = document.getElementById("Background_color").value;
  document.getElementById("color_post_Background_color").innerHTML = Background_color;
  document.getElementById("main_div").style.backgroundColor = Background_color;

  var shadow_box = document.getElementById("Tool_Box_Color").value;
  document.getElementById("Tool_Box_Color_value").innerHTML = shadow_box;
  document.getElementById("shadow_box").style.backgroundColor = shadow_box;

  document.getElementById("box_shadow").innerHTML = "box-shadow: " + Horizontal + "px " + Vertical + "px " + Blur + "px " + Spread + "px " + color + ";";
  document.getElementById("webkit").innerHTML = " -webkit-box-shadow: " + Horizontal + "px " + Vertical + "px " + Blur + "px " + Spread + "px " + color + ";";
  document.getElementById("moz").innerHTML = "-moz-box-shadow: " + Horizontal + "px " + Vertical + "px " + Blur + "px " + Spread + "px " + color + ";";

  document.getElementById("shadow_box").style.boxShadow = `${Horizontal + "px"} ${Vertical + "px"} ${Blur + "px"} ${Spread + "px"} ${color}`;
  window.requestAnimationFrame(get);
}
window.requestAnimationFrame(get);

// =====copy_btn----
function copy_btn() {
  var copyText = document.getElementById("box_shadow");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}
