import { fetchWorks, fetchCategories } from "./api.js";
import { displayWorks } from "./gallery.js";
import { showGalleryView } from "./modal.js";

const form = document.getElementById("add-photo-form");
const submitBtn = form.querySelector("button");

const imageInput = document.getElementById("image");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");

const preview = document.querySelector(".upload-preview");
const placeholder = document.querySelector(".upload-placeholder");
const errorMsg = document.getElementById("form-error");

/* ======================
   Activation bouton
====================== */
form.addEventListener("input", () => {
  submitBtn.disabled = !(
    imageInput.files.length &&
    titleInput.value.trim() &&
    categorySelect.value
  );
});

/* ======================
   Galerie admin 
====================== */
export async function displayAdminGallery() {
  const works = await fetchWorks();
  const container = document.querySelector(".modal-gallery-grid");
  container.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.style.backgroundImage = "url('assets/icons/trash-can-solid.svg')";
    deleteIcon.alt = "Supprimer";
    deleteIcon.classList.add("trash-icon-img");

    deleteIcon.addEventListener("click", async () => {
      await deleteWork(work.id);
      figure.remove();
      displayWorks(await fetchWorks());
    });

    figure.append(img, deleteIcon);
    container.appendChild(figure);
  });
}

/* ======================
   Supprimer work
====================== */
async function deleteWork(id) {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/* ======================
   Preview image + titre
====================== */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  titleInput.value ||= file.name.replace(/\.[^/.]+$/, "");

  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
  placeholder.classList.add("hidden");
});

/* ======================
   Chargement catégories
====================== */
export async function loadCategories() {
  const categories = await fetchCategories();
  categorySelect.innerHTML = `<option value=""></option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });
}

/* ======================
   Envoi formulaire
====================== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    !imageInput.files.length ||
    !titleInput.value.trim() ||
    !categorySelect.value
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("image", imageInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);

  /* ======================
    Envoi au serveur
====================== */
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    alert("Erreur lors de l’ajout");
    return;
  }

  /* ======================
    Mise à jour galerie
====================== */
  displayWorks(await fetchWorks());
  displayAdminGallery();

  showGalleryView();
  form.reset();

  preview.classList.add("hidden");
  placeholder.classList.remove("hidden");
});
