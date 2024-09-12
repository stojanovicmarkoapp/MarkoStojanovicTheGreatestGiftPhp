<?php
            session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>The Greatest Gift &#124; Author</title>
        <meta name="keywords" content="Greatest, Gift, author, language, programming"/>
        <meta name="description" content="Learn more about the author of The Greatest Gift site."/>
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
                <h3 class="redColor">Author</h3>
            </div>
        </div>
        <div class="width100 blockPaddingTop blockPaddingBottom">
            <div class="wrapper margin0Auto">
                <h4 class="redColor textAlignCenter blockPaddingBottom">A few words about author...</h4>
                <div class="displayFlex justifyContentSpaceBetween tabletAlignItemsCenter tabletFlexDirectionColumn">
                    <div class="displayFlex flexDirectionColumn width45 tabletWidth95 tabletBlockPaddingBottom">
                        <img class="borderRadius descriptiveImage" src="assets/img/author.jpg" alt="Marko Stojanović"/>
                        <h5 class="redColor textAlignCenter descriptionPadding">Marko Stojanović</h5>
                    </div>
                    <div class="width45 tabletWidth95">
                        <p class="redColor textAlignJustify">The author of the this website is a front-end developer Marko Stojanović. He was born on February 11 2001 in Serbian town of Požarevac. He finished ET School in his birthplace and in 2019 and earned title of economic technician. In the same year he was enlisted in ICT College in Serbian capital Belgrade. His capabilities include programming in programming languages C and C#, script language JavaScript (including jQuery library and knowledge of AJAX way of using JavaScript too), markup language HTML, style sheet language CSS and in domain-specific language of SQL. He also has knowledge of TCP/IP architecture. In the spare time, he enjoys reading books, watching movies and listening to music.</p>
                    </div>
                </div>
            </div>
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