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
  const form = modal.querySelector("form");

  modal.classList.remove("active");
  html.classList.remove("hidden");
  form.classList.remove("confirm-message");
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
