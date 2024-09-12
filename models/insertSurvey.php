<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
            $checkedSubgenreSurvey = $_POST['checkedSubgenreSurvey'];
            $jsonSurvey = insertAnswer($checkedSubgenreSurvey);
                $response = ["message"=>"You have successfully voted!"];
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