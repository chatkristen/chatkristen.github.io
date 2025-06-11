// Fungsi untuk mengarahkan ke website utama
function redirectToWebsiteUtama() {
    window.location.href = "https://www.chatkristen.com";
}

// Mengarahkan button ke website utama ketika diklik
document.querySelector("button a").addEventListener("click", redirectToWebsiteUtama);

// Mengubah tombol burger menu menjadi visible ketika ukuran layar diakses melalui perangkat mobile
const windowWidth = window.innerWidth || document.documentElement.clientWidth;
if (windowWidth <= 768) {
    const burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.style.display = "flex";
}

// Mengubah tombol menu menjadi visible ketika ukuran layar diakses melalui perangkat desktop
const windowWidthDesktop = window.innerWidth || document.documentElement.clientWidth;
if (windowWidthDesktop >= 769) {
    const burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.style.display = "none";
}
