export function displayModal(type) {
  const modalContainer = document.getElementById("modal-container");
  const html = document.querySelector("html");

  modalContainer.classList.add("active");
  html.classList.add("hidden");
  let dialog = null;

  if (type === "contact")
    dialog = modalContainer.querySelector(".modal.contact-container");
  if (type === "carrousel") dialog = modalContainer.querySelector("#carrousel");

  dialog.classList.remove("none");
  dialog.focus();
}

export function closeModal() {
  const modal = document.getElementById("modal-container");
  const html = document.querySelector("html");
  const formContainer = modal.querySelector(".contact-container");
  const form = formContainer.querySelector("#contact-form");
  const carrousel = document.querySelector("#carrousel");

  modal.classList.remove("active");
  html.classList.remove("hidden");
  form.classList.remove("confirm-message");
  formContainer.classList.add("none");
  carrousel.classList.add("none");
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const currentImage = document.querySelector(".image-container [data-id]");
    const currentImageId = currentImage.getAttribute("data-id");
    const medias = document.querySelectorAll(".media__img");
    const galleryCurrentImage = Array.from(medias).find(
      (el) => String(el.getAttribute("data-id")) === String(currentImageId)
    );
    closeModal();
    if (galleryCurrentImage) {
      galleryCurrentImage.focus();
    }
  }
});
let timeout = null;
const handleSubmitContact = (e) => {
  e.preventDefault();
  if (timeout) clearTimeout(timeout);

  const form = e.currentTarget;
  const formData = new FormData(form);

  // affiche temporairement les valeurs entrée dans la console
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const submitBtn = form.querySelector(".contact_button");

  submitBtn.classList.add("loading");
  // simule un envoi de donnée
  timeout = setTimeout(() => {
    submitBtn.classList.remove("loading");
    form.reset();
    form.classList.add("confirm-message");
  }, 2000);
};

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (e) => handleSubmitContact(e));
