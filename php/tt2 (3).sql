-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 11 mars 2026 à 14:41
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tt2`
--

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

CREATE TABLE `reponses` (
  `id_reponse` int(11) NOT NULL,
  `contenu` varchar(250) DEFAULT NULL,
  `nom_question` varchar(250) NOT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reponses`
--

INSERT INTO `reponses` (`id_reponse`, `contenu`, `nom_question`, `id_user`) VALUES
(885, 'Je cherche à réparer', 'À la maison, si une chaise en bois est cassée, que fais-tu ?', 63),
(886, 'Fabriquer des jouets avec des boîtes de conserve ou du carton', 'Qu\'est-ce que tu préfères faire pendant ton temps libre ?', 63),
(887, 'Je préfère faire des problèmes de mathématiques difficiles sur mon cahier', 'Aimes-tu aider tes parents à calculer la monnaie du marché ?', 63),
(888, 'Je demande de l\'aide', 'Si on t\'offre un moteur de jouet qui ne marche plus, tu... ?', 63),
(889, 'Une règle graduée, une équerre et un compas', 'Quel objet aimerais-tu avoir dans ton sac ?', 63),
(890, 'Non, je préfère jouer dehors ou lire', 'Aimes-tu prendre soin des vêtements ou cuisiner ?', 63),
(891, 'L\'histoire du monument et qui l\'a construit', 'Si tu vois un beau bâtiment, qu\'est-ce qui t\'intéresse ?', 63),
(892, 'Non, je préfère faire des schémas ou travailler avec mes mains', 'Est-ce que tu es patient pour recopier des longs textes ?', 63),
(893, 'J\'aime plus ecrire', 'Aimes-tu plus pratiquer ou écrire ?', 63),
(894, 'J\'aime dessiner les étapes de la croissance dans mon cahier', 'Quand tu plantes une graine, que fais-tu ?', 63),
(895, 'Pas trop, je préfère dessiner ou construire des objets', 'À l\'école, aimes-tu faire la dictée et rédiger des histoires ?', 63),
(896, 'J\'abandonne, je préfère les calculs simples', 'Quand le maître donne un problème de mathématiques difficile...', 63),
(897, 'Non, je n\'aime pas apprendre les langues', 'Plus tard, aimerais-tu parler plusieurs langues (Allemand, Espagnol...) ?', 63),
(898, 'Je préfère la physique, l\'électricité ou la mécanique', 'Aimes-tu étudier les plantes, les animaux et le corps humain ?', 63),
(899, 'Non, je préfère le dessin libre ou la peinture', 'Aimes-tu utiliser la règle et l\'équerre pour tracer des formes précises ?', 63),
(900, 'Très content de fabriquer quelque chose de mes mains', 'Pendant les cours de Travail Manuel (TM), tu es :', 63),
(901, 'Non, ce n\'est pas mon domaine préféré', 'T\'intéresses-tu à la propreté, à la santé et à la cuisine ?', 63),
(902, 'Comprendre comment on crée des jeux ou des logiciels', 'Qu\'est-ce qui t\'attire sur un ordinateur ?', 63),
(903, 'Un peu, mais je préfère les sciences physiques', 'Aimes-tu apprendre l\'histoire du Cameroun et les pays du monde ?', 63),
(904, 'Oui, j\'aimerais être un expert en voitures', 'Est-ce que tu aimerais savoir comment un moteur de voiture fonctionne ?', 63),
(905, 'Non, je préfère faire un autre métier', 'Aimerais-tu être l\'avocat qui défend les gens au tribunal ?', 63),
(906, 'Non, je préfère travailler dans un bureau propre', 'Aimerais-tu être le mécanicien qui répare les gros camions ?', 63),
(907, 'Oui, en m\'occupant de leur alimentation', 'Aimerais-tu soigner les enfants malades plus tard ?', 63),
(908, 'Oui, je veux bâtir les routes de mon pays', 'Aimerais-tu construire des ponts et des routes au Cameroun ?', 63),
(909, 'Oui, j\'aime le commerce et la négociation', 'Aimerais-tu créer ta propre boutique et vendre des produits ?', 63),
(910, 'Une combinaison de travail ou une blouse', 'Quel habit aimerais-tu porter chaque jour pour travailler ?', 63),
(911, 'Oui, j\'aime le bois et la menuiserie', 'Aimerais-tu fabriquer des meubles de luxe en bois ?', 63),
(912, 'Non, je préfère autre chose', 'Aimerais-tu travailler dans une banque plus tard ?', 63),
(913, 'Oui, j\'aime la technologie et le dépannage', 'Aimerais-tu réparer les téléphones et les ordinateurs ?', 63),
(914, 'Non, je veux apprendre un métier vite', 'Es-tu prêt à faire de très longues études à l\'université ?', 63),
(915, 'Non, je préfère utiliser l\'objet simplement', 'Aimes-tu démonter des objets pour voir comment ils fonctionnent ?', 64),
(916, 'Non, je préfère travailler à l\'abri dans un bureau', 'Quand un appareil ne marche plus à la maison, que fais-tu d\'abord ?', 64),
(917, 'Non, les longs calculs m\'ennuient', 'Aimes-tu construire des choses avec tes mains (bois, carton, métal) ?', 64),
(918, 'Non, ce n\'est pas un sujet qui me passionne', 'Quand tu vois une machine compliquée, es-tu curieux de comprendre son fonctionnement ?', 64),
(919, 'Non, je ne suis pas très créatif visuellement', 'Aimes-tu résoudre des problèmes logiques ou des énigmes ?', 64),
(920, 'Non, je suis plutôt réservé', 'Si tu avais un petit atelier, qu\'aimerais-tu fabriquer ?', 64),
(921, 'Non, je préfère étudier seul', 'Aimes-tu utiliser les outils comme le tournevis, marteau ou pince ?', 64),
(922, 'Non, ce sont des métiers trop difficiles pour moi', 'Quand quelque chose est cassé, préfères-tu réparer ou acheter un nouveau ?', 64),
(923, 'Non, je préfère suivre les consignes', 'Est-ce que tu t\'intéresses aux inventions et aux nouvelles technologies ?', 64),
(924, 'Non, je ne fais pas trop attention à ça', 'Aimerais-tu créer une machine ou un objet utile pour aider les gens ?', 64),
(925, 'Non, j\'ai peur de tout gâter', 'Aimes-tu réparer un vélo ou une petite panne électrique ?', 64),
(926, 'Non, je préfère les activités de ville', 'Aimerais-tu cultiver un champ ou t\'occuper d\'un jardin ?', 64),
(927, 'Non, je trouve ces formules trop compliquées', 'Aimes-tu faire des calculs de physique ou de chimie ?', 64),
(928, 'Non, je préfère parler simplement', 'Aimes-tu chercher la définition des mots difficiles ?', 64),
(929, 'Non, je préfère acheter mes habits tout prêts', 'Aimerais-tu créer tes propres modèles de vêtements ?', 64),
(930, 'Non, je n\'aime pas trop écrire', 'Aimes-tu écrire tes pensées dans un cahier ou un journal ?', 64),
(931, 'Non, je n\'ai pas assez de patience pour ça', 'Aimes-tu t\'occuper des enfants ou des personnes âgées ?', 64),
(932, 'Oui, j\'aime agir pour le bien de la communauté', 'Aimes-tu participer aux activités d\'une association ?', 64),
(933, 'Oui, j\'aime l\'argent et le commerce', 'Aimerais-tu gérer une boutique ou vendre des produits ?', 64),
(934, 'Oui, j\'aime quand tout est planifié', 'Aimes-tu faire des listes pour ne rien oublier ?', 64),
(935, 'Moyenne ou Faible (moins de 10/20)', 'Quelle est ta moyenne habituelle en Mathématiques  ?', 64),
(936, 'C\'est une matière difficile pour moi', 'Comment sont tes notes en PCT (Physique, Chimie, Technologie) ?', 64),
(937, 'L\'orthographe et la grammaire me fatiguent', 'Comment te trouves-tu en Français (Dictée, Rédaction, Texte) ?', 64),
(938, 'C\'est une de mes matières les plus faibles', 'Quelle est ta moyenne habituelle en Anglais ?', 64),
(939, 'Je n\'arrive pas bien à retenir les leçons de biologie', 'Quelle est ta note moyenne en Sciences (SVT / SVTEEH) ?', 64),
(940, 'Oui, j\'aime la précision du dessin technique', 'Aimes-tu dessiner des plans précis avec règle et équerre ?', 64),
(941, 'Oui, toucher à la technologie me passionne', 'Aimerais-tu travailler sur des moteurs ou des circuits électriques ?', 64),
(942, 'Oui, j\'ai la tête pour les chiffres et l\'argent', 'Es-tu rapide pour calculer de l\'argent sans faire d\'erreur ?', 64),
(943, 'Oui, j\'aime l\'organisation de bureau et les dossiers', 'Aimerais-tu travailler comme comptable ou secrétair ?', 64),
(944, 'Non, je suis plutôt discret et je suis les autres', 'Es-tu capable de convaincre tes parents ou amis d\'accepter tes idées   ?', 64);

