// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
//fiche ampoule LED
const article = pieces[0];

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} e (${article.prix < 35 ? "e" : "eee"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

const descriptifElement = document.createElement("p");
descriptifElement.innerText = article.descriptif ?? "(Pas de description pour le moment.)";

const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "rupture de stock";

const sectionfiche = document.querySelector(".fiches");
sectionfiche.appendChild(imageElement);
sectionfiche.appendChild(nomElement);
sectionfiche.appendChild(prixElement);
sectionfiche.appendChild(categorieElement);
sectionfiche.appendChild(descriptifElement);
sectionfiche.appendChild(disponibiliteElement);