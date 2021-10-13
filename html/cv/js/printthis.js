function scaleCv() {
  document.body.classList.add("scale-cv");
}

function removeScale() {
  document.body.classList.remove("scale-cv");
}

let resumeButton = document.getElementById("resumeButton");

var pdf = document.getElementById("resume");
var opt = {
  margin: 5,
  filename: "sonusainiCV.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 5 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

resumeButton.addEventListener("click", function () {
  scaleCv();

  print();

  setTimeout(removeScale, 1000);
});
function print() {
  html2pdf(pdf, opt);
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

document.getElementById("date").innerHTML = today;
