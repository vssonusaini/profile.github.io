const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;

// recognition.onstart = function () {
//   console.log("var Active");
// };

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();

  if (transcript.includes("input")) {
    readOut("input voice ");
    console.o;
  }

  // ------------------------------------------------------------------------------------

  if (transcript.includes("mera phone number kya hai")) {
    readOut("9812846715");
  }
};

recognition.onend = function () {
  console.log("vr Deactive");
};

recognition.start();
// recognition.continuous = true;
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
  speech.voice = Allvoices[2];
  speech.volume = 4;
  window.speechSynthesis.speak(speech);
  console.log("Speaking Out");
}

speakBtn.addEventListener("click", () => {
  readOut("Hi my name Is Sonu Saini");
});
