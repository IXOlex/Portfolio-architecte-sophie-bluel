import { displayAdminGallery } from "./adminGallery.js";

export function initModal() {
  const modal = document.getElementById("modal");
  const editButton = document.getElementById("edit-button");
  const closeModal = document.querySelector(".close-modal");

  const addPhotoBtn = document.getElementById("add-photo-btn");
  const backButton = document.querySelector(".back-modal");
  const modalGallery = document.querySelector(".modal-gallery");
  const modalAdd = document.querySelector(".modal-add");

  if (!modal || !editButton) return;

  editButton.addEventListener("click", () => {
    modal.style.display = "flex";

    modalGallery.classList.remove("hidden");
    modalAdd.classList.add("hidden");

    displayAdminGallery();
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalAdd.classList.add("hidden");
    modalGallery.classList.remove("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalAdd.classList.add("hidden");
      modalGallery.classList.remove("hidden");
    }
  });

  addPhotoBtn.addEventListener("click", () => {
    modalGallery.classList.add("hidden");
    modalAdd.classList.remove("hidden");
  });

  backButton.addEventListener("click", () => {
    modalAdd.classList.add("hidden");
    modalGallery.classList.remove("hidden");
  });
}
