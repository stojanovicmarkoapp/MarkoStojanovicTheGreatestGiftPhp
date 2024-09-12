<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>The Greatest Gift &#124; Survey</title>
        <meta name="keywords" content="Greatest, Gift, Family, Romance, screened"/>
        <meta name="description" content="No matter if you love family or romance comedies more because The Greatest Gift has novels that'll satisfy everybody."/>
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
                <h3 class="redColor">Comedy novels</h3>
            </div>
        </div>
        <div class="wrapper margin0Auto displayFlex flexDirectionColumn alignItemsCenter blockPaddingTop blockPaddingBottom">
            <h4 class="redColor">What is your favourite subgenre?</h4>
            <form class="width100">
                <div id="subgenresSurvey" class="displayFlex flexDirectionColumn alignItemsCenter blockPaddingTop blockPaddingBottom">
                </div>
                <div class="displayFlex justifyContentSpaceBetween">
                    <input id="vote" type="button" value="Vote!" class="tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom width45"/>
                    <input id="results" type="button" value="Results" class="tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom width45"/>
                </div>
                <div id="showResults" class="displayNone">
                </div>
            </form>
        </div>
        <?php
            include "fixed/footer.php";
        ?>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
        <script src="assets/js/main.js" type="text/javascript"></script>
    </body>
</html>