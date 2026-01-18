// filters.js
import { displayWorks } from "./gallery.js";

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

export function displayFilters(categories, works) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";

  // Bouton Tous
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("filter-btn", "active");
  filtersContainer.appendChild(allButton);

  allButton.addEventListener("click", () => {
    setActiveButton(allButton);
    displayWorks(works);
  });

  // Boutons catégories
  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");
    filtersContainer.appendChild(button);

    button.addEventListener("click", () => {
      setActiveButton(button);
      const filteredWorks = works.filter(
        work => work.categoryId === category.id
      );
      displayWorks(filteredWorks);
    });
  });
}
