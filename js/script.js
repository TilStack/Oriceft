
const params = new URLSearchParams(window.location.search);
const niveauFromPage1 = params.get("niveau");

console.log("Niveau choisi page 1 :", niveauFromPage1);

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Ferme le menu au clic sur un lien
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
});

// Ajoute la classe `active` au lien de navigation correspondant à la page courante
(function () {
    function filename(path) {
        var parts = path.split('/');
        var f = parts.pop() || parts.pop();
        try { return decodeURIComponent(f || ''); } catch (e) { return f || ''; }
    }

    var current = filename(window.location.pathname);
    var links = document.querySelectorAll('nav a[href]');
    links.forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        try {
            var linkPath = new URL(href, window.location.origin).pathname;
            var linkFile = filename(linkPath);
            if (linkFile === current || (linkFile === '' && (current === '' || current === 'index.html'))) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        } catch (e) {
            // ignore malformed URLs
        }
    });
})();

// Récuperation de toute les réponses en json
function getAllAnswers() {
    const formData = new FormData(document.querySelector("form"));
    const answers = {};

    for (let [key, value] of formData.entries()) {

        if (answers[key]) {
            // Si plusieurs valeurs (checkbox)
            if (!Array.isArray(answers[key])) {
                answers[key] = [answers[key]];
            }
            answers[key].push(value);
        } else {
            answers[key] = value;
        }
    }

    // Ajouter le niveau de la première page
    answers.niveau = niveauFromPage1;

    return answers;
}