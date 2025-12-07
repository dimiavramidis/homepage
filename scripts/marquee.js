function initMarquee() {
  const groups = document.querySelectorAll(".skills-group");

  groups.forEach((group) => {
    const marquee = group.querySelector(".skills-marquee");
    const originalTrack = group.querySelector(".skills-track");

    if (!marquee || !originalTrack) return;

    // καθάρισε παλιό περιεχόμενο (παλιά clones / transforms)
    marquee.innerHTML = "";
    marquee.style.transform = "translateX(0)";

    // βάζουμε ένα φρέσκο track μέσα
    const track = originalTrack.cloneNode(true);
    marquee.appendChild(track);

    // mobile: καθόλου animation
    if (window.innerWidth <= 768) return;

    let trackWidth = track.offsetWidth;
    const viewportWidth = group.offsetWidth;

    // κλωνοποίηση μέχρι να καλύψουμε >2x το πλάτος
    while (trackWidth < viewportWidth * 2) {
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      marquee.appendChild(clone);
      trackWidth += clone.offsetWidth;
    }

    let offset = 0;
    const speed = 0.5; // pixels ανά frame
    let paused = false;

    function step() {
      if (!paused) {
        offset -= speed;

        // όταν φύγει ένα πλήρες track, "γυρνάμε" μπροστά
        if (Math.abs(offset) >= track.offsetWidth) {
          offset += track.offsetWidth;
        }

        marquee.style.transform = `translateX(${offset}px)`;
      }

      requestAnimationFrame(step);
    }

    // pause / resume στο hover
    group.addEventListener("mouseenter", () => {
      paused = true;
    });

    group.addEventListener("mouseleave", () => {
      paused = false;
    });

    step();
  });
}

// πρώτη αρχικοποίηση
document.addEventListener("DOMContentLoaded", initMarquee);

// re-init στο resize (με μικρό debounce)
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initMarquee, 200);
});
