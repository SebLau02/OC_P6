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

    const medias = data
      .filter((m) => m.photographerId === parseInt(id))
      .sort((a, b) => {
        const likesA = parseInt(a.likes || "0", 10);
        const likesB = parseInt(b.likes || "0", 10);
        return likesB - likesA;
      });

    return { medias };
  } catch (error) {
    return error;
  }
};
const displayProfilData = (photographer) => {
  const { name, city, country, tagline, portrait } = photographer;

  const profileLoader = document.querySelector(".profile-loader");
  const photographerContainer = document.querySelector(".photograph-header");
  const nameBox = document.querySelectorAll(".photograph-header__name");
  const localicationBox = photographerContainer.querySelector(
    ".photograph-header__localisation"
  );
  const pictureBox = photographerContainer.querySelector(
    ".photograph-header__picture"
  );
  const tagBox = photographerContainer.querySelector(".photograph-header__tag");
  nameBox.forEach((el) => (el.innerText = name));
  localicationBox.innerText = `${city}, ${country}`;
  tagBox.innerText = tagline;
  pictureBox.src = `assets/photographers/${portrait}`;
  pictureBox.alt = name;
  profileLoader.classList.add("none");
  photographerContainer.classList.remove("none");
};

const createMediaCard = (media) => {
  const article = document.createElement("article");
  let mediaElement = "";
  if ("image" in media) {
    mediaElement = document.createElement("img");
    mediaElement.src = `../../assets/medias/${media.image}`;
    mediaElement.alt = "";
    mediaElement.setAttribute("data-id", media.id);
  }
  if ("video" in media) {
    const source = document.createElement("source");
    source.src = `../../assets/medias/${media.video}`;
    source.type = "video/mp4";
    mediaElement = document.createElement("video");
    mediaElement.appendChild(source);
    mediaElement.setAttribute("controls", "true");
    mediaElement.setAttribute("data-id", media.id);
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
  article.setAttribute("class", "media");
  article.setAttribute("data-date", media.date);
  article.setAttribute("data-likes", media.likes);
  article.setAttribute("data-name", media.title);

  cardContainer.appendChild(article);
};

const displayMedias = (medias) => {
  medias.forEach((media, i) => {
    createMediaCard(media);
    if (i === medias.length - 1) {
      document.querySelector(".loader").classList.add("none");
    }
  });
};

const init = async () => {
  const { photographer } = await getPhotographer();
  const { medias } = await getPhotos();
  displayProfilData(photographer);
  displayMedias(medias);
  carrouselActions(medias);
};

init();
