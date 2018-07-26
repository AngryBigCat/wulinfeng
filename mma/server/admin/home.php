<?php
	header("Content-type: text/html;charset=utf-8");
	require 'session.php';
	Session::start();
	$user=Session::get('fishing_user');
	if (!$user||empty($user)) {
		exit('<script language="javascript">top.location.href="index.php"</script>');
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>后台管理系统</title>
	<link rel="stylesheet" type="text/css" href="css/layui.css">
	<link rel="stylesheet" type="text/css" href="css/index.css">
</head>

<body>
	<!-- 内容 -->
	<div class="beauBor">
		<blockquote class="layui-elem-quote">首页</blockquote>
	</div>

	<!-- <button class="layui-btn layui-btn-small layui-btn-danger addBtn">
		<i class="layui-icon">&#xe654; 添加</i>
	</button> -->
	<!-- <button class="layui-btn layui-btn-small layui-btn-normal downloadBtn">
		<i class="layui-icon"><a href="downloadMember.php">&#xe601; 下载用户信息</a></i>
	</button> -->

	<div class="layui-form-label"></div>

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/layui.js"></script>

	<script>
		var t=escape("ts=1511777883&ttl=1800&uid=UFCA766B9F");
		t=encodeURI(t);
		console.log(t);
	</script>
</body>
</html>
