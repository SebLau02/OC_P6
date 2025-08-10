import { displayModal } from "../utils/contactForm.js";

const carrousel = document.querySelector("#carrousel");
const currentImage = carrousel.querySelector(".image-container img");
const currentVideo = carrousel.querySelector(".image-container video");
const currentImageCaption = carrousel.querySelector(
  ".image-container figcaption"
);

const setMedia = (media) => {
  if ("video" in media) {
    currentVideo.src = `../../assets/medias/${media.video}`;
    currentVideo.alt = `${media.title}`;
    currentVideo.setAttribute("data-id", media.id);
    currentImageCaption.innerText = media.title;
    currentImage.removeAttribute("data-id");
    currentVideo.classList.remove("none");
    currentImage.classList.add("none");
  } else {
    currentImage.src = `../../assets/medias/${media.image}`;
    currentImage.alt = `${media.title}`;
    currentImage.setAttribute("data-id", media.id);
    currentImageCaption.innerText = media.title;
    currentVideo.removeAttribute("data-id");
    currentImage.classList.remove("none");
    currentVideo.classList.add("none");
  }
};
const handleNextImage = (medias) => {
  const currentMediaId = currentImage.dataset.id || currentVideo.dataset.id;
  const currentMediaIndex = medias.findIndex(
    (m) => m.id === parseInt(currentMediaId)
  );
  let nextMedia = null;
  if (currentMediaIndex === medias.length - 1) {
    nextMedia = medias[0];
  } else {
    nextMedia = medias[currentMediaIndex + 1];
  }
  setMedia(nextMedia);
};
const handlePrevImage = (medias) => {
  const currentMediaId = currentImage.dataset.id || currentVideo.dataset.id;
  const currentMediaIndex = medias.findIndex(
    (m) => m.id === parseInt(currentMediaId)
  );
  let nextMedia = null;
  if (currentMediaIndex === 0) {
    nextMedia = medias[medias.length - 1];
  } else {
    nextMedia = medias[currentMediaIndex - 1];
  }
  setMedia(nextMedia);
};
const handleClickNextImage = (medias) => {
  const chevronNext = document.querySelector("#next-chevron");
  const chevronPrev = document.querySelector("#prev-chevron");

  chevronNext.addEventListener("click", () => handleNextImage(medias));
  chevronPrev.addEventListener("click", () => handlePrevImage(medias));
};
const handleOpenCarrousel = (e, medias) => {
  displayModal("carrousel");
  const clickedMediaId = parseInt(e.target.dataset.id);
  const clickedMedia = medias.find((m) => m.id === clickedMediaId);

  setMedia(clickedMedia);

  handleClickNextImage(medias);
};

const handleLike = (e) => {
  e.target.classList.toggle("liked");

  const likesCount = e.currentTarget.parentNode.querySelector("span");
  const totalLikes = document.querySelector(".total-likes");

  if (e.target.classList.contains("liked")) {
    likesCount.innerText = parseInt(likesCount.textContent) + 1;
    totalLikes.innerText = parseInt(totalLikes.textContent) + 1;
  } else {
    likesCount.innerText = parseInt(likesCount.textContent) - 1;
  }
};

export const carrouselActions = (medias) => {
  const mediasElement = document.querySelectorAll(".media");

  mediasElement.forEach((media) => {
    const mediasImage = media.querySelector("img");
    const likeBtn = media.querySelector(".icon-btn");

    mediasImage.addEventListener("click", (e) =>
      handleOpenCarrousel(e, medias)
    );
    mediasImage.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleOpenCarrousel(e, medias);
    });
    likeBtn.addEventListener("click", (e) => handleLike(e));
  });
};
