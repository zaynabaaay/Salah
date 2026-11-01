const sections = document.querySelectorAll('section');
let ticking = false;

function updateActiveSection() {
  const middle = window.innerHeight / 2;

  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    section.classList.toggle('is-active', top <= middle && bottom > middle);
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });

updateActiveSection();
