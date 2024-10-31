const HomeContainer_Headers = document.querySelectorAll('.HomeContainer > h1');
const isPC = window.matchMedia('(min-width: 1024px)'); 

if (isPC) {
    HomeContainer_Headers.forEach(header => { // Reminder: forEach Loop required for `document.querySelectorAll`
        header.addEventListener('mouseenter', () => {
            header.classList.add('ShouldColourPulse');
        });

        header.addEventListener('animationend', () => {
            header.classList.remove('ShouldColourPulse');
        });
    });
}
