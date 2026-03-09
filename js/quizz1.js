// quizz.js — logique commune aux trois pages de quiz (quizz.html, quizz2.html, quizz3.html)
// Les variables PHASE, PHASE_OFFSET, NEXT_PAGE et TOTAL_Q sont définies
// dans une balise <script> inline dans chaque fichier HTML, avant ce script.

// ─── Mapping des questions vers leur dimension RIASEC ──────────────────────
// q1→q30 : chaque numéro de question (global) est associé à une dimension.
var RIASEC_MAP = {
    z1: 'R', z2: 'R',   // Réaliste
    z3: 'I', z4: 'I',   // Investigateur
    z15: 'A', z6: 'A',   // Artistique
    z7: 'S', z8: 'S',   // Social
    z9: 'E',             // Entrepreneur
    z10: 'C',             // Conventionnel
    z11: 'R', z12: 'R',
    z13: 'I', z14: 'I',
    z15: 'A', z16: 'A',
    z17: 'S', z18: 'S',
    z19: 'E',
    z20: 'C',
    z21: 'R',
    z22: 'I',
    z23: 'A',
    z24: 'S',
    z25: 'E', z26: 'E', z27: 'E',
    z28: 'C', z29: 'C', z30: 'C'
};

// ─── Récupération des éléments du DOM ─────────────────────────────────────
var current = 0;
var questions = document.querySelectorAll(".question");
var total = questions.length; // 10 sur cette page

var nextBtn = document.querySelector(".next");
var submitBtn = document.getElementById("submitBtn");
var questionNumber = document.getElementById("questionNumber");
var progressPercent = document.getElementById("progressPercent");
var progressBar = document.getElementById("progressBar");

// ─── Mise à jour de la barre de progression globale (sur 30) ──────────────
function updateProgress(localIndex) {
    var globalCurrent = PHASE_OFFSET + localIndex + 1; // ex: phase 2, q0 → Q11
    var percentage = Math.round((globalCurrent / TOTAL_Q) * 100);

    progressBar.style.width = percentage + "%";
    progressPercent.textContent = percentage + "%";
    questionNumber.textContent = "Question " + globalCurrent + " / " + TOTAL_Q;
}

// ─── Affichage d'une question (identique à ton code d'origine) ─────────────
function showQuestion(index) {
    questions.forEach(function (z, i) {
        q.classList.remove("active", "exit-left");
        if (i === index) q.classList.add("active");
    });

    updateProgress(index);

    // Dernière question de la page → bouton soumettre
    if (index === total - 1) {
        submitBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
    } else {
        submitBtn.style.display = "none";
        nextBtn.style.display = "inline-block";
    }

    checkAnswer();
}

// ─── Navigation ───────────────────────────────────────────────────────────
function nextQuestion() {
    if (current < total - 1) {
        questions[current].classList.add("exit-left");
        current++;
        showQuestion(current);
    }
}

function prevQuestion() {
    if (current > 0) {
        current--;
        showQuestion(current);
    }
}

// ─── Vérification qu'une réponse est cochée (ton code d'origine) ──────────
function checkAnswer() {
    var inputs = questions[current].querySelectorAll("input");
    var answered = false;
    inputs.forEach(function (input) {
        if (input.checked) answered = true;
    });

    if (current === total - 1) {
        submitBtn.disabled = !answered;
    } else {
        nextBtn.disabled = !answered;
    }
}

document.addEventListener("change", checkAnswer);

// ─── Soumission de la phase ────────────────────────────────────────────────
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Lire toutes les réponses cochées sur cette page
    var phaseAnswers = {};
    for (var zName in RIASEC_MAP) {
        // On ne traite que les questions de cette phase
        var zNum = parseInt(zName.replace('z', ''));
        if (zNum > PHASE_OFFSET && zNum <= PHASE_OFFSET + 10) {
            var selected = document.querySelector('input[name="' + zName + '"]:checked');
            if (selected) {
                phaseAnswers[zName] = {
                    value: parseInt(selected.value),
                    dim: RIASEC_MAP[zName]
                };
            }
        }
    }

    // Fusionner avec les réponses des phases précédentes (déjà en localStorage)
    var allAnswers = {};
    try {
        var stored = localStorage.getItem("oriCeftAnswers");
        if (stored) allAnswers = JSON.parse(stored);
    } catch (err) { }

    // Fusionner et sauvegarder
    Object.assign(allAnswers, phaseAnswers);
    localStorage.setItem("oriCeftAnswers", JSON.stringify(allAnswers));

    // Si c'est la dernière phase : calculer les scores finaux et passer aux résultats
    if (PHASE === 3) {
        var scores = computeRiasecScores(allAnswers);
        localStorage.setItem("oriCeftResults", JSON.stringify(scores));
    }

    if (PHASE === 3) {
        // Phase finale : grand loading IA (30 sec) qui redirige vers resultat.html
        window.location.href = "../html/loading.html";
    } else {
        // Phase intermediaire : minloading (5 sec) qui redirige vers la phase suivante
        localStorage.setItem("loadingNext", NEXT_PAGE);
        window.location.href = "../html/minloading.html";
    }
});

// ─── Calcul des scores RIASEC normalisés (0–100) ──────────────────────────
function computeRiasecScores(answers) {
    var dims = ['R', 'I', 'A', 'S', 'E', 'C'];
    var raw = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (var key in answers) {
        var a = answers[key];
        if (a && a.dim && a.value) {
            raw[a.dim] += a.value;
            counts[a.dim] += 1;
        }
    }

    var normalized = {};
    dims.forEach(function (d) {
        var maxPossible = counts[d] * 5;
        normalized[d] = maxPossible > 0 ? Math.round((raw[d] / maxPossible) * 100) : 0;
    });

    return { answers: answers, raw: raw, normalized: normalized };
}

// ─── Initialisation ───────────────────────────────────────────────────────
showQuestion(current);
