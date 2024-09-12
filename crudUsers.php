<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>The Greatest Gift &#124; Registration</title>
        <meta name="keywords" content="Greatest, Gift, screen, adaptation, bookstore"/>
        <meta name="description" content="The Greatest Gift is the largest New York bookstore strictly intended for the sale of screened novels."/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Krub:wght@300;400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
        <link rel="shortcut icon" href="assets/img/smallLogo.ico"/>
    </head>
    <body>
        <?php
      
        if(isset($_SESSION['admin'])){
        ?>
    <?php
            
            include "fixed/header.php";
            include "fixed/slider.php";
        ?>
        
        <div class="width100 displayFlex flexDirectionColumn positionAbsolute alignItemsCenter bottom50 tabletDisplayNone">
            <div class="wrapper textAlignCenter">
                <h1 class="redColor">The Greatest Gift</h2>
                <h2 class="redColor">The New York's first screened novels bookstore</h3>
                <h3 class="redColor">Registration</h3>
            </div>
        </div>
        <div class="width100 blockPaddingTop blockPaddingBottom">
            <div class="wrapper margin0Auto">
                <h4 class="redColor textAlignCenter blockPaddingBottom">Logging in form</h4>
                <div id="users"></div>
                <input type="button" value="Add an user" id="addingAnUser"/>
            </div>
        </div>
        <?php
            include "fixed/footer.php";
        ?>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
        <script src="assets/js/main.js" type="text/javascript" ></script>
        <?php
            
        }
        else{  
           ?>
           <script type="text/javascript">
            window.location.href="404.php";
           </script>
           <?php
        };
        ?>
    </body>
</html>