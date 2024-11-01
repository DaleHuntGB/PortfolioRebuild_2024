const HomeContainer_Headers = document.querySelectorAll('.HomeContainer > h1');
const ShootingStarContainer = document.querySelector('.ShootingStarsContainer')
const isPC = window.matchMedia('(min-width: 1024px)'); // PC Detection
const isShootingStars = document.querySelector('.ShootingStarsContainer') ? true : false; 

if (isPC.matches) {
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
