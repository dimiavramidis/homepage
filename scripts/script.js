window.addEventListener("scroll", function () {
  const navbar = document.getElementById("aionioNavbar");
  if (window.scrollY > 40) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
