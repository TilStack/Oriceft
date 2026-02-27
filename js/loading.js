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

        // ── Récupérer les données complètes des 30 questions ──────────────
        var answersRaw = localStorage.getItem("oriCeftAnswers");
        var resultsRaw = localStorage.getItem("oriCeftResults");

        var answers = answersRaw ? JSON.parse(answersRaw) : {};
        var results = resultsRaw ? JSON.parse(resultsRaw) : {};

        // ── Construire le JSON final complet ─────────────────────────────
        var finalJson = {
            reponses_30_questions: answers,
            scores_riasec: results.normalized || {},
            scores_bruts: results.raw || {}
        };

        // ── Sauvegarder le JSON final pour la page résultat ──────────────
        localStorage.setItem("oriFinalJson", JSON.stringify(finalJson, null, 2));

        // ── Redirection vers la page résultats ───────────────────────────
        window.location.href = "resultat.html";
    }

}, 300); // 100 * 300ms = 30 secondes
