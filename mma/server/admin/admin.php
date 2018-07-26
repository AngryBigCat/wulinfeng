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
		<blockquote class="layui-elem-quote">管理员</blockquote>
	</div>

	<!-- <button class="layui-btn layui-btn-small layui-btn-danger addBtn">
		<i class="layui-icon">&#xe654; 添加</i>
	</button> -->
	<!-- <button class="layui-btn layui-btn-small layui-btn-normal downloadBtn">
		<i class="layui-icon"><a href="downloadMember.php">&#xe601; 下载用户信息</a></i>
	</button> -->

	<!-- 选项卡 -->
	<div class="layui-tab layui-tab-brief" lay-filter="tabBrief">
		<ul class="layui-tab-title">
			<li class="layui-this">设置</li>
			<!-- <li>选项2</li> -->
		</ul>
		<!-- <div class="layui-tab-content">
			<div class="layui-tab-item layui-show">
				<button class="layui-btn layui-btn-small layui-btn-danger addBtn">
					<i class="layui-icon">&#xe654; 添加1</i>
				</button>
			</div>
			<div class="layui-tab-item">
				<button class="layui-btn layui-btn-small layui-btn-danger addBtn">
					<i class="layui-icon">&#xe654; 添加2</i>
				</button>
			</div>
		</div> -->
	</div>

	<table id="dataTable" class="table_container" lay-filter="tool" data-ty="admin"></table>

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/layui.js"></script>
	<script>
		///////////////////////////////////
		// 修改：ty(表)	cols(表头)
		//
		// edittype支持：text/img/textarea
		///////////////////////////////////

		var eId, tableIns, tableIns2, element, layer, table, form, upload;
		var ty='admin';

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
				url: 'server.php?oper=admin',
				page: true,
				limit: 100,
				limits: [100,500,1000],
				// layout: ['count','prev','page','next','limit'],
				cols: [[
					{checkbox: true},
					{field: 'id',			title: 'ID',			align: 'center', editable: false, edittype: 'text', width: 100, sort: true},
					{field: 'startTime',	title: '活动开始时间',	align: 'center', editable: true,  edittype: 'text', width: 300},
					{field: 'endTime',		title: '活动结束时间',	align: 'center', editable: true,  edittype: 'text', width: 300},
					{title: '操作', width: 180, align: 'center', toolbar: '#toolbar'}
				]]
			});
			$.getScript("js/lay_custom.js");


			// 监听选项卡切换
			var tBIndex;
			element.on('tab(tabBrief)',function(data){
				// console.log(this);			//当前Tab标题所在的原始DOM元素
				// console.log(data.elem);		//得到当前的Tab大容器
				console.log(data.index);	//得到当前Tab的所在下标

				if(tBIndex==data.index){
					return false;
				}
				else if(data.index==0){
					ty='admin';
					tableIns=table.render({
						elem: '#dataTable', // 指定原始表格元素选择器（推荐id选择器）
						url: 'server.php?oper=admin',
						page: true,
						limit: 100,
						limits: [100,500,1000],
						// layout: ['count','prev','page','next','limit'],
						cols: [[
							{checkbox: true},
							{field: 'id',			title: 'ID',			align: 'center', editable: false, edittype: 'text', width: 100, sort: true},
							{field: 'startTime',	title: '活动开始时间',	align: 'center', editable: true,  edittype: 'text', width: 300},
							{field: 'endTime',		title: '活动结束时间',	align: 'center', editable: true,  edittype: 'text', width: 300},
							{title: '操作', width: 180, align: 'center', toolbar: '#toolbar'}
						]]
					});
				}
				else if(data.index==1){
					ty='prize_chance';
					tableIns=table.render({
						elem: '#dataTable', // 指定原始表格元素选择器（推荐id选择器）
						url: 'server.php?oper=prize_chance',
						page: true,
						limit: 100,
						limits: [100,500,1000],
						// layout: ['count','prev','page','next','limit'],
						cols: [[
							{checkbox: true},
							{field: 'id',			title: 'ID',		align: 'center', editable: false, edittype: 'text', width: 100, sort: true},
							{field: 'prize_index',	title: '几等奖',	align: 'center', editable: true,  edittype: 'text', width: 100},
							{field: 'img',			title: '图片',		align: 'center', editable: true,  edittype: 'img',  width: 330, templet: '#viewImg'},
							{field: 'prize_name',	title: '奖品名',	align: 'center', editable: true,  edittype: 'text', width: 100},
							{field: 'prize_describe',	title: '奖品描述',	align: 'center', editable: true,  edittype: 'textarea', width: 240},
							{field: 'chance',		title: '中奖几率',	align: 'center', editable: true,  edittype: 'text', width: 100},
							{title: '操作', width: 180, align: 'center', toolbar: '#toolbar'}
						]]
					});
				}
				tBIndex=data.index;
			});
		});
	</script>

	<!-- 工具条 -->
	<script type="text/html" id="toolbar">
		<a class="layui-btn layui-btn-small" lay-event="edit">编辑</a>
		<!-- <a class="layui-btn layui-btn-danger layui-btn-small" lay-event="del">删除</a> -->
	</script>

	<!-- 图片模板 -->
	<script type="text/html" id="viewImg">
		<img src={{d.img}} style="max-height: 80px;">
	</script>

	<!-- 编辑弹出层 -->
	<div id="edit_pop" class="edit_pop"></div>
</body>
</html>
