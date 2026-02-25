// Gestionnaire et analyse des résultats du quiz
document.addEventListener('DOMContentLoaded', function() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers'));
    
    if (!answers) {
        window.location.href = 'Quiz.html';
        return;
    }
    
    displayResults(answers);
});

function displayResults(answers) {
    // Afficher le profil
    displayProfile(answers);
    
    // Analyser et afficher les recommandations
    const recommendations = analyzeAnswers(answers);
    displayRecommendations(recommendations);
    
    // Afficher l'analyse des compétences
    displayAnalysis(answers);
    
    // Afficher les conseils personnalisés
    displayAdvice(answers, recommendations);
}

function displayProfile(answers) {
    document.getElementById('class').textContent = answers.q1 || '-';
    document.getElementById('level').textContent = answers.q4 || '-';
    document.getElementById('project').textContent = answers.q3 || '-';
    document.getElementById('teamwork').textContent = answers.q7 || '-';
}

function analyzeAnswers(answers) {
    // Système de scoring pour les filières recommandées
    const filiere = {
        générale: 0,
        technologique: 0,
        professionnelle: 0,
        scientifique: 0,
        littéraire: 0,
        économique: 0,
        technique: 0,
        artistique: 0
    };
    
    // Analyser q2 (filière souhaitée)
    if (answers.q2 === 'Générale') {
        filiere.générale += 40;
        filiere.scientifique += 15;
        filiere.littéraire += 15;
        filiere.économique += 10;
    } else if (answers.q2 === 'Technologique') {
        filiere.technologique += 40;
        filiere.technique += 25;
    } else if (answers.q2 === 'Professionnelle') {
        filiere.professionnelle += 40;
        filiere.technique += 30;
    }
    
    // Analyser q3 (projet post-bac)
    if (answers.q3 === 'Poursuivre à l\'université') {
        filiere.générale += 20;
        filiere.scientifique += 20;
        filiere.littéraire += 15;
    } else if (answers.q3 === 'Entrer en école spécialisée') {
        filiere.technologique += 20;
        filiere.technique += 20;
        filiere.scientifique += 15;
    } else if (answers.q3 === 'Trouver un emploi') {
        filiere.professionnelle += 25;
        filiere.technique += 20;
    }
    
    // Analyser q4 (niveau académique)
    if (answers.q4 === 'Excellente (18-20)' || answers.q4 === 'Très bonne (16-18)') {
        filiere.générale += 15;
        filiere.scientifique += 20;
        filiere.littéraire += 10;
    } else if (answers.q4 === 'Bonne (14-16)') {
        filiere.générale += 10;
        filiere.technologique += 10;
        filiere.scientifique += 10;
    }
    
    // Analyser q5 et q6 (matières)
    const strengths = answers.q6 || [];
    const weaknesses = answers.q5 || [];
    
    // Si Mathématiques est une force
    if (strengths.includes('Mathématiques')) {
        filiere.scientifique += 20;
        filiere.technique += 15;
        filiere.économique += 10;
    }
    
    // Si Sciences est une force
    if (strengths.includes('Sciences')) {
        filiere.scientifique += 25;
        filiere.technique += 10;
    }
    
    // Si Français est une force
    if (strengths.includes('Français')) {
        filiere.littéraire += 20;
        filiere.générale += 10;
    }
    
    // Si Histoire-Géographie est une force
    if (strengths.includes('Histoire-Géographie')) {
        filiere.littéraire += 15;
        filiere.économique += 10;
    }
    
    // Si Langues est une force
    if (strengths.includes('Langues')) {
        filiere.littéraire += 15;
        filiere.économique += 10;
    }
    
    // Si Arts ou EPS est une force
    if (strengths.includes('Arts') || strengths.includes('EPS')) {
        filiere.artistique += 25;
    }
    
    // Analyser q8 (travail d'équipe vs autonomie)
    if (answers.q8 === 'En équipe') {
        filiere.économique += 15;
        filiere.technique += 10;
    } else if (answers.q8 === 'De manière autonome') {
        filiere.scientifique += 10;
        filiere.littéraire += 10;
    }
    
    // Analyser q9 (environnement de travail)
    if (answers.q9 === 'Bureau/Open Space') {
        filiere.économique += 20;
        filiere.générale += 10;
    } else if (answers.q9 === 'Extérieur/Sur le terrain') {
        filiere.professionnelle += 20;
        filiere.technique += 10;
    } else if (answers.q9 === 'En Laboratoire') {
        filiere.scientifique += 25;
    } else if (answers.q9 === 'En Atelier') {
        filiere.technique += 30;
        filiere.professionnelle += 15;
    }
    
    // Trier les filières par score
    const sorted = Object.entries(filiere)
        .sort((a, b) => b[1] - a[1])
        .filter(([_, score]) => score > 0);
    
    return sorted;
}

