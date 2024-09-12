<?php
    session_start();
    ob_start();
    require_once "config/connection.php";
    if(isset($_SESSION['user'])){
        unset($_SESSION['user']);
    }
    if (isset($_SESSION['admin'])){
    unset($_SESSION['admin']);
    }
    header('Location: index.php');
?>