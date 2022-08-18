navigator.serviceWorker.register("/html/online-qrcode-generator-tool/sw.js");
$(function () {
  // run the currently selected effect
  function runEffect() {
    // Run the effect
    $(".setting_block").toggle("slide", 100);
  }

  // Set effect from select menu value
  $(".setting_btn").on("click", function () {   
    runEffect();
  });
});
