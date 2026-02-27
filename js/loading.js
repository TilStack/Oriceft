const messages = [
    "Initialisation du modèle IA...",
    "Analyse des réponses...",
    "Interprétation du profil académique...",
    "Comparaison avec la base de données...",
    "Génération des recommandations...",
    "Optimisation des résultats...",
    "Finalisation du rapport..."
];

let progress = 0;
let messageIndex = 0;
const bar = document.getElementById("progressBar");
const text = document.getElementById("statusText");

const interval = setInterval(() => {

    progress += 1;
    bar.style.width = progress + "%";

    if (progress % 5 === 0 && messageIndex < messages.length - 1) {
        messageIndex++;
        text.textContent = messages[messageIndex];
    }

    if (progress >= 100) {
        clearInterval(interval);
        window.location.href = "resultat.html";
    }

}, 300); // 100 * 300ms = 30 secondes