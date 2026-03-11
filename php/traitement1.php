<?php 
echo"ok";
 require("database2.php");
 
 if(isset($_GET["name"])){
 
$nom =htmlspecialchars($_GET["name"]);
$prenom = htmlspecialchars($_GET["surname"]);
$niveau = htmlspecialchars($_GET["niveau"]);
echo"ok2";

$insert = $connexion->prepare("INSERT INTO user(nom,prenom,niveau) VALUES(?,?,?)");
$insert->execute(array($nom,$prenom,$niveau));


echo "ok3";
$recupId  =  $connexion->prepare("select * from user where nom=?");
$recupId->execute(array($nom));
if($recupId->rowCount()>0){
$idUsers = $recupId->fetch();
$id = $idUsers["id_user"];
if($niveau =="CEP"){
    header("Location:../html/quizz1.php?id=$id");
    }else if($niveau =="BEPC"){
    header("Location:../html/quizz4.php?id=$id");
    }else{
header("Location:../html/quizz7.php?id=$id");
    }
}
 }else{
    header("Location:../html/mainpageapp.html");
 }
 ?>