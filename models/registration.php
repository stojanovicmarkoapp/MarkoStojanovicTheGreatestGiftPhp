<?php
 header("Content-type: application/json");
    //if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['buttonProperty']) && !empty($_POST['buttonProperty'])){
        include "../config/connection.php";
        include "functions.php";

        try{
          //  $nameModel = /^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/;
          //  $emailAddressModel = /^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;
           // $credentialModel = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/;
            $firstName = $_POST['firstNameProperty'];
            $lastName = $_POST['lastNameProperty'];
            $emailAddress = $_POST['emailAddressProperty'];
            $userName = $_POST['userNameProperty'];
            $passwordName = $_POST['passwordProperty'];
            $confPassword = $_POST['confPasswordProperty'];
            $homeAddress = $_POST['homeAddressProperty'];
            $errors = [];
            if($firstName == ""){
                $errors[]="The field for the first name must not be left blank!";
            }
            else if(!preg_match("/^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/",$firstName)){
                $errors[]="You did not fill the field for the first name properly. Example: Al McKay";
            }
            if($lastName == ""){
                $errors[]="The field for the last name must not be left blank!";
            }
            else if(!preg_match("/^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/",$lastName)){
                $errors[]="You did not fill the field for the last name properly. Example: O'Bryant Junior";
            }
            if($userName == ""){
                $errors[]="The field for the user name must not be left blank!";
            }
            else if(!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/",$userName)){
                $errors[]="You did not fill the field for the user name properly. Example: s15iNatra";
            }
            if($passwordName == ""){
                $errors[]="The field for the password must not be left blank!";
            }
            else if(!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/",$passwordName)){
                $errors[]="You did not fill the field for the password properly. Example: rickleS26";
            }
            if($passwordName != $confPassword){
                $errors[]="Passwords do not match!";
            }
            if($emailAddress == ""){
                $errors[]="The field for the email address must not be left blank!";
            }
            else if(!preg_match("/^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/",$emailAddress)){
                $errors[]="You did not fill the field for the email address properly. Example: 1james.caa1n@3mail.co.us";
            }
            if($homeAddress == ""){
                $errors[]="The field for the home address must not be left blank!";
            }
            if(count($errors)==0){
            $passwordName=md5($passwordName);
            $roleName = "user";
              $countUsers = userExist($userName);
              if($countUsers==0){
                $insertUser = insertUser($firstName,$lastName,$emailAddress,$userName,$passwordName,$homeAddress,$roleName);
                $response = ["message"=>"Succesfull registration"];
                echo json_encode($response);
                http_response_code(200);
              }
              else {
                 $response = ["message"=>"There is user with the same user name"];
                 echo json_encode($response);
                 http_response_code(200);
              }
            }
            else {
                $response = ["message"=>$errors];
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