-- --------------------------------------------------------

--
-- Structure de la table `resultats_orientation`
--

CREATE TABLE `resultats_orientation` (
  `id_resultat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `serie` varchar(100) DEFAULT NULL,
  `pourcentage` int(11) DEFAULT NULL,
  `debouches` text DEFAULT NULL,
  `debouches2` text DEFAULT NULL,
  `debouches3` text DEFAULT NULL,
  `debouches4` text DEFAULT NULL,
  `etablissements` text DEFAULT NULL,
  `conseils_amelioration` text DEFAULT NULL,
  `conclusion` text DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `prenom` varchar(200) DEFAULT NULL,
  `niveau` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `niveau`) VALUES
(38, 'Fouini Dev King', 'PRO', 'CAP'),
(63, 'dev', 'king', 'CEP'),
(64, 'jdoai', 'ojhiefj', 'BEPC');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD PRIMARY KEY (`id_reponse`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `resultats_orientation`
--
ALTER TABLE `resultats_orientation`
  ADD PRIMARY KEY (`id_resultat`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reponses`
--
ALTER TABLE `reponses`
  MODIFY `id_reponse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=945;

--
-- AUTO_INCREMENT pour la table `resultats_orientation`
--
ALTER TABLE `resultats_orientation`
  MODIFY `id_resultat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
