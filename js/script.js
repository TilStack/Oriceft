// Gère le menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Ferme le menu au clic sur un lien
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
});

// Ajoute la classe `active` au lien de navigation correspondant à la page courante
(function(){
    function filename(path){
        var parts = path.split('/');
        var f = parts.pop() || parts.pop();
        try { return decodeURIComponent(f || ''); } catch(e) { return f || ''; }
    }

    var current = filename(window.location.pathname);
    var links = document.querySelectorAll('nav a[href]');
    links.forEach(function(a){
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
        } catch(e) {
            // ignore malformed URLs
        }
    });
})();
