var isAjax = false;
/**活动状态 -1:活动未开始 0:活动进行中 1:活动已结束*/
var activeTime = 0;
var activeTimes = [0,1];
function IsActiveTimeFun(){
	var nowDate = new Date().getTime();
	var now = Math.floor(nowDate/1000);
	if(now>=Number(activeTimes[0])&&now<Number(activeTimes[1])){
		return true;
	}else if(activeTime==-1){
		Lgs.LAlert("活动未开始");
		Lgs.hideloading();
		return false;
	}else if(activeTime==1){
		Lgs.LAlert("活动已结束");
		Lgs.hideloading();
		return false;
	}
	return true;
}
function getActiveTimes(data){
	if(data.notActivityTime) activeTime = data.activeTime;
	if(data.activeTimes) activeTimes = data.activeTimes;
}

function getWxUserInfoAjax(callback,errorcallback,thisObj){
	// if(callback) callback.call(thisObj);
	if(!isAjax){
		isAjax=true;
		$.ajax({
			type: 'POST',
			url: $serverBaseUrl+'server.php?action=getWxUserInfo',
			data:{
				'code':$code,
				'shareUrl':encodeURI(window.location.href)
			},
			dataType:'jsonp',
			jsonp:'callback',
			success: function(data) {
				// console.log(data);
				isAjax=false;
				if(data.success){
					setShareInfo(data);
				    if(callback) callback.call(thisObj,data);
				}else{
 	             getActiveTimes(data);
				    if(errorcallback) errorcallback.call(thisObj,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				isAjax=false;
				alert('服务器繁忙，请稍后再试');
			}
		});
	}
}
// 开始游戏 参数：无
function startGameAjax(callback,errorcallback,thisObj){
	if(!isAjax&&IsActiveTimeFun()){
		isAjax=true;
		$.ajax({
			type: 'POST',
			url: $serverBaseUrl+'server.php?action=startGame',
			data:{},
			dataType:'jsonp',
			jsonp:'callback',
			success: function(data) {
				// console.log(data);
				isAjax=false;
				if(data.success){
				    if(callback) callback.call(thisObj,data);
				}else{
					getActiveTimes(data);
					if(errorcallback) errorcallback.call(thisObj,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				isAjax=false;
				alert('服务器繁忙，请稍后再试');
			}
		});
	}
}
// 结束游戏 参数：data
function endGameAjax(data,callback,errorcallback,thisObj){
	if(!isAjax&&IsActiveTimeFun()){
		isAjax=true;
		$.ajax({
			type: 'POST',
			url: $serverBaseUrl+'server.php?action=endGame',
			data:data,
			dataType:'jsonp',
			jsonp:'callback',
			success: function(data) {
				// console.log(data);
				isAjax=false;
				if(data.success){
				    if(callback) callback.call(thisObj,data);
				}else{
                    getActiveTimes(data);
				    if(errorcallback) errorcallback.call(thisObj,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				isAjax=false;
				alert('服务器繁忙，请稍后再试');
			}
		});
	}
}
//ok get  获取排行榜
function getRanklistAjax(callback,errorcallback,thisObj){
    if(!isAjax){
        isAjax=true;
        $.ajax({
            type: 'POST',
            url: $serverBaseUrl+'server.php?action=getRank',
            data:{},
            dataType:'jsonp',
            contentType: 'application/json',
            async: true,
			jsonp:"callback",
            success: function(data) {
                // console.log(data);
                isAjax=false;
				if(data.success){
				    if(callback) callback.call(thisObj,data);
				}else{
                    getActiveTimes(data);
				    if(errorcallback) errorcallback.call(thisObj,data);
				}
            },
            error:function(data){
                isAjax=false;
			    if(errorcallback) errorcallback.call(thisObj,data);
            }
        });
    }
}

function shareAjax(shareType,callback,errorcallback){
	$.ajax({
		type: 'POST',
        url: $serverBaseUrl+'server.php?action=share',
		data:{},
		dataType:'jsonp',
		jsonp:'callback', 
		success: function(data) {
			// console.log(data);
			if(data.success){
				if(callback) callback(data);
			}else{
				if(errorcallback) errorcallback(data);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(errorThrown);
		}
	});
};

// 提交资料 参数：data
function setInfoAjax(data,callback,errorcallback,thisObj){
	if(!isAjax&&IsActiveTimeFun()){
		isAjax=true;
		$.ajax({
			type: 'POST',
			url: $serverBaseUrl+'server.php?action=setInfo',
			data:data,
			dataType:'jsonp',
			jsonp:'callback',
			success: function(data) {
				isAjax=false;
				if(data.success){
				    if(callback) callback.call(thisObj,data);
				}else{
                    getActiveTimes(data);
				    if(errorcallback) errorcallback.call(thisObj,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				isAjax=false;
				alert('服务器繁忙，请稍后再试');
			}
		});
	}
}

function setShareInfo(data){
	wx.config({
		debug: false,
		appId: data.appId,
		timestamp: data.timestamp,
		nonceStr: data.nonceStr,
		signature: data.signature,
		jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage'
		]
	});
	wx.ready(function(){
		shareFn();
	});
	wx.error(function(res){});
}

function shareFn(){
	$title='英雄，来看一看隐藏在你心中的武魂！'; // 分享标题
	$desc='武林风再起，武魂共天鸣，快去测一测你与武林风哪位选手拥有相同的武魂！'; // 分享文案
	$shareImg=$dirName+'/share.jpg';
	$link=$dirName+'/index.html';

	wx.onMenuShareTimeline({
		title: $desc,
		link: $link,
		imgUrl: $shareImg,
		success: function(res){
			shareAjax();
			shareOkClose();
			setTimeout(function(){
				Lgs.LMsg("分享成功");
			},300);
		},
		cancel: function(res){
			setTimeout(function(){
				Lgs.LMsg("您取消了分享");
			},300);
		}
	});
	wx.onMenuShareAppMessage({
		title:$title,
		desc: $desc,
		link: $link,
		imgUrl: $shareImg,
		success: function(res){
			shareAjax();
			shareOkClose();
			setTimeout(function(){
				Lgs.LMsg("分享成功");
			},300);
		},
		cancel: function(res){
			setTimeout(function(){
				Lgs.LMsg("您取消了分享");
			},300);
		},
		fail: function(res){}
	});
	wx.onMenuShareQQ({
		title: $title,
		desc: $desc,
		link: $link,
		imgUrl: $shareImg,
		success: function(res){
			shareOkClose();
			setTimeout(function(){
				Lgs.LMsg("分享成功");
			},300);
		},
		cancel: function(res){
			setTimeout(function(){
				Lgs.LMsg("您取消了分享");
			},300);
		},
		fail: function (res) {}
	});
	wx.onMenuShareQZone({
		title: $title,
		desc: $desc,
		link: $link,
		imgUrl: $shareImg,
		success: function (res) {
			shareOkClose();
		},
		cancel: function (res) { },
		fail: function (res) { }
	});
}


