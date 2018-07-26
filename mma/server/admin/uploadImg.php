<?php
	header("Content-type: text/html;charset=utf-8");
	$filePath = 'upload/images/';
	$filename = $_FILES['inputImg']['name'];
	$tmp_name = $_FILES['inputImg']['tmp_name'];

	$returnJson = array();
	function encode_json($str) {
		return urldecode(json_encode(url_encode($str)));
	}
	function url_encode($str) {
		if(is_array($str)) {
			foreach($str as $key=>$value) {
				$str[urlencode($key)] = url_encode($value);
			}
		} else {
			$str = urlencode($str);
		}
		return $str;
	}

	if(is_uploaded_file($tmp_name)){
		$time=date("y-m-d-H-i-s");
	    $extend=strrchr ($filename,'.');
	    $name=$time.$extend;
	    $uploadfile=$filePath.$name;
	    move_uploaded_file($tmp_name,$uploadfile);
	    if(!@move_uploaded_file($tmp_name,$uploadfile)){
			$returnJson['imgUrl']=$uploadfile;
			$returnJson['success']=true;
			$returnJson['msg']='上传成功';
		}else{
			$returnJson['success']=false;
			$returnJson['msg']='临时文件夹找不到文件，请重新上传';
		}
	}else{
		$returnJson['success']=false;
		$returnJson['msg']='文件不存在，请重新上传';
	}
	echo encode_json($returnJson);
?>
