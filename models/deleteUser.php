<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";
     
        try{
            $id = $_POST['id'];
            deletingUsers($id);
            $response = ["message"=>"Successfully deleted user with an id of ".$id];
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