<?php
    require 'session.php';
	Session::start();
	$user=Session::get('fishing_user');
    if ($user&&!empty($user)) {
        header('Location:index.php');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>微信活动后台管理系统</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<link rel="stylesheet" type="text/css" href="css/layui.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<style>
			input:-webkit-autofill {
			    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
			}
		</style>

		<script src="js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript">
			var browser=navigator.appName;
			var b_version=navigator.appVersion;
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
				ieShow();
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){
				ieShow();
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
				ieShow();
			}

			function ieShow(){
				var t='<div id="warnPop">'+
					  '	<img class="w-icon" src="images/icon_oops.png">'+
					  '	<p class="warning">您正在使用的浏览器版本过低，将不能正常浏览</p>'+
					  '	<div class="browser">'+
					  '		<a href="http://se.360.cn"><img src="images/icon_360.png" alt="chrome"><br> 使用 360浏览器</a>'+
					  '		<a href="http://browser.qq.com"><img src="images/icon_qq.png"><br> 使用 QQ浏览器</a>'+
					  '		<a href="http://www.google.com/chrome"><img src="images/icon_chrome.png"><br> 使用 Google Chrome 浏览器</a>'+
					  '	</div>'+
					  '</div>';
					document.write(t);
			}
		</script>
	</head>
	<body>
		<div id="large-header" class="large-header">
			<!-- <canvas id="demo-canvas"></canvas> -->
			<div class="login layui-anim layui-anim-scale">
				<h1>后台管理系统</h1>
				<div class="layui-form-item">
					<input class="layui-input" name="username" placeholder="用户名" type="text">
				</div>
				<div class="layui-form-item">
					<input class="layui-input" name="password" placeholder="密码" type="password">
				</div>

				<div id="slider">
					<div id="slider_bg" style="width: 0px;"></div>
					<span id="label" style="left: 0px;">&gt;&gt;</span>
					<span id="labelTip">拖动滑块验证</span>
				</div>


				<button class="layui-btn login_btn" lay-filter="login">登录</button>
			</div>
		</div>

		<!-- <script src="js/rAF.js"></script> -->
		<script src="js/jquery.slideunlock.js"></script>
		<script src="js/layui.js"></script>
		<!-- <script src="js/login.js"></script> -->  <!-- canvas -->
		<script>
			$(function(){
				var layer;
				var verif_ok=false;

				layui.use('layer', function(){
					layer=layui.layer;
				});

				var slider=new SliderUnlock("#slider",{
					successLabelTip : "验证成功"
				},function(){
					console.log("验证成功");
					verif_ok=true;
				});
				slider.init();

				$('.login_btn').on('click',function(){
					var ift=true;
					$('input[name="username"],input[name="password"]').each(function(){
						if(!$(this).val() || $(this).val()==''){
							layer.alert('请输入'+$(this).attr('placeholder'));
							ift=false;
							return false;
						}
					});

					if(ift && !verif_ok){
						ift=false;
						layer.alert('请拖动滑块验证');
					}

					if(ift){
						$.ajax({
							type: 'POST',
							url: 'login_in.php',
							data:{
								'username': $('input[name="username"]').val(),
								'password': $('input[name="password"]').val(),
							},
							dataType:'json',
							cache:false,
							success: function(data) {
								if(data.success){
									window.location.href='index.php';
								}else{
									console.log(data);
									layer.alert(data.errorDatas[0].msg);
									for(var i=0;i<data.errorDatas.length;i++){
										$('input[name="'+data.errorDatas[i].labelName+'"]').closest('.form-group').addClass('has-warning');
									}
								}
							},
							error:function(XMLHttpRequest, textStatus, errorThrown){
								alert(errorThrown);
							}
						});
					}
				});
			});
		</script>
</body>
</html>
