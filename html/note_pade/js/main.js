document.getElementById("Add_btn").addEventListener("click", function () {
  document.getElementById("input_form").style.display = "flex";
  setTimeout(function () {
    document.getElementById("inner_input_form").style.top = "7rem";
  }, 10);
});

function cluse() {
  document.getElementById("inner_input_form").style.top = "-100rem";
  setTimeout(function () {
    document.getElementById("input_form").style.display = "none";
  }, 100);
}

var Notes = JSON.parse(localStorage.getItem("Notes"));
if (Notes === null) {
  Notes = [];
  Notes = [
    {
      id: 0,
      Title: "Sonu SAini",
      Content: "Sonu Saini",
      currentDate: "9/20/2021 - 1:54",
    },
  ];
  localStorage.setItem("Notes", JSON.stringify(Notes));
}

var idupnote = JSON.parse(localStorage.getItem("idupnote"));
if (idupnote === null) {
  idupnote = [];
  var idupnote = 1;
  localStorage.setItem("idupnote", JSON.stringify(idupnote));
}

function AddNote() {
  var id = idupnote;
  var Title = document.getElementById("Title").value;
  var Content = document.getElementById("Content").value;

  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  var date = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
  var currentDate = date + " - " + time;

  if (Title != "" && Content != "") {
    var pushFood = { id, Title, Content, currentDate };
    Notes.push(pushFood);
    localStorage.setItem("Notes", JSON.stringify(Notes));
    idupnote++;
    localStorage.setItem("idupnote", JSON.stringify(idupnote));
  } else {
    alert("Enter Plasea");
  }
  cluse();
  document.getElementById("Title").value = '';
  document.getElementById("Content").value = '';
  Noteprinf();
}

function Noteprinf() {
  document.getElementById("notes_list").innerHTML = "";
  var Notes = JSON.parse(localStorage.getItem("Notes"));
  for (let i = 0; i < Notes.length; i++) {
    var Note_list =
      ` <div class="notes " id="Note` +
      Notes[i].id +
      `">
      <div class="note_title">
        <div class="note_litale">` +
      Notes[i].Title +
      `</div>
        <div class="note_date"><i class="far fa-clock mr-5 fs-10"></i> &nbsp;<span>` +
      Notes[i].currentDate +
      `</span></div>
      </div>
      <div class="note_text">` +
      Notes[i].Content +
      `</div>
      <div class="icons">
        <a href="#" class="todo-item-complete" data-toggle="tooltip" title="Complete" onclick="Complete(` +
      Notes[i].id +
      `)"><i class="far fa-check-circle"></i></a>
        <a href="#" class="todo-item-delete" data-toggle="tooltip" title="Delete" onclick="DeleteNote(` +
      Notes[i].id +
      `)"><i class="far fa-trash-alt"></i></a>
        <a href="#" class="todo-item-favorite" data-toggle="tooltip" title="Favorite" onclick="favorite(` +
      Notes[i].id +
      `)" ><i class="far fa-star"></i></a>
      </div>
    </div>`;
    document.getElementById("notes_list").innerHTML += Note_list;
  }
}
function Complete(id) {
  var Complete = document.getElementById("Note" + id);
  Complete.classList.toggle("Complete");
}
function favorite(id) {
  var favorite = document.getElementById("Note" + id);
  favorite.classList.toggle("favorite");
}

function DeleteNote(id) {
  for (var i = 0; i < Notes.length; i++) {
    if (id == Notes[i].id) {
      Notes.splice(i, 1);

      localStorage.setItem("Notes", JSON.stringify(Notes));
      Noteprinf();
    }
  }
}

Noteprinf();
