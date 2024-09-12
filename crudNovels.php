<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>The Greatest Gift &#124; Comedy novels</title>
        <meta name="keywords" content="Greatest, Gift, Family, Romance, screened"/>
        <meta name="description" content="No matter if you love family or romance comedies more because The Greatest Gift has novels that'll satisfy everybody."/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Krub:wght@300;400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
        <link rel="shortcut icon" href="assets/img/smallLogo.ico"/>
    </head>
    <body>
    <?php
        if(!isset($_SESSION['admin'])){
            header('Location: 404.php');
        }
        if(isset($_SESSION['admin'])):
        ?>
        <?php
            include "fixed/header.php";
            include "fixed/slider.php";
        ?>
        <div class="width100 displayFlex flexDirectionColumn positionAbsolute alignItemsCenter bottom50 tabletDisplayNone">
            <div class="wrapper textAlignCenter">
                <h1 class="redColor">The Greatest Gift</h2>
                <h2 class="redColor">The New York's first screened novels bookstore</h3>
                <h3 class="redColor">Crud novels</h3>
            </div>
        </div>
        <div class="width100 blockPaddingTop blockPaddingBottom">
            <div class="wrapper margin0Auto displayFlex justifyContentSpaceBetween tabletFlexDirectionColumn tabletAlignItemsCenter">
                <div class="width20 displayFlex flexDirectionColumn redColor tabletBlockPaddingTop mobileBlockPaddingTop">
                    <h4 id="subgenresLabel">Subgenres<span class="fa fa-chevron-down tinyMarginLeft tinyMarginTop" aria-hidden="true"></span></h4>   
                    <ul id="subgenres" class="displayFlex flexDirectionColumn"></ul>
                    <h4 id="authorsLabel">Authors <span class="fa fa-chevron-down tinyMarginLeft tinyMarginTop" aria-hidden="true"></span></h4>
                    <ul id="authors" class="displayFlex flexDirectionColumn"></ul>
                    <h4 id="publishingHousesLabel">Publishing houses <span class="fa fa-chevron-down tinyMarginLeft tinyMarginTop" aria-hidden="true"></span></h4>
                    <ul id="publishingHouses" class="displayFlex flexDirectionColumn"></ul>
                    <h4 id="availabilityLabel">Availability<span class="fa fa-chevron-down tinyMarginLeft tinyMarginTop" aria-hidden="true"></span></h4>
                    <ul id="availability" class="displayFlex flexDirectionColumn"></ul>
                </div>
                <div class="width75">
                    <div class="displayFlex flexDirectionColumn laptopAlignItemsCenter">
                        <div class="displayFlex justifyContentSpaceBetween laptopFlexDirectionColumn">
                            <select id="sort" class="redBackgroundColor borderRadius whiteColor tinyPadding tinyMarginTop"></select>
                            <span class="displayFlex tinyMarginTop">
                                <span class="fa fa-search redColor tinyMarginRight margin0Auto" aria-hidden="true"></span>
                                <input type="search" class="redBackgroundColor borderRadius whiteColor tinyPadding margin0Auto" id="searchTitles" placeholder="Search titles..."/>
                            </span>
                        </div>
                        <span class="displayFlex tinyMarginTop">
                            <h4 class="tinyMarginRight redColor">Price range from 0 to <output id="topLine">70.64</output>:</h4>
                            <input type="range" min="0" step="0.01" max="70.64" value="70.64" id="priceRange"/>
                        </span> 
                    </div>
                    <div id="titles"></div>
                    <input type="button" value="Show insert modal!" id="showingInsertModal"/>
                    <div id="insertModal" class="displayNone positionFixed width100 redColor height100vh alignItemsCenter">
                                      <div class="whiteBackgroundColor width45 positionRelative margin0Auto modalDialog borderRadius tinyPadding">
                                          <div class="displayFlex justifyContentSpaceBetween">
                                              <h4></h4>
                                              <h4 class="exit">&times;</h4>
                                          </div>
                                          <div class="modalBody tinyPadding">
                                          <form method="POST" id="insertNovelForm" name="insertNovelForm">
                                              <input type="file" id="insertedImage" name="insertedImage"/>
                                              <h5 class="tinyMarginTop">Title: <input type="text" value="" id="insertedId" name="insertedId"/></h5>
                                              <h5>Author: <input type="text" value="" id="insertedAuthor" name="insertedAuthor"/></h5>
                                              <h5>Price: $<input type="text" value="" id="insertedPrice" name="insertedPrice"/></h5>
                                              <h5>Genre: <input type="text" value="" id="insertedGenre" name="insertedGenre"/></h5>
                                              <h5>Subgenre: <input type="text" value="" id="insertedSubgenre" name="insertedSubgenre"/></h5>
                                              <h5>Year of issue: <input type="text" value="" id="insertedYearOfIssue" name="insertedYearOfIssue"/></h5>
                                              <h5>Publishing house:<input type="text" value="" id="insertedPublishingHouse" name="insertedPublishingHouse"/></h5>
                                              <h5>Number of pages: <input type="text" value="" id="insertedNumberOfPages" name="insertedNumberOfPages"/></h5>
                                              <h5>Availability: <input type="text" value="" id="insertedAvailability" name="insertedAvailability"/></h5>
                                              <p class="textAlignJustify"><textarea id="insertedDescription" name="insertedDescription"></textarea></p>
                                              <input type="submit" id="insert" name="insert" class="width100 borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginTop" value="Insert!"/>
                                              </form>
                                          </div>
                                      </div>
                                  </div>
                    <!-- <div id="pagination"><a href="#">1</a><a href="#">2</a></div> -->
                </div>
            </div>
        </div>
        <?php
            include "fixed/footer.php";
        ?>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
        <script src="assets/js/main.js" type="text/javascript"></script>
        <a href="survey.php" class="boxClipPath redBackgroundColor whiteColor descriptiveImageBoxShadow" id="survey">Survey</a>
        <?php
            endif;
        ?>
    </body>
</html>