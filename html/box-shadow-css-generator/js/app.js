function get() {
          var Horizontal = document.getElementById('Horizontal').value;
          document.getElementById('Horizontal_post').innerHTML = Horizontal + "px";
          var Vertical = document.getElementById('Vertical').value;
          document.getElementById('Vertical_post').innerHTML = Vertical + "px";
          var Blur = document.getElementById('Blur').value;
          document.getElementById('Blur_post').innerHTML = Blur + "px";
          var Spread = document.getElementById('Spread').value;
          document.getElementById('Spread_post').innerHTML = Spread + "px";
          var color = document.getElementById('color').value;
          document.getElementById('color_post').innerHTML = color;

          document.getElementById('box_shadow').innerHTML = 'box-shadow: ' + Horizontal + 'px ' + Vertical + 'px ' + Blur + 'px ' + Spread + 'px ' + color + ";";
          document.getElementById('webkit').innerHTML = ' -webkit-box-shadow: ' + Horizontal + 'px ' + Vertical + 'px ' + Blur + 'px ' + Spread + 'px ' + color + ";";
          document.getElementById('moz').innerHTML = '-moz-box-shadow: ' + Horizontal + 'px ' + Vertical + 'px ' + Blur + 'px ' + Spread + 'px ' + color + ";";

          document.getElementById('shadow_box').style.boxShadow = `${Horizontal + 'px'} ${Vertical + 'px'} ${Blur + 'px'} ${Spread + 'px'} ${color}`;
          window.requestAnimationFrame(get);
}
window.requestAnimationFrame(get);

