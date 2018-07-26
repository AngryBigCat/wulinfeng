<?php
header("Content-type: text/html;charset=utf-8");
	include("db_config.php");

    $table ='update_test';
	$filePath = 'upload/';
    $filename = $_FILES['inputExcel']['name'];
    $tmp_name = $_FILES['inputExcel']['tmp_name'];
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
		 	require_once 'phpexcel/PHPExcel.php';
		    require_once 'phpexcel/PHPExcel/IOFactory.php';
		    require_once 'phpexcel/PHPExcel/Reader/Excel5.php';
		    $objReader = PHPExcel_IOFactory::createReader('Excel5'); //use Excel5 for 2003 format
			//$excelpath='demo.xls';
			$excelpath=$uploadfile;
			$objPHPExcel = $objReader->load($excelpath);
			$sheet = $objPHPExcel->getSheet(0);
			$highestRow = $sheet->getHighestRow();           //取得总行数
			$highestColumn = $sheet->getHighestColumn(); //取得总列数
			$dataArray = array();
			for($j=3;$j<=$highestRow;$j++)                        //从第二行开始读取数据
			{
				$str="";
			    for($k='A';$k<=$highestColumn;$k++)            //从A列读取数据
			     {
			         $str .=$objPHPExcel->getActiveSheet()->getCell("$k$j")->getValue().'|*|';//读取单元格
			     }
				$str=mb_convert_encoding($str,'UTF-8','auto');//根据自己编码修改
				$strs = explode("|*|",$str);

				if($strs[0]&&!empty($strs[0])){
					$time=time();
					$querySql="SELECT * FROM $table";
					$queryResult=$pdo->query($querySql);
					// if(mysql_num_rows($queryResult)<1){
						$position=str_replace(array("&nbsp;","&nbsp;&nbsp;","	", " ","  ","   ","    ","     ", "\t", "\n", "\r"), array("", "", "", "", "", "", "", "", "", "", ""), $strs[0]);
						$phone=str_replace(array("&nbsp;","&nbsp;&nbsp;","	", " ","  ","   ","    ","     ", "\t", "\n", "\r"), array("", "", "", "", "", "", "", "", "", "", ""), $strs[1]);
						$name=str_replace(array("&nbsp;","&nbsp;&nbsp;","	", " ","  ","   ","    ","     ", "\t", "\n", "\r"), array("", "", "", "", "", "", "", "", "", "", ""), $strs[2]);
						$center1=str_replace(array("&nbsp;","&nbsp;&nbsp;","	", " ","  ","   ","    ","     ", "\t", "\n", "\r"), array("", "", "", "", "", "", "", "", "", "", ""), $strs[3]);
						$center2=str_replace(array("&nbsp;","&nbsp;&nbsp;","	", " ","  ","   ","    ","     ", "\t", "\n", "\r"), array("", "", "", "", "", "", "", "", "", "", ""), $strs[4]);

						$createSql="INSERT INTO $table (position,phone,name,center1,center2) VALUES ('$position','$phone','$name','$center1','$center2')";
						$pdo->query($createSql);
						$dataArray[]=array('position' =>$position,'phone' =>$phone,'name' =>$name,'center1' =>$center1,'center2' =>$center2);
					// }
				}
			}
			$returnJson['datas']=$dataArray;
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