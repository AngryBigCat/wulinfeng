<?php
	header("content-type:text/html;charset=utf-8");
	$db_host='localhost';
	$db_database='mma';
	$db_username='root';
	$db_password='777';
	// $db_database='cebi_prh5_com';
	// $db_username='cebi_prh5_com';
	// $db_password='nwBpf8GiFj';

	$dsn="mysql:dbname=$db_database;host=$db_host";
	try{
		$pdo=new PDO($dsn,$db_username,$db_password,array(
			PDO::ATTR_PERSISTENT => true,
			PDO::ATTR_EMULATE_PREPARES => false,
			PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
		));
	}catch(PDOException $e){
		echo '数据库连接失败'.$e->getMessage();
	}
?>