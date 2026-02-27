let current = 0;
    const questions = document.querySelectorAll(".question");
    const total = questions.length;
    
    const nextBtn = document.querySelector(".next");
    const submitBtn = document.getElementById("submitBtn");
    const questionNumber = document.getElementById("questionNumber");
    const progressPercent = document.getElementById("progressPercent");
    const progressBar = document.getElementById("progressBar");

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

    function checkAnswer() {
        const inputs = questions[current].querySelectorAll("input");
        let answered = false;

        inputs.forEach(input => {
            if (input.checked) answered = true;
            input.addEventListener("change", checkAnswer);
        });

        nextBtn.disabled = !answered;
    }

    // Initialisation
    showQuestion(current);