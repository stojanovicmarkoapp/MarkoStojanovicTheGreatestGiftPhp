<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
      

            
          
                $jsonData = loadContactInformationList();
        


            echo json_encode($jsonData);
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