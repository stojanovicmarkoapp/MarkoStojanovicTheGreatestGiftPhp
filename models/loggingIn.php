<?php
session_start();
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
            $userName = $_POST['userNameProperty'];
            $passwordName = $_POST['passProperty'];
            $passwordName=md5($passwordName);
            $userObject = checkLogin($userName,$passwordName);
            $userAdmin = checkAdmin($userName,$passwordName);
            if($userAdmin){
                $_SESSION['admin']=$userAdmin;
                $response = ["message"=>"Succesfull logging in"];
                echo json_encode($response);
                http_response_code(200);
            }
            else if($userObject){
            $_SESSION['user']=$userObject;
                $response = ["message"=>"Succesfull logging in"];
                echo json_encode($response);
                http_response_code(200);
              }
              else {

                 $response = ["message"=>"There is not authentificted user with that user name and password"];
                 echo json_encode($response);
                 http_response_code(200);
              }
        }
        catch(PDOException $exception){
            http_response_code(500);
        }
    }
    else{
        http_response_code(404);
    }
?>