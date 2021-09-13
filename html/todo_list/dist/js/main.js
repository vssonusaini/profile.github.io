var Notes = JSON.parse(localStorage.getItem("Notes"));
if (Notes === null) {
  Notes = [];
  Notes = [
    {
      id: 0,
      Note_title: "Sonu SAin",
      tage: "Sonu",
      date: "Sonu",
      time: "12;23",
      Description: "jh tgfusykda",
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
  var Note_title = document.getElementById("Note_title").value;
  var tage = document.getElementById("tage").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var Description = document.getElementById("Description").value;
  if (Note_title != "" && tage != "" && date != "" && time != "" && Description != "") {
    var pushFood = { id, Note_title, tage, date, time, Description };
    Notes.push(pushFood);
    localStorage.setItem("Notes", JSON.stringify(Notes));
    idupnote++;
    localStorage.setItem("idupnote", JSON.stringify(idupnote));

    var Note_title = (document.getElementById("Note_title").value = "");
    var tage = (document.getElementById("tage").value = "");
    var date = (document.getElementById("date").value = "");
    var time = (document.getElementById("time").value = "");
    var Description = (document.getElementById("Description").value = "");
  } else {
    alert("Enter Plasea");
  }
}

function Noteprinf() {
  document.getElementById("Note_list").innerHTML = "";
  var Notes = JSON.parse(localStorage.getItem("Notes"));
  for (let i = 0; i < Notes.length; i++) {
    var Note_list =
      `  <li class="list-group-item gap-3" data-detail-url="./todo-detail.html">
      <div class="flex-shrink-0">
        <i class="todo-sortable-handle fas fa-arrows-alt"></i>
      </div>
      <div class="flex-shrink-0">
        <input class="form-check-input" type="checkbox" />
      </div>
      <div class="flex-shrink-0">
        <i class="far fa-star"></i>
      </div>
      <div class="flex-grow-1 d-flex align-items-center justify-content-between">
        <div class="text-truncate">` +
      Notes[i].Note_title +
      `</div>
        <div class="ps-3 d-flex gap-3 align-items-center flex-shrink-0">
          <div class="d-sm-inline d-none">
            <div class="badge bg-danger">` +
      Notes[i].tage +
      `</div>
          </div>
          <div class="dropdown">
            <a href="#" class="btn btn-floating btn-sm" data-bs-toggle="dropdown">
              <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#">View Detail</a>
              <a class="dropdown-item" href="#">Edit</a>
              <a class="dropdown-item" href="#">Clone</a>
              <a class="dropdown-item" href="#">Make an Assignment</a>
              <a class="dropdown-item text-danger"  href="#" onclick="DeleteNote(` +
      Notes[i].id +
      `)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </li>`;
    document.getElementById("Note_list").innerHTML += Note_list;
  }
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
