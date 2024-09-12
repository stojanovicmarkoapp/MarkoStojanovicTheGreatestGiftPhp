<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";
     
        try{
            $userName = $_POST['userName'];
            $newPass = $_POST['newPass'];
            changingPassword($userName,md5($newPass));
            $response = ["message"=>"Successfully changed password"];
            echo json_encode($response);
            http_response_code(200);
        }
        catch(PDOException $exception){
            http_response_code(500);
        }
    }
    else{
        http_response_code(404);
    }
?>