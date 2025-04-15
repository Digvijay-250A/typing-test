const input = document.getElementById("typenow");
const target = document.getElementById("targetText");
const bt = document.getElementById("bt");
const timerDisplay = document.getElementById("timer");
const mistakesDisplay = document.getElementById("mistakes");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let currentSentence = "";
let timer;
let time = 0;
let timerStarted = false;
let testRunning = false;
let totalMistakes = 0;

const passages = [
  "The sun rose slowly over the hills, casting golden light across the valley where children played and birds chirped in the morning breeze with joy.",
  "In a quiet village nestled between mountains, an old man told stories of dragons, brave warriors, and magical forests that echoed through generations with wonder.",
  "Rain tapped gently on the windowpane as she sipped her tea, lost in thoughts of old memories, warm smiles, and soft laughter from long ago.",
  "He walked along the beach, leaving footprints behind him as the waves came and went, erasing the path like time gently washing away yesterday’s steps.",
  "Books stacked high on the dusty shelves whispered secrets of adventures, forgotten lands, and curious minds that once wandered through pages filled with dreams and tales."
];

function fetchRandomSentence() {
  const randomIndex = Math.floor(Math.random() * passages.length);
  currentSentence = passages[randomIndex];
  target.textContent = currentSentence;
  input.value = "";
  input.focus();
  input.disabled = false;
  resetTimer();
  startTimer();
  totalMistakes = 0;
  mistakesDisplay.textContent = totalMistakes;
  wpmDisplay.textContent = "";
  accuracyDisplay.textContent = "";
  testRunning = true;
}

function checkInput() {
  const userText = input.value;
  const targetText = currentSentence;
  let currentMistakes = 0;
  let correctChars = 0;

  for (let i = 0; i < userText.length; i++) {
    if (userText[i] === targetText[i]) {
      correctChars++;
    } else {
      currentMistakes++;
    }
  }

  if (currentMistakes > totalMistakes) {
    totalMistakes = currentMistakes;
    mistakesDisplay.textContent = totalMistakes;
  }

  // Live accuracy
  if (userText.length > 0) {
    const accuracy = Math.round((correctChars / userText.length) * 100);
    accuracyDisplay.textContent = `${accuracy}%`;
  } else {
    accuracyDisplay.textContent = "";
  }
}

function calculateWPM(textTyped) {
  const wordCount = textTyped.trim().split(/\s+/).filter(word => word !== "").length;
  const minutes = time / 60;
  const wpm = minutes > 0 ? Math.round(wordCount / minutes) : 0;
  wpmDisplay.textContent = wpm;
}

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  time = 0;
  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = `${time}s`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerDisplay.textContent = "0s";
  timerStarted = false;
  time = 0;
}

function stopTimer() {
  clearInterval(timer);
  timerStarted = false;
}

bt.addEventListener("click", fetchRandomSentence);
input.addEventListener("input", checkInput);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (testRunning) {
      stopTimer();
      testRunning = false;
      calculateWPM(input.value);
      input.disabled = true;
    } else {
      fetchRandomSentence();
    }
  }
});
