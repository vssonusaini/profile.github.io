const themeToggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Check if the user has a saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("bx-sun");
  themeIcon.classList.add("bx-moon");
}

// Toggle theme on button click
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle icon between sun and moon
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");

    // Save the theme preference in localStorage
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("bx-moon");
    themeIcon.classList.add("bx-sun");

    // Save the theme preference in localStorage
    localStorage.setItem("theme", "light");
  }
});

const appWorker = () => {
  const rowName = document.getElementById("rowName");
  const rowCountStart = document.getElementById("rowStart");
  const rowCountEnd = document.getElementById("rowEnd");

  const selfCount = document.getElementById("selfCount");
  const selfBinCount = document.getElementById("selfBinCount");
  const rowsubCountEnd = document.getElementById("rowCountEnd");
  const generateRackBTN = document.getElementById("generateRack");

  const rackLocation = [];
  const add_zero = (your_number, length) => {
    var num = "" + your_number;
    while (num.length < length) {
      num = "0" + num;
    }
    return num;
  };

  const selfCountStart = 1;
  const selfCountEnd = 4;
  const binCount = 6;

  const generateRack = () => {
    for (let i = rowCountStart.value; i <= rowCountEnd.value; i++) {
      for (let j = 1; j <= selfCount.value; j++) {
        for (let k = 1; k <= selfBinCount.value; k++) {
          for (let l = 1; l <= rowsubCountEnd.value; l++) {
            // Format the string as per the given pattern
            rackLocation.push(
              `${rowName.value}-${add_zero(i, 2)}-${String.fromCharCode(
                64 + j
              )}-${k}-${l}`
            );
            document.getElementById("rackDisplay").innerHTML += `<option>${
              rowName.value
            }-${add_zero(i, 2)}-${String.fromCharCode(
              64 + j
            )}-${k}-${l}</option>`;
            console.log(
              `A-${add_zero(i, 2)}-${String.fromCharCode(64 + j)}-${k}-${l}`
            );
          }
        }
      }
    }
  };

  generateRackBTN.addEventListener("click", generateRack);

  function DownloadJSON2CSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = new Array();

      for (var index in array[i]) {
        line.push(array[i][index]);
      }

      str += line.join("");
      str += "\r\n";
    }
    window.open("data:text/csv;charset=utf-8," + encodeURIComponent(str));
  }

  const dowloadBtn = () => {
    DownloadJSON2CSV(rackLocation);
  };

  document.getElementById("make").addEventListener("click", dowloadBtn);
};

(function () {
  const allowedDomain = "sainisahab.com";

  if (
    window.location.hostname === allowedDomain ||
    window.location.hostname.endsWith(`.${allowedDomain}`)
  ) {
    console.log("This script is running on the allowed tokan.");
    appWorker();
    // Your secure JavaScript code here
  } else {
    console.error("Unauthorized tokan detected. Stopping execution.");
    document.body.innerHTML = "<div class='error'>Unauthorized tokan !</div>"; // Block content if unauthorized
    // throw new Error("Unauthorized tokan. Script execution blocked.");
  }
})();
