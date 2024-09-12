<?php
    function showSortCategories(){
        global $connection;
        $query = "SELECT * FROM sortcategories";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showPurposes(){
        global $connection;
        $query = "SELECT * FROM purpose";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showSlides(){
        global $connection;
        $query = "SELECT * FROM slider";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showMenu(){
        global $connection;
        $query = "SELECT id, secondaryHrefId, secondaryLabelId, primaryHref,primaryLabel,secondaryHrefName,secondaryLabelName FROM menu m LEFT OUTER JOIN secondaryhrefs sh ON m.id=sh.menuId LEFT OUTER JOIN secondarylabels sl ON m.id=sl.menuId WHERE m.primaryHref NOT LIKE 'dashboard.php';";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function loadContactInformationList(){
        global $connection;
        $query = "SELECT p.id,p.primaryLabel,s.secondaryLabelId,s.secondaryLabelName FROM contactinformationlistprimarylabels p LEFT OUTER JOIN contactinformationlistsecondarylabels s ON p.id=s.primaryLabelId";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showMenuWithoutCart(){
        global $connection;
        $query = "SELECT id, secondaryHrefId, secondaryLabelId, primaryHref,primaryLabel,secondaryHrefName,secondaryLabelName FROM menu m LEFT OUTER JOIN secondaryhrefs sh ON m.id=sh.menuId LEFT OUTER JOIN secondarylabels sl ON m.id=sl.menuId WHERE m.primaryHref NOT LIKE 'cart.php' AND m.primaryHref NOT LIKE 'dashboard.php';";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showMenuForAdmin(){
        global $connection;
        $query = "SELECT id, secondaryHrefId, secondaryLabelId, primaryHref,primaryLabel,secondaryHrefName,secondaryLabelName FROM menu m LEFT OUTER JOIN secondaryhrefs sh ON m.id=sh.menuId LEFT OUTER JOIN secondarylabels sl ON m.id=sl.menuId";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showLinks(){
        global $connection;
        $query = "SELECT * FROM links";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showCheckboxes($parameter){
        global $connection;
        $query = "SELECT * FROM ".$parameter.";";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showAllCheckboxes($table1,$table2){
        global $connection;
        $query = "SELECT * FROM $table1 UNION SELECT * FROM $table2;";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showSubgenres($parameter){
        global $connection;
        $query = "SELECT * FROM ".$parameter.";";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showNovels($parameter){
        global $connection;
        if($parameter != "All"){
            $query = "SELECT n.id,n.title,n.author,n.subgenre,n.price,im.src,im.alt,n.numberOfPages,pi.yearOfIssue,pi.publishingHouse,n.availability,n.description,n.genre FROM novels n,imagenovels im, publishinginformationnovels pi WHERE n.publishingInformationId=pi.publishingInformationId AND n.imageId=im.imageId AND n.genre='".$parameter."';";
         $data = $connection->query($query)->fetchAll();
         return $data;
        }
        else {
            $query = "SELECT n.id,n.title,n.author,n.subgenre,n.price,im.src,im.alt,n.numberOfPages,pi.yearOfIssue,pi.publishingHouse,n.availability,n.description,n.genre FROM novels n,imagenovels im, publishinginformationnovels pi
            WHERE n.publishingInformationId=pi.publishingInformationId AND n.imageId=im.imageId;";
            $data = $connection->query($query)->fetchAll();
            return $data;
        }
    }
    function countNovels(){
        global $connection;
        $query = "SELECT COUNT(*) AS num FROM novels;";
        $data = $connection->query($query)->fetch();
        return $data;
    }
    function userExist($userName){
        global $connection;
        $query = "SELECT * FROM users WHERE userName ='".$userName."';";
        $data = $connection->query($query)->fetchColumn();
        return $data;
    }
    function insertUser($firstName,$lastName,$emailAddress,$userName,$passwordName,$homeAddress,$roleName){
        global $connection;
        $query = "INSERT INTO users VALUES(null,:firstName,:lastName,:emailAddress,:userName,:passwordName,:homeAddress,:roleName)";
        $result = $connection->prepare($query);
        $result->bindParam(':firstName',$firstName);
        $result->bindParam(':lastName',$lastName);
        $result->bindParam(':emailAddress',$emailAddress);
        $result->bindParam('userName',$userName);
        $result->bindParam(':passwordName',$passwordName);
        $result->bindParam(':homeAddress',$homeAddress);
        $result->bindParam(':roleName',$roleName);
        $response = $result->execute();

        return $response;
    }
    function insertMessage($firstName,$lastName,$emailAddress,$purpose,$message){
        global $connection;
        $query = "INSERT INTO messages VALUES(null,:firstName,:lastName,:emailAddress,:purpose,:message)";
        $result = $connection->prepare($query);
        $result->bindParam(':firstName',$firstName);
        $result->bindParam(':lastName',$lastName);
        $result->bindParam(':emailAddress',$emailAddress);
        $result->bindParam(':purpose',$purpose);
        $result->bindParam(':message',$message);
        $response = $result->execute();

        return $response;
    }
    function insertANovel($path,$title,$price,$genre,$subgenre,$yearOfIssue,$publishingHouse,$numberOfPages,$availability,$description){
        global $connection;
        $query1 = "INSERT INTO publishinginformationnovels VALUES (null,:yearOfIssue,:publishingHouse);";
        $result1 = $connection->prepare($query1);
        $result1->bindParam(':yearOfIssue',$yearOfIssue);
        $result1->bindParam(':publishingHouse',$publishingHouse);
        $result1->execute();
        $query2 = "SELECT publishingInformationId FROM publishinginformationnovels ORDER BY 	publishingInformationId DESC LIMIT 1";
        $result2 = $connection->query($query2);
        $lastPublishingId=$result2->fetch();

        $query3 = "INSERT INTO imagenovels VALUES (null,:src,:alt);";
        $result3 = $connection->prepare($query3);
        $result3->bindParam(':src',$path);
        $result3->bindParam(':alt',$path);
        $result3->execute();

        $query4 = "SELECT imageId FROM imagenovels ORDER BY imageId DESC LIMIT 1";
        $result4 = $connection->query($query4);
        $lastImageId=$result4->fetch();

        $query5 = "SELECT id FROM novels ORDER BY id DESC LIMIT 1";
        $result5 = $connection->query($query5);
        $lastNovelId=$result5->fetch();
        $lastNovelId = (int)$lastNovelId+1;
        
        $query6 = "INSERT INTO novels VALUES (:lastNovelId,:title,:author,:subgenre,:price,:lastImageId,:numberOfPages,:lastPublishingId,:availability,:description,:genre);";
        $result6 = $connection->prepare($query6);
        $result6->bindParam(':lastNovelId',$lastNovelId);
        $result6->bindParam(':title',$title);
        $result6->bindParam(':author',$author);
        $result6->bindParam(':subgenre',$subgenre);
        $result6->bindParam(':price',$price);
        $result6->bindParam(':lastImageId',$lastImageId);
        $result6->bindParam(':numberOfPages',$numberOfPages);
        $result6->bindParam(':lastPublishingId',$lastPublishingId);
        $result6->bindParam(':availability',$availability);
        $result6->bindParam(':description',$description);
        $result6->bindParam(':genre',$genre);
        $response = $result6->execute();
        return $response;
    }
    function checkLogin($user,$pass){
        global $connection;
        $query = "SELECT * FROM users WHERE userName =:user AND password=:pass;";
        $result = $connection->prepare($query);
        $result->bindParam(':user',$user);
        $result->bindParam(':pass',$pass);
        $result->execute();
        $response=$result->fetch();
        return $response;
    }
    function checkAdmin($user,$pass){
        global $connection;
        $query = "SELECT * FROM users WHERE userName =:user AND password=:pass AND role='admin';";
        $result = $connection->prepare($query);
        $result->bindParam(':user',$user);
        $result->bindParam(':pass',$pass);
        $result->execute();
        $response=$result->fetch();
        return $response;
    }
    function insertAnswer($answer){
        global $connection;
        $query = "UPDATE survey SET numberOfVotes=numberOfVotes+1 WHERE answer=:answer";
        $result = $connection->prepare($query);
        $result->bindParam(':answer',$answer);
        $response = $result->execute();
        return $response;
    }
    function showResults($parameter){
        global $connection;
        $query = "SELECT answer,ROUND((numberOfVotes/(SELECT SUM(numberOfVotes) FROM survey)*100),0) as 'percentage'
        FROM ".$parameter." GROUP BY answer";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function showAllUsers($parameter){
        global $connection;
        $query = "SELECT id,firstName,lastName,emailAddress,userName,homeAddress,role FROM ".$parameter.";";
        $data = $connection->query($query)->fetchAll();
        return $data;
    }
    function deletingUsers($id){
        global $connection;
        $query = "DELETE FROM users WHERE id = :id;";
        $result = $connection->prepare($query);
        $result->bindParam(':id',$id);
        $result->execute();
    }
    function deleteNovels($id){
        global $connection;
        $query = "DELETE FROM novels WHERE id = :id;";
        $result = $connection->prepare($query);
        $result->bindParam(':id',$id);
        $result->execute();
    }
    function updatingUser($id,$firstName,$lastName,$emailAddress, $userName,$homeAddress,$role){
        global $connection;
        $query = "UPDATE users SET firstName=:firstName,lastName=:lastName,emailAddress=:emailAddress,userName=:userName,homeAddress=:homeAddress,role=:role wHERE id=:id";
        $result = $connection->prepare($query);
        $result->bindParam(':id',$id);
        $result->bindParam(':firstName',$firstName);
        $result->bindParam(':lastName',$lastName);
        $result->bindParam(':emailAddress',$emailAddress);
        $result->bindParam(':userName',$userName);
        $result->bindParam(':homeAddress',$homeAddress);
        $result->bindParam(':role',$role);
        $result->execute();
    }
    function updatingNovels($id,$title,$author,$price,$subgenre,$yearOfIssue,$publishingHouse, $numberOfPages,$availability,$description){
        global $connection;
        $query = "UPDATE novels SET title = :title, author = :author, subgenre = :subgenre, price = :price, numberOfPages = :numberOfPages, publishingInformationId=(SELECT id FROM publishinginformationnovels WHERE yearOfIssue = :yearOfIssue AND publishingHouse = :publishingHouse), availability = :availability , description = :description WHERE id= :id ;";
        $result = $connection->prepare($query);
        $result->bindParam(':id',$id);
        $result->bindParam(':title',$title);
        $result->bindParam(':author',$author);
        $result->bindParam(':subgenre',$subgenre);
        $result->bindParam(':price',$price);
        $result->bindParam(':numberOfPages',$numberOfPages);
        $result->bindParam(':yearOfIssue',$yearOfIssue);
        $result->bindParam(':publishingHouse',$publishingHouse);
        $result->bindParam(':availability',$availability);
        $result->bindParam(':description',$description);
        $response = $result->execute();
        return $response;
    }
    function getLastUserId(){
        global $connection;
        $query = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
        $result = $connection->query($query);
        $response=$result->fetch();
        return $response;
    }
    function getLastImageId(){
        global $connection;
        $query = "SELECT imageId FROM imageNovels ORDER BY imageId DESC LIMIT 1";
        $result = $connection->query($query);
        $response=$result->fetch();
        return $response;
    }
    function getLastPublishingInformationId(){
        global $connection;
        $query = "SELECT publishingInformationId FROM publishinginformationnovels ORDER BY publishingInformationId DESC LIMIT 1";
        $result = $connection->query($query);
        $response=$result->fetch();
        return $response;
    }
    function changingPassword($userName,$newPass){
        global $connection;
        $query = "UPDATE users SET password=:newPass WHERE username=:userName";
        $result = $connection->prepare($query);
        $result->bindParam(':userName',$userName);
        $result->bindParam(':newPass',$newPass);
        $result->execute();
    }
?>