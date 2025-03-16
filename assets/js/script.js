function updateSkyByTime() {
  const now = new Date();
  const hour = now.getHours();
  const sky = document.getElementById("sky");
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.getElementById("stars");
  const audio = document.getElementById("bgAudio");

  // Ubah langit berdasarkan waktu
  if (hour >= 5 && hour < 7) {
    // Subuh – biru muda
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
  if (audio.src.indexOf(src) === -1) {
    audio.pause();
    audio.src = src;
    audio.load();
    audio.play();
  }
}

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

function createBirds() {
  const birdsContainer = document.getElementById("birds");
  birdsContainer.innerHTML = '';

  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) {
    const birdTemplate = document.getElementById("birdTemplate");

    for (let i = 0; i < 4; i++) {
      const birdClone = birdTemplate.cloneNode(true);
      birdClone.removeAttribute("id");
      birdClone.style.display = "block";
      birdClone.classList.add("bird-svg");

      // Posisi awal random
      birdClone.style.top = `${Math.random() * 60}%`;
      birdClone.style.left = `-${Math.random() * 20 + 10}px`;

      // Durasi animasi acak agar terkesan natural
      const duration = (8 + Math.random() * 5).toFixed(2);
      birdClone.style.animationDuration = `${duration}s`;

      // Delay agar tidak seragam
      birdClone.style.animationDelay = `${Math.random() * 5}s`;

      birdsContainer.appendChild(birdClone);
    }
  }
}

function createRainEffect() {
  const rainContainer = document.getElementById("rain");
  const sun = document.getElementById("sun");
  const cloudBack = document.getElementById("cloudsBack");
  const cloudFront = document.getElementById("cloudsFront");

  rainContainer.innerHTML = '';
  const shouldRain = Math.random() < 0.3; // 30% kemungkinan hujan

  if (shouldRain) {
    // Tambahkan efek hujan
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement("div");
      drop.classList.add("rain-drop");
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random()}s`;
      drop.style.animationDelay = `${Math.random()}s`;
      rainContainer.appendChild(drop);
    }

    // Sembunyikan matahari saat hujan
    sun.style.opacity = 0;

    // Tambahkan kelas cloud-dark untuk menggelapkan awan
    cloudBack.classList.add("cloud-dark");
    cloudFront.classList.add("cloud-dark");

  } else {
    // Jika tidak hujan, tampilkan matahari seperti biasa
    sun.style.opacity = 1;

    // Hapus kelas cloud-dark agar awan kembali terang
    cloudBack.classList.remove("cloud-dark");
    cloudFront.classList.remove("cloud-dark");
  }
}



function initAllEffects() {
  updateSkyByTime();
  createStars();
  createClouds("cloudsBack", 4, 40);
  createClouds("cloudsFront", 3, 20);
  createBirds();
  createRainEffect();
}

const audio = document.getElementById("bgAudio");
  const playBtn = document.getElementById("playAudioBtn");
  const notif = document.getElementById("audioNotif");

  playBtn.addEventListener("click", () => {
    audio.play()
      .then(() => {
        notif.style.display = "none";
      })
      .catch(() => {
        notif.innerHTML = "⚠️ Tidak bisa memutar musik. Silakan izinkan audio di browser.";
        setTimeout(() => notif.style.display = "none", 3000);
      });
  });

  // Tampilkan saat halaman siap
  window.addEventListener("DOMContentLoaded", () => {
    notif.style.display = "flex";
  });

  // Tampilkan notifikasi secara otomatis saat halaman load
  window.addEventListener("DOMContentLoaded", () => {
    notif.style.display = "flex";
  });

let quotes = [];
  let currentQuoteIndex = 0;
  let quoteTimer;

  async function loadQuotes() {
    const response = await fetch('/assets/data/quotes.json');
    quotes = await response.json();
    showQuote();
  }

  function showQuote() {
    const quote = quotes[currentQuoteIndex];

    // Tampilkan teks dan tag
    document.getElementById('quoteText').innerHTML = quote.text;
    document.getElementById('quoteTags').innerText = quote.tags;

    // Hitung durasi berdasarkan panjang teks
    const quoteLength = quote.text.length;
    const baseTime = 2000; // waktu dasar 2 detik
    const perCharTime = 60; // 60ms per karakter
    let displayDuration = baseTime + quoteLength * perCharTime;

    // Batas maksimal jika diperlukan
    const maxDuration = 15000;
    if (displayDuration > maxDuration) displayDuration = maxDuration;

    clearTimeout(quoteTimer);
    quoteTimer = setTimeout(showNextQuote, displayDuration);
  }

  function showNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote();
  }

  window.onload = loadQuotes;
