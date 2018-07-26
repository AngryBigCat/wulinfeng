<?php
	header("Content-type: text/html;charset=utf-8");
	header("Access-Control-Allow-Origin: ".$_SERVER['SERVER_NAME']);
	include "db_config.php";
	$ip=$_SERVER["REMOTE_ADDR"];
	// $time = time();
	$dayTime = date('Ymd',$time);
	$today0=strtotime(date('Y-m-d 0:0:0',time())); //今日零点
	$oper=$_GET['oper'];
	$table=$_GET['table'];
	$page=$_GET['page'];
	$limit=$_GET['limit'];
	$page=$page*$limit-$limit;
	if($page<0) $page=0;

	$type=$_POST['type'];
	$id=$_POST['id'];
	$img=$_POST['img'];
	$prize_index=$_POST['prize_index'];
	$prize_name=$_POST['prize_name'];
	$prize_describe=$_POST['prize_describe'];
	$chance=$_POST['chance'];
	$startTime=$_POST['startTime'];
	$endTime=$_POST['endTime'];
	$checked=$_POST['checked'];

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
	try{
		$pdo->beginTransaction();
		if($oper=="admin"){
			$listSql="SELECT * FROM activityset";
			$listResult=$pdo->query($listSql);

			$sql1="SELECT * FROM activityset order by id limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				$data[]=array(
					'id'=>$row['id'],
					'startTime'=>$row['startTime'],
					'endTime'=>$row['endTime'],
				);
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="member"){
			$listSql="SELECT * FROM member";
			$listResult=$pdo->query($listSql);

			$sql1="SELECT * FROM member order by topScore desc,registerTime asc limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				// if($row['isUsed']==1){
				// 	$switch="<input type='checkbox' lay-filter='switch' lay-skin='switch' lay-text='开启|关闭' checked>";
				// }else{
				// 	$switch="<input type='checkbox' lay-filter='switch' lay-skin='switch' lay-text='开启|关闭'>";
				// }
				$openId = $row['openId'];
				$nickName = base64_decode($row['nickName']);
				$data[]=array(
					'id'=>$row['id'],
					'openId'=>"<a href='cont.php?id=".$openId."&nickName=".$nickName."' target='_blank'>".$openId."</a>",
					'headImg'=>$row['headImg'],
					'nickName'=>$nickName,
					'topScore'=>$row['topScore'],
					'gtimes'=>$row['startNum']."-".$row['endNum'],
					'registerTime'=>date("Y-m-d H:i",($row['registerTime'])),
					'remarks'=>$row['remarks']
				);
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="userdata"){
			$listSql="SELECT * FROM member limit 50";
			$listResult=$pdo->query($listSql);

			// $sql1="SELECT * FROM member where mobile order by topScore desc,registerTime asc limit $page,$limit";
			$sql1="SELECT * FROM member order by topScore desc,registerTime asc limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			$rankCount = 0;
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				// if($row['isUsed']==1){
				// 	$switch="<input type='checkbox' lay-filter='switch' lay-skin='switch' lay-text='开启|关闭' checked>";
				// }else{
				// 	$switch="<input type='checkbox' lay-filter='switch' lay-skin='switch' lay-text='开启|关闭'>";
				// }
				$rankCount++;
				if($rankCount<=50){
					$openId = $row['openId'];
					$nickName = base64_decode($row['nickName']).'';
					$data[]=array(
						'id'=>$row['id'],
						// 'openId'=> "<a href="."cont.php?id=".$openId."&nickName=".$nickName.">".$openId."</a>",
						'headImg'=>$row['headImg'],
						'nickName'=>$nickName,
						'topScore'=>"<span class='topScore'>".$row['topScore']."<span>",

						'rank'=>"<span class='rank'>".$rankCount."<span>",
						'giveout'=>$row['giveout'],
						'name'=>$row['name'],
						'mobile'=>$row['mobile'],
						'address'=>$row['address'],
						// 'gtimes'=>$row['startNum'].'-'.$row['endNum'],
						// 'registerTime'=>date("Y-m-d H:i",($row['registerTime'])),
						// 'remarks'=>$row['remarks']
					);
				}
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="information"){
			$listSql="SELECT * FROM information";
			$listResult=$pdo->query($listSql);

			$sql1="SELECT * FROM information limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			if($row=$result1->fetch(PDO::FETCH_ASSOC)){
				$jishu = $row['jishu'];
				$jishu2 = $row['jishu2'];
				$pv = $row['pv']*1 + $row['jishu'];
				$uv = $row['uv']*1 + $row['jishu2'];
				$zsc = $row['zsc'] + $row['jishu']*67;
				$pjsc = floor($zsc/$pv*100)/100;
				$data[]=array(
					"id"=>$row['id'],
					"pv"=>$pv,
					"uv"=>$uv,
					"zsc"=>$zsc,
					"pjsc"=>$pjsc
				);	
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="information2"){
			$listSql="SELECT * FROM information";
			$listResult=$pdo->query($listSql);

			$sql1="SELECT * FROM information limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			if($row=$result1->fetch(PDO::FETCH_ASSOC)){
				$jishu = $row['jishu'];
				$jishu2 = $row['jishu2'];
				$pv = $row['pv']*1 + $row['jishu'];
				$uv = $row['uv']*1 + $row['jishu2'];
				$zsc = $row['zsc'] + $row['jishu']*67;
				$pjsc = floor($zsc/$pv*100)/100;
				$data[]=array(
					"id"=>$row['id'],
					// "pv"=>$pv."=".$row['pv']."*1"."+".$jishu,
					// "uv"=>$uv."=".$row['uv']."*1"."+".$jishu2,
					// "zsc"=>$zsc."=".$row['zsc']."+".$jishu."*67",
					"pv"=>$pv,
					"uv"=>$uv,
					"zsc"=>$zsc,
					"pjsc"=>$pjsc,
					"jishu"=>$row['jishu'],
					"jishu2"=>$row['jishu2']
				);	
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="cont"){
			$openId = $_GET['openId'];
			$sql1="SELECT * FROM playreport where openId='$openId' order by score desc" ;
			$result1=$pdo->query($sql1);
			$data=array();
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				// 显示整个字符串 将""转为'';
				// $gameInfo = str_replace(',',', ',str_replace('"',"'",$row['gameInfo']));
				// 输出为php数组;
				$gameInfo = json_decode($row['gameInfo'],true);
				$data[]=array(
					'id'=>$row['id'],
					'openId'=> $row['openId'],
					'score'=>$row['score'],
					'cs1'=>$gameInfo['cs1']*10,
					'cs2'=>$gameInfo['cs2'],
					'cs3'=>$gameInfo['cs3'],
					'cs4'=>$gameInfo['cs4'],
					'thiscode'=>$row['thiscode'],
					'remarks'=>$row['remarks'],
					'startTime'=>date("Y-m-d H:i",($row['startTime'])),
					'endTime'=>date("Y-m-d H:i",($row['endTime'])),
					'useTime'=>$row['endTime']-$row['startTime'],
					'clientInfo'=>$row['clientInfo'],
					'ip'=>$row['ip']
				);
			}
			$count=$result1->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="matchs"){
			$openId = $_GET['openId'];
			$sql1="SELECT * FROM matchs";
			$result1=$pdo->query($sql1);
			$data=array();
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				$data[]=array(
					'id'=> $row['id'],
					'matchName'=> $row['matchName'],
					'imgUrl'=> $row['imgUrl']
				);
			}
			$count=$result1->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		else if($oper=="prize_chance"){
			$listSql="SELECT * FROM prize_chance";
			$listResult=$pdo->query($listSql);

			$sql1="SELECT * FROM prize_chance order by id limit $page,$limit";
			$result1=$pdo->query($sql1);
			$data=array();
			while($row=$result1->fetch(PDO::FETCH_ASSOC)){
				$data[]=array(
					'id'=>$row['id'],
					'img'=>$row['img'],
					'prize_index'=>$row['prize_index'],
					'prize_name'=>$row['prize_name'],
					'prize_describe'=>$row['prize_describe'],
					'chance'=>$row['chance']
					// 'time' => $row['time']?date('Y-m-d H:i:s',$row['time']):''
				);
			}
			$count=$listResult->rowCount();
			$returnJson['count']=$count;
			$returnJson['code']=0;
			$returnJson['msg']='';
			$returnJson['data']=$data;
			$returnJson['page']=$page;
		}
		// 编辑
		else if($oper=="edit"){
			if($table=='admin'){
				$updateSql="UPDATE activityset set startTime='$startTime', endTime='$endTime' where id='$id'";
			}
			if($table=='member'){
				$remarks = $_POST['remarks'];
				$updateSql="UPDATE member set remarks='$remarks' where id='$id'";
			}
			if($table=='matchs'){
				$imgUrl = dirname('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']).'/'.$_POST['imgUrl'];
				$updateSql="UPDATE matchs set imgUrl='$imgUrl' where id='$id'";
			}
			if($table=='prize_chance'){
				$updateSql="UPDATE prize_chance set img='$img', prize_index='$prize_index', prize_name='$prize_name', prize_describe='$prize_describe', chance='$chance' where id='$id'";
			}
			if($table=='userdata'){
				$giveout = $_POST['giveout'];
				$updateSql="UPDATE member set giveout='$giveout' where id='$id'";
			}

			if($table=='information2'){
				$jishu = $_POST['jishu'];
				$jishu2 = $_POST['jishu2'];
				$updateSql="UPDATE information set jishu='$jishu',jishu2='$jishu2' where id='$id'";
			}

			if($table=='setTitle'){

			}
			else if($pdo->exec($updateSql)){
				$returnJson['id']=$id;
				$returnJson['msg']='提交成功';
				$returnJson['success']=true;
			}else{
				$returnJson['msg']='未修改';
				$returnJson['success']=false;
			}
		}
		// 增加
		else if($oper=="add"){
			if($table=='prize_chance'){
				$createSql="INSERT INTO prize_chance (img,prize_index,prize_name,prize_describe,chance)values('$img','$prize_index', '$prize_name', '$prize_describe', '$chance')";
			}

			if($pdo->query($createSql)){
				$returnJson['msg']='添加成功';
				$returnJson['success']=true;
			}else{
				$returnJson['msg']='添加失败';
				$returnJson['success']=false;
			}
		}
		// 删除
		else if($oper=="del"){
			if($table=='prize_chance'){
				$delSql="DELETE FROM prize_chance where id='$id'";
			}

			if($pdo->query($delSql)){
				$returnJson['msg']='删除成功';
				$returnJson['success']=true;
			}else{
				$returnJson['msg']='删除失败';
				$returnJson['success']=false;
			}
			$returnJson['id']=$id;
		}
		// 开关
		else if($oper=="switch"){
			if($table=='member'){
				$switchSql="UPDATE member set isUsed='$checked' where id='$id'";
			}

			if($pdo->exec($switchSql)){
				$returnJson['msg']='成功';
				$returnJson['success']=true;
			}else{
				$returnJson['msg']='失败';
				$returnJson['success']=false;
			}
			$returnJson['id']=$id;
		}

		$pdo->commit();
	}catch(PDOException $e) {
		$pdo->rollBack();
		$returnJson['msg']='操作不合法';
		$returnJson['success']=false;
	}
	echo encode_json($returnJson);
?>
