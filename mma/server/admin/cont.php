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
	<div class="layui-padd15">
		<blockquote class="layui-elem-quote" >用户信息：<strong style="color: #009688;"><?php echo $nickName;?>——<?php echo $getOpid;?></strong></blockquote>
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
		var ty='cont';

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
				url: 'server.php?oper='+ty+'&openId='+'<?php echo $getOpid;?>',
				page: true,
				limit: 100,
				limits: [100,500,1000],
				// layout: ['count','prev','page','next','limit'],
				cols: [[
					{checkbox: true},
					{field: 'id',			title: 'ID',		align: 'center', editable: false,  edittype: 'text', width: 90,   sort: true},
					{field: 'score',	    title: '得分',	    align: 'center', editable: false,  edittype: 'text',  width: 140, sort: true},
					{field: 'cs1',			title: 'Round-1',	align: 'center', editable: false,  edittype: 'text',  width: 120},
					{field: 'cs2',	    	title: 'Round-2',	align: 'center', editable: false,  edittype: 'text',  width: 120},
					{field: 'cs3',	    	title: 'Round-3',	align: 'center', editable: false,  edittype: 'text',  width: 120},
					{field: 'cs4',	    	title: 'Round-4',	align: 'center', editable: false,  edittype: 'text',  width: 120},
					{field: 'thiscode',	    title: '游戏代码',	align: 'center', editable: false,  edittype: 'text',  width: 100},
					{field: 'remarks',	    title: '作弊信息',	align: 'center', editable: false,  edittype: 'text',  width: 100},
					{field: 'startTime',	title: '开始时间',	align: 'center', editable: false,  edittype: 'text',  width: 145},
					{field: 'endTime',	    title: '结束时间 ',	align: 'center', editable: true,  edittype: 'text',  width: 145},
					{field: 'useTime',	    title: '用时(s) ',	align: 'center', editable: true,  edittype: 'text',  width: 120},
					{field: 'clientInfo',	title: '设备信息',	align: 'center', editable: true,  edittype: 'text',  width: 140},
					{field: 'ip',	    	title: 'IP地址',	align: 'center', editable: true,  edittype: 'text',  width: 140},
					// {title: '操作', width: 180, align: 'center', toolbar: '#toolbar'}
				]]
			});
			$.getScript("js/lay_custom.js");
		});
	</script>

	<!-- 工具条 -->
	<script type="text/html" id="toolbar">
		<a class="layui-btn layui-btn-small" lay-event="edit">编辑</a>
		<a class="layui-btn layui-btn-danger layui-btn-small" lay-event="del">删除</a>
	</script>

	<!-- 图片模板 -->
	<script type="text/html" id="viewImg">
		<img src={{d.img}} style="max-height: 80px;">
	</script>

	<!-- 编辑弹出层 -->
	<div id="edit_pop" class="edit_pop"></div>
</body>
</html>
