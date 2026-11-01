const sections = document.querySelectorAll('section');
const stories = document.querySelectorAll('.opening, .meaning, .warning, .seriousness');
let ticking = false;

function updateActiveSection() {
  const middle = window.innerHeight / 2;

  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    section.classList.toggle('is-active', top <= middle && bottom > middle);
  });

  stories.forEach((section) => {
    const stage = section.firstElementChild;
    const distance = section.offsetHeight - stage.offsetHeight;
    const progress = Math.max(0, Math.min(1,
      -section.getBoundingClientRect().top / Math.max(1, distance)
    ));
    section.style.setProperty('--story-progress', progress);
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });

window.addEventListener('resize', updateActiveSection);
updateActiveSection();
