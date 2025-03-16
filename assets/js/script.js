let quotes = [];

async function loadQuotes() {
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
    const profileText = document.querySelectorAll("#profileName, #username");

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newBgColor1 = randomColor();
    const newBgColor2 = randomColor();
    const textColor = getTextColor(newBgColor1);

    quoteElement.style.opacity = 0;
    hashtagsElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex].text;
        hashtagsElement.innerText = quotes[randomIndex].text;

        // Warna gradient smooth
        container.style.transition = "background 2s ease-in-out";
        container.style.background = `linear-gradient(135deg, ${newBgColor1}, ${newBgColor2})`;

        container.style.color = textColor;

        profileText.forEach(el => {
            el.style.color = textColor;
        });

        quoteElement.style.opacity = 1;
        hashtagsElement.style.opacity = 1;

        circles.forEach((circle, index) => {
            circle.style.transition = "background 0.5s ease";
            circle.style.background = (index === randomIndex % circles.length) ? "#ff5733" : "#ccc";
        });

        setTimeout(tampilkanQuote, hitungWaktuTampil(quotes[randomIndex].text));
    }, 1000);
}

function hitungWaktuTampil(quote) {
    const words = quote.split(" ").length;
    return words * 500 + 2000;
}

function randomColor() {
    const letters = "89ABCDEF"; // Warna lebih soft
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getTextColor(bgColor) {
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000" : "#FFF";
}

document.addEventListener("DOMContentLoaded", loadQuotes);
