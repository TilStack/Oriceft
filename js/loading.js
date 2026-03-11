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

// ÉTAPE 1 : Lancer l'analyse PHP immédiatement
function lancerAnalyseIA() {
    if (USER_ID === 0) {
        alert("Erreur : ID utilisateur manquant.");
        return;
    }

  fetch(`envoi.php?id=${USER_ID}`)
        .then(response => {
            if (!response.ok) {
                // Si le serveur renvoie une erreur (429 quota, 500 erreur php)
                throw new Error("Erreur serveur lors de l'analyse");
            }
            return response.json();
        })
        .then(data => {
            console.log("Analyse réussie :", data);
            window.location.href = `resultat.php?id=${USER_ID}`;
        })
        .catch(error => {
            console.error("Erreur :", error);
            // On affiche l'erreur sur la page de chargement au lieu de rediriger dans le vide
            text.style.color = "red";
            text.textContent = "Erreur : " + error.message + ". Veuillez réessayer.";
            // On arrête la barre de progression
            clearInterval(interval);
        });
}

lancerAnalyseIA();

// ÉTAPE 2 : Animation de la barre (visuel uniquement)
const interval = setInterval(() => {
    progress += 1;
    
    // On bloque à 98% pour attendre la réponse réelle si c'est lent
    if (progress <= 98) {
        bar.style.width = progress + "%";
    }

    if (progress % 14 === 0 && messageIndex < messages.length - 1) {
        messageIndex++;
        text.textContent = messages[messageIndex];
    }

    if (progress >= 100) {
        clearInterval(interval);
    }
}, 300);