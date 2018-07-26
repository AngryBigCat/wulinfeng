<?php
	// require "weixin_developer.php";
	// require 'weixin_config.php';
	// function httpGet($url) {
	// 	$curl = curl_init();
	// 	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	// 	curl_setopt($curl, CURLOPT_TIMEOUT, 500);
	// 	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	// 	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	// 	curl_setopt($curl, CURLOPT_URL, $url);

	// 	$res = curl_exec($curl);
	// 	curl_close($curl);

	// 	return $res;
	// }
	// function getAccessToken($appId,$appSecret,$pdo) {
	// 	$queryAccessTockenSql="select * from accesstoken";
	// 	$queryAccessTockenResult=$pdo->query($queryAccessTockenSql);
	// 	if($queryAccessTockenResult&&$accessTockenRow=$queryAccessTockenResult->fetch(PDO::FETCH_ASSOC)){
	// 	  if($accessTockenRow['expireTime']<time()){
	// 	    $refresh=true;
	// 	  }else{
	// 	    $refresh=false;
	// 	    $accessToken=$accessTockenRow['accessToken'];
	// 	  }
	// 	}else{
	// 	  $refresh=true;
	// 	}
	// 	if ($refresh) {
	// 	  $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appId&secret=$appSecret";
	// 	  $res = json_decode(httpGet($url));
	// 	  print_r($res);
	// 	  $accessToken = $res->access_token;
	// 	 print_r($accessTockenRow);
	// 	  if ($accessToken) {
	// 	    $expireTime = time() + 7000;
	// 		if(!$accessTockenRow){
	// 	      $createAccessTockenSql="INSERT INTO accesstoken (accessToken,expireTime) VALUES ('$accessToken','$expireTime')";
	// 	      $createAccessTockenResult=$pdo->query($createAccessTockenSql);
	// 	      echo $pdo->errorInfo();
	// 	    }else{
	// 	      $updateAccessTockenSql="UPDATE accesstoken set accessToken='$accessToken',expireTime='$expireTime'";
	// 	      $updateAccessTockenResult=$pdo->query($updateAccessTockenSql);
	// 	    }
	// 	  }
	// 	}
	// 	return $accessToken;
	// }
	// $accessToken=getAccessToken($appId,$appSecret,$weixin_pdo);
?>