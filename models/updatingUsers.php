<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";
     
        try{
            $id = $_POST['id'];
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $emailAddress = $_POST['emailAddress'];
            $userName = $_POST['userName'];
            $homeAddress = $_POST['homeAddress'];
            $role = $_POST['role'];
            updatingUser($id,$firstName,$lastName,$emailAddress, $userName,$homeAddress,$role);
            $response = ["message"=>"Successfully updated user with an id of ".$id];
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