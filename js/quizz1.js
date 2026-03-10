// ─── Mapping des questions vers leur dimension RIASEC ──────────────────────
var RIASEC_MAP = {
    z1: 'R', z2: 'R',   // Réaliste
    z3: 'I', z4: 'I',   // Investigateur
    z5: 'A', z6: 'A',   // Artistique (Corrigé : z5 au lieu de z15)
    z7: 'S', z8: 'S',   // Social
    z9: 'E',            // Entrepreneur
    z10: 'C',           // Conventionnel
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
var total = questions.length; 

var nextBtn = document.querySelector(".next");
var submitBtn = document.getElementById("submitBtn");
var questionNumber = document.getElementById("questionNumber");
var progressPercent = document.getElementById("progressPercent");
var progressBar = document.getElementById("progressBar");

// ─── Mise à jour de la barre de progression ──────────────────────────────
function updateProgress(localIndex) {
    var globalCurrent = PHASE_OFFSET + localIndex + 1;
    var percentage = Math.round((globalCurrent / TOTAL_z) * 100);

    if (progressBar) progressBar.style.width = percentage + "%";
    if (progressPercent) progressPercent.textContent = percentage + "%";
    if (questionNumber) questionNumber.textContent = "Question " + globalCurrent + " / " + TOTAL_z;
}

// ─── Affichage d'une question (CORRIGÉ) ──────────────────────────────────
function showQuestion(index) {
    questions.forEach(function (questionElement, i) {
        // CORRECTION : On utilise questionElement, pas 'q' ou 'z'
        questionElement.classList.remove("active", "exit-left");
        if (i === index) {
            questionElement.classList.add("active");
        }
    });

    updateProgress(index);

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

// ─── Vérification du clic ────────────────────────────────────────────────
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

// ─── Soumission de la phase (CORRIGÉ) ──────────────────────────────────────
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    var phaseAnswers = {};
    
    // On récupère uniquement les questions de cette page (z1 à z10)
    questions.forEach(function(qDiv) {
        var radio = qDiv.querySelector('input[type="radio"]:checked');
        if (radio) {
            var qName = radio.name;
            phaseAnswers[qName] = {
                // IMPORTANT : Vos values sont du texte, on stocke 1 si c'est la réponse "Oui" (_1)
                value: radio.id.endsWith('_1') ? 1 : 0, 
                dim: RIASEC_MAP[qName]
            };
        }
    });

    var allAnswers = JSON.parse(localStorage.getItem("oriCeftAnswers") || "{}");
    Object.assign(allAnswers, phaseAnswers);
    localStorage.setItem("oriCeftAnswers", JSON.stringify(allAnswers));

    if (PHASE === 3) {
        // Calculer les scores si on est à la fin
        var scores = computeRiasecScores(allAnswers);
        localStorage.setItem("oriCeftResults", JSON.stringify(scores));
        window.location.href = "../html/loading.html";
    } else {
        localStorage.setItem("loadingNext", NEXT_PAGE);
        window.location.href = "../html/minloading.html";
    }
});

// ─── Calcul des scores ───────────────────────────────────────────────────
function computeRiasecScores(answers) {
    var raw = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (var key in answers) {
        var a = answers[key];
        raw[a.dim] += a.value;
        counts[a.dim] += 1;
    }

    var normalized = {};
    ['R', 'I', 'A', 'S', 'E', 'C'].forEach(function (d) {
        normalized[d] = counts[d] > 0 ? Math.round((raw[d] / counts[d]) * 100) : 0;
    });

    return { normalized: normalized };
}

// Lancement
showQuestion(current);