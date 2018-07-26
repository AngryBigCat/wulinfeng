<?php
header("Content-type: text/html;charset=utf-8");
	include "weixin_developer.php";
	$callbackUrl=$_REQUEST['callbackUrl'];
	$url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appId.'&redirect_uri='.$callbackUrl.'&response_type=code&scope=snsapi_userinfo&state=zy#wechat_redirect';
	header("Location:".$url);
?>