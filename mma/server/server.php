<?php
header("Content-type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
require "session.php";
Session::start();
// ini_set("display_errors", "On");
	include "db_config.php";
	$type = $_REQUEST['action'];
	$time = time();
	$clientInfo=$_SERVER['HTTP_USER_AGENT'];
	$ip=$_SERVER["REMOTE_ADDR"];
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
	function getJson($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }
	function array2object($array) {
	  if (is_array($array)) {
	    $obj = new StdClass();
	    foreach ($array as $key => $val){
	      $obj->$key = $val;
	    }
	  }
	  else { $obj = $array; }
	  return $obj;
	}
	function object2array($object) {
	  if (is_object($object)) {
	    foreach ($object as $key => $value) {
	      $array[$key] = $value;
	    }
	  }
	  else {
	    $array = $object;
	  }
	  return $array;
	}
    function get_rand($proArr) {
        $result = '';
        $proSum = array_sum($proArr);
        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);             //抽取随机数
            if ($randNum <= $proCur) {
                $result = $key;                         //得出结果
                break;
            } else {
                $proSum -= $proCur;
            }
        }
        unset ($proArr);
        return $result;
    }
	try{
		$pdo->beginTransaction();
		$activitySetSql="SELECT * FROM activityset";
		$activitySetResult=$pdo->query($activitySetSql);
		if($activitySetRow=$activitySetResult->fetch(PDO::FETCH_ASSOC)){
		/**微信授权、排行榜、我的奖品*/
			/**活动未开始、活动已结束、*/
			if($type=='getWxUserInfo'){
				$openId=Session::get('attract_openId');
		 		$nickName=Session::get('attract_nickname');
		 		$headImg=Session::get('attract_headImg');

				$code=@$_REQUEST['code'];
				require "weixin_sign.php";
				if(count($signPackage)>0){
					$returnJson['appId']=$signPackage['appId'];
					$returnJson['timestamp']=$signPackage['timestamp'];
					$returnJson['nonceStr']=$signPackage['nonceStr'];
					$returnJson['signature']=$signPackage['signature'];
				}
			 	if(!$openId&&$code){
					$oauth2Url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appId&secret=$appSecret&code=$code&grant_type=authorization_code";
				    $oauth2 = getJson($oauth2Url);
				    $oauth2Token = @$oauth2["access_token"];
				    $openId = @$oauth2['openid'];
				    if($openId){
						$get_user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=$oauth2Token&openid=$openId";
					    $userinfo = getJson($get_user_info_url);
					    $nickName=$userinfo['nickname'];
	 					$headImg=$userinfo['headimgurl'];
				    }
				}
				if($openId){
					Session::set('attract_openId',$openId,72000);
			    	Session::set('attract_nickname',$nickName,72000);
			    	Session::set('attract_headImg',$headImg,72000);
					$memberSql="SELECT * FROM member WHERE openId='$openId'";
			    	$memberResult=$pdo->query($memberSql);
					$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC);
			    	if($memberRow){
				 		$returnJson['success']=true;
						$returnJson['firstgame']=$memberRow['firstgame'];
			    	}else{
			    		$createMemberSql="INSERT INTO member (openId,nickName,registerTime,headImg) VALUES ('$openId','".base64_encode($nickName)."','$time','$headImg')";
			    		if($pdo->query($createMemberSql)){
							$returnJson['success']=true;
							$returnJson['firstgame']='1';
							/**重新获取 获取我的ID */
							$memberSql="SELECT * FROM member WHERE openId='$openId'";
					    	$memberResult=$pdo->query($memberSql);
							$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC);
						}else{
							$returnJson['success']=false;
							$returnJson['msg']="数据库连接失败";
							$returnJson['msg2']=$pdo->errorInfo();
						}
			    	}
					$returnJson['cid']=$memberRow["id"];
			 		$returnJson['nickName']=$nickName;
					$returnJson['headImg']=$headImg;
					/**获取赛事图片地址 */
					$matchsSql="SELECT * FROM matchs";
			    	$matchsResult=$pdo->query($matchsSql);
					$matchImgs = array();
					if($matchsResult){
						while ($matchsRow=$matchsResult->fetch(PDO::FETCH_ASSOC)) {
							$matchImgs[] = $matchsRow['imgUrl'];
						}
					}
					$returnJson['matchImgs']=$matchImgs;
			    	/** 访问量 独立访客(IP) */
			    	$informationSql = "SELECT * FROM information";
			    	$informationResult=$pdo->query($informationSql);
			    	if($informationResult&&$informationRow=$informationResult->fetch(PDO::FETCH_ASSOC)){
			    		$informationId = $informationRow["id"];
			    		$pv = $informationRow["pv"] + 1;
			    		$uv = $informationRow["uv"];
			    		$zsc = $informationRow["zsc"]+63;
			    		$pjsc = $zsc/$pv;
			    		/**查询IP */
			    		$ipsSql = "SELECT ip FROM ips where ip='$ip'";
			    		$ipsResult=$pdo->query($ipsSql);
			    		$ipsRow=$ipsResult->fetch(PDO::FETCH_ASSOC);
				    	if(!$ipsRow){
				    		$createipsSql = "INSERT INTO ips (ip) VALUES ('$ip')";
							$pdo->query($createipsSql);
				    		$uv = $uv + 1;
				    	}

			    		$informationSql="UPDATE information set pv='$pv',uv='$uv',zsc='$zsc',pjsc='$pjsc' WHERE id=$informationId";
			    		if($pdo->query($informationSql)){
							$returnJson['success']=true;
						}else{
							$returnJson['success']=false;
							$returnJson['msg3']="数据库连接失败";
							$returnJson['msg4']=$pdo->errorInfo();
						}
			    	}
				}
				else{
			    	$returnJson['success']=false;
			    	$returnJson['msg']='微信授权过期，请重新登录页面';
			    }
			}
			else if($type=='getRank'){
				$openId=Session::get('attract_openId');
		 		$nickName=Session::get('attract_nickname');
		 		$headImg=Session::get('attract_headImg');

				$rankSql="SELECT * FROM member where topScore!=0 ORDER BY topScore DESC,registerTime ASC LIMIT 100";
				$rankResult=$pdo->query($rankSql);
				$rankArray = array();
				if($rankResult){
					while ($rankRow=$rankResult->fetch(PDO::FETCH_ASSOC)) {
						$rankArray[] = array(
							'nickName' => base64_decode($rankRow['nickName']),
							'headImg' => $rankRow['headImg'],
							'topScore' => $rankRow['topScore']
						);
					}
				}
				$memberSql="SELECT * FROM member where openId='$openId'";
				$memberResult=$pdo->query($memberSql);
				$returnJson['player'] = array(
					'playerRank' => 0,
					'topScore' => 0
				);
				if($memberResult&&$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC)){
					$myRankSql="SELECT count(*) as count FROM member WHERE (topScore>'$memberRow[topScore]') OR (topScore='$memberRow[topScore]' AND registerTime<'$memberRow[registerTime]')";
					$myRankResult=$pdo->query($myRankSql);
					$myRankRow=$myRankResult->fetch(PDO::FETCH_ASSOC);
					$topScore = $memberRow['topScore'];
					$playerRank = $myRankRow['count']+1;
					if($topScore==0){
						$playerRank = 0;
					}

					$returnJson['player'] = array(
						'playerRank' => $playerRank,
						'topScore' => $topScore
					);	
				}
				$returnJson['success']=true;
				$returnJson['ranklist']=$rankArray;		
			}
			else if($type=='setInfo'){
				$openId=Session::get('attract_openId');
				$name=$_REQUEST['name'];
				$mobile=$_REQUEST['mobile'];
				$address=$_REQUEST['address'];
				$updateMemberSql="UPDATE member set name='$name',mobile='$mobile',address='$address' WHERE openId='$openId'";
				if($updateMemberResult=$pdo->query($updateMemberSql)){
					$returnJson['success']=true;
				}else{
					$returnJson['success']=false;
					$returnJson['msg']=$pdo->errorInfo();
				}		
			}
			else if($type=='myPrize'){
				$returnJson['success']=true;
				$memberSql="SELECT * FROM member WHERE openId='$openId'";
				$memberResult=$pdo->query($memberSql);
				if($memberResult&&$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC)){
					if($memberRow['topScore']==6){
						$returnJson['success']=true;
						$returnJson['myPrizeList']=true;
					}else{
						$returnJson['success']=true;
						$returnJson['myPrizeList']=false;
					}
				}else{
					$returnJson['success']=false;
					$returnJson['msg']='用户不存在';
				}
			}
			else if(strtotime($activitySetRow['startTime'])>$time){
				$returnJson['success']=false;
				$returnJson['msg']='活动未开始';
				$returnJson['notActivityTime']=true;
				$returnJson['activeTime']=-1;
				$returnJson['activeTimes'] = array(
					'0' => strtotime($activitySetRow['startTime']),
					'1' => strtotime($activitySetRow['endTime'])
				);
			}
			else if(strtotime($activitySetRow['endTime'])<$time){
				$returnJson['success']=false;
				$returnJson['msg']='活动已结束';
				$returnJson['notActivityTime']=true;
				$returnJson['activeTime']=1;
				$returnJson['activeTimes'] = array(
					'0' => strtotime($activitySetRow['startTime']),
					'1' => strtotime($activitySetRow['endTime'])
				);
			}else{
		/** */
				$openId=Session::get('attract_openId');
		 		$nickName=Session::get('attract_nickname');
		 		$headImg=Session::get('attract_headImg');
				switch ($type) {
					case 'startGame':
						Session::set('attract_startTime',$time,1200);
						$returnJson['success']=true;

						// $isShare = false;
						// $shareSql = "SELECT count(*) as count FROM sharereport WHERE openId='$openId'";
						// $shareResult = $pdo->query($shareSql);
						// if($shareResult&&$shareRow=$shareResult->fetch(PDO::FETCH_ASSOC)){
						// 	if($shareRow['count']>0){
						// 		$isShare = true;
						// 	}
						// }

						$memberSql="SELECT * FROM member WHERE openId='$openId'";
						$memberResult=$pdo->query($memberSql);
						if($memberResult&&$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC)){
							$id = $memberRow['id'];
							$startNum = $memberRow[startNum]+1;
							$endNum   = $memberRow[endNum]+1;
							$firstgame= $memberRow['firstgame']; // 是否第一次玩耍
							$gameCode1 = $startNum * ($id+1);
							$gameCode2 = $endNum   * ($id+2);
							if($firstgame){
								$updateMemberSql="UPDATE member set startNum='$startNum',firstgame='' WHERE id='$memberRow[id]'";
							}else{
								$updateMemberSql="UPDATE member set startNum='$startNum' WHERE id='$memberRow[id]'";
							}
							$updateMemberResult=$pdo->query($updateMemberSql);
							$returnJson['gcode1']=$gameCode1;
							$returnJson['gcode2']=$gameCode2;
							// $returnJson['firstgame']=$firstgame; // 是否第一次玩耍
							// $returnJson['scode']=$isShare; // 是否分享							
							$returnJson['success']=true;
						}else{
							$returnJson['success']=false;
							$returnJson['msg']='用户不存在';
						}
						break;
					case 'endGame':
						$startTime=Session::get('attract_startTime');
						if(!$startTime){
							$returnJson['success']=false;
							$returnJson['msg']='请从游戏主页开始游戏';
						}else{
							Session::clear('attract_startTime');
							$memberSql="SELECT * FROM member WHERE openId='$openId'";
							$memberResult=$pdo->query($memberSql);
							if($memberResult&&$memberRow=$memberResult->fetch(PDO::FETCH_ASSOC)){
								$id = $memberRow['id'];
								$startNum=$memberRow['startNum'];
								// json-object-array;
								$gameData = object2array(json_decode(base64_decode($_REQUEST['code'])));
								$gameInfo = object2array($gameData['gameInfo']);
								$score = $gameData['score'];
								$score2= $gameInfo['code1']  / ($id+$startNum+1);
								$gcode1 = $gameInfo["code2"] / ($id+1);
								$gcode2 = $gameInfo["code3"] / ($id+2);

								$endNum=$memberRow['endNum']+1;
								$topScore = $memberRow['topScore'];
								// 手机号
								// $haveMobile=$memberRow['mobile'];
								// 历史最高分
								$hstScore = $memberRow['hstScore'];
								/**检测作弊行为 */
								$isWg = false;
								// 正常分数与加密分数码不等
								if($score!=$score2){
									$isWg = true;
								}
								$thiscode = $gcode1.'-'.$gcode2;
								/**End 检测作弊行为 */
								if($score>$memberRow['topScore']){
									$topScore = $score;
									if($topScore>$hstScore){
										$hstScore = $topScore;
									}
									if($isWg){
										$updateMemberSql="UPDATE member set endNum='$endNum',ip='$ip',remarks=-1 WHERE id='$memberRow[id]'";
									}else{
										$updateMemberSql="UPDATE member set topScore='$topScore',hstScore='$hstScore',endNum='$endNum',ip='$ip' WHERE id='$memberRow[id]'";
									}
								}else{
									if($isWg){
										$updateMemberSql="UPDATE member set endNum='$endNum',ip='$ip',remarks=-1 WHERE id='$memberRow[id]'";
									}else{
										$updateMemberSql="UPDATE member set endNum='$endNum',ip='$ip' WHERE id='$memberRow[id]'";		
									}
								}
								if($isWg){
									$createReportSql="INSERT INTO playreport 
									(openId,score,gameInfo,startTime,endTime,clientInfo,ip,thiscode,remarks) VALUES 
									('$openId','$score','".encode_json($gameInfo)."','$startTime','$time','$clientInfo','$ip','$thiscode','-1')";
								}else{
									$createReportSql="INSERT INTO playreport 
									(openId,score,gameInfo,startTime,endTime,clientInfo,ip,thiscode) VALUES 
									('$openId','$score','".encode_json($gameInfo)."','$startTime','$time','$clientInfo','$ip','$thiscode')";
								}
								/**1.更新member */
								$updateMemberResult=$pdo->query($updateMemberSql);
								/**2.插入新的playreport */
								$pdo->query($createReportSql);
								/**3.重新获取我的高分数的排名 */
								$myRankSql="SELECT count(*) as count FROM member WHERE (topScore>'$topScore') OR (topScore='$topScore' AND registerTime<'$memberRow[registerTime]')";
								$myRankResult=$pdo->query($myRankSql);
								$myRankRow=$myRankResult->fetch(PDO::FETCH_ASSOC);
								$playerRank = $myRankRow['count']+1;
								/**4.获取当前分数的排名 */
								// $myRankSql="SELECT count(*) as count FROM member WHERE (topScore>'$score') OR (topScore='$score' AND registerTime<'$memberRow[registerTime]')";
								// $myRankResult=$pdo->query($myRankSql);
								// $myRankRow=$myRankResult->fetch(PDO::FETCH_ASSOC);
								// $playerRank = $myRankRow['count']+1;
								/**得到我的排名前一位与后一位 */
									// $playerRank2 = max($playerRank-2,0);
									// $rankSql="SELECT nickName,topScore,headImg FROM member ORDER by topScore DESC,registerTime ASC LIMIT $playerRank2,3";
									// $rankResult=$pdo->query($rankSql);
									// if($rankResult){
									// 	while ($rankRow=$rankResult->fetch(PDO::FETCH_ASSOC)) {
									// 		$dataList[] = array(
									// 			'nickName' => base64_decode($rankRow['nickName']),
									// 			'headImg' => $rankRow['headImg'],
									// 			'topScore' => $rankRow['topScore']
									// 		);
									// 	}
									// }
									// 结果
									// $returnJson['dataList']=$dataList;
								// 结果
								// $returnJson['hstScore']=$hstScore;
								// $returnJson['haveMobile']=$haveMobile;
								$returnJson['myRank']=$playerRank;
								$returnJson['success']=true;
								$returnJson['msg']='成绩上传成功';

						    	/** 平均时长 */
						    	$informationSql = "SELECT * FROM information";
						    	$informationResult=$pdo->query($informationSql);
						    	if($informationResult&&$informationRow=$informationResult->fetch(PDO::FETCH_ASSOC)){
						    		$informationId = $informationRow["id"];
						    		$pv = $informationRow["pv"];
						    		$useTime = $time - $startTime;
						    		$zsc = $informationRow["zsc"] + $useTime;
						    		$pjsc = $zsc/$pv;
						    		/**查询IP */
						    		$ipsSql = "SELECT ip FROM ips where ip='$ip'";
						    		$ipsResult=$pdo->query($ipsSql);
						    		$ipsRow=$ipsResult->fetch(PDO::FETCH_ASSOC);
							    	if(!$ipsRow){
							    		$createipsSql = "INSERT INTO ips (ip) VALUES ('$ip')";
										$pdo->query($createipsSql);
							    		$uv = $uv + 1;
							    	}
						    		$informationSql="UPDATE information set zsc='$zsc',pjsc='$pjsc' WHERE id=$informationId";
						    		if($pdo->query($informationSql)){
										$returnJson['success']=true;
									}else{
										$returnJson['success']=false;
										$returnJson['msg3']="数据库连接失败";
										$returnJson['msg4']=$pdo->errorInfo();
									}
						    	}
							}else{
								$returnJson['success']=false;
								$returnJson['msg']='用户不存在';
							}
						}
						break;
					case 'setInfo':
						$name=$_REQUEST['name'];
						$mobile=$_REQUEST['mobile'];
						$address=$_REQUEST['address'];
						$updateMemberSql="UPDATE member set name='$name',mobile='$mobile',address='$address' WHERE openId='$openId'";
						if($updateMemberResult=$pdo->query($updateMemberSql)){
							$returnJson['success']=true;
						}else{
							$returnJson['success']=false;
							$returnJson['msg']=$pdo->errorInfo();
						}
						break;
					case 'share':
						$createShareReportSql="INSERT INTO sharereport (openId,time,ip) VALUES ('$openId','$time','$ip')";
						$pdo->query($createShareReportSql);
						$returnJson['success']=true;
						break;																	
					case 'getCourse':
						$playReportSql="SELECT count(*) as count FROM playreport WHERE openId='$openId' AND score>=80";
						$playReportResult=$pdo->query($playReportSql);
						$playReportRow=$playReportResult->fetch(PDO::FETCH_ASSOC);

						$todayCourseReportSql="SELECT count(*) as count FROM coursereport WHERE openId='$openId' AND time>'".strtotime(date('Y-m-d',time()))."'";
						$todayCourseReportResult=$pdo->query($todayCourseReportSql);
						$todayCourseReportRow=$todayCourseReportResult->fetch(PDO::FETCH_ASSOC);

						if($playReportRow['count']<1){
							$returnJson['success']=false;
							$returnJson['msg']='分数满80分才可参与抽奖哦';
						}
						else if($todayCourseReportRow['count']>=3){
							$returnJson['success']=true;
							$returnJson['giftId']=0;
							$returnJson['msg']='你今天的抽奖机会已用完';
						}
						else{
							$courseReportSql="SELECT count(*) as count FROM coursereport WHERE openId='$openId' AND courseName!='谢谢参与'";
							$courseReportResult=$pdo->query($courseReportSql);
							$courseReportRow=$courseReportResult->fetch(PDO::FETCH_ASSOC);
							$courseIdArray = array();
							$courseNameArray = array();
							$courseSetSql="SELECT * FROM courseset WHERE totalNum>receiveNum";
							$courseSetResult=$pdo->query($courseSetSql);
							if($courseSetResult){
								while($courseSetRow=$courseSetResult->fetch(PDO::FETCH_ASSOC)){
									$courseNameArray[$courseSetRow['id']]=$courseSetRow['courseName'];
									$courseIdArray[$courseSetRow['id']]=10000*$courseSetRow['chances'];
								}
							}
							if($courseReportRow['count']>0){
								$courseId=4;
							}else if(count($courseIdArray)<1){
								$courseId=4;
							}else{
								$courseId=get_rand($courseIdArray);
							}
							$updateCourseSetSql="UPDATE courseset SET receiveNum=receiveNum+1 WHERE id='$courseId'";
							$updateCourseSetResult=$pdo->query($updateCourseSetSql);
							$createCourseReportSql="INSERT INTO coursereport (openId,courseName,time,ip) VALUES ('$openId','$courseNameArray[$courseId]','$time','$ip')";
							$createCourseReportResult=$pdo->query($createCourseReportSql);
							$returnJson['giftId']=$courseId;
							$returnJson['courseName']=$courseNameArray[$courseId];
							$returnJson['success']=true;
						}
						break;
				}
			}
		}else{
			$returnJson['success']=false;
			$returnJson['msg']='活动未初始化';
		}
		$pdo->commit();
	}catch(PDOException $e){
		$pdo->rollBack();
		$returnJson['success']=false;
		$returnJson['msg']='操作不合法';
	}
	$callback = isset($_GET['callback']) ? trim($_GET['callback']) : '';
	echo $callback . '(' . encode_json($returnJson) .')';
?>