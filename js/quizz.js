let current = 0;
const questions = document.querySelectorAll(".question");
const total = questions.length;

const nextBtn = document.querySelector(".next");
const submitBtn = document.getElementById("submitBtn");
const questionNumber = document.getElementById("questionNumber");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
//Recuperons les parametres de la page précedente
const params = new URLSearchParams(window.location.search);
const niveauFromPage1 = params.get("niveau");

function updateProgress(index) {
    // Calcul du pourcentage : (index actuel + 1) / total
    const percentage = Math.round(((index + 1) / total) * 100);

    // Mise à jour de la barre et du texte
    progressBar.style.width = percentage + "%";
    progressPercent.textContent = percentage + "%";
    questionNumber.textContent = "Question " + (index + 1);
}

function showQuestion(index) {
    questions.forEach((q, i) => {
        q.classList.remove("active", "exit-left");
        if (i === index) {
            q.classList.add("active");
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

//Code modifié
function checkAnswer() {
    const inputs = questions[current].querySelectorAll("input");
    let answered = false;

    inputs.forEach(input => {
        if (input.checked) answered = true;
    });

    nextBtn.disabled = !answered;
}
document.addEventListener("change", checkAnswer);

//Code modifié
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const answers = getAllAnswers();
    const jsonData = JSON.stringify(answers, null, 2);

    alert("Analyse en cours...\n\n" + jsonData);

    localStorage.setItem("quizResults", jsonData);

    window.location.href = "../html/loading.html";
});
// Initialisation
showQuestion(current);

function getAllAnswers() {
    const form = document.querySelector("form");
    const formData = new FormData(form);

    const data = {};

    for (let [key, value] of formData.entries()) {

        // Gestion des checkbox multiples
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    data.niveau = niveauFromPage1;
    return data;
}
