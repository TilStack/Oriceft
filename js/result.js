// ─── FILIÈRES DATA (from PDF) ──────────────────────────────────────────────
const FILIERES = [
    {
        id: 'C', icon: '🔬', name: 'Série C – Mathématiques & Physiques',
        type: 'general',
        riasec: [{ d: 'I', w: 0.55 }, { d: 'R', w: 0.45 }],
        desc: 'La filière scientifique la plus exigeante du système camerounais. Centrée sur les mathématiques avancées et la physique-chimie, elle développe abstraction, raisonnement logique et modélisation.',
        debouches: ['Ingénieur', 'Enseignant sciences', 'Chercheur', 'Informaticien', 'Technicien énergie'],
        ecoles: 'ENSP, Polytechnique, Facultés des Sciences'
    },
    {
        id: 'B', icon: '📊', name: 'Série B – Sciences Économiques & Sociales',
        type: 'general',
        riasec: [{ d: 'I', w: 0.4 }, { d: 'E', w: 0.35 }, { d: 'C', w: 0.25 }],
        desc: 'Formation pluridisciplinaire alliant économie, sociologie et mathématiques appliquées. Analyse des faits de société, statistiques, politiques économiques et droit.',
        debouches: ['Économiste', 'Comptable', 'Commercial', 'RH', 'Journaliste éco'],
        ecoles: 'FSEG, ESSEC, ENAM, ESSTIC, BTS Gestion'
    },
    {
        id: 'A1', icon: '📜', name: 'Série A1 – Lettres (Latin-Grec)',
        type: 'general',
        riasec: [{ d: 'A', w: 0.55 }, { d: 'I', w: 0.45 }],
        desc: 'Formation classique approfondie centrée sur les humanités anciennes. Latin, grec, philosophie, littérature française. Développe une rigueur intellectuelle exceptionnelle et une vaste culture générale.',
        debouches: ['Enseignant lettres', 'Journaliste', 'Traducteur', 'Archiviste', 'Éditeur'],
        ecoles: 'ENS, FLSH, ESSTIC, IRIC, ENAM'
    },
    {
        id: 'A2', icon: '🌍', name: 'Série A2 – Lettres (Latin + LV2)',
        type: 'general',
        riasec: [{ d: 'A', w: 0.5 }, { d: 'S', w: 0.3 }, { d: 'I', w: 0.2 }],
        desc: 'Combine l\'étude du latin avec l\'approfondissement d\'une 2ème langue vivante (allemand, espagnol, arabe…). Prépare aux métiers nécessitant une double compétence linguistique et culturelle.',
        debouches: ['Professeur de langues', 'Traducteur', 'Diplomate', 'Guide touristique', 'Attaché culturel'],
        ecoles: 'ENS, ESSTIC, IRIC, ENAM, FLSH'
    },
    {
        id: 'A4', icon: '💬', name: 'Série A4 – Langues Vivantes Modernes',
        type: 'general',
        riasec: [{ d: 'A', w: 0.5 }, { d: 'E', w: 0.3 }, { d: 'S', w: 0.2 }],
        desc: 'Entièrement centrée sur les langues vivantes modernes (français + deux langues étrangères). Maîtrise quasi-native à l\'écrit et à l\'oral, avec ouverture sur les cultures internationales.',
        debouches: ['Interprète de conférence', 'Traducteur pro', 'Enseignant langues', 'Journaliste international', 'Responsable export'],
        ecoles: 'IRIC, ASTI Buéa, ESSTIC, ENAM, ENS'
    },
    {
        id: 'CG', icon: '🧾', name: 'CG / G2 – Comptabilité & Gestion',
        type: 'technique',
        riasec: [{ d: 'C', w: 0.55 }, { d: 'E', w: 0.45 }],
        desc: 'Filière de référence pour les métiers de la comptabilité et de la finance. Techniques comptables approfondies, fiscalité (TVA, IS), gestion, analyse financière et logiciels comptables.',
        debouches: ['Aide-comptable', 'Gestionnaire de paie', 'Agent bancaire', 'Assistant fiscal', 'Expert-comptable (avec formation)'],
        ecoles: 'BTS Comptabilité, DUT CGE, DCG, Licence Pro'
    },
    {
        id: 'AGPA', icon: '🐄', name: 'AG/PA – Production Animale',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.5 }, { d: 'I', w: 0.3 }, { d: 'S', w: 0.2 }],
        desc: 'Forme aux techniques modernes de l\'élevage : biologie et physiologie animale, insémination artificielle, sélection génétique, soins vétérinaires de base, gestion des troupeaux.',
        debouches: ['Technicien d\'élevage', 'Conseiller en élevage', 'Inséminateur', 'Responsable de ranch', 'Agent de développement rural'],
        ecoles: 'BTS Productions Animales, Fac. Agronomie Dschang, MINEPIA'
    },
    {
        id: 'AGPV', icon: '🌱', name: 'AG/PV – Production Végétale',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.5 }, { d: 'I', w: 0.3 }, { d: 'E', w: 0.2 }],
        desc: 'Techniques de culture des plantes et gestion des productions végétales : botanique, agronomie, cultures vivrières, maraîchères, industrielles (cacao, café, palmier à huile, hévéa).',
        debouches: ['Technicien agricole', 'Chef de culture', 'Conseiller agrofourniture', 'Pépiniériste', 'Agent rural'],
        ecoles: 'BTS Productions Végétales, IRAD, SOCAPALM, HEVECAM'
    },
    {
        id: 'AGTP', icon: '🥫', name: 'AG/TP – Transformation de Produits',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.5 }, { d: 'C', w: 0.35 }, { d: 'I', w: 0.15 }],
        desc: 'Transformation et conservation des produits agricoles (agroalimentaire) : séchage, fumage, pasteurisation, fermentation, boulangerie, pâtisserie, contrôle qualité HACCP.',
        debouches: ['Technicien agroalimentaire', 'Technicien qualité', 'Responsable d\'atelier', 'Gérant d\'unité artisanale'],
        ecoles: 'BTS Industries Agroalimentaires, SABC, NESTLÉ, CHOCOCAM'
    },
    {
        id: 'EF', icon: '🌳', name: 'EF – Exploitation Forestière',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.5 }, { d: 'I', w: 0.3 }, { d: 'A', w: 0.2 }],
        desc: 'Gestion et exploitation durable des forêts : sylviculture, dendrologie, techniques d\'abattage, cubage du bois, préservation des écosystèmes, législation et certification forestière.',
        debouches: ['Technicien forestier', 'Agent MINFOF', 'Conducteur de travaux', 'Gestionnaire de forêt', 'Agent de reboisement'],
        ecoles: 'BTS Gestion Forestière, ALPICAM, PALLISCO, MINFOF, ONG WWF'
    },
    {
        id: 'ESF', icon: '🏠', name: 'ESF – Économie Sociale & Familiale',
        type: 'technique',
        riasec: [{ d: 'S', w: 0.55 }, { d: 'C', w: 0.45 }],
        desc: 'Prépare à accompagner les personnes, familles et groupes dans la vie quotidienne : consommation, alimentation, habitat, santé, animation sociale, médiation et gestion familiale.',
        debouches: ['Conseiller ESF', 'Animateur prévention santé', 'Technicien gestion locative', 'Animateur accueil loisirs'],
        ecoles: 'BTS ESF, DUT Carrières Sociales, Diplômes d\'État travail social'
    },
    {
        id: 'GT', icon: '📐', name: 'GT – Géomètre Topographe',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.4 }, { d: 'I', w: 0.35 }, { d: 'C', w: 0.25 }],
        desc: 'Mesure et représentation du terrain avec des instruments de haute précision (théodolite, station totale, GPS, drone). Levés topographiques, implantations, DAO, SIG, législation foncière.',
        debouches: ['Technicien géomètre', 'Opérateur topographe', 'Technicien cadastral', 'Dessinateur DAO', 'Assistant géomètre-expert'],
        ecoles: 'BTS Géomètre-Topographe, MINDCAF, MAETUR, Bureaux d\'études'
    },
    {
        id: 'HH', icon: '🏨', name: 'HH – Hôtellerie, Option Hébergement',
        type: 'technique',
        riasec: [{ d: 'S', w: 0.45 }, { d: 'E', w: 0.35 }, { d: 'C', w: 0.2 }],
        desc: 'Gestion des services d\'hébergement hôtelier : réservation, accueil, réception, gestion des étages, relation clientèle, maintenance, normes d\'hygiène, langues étrangères.',
        debouches: ['Réceptionniste', 'Chef de réception', 'Gouvernant(e)', 'Agent de réservation', 'Directeur hébergement'],
        ecoles: 'BTS Hôtellerie-Restauration, Licence Management Hôtelier'
    },
    {
        id: 'HR', icon: '🍽️', name: 'HR – Hôtellerie, Option Restauration',
        type: 'technique',
        riasec: [{ d: 'A', w: 0.4 }, { d: 'R', w: 0.35 }, { d: 'S', w: 0.25 }],
        desc: 'Métiers de la restauration (cuisine et service en salle) : techniques culinaires, pâtisserie, art de la table, conseil aux clients, sommellerie, gestion des coûts, normes HACCP.',
        debouches: ['Cuisinier / chef de partie', 'Pâtissier', 'Maître d\'hôtel', 'Sommelier', 'Barman'],
        ecoles: 'BTS Hôtellerie-Restauration, Écoles hôtelières, Compagnies aériennes'
    },
    {
        id: 'IB', icon: '🪵', name: 'IB – Industrie du Bois',
        type: 'technique',
        riasec: [{ d: 'R', w: 0.55 }, { d: 'A', w: 0.45 }],
        desc: 'Transformation du bois : sciage, séchage, déroulage, conduite de machines, fabrication d\'ouvrages (meubles, charpentes), dessin de fabrication, finition. Connaissances des propriétés du bois.',
        debouches: ['Conducteur de machines à bois', 'Menuisier / charpentier', 'Technicien de production', 'Scieur', 'Affûteur'],
        ecoles: 'BTS Systèmes Constructifs Bois, Scieries industrielles, Menuiseries'
    }
];

