<?php
            session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>The Greatest Gift &#124; Cart</title>
        <meta name="keywords" content="Greatest, Gift, Cart, Quantity, novels"/>
        <meta name="description" content="Take a look at the novels you have added to the cart of The Greatest Gift and manage their quantity."/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Krub:wght@300;400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
        <link rel="shortcut icon" href="assets/img/smallLogo.ico"/>
    </head>
    <body>
        <?php
            include "fixed/header.php";
            include "fixed/slider.php";
        ?>
        <div class="width100 displayFlex flexDirectionColumn positionAbsolute alignItemsCenter bottom50 tabletDisplayNone">
            <div class="wrapper textAlignCenter">
                <h1 class="redColor">The Greatest Gift</h2>
                <h2 class="redColor">The New York's first screened novels bookstore</h3>
                <h3 class="redColor">Cart</h3>
            </div>
        </div>
        <div class="width100">
            <div id="cartBlock" class="wrapper margin0Auto blockPaddingTop blockPaddingBottom"></div>
        </div>
        <?php
            include "fixed/footer.php";
        ?>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
        <script src="assets/js/main.js" type="text/javascript"></script>
        <?php
            if(isset($_SESSION['user'])||isset($_SESSION['admin'])):
        ?>
        <a href="survey.php" class="boxClipPath redBackgroundColor whiteColor descriptiveImageBoxShadow" id="survey">Survey</a>
        <?php
            endif;
        ?>
    </body>
</html>