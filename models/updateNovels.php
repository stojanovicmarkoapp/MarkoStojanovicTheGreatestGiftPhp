<?php
 header("Content-type: application/json");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";
     
        try{
            $id = $_POST['id'];
            $title = $_POST['title'];
            $author = $_POST['author'];
            $price = $_POST['price'];
            $subgenre = $_POST['subgenre'];
            $yearOfIssue = $_POST['yearOfIssue'];
            $publishingHouse = $_POST['publishingHouse'];
            $numberOfPages = $_POST['numberOfPages'];
            $availability = $_POST['availability'];
            $description = $_POST['description'];
            $response=updatingNovels($id,$title,$author,$price,$subgenre,$yearOfIssue,$publishingHouse,$numberOfPages,$availability,$description);
            if($response){
            $message = ["message"=>"Successfully updated novel with an id of ".$id];
            }
            else {
                $message = ["message"=>"There was an error. Novel with an id of ".$id." has not been updated."];
        
            }
            echo json_encode($message);
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