const getPhotographer = async () => {
  try {
    const res = await fetch("data/photographers.json");
    const data = await res.json();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const photographer = data.photographers.find((p) => p.id === parseInt(id));
    return { photographer };
  } catch (error) {
    return error;
  }
};

const displayData = (photographer) => {
  const { name, city, country, tagline, portrait } = photographer;

  const photographerContainer = document.querySelector(".photograph-header");
  const nameBox = photographerContainer.querySelector(
    ".photograph-header__name"
  );
  const localicationBox = photographerContainer.querySelector(
    ".photograph-header__localisation"
  );
  const pictureBox = photographerContainer.querySelector(
    ".photograph-header__picture"
  );
  const tagBox = photographerContainer.querySelector(".photograph-header__tag");
  nameBox.innerText = name;
  localicationBox.innerText = `${city}, ${country}`;
  tagBox.innerText = tagline;
  pictureBox.src = `assets/photographers/${portrait}`;
};

const init = async () => {
  const { photographer } = await getPhotographer();
  displayData(photographer);
};

init();