const DIM_INFO = {
    R: { label: 'Réaliste', desc: 'Pratique & Manuel', color: '#e74c3c' },
    I: { label: 'Investigateur', desc: 'Analytique & Scientifique', color: '#3498db' },
    A: { label: 'Artistique', desc: 'Créatif & Expressif', color: '#9b59b6' },
    S: { label: 'Social', desc: 'Aidant & Communicant', color: '#27ae60' },
    E: { label: 'Entrepreneur', desc: 'Leader & Ambitieux', color: '#e8a020' },
    C: { label: 'Conventionnel', desc: 'Organisé & Rigoureux', color: '#34495e' }
};

// ─── STATE ─────────────────────────────────────────────────────────────────
let riasecScores = { R: 50, I: 50, A: 50, S: 50, E: 50, C: 50 }; // default fallback
let currentFilter = 'all';
let computedFilieres = [];

// ─── INIT ──────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    loadResults();
    renderRiasecBars();
    computeAndRenderFilieres();
    fetchAICommentary();
});

function loadResults() {
    try {
        const raw = localStorage.getItem('oriCeftResults');
        if (raw) {
            const data = JSON.parse(raw);
            if (data.normalized) {
                riasecScores = data.normalized;
            }
        }
    } catch (e) {
        console.warn('No results found, using demo scores');
        // Demo scores for preview
        riasecScores = { R: 72, I: 85, A: 45, S: 58, E: 63, C: 70 };
    }

    // Get top 2 dimensions for hero
    const sorted = Object.entries(riasecScores).sort((a, b) => b[1] - a[1]);
    const top1 = DIM_INFO[sorted[0][0]];
    const top2 = DIM_INFO[sorted[1][0]];
    document.getElementById('heroTitle').textContent =
        `Profil ${top1.label} – ${top2.label}`;
    document.getElementById('heroSub').textContent =
        `Vos dimensions dominantes sont "${top1.desc}" et "${top2.desc}". Découvrez les filières les plus adaptées.`;
}

