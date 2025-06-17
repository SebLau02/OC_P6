function displayModal(type) {
  const modalContainer = document.getElementById("modal-container");
  const html = document.querySelector("html");
  const formContainer = document.querySelector(".contact-container");
  const carrousel = document.querySelector("#carrousel");

  modalContainer.classList.add("active");
  html.classList.add("hidden");
  let dialog = null;

  if (type === "contact")
    dialog = modalContainer.querySelector(".modal.contact-container");
  if (type === "carrousel") dialog = modalContainer.querySelector("#carrousel");

  dialog.classList.remove("none");
  dialog.focus();
}

function closeModal() {
  const modal = document.getElementById("modal-container");
  const html = document.querySelector("html");
  const formContainer = modal.querySelector(".contact-container");
  const carrousel = document.querySelector("#carrousel");

  modal.classList.remove("active");
  html.classList.remove("hidden");
  formContainer.classList.remove("confirm-message");
  formContainer.classList.add("none");
  carrousel.classList.add("none");
}

let timeout = null;
const handleSubmitContact = (e) => {
  e.preventDefault();
  if (timeout) clearTimeout(timeout);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const submitBtn = form.querySelector(".contact_button");

  submitBtn.classList.add("loading");
  timeout = setTimeout(() => {
    submitBtn.classList.remove("loading");
    form.reset();
    form.classList.add("confirm-message");
  }, 2000);
};

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (e) => handleSubmitContact(e));
