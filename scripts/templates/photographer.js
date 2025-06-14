function photographerTemplate(data) {
  const { name, portrait, city, price, country, tagline, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.loading = "lazy";
    img.alt = name;
    const imgContainer = document.createElement("div");
    imgContainer.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const localisation = document.createElement("p");
    localisation.innerText = `${city}, ${country}`;

    const description = document.createElement("p");
    description.innerText = tagline;

    const tjm = document.createElement("p");
    tjm.innerText = `${price}€/jour`;

    const p = document.createElement("div");
    p.appendChild(localisation);
    p.appendChild(description);
    p.appendChild(tjm);

    link.appendChild(imgContainer);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(p);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
