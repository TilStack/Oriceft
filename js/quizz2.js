// ─── Mapping des questions vers leur dimension RIASEC ──────────────────────
var RIASEC_MAP = {
    t1: 'R', t2: 'R', t3: 'I', t4: 'I', t5: 'R', t6: 'R', t7: 'R', t8: 'R', t9: 'C', t10: 'C',
    t11: 'R', t12: 'R', t13: 'I', t14: 'I', t15: 'A', t16: 'A', t17: 'S', t18: 'S', t19: 'E', t20: 'C',
    t21: 'R', t22: 'I', t23: 'A', t24: 'S', t25: 'E', t26: 'E', t27: 'E', t28: 'C', t29: 'C', t30: 'C'
};

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
    var percentage = Math.round((globalCurrent / TOTAL_t) * 100);

    if (progressBar) progressBar.style.width = percentage + "%";
    if (progressPercent) progressPercent.textContent = percentage + "%";
    if (questionNumber) questionNumber.textContent = "Question " + globalCurrent + " / " + TOTAL_t;
}

// ─── Affichage d'une question (CORRIGÉ) ──────────────────────────────────
function showQuestion(index) {
    questions.forEach(function (questionElement, i) {
        questionElement.classList.remove("active", "exit-left");
        if (i === index) questionElement.classList.add("active");
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

// ─── Vérification de la réponse (Gère SELECT et RADIO) ─────────────────────
function checkAnswer() {
    var questionActuelle = questions[current];
    var answered = false;

    // On cherche d'abord un SELECT (Question 1)
    var select = questionActuelle.querySelector("select");
    if (select) {
        answered = select.value !== "";
    } else {
        // Sinon on cherche les RADIO (Questions 2 à 10)
        var inputs = questionActuelle.querySelectorAll("input[type='radio']");
        inputs.forEach(function (input) {
            if (input.checked) answered = true;
        });
    }

    if (current === total - 1) {
        submitBtn.disabled = !answered;
    } else {
        nextBtn.disabled = !answered;
    }
}

// Écouter les changements (clics ou sélections)
document.addEventListener("change", checkAnswer);

// ─── Soumission de la phase ────────────────────────────────────────────────
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    var phaseAnswers = {};
    
    // On boucle sur les questions de la page
    questions.forEach(function(qDiv) {
        var radio = qDiv.querySelector('input[type="radio"]:checked');
        var select = qDiv.querySelector('select');
        
        if (radio) {
            var name = radio.name;
            // On donne 1 point si c'est le premier choix (_1), 0 sinon
            phaseAnswers[name] = {
                value: radio.id.endsWith('_1') ? 1 : 0,
                text: radio.value,
                dim: RIASEC_MAP[name]
            };
        } else if (select && select.value !== "") {
            phaseAnswers[select.name] = {
                value: 1, // La filière actuelle compte comme un point d'intérêt
                text: select.value,
                dim: RIASEC_MAP[select.name]
            };
        }
    });

    var allAnswers = JSON.parse(localStorage.getItem("oriCeftAnswers") || "{}");
    Object.assign(allAnswers, phaseAnswers);
    localStorage.setItem("oriCeftAnswers", JSON.stringify(allAnswers));

    if (PHASE === 3) {
        var scores = computeRiasecScores(allAnswers);
        localStorage.setItem("oriCeftResults", JSON.stringify(scores));
        window.location.href = "../html/loading.html";
    } else {
        localStorage.setItem("loadingNext", NEXT_PAGE);
        window.location.href = "../html/minloading.html";
    }
});

// ─── Calcul des scores simplifié ──────────────────────────────────────────
function computeRiasecScores(answers) {
    var raw = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (var key in answers) {
        var a = answers[key];
        if (a.dim) {
            raw[a.dim] += a.value;
            counts[a.dim] += 1;
        }
    }

    var normalized = {};
    ['R', 'I', 'A', 'S', 'E', 'C'].forEach(function (d) {
        normalized[d] = counts[d] > 0 ? Math.round((raw[d] / counts[d]) * 100) : 0;
    });

    return { normalized: normalized };
}

// Init
showQuestion(current);