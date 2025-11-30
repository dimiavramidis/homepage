// ===========================
// AIONIO NAVBAR LOGIC
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("aionioNavbar");
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.getElementById("mainNavbar");
  const yearSpan = document.getElementById("year");

  // Dynamic year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------------------------
  // Flag: σελίδα με ΠΑΝΤΑ solid navbar;
  // ---------------------------
  const alwaysSolid = document.body.classList.contains("navbar-always-solid");

  // Αν είναι πάντα solid, φρόντισε να έχει από την αρχή το scrolled style
  if (alwaysSolid && navbar) {
    navbar.classList.add("navbar-scrolled");
  }

  // ---------------------------
  // Scroll behavior
  // ---------------------------
  const handleScroll = () => {
    // Στις σελίδες alwaysSolid δεν αλλάζουμε τίποτα στο scroll
    if (alwaysSolid || !navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");

      // If menu is closed AND we are at top → remove mobile-open → transparent
      if (!collapse.classList.contains("show")) {
        navbar.classList.remove("mobile-open");
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  // ---------------------------
  // Mobile menu open/close
  // ---------------------------
  if (toggler && collapse && navbar) {
    toggler.addEventListener("click", () => {
      const isOpen = collapse.classList.contains("show");

      // Αν είμαστε σε σελίδα alwaysSolid → δεν χρειάζεται mobile-open,
      // το navbar είναι ήδη με background.
      if (alwaysSolid) {
        return;
      }

      if (!isOpen) {
        // Menu is about to OPEN → force white navbar for readability
        navbar.classList.add("mobile-open");
      } else {
        // Menu is about to CLOSE
        // If we are at the top (no scroll) → back to transparent
        if (window.scrollY < 40) {
          navbar.classList.remove("mobile-open");
        }
      }
    });
  }
});
