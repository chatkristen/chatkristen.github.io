// ======== 🌤️ Sky & Time Effects =========
function updateSkyByTime() {
  const now = new Date();
  const hour = now.getHours();
  const sky = document.getElementById("sky");
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.getElementById("stars");

  if (hour >= 5 && hour < 7) {
    // Subuh
    sky.style.background = "linear-gradient(#5a88d2, #fff)";
    sun.style.bottom = "20%";
    sun.style.opacity = 0.5;
    moon.style.opacity = 0;
    stars.style.display = "none";
    setAudio("/assets/audio/morning.mp3");
  } else if (hour >= 7 && hour < 17) {
    // Siang
    sky.style.background = "linear-gradient(#87CEEB, #ffffff)";
    sun.style.bottom = "40%";
    sun.style.opacity = 1;
    moon.style.opacity = 0;
    stars.style.display = "none";
    setAudio("/assets/audio/day.mp3");
  } else if (hour >= 17 && hour < 19) {
    // Senja
    sky.style.background = "linear-gradient(#FFB347, #FFCC33)";
    sun.style.bottom = "10%";
    sun.style.opacity = 0.7;
    moon.style.opacity = 0.3;
    stars.style.display = "none";
    setAudio("/assets/audio/evening.mp3");
  } else {
    // Malam
    sky.style.background = "linear-gradient(#1a1a2e, #0f0f1f)";
    sun.style.opacity = 0;
    moon.style.opacity = 1;
    moon.style.bottom = "35%";
    stars.style.display = "block";
    setAudio("/assets/audio/night.mp3");
  }
}

function setAudio(src) {
  const audio = document.getElementById("bgAudio");
  if (!audio.src.includes(src)) {
    audio.pause();
    audio.src = src;
    audio.load();
  }
}

// ========= ✨ Star Generator =========
function createStars() {
  const stars = document.getElementById("stars");
  stars.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    stars.appendChild(star);
  }
}

// ========= ☁️ Cloud Generator =========
function createClouds(containerId, count, speed) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.top = `${Math.random() * 70}%`;
    cloud.style.animationDuration = `${speed + Math.random() * 5}s`;
    container.appendChild(cloud);
  }
}

// ========= 🐦 Bird Generator =========
const birdGIFPath = "/assets/gif/bird.gif";
function createBirds() {
      const birdsContainer = document.getElementById("birds");
      birdsContainer.innerHTML = '';

      const hour = new Date().getHours();
      if (hour >= 6 && hour < 15) {
        const birdTemplate = document.getElementById("birdTemplate");

        for (let i = 0; i < 4; i++) {
          const bird = document.createElement("img");
        bird.src = birdGIFPath;
        bird.className = "bird";

        const randomScale = 0.5 + Math.random() * 1.2; // Skala antara 0.5 sampai 1.7
        bird.style.width = `${80 * randomScale}px`;

        bird.style.top = `${Math.random() * 60}%`;
        bird.style.left = `-${Math.random() * 20 + 10}px`;
        bird.style.animationDuration = `${(8 + Math.random() * 5).toFixed(2)}s`;
        bird.style.animationDelay = `${Math.random() * 5}s`;

        birdsContainer.appendChild(bird);
        }
      }
    }

// ========= 🌧️ Rain Effect =========
function createRainEffect() {
  const rainContainer = document.getElementById("rain");
  const sun = document.getElementById("sun");
  const cloudBack = document.getElementById("cloudsBack");
  const cloudFront = document.getElementById("cloudsFront");
  rainContainer.innerHTML = '';
  const shouldRain = Math.random() < 0.3;
  if (shouldRain) {
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement("div");
      drop.classList.add("rain-drop");
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random()}s`;
      drop.style.animationDelay = `${Math.random()}s`;
      rainContainer.appendChild(drop);
    }
    sun.style.opacity = 0;
    cloudBack.classList.add("cloud-dark");
    cloudFront.classList.add("cloud-dark");
  } else {
    sun.style.opacity = 1;
    cloudBack.classList.remove("cloud-dark");
    cloudFront.classList.remove("cloud-dark");
  }
}

// ========= 🚀 Initialize All Effects =========
function initAllEffects() {
  updateSkyByTime();
  createStars();
  createClouds("cloudsBack", 4, 40);
  createClouds("cloudsFront", 3, 20);
  createBirds();
  createRainEffect();
}

// ========= 🎵 Audio Control Button =========
const audio = document.getElementById("bgAudio");
const playBtn = document.getElementById("playAudioBtn");
playBtn.addEventListener("click", () => {
  try {
    audio.muted = false;
    audio.play().then(() => {
      document.getElementById("audioNotif").style.display = "none";
    }).catch((err) => {
      console.warn("Audio gagal diputar:", err);
    });
  } catch (e) {
    console.warn("Error saat mencoba memutar audio:", e);
  }
});

// ========= 💬 Quote Auto-Display =========
let quotes = [];
let currentQuoteIndex = 0;
let quoteTimer;

async function loadQuotes() {
  try {
    const response = await fetch('/assets/data/quotes.json');
    quotes = await response.json();
    showQuote();
  } catch (error) {
    console.error("Gagal memuat kutipan:", error);
  }
}

function showQuote() {
  const quote = quotes[currentQuoteIndex];
  document.getElementById('quoteText').innerHTML = quote.text;
  document.getElementById('quoteTags').innerText = quote.tags;
  const quoteLength = quote.text.length;
  const baseTime = 2000;
  const perCharTime = 60;
  let displayDuration = baseTime + quoteLength * perCharTime;
  const maxDuration = 15000;
  if (displayDuration > maxDuration) displayDuration = maxDuration;
  clearTimeout(quoteTimer);
  quoteTimer = setTimeout(showNextQuote, displayDuration);
}

function showNextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  showQuote();
}

// ========= 📦 Init on Load =========
window.onload = () => {
  loadQuotes();
  initAllEffects();
};
