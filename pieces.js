import { ajoutListenersAvis } from "/avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
//fiche article

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];

        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} e (${pieces[i].prix < 35 ? "e" : "eee"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

        const descriptifElement = document.createElement("p");
        descriptifElement.innerText = pieces[i].descriptif ?? "(Pas de description pour le moment.)";

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "rupture de stock";

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        sectionFiches.appendChild(pieceElement);

        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptifElement);
        pieceElement.appendChild(disponibiliteElement);
        pieceElement.appendChild(avisBouton);

    }
    ajoutListenersAvis();
}
//Première affichage des fiches et listes
genererPieces(pieces);
listeAbordable(pieces);
listeDisponible(pieces);

//intérection avec les boutons de filtres
const boutonReset = document.querySelector(".reset");
boutonReset.addEventListener("click", () =>{;
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieces);
    listeAbordable(pieces);
    listeDisponible(pieces);
})

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b){
        return a.prix - b.prix;
    });
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesOrdonnees);
});


const boutonTrierInverse = document.querySelector(".btn-trier-inverse");
boutonTrierInverse.addEventListener("click", () => {
    const piecesOrdonneesInverse = Array.from(pieces);
    piecesOrdonneesInverse.sort(function (a, b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonneesInverse);
});


const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", () =>{
    const piecesFiltrerDescription = pieces.filter(function (pieces) {
        return pieces.descriptif;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrerDescription);
});

const rangePrix = document.querySelector(".range-prix");
rangePrix.addEventListener("input", () => {
    const listeRangePrix = pieces.filter(function (pieces) {
        return pieces.prix <= rangePrix.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(listeRangePrix);
});

//liste pieces abordable
function listeAbordable(){
    const nomAbordable = pieces.map(pieces => pieces.nom);

    for (let j = pieces.length - 1; j >= 0; j--){
        if (pieces[j].prix > 35){
            nomAbordable.splice(j,1)
        }
    }

    const abordableElement = document.createElement("ul");
    for (let k = 0;k < nomAbordable.length;k++){
        const nomAbordableElement = document.createElement("li");
        nomAbordableElement.innerText = nomAbordable[k];
        abordableElement.appendChild(nomAbordableElement);
    }
    document.querySelector(".abordable").appendChild(abordableElement);
}

//liste pieces disponible
function listeDisponible(){
    const nomsDisponibles = pieces.map(piece => piece.nom);
    const prixDisponibles = pieces.map(piece => piece.prix);

    for(let i = pieces.length -1 ; i >= 0; i--){
        if(pieces[i].disponibilite === false){
            nomsDisponibles.splice(i,1);
            prixDisponibles.splice(i,1);
        }
    }

    const disponiblesElement = document.createElement('ul');

    for(let i=0 ; i < nomsDisponibles.length ; i++){
        const nomElement = document.createElement('li');
        nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
        disponiblesElement.appendChild(nomElement);
    }

    document.querySelector('.disponibles').appendChild(disponiblesElement);
}