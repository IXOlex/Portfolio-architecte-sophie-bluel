async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

function displayFilters(categories, works) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("filter-btn", "active");
  filtersContainer.appendChild(allButton);

  allButton.addEventListener("click", () => {
    setActiveButton(allButton);
    displayWorks(works);
  });

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

function setActiveButton(activeButton) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
}

async function init() {
  const works = await fetchWorks();
  const categories = await fetchCategories();

  displayWorks(works);
  displayFilters(categories, works);
}

init();
