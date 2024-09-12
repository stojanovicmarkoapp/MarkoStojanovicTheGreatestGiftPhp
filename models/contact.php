<?php
 header("Content-type: application/json");
    //if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['sendProperty']) && !empty($_POST['sendProperty'])){
        include "../config/connection.php";
        include "functions.php";

        try{
          //  $nameModel = /^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/;
          //  $emailAddressModel = /^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;
           // $credentialModel = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/;
            $firstName = $_POST['firstNameProperty'];
            $lastName = $_POST['lastNameProperty'];
            $emailAddress = $_POST['emailAddressProperty'];
            $purpose = $_POST['purposeProperty'];
            $message = $_POST['messageProperty'];
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
            if($emailAddress == ""){
                $errors[]="The field for the email address must not be left blank!";
            }
            else if(!preg_match("/^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/",$emailAddress)){
                $errors[]="You did not fill the field for the email address properly. Example: 1james.caa1n@3mail.co.us";
            }
            if($purpose == "Choose..."){
                $errors[]="You did not select a purpose. Example: Suggestion";
            }
            if($message == ""){
                $errors[]="The field for the home address must not be left blank!";
            }
            if(count($errors)==0){
                $insertMessage = insertMessage($firstName,$lastName,$emailAddress,$purpose,$message);
                $response = ["message"=>"Your message has been successfully sent!"];
                echo json_encode($response);
                http_response_code(200);
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