document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".portfolio-filter-btn");
  const cards = document.querySelectorAll(".portfolio-card");

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const filter = btn.getAttribute("data-filter");

      // active tab
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // filter project
      cards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    });
  });
});
