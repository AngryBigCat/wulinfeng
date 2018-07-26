<?php
	require "weixin_developer.php";
	require 'weixin_config.php';
	class JSSDK {
	  private $appId;
	  private $appSecret;
	  private $accessToken;
	  private $jsApiTicket;

	  public function __construct($appId,$appSecret,$accessToken,$jsApiTicket) {
	    $this->appId = $appId;
	    $this->appSecret = $appSecret;
	    $this->accessToken = $accessToken;
	    $this->jsApiTicket = $jsApiTicket;
	  }

	  public function getSignPackage($url) {
	    $jsapiTicket = $this->jsApiTicket;

	    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
	    $timestamp = time();
	    $nonceStr = $this->createNonceStr();

	    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

	    $signature = sha1($string);

	    $signPackage = array(
	      "appId"     => $this->appId,
	    "nonceStr"  => $nonceStr,
	      "timestamp" => $timestamp,
	      "url"       => $url,
	      "signature" => $signature,
	      "rawString" => $string
	    );
	    return $signPackage; 
	  }

	  public function createNonceStr($length = 16) {
	    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    $str = "";
	    for ($i = 0; $i < $length; $i++) {
	      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
	    }
	    return $str;
	  }
	}
	function httpGet($url) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 500);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($curl, CURLOPT_URL, $url);

		$res = curl_exec($curl);
		curl_close($curl);

		return $res;
	}
	function getJsApiTicket($accessToken,$pdo) {
	    $queryTicketSql="select * from ticket";
	    $queryTicketResult=$pdo->query($queryTicketSql);
		if($queryTicketResult&&$ticketRow=$queryTicketResult->fetch(PDO::FETCH_ASSOC)){
	      if($ticketRow['expireTime']<time()){
	        $refresh=true;
	      }else{
	        $refresh=false;
	        $ticket=$ticketRow['ticket'];
	      }
	    }else{
	      $refresh=true;
	    }
	    if ($refresh) {
	      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
		  $res = json_decode(httpGet($url));
	      $ticket = $res->ticket;
	      if ($ticket) {
	        $expireTime = time() + 7000;
			if(!$ticketRow){
	          $createTicketSql="INSERT INTO ticket (ticket,expireTime) VALUES ('$ticket','$expireTime')";
	          $createTicketResult=$pdo->query($createTicketSql);
	        }else{
	          $updateTicketSql="UPDATE ticket set ticket='$ticket',expireTime='$expireTime'";
	          $updateTicketResult=$pdo->query($updateTicketSql);
	        }
	      }
	    }
	    return $ticket;
	}

	function getAccessToken($appId,$appSecret,$pdo) {
		$queryAccessTockenSql="select * from accesstoken";
		$queryAccessTockenResult=$pdo->query($queryAccessTockenSql);
		if($queryAccessTockenResult&&$accessTockenRow=$queryAccessTockenResult->fetch(PDO::FETCH_ASSOC)){
		  if($accessTockenRow['expireTime']<time()){
		    $refresh=true;
		  }else{
		    $refresh=false;
		    $accessToken=$accessTockenRow['accessToken'];
		  }
		}else{
		  $refresh=true;
		}
		if ($refresh) {
		  $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appId&secret=$appSecret";
		  $res = json_decode(httpGet($url));
		  $accessToken = $res->access_token;
		  if ($accessToken) {
		    $expireTime = time() + 7000;
			if(!$accessTockenRow){
		      $createAccessTockenSql="INSERT INTO accesstoken (accessToken,expireTime) VALUES ('$accessToken','$expireTime')";
		      $createAccessTockenResult=$pdo->query($createAccessTockenSql);
		    }else{
		      $updateAccessTockenSql="UPDATE accesstoken set accessToken='$accessToken',expireTime='$expireTime'";
		      $updateAccessTockenResult=$pdo->query($updateAccessTockenSql);
		    }
		  }
		}
		return $accessToken;
	}
	$accessToken=getAccessToken($appId,$appSecret,$weixin_pdo);
	$jsApiTicket=getJsApiTicket($accessToken,$weixin_pdo);
	$jssdk = new JSSDK($appId, $appSecret,$accessToken,$jsApiTicket);
	$shareUrl=urldecode($_REQUEST['shareUrl']);
	$signPackage = $jssdk->GetSignPackage($shareUrl);
?>
