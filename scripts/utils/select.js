const html = document.querySelector("html");

const handleCloseSelect = (optionsContainer, activeOption) => {
  optionsContainer.classList.remove("open");
  activeOption.classList.remove("open");

  html.removeEventListener("click", closeHandler);
};

const orderByTitle = (a, b) => {
  const textA = a.dataset.name
    .trim()
    .toLowerCase()
    .replace(/^\d+\s*/, "");
  const textB = b.dataset.name
    .trim()
    .toLowerCase()
    .replace(/^\d+\s*/, "");

  return textA.localeCompare(textB);
};
const orderByDate = (a, b) => {
  const dateA = new Date(a.dataset.date); // date au format "YYYY-MM-DD"
  const dateB = new Date(b.dataset.date);
  return dateB - dateA;
};

const orderByLike = (a, b) => {
  const likesA = parseInt(a.dataset.likes || "0", 10);
  const likesB = parseInt(b.dataset.likes || "0", 10);
  return likesB - likesA;
};

const handleOrderMedias = (activeFilter) => {
  const mediasContainer = document.querySelector("#card-container");
  const medias = Array.from(mediasContainer.children);
  const ordered = medias.sort((a, b) => {
    if (activeFilter === "Titre") return orderByTitle(a, b);
    if (activeFilter === "Popularité") return orderByLike(a, b);
    if (activeFilter === "Date") return orderByDate(a, b);
  });

  ordered.forEach((m) => mediasContainer.appendChild(m));
};
/**
 * mettre l'option cliqué en option choisie
 * @param {event} e
 * @param {HTMLElement} activeOption
 */
const handleSelectOption = (e, activeOption) => {
  e.stopPropagation();

  const { label } = e.target.dataset; // nouveau texte à mettre en active
  const activeOptionLabel = activeOption.querySelector("span");
  activeOptionLabel.innerText = label;

  // mettre l'arrtibut de l'option précédement active en sur false
  Array.from(e.target.parentNode.children).find((o) => {
    if (o.dataset.selected === "true") {
      o.dataset.selected = false;
      o.setAttribute("aria-selected", "false");
    }
  });
  e.target.dataset.selected = true;
  e.target.setAttribute("aria-selected", "true");

  const optionsContainer = activeOption.nextElementSibling;
  optionsContainer.setAttribute("aria-activedescendant", e.target.id);

  handleOrderMedias(activeOptionLabel.textContent);
};

let closeHandler;

/**
 * Toggle les options du select
 * @param {Event} e
 * @param {HTMLElement} activeOption
 */
const handleOpenSelect = (e, activeOption) => {
  e.stopPropagation();
  const optionsContainer = selectContext.querySelector(".options"); // conteneur des options
  optionsContainer.classList.toggle("open"); // toggle les options
  activeOption.classList.toggle("open"); // ajoute une classe pour du style
  activeOption.setAttribute(
    "aria-expanded",
    optionsContainer.classList.contains("open")
  );

  // permet de fermet les options si on clique ailleurs que le sélect
  closeHandler = () => handleCloseSelect(optionsContainer, activeOption);
  html.addEventListener("click", closeHandler);
};

const selectContext = document.querySelector(".custom-select-context");
const activeOption = selectContext.querySelector(".active-option");
const focusableSelectors =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const focusable = selectContext.querySelectorAll(focusableSelectors);
const first = focusable[0];
const last = focusable[focusable.length - 1];

const handleFocusTrap = (e) => {
  if (e.key !== "Tab") return;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

if (selectContext) {
  selectContext.addEventListener("keydown", (e) => handleFocusTrap(e));
  const selectLabel = selectContext.querySelector("label");

  selectLabel.addEventListener("click", (e) =>
    handleOpenSelect(e, activeOption)
  );
  selectLabel.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") handleOpenSelect(e, activeOption);
  });
  activeOption.addEventListener("click", (e) =>
    handleOpenSelect(e, activeOption)
  );
  activeOption.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") handleOpenSelect(e, activeOption);
  });

  const options = selectContext.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", (e) =>
      handleSelectOption(e, activeOption)
    );
    option.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSelectOption(e, activeOption);
    });
  });
}
