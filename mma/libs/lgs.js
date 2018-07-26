var canMusic = true;
var iszhp = true;
var $nickName = "Pig黄小米";
var $headImg = "headimg.jpg";
var $staticUrl = "";
var $qrUrl = "resource/assets/QR.jpg";
var $haveMobile = false;

var IsZhuli = false;
var $serverBaseUrl='server/';

var canvasMaxwidth = 825;
var canvasMaxheight = 825;
var dh = 1206;
var dw = window.innerWidth*(1206/window.innerHeight);
var gh = dh;
var gw = dw;
if(window.innerWidth/window.innerHeight<0.616){
    dw=750;
    gw=dw;
    dh=window.innerHeight*(750/window.innerWidth);
}else if(window.innerWidth/window.innerHeight>canvasMaxwidth/1206){
    dw=canvasMaxwidth;
    gw=dw;
}
var pw_sx=0;
var pw_sy=(gh-dh)/2;
var ph = window.innerHeight;
var pw = window.innerWidth;
// -webkit-overflow-scrolling: touch;
var WeixinJSBridgeReady_OK = false;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var $gameStage;
var bgmViewer;
var localbgmStr = "mmabgm";
pwsxFun();
$(function(){
    u = navigator.userAgent;
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        $("html,body").css("background","#1B1B1F");
    }else{
        $("html,body").css("background","#393A3F");
    }
    FastClick.attach(document.body);
    pwsxFun();
    /**使用 监听手机旋转 解决安卓弹出键盘 导致 窗口变小的问题 */
    window.onorientationchange = function(){ // window.onresize = function(){
        setTimeout(function(){
            // onResizeFun();
            pwsxFun();
            bgmViewer.setinitPosition();
        },320);
    }
    var ISweixn = is_weixn();
    var bgmDom = document.getElementById("bgm");
    if(localStorage.getItem(localbgmStr)!="pause"){
        if(localStorage.getItem(localbgmStr)==null)
            localStorage.setItem(localbgmStr,"play");
    }
    var bgmPlay=localStorage.getItem(localbgmStr);
    if (ISweixn) {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridgeReady_OK = true;
            if(typeof WeixinJSBridge != undefined){
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    stopOtherAudio();
                    if(bgmPlay=="play"&&bgmDom)bgmDom.play();
                });
            }else{
                stopOtherAudio();
                if(bgmPlay=="play"&&bgmDom)bgmDom.play();
            }
        });
    }else{
        stopOtherAudio();
        if(bgmPlay=="play"&&bgmDom)bgmDom.play();
    }
});
/**canvas起点x设定 */
function pwsxFun(){
	ph = window.innerHeight;
	pw = window.innerWidth;
    if($(".egret-player").attr("data-scale-mode")=="showAll"){
        pw_sx = 0;
        if($(".egret-player").attr("data-content-width")=="750"){
            gw = 750;
            gh = 1206;
        }
        return;
    }

    // if(pw<=ph) pw_sx = (canvasMaxwidth-(canvasMaxheight*(pw/ph)))/2;
    // if(pw> ph) pw_sx = (canvasMaxwidth-(canvasMaxheight*(ph/pw)))/2;
}
/**lsg2 muscic*/
    function playAudio(id,audion_st,noTouch){
        /**无声版本 */
        // return;
        if(!canMusic) return;
        var obj = document.getElementById(id);
        if(isAndroid){
            obj.volume=1;
        }
        /** 正常点击版本*/
        if(typeof(audion_st)=="number"){
            if(obj)obj.currentTime = audion_st;
        }
        if(noTouch){
            if(obj)obj.play();
            return;
        }
        /**微信强制播放音乐版本 */
        if (WeixinJSBridgeReady_OK) {
            if(typeof WeixinJSBridge != undefined){
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    if(obj)obj.play();
                });
            }else{
                if(obj)obj.play();
            }
        }else{
            if(obj)obj.play();
        }
    }

    function stopAudio(id){
        var obj = document.getElementById(id);
        if(obj)obj.pause();
    }
    function stopOtherAudio(id){
        $("audio").each(function(){  		
            if(id){
                if ($(this).attr('id')!=id) {
                    $(this)[0].currentTime = 0;
                    $(this)[0].pause();    		
                };
            }else{
                $(this)[0].currentTime = 0;
                $(this)[0].pause();
            }
        });
    };
