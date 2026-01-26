//editMode.js//
export function enableEditMode() {
  const token = localStorage.getItem("token");
  if (!token) return;

  document.getElementById("edit-banner").style.display = "block";

  const filters = document.querySelector(".filters");
  if (filters) filters.style.display = "none";

  const editButton = document.getElementById("edit-button");
  if (editButton) editButton.style.display = "flex";

  const loginLink = document.querySelector(".nav-link[href='login.html'], .nav-link[href='#']");
  if (loginLink) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.reload();
    };
  }
}