function displayRecommendations(recommendations) {
    const grid = document.getElementById('recommendationsGrid');
    grid.innerHTML = '';
    
    // Base de données des filières avec descriptions
    const filiereDetails = {
        scientifique: {
            icon: 'fa-flask',
            title: 'Filière Scientifique',
            description: 'Mathématiques, Physique-Chimie, Sciences de la Vie. Idéale pour les futurs ingénieurs, médecins, chercheurs.',
            color: '#1E5E89'
        },
        littéraire: {
            icon: 'fa-book',
            title: 'Filière Littéraire',
            description: 'Français, Histoire-Géographie, Philosophie. Parfaite pour les passionnés de lettres et de sciences humaines.',
            color: '#C7A37A'
        },
        économique: {
            icon: 'fa-chart-line',
            title: 'Filière Économique',
            description: 'Économie, Mathématiques, Histoire. Pour ceux intéressés par le commerce, la gestion, les finances.',
            color: '#4A3B2F'
        },
        générale: {
            icon: 'fa-graduation-cap',
            title: 'Filière Générale',
            description: 'Formation équilibrée couvrant sciences, lettres et économie. Offre le plus de flexibilité post-bac.',
            color: '#1E5E89'
        },
        technologique: {
            icon: 'fa-cogs',
            title: 'Filière Technologique',
            description: 'Formation pratique avec applications technologiques. Débouchés variés en secteur technique et tertiaire.',
            color: '#C7A37A'
        },
        professionnelle: {
            icon: 'fa-tools',
            title: 'Filière Professionnelle',
            description: 'Formation axée sur la pratique et l\'emploi direct. Accès rapide au marché du travail.',
            color: '#4A3B2F'
        },
        technique: {
            icon: 'fa-wrench',
            title: 'Spécialisation Technique',
            description: 'Études techniques appliquées en BTS, école spécialisée. Compétences très demandées sur le marché.',
            color: '#C7A37A'
        },
        artistique: {
            icon: 'fa-palette',
            title: 'Spécialisation Artistique',
            description: 'Arts plastiques, musique, théâtre. Pour les créatifs cherchant des études passionnelles.',
            color: '#C7A37A'
        }
    };
    
    // Afficher les top 3 recommandations
    recommendations.slice(0, 3).forEach(([filiere, score], index) => {
        const details = filiereDetails[filiere];
        if (!details) return;
        
        const scorePercent = Math.min(100, Math.round((score / 150) * 100));
        
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.borderTopColor = details.color;
        
        card.innerHTML = `
            <div class="ranking">
                <span class="rank-badge rank-${index + 1}">${index === 0 ? '🏆 #1' : index === 1 ? '🥈 #2' : '🥉 #3'}</span>
            </div>
            <i class="fas ${details.icon}"></i>
            <h3>${details.title}</h3>
            <p>${details.description}</p>
            <div class="score-bar">
                <div class="score-fill" style="width: ${scorePercent}%; background-color: ${details.color};"></div>
            </div>
            <span class="score-text">Compatibilité: ${scorePercent}%</span>
        `;
        
        grid.appendChild(card);
    });
}

