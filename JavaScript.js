const HomeContainer_Headers = document.querySelectorAll('.HomeContainer > h1');
const NavBarLinks = document.querySelectorAll('.NavBarContainer > a');
const isPC = window.matchMedia('(min-width: 1024px)'); // Hack: PC Detection

if (isPC) {
    HomeContainer_Headers.forEach(Header => {
        Header.addEventListener('mouseenter', () => { Header.classList.add('ShouldColourPulse'); });
        Header.addEventListener('animationend', () => { Header.classList.remove('ShouldColourPulse'); });
    });
}