function renderRiasecBars() {
    const container = document.getElementById('riasecBars');
    container.innerHTML = '';

    const sorted = Object.entries(riasecScores)
        .sort((a, b) => b[1] - a[1]);

    sorted.forEach(([dim, pct], i) => {
        const info = DIM_INFO[dim];
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <div class="bar-label">
                <span class="bar-dot" style="background:${info.color}"></span>
                <span>${info.label}</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill fill-${dim}" id="fill_${dim}" style="width:0%"></div>
            </div>
            <div class="bar-pct c-${dim}">${pct}%</div>
        `;
        container.appendChild(row);

        setTimeout(() => {
            document.getElementById('fill_' + dim).style.width = pct + '%';
        }, 200 + i * 120);
    });
}

function computeFiliereScore(filiere) {
    let score = 0;
    filiere.riasec.forEach(({ d, w }) => {
        score += (riasecScores[d] || 0) * w;
    });
    return Math.round(score);
}

function computeAndRenderFilieres() {
    computedFilieres = FILIERES.map(f => ({
        ...f,
        score: computeFiliereScore(f)
    })).sort((a, b) => b.score - a.score);

    renderFilieres(computedFilieres);
}

function renderFilieres(list) {
    const grid = document.getElementById('filiereGrid');
    grid.innerHTML = '';

    const filtered = currentFilter === 'all' ? list
        : list.filter(f => f.type === currentFilter);

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">Aucune filière disponible pour ce filtre.</div>';
        return;
    }

    filtered.forEach((f, i) => {
        const isTop = i < 3;
        const pct = f.score;
        const pctColor = pct >= 75 ? '#27ae60' : pct >= 55 ? '#e8a020' : '#6b6b8a';

        const tagsHtml = f.riasec.map(({ d }) =>
            `<span class="riasec-tag c-${d} bg-${d}">${DIM_INFO[d].label}</span>`
        ).join('');

        const chipHtml = f.debouches.slice(0, 4).map(d =>
            `<span class="debouche-chip">${d}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'filiere-card' + (isTop ? ' top-match' : '');
        card.dataset.type = f.type;

        card.innerHTML = `
            <div class="card-top">
                <div class="card-icon-wrap">
                    <div class="card-icon">${f.icon}</div>
                    <div class="card-meta">
                        <span class="card-type-badge ${f.type === 'general' ? 'badge-general' : 'badge-technique'}">
                            ${f.type === 'general' ? 'Général' : 'Technique'}
                        </span>
                        <div class="card-name">${f.name}</div>
                        ${isTop ? `<div class="top-badge">✦ Recommandé</div>` : ''}
                    </div>
                </div>
                <div class="match-pct-wrap">
                    <span class="match-pct-num" style="color:${pctColor}">${pct}%</span>
                    <span class="match-pct-label">Compatibilité</span>
                </div>
            </div>

            <div class="score-bar-wrap">
                <div class="score-bar-track">
                    <div class="score-bar-fill" id="sfill_${f.id}"
                        style="background:${pctColor}; width:0%"></div>
                </div>
            </div>

            <p class="card-desc">${f.desc}</p>
            <div class="riasec-tags">${tagsHtml}</div>

            <div class="debouches">
                <div class="debouches-title">Débouchés</div>
                <div class="debouches-list">${chipHtml}</div>
            </div>
        `;

        grid.appendChild(card);

        // Staggered animation
        setTimeout(() => {
            card.classList.add('visible');
            setTimeout(() => {
                const fill = document.getElementById('sfill_' + f.id);
                if (fill) fill.style.width = pct + '%';
            }, 200);
        }, 80 * i);
    });
}