/**lgs4 通用方法 */
    //公共弹窗
    function alertp(text){
        if(!$('.alertp').size()){
            $('body').append('<div class="alertp style="display: none;">'
            +'<div class="alertpBox">'
            +'<div class="alertpTitle">提示</div>'
            +'<p><span>'+text+'</span><a class="alertp_close" href="javascript:void(0);"></a></p>'
            +'</div>'
            +'</div>');
        }else{
            $('.alertp p span').html(text);
            $('.alertp').fadeIn(120);
        }
    }
    $(document).on('click','.alertp_close',function(){
        $('.alertp').fadeOut(120);
    });
    function checkPhone(s) {
        var myreg = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
        if (!myreg.test(s)) {
            return false;
        } else {
            return true;
        }
    };
    function is_weixn(){  
        var ua = navigator.userAgent.toLowerCase();  
        if(ua.match(/MicroMessenger/i)=="micromessenger") {  
            return true;  
        } else {  
            return false;  
        } 
        return false;
    }
    /**nS时间戳 */
    function getLocalTime(nS) {
        return new Date(parseInt(nS));
    }
    /**now:Date 返回 2017年8月19日 12:18:35 */
    function formatDate(now) {
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 
        // console.log(year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second);
        return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second; 
        // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    } 
    /**获取至截止日期的剩余时间 num：时间戳 */
    function getCount(num){
        var sec = Math.floor(num/1000);
        var min = Math.floor(sec/60);
        var hour = Math.floor(min/60);
        var day = Math.floor(hour/24);
        if(day>0){
            return day + "天";
        }else{
            if(hour>0){
                return hour + "小时";
            }else{
                if(min>0){
                    return min + "分钟";
                }else{
                    return sec + "秒"; 
                }        
            }
        }
    }
    /**生成随机码 */
    function randomString(len){
        var len = len || 6;
        var str = 'ABCDEFGHJKMNPQRSTWXYZ2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var tmp = '';
        for(var i=0; i<len; i++) {
            tmp += str.charAt(Math.round(Math.random()*str.length));
        }
        return tmp;
    }
    /**生成16位用户身份证明 */
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
/**lgs5 遮罩 提示横屏玩耍/锁定竖屏横置玩耍 */
    var uprightTipsLayer;
    var ISgameing = false;
    /**横竖屏切换 */
    function onResizeFun(){
        // if(ISgameing){
            setTimeout(function(){
                if(window.innerWidth<window.innerHeight){
                    uprightTipsLayer.visible = false;
                    // window.location.href=window.location.href + "?t=" + new Date().getTime();
                    // location.replace(window.location.href);
                }else{
                    uprightTipsLayer.visible = true;
                }
            },100);
        // }
    }
    // window.onresize = function(){
    //     onResizeFun();
    // };
/**ajaxLoading */
    function showAjaxLoading(title){
        if($('#ajax_loading').size()<1){
            $('body').append('<section class="ajax_loading" id="ajax_loading"><div class="ajax_loading_box"><p></p></div></section>');
        }
        if(!title) title="";
		$('#ajax_loading').find('p').text(title);
        $('#ajax_loading').show();
    }
    function hideAjaxLoading(){
        $('#ajax_loading').hide();
    }
//重写alert方法，去掉地址显示
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }

//重写confirm方法，去掉地址显示
    window.confirm = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var result = window.frames[0].window.confirm(name);
        iframe.parentNode.removeChild(iframe);
        return result;
    }
//重写alert方法，自定义样式
    // window.alert=function(txt){
    // if($('#alertPop').size()<1){
    //     $('body').append('<div class="pop alertPop" id="alertPop"><div class="page_content pop_container"><div class="pop_wrapper"><div class="pop_main"><a href="javascript:void(0);" class="pop_close"><i></i><i></i></a><p class="pop_txt"></p></div></div></div></div>');
    //     $(".pop_close").on("click",function(){
    //         $("#alertPop").hide();
    //     });
    // }
    // if(txt){
    //     $('#alertPop .pop_txt').html(txt);
    // }else{
    //     $('#alertPop .pop_txt').html('');      
    // }
    // $('#alertPop').show();  
    // };
// 获取url指定后缀的值
    function getQueryStringByName(name){
        var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1){
            return "";
        }
        return result[1];
    }
// 本地缓存localStorage
	// if(window.localStorage){
	// 	console.log('This browser supports localStorage');
	// }else{
	// 	console.log('This browser does NOT support localStorage');
	// }
	// var storage = window.localStorage;
	// // localStorage.sponsorId = 99;
	// // localStorage["sponsorId"] = "99";
	// // localStorage.setItem("sponsorId","99");
	// // var sponsorId = localStorage.getItem("sponsorId");
	// // localStorage.removeItem("sponsorId");

	// if (!storage.getItem("sponsorId")) storage.setItem("sponsorId",0);
	// storage.sponsorId = parseInt(storage.getItem("sponsorId"));//必须格式转换
	// 如果值不为"number"++
	// if (typeof(storage.sponsorId)!=="number") {
	// 	storage.setItem("sponsorId",0);
	// 	storage.sponsorId = parseInt(storage.getItem("sponsorId"));//必须格式转换
	// }else{
	// 	storage.sponsorId = parseInt(storage.getItem("sponsorId"));//必须格式转换
	// }

	// var sponsorID = storage.sponsorId;
	// // storage.setItem("sponsorId",sponsorID);

	// showStorage();
	// function showStorage(){
	// 	for(var i=0;i<storage.length;i++){
	// 	 //key(i)获得相应的键，再用getItem()方法获得对应的值
	// 	 // document.write(storage.key(i)+ " : " + storage.getItem(storage.key(i)) + "<br>");
	// 	 console.log(storage.key(i)+": "+storage.getItem(storage.key(i)));
	// 	}
	// }
	// localStorage.clear();

// 强行更改ios微信title
	// var $body = $('body');
	// document.title = '我用时'+(ss4*10+ss3)+'分'+(ss2*10+ss1)+'秒挑战郭長霖3局，你服不服，不服你也来挑战！';
	// var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	// $iframe.on('load',function() {
	//   setTimeout(function() {
	//       $iframe.off('load').remove();
	//   }, 0);
	// }).appendTo($body);
// 是否微信 js
	// function is_weixn(){
	//     var ua = navigator.userAgent.toLowerCase();
	//     if(ua.match(/MicroMessenger/i)=="micromessenger") {
	//         return true;
	//     } else {
	//         return false;
	//     }
	// }
// 是否微信 php
	// function is_weixin(){
	//     if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
	//             return true;
	//     }
	//     return false;
	// }
/**判断是否为整数 */
    function isInteger(obj) {
        return typeof obj === 'number' && obj%1 === 0;
    }


