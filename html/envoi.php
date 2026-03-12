<?php 
// 1. Augmenter les limites de ressources pour gérer le gros volume de texte
ini_set('max_execution_time', 600); // 10 minutes maximum
ini_set('memory_limit', '512M');    // 512 Mo de RAM

try {
    $connexion = new PDO("mysql:host=localhost;dbname=tt2;charset=utf8","root","");
} catch (Exception $e) {
    die('Erreur de connexion : ' . $e->getMessage());
}

$id = $_GET["id"];

// 2. Récupération des données de l'élève
$recupId = $connexion->prepare("SELECT * FROM user WHERE id_user=?");
$recupId->execute(array($id));
$user = $recupId->fetch();

if (!$user) {
    die("Utilisateur introuvable.");
}

$infos = $connexion->prepare("SELECT * FROM reponses WHERE id_user=?");
$infos->execute(array($id)); 

$reponses = [];
while ($result = $infos->fetch()) {
    $reponses[$result['nom_question']] = $result['contenu'];
}

$donneesEleve = [
    "nom" => $user["nom"],
    "prenom" => $user["prenom"],
    "niveau_actuel" => $user["niveau"],
    "reponses" => $reponses
];

// 3. Charger le catalogue depuis le fichier externe
// Assure-toi que le fichier "filiere.txt" est bien dans le même dossier
if (!file_exists("filiere.txt")) {
    die("Erreur : Le fichier filiere.txt est introuvable.");
}
$catalogue = file_get_contents("filiere.txt");

// 4. Préparation du prompt pour l'IA
$promptFinal = "CONTEXTE DES FILIÈRES AU CAMEROUN :\n" . $catalogue . "\n\n";
$promptFinal .= "DONNÉES ÉLÈVE : " . json_encode($donneesEleve, JSON_UNESCAPED_UNICODE) . "\n\n";

// AJOUTE BIEN "EXACTEMENT 6 FILIÈRES" ICI :
$promptFinal .= "CONSIGNE : Analyse le profil et réponds EXCLUSIVEMENT au format JSON. 
Tu DOIS proposer EXACTEMENT 6 filières différentes classées par pertinence.
Structure attendue : { \"interpretation_profil\": \"...\", \"conclusion_generale\": \"...\", \"orientations\": [ ... 6 objets ici ... ] }";
putenv("API_KEY=AIzaSyDhifWGtNOnnNP8lMny4Qe0Vzgx_7WuMWM");
putenv("API_KEY2=AIzaSyAHPQNFub8-OsMcOWvMz5L9ex5dPuC0ffc");
putenv("API_KEY3=AIzaSyCzqZbUQwT91teX5o3uW7EEfVldPBQc_eM");
putenv("API_KEY4=AIzaSyDC42saZjwaQQHk02bk8sx6ZCmKYEtL8ck");
// 5. Configuration de l'appel à l'API Gemini
$apiKey = getenv("API_KEY");
// Correction de l'URL pour Gemini 1.5 Flash
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $apiKey;
$payload = [
    "contents" => [
        ["parts" => [["text" => $promptFinal]]]
    ],
    "generationConfig" => [
        "response_mime_type" => "application/json",
        "temperature" => 0.2
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

// Paramètres de délai pour éviter les coupures
curl_setopt($ch, CURLOPT_TIMEOUT, 500); 
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);

// Désactiver la vérification SSL pour XAMPP
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    die('Erreur CURL : ' . curl_error($ch));
}
curl_close($ch);

$result = json_decode($response, true);

// 6. Vérification des erreurs de l'IA
if(isset($result["error"])) {
    echo "Erreur API Google : <pre>" . print_r($result["error"], true) . "</pre>";
    exit;
}

// 7. Traitement et insertion des résultats
$iaText = $result["candidates"][0]["content"]["parts"][0]["text"] ?? null;

if ($iaText) {
    $data = json_decode(trim($iaText), true);

    if (isset($data['orientations'])) {
        // Nettoyage des anciens résultats pour cet utilisateur
        $connexion->prepare("DELETE FROM resultats_orientation WHERE id_user = ?")->execute([$id]);

        $insert = $connexion->prepare("
            INSERT INTO resultats_orientation 
            (id_user, serie, pourcentage, debouches, debouches2, debouches3, debouches4, etablissements, conseils_amelioration, conclusion, interpretation_profil) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        // On récupère les textes globaux
        $conclusion = $data['conclusion_generale'] ?? "";
        $interpretation = $data['interpretation_profil'] ?? "";

        foreach ($data['orientations'] as $index => $filiere) {
    if ($index >= 6) break;

    $etablissements = is_array($filiere['etablissements'] ?? null) 
        ? implode(", ", $filiere['etablissements']) 
        : "";

    // Utilisation de ?? "" pour éviter les "Undefined index"
    $insert->execute([
        $id,
        $filiere['serie'] ?? "Non spécifié",
        $filiere['pourcentage'] ?? 0,
        $filiere['debouches'] ?? "",
        $filiere['debouches2'] ?? "", // Correction ici
        $filiere['debouches3'] ?? "", // Correction ici
        $filiere['debouches4'] ?? "", // Correction ici
        $etablissements,
        $filiere['conseils_amelioration'] ?? "",
        $conclusion,
        $interpretation
    ]);
}
        header('Content-Type: application/json');
        echo json_encode(["status" => "success"]);
    }
} else {
    echo json_encode(["error" => "Erreur IA", "details" => $response]);
}
?>