function displayAnalysis(answers) {
    const strengths = answers.q6 || [];
    const weaknesses = answers.q5 || [];
    
    const strengthsList = document.getElementById('strengthsList');
    const improvementList = document.getElementById('improvementList');
    
    strengthsList.innerHTML = '';
    improvementList.innerHTML = '';
    
    if (strengths.length > 0) {
        strengths.forEach(subject => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${subject}`;
            strengthsList.appendChild(li);
        });
    } else {
        strengthsList.innerHTML = '<li><em>À déterminer lors du suivi</em></li>';
    }
    
    if (weaknesses.length > 0) {
        weaknesses.forEach(subject => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-times-circle"></i> ${subject}`;
            improvementList.appendChild(li);
        });
    } else {
        improvementList.innerHTML = '<li><em>Vous vous sentez à l\'aise dans toutes les matières !</em></li>';
    }
}

function displayAdvice(answers, recommendations) {
    const adviceContent = document.getElementById('adviceContent');
    let adviceHTML = '';
    
    // Conseils basés sur le niveau
    if (answers.q4 === 'Excellente (18-20)' || answers.q4 === 'Très bonne (16-18)') {
        adviceHTML += `
            <div class="advice-item">
                <i class="fas fa-star"></i>
                <div>
                    <h4>Excellent Niveau Académique</h4>
                    <p>Vos résultats scolaires vous ouvrent de nombreuses portes. Privilégiez les filières de prestige et les écoles sélectives.</p>
                </div>
            </div>
        `;
    } else if (answers.q4 === 'À améliorer (moins de 12)') {
        adviceHTML += `
            <div class="advice-item">
                <i class="fas fa-lightbulb"></i>
                <div>
                    <h4>Besoin de Soutien Académique</h4>
                    <p>Envisagez des cours de soutien ou du tutorat pour renforcer vos compétences. Une filière adaptée à votre rythme sera plus bénéfique.</p>
                </div>
            </div>
        `;
    }
    
    // Conseils basés sur le projet post-bac
    if (answers.q3 === 'Poursuivre à l\'université') {
        adviceHTML += `
            <div class="advice-item">
                <i class="fas fa-graduation-cap"></i>
                <div>
                    <h4>Préparation à l'Université</h4>
                    <p>Rejoignez une classe préparatoire ou optez pour la filière générale. Privilégiez les disciplines qui vous intéressent pour vos études supérieures.</p>
                </div>
            </div>
        `;
    } else if (answers.q3 === 'Trouver un emploi') {
        adviceHTML += `
            <div class="advice-item">
                <i class="fas fa-briefcase"></i>
                <div>
                    <h4>Orientation Vers l'Emploi</h4>
                    <p>Privilégiez une filière professionnelle ou technologique avec des stages en entreprise. Cherchez des formations reconnues par les entreprises.</p>
                </div>
            </div>
        `;
    }
    
    // Conseils basés sur les compétences transversales
    if (answers.q7 === 'Excellent' || answers.q7 === 'Bon') {
        adviceHTML += `
            <div class="advice-item">
                <i class="fas fa-handshake"></i>
                <div>
                    <h4>Excellentes Compétences Relationnelles</h4>
                    <p>Vos aptitudes sociales sont un atout. Envisagez des filières nécessitant travail d'équipe et interactions humaines.</p>
                </div>
            </div>
        `;
    }
    
    // Conseils généraux
    adviceHTML += `
        <div class="advice-item">
            <i class="fas fa-compass"></i>
            <div>
                <h4>Prochaines Étapes</h4>
                <p>
                    ✓ Rencontrez un conseiller d'orientation<br>
                    ✓ Explorez les filières recommandées en détail<br>
                    ✓ Visitez les portes ouvertes de notre établissement<br>
                    ✓ Demandez des informations spécifiques à nos services
                </p>
            </div>
        </div>
    `;
    
    adviceContent.innerHTML = adviceHTML;
}
