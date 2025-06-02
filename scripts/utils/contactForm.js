function displayModal() {
  const modal = document.getElementById("contact_modal");
  const html = document.querySelector("html");
  modal.classList.add("active");
  html.classList.add("hidden");
  const dialog = modal.querySelector(".modal");
  dialog.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const html = document.querySelector("html");

  modal.classList.remove("active");
  html.classList.remove("hidden");
}
