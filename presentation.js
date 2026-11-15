const opening = document.querySelector('.opening');
const scene = opening.querySelector('.sky-scene');
let scheduled = false;

function updateOpening() {
  const distance = opening.offsetHeight - scene.offsetHeight;
  const progress = Math.max(0, Math.min(1,
    -opening.getBoundingClientRect().top / Math.max(1, distance)
  ));
  const departure = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));
  opening.style.setProperty('--departure', departure);
  scheduled = false;
}

function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateOpening);
  }
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
updateOpening();
