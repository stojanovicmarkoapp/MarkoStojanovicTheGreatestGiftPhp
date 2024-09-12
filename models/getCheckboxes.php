<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
            $tableName = $_POST['table'];
            $jsonCheckboxes = showCheckboxes($tableName);
        


            echo json_encode($jsonCheckboxes);
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