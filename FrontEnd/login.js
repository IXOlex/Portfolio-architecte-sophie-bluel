/* ======================
   Recuperation et envoi formulaire de login
====================== */
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error("Erreur dans l’identifiant ou le mot de passe");
    }

    const data = await response.json();

    // Stockage du token
    localStorage.setItem("token", data.token);

    //  Redirection vers l’accueil
    window.location.href = "index.html";

  } catch (error) {
    displayErrorMessage(error.message);
  }
});
function displayErrorMessage(message) {
  let error = document.querySelector(".login-error");

  if (!error) {
    error = document.createElement("p");
    error.classList.add("login-error");
    error.style.color = "red";
    error.style.textAlign = "center";
    error.style.marginTop = "10px";

    document.querySelector("form").appendChild(error);
  }

  error.textContent = "Identifiants incorrects";
}
