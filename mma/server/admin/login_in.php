<?php
    include "db_config.php";
    require 'session.php';
    Session::start();
    $user = addslashes(trim($_POST['username']));
    $password = addslashes(trim($_POST['password']));

    $returnJson=array();

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

    $querySql = "SELECT * FROM activityset";
    $queryResult = $pdo->query($querySql);
    $row = $queryResult->fetch(PDO::FETCH_ASSOC);
    $datasArray=array();
    $returnJson['success']=true;

    if(empty($user)){
        $returnJson['success']=false;
        $datasArray[] = array('labelName' => 'username', 'msg'=>'用户名为空');
    }else if($user!=$row['username']){
        $returnJson['success']=false;
        $datasArray[] = array('labelName' => 'username', 'msg'=>'用户名不正确');
    }
    if(empty($password)){
        $returnJson['success']=false;
        $datasArray[] = array('labelName' => 'password', 'msg'=>'密码为空');
    }else if($password!=$row['password']){
        $returnJson['success']=false;
        $datasArray[] = array('labelName' => 'password', 'msg'=>'密码不正确');
    }
    if($returnJson['success']){
        Session::set('fishing_user', $row['username'], 3600);
    }
    $returnJson['errorDatas']=$datasArray;

    echo encode_json($returnJson);
?>