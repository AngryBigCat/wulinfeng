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
// 开始游戏 参数：无
function startGameAjax(callback,errorcallback,thisObj){
	var data = {
		"firstgame":1,
		"scode":0,
		"gcode1":5*12,
		"gcode2":4*13,
		"success":1,
	}
	if(callback) callback.call(thisObj,data);
}
// 结束游戏 参数：data
function endGameAjax(data,callback,errorcallback,thisObj){
	var data = {
		"myRank":2,
		"success":1,
	}
	if(callback) callback.call(thisObj,data);
}
//ok get  获取排行榜
function getRanklistAjax(callback,errorcallback,thisObj){
	let data = {
		player:{
			"topScore":10,
			"playerRank":365
		},
		ranklist:[
			{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			},{
				topScore:100,
				nickName:"黄小米",
				headImg:"headimg.jpg",
				useTime:1000
			}
		]
	}
	if(callback) callback.call(thisObj,data);
}

function setInfoAjax(userInfo,callback,errorcallback,thisObj){
	let data = {

	}
	if(callback) callback.call(thisObj,data);
}

function getWxUserInfoAjax(callback,errorcallback,thisObj){
	let data = {
		headImg:"headimg.jpg",
		nickName:"Pig黄小米",
		cid:2,
		matchImgs:[
			"images/sc1.png",
			"images/sc2.png",
			"images/sc3.png",
			"images/sc4.png"
		]
	}
	if(callback) callback.call(thisObj,data);
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
	$title='勇攀423'; // 分享标题
	$desc='【民盈·国贸中心】东莞新地标，勇攀423，跟好朋友一起，快来抢新年大礼包，豪礼不间断！！！'; // 分享文案
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


