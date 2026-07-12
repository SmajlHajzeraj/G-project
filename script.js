const screens = {
  start: document.getElementById("startScreen"),
  countdown: document.getElementById("countdownScreen"),
  birthday: document.getElementById("birthdayScreen"),
  card: document.getElementById("cardScreen"),
  final: document.getElementById("finalScreen")
};

const countdownText = document.getElementById("countdown");
const heartsContainer = document.querySelector(".hearts-container");
const photo = document.getElementById("photo");
const backgroundMusic = document.getElementById("backgroundMusic");

const photos = [
  "Foto1.jpg.jpeg",
  "Foto2.jpg.jpeg",
  "Foto3.jpg.jpeg",
  "Foto4.jpg.jpeg",
  "Foto5.jpg.jpeg",
  "Foto6.jpg.jpeg",
  "Foto7.jpg.jpeg",
  "Foto8.jpg.jpeg",
  "Foto9.jpg.jpeg",
  "Foto10.jpg.jpeg",
  "Foto11.jpg.jpeg",
  "Foto12.jpg.jpeg"
];

let currentPhoto = 0;
let heartsStarted = false;

function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });

  screens[screenName].classList.add("active");
}

function startSurprise() {
  showScreen("countdown");
  startHearts();

  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch(() => {
    console.log("Audio playback blocked until user interaction.");
  });

  let number = 3;
  countdownText.textContent = number;

  const countdownInterval = setInterval(() => {
    number--;

    if (number > 0) {
      countdownText.textContent = number;
    } else {
      clearInterval(countdownInterval);
      showBirthdaySticker();
    }
  }, 1000);
}

function showBirthdaySticker() {
  showScreen("birthday");

  setTimeout(() => {
    showScreen("card");
  }, 3000);
}

function openCard() {
  document.querySelector(".card").classList.add("open");
}

function changePhoto(event) {
  event.stopPropagation();

  currentPhoto++;

  if (currentPhoto >= photos.length) {
    currentPhoto = 0;
  }

  photo.src = photos[currentPhoto];
}

function showFinalText(event) {
  event.stopPropagation();
  showScreen("final");
}

function startHearts() {
  if (heartsStarted) return;
  heartsStarted = true;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);

  }, 250);
}
