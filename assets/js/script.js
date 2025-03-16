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
    for (let i = 0; i < 3; i++) {
      const bird = document.createElement("div");
      bird.classList.add("bird");
      bird.style.top = `${Math.random() * 40}%`;
      bird.style.animationDuration = `${10 + Math.random() * 5}s`;
      bird.style.animationDelay = `${Math.random() * 5}s`;
      birdsContainer.appendChild(bird);
    }
  }
}

function createRainEffect() {
  const rainContainer = document.getElementById("rain");
  rainContainer.innerHTML = '';
  const shouldRain = Math.random() < 0.3; // 30% kemungkinan hujan

  // Hapus class 'rainy' dari semua awan dulu
  document.querySelectorAll('.cloud').forEach(cloud => {
    cloud.classList.remove('rainy');
  });

  if (shouldRain) {
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement("div");
      drop.classList.add("rain-drop");
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random()}s`;
      drop.style.animationDelay = `${Math.random()}s`;
      rainContainer.appendChild(drop);
    }

    // Tambahkan class 'rainy' ke semua awan saat hujan
    document.querySelectorAll('.cloud').forEach(cloud => {
      cloud.classList.add('rainy');
    });
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

document.addEventListener("DOMContentLoaded", initAllEffects);
