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
                <h4 class="redColor textAlignCenter blockPaddingBottom">Registration form</h4>
                        <form>
                            <div class="displayFlex justifyContentSpaceBetween mobileFlexDirectionColumn">
                                <div class="displayFlex flexDirectionColumn width45 mobileWidth100">
                                    <h5 class="redColor textAlignCenter">First name</h5>
                                    <input type="text" id="firstName" class="redBackgroundColor borderRadius whiteColor tinyPadding"/>
                                    <span id="firstMessage"></span>
                                </div>
                                <div class="displayFlex flexDirectionColumn width45 mobileWidth100">
                                    <h5 class="redColor textAlignCenter">Last name</h5>
                                    <input type="text" id="lastName" class="redBackgroundColor borderRadius whiteColor tinyPadding"/>
                                    <span id="lastMessage"></span>
                                </div>
                            </div>
                            <h5 class="redColor textAlignCenter">User name</h5>
                            <input type="text" id="userName" class="width100 boxSizingBorderBox redBackgroundColor borderRadius whiteColor tinyPadding"/>
                            <span id="userNameMessage"></span>
                            <h5 class="redColor textAlignCenter">Email address</h5>
                            <input type="text" id="mailAddress" class="width100 boxSizingBorderBox redBackgroundColor borderRadius whiteColor tinyPadding"/>
                            <span id="emailAddressNote"></span>
                            <h5 class="redColor textAlignCenter">Password</h5>
                            <input type="password" id="password" class="width100 boxSizingBorderBox redBackgroundColor borderRadius whiteColor tinyPadding"/>
                            <span id="passwordMessage"></span>
                            <h5 class="redColor textAlignCenter">Confirmation of password</h5>
                            <input type="password" id="confPass" class="width100 boxSizingBorderBox redBackgroundColor borderRadius whiteColor tinyPadding"/>
                            <span id="confPassMessage"></span>
                            <h5 class="redColor textAlignCenter">Home address</h5>
                            <input type="text" id="homeAddress" class="width100 boxSizingBorderBox redBackgroundColor borderRadius whiteColor tinyPadding"/>
                            <span id="homeMessage"></span>
                            <input type="button" id="register" value="Register!" class="width100 redBackgroundColor borderRadius whiteColor tinyPadding tinyMarginTop"/>
                        </form>
            </div>
        </div>
        <?php
            include "fixed/footer.php";
        ?>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
        <script src="assets/js/main.js" type="text/javascript" ></script>
    </body>
</html>