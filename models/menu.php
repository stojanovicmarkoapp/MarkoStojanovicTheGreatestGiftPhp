<?php
session_start();
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
             if(isset($_SESSION['admin'])){
                 $jsonMenu = showMenuForAdmin();
             }
     
            else if(isset($_SESSION['user'])){
                $jsonMenu = showMenu();
            }
            else{
                $jsonMenu = showMenuWithoutCart();
            }
            echo json_encode($jsonMenu);
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