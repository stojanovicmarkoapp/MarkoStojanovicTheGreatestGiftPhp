//getViaAjax("menu", showMenu);
//getViaAjax("slider", showSlides);
//getViaAjax("links", showLinks);
$.ajax({
  url: "models/loadSlides.php",
  method : "post",
  dataType: "json",
  success: function(result){
    showSlides(result);
  },
  error: function(xhr){
    console.error(xhr);
  }
});
$.ajax({
  url: "models/menu.php",
  method : "post",
  dataType: "json",
  success: function(result){
    showMenu(result);
  },
  error: function(xhr){
    console.error(xhr);
  }
});
$.ajax({
  url: "models/showLinks.php",
  method : "post",
  dataType: "json",
  success: function(result){
    showLinks(result);
  },
  error: function(xhr){
    console.error(xhr);
  }
});
// function getViaAjax(fileName, specificFunction) {
//   $.ajax({
//     url: "assets/data/" + fileName + ".json",
//    method: "get",
//     dataType: "json",
//     success: function (jsonData) {
//       specificFunction(jsonData);
//    },
//     error: function (xhr, status, errorMessage) {
//      console.log(xhr);
//       console.log(status);
//       console.log(errorMessage);
//    },
//   });
// }
function getNovelsViaAjax(specificFunction,genres) {
  $.ajax({
    url: "models/showNovels.php",
    method: "post",
    data : {
      genre : genres
    },
    dataType: "json",
    success: function (jsonData) {
      specificFunction(jsonData);
    },
    error: function (xhr, status, errorMessage) {
      console.log(xhr);
      console.log(status);
      console.log(errorMessage);
    }
  });}
  function getNumberOfNovels(){
    $.ajax({
      url: "models/showNumberOfNovels.php",
      method: "post",
      dataType: "json",
      success: function (jsonData) {
        showNumberOfNovels(jsonData.num);
      },
      error: function (xhr, status, errorMessage) {
        console.log(xhr);
        console.log(status);
        console.log(errorMessage);
      }
    });
  }
  function deleteNovels(jsonData){
    alert(jsonData.message);
    window.location.href="crudNovels.php";
  }
  function showNumberOfNovels(number){
    novelCounter=number;
    console.log(novelCounter);
  }
  var novelCounter = 0;
  function getPhp(parameterName, specificFunction,tableName) {
    $.ajax({
      url: "models/" + parameterName + ".php",
      method: "post",
      data : {
        table : tableName
      },
      dataType: "json",
      success: function (jsonData) {
        specificFunction(jsonData);
      },
      error: function (xhr, status, errorMessage) {
        console.log(xhr);
        console.log(status);
        console.log(errorMessage);
      }
    });}
    function deletingViaAjax(parameterName, specificFunction,ida) {
      $.ajax({
        url: "models/" + parameterName + ".php",
        method: "post",
        data : {
          id : ida
        },
        dataType: "json",
        success: function (jsonData) {
          specificFunction(jsonData);
        },
        error: function (xhr, status, errorMessage) {
          console.log(xhr);
          console.log(status);
          console.log(errorMessage);
        }
      });}
function addingToCart(e){
  e.preventDefault();
  alert("You have successfully added a book to your cart!");
  var novelId = Number(this.dataset.id);
  var novelsInCart = [];
  if(!localStorage.getItem("novelsToBuy")){
    var novel = {id:novelId, quantity:1};
    novelsInCart.push(novel);
    localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCart));
  }
  else {
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var existingNovelInCart = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
    if(existingNovelInCart.length){
      existingNovelInCart[0].quantity+=1;
      localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    }
    else {
      var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
          var novel = {id:novelId, quantity:1};

      novelsInCartLocalStorage.push(novel);
      localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    }

  }
  numberOfNovelsInCart();

}
function numberOfNovelsInCart(){
  var numberOfNovels;
  if (!localStorage.getItem("novelsToBuy")){
    numberOfNovels = "";
  }
  else {
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var quantity = 0;
    novelsInCartLocalStorage.forEach(novel => {
      quantity+=novel.quantity;
    });
    numberOfNovels=quantity;
  }
  var cartNumbers = document.querySelectorAll(".numberOfNovels");
  for (cartNumber in cartNumbers){
    cartNumbers[cartNumber].innerHTML=numberOfNovels;
  }
}

function showMenu(menuJsonData) {
  var writingMenu = "";
  var writingSubmenu = "";
  var writingTabletMenu = "";
  var userLoggingIn = localStorage.getItem("userLoggingIn");
  for (partOfMenu in menuJsonData) {
    if (menuJsonData[partOfMenu].primaryHref != "#") {
      if(userLoggingIn){
        if(menuJsonData[partOfMenu].primaryHref!="loggingIn.php" && menuJsonData[partOfMenu].primaryHref!="registration.php"){
      
      writingMenu += `<li class="linkPaddingLeftRight">
                            <a href="${menuJsonData[partOfMenu].primaryHref}" id="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;
      writingTabletMenu += `<li>
                            <a href="${menuJsonData[partOfMenu].primaryHref}" id="${menuJsonData[partOfMenu].primaryHref}a" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;

    } }
  else{
    if(menuJsonData[partOfMenu].primaryHref!="loggingOut.php"){
      
      writingMenu += `<li class="linkPaddingLeftRight">
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;
      writingTabletMenu += `<li>
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;
    }


  }}else if(menuJsonData[partOfMenu].primaryHref=="#"&&menuJsonData[partOfMenu].secondaryLabelId==menuJsonData[partOfMenu].secondaryHrefId) {
      if(!writingMenu.includes("Catalog")){

      
      writingMenu += `<li class="includesSubmenu linkPaddingLeftRight">
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}<span class="fa fa-chevron-down tinyMarginLeft" aria-hidden="true"></span>
                            </a>
                        </li>`;
      writingTabletMenu += `<li class="includesTabletSubmenu linkPaddingTopBottom">
                                    <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}<span class="fa fa-chevron-down tinyMarginLeft" aria-hidden="true"></span>
                                    </a>
                                <ul class="displayNone">`;
      }
      //for (partOfSubmenu in menuJsonData[partOfMenu].secondaryHrefs) {
        
        writingSubmenu += `<li class="linkPaddingTopBottom linkPaddingLeftRight">
                                                     <a href="${menuJsonData[partOfMenu].secondaryHrefName}" class="whiteColor">${menuJsonData[partOfMenu].secondaryLabelName}</a>
                                                 </li>`;
        writingTabletMenu += `<li class="linkPaddingTopBottom">
                                                 <a href="${menuJsonData[partOfMenu].secondaryHrefName}" class="whiteColor">${menuJsonData[partOfMenu].secondaryLabelName}</a>
                                             </li>`;
        if(writingTabletMenu.includes("Drama")){
      writingTabletMenu += "</ul></li>"}
      document.querySelector("#submenu").innerHTML = writingSubmenu;

    }
   
  }
  document.querySelector("#menu").innerHTML = writingMenu;
  if(writingMenu.includes("Log out")){
    document.getElementById("loggingOut.php").addEventListener("click",function(){
      localStorage.removeItem("userLoggingIn");
    });
  }
  document.querySelector("#tabletMenu").innerHTML = writingTabletMenu;
  if(writingTabletMenu.includes("Log out")){
    document.getElementById("loggingOut.phpa").addEventListener("click",function(){
      localStorage.removeItem("userLoggingIn");
    });
  }
  
  numberOfNovelsInCart();
}
function showSlides(slidesJsonData) {
  var writingSlides = "";
  for (slide in slidesJsonData) {
    if (slide == 0) {
      writingSlides += `<img class="height100vh" src="${slidesJsonData[slide].src}" alt="${slidesJsonData[slide].alt}"/>`;
    } else {
      writingSlides += `<img class="displayNone height100vh" src="${slidesJsonData[slide].src}" alt="${slidesJsonData[slide].alt}"/>`;
    }
  }
  document.querySelector("#slider").innerHTML = writingSlides;
}
function slideShow() {
  var slides = $("#slider img");
  for (var i = 0; i < slides.length; i++) {
    if (i != slides.length - 1) {
      if ($(slides[i]).hasClass("displayNone") == false) {
        $(slides[i]).addClass("displayNone");
        $(slides[i + 1]).removeClass("displayNone");
        break;
      }
    } else {
      $(slides[i]).addClass("displayNone");
      $(slides[0]).removeClass("displayNone");
    }
  }
  setTimeout("slideShow()", 3000);
}
slideShow();
$("#menu").on("mouseenter", ".includesSubmenu", function () {
  $("#submenu").parent().parent().removeClass("displayNone");
});
$("#submenu").parent().parent().mouseleave(function () {
    $("#submenu").parent().parent().addClass("displayNone");
  });
