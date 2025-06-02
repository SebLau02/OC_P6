function displayModal() {
  const modal = document.getElementById("contact_modal");
  const html = document.querySelector("html");
  modal.classList.add("active");
  html.classList.add("hidden");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const html = document.querySelector("html");

  modal.classList.remove("active");
  html.classList.remove("hidden");
}
