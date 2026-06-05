document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");

  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let frameId = null;

  const updateBackground = (clientX, clientY) => {
    const rect = hero.getBoundingClientRect();
    const pointerX = (clientX - rect.left) / rect.width;
    const pointerY = (clientY - rect.top) / rect.height;
    const shiftX = (pointerX - 0.5) * 24;
    const shiftY = (pointerY - 0.5) * 24;

    hero.style.setProperty("--hero-shift-x", `${shiftX.toFixed(2)}px`);
    hero.style.setProperty("--hero-shift-y", `${shiftY.toFixed(2)}px`);
  };

  hero.addEventListener("pointermove", (event) => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }

    frameId = requestAnimationFrame(() => {
      updateBackground(event.clientX, event.clientY);
      frameId = null;
    });
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-shift-x", "0px");
    hero.style.setProperty("--hero-shift-y", "0px");
  });
});