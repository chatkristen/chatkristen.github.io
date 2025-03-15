document.addEventListener("DOMContentLoaded", function () {
    fetchQuotes();
});

let quotes = [];

async function fetchQuotes() {
    try {
        const response = await fetch("/data/quotes.json");
        quotes = await response.json();
        tampilkanQuote();
    } catch (error) {
        console.error("Gagal memuat quotes:", error);
    }
}

function tampilkanQuote() {
    if (quotes.length === 0) return;

    const quoteElement = document.getElementById("quote");
    const hashtagsElement = document.getElementById("hashtags");
    const container = document.getElementById("quoteContainer");
    const circles = document.querySelectorAll(".circle");
    const profileName = document.getElementById("profileName");
    const username = document.getElementById("username");

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newBgColor = randomColor();
    const textColor = getTextColor(newBgColor);

    quoteElement.style.opacity = 0;
    hashtagsElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex].text;
        hashtagsElement.innerText = quotes[randomIndex].tags;

        container.style.background = newBgColor;
        container.style.color = textColor;
        profileName.style.color = textColor;
        username.style.color = darkenColor(textColor, 30);

        quoteElement.style.opacity = 1;
        hashtagsElement.style.opacity = 1;

        circles.forEach((circle, index) => {
            circle.style.background = (index === randomIndex % circles.length) ? "#ff5733" : "#ccc";
        });

        setTimeout(tampilkanQuote, hitungWaktuTampil(quotes[randomIndex].text));
    }, 1000);
}

// Fungsi untuk mendapatkan warna acak
function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fungsi untuk mendapatkan warna teks yang kontras
function getTextColor(bgColor) {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#222" : "#fff";
}

// Fungsi untuk menggelapkan warna agar tetap kontras
function darkenColor(hex, percent) {
    let num = parseInt(hex.slice(1), 16),
        amt = Math.round(2.55 * percent),
        r = (num >> 16) - amt,
        g = ((num >> 8) & 0x00FF) - amt,
        b = (num & 0x0000FF) - amt;

    return "#" + (
        0x1000000 +
        (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
        (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
        (b < 255 ? (b < 1 ? 0 : b) : 255)
    ).toString(16).slice(1);
}

// Fungsi menentukan waktu tampilan quote
function hitungWaktuTampil(quote) {
    return Math.max(3000, quote.length * 100);
}
