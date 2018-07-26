// 竖屏提示层
declare var uprightTipsLayer:egret.Sprite;
/**信息展示 */
let gameInfoView:egret.Sprite;
/**数据提示 数据组 */
let LTipsArr = [];
let myDebug = true;

let myImg2:HTMLImageElement;

module Lgs
{
    // showloading();
    export function load1(){
        let waitLayer = new egret.Sprite();
        $gameStage.addChild(waitLayer);				
        let waitSHape = makeaShape(0x000000,0.4,[0,0,dw,dh]);
        waitLayer.addChild(waitSHape);
        /**loadingPoint */
        let loadPointArr = [];
        let pointRadius = gh*0.0055;
        let loadingRadius = gh*0.022;
        let loadingLayer = new egret.Sprite();
        waitLayer.addChild(loadingLayer);
        loadingLayer.x = gw/2 - gh*0.0025;
        loadingLayer.y = gh*0.436;
        for(let i=0;i<8;i++){
            let point1 = new egret.Shape();
            loadingLayer.addChild(point1);
            point1.graphics.beginFill(0xffffff);
            point1.graphics.drawCircle(0,0,pointRadius);
            point1.graphics.endFill();
            let point = xyFun2(Math.PI*2*((i+1)/8),loadingRadius,0,0);
            point1.x = point.x;
            point1.y = point.y;
            removedTweens(point1);
            loadPointArr.push(point1);
        }
        loadingLayer.visible = false;
        function loadingStart(){
            for(let i=0;i<loadPointArr.length;i++){
                let point1 = loadPointArr[i];
                removedTweens(point1);
                point1.alpha = 0.7;
                egret.Tween.get(point1).wait(i*130).call(function(){
                    egret.Tween.get(point1,{loop:true}).to({alpha:0.1},910);
                },this);
            }
        }
        loadingLayer.visible = true;
        loadingStart.call(this);
    }
    export function load2(){
        let waitLayer = new egret.Sprite();
        $gameStage.addChild(waitLayer);				
        let waitSHape = makeaShape(0x000000,0.4,[0,0,dw,dh]);
        waitLayer.addChild(waitSHape);
        /**loadingPoint */
        let loadPointArr = [];
        let pointRadius = gh*0.0055;
        let loadingLayer = new egret.Sprite();
        waitLayer.addChild(loadingLayer);
        loadingLayer.x = gw/2 - pointRadius*3*2;
        loadingLayer.y = gh*0.34;
        for(let i=0;i<5;i++){
            let point1 = new egret.Shape();
            loadingLayer.addChild(point1);
            point1.graphics.beginFill(0xffffff);
            point1.graphics.drawArc(0,0,pointRadius,0,Math.PI*2);
            point1.graphics.endFill();
            point1.x = pointRadius*3*i;
            removedTweens(point1);
            loadPointArr.push(point1);
        }
        // loadingLayer.visible = false;
        loadingStart.call(this);
        function loadingStart(){
            for(let i=0;i<loadPointArr.length;i++){
                let point1 = loadPointArr[i];
                removedTweens(point1);
                point1.alpha = 0.7;
                egret.Tween.get(point1,{loop:true}).wait(i*200).to({alpha:0},400).to({alpha:0.7},400).wait((4-i)*200);
            }
        }
    }
    /**飘云 */
    export function floatCloud():egret.Sprite {
        let cloudLayer = new egret.Sprite();
        // let clouddataArr = ["cloud1_png","cloud3_png","cloud2_png","cloud3_png"];
        let clouddataArr = ["home_cloud_png"];
        let cloudArr = [];
        for(let i=0;i<10;i++){
            let cloud1 = createBitmapByName(clouddataArr[0]);
            cloudLayer.addChild(cloud1);
            cloud1.x = gw*1/10*(i+1);
            cloud1.y = gh*0.3 + gh*Math.random()*0.15;
            cloudArr.push(cloud1);
        }
        cloudLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
        removedListener(cloudLayer,egret.Event.ENTER_FRAME,onframe,this);
        function onframe(){
            for(let i=0;i<cloudArr.length;i++){
                let cloud1 = cloudArr[i];
                cloud1.x -= gh*0.01*(cloud1.width/127);
            }
            for(let i=0;i<cloudArr.length;i++){
                let cloud1 = cloudArr[i];
                if(cloud1.x<pw_sx-GetWidth(cloud1)){
                    cloud1.x = gw-pw_sx;
                    cloud1.y = gh*0.3 + gh*Math.random()*0.15;
                }
            }
        }
        return cloudLayer;
    }
    /**addQR2 */
    export function addQR2(x:number,y:number,height:string,visible:boolean,qrUrl?:string):void {
        gameDiv = document.getElementsByClassName("egret-player")[0];  
        if($("#QR").attr("src")){
            myImg.style.display = 'none';
        }else{
            myImg = document.createElement("img");
            myImg.style.display = 'none';
        }
        if(qrUrl){ 
            myImg.src = qrUrl;   
        }else{
            myImg.src = $staticUrl+"/resource/assets/QR.png";
        }
        myImg2.id = "QR2";
        gameDiv.appendChild(myImg2);
        let timer = egret.setInterval(function(){
            IsQRloadComplete = QRloadComplete2(x,y,height);
            if(visible){
                myImg2.style.display = 'block';
            }else{
                myImg2.style.display = 'none';
            }
            if(IsQRloadComplete){
                egret.clearInterval(timer);
            }
        },this,33);
        /**返回QR是否加载完成 */
        function QRloadComplete2(x,y,height){
            if (document.getElementById('QR2')['complete']){
                setQRposition2(x,y,height);
                return true;
            }else{
                return false;
            }
        }

    }
    /**设置QR位置 */
    export function setQRposition2(x:number,y:number,height:string|any,visible?:boolean):void {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg2.width/myImg2.height;
        myImg2.style.height = height;

        var heightNum =(height.replace("%",""))/100;
        var widthNum = (heightNum*window.innerHeight)*w_h;
        myImg2.style.width = widthNum + "px";

        var left_x = window.innerWidth/2 - widthNum/2 + window.innerHeight*x;
        var left_y = window.innerHeight*y;
        myImg2.style.left = left_x +'px';
        myImg2.style.top = left_y +'px';
        myImg2.style.position = "absolute";
        if(visible){
            myImg2.style.display = 'block';
        }else{
            myImg2.style.display = 'none';
        }
    }
    /**提示锁定竖屏游戏 */
	export function uprightTipsFun():egret.Sprite {
        let uprightResultLayer = new egret.Sprite();
        uprightResultLayer.touchEnabled = true;

        // uprightResultLayer.rotation = 90;
        // uprightResultLayer.x = gw;

        let uprightShape = new egret.Shape();
        uprightResultLayer.addChild(uprightShape);
        uprightShape.graphics.beginFill(0x000000);
        uprightShape.graphics.drawRect(0,0,gw,gh);
        uprightShape.graphics.endFill();
        // let hengping = createBitmapByName("hengping_png");
        // uprightResultLayer.addChild(hengping);
        // hengping.x = gh/2 - GetWidth(hengping)/2;
        // hengping.y = gw/2 - GetHeight(hengping);

        let hpTipsField = new egret.TextField();
        uprightResultLayer.addChild(hpTipsField);
        textScaleFun(hpTipsField,0.07,0xffffff);
        hpTipsField.textAlign = "center";
        hpTipsField.text = "请锁定竖屏横置手机以获得最佳体验";/**\n 换行*/

        hpTipsField.x = gw/2 - GetWidth(hpTipsField)/2;
        hpTipsField.y = gh/2 - GetHeight(hpTipsField)/2 - gh*0.03;

		return uprightResultLayer;
	}
    /**弹窗动画 */
	export function winEnterAni(
        tcShape,winLayer,
        /** "scale01" "scale21" "up" "down" "right" "left" */
        aniStyle,callback?,thisObj?) {
        let shapeAlpha = tcShape.alpha;
        tcShape.alpha = 0;
        winLayer.alpha = 0;
        winLayer.width = gw;
        winLayer.height = gh;
        winLayer.anchorOffsetX = gw/2;
        winLayer.anchorOffsetY = gh/2;
        winLayer.x = gw/2;
        winLayer.y = gh/2;
        egret.Tween.get(tcShape).to({alpha:shapeAlpha},320,egret.Ease.quadOut);
        egret.Tween.get(winLayer).to({alpha:1},320,egret.Ease.quadOut);
        switch (aniStyle){
            case "scale01":
                winLayer.x = gw/2;
                winLayer.scaleX = winLayer.scaleY = 0;
                egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},320,egret.Ease.backOut).call(aniEndFun,thisObj);
                break;
            case "scale21":
                winLayer.x = gw/2;
                winLayer.scaleX = winLayer.scaleY = initScale*2;
                egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},320,egret.Ease.backOut).call(aniEndFun,thisObj);
                break;
            case "up":
                winLayer.y = gh*1.5;
                egret.Tween.get(winLayer).to({y:gh*0.5},370,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "down":
                winLayer.y = -gh*1.5;
                egret.Tween.get(winLayer).to({y:gh*0.5},370,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "left":
                winLayer.x = gw*1.5;
                egret.Tween.get(winLayer).to({x:gw*0.5},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "right":
                winLayer.x = -gw*1.5;
                egret.Tween.get(winLayer).to({x:gw*0.5},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "fadeIn":
                winLayer.alpha = 0;
                egret.Tween.get(winLayer).to({alpha:1},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
        }
        function aniEndFun(){
            if(callback){
                callback.call(thisObj);
            }   
        }
	}
	export function winCloseAni(tcShape,winLayer,aniStyle,callback?:any,thisObj?,delay?:number) {
            let delaynum = 0;
            delay?delaynum=delaynum:delaynum=0;
            egret.Tween.get(tcShape).wait(delaynum).to({alpha:0},320);
            egret.Tween.get(winLayer).wait(delaynum).to({alpha:0},320);
            switch (aniStyle){
                case "scale01":
                    egret.Tween.get(winLayer).wait(delaynum).to({scaleX:0,scaleY:0},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "scale21":
                    egret.Tween.get(winLayer).wait(delaynum).to({scaleX:2,scaleY:2},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "up":
                    egret.Tween.get(winLayer).wait(delaynum).to({y:-gh},370,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "down":
                    egret.Tween.get(winLayer).wait(delaynum).to({y:gh},370,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "left":
                    egret.Tween.get(winLayer).wait(delaynum).to({x:-gw},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "right":
                    egret.Tween.get(winLayer).wait(delaynum).to({x:gw},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "fadeOut":
                    egret.Tween.get(winLayer).wait(delaynum).to({alpha:0},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                    break;
            }
            function aniEndFun(){
                if(callback){
                    callback.call(thisObj);
                }
            }
	}
    /**仅支持Bitmap的Btn2的闪光按钮模型2 */
	export function BtnMode2(obj:egret.Bitmap,notBtn?:boolean) {
        let thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width/2;
        obj.anchorOffsetY = obj.height/2;
        obj.x =  obj.x + GetWidth(obj)/2;
        obj.y =  obj.y + GetHeight(obj)/2;

        let Btn33 = createBitmapByName("Btn33_png");
        scaleFun(Btn33,GetHeight(obj)/gh);
        obj.parent.addChild(Btn33);
        let obj2 = new egret.Bitmap();
        obj2.texture = obj.texture;
        obj2.scaleX = obj2.scaleY = thisScale*0.95;
        obj.parent.addChild(obj2);
        obj2.anchorOffsetX = obj.anchorOffsetX;
        obj2.anchorOffsetY = obj.anchorOffsetY;
        obj2.x = obj.x;
        obj2.y = obj.y - GetHeight(obj)*0.05;
        Btn33.mask = obj2;
        Btn33.x = obj2.x - GetWidth(obj)/2-GetWidth(Btn33);
        Btn33.y = obj2.y - GetHeight(obj)/2;
        Btn33.alpha = 0.7;

        removedTweens(Btn33);
        egret.Tween.get(Btn33,{loop:true})
        .wait(1000)
        .to({x:obj.x+GetWidth(obj)/2},1000);

        obj.once(egret.Event.REMOVED_FROM_STAGE,function(){
            LremoveChild(obj2);
            LremoveChild(Btn33);            
        },obj);

        if(!notBtn){
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
                egret.Tween.get(obj).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
                .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
                egret.Tween.get(obj2).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
                .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
            },this);
        }

	}
    /**LInfoView 信息展示 debug,
     * textArr = [[数据名称,数据的值],[数据名称,数据的值]];
    */
    export function LInfoView(textArr:any[]){
        if(gameInfoView&&gameInfoView.parent){
            gameInfoView.parent.removeChild(gameInfoView);
        }
        gameInfoView = new egret.Sprite();
        GameLayer.addChild(gameInfoView);
        // gameInfoView.touchEnabled = true;

        let tsShape = new egret.Shape();
        gameInfoView.addChild(tsShape);
        tsShape.graphics.beginFill(0x000000);
        tsShape.graphics.drawRect(0,0,gw,gh);
        tsShape.graphics.endFill();
        tsShape.alpha = 0;

        let tsBox = new egret.Sprite();
        gameInfoView.addChild(tsBox);
        let tsbg = new egret.Shape();
        tsBox.addChild(tsbg);
        for(let i=0;i<textArr.length;i++){
            let tsText = new egret.TextField();
            tsText.text = textArr[i][0]+":";
            textScaleFun(tsText,0.022,0x333333);
            // tsText.textAlign = "center";
            // tsText.width = gh*0.38;
            tsText.x = 0;
            tsText.y = gh*0.03*i;
            tsBox.addChild(tsText);

            let tsText2 = new egret.TextField();
            tsText2.text = textArr[i][1]+"";
            textScaleFun(tsText2,0.022,0x333333);
            // tsText2.textAlign = "center";
            // tsText2.width = gh*0.38;
            tsText2.x = tsText.x + GetWidth(tsText) + gh*0.01;
            tsText2.y = tsText.y;
            tsBox.addChild(tsText2);
        }
        tsbg.graphics.beginFill(0xFFBC01);
        tsbg.graphics.drawRect(0,0,GetWidth(tsBox) + gh*0.025,GetHeight(tsBox) + gh*0.025);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.8;
        tsbg.x = -gh*0.025/2;
        tsbg.y = -gh*0.025/2;
        tsBox.x = gw - GetWidth(tsbg)+gh*0.025/2;
        tsBox.y = gh*0.025/2;

	}
    /**LTips 数据提示 debug*/
    export function LTips(obj:any,objName?:string,callback?:Function){
        if(!myDebug){
            return false;
        }
        let tsLayer = new egret.Sprite();
        GameLayer.parent.addChild(tsLayer);
        tsLayer.touchEnabled = true;

        let tsText = new egret.TextField();
        if(objName){
            tsText.text = objName+":"+obj+" >> "+typeof(obj);
        }else{
            tsText.text = obj+" >> "+typeof(obj);            
        }
        textScaleFun(tsText,0.022,0xffffff);
        tsText.textAlign = "center";
        tsText.width = gh*0.38;
        tsText.x = gw/2 - GetWidth(tsText)/2;
        tsText.y = 10;

        let tsbg = new egret.Shape();
        tsLayer.addChild(tsbg);
        tsbg.graphics.beginFill(0xff0000);
        tsbg.graphics.drawRect(0,0,gw,GetHeight(tsText) + 20);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.85;
        tsbg.x = gw/2 - GetWidth(tsbg)/2;
        tsLayer.addChild(tsText);
        if(LTipsArr.length>0){
            tsLayer.y = LTipsArr[LTipsArr.length-1].y + GetHeight(LTipsArr[LTipsArr.length-1]);
        }
        LTipsArr.push(tsLayer);

        tsLayer.touchEnabled = true;
        tsLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
            tsLayer.parent.removeChild(tsLayer);
            if(callback){
                callback.call(this);
            }
            for(let i=0;i<LTipsArr.length;i++){
                let thiscue = LTipsArr[i];
                if(thiscue.hashCode==tsLayer.hashCode){
                    LTipsArr.splice(i,1);
                }
            }
            for(let i=0;i<LTipsArr.length;i++){
                let thiscue = LTipsArr[i];
                if(i==0){
                    thiscue.y = 0;
                }else{
                    thiscue.y = LTipsArr[i-1].y + GetHeight(LTipsArr[i-1]);
                }
            }
        },this);
	}    
}