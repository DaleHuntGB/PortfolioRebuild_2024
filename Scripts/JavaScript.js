const HomeContainer_Headers = document.querySelectorAll('.HomeContainer > h1');
const ShootingStarContainer = document.querySelector('.ShootingStarsContainer')
const isPC = window.matchMedia('(min-width: 1024px)'); // PC Detection
const isShootingStars = document.querySelector('.ShootingStarsContainer') ? true : false; 

if (isPC) {
    HomeContainer_Headers.forEach(Header => {
        Header.addEventListener('mouseenter', () => { Header.classList.add('ShouldColourPulse'); });
        Header.addEventListener('animationend', () => { Header.classList.remove('ShouldColourPulse'); });
    });
    if (isShootingStars) { setInterval(generateStar, 300); }
}

function generateStar() {
    const createdStar = document.createElement('div');
    createdStar.classList.add('ShootingStar');
    minStarSize = Math.ceil(2);
    maxStarSize = Math.floor(5);
    const size = Math.floor(Math.random() * (maxStarSize - minStarSize + 1)) + minStarSize;
    createdStar.style.width = `${size}px`;
    createdStar.style.height = `${size}px`;
    createdStar.style.top = `${Math.random() * window.innerHeight}px`;
    createdStar.style.left = `${Math.random() * window.innerWidth}px`;
    createdStar.style.animationDuration = `${Math.random() * 1 + 1}s`;
    ShootingStarContainer.appendChild(createdStar);
    setTimeout(() => { createdStar.remove(); }, 1000);
}

function updateImageWidths() {
    document.querySelectorAll('.Project').forEach((project) => {
        const images = project.querySelectorAll("img");
        const minWidth = 700;

        if (window.innerWidth >= minWidth) {
            const imageWidth = 100 / images.length;
            images.forEach((img) => {
                img.style.maxWidth = `${imageWidth}%`;
                img.style.width = "100%";
                img.style.boxSizing = "border-box";
            });
        } else {
            images.forEach((img) => {
                img.style.maxWidth = "";
                img.style.width = "";
                img.style.boxSizing = "";
            });
        }
    });
}

function createImageZoom() {
    if (window.innerWidth < 768) {
        const zoomContainer = document.createElement('div');
        zoomContainer.style.position = 'fixed';
        zoomContainer.style.top = 0;
        zoomContainer.style.left = 0;
        zoomContainer.style.width = '100vw';
        zoomContainer.style.height = '100vh';
        zoomContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        zoomContainer.style.display = 'none';
        zoomContainer.style.alignItems = 'center';
        zoomContainer.style.justifyContent = 'center';
        zoomContainer.style.zIndex = 1000;

        const zoomedImg = document.createElement('img');
        zoomedImg.style.maxWidth = '90vw';
        zoomedImg.style.maxHeight = '90vh';
        zoomContainer.appendChild(zoomedImg);

        document.body.appendChild(zoomContainer);

        document.querySelectorAll('.Project img').forEach((img) => {
            img.addEventListener('click', () => {
                zoomedImg.src = img.src;
                zoomContainer.style.display = 'flex';
                zoomedImg.style.borderRadius = '0.5em';
                zoomedImg.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 3px 6px, rgba(0, 0, 0, 0.25) 0px 3px 6px';
            });
        });

        zoomContainer.addEventListener('click', () => {
            zoomContainer.style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateImageWidths();
    createImageZoom();
});
window.addEventListener('resize', updateImageWidths);

// Typing Animation

const WordsToType = ["Dale Hunt", "Unhalted", "Gamer", "Developer", "Minimalist"];
const TypingSpeed = 100;
const DelayBetweenWords = 1500;
const HomeContainer = document.querySelector('.HomeContainer');

let CurrentWord = 0;
let CurrentChar = 0;
let WordBeingTyped = WordsToType[CurrentWord];

const TypingContainer = document.querySelector('.TypingEffect');

function TypeWord() {
    if (CurrentChar < WordBeingTyped.length) {
        TypingContainer.textContent += WordBeingTyped.charAt(CurrentChar);
        CurrentChar++;
        setTimeout(TypeWord, TypingSpeed);
    } else {
        setTimeout(DeleteWord, DelayBetweenWords);
    }
}

function DeleteWord() {
    if (CurrentChar > 0) {
        TypingContainer.textContent = WordBeingTyped.substring(0, CurrentChar - 1);
        CurrentChar--;
        setTimeout(DeleteWord, TypingSpeed / 2);
    } else {
        CurrentWord = (CurrentWord + 1) % WordsToType.length;
        WordBeingTyped = WordsToType[CurrentWord];
        setTimeout(TypeWord, TypingSpeed);
    }
}

if (HomeContainer)
{
    TypeWord();
}

// Randomize Quotes
const Quotes = [
    {text: "I love inside jokes. I'd love to be a part of one someday.", author: "Michael Scott • S03E02 • The Convention"},
    {text: "I am running away from my responsibilities, and it feels good.", author: "Michael Scott • S04E07 • Money"},
    {text: "I just want to lie on the beach and eat hot dogs. That’s all I’ve ever wanted.", author: "Kevin Malone • S03E22 • Beach Games"},
];

function RandomizeQuotes() {
    const quoteElement = document.querySelector('.QuoteText');
    const authorElement = document.querySelector('.QuoteAuthor');
    const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
    quoteElement.textContent = `"${randomQuote.text}"`; 
    authorElement.textContent = `${randomQuote.author}`;
}
document.addEventListener("DOMContentLoaded", RandomizeQuotes);

function SetColorPalette(isDarkMode) {
    root = document.documentElement;
    const modeIndicator = document.querySelector('#ModeIndicator');
    modeIndicator.className = isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (isDarkMode) {
        // Switch to Dark Mode
        root.style.setProperty('--CLR_BG', '#272822');
        root.style.setProperty('--CLR_SBG', '#3E3D32');
        root.style.setProperty('--CLR_TBG', '#49483E');
        root.style.setProperty('--CLR_TXT', '#F8F8F2');
        root.style.setProperty('--CLR_ACCENT', '#66D9EF');
        root.style.setProperty('--CLR_ALTACCENT', '#A1EFE4');
        root.style.setProperty('--CLR_LINK', '#FD971F');
        root.style.setProperty('--CLR_LINKHOVER', '#F92672');
        root.style.setProperty('--CLR_TERMINAL', '#A6E22E');
    } else {
        // Switch to Light Mode
        root.style.setProperty('--CLR_BG', '#F8F8F2');
        root.style.setProperty('--CLR_SBG', '#EAE8D5');
        root.style.setProperty('--CLR_TBG', '#D5D2BE');
        root.style.setProperty('--CLR_TXT', '#272822');
        root.style.setProperty('--CLR_ACCENT', '#2185D0');
        root.style.setProperty('--CLR_ALTACCENT', '#20C997');
        root.style.setProperty('--CLR_LINK', '#D35400');
        root.style.setProperty('--CLR_LINKHOVER', '#E83E8C');
        root.style.setProperty('--CLR_TERMINAL', '#50A14F');
    }
}

function SetDarkModeStatus() {
    const root = document.documentElement;
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    const newMode = !isDarkMode;
    const modeIndicator = document.querySelector('#ModeIndicator');
    modeIndicator.className = newMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('isDarkMode', newMode);
    root.style.setProperty('--BOOL_DARKMODE', newMode);
    SetColorPalette(newMode);
}

window.onload = function () {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    document.documentElement.style.setProperty('--BOOL_DARKMODE', isDarkMode);
    SetColorPalette(isDarkMode);
};