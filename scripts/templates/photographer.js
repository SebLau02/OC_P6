function photographerTemplate(data) {
  const { name, portrait, city, price, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", "photographer.html");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.loading = "lazy";
    img.alt = name;
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

    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(p);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
