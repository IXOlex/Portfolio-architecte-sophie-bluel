import { fetchWorks } from "./api.js";
import { displayWorks } from "./gallery.js";

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
    deleteIcon.textContent = "🗑️";

    deleteIcon.addEventListener("click", async () => {
      await deleteWork(work.id);
      displayAdminGallery();
      displayWorks(await fetchWorks());
    });

    figure.appendChild(img);
    figure.appendChild(deleteIcon);
    container.appendChild(figure);
  });
}

async function deleteWork(id) {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
