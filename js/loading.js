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
    .then(async response => {
        const textData = await response.text(); // On récupère d'abord le texte brut
        try {
            return JSON.parse(textData); // On essaie de transformer en JSON
        } catch (e) {
            // Si ce n'est pas du JSON, c'est l'erreur PHP brute !
            throw new Error("Réponse serveur invalide : " + textData);
        }
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        console.log("Analyse réussie :", data);
        window.location.href = `resultat.php?id=${USER_ID}`;
    })
    .catch(error => {
        console.error("Erreur détaillée :", error);
        text.style.color = "#e74c3c";
        text.style.fontWeight = "bold";
        text.textContent = error.message;
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