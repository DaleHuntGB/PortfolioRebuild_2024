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

const projects = [
    { element: document.querySelector('#AerialSpaceProject'), minWidth: 425 },
    { element: document.querySelector('#MinimapStatsProject'), minWidth: 425 }
];

function updateImageWidths() {
    projects.forEach(({ element, minWidth }) => {
        if (element && window.innerWidth >= minWidth) {
            const images = element.querySelectorAll("img");
            const imageWidth = 100 / images.length;

            images.forEach((img) => {
                img.style.maxWidth = `${imageWidth}%`;
                img.style.width = "100%";
                img.style.boxSizing = "border-box";
            });
        } else if (element) {
            element.querySelectorAll("img").forEach((img) => {
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

        document.querySelectorAll('#AerialSpaceProject img, #MinimapStatsProject img').forEach((img) => {
            img.addEventListener('click', () => {
                zoomedImg.src = img.src;
                zoomContainer.style.display = 'flex';
                zoomedImg.style.borderRadius = '0.5em';
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