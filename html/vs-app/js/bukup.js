const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onstart = function () {
  console.log("var Active");
};

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();

  console.log(`My Word ${transcript}`);

  if (transcript.includes("hello pawan")) {
    readOut("Hello Sir");
  }
  if (transcript.includes("open youtub")) {
    readOut("opening youtub Sir");
    window.open("https://www.youtube.com/");
  }
  if (transcript.includes("himanshu")) {
    readOut("Hello Sonu Sir i Am himanshu can i help you");
  }
};

recognition.onend = function () {
  console.log("vr Deactive");
};

recognition.continuous = true;
startBtn.addEventListener("click", () => {
  recognition.start();
});

stopBtn.addEventListener("click", () => {
  recognition.stop();
});

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const Allvoices = speechSynthesis.getVoices();

  speech.text = message;
  speech.voice = Allvoices[12];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking Out");
}

speakBtn.addEventListener("click", () => {
  readOut("Hi my name Is Sonu Saini");
});
