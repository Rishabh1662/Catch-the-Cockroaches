const startBtn = document.getElementById("startBtn");
const screens = document.querySelectorAll(".screen");
const chooseInsectBtns = document.querySelectorAll(".chooseInsectBtn");
const gameContainer = document.querySelector(".gameContainer");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const annoyingMessage = document.getElementById("annoyingMessage");

let seconds = 0;
let score = 0;
let selectedInsect = {};

startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");
});

chooseInsectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selectedInsect = {
      src,
      alt,
    };

    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time : ${m}:${s}`;
  seconds++;
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function createInsect() {
  const insect = document.createElement("div");
  const { x, y } = getRandomLocation();
  insect.classList.add("insect");
  insect.style.left = `${x}px`;
  insect.style.top = `${y}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" arc="${
    selectedInsect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)"/>`;
  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
}
function catchInsect() {
  increaseScore();
  this.classList.add("catched");
  setTimeout(() => {
    this.remove();
  }, 2000);
  addInsects();
}

function increaseScore() {
  score++;
  if (score > 19) {
    annoyingMessage.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

function startGame() {
  setInterval(increaseTime, 1000);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return {
    x,
    y,
  };
}
