const opening = document.querySelector('.opening');
const scene = opening.querySelector('.sky-scene');
const cloudLayer = document.querySelector('.cloud-layer');
const cloudImage = cloudLayer.querySelector('.cloud-overlay');
let scheduled = false;

function updateScene() {
  const distance = opening.offsetHeight - scene.offsetHeight;
  const progress = Math.max(0, Math.min(1,
    -opening.getBoundingClientRect().top / Math.max(1, distance)
  ));
  const departure = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));
  opening.style.setProperty('--departure', departure);

  const cloudHeight = cloudImage.getBoundingClientRect().height;
  const cloudOffset = -window.scrollY * 0.5;
  // Wrap by one full tile; the second copy keeps the viewport covered.
  const repeatedOffset = ((cloudOffset % cloudHeight) - cloudHeight) % cloudHeight;
  cloudLayer.style.setProperty('--cloud-offset', `${repeatedOffset}px`);
  scheduled = false;
}

function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateScene);
  }
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
updateScene();
