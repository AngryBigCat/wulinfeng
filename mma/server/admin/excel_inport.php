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
	<meta name="viewport" content="width=device-width, initial-scale=2.0" />
	<title>后台管理系统</title>
	<link rel="stylesheet" type="text/css" href="css/layui.css">
	<link rel="stylesheet" type="text/css" href="css/index.css">
</head>

<body>
	<div class="beauBor">
		<blockquote class="layui-elem-quote">上传excel</blockquote>
	</div>

	<input id="input_file" class="beauBor" type="file" name="inputExcel" accept="application/vnd.ms-excel">
	<br><br>
	<button class="layui-btn layui-btn-small layui-btn-danger uploadBtn btn-success">
		<i class="layui-icon">&#xe62f; 上传</i>
	</button>

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/ajaxfileupload.js" type="text/javascript"></script>
	<script src="js/layui.js"></script>
	<script>
		layui.use(['element','layer'],function(){
			var element=layui.element;

			$('.uploadBtn').on('click',function(){
				if($(this).hasClass('btn-success')){
					$(this).removeClass('btn-success');
					var lay_load=layer.load(2);

					$.ajaxFileUpload({
						url: 'upload_pd.php', //用于文件上传的服务器端请求地址
						secureuri: false, //是否需要安全协议，一般设置为false
						fileElementId: 'input_file', //文件上传域的ID
						dataType: 'json', //返回值类型 一般设置为json
						success: function (data){
							layer.close(lay_load);
							console.log(data);
							if(data.success){
								layer.msg(data.msg,{
									icon: 1,
									time: 800
								});
							}else{
								layer.msg(data.msg,{
									icon: 2,
									time: 800
								});
							}
						},
						error: function (data, status, e){
							layer.close(lay_load);
							alert(e);
						}
					});
				}
			});
		});
	</script>
</body>
</html>
