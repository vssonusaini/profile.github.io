const scriptURL = "https://script.google.com/macros/s/AKfycbw3ftsjsJb4JMRtUbG9011cEXkaj4vN7HISzQc4Ds45iS8OBYDuGjZp9FZAp83oR0I/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
   if (form["Name"].value !== "" && form["Phone"].value !== "" && form["Email"].value !== "" && form["Message"].value !== "") {
    document.getElementById("from_btn").innerText = "Loading...";
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        document.getElementById("from_btn").innerText = "Done";
        alert("Thanks for Contacting us..! We Will Contact You Soon...");
      })
      .catch((error) => console.error("Error!", error.message));
  } else {
    alert("All Input Field required ");
  }
});

let add = ["😀", "😃", "😄", "😁", "😱", "🤪", "😛", "😋"];

let app = () => {
  window.location.hash = add[Math.floor((Date.now() / 100) % add.length)];
  setTimeout(app, 300);
};
