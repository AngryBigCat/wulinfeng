<?php
header("Content-type: text/html;charset=utf-8");
    $weixin_db_host='localhost';
    $weixin_db_database='wlf_prh5_com';
    $weixin_db_username='wlf_prh5_com';
    $weixin_db_password='M57Fadk6iZ';

   $weixin_dsn="mysql:dbname=$weixin_db_database;host=$weixin_db_host";
    try{
        $weixin_pdo=new PDO($weixin_dsn,$weixin_db_username,$weixin_db_password,array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
        ));
    }catch(PDOException $e){
        echo '数据库连接失败'.$e->getMessage();
    }
?>
