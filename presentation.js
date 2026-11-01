const sections = document.querySelectorAll('section');
const opening = document.querySelector('.opening');
const stage = opening.querySelector('.opening-stage');
let ticking = false;

function updateActiveSection() {
  const middle = window.innerHeight / 2;

  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    section.classList.toggle('is-active', top <= middle && bottom > middle);
  });

  const distance = opening.offsetHeight - stage.offsetHeight;
  const progress = Math.max(0, Math.min(1,
    -opening.getBoundingClientRect().top / Math.max(1, distance)
  ));
  opening.style.setProperty('--story-progress', progress);

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
