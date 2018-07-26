<?php
	header("Content-type: text/html;charset=utf-8");
	require 'session.php';
	Session::start();
	$user=Session::get('fishing_user');
	if (!$user||empty($user)) {
		exit('<script language="javascript">top.location.href="index.php"</script>');
	}

	$nickName=$_GET['nickName'];
	$getOpid=$_GET['id'];
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
	<link rel="stylesheet" type="text/css" href="css/index.css?<?php echo $time;?>">
</head>
<body>
	<!-- 内容 -->
	<div class="beauBor">
		<blockquote class="layui-elem-quote">赛程信息：</blockquote>
	</div>

	<!-- <button class="layui-btn layui-btn-small layui-btn-danger addBtn">
		<i class="layui-icon">&#xe654; 添加</i>
	</button>  -->
	<!-- <button class="layui-btn layui-btn-small layui-btn-normal downloadBtn">
		<i class="layui-icon"><a href="downloadMember.php">&#xe601; 下载该用户信息</a></i>
	</button> -->

	<table id="dataTable" lay-filter="tool"></table>

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/layui.js"></script>
	<script>

		///////////////////////////////////
		// 修改：ty(表)	cols(表头)
		//
		// edittype支持：text/img/textarea
		///////////////////////////////////

		var eId, tableIns, element, layer, table, form, upload;
		var ty='matchs';

		layui.use(['element','layer','table','form','upload'],function(){
			element=layui.element;
			layer=layui.layer;
			table=layui.table;
			form=layui.form;
			upload=layui.upload;

			///////////////////////////
			// 渲染表格
			// editable:true 可编辑
			// templet 		 自定义模板
			///////////////////////////
			tableIns=table.render({
				elem: '#dataTable',	// 指定原始表格元素选择器（推荐id选择器）
				url: 'server.php?oper='+ty+'&id='+'<?php echo $getOpid;?>',
				page: true,
				limit: 100,
				limits: [100,500,1000],
				// layout: ['count','prev','page','next','limit'],
				cols: [[
					{checkbox: true},
					{field: 'id',		 title: 'ID',				align: 'center', editable: false,  edittype: 'text',  width: 90},
					{field: 'matchName', title: '赛事名称',			align: 'center', editable: false,  edittype: 'text',  width: 200},
					{field: 'imgUrl',	 title: '赛事详情（图片：宽度482px）',	align: 'center', editable: true,   edittype: 'img',  width: 300, templet:'#viewImg'},
					{title: '编辑', width: 180, align: 'center', toolbar: '#toolbar'}
				]]
			});
			$.getScript("js/lay_custom.js");
		});
	</script>

	<!-- 工具条 -->
	<script type="text/html" id="toolbar">
		<a class="layui-btn layui-btn-small" lay-event="edit">编辑</a>
		<!-- <a class="layui-btn layui-btn-danger layui-btn-small" lay-event="del">删除</a> -->
	</script>

	<!-- 图片模板 -->
	<script type="text/html" id="viewImg">
		<img src={{d.imgUrl}} style="max-height: 300px;">
	</script>

	<!-- 编辑弹出层 -->
	<div id="edit_pop" class="edit_pop"></div>
</body>
</html>
