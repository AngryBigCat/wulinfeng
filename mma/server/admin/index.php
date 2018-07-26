<?php
	header("Content-type: text/html;charset=utf-8");
	require 'session.php';
	Session::start();
	$user=Session::get('fishing_user');
	if (!$user||empty($user)) {
		header('Location:login.php');
		exit;
	}
	$time=time();
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
	<div class="layui-layout-admin">
		<!-- 水平导航 -->
		<div class="layui-header">
			<div class="layui-logo">微信活动后台管理系统</div>
			<ul id="topBar" class="layui-nav layui-layout-left">
				<!-- <li class="layui-nav-item">
					<a href="javascript:;" data-href="http://new.cnzz.com/v1/login.php?siteid=1263921539">第三方统计 [ 密码: claws4 ]</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;">其他<span class="layui-nav-more"></span></a>
					<dl class="layui-nav-child">
						<dd><a>其他1</a></dd>
						<dd><a>其他2</a></dd>
						<dd><a>其他3</a></dd>
					</dl>
				</li> -->
			</ul>

			<ul class="layui-nav layui-layout-right">
				<li class="layui-nav-item">
					<a href="login_out.php">
					&nbsp;&nbsp;退出&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>

		<!-- 侧边栏 -->
		<div class="layui-side layui-bg-black">
			<div class="layui-side-scroll">
				<ul id="sideBar" class="layui-nav layui-nav-tree">
					<li class="layui-nav-item">
						<a data-href="home.php" href="javascript:;"><i class="layui-icon">&#xe68e;<span>首页</span></i></a>
					</li>

					<li class="layui-nav-item layui-this">
						<a data-href="admin.php" href="javascript:;"><i class="layui-icon">&#xe614;<span>管理员</span></i></a>
					</li>
					<li class="layui-nav-item">
						<a data-href="member.php" href="javascript:;"><i class="layui-icon">&#xe612;<span>用户信息</span></i></a>
					</li>
					<li class="layui-nav-item">
						<a data-href="matchs.php" href="javascript:;"><i class="layui-icon">&#xe612;<span>赛程信息</span></i></a>
					</li>
					<li class="layui-nav-item">
						<a data-href="fwtj.php" href="javascript:;"><i class="layui-icon">&#xe612;<span>访问统计</span></i></a>
					</li>
					<!-- <li class="layui-nav-item">
						<a data-href="prize.php" href="javascript:;"><i class="layui-icon">&#xe658;<span>奖品信息</span></i></a>
					</li> -->
					<!-- <li class="layui-nav-item">
						<a data-href="excel_inport.php" href="javascript:;"><i class="layui-icon">&#xe67c;<span>上传EXCEL</span></i></a>
					</li> -->
					<!-- <li class="layui-nav-item">
						<a data-href="">xx</a>
						<dl class="layui-nav-child">
							<dd><a href="javascript:;" data-href="">信息1</a></dd>
							<dd><a href="javascript:;" data-href="">信息2</a></dd>
							<dd><a href="javascript:;" data-href="">信息3</a></dd>
						</dl>
					</li> -->
					<!-- <li class="layui-nav-item">
						<a data-href="http://new.cnzz.com/v1/login.php?siteid=1263921539" onClick="copy()" href="javascript:;">
							<i class="layui-icon">&#xe62c;<span>第三方统计 claws4<textarea id="stati">claws4</textarea></span></i>
						</a>
					</li> -->
				</ul>

				<div class="layui-side-collapse">
					<i class="layui-icon">&#xe65a;</i>
				</div>
			</div>
		</div>

		<!-- 内容 -->
		<div id="contentBor" class="layui-body">
			<iframe id="content" src="admin.php"></iframe>
		</div>

		<!-- 页脚 -->
		<div class="layui-footer">
			h5互动
		</div>
	</div>

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/layui.js"></script>
	<script>
		var copy;
		layui.use(['element','layer'],function(){
			var layer=layui.layer;

			// 复制
			copy=function (){
				var e=document.getElementById("stati"); //对象是stati
				e.select(); //选择对象
				tag=document.execCommand("Copy"); //执行浏览器复制命令
				if(tag){
					layer.alert('密码复制成功');
				}
			}
		});

		$('#sideBar li a, #topBar li a').on('click',function(){
			$('.layui-this').each(function(){
				$(this).removeClass('layui-this');
			});
			var s=$(this).attr('data-href');
			$('#content').attr('src',s);
		});

		// 侧边栏收缩
		$('.layui-side-collapse').on('click',function(){
			if($('.layui-side').hasClass('mini') ){
				sideToggle(2);
			}else{
				sideToggle(1);
			}
		});
		function sideToggle(n){
			if(n==1){ // 缩小
				$('.layui-side-collapse i').html('&#xe65b;')
				$('.layui-side').addClass('mini');
				$('.layui-body, .layui-footer').addClass('big');
			}else if(n==2){
				$('.layui-side-collapse i').html('&#xe65a;')
				$('.layui-side').removeClass('mini');
				$('.layui-body, .layui-footer').removeClass('big');
			}
		}
		if($(window).width()<=414){
			setTimeout(function(){
				sideToggle(1);
			},200);
		}
	</script>
</body>
</html>
