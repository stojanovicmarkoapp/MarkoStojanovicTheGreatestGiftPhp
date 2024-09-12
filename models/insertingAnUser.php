<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";
     
        try{
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $emailAddress = $_POST['emailAddress'];
            $userName = $_POST['userName'];
            $homeAddress = $_POST['homeAddress'];
            $role = $_POST['role'];
            $password = "InitialPassword1";
            insertUser($firstName,$lastName,$emailAddress, $userName, md5($password), $homeAddress,$role);
            $response = ["message"=>"Successfully inserted user"];
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