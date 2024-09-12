<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include "../config/connection.php";
        include "functions.php";

        try{
      

            $image = $_FILES['insertedImage']['name'];
            $temporaryFile = $_FILES['insertedImage']['tmp_name'];
            $title = $_POST['insertedAuthor'];
            $price = $_POST['insertedPrice'];
            $genre = $_POST['insertedGenre'];
            $subgenre = $_POST['insertedSubgenre'];
            $yearOfIssue = $_POST['insertedYearOfIssue'];
            $publishingHouse = $_POST['insertedPublishingHouse'];
            $numberOfPages = $_POST['insertedNumberOfPages'];
            $availability = $_POST['insertedAvailability'];
            $description = $_POST['insertedDescription'];
 
            $extension = strtolower(pathinfo($image, PATHINFO_EXTENSION));
            $finalImage =$image;
            $path = "../assets/img/".$finalImage;
            echo $path;
            //$path = $path.strtolower($finalImage); 
            if(move_uploaded_file($temporaryFile,$path)){

            $imageId = int(getLastImageId())+1;
            $publishingInformationId = int(getLastPublishingInformationId())+1;
            $response = insertANovel($path,$title,$price,$genre,$subgenre,$yearOfIssue,$publishingHouse,$numberOfPages,$availability,$description);
            if($response){
                $message = ["message"=>"Successfully inserted novels."];
                }
                else {
                    $message = ["message"=>"There was an error. Novel has not been inserted."];
            
                }

            echo json_encode($message);
        
            http_response_code(200);
        }else {
            $message = ["message"=>"There was an error. Novel has not been inserted."];
            echo json_encode($message);
            http_response_code(200);
        }}
        catch(PDOException $exception){
            http_response_code(500);
        }
    }
    else{
        http_response_code(404);
    }
?>