// quizz.js — logique commune aux trois pages de quiz (quizz.html, quizz2.html, quizz3.html)
// Les variables PHASE, PHASE_OFFSET, NEXT_PAGE et TOTAL_Q sont définies
// dans une balise <script> inline dans chaque fichier HTML, avant ce script.

// ─── Mapping des questions vers leur dimension RIASEC ──────────────────────
// q1→q30 : chaque numéro de question (global) est associé à une dimension.
var RIASEC_MAP = {
    q1: 'R', q2: 'R',   // Réaliste
    q3: 'I', q4: 'I',   // Investigateur
    q5: 'A', q6: 'A',   // Artistique
    q7: 'S', q8: 'S',   // Social
    q9: 'E',             // Entrepreneur
    q10: 'C',             // Conventionnel
    q11: 'R', q12: 'R',
    q13: 'I', q14: 'I',
    q15: 'A', q16: 'A',
    q17: 'S', q18: 'S',
    q19: 'E',
    q20: 'C',
    q21: 'R',
    q22: 'I',
    q23: 'A',
    q24: 'S',
    q25: 'E', q26: 'E', q27: 'E',
    q28: 'C', q29: 'C', q30: 'C'
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
    questions.forEach(function (q, i) {
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

    var answered = false;

    // vérifier radio
    var radios = questions[current].querySelectorAll("input[type=radio]");
    radios.forEach(function(radio){
        if(radio.checked) answered = true;
    });

    // vérifier select
    var select = questions[current].querySelector("select");
    if(select && select.value !== ""){
        answered = true;
    }

    if (current === total - 1) {
        submitBtn.disabled = !answered;
    } else {
        nextBtn.disabled = !answered;
    }
}
document.addEventListener("change", checkAnswer);

// ─── Soumission de la phase ────────────────────────────────────────────────
 

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
let radios = document.querySelectorAll("input[type=radio]");
let selects = document.querySelectorAll("select");

selects.forEach(function(select){
    select.addEventListener("change", function(){
        nextBtn.disabled = false;
        checkAnswer();
    });
});

radios.forEach(function(radio){

    radio.addEventListener("change", function(){
        nextBtn.disabled = false;
    });

});

nextBtn.addEventListener("click", function(){

let selectedRadio = questions[current].querySelector("input[type=radio]:checked");
let selectedSelect = questions[current].querySelector("select");

let question;
let value;

if(selectedRadio){
    question = selectedRadio.name;
    value = selectedRadio.value;
}
else if(selectedSelect && selectedSelect.value !== ""){
    question = selectedSelect.name;
    value = selectedSelect.value;
}
else{
    return;
}




fetch("save_answer.php",{

method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:"question="+question+
"&value="+value+
"&id="+USER_ID+
"&quizz="+quizz

})
.then(res=>res.text())
.then(data=>{

if(current < total-1){

nextQuestion();
nextBtn.disabled = true;

}else{

localStorage.setItem("loadingNext", NEXT_PAGE);
window.location.href="../html/minloading.php?id="+USER_ID;

}

});

});



submitBtn.addEventListener("click", function(){

let selected = questions[current].querySelector("input[type=radio]:checked");

if(!selected) return;

let question = selected.name;
let value = selected.value;

fetch("save_answer.php",{

method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:new URLSearchParams({
question: question,
value: value,
id: USER_ID,
quizz: quizz
})

})
.then(res=>res.text())
.then(data=>{

localStorage.setItem("loadingNext", NEXT_PAGE);
if((quizz==3) || (quizz==6) || (quizz == 9)){
window.location.href="../html/loading.php?id="+USER_ID;
}

else{
    window.location.href="../html/minloading.php?id="+USER_ID;
}

});

});