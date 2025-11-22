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
  // Scroll behavior
  // ---------------------------
  const handleScroll = () => {
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
  if (toggler && collapse) {
    toggler.addEventListener("click", () => {
      const isOpen = collapse.classList.contains("show");

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
