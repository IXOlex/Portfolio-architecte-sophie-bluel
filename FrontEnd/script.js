import { fetchWorks, fetchCategories } from "./api.js";
import { displayWorks } from "./gallery.js";
import { displayFilters } from "./filters.js";
import { enableEditMode } from "./editMode.js";
import { initModal } from "./modal.js";

async function init() {
  const works = await fetchWorks();
  const categories = await fetchCategories();

  displayWorks(works);
  displayFilters(categories, works);
  enableEditMode();
}

init();
initModal();