<?php
	// error_reporting(E_ALL);
	// ini_set('display_errors', '1');
	// ini_set('error_log', dirname(__FILE__) . '/error_log.txt');
	require_once 'phpexcel/PHPExcel.php';
	require_once 'phpexcel/PHPExcel/IOFactory.php';
	require_once 'phpexcel/PHPExcel/Reader/Excel5.php';
	$objPHPExcel=new PHPExcel();
	//set_time_limt(300);
	include "db_config.php";
	$table='member';

	$data=array();
	$querySql="SELECT * FROM $table member order by topScore desc,registerTime asc limit 50";
	$queryResult=$pdo->query($querySql);
	$i=0;
	while($row=$queryResult->fetch(PDO::FETCH_ASSOC)){
		$i++;
		if($i<=50){
			$openId = $row['openId'];
			$giveout = "否";
			if($row['giveout']==1){
				$giveout = "是";
			}			
			// $nickName = filterEmoji(base64_decode($row['nickName']));
			$nickName = base64_decode($row['nickName']);
			$rowArray = array(
				'id'=>$row['id'],
				'nickName'=>$nickName,
				'topScore'=>$row['topScore'],
				'rank'=>$i,
				'name'=>$row['name'],
				'giveout'=>$giveout,
				'mobile'=>$row['mobile'],
				'address'=>$row['address']
			);
			$data[]=$rowArray;
		}
	}
	// function filterEmoji($str) {
	// 	$str = preg_replace_callback(
	// 		'/./u',
	// 		function (array $match) {
	// 			return strlen($match[0]) >= 4?'':$match[0];
	// 		},
	// 		$str);
	// 	return $str;
	// }
	function replaceSpecialChar($strParam){
		$regex = "/\/|\~|\!|\@|\#|\\$|\%|\^|\&|\*|\(|\)|\_|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\.|\/|\;|\'|\`|\-|\=|\\\|\|/";
		return preg_replace($regex,"",$strParam);
	}

	//设置excel列名
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1','排名');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('B1','昵称');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('C1','最高分');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('D1','ID');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('E1','姓名');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('F1','手机');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('G1','地址');
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue('H1','已寄出');
	//把数据循环写入excel中
	foreach($data as $key => $value){
		$key+=2;
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$key,$value['rank']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('B'.$key,$value['nickName']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('C'.$key,$value['topScore']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('D'.$key,$value['id']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('E'.$key,$value['name']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('F'.$key,$value['mobile']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('G'.$key,$value['address']);
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue('H'.$key,$value['giveout']);
	}

	$time=time();
	$dayTime = date('Ymd',$time);
	$outputFileName = 'downloadMember'.date('Ymd',strtotime($dayTime)).'.xls';
	$xlsWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
	$xlsWriter->save($outputFileName);

	function downfile($fileurl){
		$filename=$fileurl;
		$file  =  fopen($filename, "rb");
		ob_end_clean();//清除缓冲区,避免乱码
		Header("Content-type: application/octet-stream;charset=utf-8");
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="'.$filename.'"');
		header('Cache-Control: max-age=0');
		$contents = "";
		while (!feof($file)) {
			$contents .= fread($file, 8192);
		}
		echo $contents;
		fclose($file);
	}
	downfile($outputFileName);

	$html = false;
	$try_count = 3;
	for($i=0; $i<3 and $html === false; $i++){
		$html = file_get_contents($outputFileName);
		echo $html;
	}
?>