function filterBy(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFilieres(computedFilieres);
}

// ─── AI COMMENTARY ─────────────────────────────────────────────────────────
async function fetchAICommentary() {
    const sorted = Object.entries(riasecScores)
        .sort((a, b) => b[1] - a[1]);

    const top3 = computedFilieres.slice(0, 3).map(f => f.name);
    const dominant = sorted.slice(0, 3).map(([d]) => DIM_INFO[d].label + ' (' + riasecScores[d] + '%)');

    const prompt = `Tu es un conseiller d'orientation scolaire expert au Cameroun. Voici le profil RIASEC d'un élève :
- Dimensions dominantes : ${dominant.join(', ')}
- Scores complets : ${sorted.map(([d, v]) => DIM_INFO[d].label + ': ' + v + '%').join(', ')}
- Filières les plus compatibles : ${top3.join(', ')}

En 3-4 phrases courtes et bienveillantes, explique en français :
1. Ce que ce profil révèle sur la personnalité et les aptitudes de cet élève
2. Pourquoi les filières recommandées lui correspondent
3. Un conseil d'orientation sincère et encourageant

Sois direct, chaleureux et précis. Ne liste pas, écris en prose naturelle.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        const text = data.content?.find(b => b.type === 'text')?.text || '';

        if (text) {
            document.getElementById('aiText').innerHTML =
                `<p style="line-height:1.8">${text.replace(/\n\n/g, '</p><p style="line-height:1.8;margin-top:10px">').replace(/\n/g, '<br>')}</p>`;
        } else {
            throw new Error('No text');
        }
    } catch (err) {
        // Fallback text
        const top1 = sorted[0], top2 = sorted[1];
        document.getElementById('aiText').innerHTML = `
            <p style="line-height:1.8">
                Votre profil révèle un élève avec des aptitudes marquées pour 
                le domaine <strong style="color:var(--amber)">${DIM_INFO[top1[0]].desc}</strong> 
                et une sensibilité ${DIM_INFO[top2[0]].label.toLowerCase()}.
                Ces caractéristiques vous orientent naturellement vers des filières 
                qui valorisent à la fois l'analyse et la pratique.
            </p>
            <p style="line-height:1.8;margin-top:10px">
                Les filières recommandées correspondent précisément à ces forces.
                Faites confiance à vos aptitudes et choisissez une voie qui vous passionne — 
                c'est la meilleure garantie de réussite.
            </p>
        `;
    }
}