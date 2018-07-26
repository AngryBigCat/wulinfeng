//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
class Main extends egret.DisplayObjectContainer {
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: Lgs.loadUI;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        $gameStage = this.stage;
        /**二维码 */
        Lgs.addQR(0,0.679,"12%",false);
        // Lgs.addQR2(0.059,0.66,"12%",false);
        /**背景层 */
        let GamebgLayer = new egret.Sprite();
        this.stage.addChild(GamebgLayer);
        /**游戏层 */
        GameLayer = new egret.Sprite();
        this.stage.addChild(GameLayer);
        GameLayer.width = gw;
        GameLayer.height = gh;
        GameLayer.x = dw/2 - gw/2;
        GameLayer.y = dh/2 - gh/2;
        /**主要区域显示范围 */
        // let GameShape = new egret.Shape();
        // this.stage.addChild(GameShape);
        // GameShape.graphics.lineStyle(8,0xff0000,0.7);
        // GameShape.graphics.drawRect(pw_sx,-pw_sy,gw,gh);
        // GameShape.graphics.endFill();
        // GameShape.alpha = 0.5;
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new Lgs.loadUI();
        GameLayer.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.MyLoadGroups, this);
        /**允许跨域 */
        egret.ImageLoader.crossOrigin = "anonymous";
        RES.loadConfig($staticUrl+"resource/default.res.json", $staticUrl+"resource/");
		/**心跳startTick 测试 */
			// // egret.startTick(aaa,this);
			// this.addEventListener(egret.Event.ENTER_FRAME,aaa,this);
			// function aaa(a){
			// 	console.log(a);
			// 	// return true;
			// 	return false;
			// }
			// egret.setTimeout(function(){
			// 	// egret.stopTick(aaa,this);
			// 	this.removeEventListener(egret.Event.ENTER_FRAME,aaa,this);
			// },this,1000);
		/**显示浏览器帧频 */
			// window.requestAnimationFrame;
			// var showFPS = (function(){ 
			// 	var requestAnimationFrame =  
			// 		window.requestAnimationFrame || //Chromium  
			// 		window.webkitRequestAnimationFrame || //Webkit 
			// 		// window.mozRequestAnimationFrame || //Mozilla Geko 
			// 		// window.oRequestAnimationFrame || //Opera Presto 
			// 		// window.msRequestAnimationFrame || //IE Trident? 
			// 		function(callback) { //Fallback function 
			// 		window.setTimeout(callback, 1000/60); 
			// 		}; 
			// 	var e,pe,pid,fps,last,offset,step,appendFps; 
			
			// 	fps = 0; 
			// 	last = Date.now(); 
			// 	step = function(){ 
			// 		offset = Date.now() - last; 
			// 		fps += 1; 
			// 		if( offset >= 1000 ){ 
			// 		last += offset; 
			// 		appendFps(fps); 
			// 		fps = 0; 
			// 		} 
			// 		requestAnimationFrame( step ); 
			// 	}; 
			// 	//显示fps; 如果未指定元素id，默认<body>标签 
			// 	appendFps = function(fps){ 
			// 		if(!e) e=document.createElement('span'); 
			// 		pe=pid?document.getElementById(pid):document.getElementsByTagName('body')[0]; 
			// 		e.innerHTML = "fps: " + fps; 
			// 		pe.appendChild(e);
			// 		$("span").css({
			// 			"position":"absolute",
			// 			"top":"2%",
			// 			"left":"2%",
			// 			color:"#ff0000"
			// 		});
			// 	} 
			// 	return { 
			// 		setParentElementId :  function(id){pid=id;}, 
			// 		go                 :  function(){step();} 
			// 	} 
			// })(); 
			// showFPS.go();
    }
    private loadGroupArr:any;
    private loadTextArr:any;
    private loadTimes:number;
    private MyLoadGroups(event: RES.ResourceEvent){
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.MyLoadGroups, this);
        // if(IsZhuli){
        //     this.loadGroupArr = ['loadUI','preload2'];
        // }else{
        //     this.loadGroupArr = ['loadUI','preload'];
        // }
        this.loadGroupArr = ['loadUI','preload'];
        this.loadTextArr = [
            '',
            ''
        ];
        this.loadTimes = 0;
        this.onConfigComplete(event);
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        let thisGroupName = "loadUI";
        thisGroupName = this.loadGroupArr[this.loadTimes];
        RES.loadGroup(thisGroupName);
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if(event.groupName == "loadUI"){
            this.loadingView.createLoading();
            // 添加Ajax加载样式
            loadingScreen = new Lgs.LScreen();
            this.stage.addChild(loadingScreen);
            Lgs.hideloading();
        }
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadTimes ++;
            console.log(this.loadTimes);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            if(this.loadTimes < this.loadGroupArr.length){
                this.onConfigComplete(event);
            }else{
                Lgs.showloading();
                Lgs.getWxUserInfoAjax(function(data){
                // getWxUserInfoAjax(function(data){
                    Lgs.hideloading();
                    matchImgs = data.matchImgs;
                    $('.swiper-container-s2 img').attr('src', matchImgs[0]);

                    // $haveMobile = data.mobile;
                    $nickName = data.nickName;
                    $headImg = data.headImg;
                    $cid = parseInt(data.cid);
                    openGame1 = data.firstgame;
                    cacheGameScene.call(this);
                },function(data){
                    Lgs.hideloading();
                    Lgs.LMsg(data.msg);
                },this);
            }
        }
    /** */
        function cacheGameScene(){
        /**应用于有 少量 html图片的情况 */
            let _THIS = this;
            $.ajax({
                type: 'GET',
                url: $staticUrl+'images/res.json',
                dataType:'json',
                cache:false,
                success: function(data) {
                    var i=0;
                    this.loadingView
                    _THIS.loadRes.call(_THIS,data['index'],i,function(index){
                        Lgs.LremoveChild(_THIS.loadingView);
                        Res_ok = true;
                        _THIS.createGameScene();
                    });
                }
            });
        /**正常 */
            // Lgs.LremoveChild(this.loadingView);
            // Res_ok = true;
            // this.createGameScene();
        }
    }

    /**html图片加载方式 */
    private loadRes(datas,index,callback){
        let _THIS = this;
        if(datas[index].type=='image'){
            var image=new Image();
            image.src=datas[index].src;
            image.onload=function(){
                loadSuccess.call(_THIS);
            }
            image.onerror=function(){
                alert('文件'+datas[index]+'加载失败');
            };       
        }else if(datas[index].type=='audio'){
            var audio = new Audio();
            audio.src = datas[index].src;
            audio.onloadedmetadata = function(){        
                loadSuccess.call(_THIS);
            };
            audio.onerror=function(){
                alert('文件'+datas[index]+'加载失败');
            }
        }
        function loadSuccess(){
            _THIS.loadingView.setProgress(index+1+_THIS.loadingView.total,_THIS.loadingView.total, "正在加载音效...");
            if(index<datas.length-1){
                _THIS.loadRes.call(_THIS,datas,(index+1),callback);
            }else if(index==datas.length-1){
                if(callback){
                    callback.call(_THIS,index);
                }
            }
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal, this.loadTextArr[this.loadTimes]);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public createGameScene() {
        egret.MainContext.instance.stage.maxTouches = 1;
        /**音乐按钮 */
        bgmViewer = new Lgs.LBgm();
        this.stage.addChild(bgmViewer);
        // bgmViewer.visible = false;

        // if(IsZhuli){
        //     // let gameLayer = new Lgs.zhuliPage();
        //     // GameLayer.addChild(gameLayer);
        // }else{
        //     // let gameLayer = new Lgs.LHomePage();
        //     // GameLayer.addChild(gameLayer);    
        // }
        let gameLayer = new Lgs.LHomePage();
        GameLayer.addChild(gameLayer);

        /**判断是否可以领奖 */
            // if(this.achieve){
            //     if(this.mobile){
            //         let gameLayer = new Lgs.LHomePage();
            //         GameLayer.addChild(gameLayer);
            //         Lgs.LAlert("您已提交信息，请等待奖品送达~");
            //     }else{
            //         this.getPrize(function(){
            //             let gameLayer = new Lgs.LHomePage();
            //             GameLayer.addChild(gameLayer);
            //         },this);
            //     }
            // }else{
            //     let gameLayer = new Lgs.LHomePage();
            //     GameLayer.addChild(gameLayer);
            // }
        /**游戏界面 */
            // let startData = {
            //     "scode":111,
            //     "gameCode":222,
            //     "firstgame":1
            // }
            // let gameLayer = new Lgs.GameContainer(startData);
            // GameLayer.addChild(gameLayer);
        /**需要旋转 */
            // let GameContainerLayer;
            // if(iszhp){
            // /**横屏模式1 */
            // 	GameContainerLayer = new Lgs.GameContainer();
            // 	GameLayer.addChild(GameContainerLayer);
            // 		GameContainerLayer.rotation = 90;
            // 		GameContainerLayer.x = gw;

            // 	// GameContainerLayer.x = gw*2;

            // 	// let gameMask = new egret.Shape();
            // 	// GameLayer.addChild(gameMask);
            // 	// gameMask.graphics.beginFill(0x000000);
            // 	// gameMask.graphics.drawRect(0,0,gw,gh);
            // 	// gameMask.graphics.endFill();
            // 	// gameMask.x = gw;
            // 	// GameContainerLayer.mask = gameMask;

            // 	// egret.Tween.get(GameContainerLayer).wait(50).to({x:gw},400);
            // 	// egret.Tween.get(gameMask).wait(50).to({x:0},400).call(function(){
            // 	// 	GameLayer.removeChild(gameMask);
            // 	// 	GameContainerLayer.mask = null;
            // 	// },this);
            // }else{
            // /**横屏模式2 */
            // 	GameContainerLayer = new Lgs.GameContainer();
            // 	GameLayer.addChild(GameContainerLayer);
            // 		GameContainerLayer.rotation = -90;
            // 		GameContainerLayer.x = 0;
            // 		GameContainerLayer.y = gh;

            // 	// GameContainerLayer.x = gw;

            // 	// let gameMask = new egret.Shape();
            // 	// GameLayer.addChild(gameMask);
            // 	// gameMask.graphics.beginFill(0x000000);
            // 	// gameMask.graphics.drawRect(0,0,gw,gh);
            // 	// gameMask.graphics.endFill();
            // 	// gameMask.x = gw;
            // 	// GameContainerLayer.mask = gameMask;

            // 	// egret.Tween.get(GameContainerLayer).wait(50).to({x:0},400);
            // 	// egret.Tween.get(gameMask).wait(50).to({x:0},400).call(function(){
            // 	// 	GameLayer.removeChild(gameMask);
            // 	// 	GameContainerLayer.mask = null;
            // 	// },this);
            // }

            // egret.Tween.get(this).wait(50).to({x:-gw},400)
            // .call(function(){
            //     Lgs.LremoveChild(this)
            //     Lgs.hideloading();
            // },this);
        /**结果界面 */
            // let resultData = {
            //     ls:100,
            //     cs1:18-10,
            //     cs2:25-10,
            //     cs3:150-50,
            //     cs4:200-80,
            // }
            // let gameLayer = new Lgs.resultPage(resultData);
            // GameLayer.addChild(gameLayer);
        /**其他 */
        this.stage.setChildIndex(loadingScreen,this.stage.numChildren);
        /**横竖屏提示 */
        // uprightTipsLayer = Lgs.uprightTipsFun();
        // this.stage.addChild(uprightTipsLayer);
        // // uprightTipsLayer.visible = false;
        // if(window.innerWidth>window.innerHeight){
        //     uprightTipsLayer.visible = false;
        // }
        // this.stage.setChildIndex(uprightTipsLayer,this.stage.numChildren);
    /** */
        // 是否iPhoneX
        // if(!(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375))){
        //     Lgs.LMsg("not iPhoneX");
        // }
        this.stage.addEventListener(egret.Event.ACTIVATE,()=>{
            // alert("app 进入前台");
            if(egret.localStorage.getItem(localbgmStr)!="pause"){
                bgmViewer.play();
            }
        },this);
        this.stage.addEventListener(egret.Event.DEACTIVATE,()=>{
            // alert("app 进入后台");
            bgmViewer.pause();
        },this);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
