<?php
    require 'session.php';
    Session::start();
    Session::clear('fishing_user');
    header('Location:login.php');
?>