$("#hamburger").click(function () {
  $("#tabletMenu").slideToggle("slow");
});
$("#tabletMenu").on("click", ".includesTabletSubmenu", function () {
  $(".includesTabletSubmenu ul").slideToggle("slow");
});
function showLinks(links) {
  var writingLinks = "";
  for (link in links) {
    writingLinks += `<li>
                            <a href="${links[link].href}" class="whiteColor">${links[link].label}</a>
                        </li>`;
  }
  document.querySelector("#linkList").innerHTML = writingLinks;
}
if (window.location =="http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/index.php") {
  //getViaAjax("contactInformation", showContactInformationList);

  getPhp("loadPurposes",showPurposes,"purpose");
  function showPurposes(purposes) {
    var writingPurposes = `<option value="0">Choose...</option>`;
    for (purpose in purposes) {
      writingPurposes += `<option value="${purposes[purpose].id}">${purposes[purpose].purposeName}</option>`;
    }
    document.querySelector("#purpose").innerHTML = writingPurposes;
  }
  $("#send").click(function () {
    var firstNameVar = $("#firstName").val();
    var lastNameVar = $("#lastName").val();
    var emailAddressVar = $("#emailAddress").val();
    var purposeVar = $("#purpose").find(":selected").text();
    console.log(purposeVar);
    var messageVar = $("#message").val();
    var sendVar = $("#send").val();
    var nameModel = /^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/;
    var emailAddressModel = /^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;
    var numberOfErrors = 0;
    if (firstNameVar != "") {
      if (nameModel.test(firstNameVar)) {
        $("#firstNameNote").html("You filled this field properly!");
        $("#firstNameNote").removeClass("redColor");
        $("#firstNameNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#firstNameNote").html(
          "You did not fill this field properly. Example: Al McKay"
        );
        $("#firstNameNote").removeClass("greenColor");
        $("#firstNameNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#firstNameNote").html("This field must not be left blank!");
      $("#firstNameNote").removeClass("greenColor");
      $("#firstNameNote").addClass("redColor");
    }
    if (lastNameVar != "") {
      if (nameModel.test(lastNameVar)) {
        $("#lastNameNote").html("You filled this field properly!");
        $("#lastNameNote").removeClass("redColor");
        $("#lastNameNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#lastNameNote").html(
          "You did not fill this field properly. Example: O'Bryant Junior"
        );
        $("#lastNameNote").removeClass("greenColor");
        $("#lastNameNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#lastNameNote").html("This field must not be left blank!");
      $("#lastNameNote").removeClass("greenColor");
      $("#lastNameNote").addClass("redColor");
    }
    if (emailAddressVar != "") {
      if (emailAddressModel.test(emailAddressVar)) {
        $("#emailAddressNote").html("You filled this field properly!");
        $("#emailAddressNote").removeClass("redColor");
        $("#emailAddressNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#emailAddressNote").html(
          "You did not fill this field properly. Example: 1james.caa1n@3mail.co.us"
        );
        $("#emailAddressNote").removeClass("greenColor");
        $("#emailAddressNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#emailAddressNote").html("This field must not be left blank!");
      $("#emailAddressNote").removeClass("greenColor");
      $("#emailAddressNote").addClass("redColor");
    }
    if (purposeVar != "Choose...") {
      $("#purposeNote").html("You selected a purpose properly!");
      $("#purposeNote").removeClass("redColor");
      $("#purposeNote").addClass("greenColor");
    } else {
      numberOfErrors++;
      $("#purposeNote").html(
        "You did not select a purpose. Example: Suggestion"
      );
      $("#purposeNote").removeClass("greenColor");
      $("#purposeNote").addClass("redColor");
    }
    if (messageVar != "") {
      $("#messageNote").html("You filled this field properly!");
      $("#messageNote").removeClass("redColor");
      $("#messageNote").addClass("greenColor");
    } else {
      numberOfErrors++;
      $("#messageNote").html("This field must not be left blank!");
      $("#messageNote").removeClass("greenColor");
      $("#messageNote").addClass("redColor");
    }
    if (numberOfErrors == 0) {
      $.ajax({
        url: "models/contact.php",
        method: "post",
        dataType: "json",
        data: {
          firstNameProperty: firstNameVar,
          lastNameProperty: lastNameVar,
          emailAddressProperty: emailAddressVar,
          purposeProperty: purposeVar,
          messageProperty: messageVar,
          sendProperty: sendVar
        },
        success: function(result){
          if(!Array.isArray(result.message)){
            alert(result.message);
            }
            else {
              for(var i=0;i<result.message.length;i++){
                alert(result.message[i]);
              }
            }
        },
        error: function(xhr){
          console.error(xhr)
        }
      });
    }
  });
  $.ajax({
    url: "models/showContactInformationList.php",
    method : "post",
    dataType: "json",
    success: function(result){
      showContactInformationList(result);
    },
    error: function(xhr){
      console.error(xhr);
    }
  });
  function showContactInformationList(contactInformation) {
    var writingContactInformationList = "";
    for (partOfContactInformation in contactInformation) {
      if(!writingContactInformationList.includes(contactInformation[partOfContactInformation].primaryLabel)){
      writingContactInformationList += `<li class="blockPaddingBottom">
                                                <h5>${contactInformation[partOfContactInformation].primaryLabel}</h5>
                                                <ul class="displayNone">`;
      }
      //for (tinyPartOfContactInformation in contactInformation[
      //  partOfContactInformation
     // ].secondaryLabels) {

        writingContactInformationList += `<li class="sublistPaddingLeft">
                                                            <h6>${contactInformation[partOfContactInformation].secondaryLabelName}</h6>
                                                        </li>`;
      //}
      if(contactInformation[partOfContactInformation].secondaryLabelId==5 || contactInformation[partOfContactInformation].secondaryLabelId==8 || contactInformation[partOfContactInformation].secondaryLabelId==10){
      writingContactInformationList += "</ul></li>";
      }
    }
    document.querySelector("#contactInformationList").innerHTML = writingContactInformationList;
  }
  $("#contactInformationList").on("mouseenter", "li", function () {
    $(this).find("ul").slideDown();
  });
  $("#contactInformationList").on("mouseleave", "li", function () {
    $(this).find("ul").slideUp();
  });
}
if ((window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/author.php")||(window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/index.php")) {
  $(".descriptiveImage").mouseover(function () {
    $(this).addClass("descriptiveImageBoxShadow");
  });
  $(".descriptiveImage").mouseleave(function () {
    $(this).removeClass("descriptiveImageBoxShadow");
  });
}
if ((window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/comedyNovels.php")||(window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/dramaNovels.php")||(window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/crudNovels.php")) {


  function filterChange(){
    if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/crudNovels.php"){
    getNovelsViaAjax(editingNovels,"All");
  }
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/comedyNovels.php"){
 
  getNovelsViaAjax(showNovels,"Comedy");

}
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/dramaNovels.php"){

  getNovelsViaAjax(showNovels,"Drama");
  
}
  }
    var novelsJsonData = "";
  $("#titles").on("mouseover", ".descriptiveImage", function () {
    $(this).addClass("descriptiveImageBoxShadow");
  });
  $("#titles").on("mouseleave", ".descriptiveImage", function () {
    $(this).removeClass("descriptiveImageBoxShadow");
  });
  //getViaAjax("publishingHouses", showPublishingHouses);
  //getViaAjax("availability", showAvailability);
  // getViaAjax("sortCategories", showSortCategories);
  getPhp("getCheckboxes",showPublishingHouses,"publishinghouses");
  getPhp("getCheckboxes",showAvailability,"availability");
  $.ajax({
    url: "models/loadSortCategories.php",
    method : "post",
    dataType: "json",
    success: function(result){
      showSortCategories(result);
    },
    error: function(xhr){
      console.error(xhr);
    }
  });
  function showSubgenres(subgenres) {
    var writingSubgenres = "";
    for (subgenre in subgenres) {
      writingSubgenres += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="subgenresName" value="${subgenres[subgenre].name}" class="tinyMarginTop tinyMarginRight subgenres" id="${subgenres[subgenre].id}"/><h5>${subgenres[subgenre].name}</h5>
                                </li>`;
    }
    document.querySelector("#subgenres").innerHTML = writingSubgenres;
    $(".subgenres").change(filterChange);
  }
  function showAuthors(authors) {
    var writingAuthors = "";
    for (author in authors) {
      writingAuthors += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="authorsName" value="${authors[author].firstName} ${authors[author].lastName}" class="tinyMarginTop tinyMarginRight authors" id="${authors[author].id}"/><h5>${authors[author].firstName} ${authors[author].lastName}</h5>
                                </li>`;
    }
    document.querySelector("#authors").innerHTML = writingAuthors;
    $(".authors").change(filterChange);
  }
  function showPublishingHouses(publishingHouses) {
    var writingPublishingHouses = "";
    for (publishingHouse in publishingHouses) {
      writingPublishingHouses += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="publishingHousesName" value="${publishingHouses[publishingHouse].name}"  class="tinyMarginTop tinyMarginRight publishingHouses" id="${publishingHouses[publishingHouse].id}"/><h5>${publishingHouses[publishingHouse].name}</h5>
                                </li>`;
    }
    document.querySelector(
      "#publishingHouses"
    ).innerHTML = writingPublishingHouses;
    $(".publishingHouses").change(filterChange);
  }
  function showAvailability(availability) {
    var writingAvailability = "";
    for (availabilityStatus in availability) {
      writingAvailability += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="availabilityName" value="${availability[availabilityStatus].status}" class="tinyMarginTop tinyMarginRight availability" id="${availability[availabilityStatus].id}"/><h5>${availability[availabilityStatus].status}</h5>
                                </li>`;
    }
    document.querySelector("#availability").innerHTML = writingAvailability;
    $(".availability").change(filterChange);
  }
  $("#subgenresLabel").click(function () {
    $("#subgenres").slideToggle("slow");
  });
  $("#authorsLabel").click(function () {
    $("#authors").slideToggle("slow");
  });
  $("#publishingHousesLabel").click(function () {
    $("#publishingHouses").slideToggle("slow");
  });
  $("#availabilityLabel").click(function () {
    $("#availability").slideToggle("slow");
  });
  function showSortCategories(sortCategories) {
    var writingSortCategories = "";
    for (sortCategory in sortCategories) {
      writingSortCategories += `
                                    <option value="${sortCategories[sortCategory].id}">${sortCategories[sortCategory].categoryName}
                                    </option>
                                    `;
    }
    document.querySelector("#sort").innerHTML = writingSortCategories;
  }

  function getNovels(novels){
    novelsJsonData = novels;
  }
  function showNovels(novels) {
  novels=filterBySubgenres(novels);
  novels=filterByAuthors(novels);
  novels=filterByPublishingHouses(novels);
  novels=filterByAvailabilities(novels);
  novels=filterByPriceRange(novels);
  novels=filterByTitle(novels);
  novels=sort(novels);
  var writingNovels = "";
  if(novels.length == 0){
    writingNovels=`<div class="width100 displayFlex justifyContentCenter blockPaddingTop"><h4 class="redColor">Unfortunately, there are no novels matching your search.</h4><div>`;
  }else {
    for (novel in novels) {
      writingNovels += `
                            <div class="width25 tabletWidth45 mobileWidth100 floatLeft ${novel == novels.length - 1? "": "novelMarginRight"}">
                                <img class="borderRadius descriptiveImage" src="${novels[novel].src}" alt="${novels[novel].alt}"/>
                                <h4 class="redColor textAlignCenter">${novels[novel].title}</h4>
                                <h5 class="redColor textAlignCenter">${novels[novel].author}</h5>
                                <input type="button" class="width100 proceed borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginBottom" value="Proceed!"/>
                                <div class="displayNone positionFixed modal width100 redColor height100vh alignItemsCenter">
                                    <div class="whiteBackgroundColor width45 positionRelative margin0Auto modalDialog borderRadius tinyPadding">
                                        <div class="displayFlex justifyContentSpaceBetween">
                                            <h4>${novels[novel].title}</h4>
                                            <h4 class="exit">&times;</h4>
                                        </div>
                                        <div class="modalBody tinyPadding">
                                            <img class="borderRadius descriptiveImage" src="${novels[novel].src}" alt="${novels[novel].alt}"/>
                                            <h5 class="tinyMarginTop">Title: ${novels[novel].title}</h5>
                                            <h5>Author: ${novels[novel].author}</h5>
                                            <h5>Price: $${novels[novel].price}</h5>
                                            <h5>Subgenre: ${novels[novel].subgenre}</h5>
                                            <h5>Year of issue: ${novels[novel].yearOfIssue}</h5>
                                            <h5>Publishing house: ${novels[novel].publishingHouse}</h5>
                                            <h5>Number of pages: ${novels[novel].numberOfPages}</h5>
                                            <h5>Availability: <span class="${novels[novel].availability =="In stock"? "greenColor": "redColor"}">${novels[novel].availability}</span></h5>
                                            <p class="textAlignJustify">${novels[novel].description}</p>
                                            <input type="button" class="width100 addToCart borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginTop" data-id="${novels[novel].id}" value="Add to cart!" ${novels[novel].availability == "In stock"?"":"disabled"} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;

    }}
    document.querySelector("#titles").innerHTML = writingNovels;
    $(".addToCart").click(addingToCart);
  }
  function editingNovels(novels) {
    novels=filterBySubgenres(novels);
    novels=filterByAuthors(novels);
    novels=filterByPublishingHouses(novels);
    novels=filterByAvailabilities(novels);
    novels=filterByPriceRange(novels);
    novels=filterByTitle(novels);
    novels=sort(novels);
    var writingNovels = "";
    if(novels.length == 0){
      writingNovels=`<div class="width100 displayFlex justifyContentCenter blockPaddingTop"><h4 class="redColor">Unfortunately, there are no novels matching your search.</h4><div>`;
    }else {
      for (novel in novels) {
        writingNovels += `
                              <div class="width25 tabletWidth45 mobileWidth100 floatLeft ${novel == novels.length - 1? "": "novelMarginRight"}">
                                  <img class="borderRadius descriptiveImage" src="${novels[novel].src}" alt="${novels[novel].alt}"/>
                                  <h4 class="redColor textAlignCenter">${novels[novel].title}</h4>
                                  <h5 class="redColor textAlignCenter">${novels[novel].author}</h5>
                                  <input type="button" class="width45 update borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginBottom" value="Update!"/>
                                  <input type="button" class="width45 delete borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginBottom" data-id="${novels[novel].id}" value="Delete!"/>
                                  <div class="displayNone positionFixed editingModal width100 redColor height100vh alignItemsCenter">
                                      <div class="whiteBackgroundColor width45 positionRelative margin0Auto modalDialog borderRadius tinyPadding">
                                          <div class="displayFlex justifyContentSpaceBetween">
                                              <h4>${novels[novel].title}</h4>
                                              <h4 class="exit">&times;</h4>
                                          </div>
                                          <div class="modalBody tinyPadding">
                                              <h5 class="tinyMarginTop">Title: <input type="text" value="${novels[novel].title}" id="${novels[novel].id}Title"/></h5>
                                              <h5>Author: <input type="text" value="${novels[novel].author}" id="${novels[novel].id}Author"/></h5>
                                              <h5>Price: $<input type="text" value="${novels[novel].price}" id="${novels[novel].id}Price"/></h5>
                                              <h5>Subgenre: <input type="text" value="${novels[novel].subgenre}" id="${novels[novel].id}Subgenre"/></h5>
                                              <h5>Year of issue: <input type="text" value="${novels[novel].yearOfIssue}" id="${novels[novel].id}YearOfIssue"/></h5>
                                              <h5>Publishing house:<input type="text" value="${novels[novel].publishingHouse}" id="${novels[novel].id}PublishingHouse"/></h5>
                                              <h5>Number of pages: <input type="text" value="${novels[novel].numberOfPages}" id="${novels[novel].id}NumberOfPages"/></h5>
                                              <h5>Availability: <input type="text" value="${novels[novel].availability}" id="${novels[novel].id}Availability"/></h5>
                                              <p class="textAlignJustify"><textarea id="${novels[novel].id}Description">${novels[novel].description}</textarea></p>
                                              <input type="button" class="width100 change borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginTop" data-id="${novels[novel].id}" value="Change!"/>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              `;
  
      }}
      document.querySelector("#titles").innerHTML = writingNovels;
      $(".addToCart").click(addingToCart);
    }
    $("#titles").on("click", ".update", function () {
      $(this).parent().find(".editingModal").removeClass("displayNone");
      $(this).parent().find(".editingModal").addClass("displayFlex");
    });
    $("#showingInsertModal").on("click", function () {
      $("#insertModal").removeClass("displayNone");
      $("#insertModal").addClass("displayFlex");
    });
    $("#titles").on("click", ".change", function () {
      var id= this.dataset.id;
      var title= document.getElementById(id+"Title").value;
      var author= document.getElementById(id+"Author").value;
      var price= document.getElementById(id+"Price").value;
      var subgenre= document.getElementById(id+"Subgenre").value;
      var yearOfIssue= document.getElementById(id+"YearOfIssue").value;
      var publishingHouse= document.getElementById(id+"PublishingHouse").value;
      var numberOfPages= document.getElementById(id+"NumberOfPages").value;
      var availability= document.getElementById(id+"Availability").value;
      var description= document.getElementById(id+"Description").textContent;
      sendUpdatedNovelData(id,title,author,price,subgenre,yearOfIssue,publishingHouse,numberOfPages,availability,description);
    });
    function sendUpdatedNovelData(id,title,author,price,subgenre,yearOfIssue,publishingHouse,numberOfPages,availability,description){
       $.ajax({
      url: "models/updateNovels.php",
      method: "post",
      data : {
        id : id,
        title : title,
        author : author,
        price : price,
        subgenre : subgenre,
        yearOfIssue : yearOfIssue,
        publishingHouse : publishingHouse,
        numberOfPages : numberOfPages,
        availability : availability,
        description : description
      },
      dataType: "json",
      
      success: function (jsonData) {
        alert(jsonData.message);
        window.location.href="crudNovels.php";
      },
      error: function (xhr, status, errorMessage) {
        console.log(xhr);
        console.log(status);
        console.log(errorMessage);
      }
    });
    }
   
    $("#titles").on("click", ".delete", function () {
      var id= this.dataset.id;
      var sure = confirm("Are you sure about deleting novel with an id of "+id+"?");
      if(sure){
        deletingViaAjax("deletingNovels",deleteNovels,id);
      }
    });
  $("#titles").on("click", ".proceed", function () {
    $(this).parent().find(".modal").removeClass("displayNone");
    $(this).parent().find(".modal").addClass("displayFlex");
  });
  $("#titles").on("click", ".exit", function () {
    $(this).parent().parent().parent().addClass("displayNone");
    $(this).parent().parent().parent().removeClass("displayFlex");
  });
  function sort(novels) {

    if ($("#sort").val() == '0'){
          return novels;
      }

    if ($("#sort").val() == '1') {
        
      novels.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
            return 1;
          }
          if (a.title == b.title) {
            return 0;
          }
      });
    }
    if ($("#sort").val() == '2') {
        novels.sort(function (a, b) {
           
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
              return 1;
            }
            if (a.title == b.title) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '3') {
        novels.sort(function (a, b) {
           
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
              return 1;
            }
            if (a.price == b.price) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '4') {
        novels.sort(function (a, b) {
           
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
              return 1;
            }
            if (a.price == b.price) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '5') {
        novels.sort(function (a, b) {
           
          if (a.yearOfIssue < b.yearOfIssue) {
            return -1;
          }
          if (a.yearOfIssue > b.yearOfIssue) {
              return 1;
            }
            if (a.yearOfIssue == b.yearOfIssue) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '6') {
        novels.sort(function (a, b) {
           
          if (a.yearOfIssue > b.yearOfIssue) {
            return -1;
          }
          if (a.yearOfIssue < b.yearOfIssue) {
              return 1;
            }
            if (a.yearOfIssue == b.yearOfIssue) {
              return 0;
            }
        });
      }
    return novels;
  }
   function filterByTitle(novels){
      var userTitle = $("#searchTitles").val();
      var filteredNovelsByTitle = novels.filter(function(novel){
          if(novel.title.toUpperCase().indexOf(userTitle.trim().toUpperCase())!=-1){
              return novel;
          }
      });
      return filteredNovelsByTitle;
  }
  $("#sort").on("change", filterChange);
$("#searchTitles").on("keyup",filterChange);
  $("#priceRange").on("change",filterChange);
  function filterByPriceRange(novels){
    var userTopPrice = $("#priceRange").val();
   var novelsInRange = novels.filter(function(novel){
      if(parseFloat(novel.price)<=parseFloat(userTopPrice)){
        return novel;
      }
    });
    return novelsInRange;
  }

  function filterBySubgenres(novels){
var selectedSubgenres=[];
$(".subgenres:checked").each(function(item){
  selectedSubgenres.push($(this).val());
  });

if(selectedSubgenres.length !=0){
  return novels.filter(novel=>selectedSubgenres.includes(novel.subgenre));
}
     return novels;
  }

  function filterByAuthors(novels){
var selectedAuthors=[];
$(".authors:checked").each(function(item){
  selectedAuthors.push($(this).val());
  });

if(selectedAuthors.length !=0){
  return novels.filter(novel=>selectedAuthors.includes(novel.author));
}
     return novels;
  }
  function filterByPublishingHouses(novels){
var selectedPublishingHouses=[];
$(".publishingHouses:checked").each(function(item){
  selectedPublishingHouses.push($(this).val());
  });

if(selectedPublishingHouses.length !=0){
  return novels.filter(novel=>selectedPublishingHouses.includes(novel.publishingHouse));
}
     return novels;
  }
  function filterByAvailabilities(novels){
var selectedAvailability=[];
$(".availability:checked").each(function(item){
  selectedAvailability.push($(this).val());
  });

if(selectedAvailability.length !=0){
  return novels.filter(novel=>selectedAvailability.includes(novel.availability));
}
     return novels;
  }



  $("#priceRange").on("input",function(){
    $("#topLine").html($(this).val());
  });

}

if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/crudNovels.php"){
  // getNumberOfNovels(); 
  // var limitPagination = novelCounter;
  getPhp("getAllCheckboxes",showSubgenres,"allSubgenres");
  getPhp("getAllCheckboxes",showAuthors,"allAuthors");
  getNovelsViaAjax(editingNovels,"All");
  getNovelsViaAjax(getNovels, "All");

  $("#insertNovelForm").on("submit",function(e){
    var formData = new FormData(this);
    console.log("dasdsada");
    e.preventDefault;
    $.ajax({
      url : "models/submitNovel.php",
      method: "POST",
      data : formData,
      success: function(response){
        alert(response);
      },
      cache: false,
      contentType : false,
      processData: false,
      error : function(xhr){
        console.error(xhr);
      }
    });
  });
}

if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/comedyNovels.php"){
  // getNumberOfNovels(); 
  // var limitPagination = novelCounter;
  //getViaAjax("comedySubgenres", showSubgenres);
  getPhp("getCheckboxes",showSubgenres,"comedysubgenres");
  getPhp("getCheckboxes",showAuthors,"comedyauthors");
  //getPhp("getCheckboxes",showNovels,"novels");
  //getViaAjax("comedyAuthors", showAuthors);
  //getViaAjax("comedyNovels", showNovels);
  getNovelsViaAjax(showNovels,"Comedy");
  getNovelsViaAjax(getNovels, "All");
}
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/dramaNovels.php"){
  // getNumberOfNovels(); 
  // var limitPagination = novelCounter;
 // getViaAjax("dramaSubgenres", showSubgenres);
  getPhp("getCheckboxes",showSubgenres,"dramasubgenres");
  getPhp("getCheckboxes",showAuthors,"dramaauthors");
  //getViaAjax("dramaAuthors", showAuthors);
  //getViaAjax("dramaNovels", showNovels);
  //getViaAjax("dramaNovels", getNovels);
  getNovelsViaAjax(showNovels,"Drama");
  getNovelsViaAjax(getNovels, "All");
}
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/cart.php"){
  getNovelsViaAjax(getComedyNovels,"Comedy");
  getNovelsViaAjax(getDramaNovels,"Drama");
  //getViaAjax("comedyNovels",getComedyNovels);
  //getViaAjax("dramaNovels",getDramaNovels);
  var globalNovels;
  var comedyNovels=[];
  var dramaNovels=[];
  function getComedyNovels(novels){
        comedyNovels=novels;
  }
  function getDramaNovels(novels){

      dramaNovels=novels;
  }
setTimeout(() => {
  globalNovels=comedyNovels.concat(dramaNovels);
readingAllNovels(globalNovels);
readingNovelsFromCart(globalNovels);
}, 500);
  
  function readingNovelsFromCart(novels){
    emptyCart();
    var cartBlock = document.getElementById("cartBlock");
    if(!localStorage.getItem("novelsToBuy")){
      cartBlock.innerHTML=`<div class="width100 displayFlex justifyContentCenter blockPaddingTop"><h4 class="redColor">Your cart is empty!</h4></div>`;
    }
    else {
      var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
      var novelsInCart = [];
      novelsInCartLocalStorage.forEach(novel=>{
        novelsInCart.push(novel.id);
      });
      console.log(novelsInCart);
      var showNovels = novels.filter(novel=>novelsInCart.includes(parseInt(novel.id)));
      showNovelsFromCart(showNovels);
    }
  }
  function showNovelsFromCart(novels){
    emptyCart();
    var writingNovels = "";
    var cartBlock = document.getElementById("cartBlock");
    writingNovels="<div class='displayFlex justifyContentSpaceBetween tabletFlexDirectionColumn tabletBlockPaddingTop tabletAlignItemsCenter'><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Image</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Title</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Unit price</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Quantity</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Quantity management</h5></div></div>";
    novels.forEach(novel=>{
      writingNovels+=`
                <div class='displayFlex justifyContentSpaceBetween tabletFlexDirectionColumn tabletAlignItemsCenter'><div class='width15 tabletWidth45'><img class="borderRadius descriptiveImage" src="${novel.src}" alt="${novel.alt}"/></div><div class='width15 tabletWidth45 textAlignCenter'><h6 class='redColor'>${novel.title}</h6></div><div class='width15 tabletWidth45 textAlignCenter'><h6 class='redColor'>$${novel.price}</h6></div><div id="quantityOf${novel.id}" class='width15 tabletWidth45 textAlignCenter'><h6 class="redColor">${quantityOfANovel(novel.id)}</h6></div><div class='width15 displayFlex flexDirectionColumn tabletWidth45'><button type="button" class="addMore redBackgroundColor whiteColor borderRadius tinyMarginBottom tinyPadding" data-id="${novel.id}"><span class="fa fa-plus" aria-hidden="true"></span></button><button type="button" class="removeMore tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom" data-id="${novel.id}"><span class="fa fa-minus" aria-hidden="true"></span></button><button type="button" class="removeAll tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom" class="removeAll width100" data-id="${novel.id}"><span class="fa fa-trash" aria-hidden="true"></span></button></div></div>
      `;
    });
    writingNovels+=`<div class="width100 displayFlex justifyContentCenter tinyMarginTop"><h5 class='redColor'>Totally to pay: $${totalPriceOfNovels(novels)}</h5></div>`;
    cartBlock.innerHTML=writingNovels;
    $(".addMore").click(addANovel);
    $(".removeMore").click(removeANovel);
    $(".removeAll").click(removeAllSameNovels);
  }
  function quantityOfANovel(novelId){
    emptyCart();
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var quantity = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
    return quantity[0].quantity;
}
function totalPriceOfNovels(novels){
  var totalPrice = 0;
  novels.forEach(novel=>{
    totalPrice+=novel.price*quantityOfANovel(novel.id);
  })
  return totalPrice.toFixed(2);
}
function addANovel(e){
  e.preventDefault();
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  novel[0].quantity++;
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  refreshQuantity(novelId);
  checkQuantity(novelId);
  readingNovelsFromCart(allNovels);
  numberOfNovelsInCart();
}
function removeANovel(e){
  e.preventDefault();
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  novel[0].quantity--;
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  refreshQuantity(novelId);
  checkQuantity(novelId);
  readingNovelsFromCart(allNovels);
  emptyCart();
  numberOfNovelsInCart();
}
function removeAllSameNovels(e){
  e.preventDefault();
  var index;
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  for(var i in novelsInCartLocalStorage){
    if(novelsInCartLocalStorage[i].id==novelId){
      index = i;
    }
  }
  novelsInCartLocalStorage.splice(index,1);
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  emptyCart();
  readingNovelsFromCart(allNovels);
 
  numberOfNovelsInCart();
}
function readingAllNovels(novels){
  allNovels= novels;
}
function checkQuantity(novelId){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  var quantity = novel[0].quantity;
  var indexOfNovel = 0;
  if(quantity == 0){
    for (var i in novelsInCartLocalStorage){
      if(novelsInCartLocalStorage[i].id==novelId){
        indexOfNovel = i;
      }
    }
    novelsInCartLocalStorage.splice(indexOfNovel,1);
    localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    emptyCart();
  }
 
  numberOfNovelsInCart();
}
function refreshQuantity(novelId){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  document.getElementById(`quantityOf${novelId}`).innerHTML=novel[0].quantity;
  emptyCart();
  numberOfNovelsInCart();
}
function emptyCart(){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  if(novelsInCartLocalStorage==null || novelsInCartLocalStorage.length==0){
    localStorage.removeItem("novelsToBuy");
  }
}
$("#cartBlock").on("mouseover", ".descriptiveImage", function () {
  $(this).addClass("descriptiveImageBoxShadow");
});
$("#cartBlock").on("mouseleave", ".descriptiveImage", function () {
  $(this).removeClass("descriptiveImageBoxShadow");
});
}
if (window.location =="http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/registration.php") {
  $(document).on('click','#register',function(){
    var firstNameVar = $("#firstName").val();
    var lastNameVar = $("#lastName").val();
    var userName = $("#userName").val();
    var emailAddressVar = $("#mailAddress").val();
    var password = $("#password").val();
    var confPassword = $("#confPass").val();
    var homeAddress = $("#homeAddress").val();
    var button = $("#register").val();
    var numberOfErrors = 0;
    var nameModel = /^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/;
    var emailAddressModel = /^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;
    var credentialModel = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/;
    if (firstNameVar != "") {
      if (nameModel.test(firstNameVar)) {
        $("#firstMessage").html("You filled this field properly!");
        $("#firstMessage").removeClass("redColor");
        $("#firstMessage").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#firstMessage").html(
          "You did not fill this field properly. Example: Al McKay"
        );
        $("#firstMessage").removeClass("greenColor");
        $("#firstMessage").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#firstMessage").html("This field must not be left blank!");
      $("#firstMessage").removeClass("greenColor");
      $("#firstMessage").addClass("redColor");
    }
    if (lastNameVar != "") {
      if (nameModel.test(lastNameVar)) {
        $("#lastMessage").html("You filled this field properly!");
        $("#lastMessage").removeClass("redColor");
        $("#lastMessage").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#lastMessage").html(
          "You did not fill this field properly. Example: O'Bryant Junior"
        );
        $("#lastMessage").removeClass("greenColor");
        $("#lastMessage").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#lastMessage").html("This field must not be left blank!");
      $("#lastMessage").removeClass("greenColor");
      $("#lastMessage").addClass("redColor");
    }
    if (emailAddressVar != "") {
      if (emailAddressModel.test(emailAddressVar)) {
        $("#emailAddressNote").html("You filled this field properly!");
        $("#emailAddressNote").removeClass("redColor");
        $("#emailAddressNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#emailAddressNote").html(
          "You did not fill this field properly. Example: 1james.caa1n@3mail.co.us"
        );
        $("#emailAddressNote").removeClass("greenColor");
        $("#emailAddressNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#emailAddressNote").html("This field must not be left blank!");
      $("#emailAddressNote").removeClass("greenColor");
      $("#emailAddressNote").addClass("redColor");
    }
    if (password != "") {
      if (credentialModel.test(password)) {
        $("#passwordMessage").html("You filled this field properly!");
        $("#passwordMessage").removeClass("redColor");
        $("#passwordMessage").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#passwordMessage").html(
          "You did not fill this field properly. Example: rickleS26"
        );
        $("#passwordMessage").removeClass("greenColor");
        $("#passwordMessage").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#passwordMessage").html("This field must not be left blank!");
      $("#passwordMessage").removeClass("greenColor");
      $("#passwordMessage").addClass("redColor");
    }
    if (confPassword==password){
        $("#confPassMessage").html("Passwords match!");
        $("#confPassMessage").removeClass("redColor");
        $("#confPassMessage").addClass("greenColor");
    }
    else {
      numberOfErrors++
      $("#confPassMessage").html("Passwords do not match!");
        $("#confPassMessage").removeClass("redColor");
        $("#confPassMessage").addClass("greenColor");
    }
    if (userName != "") {
      if (credentialModel.test(userName)) {
        $("#userNameMessage").html("You filled this field properly!");
        $("#userNameMessage").removeClass("redColor");
        $("#userNameMessage").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#userNameMessage").html(
          "You did not fill this field properly. Example: s15iNatra"
        );
        $("#userNameMessage").removeClass("greenColor");
        $("#userNameMessage").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#userNameMessage").html("This field must not be left blank!");
      $("#userNameMessage").removeClass("greenColor");
      $("#userNameMessage").addClass("redColor");
    }
    if(homeAddress!=""){
      $("#homeMessage").html("You filled this field properly!");
        $("#homeMessage").removeClass("redColor");
        $("#homeMessage").addClass("greenColor");
    }
    else {
      numberOfErrors++;
      $("#homeMessage").html("This field must not be left blank!");
      $("#homeMessage").removeClass("greenColor");
      $("#homeMessage").addClass("redColor");
    }
    if (numberOfErrors == 0) 
    {
      $.ajax({
        url: "models/registration.php",
        method: "post",
        dataType: "json",
        data: {
          firstNameProperty: firstNameVar,
          lastNameProperty: lastNameVar,
          emailAddressProperty: emailAddressVar,
          userNameProperty: userName,
          passwordProperty: password,
          confPasswordProperty : confPassword,
          homeAddressProperty: homeAddress,
          buttonProperty: button
        },
        success:function(result){
          if(!Array.isArray(result.message)){
          alert(result.message);
          }
          else {
            for(var i=0;i<result.message.length;i++){
              alert(result.message[i]);
            }
          }
          if(result.message=="Succesfull registration"){
            window.location.href="index.php";
          }
        },
        error : function(xhr){
          console.error(xhr);
        }
      });
    }
  });
  }
  var userLoggingIn = {user:"true"};
  if (window.location =="http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/loggingIn.php") {
  $(document).on('click','#logIn',function(){
    var userName = $("#user").val();
    var pass = $("#pass").val();
    $.ajax({
      url : "models/loggingIn.php",
      method: "post",
      data : {
        userNameProperty : userName,
        passProperty : pass
      },
      dataType: "json",
      success : function(response){
        alert(response.message);

        if(pass=="InitialPassword1"){
          var newPass = prompt('Now you have to change initial password with which you have logged in. Enter a new password in the field bellow:');
          $.ajax({
            url : "models/changingPassword.php",
            method: "post",
            data : {
              userName : userName,
              newPass: newPass
            },
            dataType: "json",
            success : function(response){
              alert(response.message);
            },
            error : function(xhr){
              console.error(xhr);
            }
          });
        }
        if(response.message=="Succesfull logging in"){
          localStorage.setItem("userLoggingIn",JSON.stringify(userLoggingIn));

          
          window.location.href="index.php";
        }

      },
      error : function(xhr){
        console.error(xhr);
      }
    });
  });
}
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/survey.php"){
  var writingSurvey = "";
  getPhp("getSurvey",showSubgenresSurvey,"survey");
  function showSubgenresSurvey(surveyJsonData){
    for(subgenre in surveyJsonData){
      writingSurvey+=`<div class="displayFlex floatLeft"><input type="radio" class="tinyMarginTop" id="${surveyJsonData[subgenre].answer}Subgenre" name="survey" value="${surveyJsonData[subgenre].answer}"/><h5 class="redColor floatLeft tinyMarginLeft">${surveyJsonData[subgenre].answer}</h5></div>
      `;
    }
    $("#subgenresSurvey").html(writingSurvey);
  }
  $("#vote").on("click",function(){
    var checkedSubgenreSurvey = $("input[name='survey']:checked").val();
    $.ajax({
      url : "models/insertSurvey.php",
      method: "post",
      data : {
        checkedSubgenreSurvey : checkedSubgenreSurvey,
      },
      dataType: "json",
      success : function(response){
        alert(response.message);
      },
      error : function(xhr){
        console.error(xhr);
      }
    });
  });
  var clickCounter = 0;
  var writingResults = "";
  $("#results").on("click",function(){
    if(clickCounter==0){
        getPhp("getResults",showResults,"survey");
        function showResults(jsonResults){
          for(result in jsonResults){
            writingResults+=`<label for="${jsonResults[result].answer}"><h5 class="redColor">${jsonResults[result].answer}</h5></label>
            <progress id="${jsonResults[result].answer}" value="${jsonResults[result].percentage}" class="width100" max="100">${jsonResults[result].percentage}</progress><span id="span${jsonResults[result].answer}"><h6 class="redColor">${jsonResults[result].percentage} %</h6></span><br/>
            `;
          }
          $("#showResults").html(writingResults);
          $("#showResults").removeClass("displayNone");
          clickCounter=1;
        }
    }
    else {
      $("#showResults").addClass("displayNone");
      clickCounter = 0;
      writingResults="";
    }
   
  });
}
if (window.location == "http://127.0.0.1/MarkoStojanovicTheGreatestGiftPhp/crudUsers.php"){
  function showAllUsers(jsonUsers){
    var writingUsers = `<table id="userTable" class="width100"><tr><th class="tinyPadding redColor">Id</th><th class="tinyPadding redColor">First name</th><th class="tinyPadding redColor">Last name</th><th class="tinyPadding redColor">Email Address</th><th class="tinyPadding redColor">User name</th><th class="tinyPadding redColor">Home Address</th><th class="tinyPadding redColor">Role</th><th class="tinyPadding redColor">Update</th><th class="tinyPadding redColor">Delete</th></tr>`;
    for(jsonUser in jsonUsers){
      writingUsers+=`<tr><td class="tinyPadding redColor">${jsonUsers[jsonUser].id}</td><td class="tinyPadding"><input type="text" class="redColor" 
      value="${jsonUsers[jsonUser].firstName}" id="${jsonUsers[jsonUser].id}FirstName"/></td>
      <td class="tinyPadding"><input type="text" class="redColor" value="${jsonUsers[jsonUser].lastName}" id="${jsonUsers[jsonUser].id}LastName"/></td>
      <td class="tinyPadding"><input type="text" class="redColor" value="${jsonUsers[jsonUser].emailAddress}" id="${jsonUsers[jsonUser].id}EmailAddress"/></td>
      <td class="tinyPadding"><input type="text" class="redColor" value="${jsonUsers[jsonUser].userName}" id="${jsonUsers[jsonUser].id}UserName"/></td>
      <td class="tinyPadding"><input type="text" class="redColor" value="${jsonUsers[jsonUser].homeAddress}" id="${jsonUsers[jsonUser].id}HomeAddress"/></td>
      <td class="tinyPadding"><input type="text" class="redColor" value="${jsonUsers[jsonUser].role}" id="${jsonUsers[jsonUser].id}Role"/></td>
      <td class="tinyPadding redColor"><button onclick="updateUser(${jsonUsers[jsonUser].id},document.getElementById('${jsonUsers[jsonUser].id}FirstName').value,
      document.getElementById('${jsonUsers[jsonUser].id}LastName').value,document.getElementById('${jsonUsers[jsonUser].id}EmailAddress').value,
       document.getElementById('${jsonUsers[jsonUser].id}UserName').value,
       document.getElementById('${jsonUsers[jsonUser].id}HomeAddress').value,
       document.getElementById('${jsonUsers[jsonUser].id}Role').value)">Update</button></td>
       <td class="tinyPadding redColor"><button onclick="deleteUser(${jsonUsers[jsonUser].id});">Delete</button></td></tr>`;
    }
    writingUsers+=`</table>`;
    $("#users").html(writingUsers);
  }
  function deleteUser(id){
    var sure = confirm("Are you sure about deleting user with an id of "+id+"?");
    if(sure){
      deletingViaAjax("deleteUser",deletingUsers,id);
    }
  }
  function updateUser(id,firstName,lastName,emailAddress,userName,homeAddress,role){
    $.ajax({
      url : "models/updatingUsers.php",
      method: "post",
      data : {
        id : id,
        firstName : firstName,
        lastName : lastName,
        emailAddress : emailAddress,
        userName: userName,
        homeAddress : homeAddress,
        role : role
      },
      dataType: "json",
      success : function(response){
        alert(response.message);
      },
      error : function(xhr){
        console.error(xhr);
      }
    });
  }
  getPhp("getUsers",showAllUsers,"users");
  function deletingUsers(response){
  alert(response.message);
  getPhp("getUsers",showAllUsers,"users");
  }
  $("#addingAnUser").click(function(){
    $("#addingAnUser").hide();
    $.ajax({
      url : "models/getLastUserId.php",
      method: "post",
      dataType: "json",
      success : function(response){
        readUserId(response.id);
      },
      error : function(xhr){
        console.error(xhr);
      }
    });
    function readUserId(id){
      console.log(id);
      var lastUserId=parseInt(id);
      lastUserId++;
      console.log(lastUserId);
      $("#userTable").append(`<tr><td class="tinyPadding redColor"></td><td class="tinyPadding"><input type="text" class="redColor" 
      id="${lastUserId}FirstName"/></td>
     <td class="tinyPadding"><input type="text" class="redColor"  id="${lastUserId}LastName"/></td>
     <td class="tinyPadding"><input type="text" class="redColor"  id="${lastUserId}EmailAddress"/></td>
     <td class="tinyPadding"><input type="text" class="redColor" id="${lastUserId}UserName"/></td>
     <td class="tinyPadding"><input type="text" class="redColor" id="${lastUserId}HomeAddress"/></td>
     <td class="tinyPadding"><input type="text" class="redColor" id="${lastUserId}Role"/></td>
     <td class="tinyPadding redColor" colspan="2"><input type="button" value="Insert" id="insertingAnUser"></td>
      </tr>`);
      $("#insertingAnUser").on("click",function(){
        var firstName = document.getElementById(lastUserId+"FirstName").value;
        var lastName = document.getElementById(lastUserId+"LastName").value;
        var userName = document.getElementById(lastUserId+"UserName").value;
        var homeAddress = document.getElementById(lastUserId+"HomeAddress").value;
        var role = document.getElementById(lastUserId+"Role").value;
        var emailAddress = document.getElementById(lastUserId+"EmailAddress").value;
        $.ajax({
          url : "models/insertingAnUser.php",
      method: "post",
      dataType: "json",
      data: {
        firstName : firstName,
        lastName : lastName,
        userName : userName,
        homeAddress : homeAddress,
        role : role,
        emailAddress : emailAddress
      },
      success : function(response){
        alert(response.message);
        window.location.href="crudUsers.php";
      },
      error : function(xhr){
        console.error(xhr);
      }
        });
      });
    }
  });
}