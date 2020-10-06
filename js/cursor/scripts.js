      var mouse = {
          x: 0,
          y: 0
      };
      var pos = {
          x: 0,
          y: 0
      };
      var ratio = 0.15;
      var active = false;
      var ball = document.querySelector('.element-item');
      TweenLite.set(ball, {
          xPercent: -50,
          yPercent: -50
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          mouse.x = e.pageX;
          mouse.y = e.pageY - scrollTop;
      }
      TweenMax.ticker.addEventListener("tick", updatePosition);
      function updatePosition() {
          if (!active) {
              pos.x += (mouse.x - pos.x) * ratio;
              pos.y += (mouse.y - pos.y) * ratio;
              TweenMax.set(ball, {
                  x: pos.x,
                  y: pos.y
              });
          }
      }
