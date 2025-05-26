const html = document.querySelector("html");

const handleCloseSelect = (optionsContainer, activeOption) => {
  optionsContainer.classList.remove("open");
  activeOption.classList.remove("open");

  html.removeEventListener("click", closeHandler);
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

  // permet de fermet les options si on clique ailleurs que le sélect
  closeHandler = () => handleCloseSelect(optionsContainer, activeOption);
  html.addEventListener("click", closeHandler);
};

const selectContext = document.querySelector(".custom-select-context");
const activeOption = selectContext.querySelector(".active-option");

if (selectContext) {
  const selectLabel = selectContext.querySelector("label");

  selectLabel.addEventListener("click", (e) =>
    handleOpenSelect(e, activeOption)
  );
  activeOption.addEventListener("click", (e) =>
    handleOpenSelect(e, activeOption)
  );

  const options = selectContext.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", (e) =>
      handleSelectOption(e, activeOption)
    );
  });
}
