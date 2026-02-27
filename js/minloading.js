// ─── Destination après les 5 secondes ─────────────────────────────────
// On lit depuis localStorage (stocké par quizz.js avant la redirection)
var nextPage = localStorage.getItem("loadingNext") || "resultat.html";

// ─── Adapter le texte selon la destination ─────────────────────────────
var isIntermediate = nextPage.indexOf("quizz") !== -1;
var phaseMatch = nextPage.match(/quizz(\d?)\.html/);
var nextPhaseNum = phaseMatch ? (phaseMatch[1] || "1") : null;

if (isIntermediate && nextPhaseNum) {
    var from = (parseInt(nextPhaseNum) - 1) * 10 + 1;
    var to = parseInt(nextPhaseNum) * 10;
    document.getElementById("ldTitle").textContent = "Bien reçu !";
    document.getElementById("ldSub").textContent = "Préparation de la partie " + nextPhaseNum + " sur 3…";
    document.getElementById("t3").textContent = "Chargement des questions " + from + " à " + to;
} else {
    document.getElementById("ldTitle").textContent = "Analyse finale…";
    document.getElementById("ldSub").textContent = "Correspondance avec les filières camerounaises";
    document.getElementById("t3").textContent = "Génération de vos recommandations personnalisées";
}

// ─── Séquence des étapes ───────────────────────────────────────────────
var sequence = [
    { id: "s0", dot: "d0", start: 200, end: 700 },
    { id: "s1", dot: "d1", start: 900, end: 1600 },
    { id: "s2", dot: "d2", start: 1800, end: 2600 },
    { id: "s3", dot: "d3", start: 2800, end: 3700 }
];

sequence.forEach(function (item) {
    var stepEl = document.getElementById(item.id);
    var dotEl = document.getElementById(item.dot);

    setTimeout(function () {
        stepEl.classList.add("active");
        dotEl.textContent = "⋯";
    }, item.start);

    setTimeout(function () {
        stepEl.classList.remove("active");
        stepEl.classList.add("done");
        dotEl.textContent = "✓";
    }, item.end);
});

// ─── Barre de progression (5 secondes) ────────────────────────────────
var pFill = document.getElementById("pFill");
var pPct = document.getElementById("pPct");
var tStart = Date.now();
var TOTAL = 5000;

(function tick() {
    var elapsed = Date.now() - tStart;
    var progress = Math.min((elapsed / TOTAL) * 100, 100);
    pFill.style.width = progress + "%";
    pPct.textContent = Math.round(progress) + "%";
    if (progress < 100) requestAnimationFrame(tick);
})();

// ─── Redirection automatique après 5 secondes ─────────────────────────
setTimeout(function () {
    window.location.href = nextPage;
}, 5000);