// Gestionnaire du formulaire de quiz et redirection vers les résultats
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les réponses
            const formData = new FormData(quizForm);
            const answers = {};
            const checkboxAnswers = {};
            
            // Traiter les réponses radio et checkboxes
            for (let [key, value] of formData.entries()) {
                if (key.startsWith('q')) {
                    if (key === 'q5' || key === 'q6') {
                        // Checkboxes
                        if (!checkboxAnswers[key]) {
                            checkboxAnswers[key] = [];
                        }
                        checkboxAnswers[key].push(value);
                    } else {
                        // Radio buttons
                        answers[key] = value;
                    }
                }
            }
            
            // Combiner les réponses
            const allAnswers = { ...answers, ...checkboxAnswers };
            
            // Vérifier que toutes les questions sont répondues
            if (!validateAnswers(allAnswers)) {
                alert('⚠️ Veuillez répondre à toutes les questions avant de soumettre!');
                return;
            }
            
            // Sauvegarder les réponses en localStorage
            localStorage.setItem('quizAnswers', JSON.stringify(allAnswers));
            
            // Rediriger vers la page de résultats
            window.location.href = 'result.html';
        });
    }
});

// Valider que toutes les questions sont répondues
function validateAnswers(answers) {
    const requiredQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'];
    
    for (let q of requiredQuestions) {
        if (!answers[q] || (Array.isArray(answers[q]) && answers[q].length === 0)) {
            return false;
        }
    }
    return true;
}
