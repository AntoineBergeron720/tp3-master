const nomInput = document.getElementById("nom");
const formulaire = document.getElementById("parametresCreation")
formulaire.addEventListener("submit", gererSoumission)
let carte1 = null
let carte2 = null
let nbCartesRetournees = 0;
let nbCartes = 0;
let countdownInterval;

const timer = document.getElementById("timer");

function gererSoumission(e) {
    e.preventDefault()
    const nbPaires = document.getElementById("nbPaires").value
    const nom = document.getElementById("nom").value
    if (nbPaires < 2 || nbPaires > 10) {
        alert("Le nombre de cartes doit être compris entre 1 et 10")
        const countdown = document.createElement("div");
        countdown.id = "countdown";
        timer.appendChild(countdown);
    } else if (nom.trim() === "") {
        const nomErreur = document.createElement("span");
        nomErreur.textContent = "Vous devez entrer un nom.";
        nomErreur.classList.add("erreur");
        nomInput.insertAdjacentElement("afterend", nomErreur);
    } else {
        const tableauFormulaire = document.getElementById("tableau")
        tableauFormulaire.remove()
        const enTete = document.getElementById("titre")
        enTete.remove()
        creerCartes(nbPaires)
        nbCartes = nbPaires * 2;
        const countdown = document.createElement("div");
        countdown.id = "countdown";
        timer.appendChild(countdown);
        document.getElementById("timer").style.display = "block";
        startTimer(); // démarrer le minuteur
        
    }
}


// Définir la durée initiale en secondes
let timeRemaining = 300; 


function startTimer() {
  countdownInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timer.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Arrêter le minuteur lorsque le temps est écoulé
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}
function creerCartes(nbPaires) {
    let nbCartesRetournees = 0;
    const nbCartes = nbPaires * 2;
    const jeu = document.getElementById("jeu")
    const tableauCartes = []
    for (let i = 0; i < nbPaires; i++) {
        tableauCartes.push(i)
        tableauCartes.push(i)
    }

    const tableauCartesMelangees = []
    while (tableauCartes.length > 0) {
        const index = Math.floor(Math.random() * tableauCartes.length)
        tableauCartesMelangees.push(tableauCartes[index])
        tableauCartes.splice(index, 1)
    }
    for (let i = 0; i < tableauCartesMelangees.length; i++) {
        creerCarte(tableauCartesMelangees[i])
    }
}

function creerCarte(number) {
    const carte = document.createElement("button")
    carte.classList.add("cache")
    jeu.appendChild(carte)
    carte.setAttribute("data-num", number)
    carte.addEventListener("click", actionCarte)
}


function actionCarte(e) {
    const numeroCarte = e.target.getAttribute("data-num");
    e.target.classList.remove("cache");
    e.target.classList.add("revele");
    e.target.disabled = true;
  
    if (carte1 === null) {
      carte1 = e.target;
      e.target.textContent = numeroCarte;
    } else if (carte2 === null) {
      carte2 = e.target;
      e.target.textContent = numeroCarte;
  
      if (carte1.getAttribute("data-num") === carte2.getAttribute("data-num")) {
        carte1 = null;
        carte2 = null;
        nbCartesRetournees += 2;
      } else {
        setTimeout(function () {
          carte1.classList.remove("revele");
          carte1.classList.add("cache");
          carte2.classList.remove("revele");
          carte2.classList.add("cache");
          carte1 = null;
          carte2 = null;
          carte1.textContent = "";
          carte2.textContent = "";
        }, 1000);
        carte1.disabled = false;
        carte2.disabled = false;
      }
      
      if (nbCartesRetournees === nbCartes) {
        clearInterval(countdownInterval);
      }
    }
  }