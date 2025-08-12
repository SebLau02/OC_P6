import { carrouselActions } from "../utils/carrousel.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { handleInitSelect } from "../utils/select.js";

const cardContainer = document.querySelector("#card-container");

/**
 * Fetch les données d'un photographe
 * @returns Objet contenant les informations personnels du photographe
 */
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
/**
 * Fetch les médias du photographe
 * @returns Tableau de photo ; chaque photo est un objet contenant l'url, le nom, l'id du photographe
 */
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

/**
 * Insérer dynamiquement les données photographe dans le html
 * @param {Object} photographer
 */
const displayProfilData = (photographer) => {
  const { name, city, country, tagline, portrait, price } = photographer;

  const princing = document.querySelector(".pricing");
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
  princing.innerText = `${price}€/jour`;
};

/**
 * Crée dynamiquement une carte pour le média fourni puis l'insère dans le html
 * @param {Object} media
 */
const createMediaCard = (media) => {
  // crée la carte
  const article = document.createElement("article");
  let mediaElement = "";

  // en fonction de la nature du média on crée une balise image ou vidéo
  if ("image" in media) {
    mediaElement = document.createElement("img");
    mediaElement.src = `../../assets/medias/${media.image}`;
    mediaElement.alt = "";
    mediaElement.setAttribute("data-id", media.id);
    mediaElement.setAttribute("tabindex", 0); // permet d'être focusable au clavier
    mediaElement.setAttribute("class", "media__img"); // utile pour récupérer les éléments plustard
    article.appendChild(mediaElement);
  }
  if ("video" in media) {
    const source = document.createElement("source");
    source.src = `../../assets/medias/${media.video}`;
    source.type = "video/mp4";
    mediaElement = document.createElement("video");
    mediaElement.appendChild(source);

    // génère la miniature pour la vidéo
    const canvas = document.createElement("canvas");
    canvas.setAttribute("data-id", media.id);
    canvas.setAttribute("class", "media__img"); // utile pour récupérer les éléments plustard
    article.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    mediaElement.addEventListener("loadeddata", () => {
      mediaElement.currentTime = 1;
    });

    mediaElement.addEventListener("seeked", () => {
      canvas.width = mediaElement.videoWidth;
      canvas.height = mediaElement.videoHeight;
      ctx.drawImage(mediaElement, 0, 0, canvas.width, canvas.height);
    });

    canvas.setAttribute("data-id", media.id);
    canvas.setAttribute("tabindex", 0); // permet d'être focusable au clavier
    canvas.setAttribute("tabindex", 0); // permet d'être focusable au clavier
  }

  // création et structuration de la carte puis l'insère dans le html
  const div = document.createElement("div");
  const titleBox = document.createElement("span");
  const likesBox = document.createElement("span");
  const likes = document.createElement("span");
  const likesIconBtn = document.createElement("button");
  const likesIconEmpty = document.createElement("img");
  const likesIconFull = document.createElement("img");

  titleBox.innerText = media.title;
  likes.innerText = media.likes;

  likesIconEmpty.src = "../../assets/icons/empty-heart.svg";
  likesIconEmpty.alt = "icône coeur vide";
  likesIconEmpty.setAttribute("class", "event-none heart-empty");

  likesIconFull.src = "../../assets/icons/heart.svg";
  likesIconFull.alt = "icône coeur rempli";
  likesIconFull.setAttribute("class", "event-none heart-full");

  likesIconBtn.setAttribute("tabindex", 0);
  likesIconBtn.setAttribute("class", "icon-btn");
  likesIconBtn.setAttribute("data-id", media.id);

  likesIconBtn.appendChild(likesIconEmpty);
  likesIconBtn.appendChild(likesIconFull);

  likesBox.setAttribute("class", "media-likes-container");
  likesBox.appendChild(likes);
  likesBox.appendChild(likesIconBtn);

  div.appendChild(titleBox);
  div.appendChild(likesBox);

  article.appendChild(div);
  article.setAttribute("class", "media");
  article.setAttribute("data-date", media.date);
  article.setAttribute("data-likes", media.likes);
  article.setAttribute("data-name", media.title);

  cardContainer.appendChild(article);
};

/**
 * Itère sur le tableau medias et crée dynamiquement les médias
 * Affiche un loader pendant le montage des médias
 * @param {Array} medias
 */
const displayMedias = (medias) => {
  medias.forEach((media, i) => {
    createMediaCard(media);
    if (i === medias.length - 1) {
      document.querySelector(".loader").classList.add("none");
    }
  });

  const totalLikesElement = document.querySelector(".total-likes");
  const totalLikes = medias.reduce((sum, item) => sum + item.likes, 0);
  totalLikesElement.innerText = totalLikes.toLocaleString();
};

/**
 * Initialise l'action d'ouverture du bouton du formulaire de contact
 * @returns void
 */
const contactBtn = () => {
  const contactBtn = document.querySelector("#contact-btn");

  if (!contactBtn) return;

  // pas de remove listener ici car le bouton est initializé qu'un fois (au montage de l'app), donc aucun risque de fuite de mémoire
  contactBtn.addEventListener("click", () => displayModal("contact"));
};

/**
 * Initialise l'action de fermeture des boutons de la modale
 * @returns void
 */
const handleCloseModalBtn = () => {
  const closeBtns = document.querySelectorAll(".close-modal-btn");

  if (!closeBtns) return;

  // pas de remove listener ici car les boutons sont initializé qu'un fois (au montage de l'app), donc aucun risque de fuite de mémoire
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => closeModal("contact"));
  });
};

/**
 * Au montage de la page on:
 * - récupère les données du photographe
 * - récupères ses photos
 * - affiche ses données profil
 * - affiche ses photos
 * - initialise les actions du carrousel
 * - initialise l'action de fermeture de la modale
 * - initialise l'ouverture du formulaire de contact
 */
const init = async () => {
  const { photographer } = await getPhotographer();
  const { medias } = await getPhotos();
  displayProfilData(photographer);
  displayMedias(medias);
  carrouselActions(medias);
  handleCloseModalBtn();
  contactBtn();
  handleInitSelect();
};

init();
