var datebase = {
  name: "Sonu Saini",
  add: "Near Mata Mandir, Garhi Harsaru",
  mobile: "9812846715",
  distt: "Gurugram, Haryana - 122505",
  mail: "vssonusaini464@gmail.com",
  objective: "Challenging and rewarding position, build up on education and experience with an organization that promotes professional advancement and personal growth.",
  qualification_a: {
    course: "10th",
    college: "Government Senior Secondary School",
    year: "2018",
    aggregate: "73.6%",
  },
  qualification_b: {
    course: "Web Developer",
    college: "Indian Institute of Hardware Technology",
    year: "2019",
    aggregate: "-",
  },
  technical_skills: {
    languages: ["Proficient in: Bootstrap, HTML5, CSS3, JavaScript, jQuery, JSON, C, C++.", "Moderate in: PHP"],
    software_t: ["Database: SQL Server", "Platforms: Microsoft Windows and Linux.", "Others: Microsoft Office, Adobe Photoshop & Dreamweaver."],
    hardware: ["Computer assembling and all types of software installation."],
  },
};

document.getElementById("name").innerText = datebase.name;
document.getElementById("add").innerText = datebase.add;
document.getElementById("mobile").innerText = datebase.mobile;
document.getElementById("distt").innerText = datebase.distt;
document.getElementById("mail").innerText = datebase.mail;
document.getElementById("objective").innerText = datebase.objective;

function print_btn() {
  var backup = document.body.innerHTML;
  var divcontent = document.getElementById("resume").innerHTML;
  document.body.innerHTML = divcontent;
  window.print();
  document.body.innerHTML = backup;
}
