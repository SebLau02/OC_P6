const cardContainer = document.querySelector("#card-container");

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
const getPhotos = async () => {
  try {
    const res = await fetch("data/medias.json");
    const data = await res.json();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const medias = data.filter((m) => m.photographerId === parseInt(id));
    return { medias };
  } catch (error) {
    return error;
  }
};
const displayProfilData = (photographer) => {
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

const createMediaCard = (media) => {
  if ("video" in media) {
    console.log(media);
  }
  const article = document.createElement("article");
  let mediaElement = "";
  if ("image" in media) {
    mediaElement = document.createElement("img");
    mediaElement.src = `../../assets/medias/${media.image}`;
    mediaElement.alt = media.title;
  }
  if ("video" in media) {
    const source = document.createElement("source");
    source.src = `../../assets/medias/${media.video}`;
    source.type = "video/mp4";
    mediaElement = document.createElement("video");
    mediaElement.appendChild(source);
    mediaElement.setAttribute("controls", "true");
  }
  const div = document.createElement("div");
  const titleBox = document.createElement("span");
  const likesBox = document.createElement("span");
  const likesIcon = document.createElement("img");

  titleBox.innerText = media.title;
  likesBox.innerText = media.likes;
  likesIcon.src = "../../assets/icons/heart.svg";
  likesIcon.alt = "icône coeur";

  likesBox.appendChild(likesIcon);
  div.appendChild(titleBox);
  div.appendChild(likesBox);

  article.appendChild(mediaElement);
  article.appendChild(div);

  cardContainer.appendChild(article);
};

const displayMedias = (medias) => {
  medias.forEach((media) => {
    createMediaCard(media);
  });
};

const init = async () => {
  const { photographer } = await getPhotographer();
  const { medias } = await getPhotos();
  displayProfilData(photographer);
  displayMedias(medias);
};

init();
