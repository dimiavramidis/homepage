document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("categorySelect");
  const subcategorySelect = document.getElementById("subcategorySelect"); // might be null
  const cards = document.querySelectorAll(".portfolio-card");

  // Future subcategory map
  const subcategories = {
    "category-1": ["subcategory-1", "subcategory-2", "subcategory-3"],
    "category-2": ["subcategory-4", "subcategory-5"],
  };

  // Fill subcategories — only if subcategorySelect exists
  function updateSubcategories() {
    if (!subcategorySelect) return; // exit if not used yet

    const selectedCategory = categorySelect.value;

    subcategorySelect.innerHTML = `<option value="all">All Subcategories</option>`;

    if (selectedCategory === "all") return;

    if (subcategories[selectedCategory]) {
      subcategories[selectedCategory].forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub.replace("-", " ");
        subcategorySelect.appendChild(option);
      });
    }
  }

  // Main filtering logic — works with OR without subcategories
  function filterCards() {
    const selectedCategory = categorySelect.value;
    const selectedSubcategory = subcategorySelect
      ? subcategorySelect.value
      : "all";

    cards.forEach((card) => {
      const cardCat = card.getAttribute("data-category");
      const cardSub = card.getAttribute("data-subcategory");

      const matchesCategory =
        selectedCategory === "all" || selectedCategory === cardCat;

      const matchesSubcategory =
        selectedSubcategory === "all" || selectedSubcategory === cardSub;

      if (matchesCategory && matchesSubcategory) {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    });
  }

  // Events
  categorySelect.addEventListener("change", () => {
    updateSubcategories(); // does nothing for now
    filterCards();
  });

  if (subcategorySelect) {
    subcategorySelect.addEventListener("change", filterCards);
  }

  // Initial setup
  updateSubcategories();
});
