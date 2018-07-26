/**
 * Created by Lgs on 17-8-23.
 */
/**是否是开始游戏 */
declare var ISgameing:boolean;
/**游戏加载是否完成 */
// var Res_ok = false;
declare var Res_ok;
declare var $gameStage:egret.Stage;
let loadingScreen:Lgs.LScreen;

declare var isAndroid:boolean;
declare var isiOS:boolean;
declare var $;
declare var pw;
declare var ph;
declare var pw_sy;
declare var pw_sx;

declare var TweenMax;

declare var dw;
declare var dh;
declare var gw;
declare var gh;
let initScale:number = gh/1206;
/**游戏底层 */
let GameLayer:egret.Sprite;
declare var gameDiv;
let myImg:HTMLImageElement;
// -webkit-overflow-scrolling: touch;
let IsQRloadComplete = false;
// let bgmViewer:Lgs.LBgm;
declare var bgmViewer:Lgs.LBgm;
// let touchPointID; ???
/**nS时间戳 返回Date */
declare function getLocalTime(nS:number);
/**date:Date 返回 2017年8月19日 12:18:35 */
declare function formatDate(date:Date);
/**获取至截止日期的剩余时间 num：时间戳 */
declare function getCount(num);

let LMsgArr = [];
let oldLMsgArr = [];
module Lgs
{
    export function encbase64(contentObj){
        let originalStr: string = JSON.stringify(contentObj);
        // console.log("原始josn字符串" + originalStr);
        let bytes: egret.ByteArray = new egret.ByteArray();
        bytes.writeUTFBytes(originalStr);
        let out: string = egret.Base64Util.encode(bytes.buffer);
        // console.log("编码后的文字：" + out);
        return out;
    }
    export function decbase64(out){
        let arrayBuffer: ArrayBuffer = egret.Base64Util.decode(out);
        let messageBytes: egret.ByteArray = new egret.ByteArray(arrayBuffer);
        messageBytes.position = 0;
        // console.log("解码后的文字：" + messageBytes.readUTFBytes(messageBytes.length));
        return messageBytes.readUTFBytes(messageBytes.length);
    }
    /**LMsg 消息提示*/
    export function LMsg(text:string,callback?,thisObj?){
        if(oldLMsgArr.length==0){
            let tsLayer = new egret.Sprite();
            $gameStage.addChild(tsLayer);

            let tsBox = new egret.Sprite();
            tsLayer.addChild(tsBox);

            let tsText = new egret.TextField();
            textScaleFun(tsText,0.028,0xffffff);
            tsText.text = text;
            tsText.stroke = 4;
            tsText.bold = true;
            tsText.strokeColor = 0x111111;
            tsText.textAlign = "center";
            tsText.width = gh*0.38;
            tsBox.addChild(tsText);
            tsLayer["tsText"] = tsText;

            tsLayer.x = gw/2 - GetWidth(tsLayer)/2;
            tsLayer.y = gh*0.38;
            let tsLayery = tsLayer.y;
            tsLayer.alpha = 0;

            LMsgArr.push(tsLayer);

            egret.Tween.get(tsLayer).wait(280).to({y:tsLayery-gh*0.05},2000,egret.Ease.quadOut);
            egret.Tween.get(tsLayer).to({alpha:1},280).wait(1700).to({alpha:0},300,egret.Ease.quadOut)
            .call(function(){
                tsLayer.visible = false;
                LMsgArr.splice(0,1);
                oldLMsgArr.push(tsLayer);
            },this);
        }else{
            // &&LMsgArr.length>3
            let tsLayer = oldLMsgArr[0];
            // $gameStage.stage.addChild(tsLayer);
            // $gameStage.stage.setChildIndex(tsLayer,0);
            oldLMsgArr.splice(0,1);
            LMsgArr.push(tsLayer);

            tsLayer["tsText"].text = text;
            tsLayer.x = gw/2 - GetWidth(tsLayer)/2;
            tsLayer.y = gh*0.38;
            let tsLayery = tsLayer.y;
            tsLayer.alpha = 0;
            tsLayer.visible = true;

            egret.Tween.get(tsLayer).wait(280).to({y:tsLayery-gh*0.05},2000,egret.Ease.quadOut);
            egret.Tween.get(tsLayer).to({alpha:1},280).wait(1700).to({alpha:0},300,egret.Ease.quadOut)
            .call(function(){
                LMsgArr.splice(0,1);
                oldLMsgArr.push(tsLayer);
            },this);
        }
        egret.setTimeout(function(){
            if(callback){
                callback.call(thisObj);
            }
        },this,800);
	}
    export function showloading(txt?:string){
        if(!txt) txt="";
        loadingScreen.loadingShow(txt);
    }
    export function hideloading(){
        loadingScreen.loadingHide();
    }
    /**正常版本 LAlert 弹出提示*/
    export function LAlert(text:number|string,callback?:Function,thisObj?:egret.DisplayObjectContainer){
            let alertLayer = new egret.Sprite();            
            $gameStage.addChild(alertLayer);
            alertLayer.touchEnabled = true;

            let alertShape = makeaShape(0x000000,0.4,[0,0,dw,dh]);
            alertLayer.addChild(alertShape);
        /**alert弹窗 */
            let alertBox = new egret.Sprite();
            alertLayer.addChild(alertBox);
            let textWidth = gh*0.38;
            let popWidth = gh*0.38 + gh*0.08;
        /**alert弹窗文本 */
            let alertText = new egret.TextField();
            textScaleFun(alertText,gh*0.0225/gh,0x222222);
            alertText.width = textWidth;
            alertText.textAlign = "center";
            alertText.lineSpacing = gh*0.01;
            alertText.text = text+"";
            alertText.x = popWidth/2 - GetWidth(alertText)/2;
            alertText.y = gh*0.04;
            let popHeight = GetHeight(alertText)+gh*0.08;
        /**alert弹窗文本"背景"以及它的mask */
            let bgmask = new egret.Shape();
            alertBox.addChild(bgmask);
            bgmask.graphics.beginFill(0xffffff);
            bgmask.graphics.drawRect(0,0,popWidth,popHeight);
            bgmask.graphics.endFill();

            let alertbg = new egret.Shape();
            alertBox.addChild(alertbg);
            alertbg.graphics.beginFill(0xffffff);
            alertbg.graphics.drawRoundRect(0,0,popWidth,popHeight + gh*0.075,gh*0.04);
            alertbg.graphics.endFill();
            alertbg.alpha = 0.9;
            alertbg.mask = bgmask;
            alertBox.addChild(alertText);
            alertBox.x = gw/2 - GetWidth(alertBox)/2;
            alertBox.y = gh*0.5 - GetHeight(alertBox)/2 - gh*0.045;
        /**alert弹窗文本"确定背景"以及它的mask */
            let closemask = new egret.Shape();
            alertBox.addChild(closemask);
            closemask.graphics.beginFill(0x000000);
            closemask.graphics.drawRoundRect(0,0,popWidth,popHeight + gh*0.07,gh*0.04);
            closemask.graphics.endFill();

            let closeLayer = new egret.Shape();
            alertBox.addChild(closeLayer);
            closeLayer.graphics.beginFill(0xf8f8f8);
            closeLayer.graphics.drawRect(0,popHeight,popWidth,gh*0.07);
            closeLayer.graphics.endFill();
            closeLayer.alpha = 0.9;
            closeLayer.mask = closemask;
        /**alert弹窗分割线 */
            let line = new egret.Shape();
            alertBox.addChild(line);
            line.alpha = 0.9;
            // line.graphics.lineStyle(1,0x444444,0.9);
            // line.graphics.moveTo(alertbg.x,popHeight);
            // line.graphics.lineTo(alertbg.x + GetWidth(alertBox),popHeight);
            line.graphics.lineStyle(2,0xffffff,0.4);
            line.graphics.moveTo(alertbg.x+2,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)*0.1,popHeight);
            line.graphics.moveTo(alertbg.x + GetWidth(alertBox)*0.9,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)-2,popHeight);
            line.graphics.lineStyle(2,0x444444,0.4);
            line.graphics.moveTo(alertbg.x + GetWidth(alertBox)*0.1,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)*0.9,popHeight);
            /**alert弹窗"确定文本" */
            let closeField = new egret.TextField();
            alertBox.addChild(closeField);
            closeField.text = "OK";
            textScaleFun(closeField,gh*0.028/gh,0x1383FE);
            closeField.width = textWidth;
            closeField.textAlign = "center";
            closeField.x = popWidth/2 - GetWidth(closeField)/2;
            closeField.y = popHeight + gh*0.0225;
        /**alert弹窗点击事件 */
            closeLayer.touchEnabled = true;
            closeLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,$gameStage);
            alertLayer.addEventListener(egret.TouchEvent.TOUCH_END,touchend,$gameStage);
            function touchbegin(){
                closeLayer.alpha = 0.7;
            }
            function touchend(){
                closeLayer.alpha = 0.9;
            }
            closeLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
                closeLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,$gameStage);
                alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END,touchend,$gameStage);
                LremoveChild(alertLayer);
                if(callback){
                    callback.call(thisObj);
                }
            },$gameStage);
	}
    /**从父级移除 */
    export function LremoveChild(obj:egret.DisplayObject){
        if(obj.parent&&!obj.parent.removeChild) console.log(obj.parent);
        if(obj.parent!=null&&obj!=null) obj.parent.removeChild(obj);
	}
    /**移除监听 */
    export function removedListener(obj:any,listenerStyle:string,afun,thisObj:egret.DisplayObject){
        obj.once(egret.Event.REMOVED_FROM_STAGE,function(){
            obj.removeEventListener(listenerStyle,afun,thisObj);
        },thisObj);
	}
    /**移除缓动 */
    export function removedTweens(obj:egret.DisplayObject){
        obj.once(egret.Event.REMOVED_FROM_STAGE,function(){
            egret.Tween.removeTweens(obj);
        },obj);
	}
    export function DragFun(
        /** 拖动对象集
         * obj:obj-egret.DisplayObject 被拖动的对象,
         * stage:obj-egret.DisplayObject 触发拖动的对象,
         * moveStage:obj-egret.DisplayObject 拖动触发区域 对象,
         * callStage:obj-egret.DisplayObject 拖动的定义域
         */
        objs,
        /** callback
         * downFun:fun-Function,
         * moveFun:fun-Function,
         * upFun:fun-Function
         */
        callbacks?,
        /** callback
         * downObj:obj-egret.DisplayObject,
         * moveObj:obj-egret.DisplayObject,
         * upObj:obj-egret.DisplayObject
         */
        callbacksObjs?,
        /**支持移动的方向 x:水平方向 y:垂直方向*/
        moveSlide?:string,
        moveXianzhi?:number[]
    ){
        /**示例 */
		    // DragFun(
			// 	{
        	// 		"obj":this.plane,
        	// 		"stage":this.plane,
        	// 		"moveStage":this,
        	// 		"callStage":this
			// 	}
			// 	,{
			// 		"downFun":function(evt:egret.TouchEvent,obj){},
			// 		"moveFun":function(evt:egret.TouchEvent,obj){},
			// 		"upFun":function(evt:egret.TouchEvent,obj){},
			// 	}
			// 	,{
			// 		"downObj":0,
			// 		"moveObj":0,
			// 		"upObj":0
			// 	}	
		    // );
        /**示例 end*/
        let funs = {
            "downFun":function(evt:egret.TouchEvent,obj){},
            "moveFun":function(evt:egret.TouchEvent,obj){},
            "upFun":function(evt:egret.TouchEvent,obj){},
        }
        let cbObjs = {
            "downObj":objs.callStage,
            "moveObj":objs.callStage,
            "upObj":objs.callStage
        }
        if(callbacks){
            funs = callbacks;
        }
        if(callbacksObjs){
            cbObjs = callbacksObjs;
        }

        /**是否被拖动 */
        let heroTouch = false;
        let movex:number = 0;
        let movey:number = 0;
        // objs.obj.touchEnabled = true;
        objs.stage.touchEnabled = true;
        objs.moveStage.touchEnabled = true;
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_END,touchup,objs.callStage);

        removedListener(objs.moveStage,egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);

        function touchdown (evt:egret.TouchEvent):void {
            if(evt.type==egret.TouchEvent.TOUCH_BEGIN)
            {
                funs.downFun.call(cbObjs.downObj,evt);
                heroTouch = true;
                movex = objs.obj.x - evt.stageX;
                movey = objs.obj.y - evt.stageY;					
                objs.moveStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);
            }
        }
        function touchmove (evt:egret.TouchEvent):void {
            if(evt.type==egret.TouchEvent.TOUCH_MOVE)
            {
                if(heroTouch){
                    funs.moveFun.call(cbObjs.moveObj,evt);
                    let tx:number = evt.stageX + movex;
                    let ty:number = evt.stageY + movey;
                    tx = Math.max(pw_sx-gh*0.02+objs.obj.anchorOffsetX*objs.obj.scaleX,tx);
                    tx = Math.min(gw-pw_sx+gh*0.02-(GetWidth(objs.obj) - objs.obj.anchorOffsetX*objs.obj.scaleX),tx);
                    ty = Math.max(-gh*0.02+objs.obj.anchorOffsetY*objs.obj.scaleY,ty);
                    ty = Math.min(gh-GetHeight(objs.obj)/2 + objs.obj.anchorOffsetY*objs.obj.scaleY,ty);
                    if(moveSlide){
                        if(moveSlide=="x"){
                            objs.obj.x = tx;
                            if(moveXianzhi){
                                if(objs.obj.x<gw/2+moveXianzhi[0]){
                                    objs.obj.x=gw/2+moveXianzhi[0];
                                }else if(objs.obj.x>gw/2+moveXianzhi[1]){
                                    objs.obj.x=gw/2+moveXianzhi[1];
                                }
                            }
                        }else if(moveSlide=="y"){
                            objs.obj.y = ty;
                            if(moveXianzhi){
                                if(objs.obj.y<moveXianzhi[0]){
                                    objs.obj.x=moveXianzhi[0];
                                }else if(objs.obj.x>moveXianzhi[1]){
                                    objs.obj.x=moveXianzhi[1];
                                }
                            }
                        }
                    }else{
                        objs.obj.x = tx;
                        objs.obj.y = ty;
                    }
                }
            }
        }
        function touchup (evt:egret.TouchEvent):void {
            funs.upFun.call(cbObjs.upObj,evt);
            heroTouch = false;
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);     
        }

        objs.obj["removeDrag"] = function(){
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);       
        }
        /**待测试 */
        objs.obj["addDrag"] = function(){
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);    
        }
	};
    export function PullFun(
        /** 拖动对象集
         * obj:obj-egret.DisplayObject 被拖动的对象,
         * stage:obj-egret.DisplayObject 触发拖动的对象,
         * moveStage:obj-egret.DisplayObject 拖动触发区域 对象,
         * callStage:obj-egret.DisplayObject 拖动的定义域
         */
        objs
        /**move */
        ,downFun:Function
        /**move */
        ,update:Function
        /**move */
        ,upFun:Function
        /**移动速度 */
        ,moveSpeed:number
        /**支持移动的方向 x:水平方向 y:垂直方向*/
        ,moveSlide?:string
        ,moveXianzhi?:number[]
    ){
        let xzx1=0;
        let xzx2=0;
        let xzy1=gw;
        let xzy2=gw;
        if(moveXianzhi){
            if(moveSlide=="x"){
                xzx1 = moveXianzhi[0];
                xzx2 = moveXianzhi[1];
            }else if(moveSlide=="y"){
                xzy1 = moveXianzhi[0];
                xzy2 = moveXianzhi[1];
            }else{
                xzx1 = moveXianzhi[0];
                xzx2 = moveXianzhi[1];
                xzy1 = moveXianzhi[2];
                xzy2 = moveXianzhi[3];
            }
        }
        /**是否被拖动 */
        let heroTouch1 = false;
        let heroTouch = false;
        let movex:number = 0;
        let movey:number = 0;
        objs.stage.touchEnabled = true;
        objs.moveStage.touchEnabled = true;
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
        removedListener(objs.stage,egret.TouchEvent.TOUCH_END,touchup,objs.callStage);

        removedListener(objs.moveStage,egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);

        objs.obj.addEventListener(egret.Event.ENTER_FRAME,pullOnframe,objs.callStage);
        removedListener(objs.obj,egret.Event.ENTER_FRAME,pullOnframe,objs.callStage);
        function pullOnframe(){
            if(heroTouch1&&objs.obj.x!=movex){
                if(moveSlide){
                    if(moveSlide=="x"){
                        let p1 = xyFun3(objs.obj.x,objs.obj.y,movex-objs.obj.x,0,moveSpeed);
                        if((objs.obj.x<movex&&objs.obj.x+p1.a2<=movex)||(objs.obj.x>movex&&objs.obj.x+p1.a2>=movex)){
                            objs.obj.x = p1.x;
                        }else{
                            objs.obj.x = movex;
                        }
                    }else if(moveSlide=="y"){
                        let p1 = xyFun3(objs.obj.x,objs.obj.y,0,movey-objs.obj.y,moveSpeed);
                        if((objs.obj.y<movey&&objs.obj.y+p1.b2<=movey)||(objs.obj.y>movey&&objs.obj.y+p1.b2>=movey)){
                            objs.obj.y = p1.y;
                        }else{
                            objs.obj.y = movey;
                        }
                    }
                }else{
                    let p1 = xyFun3(objs.obj.x,objs.obj.y,movex-objs.obj.x,movey-objs.obj.y,moveSpeed);
                    if((objs.obj.x<movex&&objs.obj.x+p1.a2<=movex)||(objs.obj.x>movex&&objs.obj.x+p1.a2>=movex)){
                        objs.obj.x = p1.x;
                    }else{
                        objs.obj.x = movex;
                    }
                    if((objs.obj.y<movey&&objs.obj.y+p1.b2<=movey)||(objs.obj.y>movey&&objs.obj.y+p1.b2>=movey)){
                        objs.obj.y = p1.y;
                    }else{
                        objs.obj.y = movey;
                    }
                }
                update.call(objs.callStage);
            }
        }
        function touchdown (evt:egret.TouchEvent):void {
            if(evt.type==egret.TouchEvent.TOUCH_BEGIN)
            {
                heroTouch = true;
                movex = evt.stageX;
                movey = evt.stageY;
                movex = Math.max(movex,xzx1+objs.obj.anchorOffsetX);
                movex = Math.min(movex,xzx2+objs.obj.anchorOffsetX-GetWidth(objs.obj));
                movey = Math.max(movey,xzy1+objs.obj.anchorOffsetY);
                movey = Math.min(movey,xzy2+objs.obj.anchorOffsetY-GetHeight(objs.obj));
                heroTouch1 = true;				
                objs.moveStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);
                downFun.call(objs.callStage);
            }
        }
        function touchmove (evt:egret.TouchEvent):void {
            if(evt.type==egret.TouchEvent.TOUCH_MOVE)
            {
                if(heroTouch){
                    movex = evt.stageX;
                    movey = evt.stageY;
                    movex = Math.max(movex,xzx1+objs.obj.anchorOffsetX);
                    movex = Math.min(movex,xzx2+objs.obj.anchorOffsetX-GetWidth(objs.obj));
                    movey = Math.max(movey,xzy1+objs.obj.anchorOffsetY);
                    movey = Math.min(movey,xzy2+objs.obj.anchorOffsetY-GetHeight(objs.obj));
                }
            }
        }
        function touchup (evt:egret.TouchEvent):void {
            heroTouch = false;
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);   
            upFun.call(objs.callStage);  
        }

        objs.obj["removePull"] = function(){
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,touchmove,objs.callStage);
            objs.obj.removeEventListener(egret.Event.ENTER_FRAME,pullOnframe,objs.callStage);
        }
        /**待测试 */
        objs.obj["addPull"] = function(){
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchdown,objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchup,objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_END,touchup,objs.callStage);  
            objs.obj.addEventListener(egret.Event.ENTER_FRAME,pullOnframe,objs.callStage);  
        }
	};
    /**canMinus 返回的值是否可以为负数 */
    export function GetWidth(obj:egret.DisplayObject,canMinus?:boolean):number {
        var result = obj.width*obj.scaleX;
        if(!canMinus){
            result = Math.abs(obj.width*obj.scaleX);
        }
        return result;
    }
    export function GetHeight(obj:egret.DisplayObject,canMinus?:boolean):number {
        var result = obj.height*obj.scaleY;
        if(!canMinus){
            result = Math.abs(obj.height*obj.scaleY);
        }
        return result;
    }
    export function createBitmapByName(name:string,style?:string,rect?:any) {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.scaleX = result.scaleY = initScale;
        if(style=="bg"){
			result.x = gw/2 - GetWidth(result)/2;
			result.y = gh/2 - GetHeight(result)/2;
        }
        if(rect){
            if(GetWidth(result)>dw){
                var renderTexture:egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(result,new egret.Rectangle((GetWidth(result)-dw)/2,0,dw,GetHeight(result)));
                result.texture = renderTexture;
            }
            if(GetHeight(result)>dh){
                var renderTexture:egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(result,new egret.Rectangle(0,(GetHeight(result)-dh)/2,GetWidth(result),dh));
                result.texture = renderTexture;
            }
        }
        return result;
    }
    export function makeaShape(color:number,alpha:number,rect?:number[]) {
        let result = new egret.Shape();
        result.graphics.beginFill(color);
        rect?
        result.graphics.drawRect(rect[0],rect[1],rect[2],rect[3])
        :result.graphics.drawRect(0,(gh-dh)/2,dw,dh);
        result.graphics.endFill();
        result.alpha = alpha;
        return result;
    }
    /**通过URL加载外部图片 */
    export function addBitmapByUrl(x:number,y:number,height:number,thisParent:egret.DisplayObject
    ,headurl:string,style?:"headImg",callBack?,thisObj?) {
        RES.getResByUrl(headurl, function (texture:egret.Texture) {
            //将加载完的资源进行显示
            let result:egret.Bitmap;
            texture?result = new egret.Bitmap(texture):result = createBitmapByName("noheadimg_jpg");
            scaleFun(result,(height)/gh);
            if(style&&style=="headImg"){
                if(result.width>result.height){
                    scaleFunStr(result,(height+2)/gh,"x");
                }
            }
            result.anchorOffsetX = result.width/2;
            result.anchorOffsetY = result.height/2;
            result.x = x + GetWidth(result)/2;
            result.y = y + GetHeight(result)/2;                
            this.addChild(result);
            this.dispatchEventWith("imgOk");
            if(callBack){
                callBack.call(thisObj,result);
            }
        }, thisParent, RES.ResourceItem.TYPE_IMAGE);
    }
    /**根据高等比缩放 */
    export function scaleFun(obj:egret.DisplayObject,height_num:number):void {
        if(obj&&obj.height){
            obj.scaleX = obj.scaleY = gh*height_num/obj.height;
        }
    }
    /**缩放至指定size_num x,y,_x,_y*/
    export function scaleFunStr(obj:egret.DisplayObject,size_num:number,styleStr:string):void {
        switch (styleStr){
            case "x":
            obj.scaleX = gh*size_num/obj.width;
            break;
            case "y":
            obj.scaleY = gh*size_num/obj.height;
            break;
            case "_x":
            obj.scaleX = obj.scaleY = gh*size_num/obj.width;
            break;
            case "_y":
            obj.scaleX = obj.scaleY = gh*size_num/obj.width;
            break;
        }
    }
    /**Arial */
    export function textScaleFun(obj:egret.TextField,height_num:number,textColor?:number,fontFamily?:string):void {
        let result = new egret.TextField();
        if(textColor||textColor==0x000000) obj.textColor = textColor;
        fontFamily?obj.fontFamily = fontFamily:obj.fontFamily = "sans-serif";
        result.fontFamily = obj.fontFamily;
        result.text = "Mrz默认值qgy";
        if(result.text&&result.height!=0){
            while(result.height < gh*height_num){
                result.size ++;
            }
            while(result.height > gh*height_num){
                result.size --;
            }
        }
        obj.size = result.size;
    }
    export function textScaleXFun(obj:egret.TextField,objText:string,maxWidth:number):void {
        let result = new egret.TextField();
        result.fontFamily = obj.fontFamily;
        result.text = objText;
        result.size = obj.size;
        if(result.text&&result.width!=0){
            while(result.width > gh*maxWidth){
                result.size --;
            }
        }
        obj.size = result.size;
    }
    /**addQR */
    export function addQR(x:number,y:number,height:string,visible:boolean,qrUrl?:string):void {
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
            myImg.src = $staticUrl+"resource/assets/GameUtil/QR.png";
        }
        myImg.id = "QR";
        gameDiv.appendChild(myImg);
        let timer = egret.setInterval(function(){
            IsQRloadComplete = QRloadComplete(x,y,height);
            if(visible){
                myImg.style.display = 'block';
            }else{
                myImg.style.display = 'none';
            }
            if(IsQRloadComplete){
                egret.clearInterval(timer);
            }
        },this,33);
        /**返回QR是否加载完成 */
        function QRloadComplete(x,y,height){
            if (document.getElementById('QR')['complete']){
                setQRposition(x,y,height);
                return true;
            }else{
                return false;
            }
        }
    }
    /**设置QR位置 */
    export function setQRposition(x:number,y:number,height:string|any,visible?:boolean):void {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg.width/myImg.height;
        myImg.style.height = height;

        var heightNum =(height.replace("%",""))/100;
        var widthNum = (heightNum*window.innerHeight)*w_h;
        myImg.style.width = widthNum + "px";

        var left_x = window.innerWidth/2 - widthNum/2 + window.innerHeight*x;
        var left_y = window.innerHeight*y;
        myImg.style.left = left_x +'px';
        myImg.style.top = left_y +'px';
        myImg.style.position = "absolute";
        if(visible){
            myImg.style.display = 'block';
        }else{
            myImg.style.display = 'none';
        }
    }
    export function removeQR():void {
        myImg.style.display = 'none';
    }
    /**仅支持Btn的按钮模型 */
	export function BtnMode(obj:egret.DisplayObject,notBtn?:boolean) {
        let thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width/2;
        obj.anchorOffsetY = obj.height/2;
        obj.x =  obj.x + GetWidth(obj)/2;
        obj.y =  obj.y + GetHeight(obj)/2;
        if(!notBtn){
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,btnView,this);
            removedListener(obj,egret.TouchEvent.TOUCH_BEGIN,btnView,this);
        }
        function btnView(evt:egret.TouchEvent){
            let btnobj = evt.currentTarget;
            egret.Tween.get(btnobj).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
            .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
        }
	}
    /**为圆形shape Btn添加按钮样式 */
	export function BtnModeArcShape(obj:egret.DisplayObject,notBtn?:boolean) {
        let thisScale = obj.scaleX;
        if(!notBtn){
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,btnView,this);
            removedListener(obj,egret.TouchEvent.TOUCH_BEGIN,btnView,this);
        }
        function btnView(evt:egret.TouchEvent){
            let btnobj = evt.currentTarget;
            egret.Tween.get(btnobj).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
            .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
        }
	}
    /**知道方向x1,y1,长度z2,求移动方向x2y2 */
    export function xyFun(x1,y1,z2){// z2是固定值
        // 弧度
        var hd = Math.atan2(x1,y1);
        var sin = Math.sin(hd); // 得到∠a的对边比斜边;
        var cos = Math.cos(hd); // 得到∠a的临边比斜边
        var x2 = z2*sin; // 得到对边
        var y2 = z2*cos; // 得到临边
        return {"x":x2,"y":y2};
    }
    /** 
     * 知道角度hd 半径r 求方向大小a2,b2
     * 知道原点x1,y1 求末点x2,y2
     * 
     * 计算弧度的两种方式
     * hd = Math.PI/180*rotate ||
     * hd = Math.atan2(x1,y1)
     */
    export function xyFun2(hd,r,x1,y1){
        var sin = Math.sin(hd);// 得到∠a的对边比斜边
        var cos = Math.cos(hd);// 得到∠a的临边比斜边
        var a2 = r*sin; // 得到对边
        var b2 = r*cos; // 得到临边
        var x2 = x1+a2;
        var y2 = y1+b2;
        return {
            "a2":a2,
            "b2":b2,
            "x":x2,
            "y":y2
        }
    }
    /**
     * 知道长a1高b1的直角三角形 知道c2是新三角形的斜边 求方向大小a2,b2
     * 知道原点x1,y1 方向a1,b1(方向是向量差) 求x2,y2
     */
    export function xyFun3(x1,y1,a1,b1,c2){
        // var c1 = Math.sqrt(a1*a1+b1*b1);
        var hd = Math.atan2(a1,b1);
        var sin = Math.sin(hd);// 得到∠a的对边比斜边
        var cos = Math.cos(hd);// 得到∠a的临边比斜边
        var a2 = c2*sin; // 得到对边
        var b2 = c2*cos; // 得到临边
        var x2 = x1+a2;
        var y2 = y1+b2;        
        return {
            "a2":a2,
            "b2":b2,
            "x":x2,
            "y":y2
        }
    }
    /**摇杆 */
    export function zFun(a,b,r){// 长度不大于某个值r,r是一个固定值半径
        if (a*a+b*b<=r*r) {
            return true;
        }else{
            return false;
        }
    }

    /**00:00:60 */
	export function hmsFun($num:number):string{
		let $timeCount = $num;
		let $h1:any = Math.floor($timeCount/60/60);
		let $m1:any = Math.floor($timeCount/60)%60;
		let $s1:any = Math.floor($timeCount)%60;
		if($h1<10){
			$h1 = "0"+$h1;
		}
		if($m1<10){
			$m1 = "0"+$m1;
		}
		if($s1<10){
			$s1 = "0"+$s1;
		}
		let $hms1 = $h1+":"+$m1+":"+$s1;
		return $hms1;
	}
    /**LAlert2 弹出提示 */
    export function LAlert2(text:string,yesCallback?:Function,noCallback?:Function,thisObj?:egret.DisplayObjectContainer){
        let alertLayer = new egret.Sprite();
        GameLayer.addChild(alertLayer);
        alertLayer.touchEnabled = true;

        let alertShape = makeaShape(0x000000,0.4,[0,0,dw,dh]);
        alertLayer.addChild(alertShape);
        /** 弹窗 */
            let alertBox = new egret.Sprite();
            alertLayer.addChild(alertBox);
            let textWidth = gh*0.38;
            let popWidth = gh*0.38 + gh*0.08;
        /** 弹窗文本 */
            let alertText = new egret.TextField();
            textScaleFun(alertText,gh*0.0225/gh,0x222222);
            alertText.width = textWidth;
            alertText.textAlign = "center";
            alertText.lineSpacing = gh*0.01;
            alertText.text = text;
            alertText.x = popWidth/2 - GetWidth(alertText)/2;
            alertText.y = gh*0.04;
            let popHeight = GetHeight(alertText)+gh*0.08;
        /** 弹窗文本"背景"-以及它的mask */
            let bgmask = new egret.Shape();
            alertBox.addChild(bgmask);
            bgmask.graphics.beginFill(0xffffff);
            bgmask.graphics.drawRect(0,0,GetWidth(alertText) + gh*0.08,popHeight);
            bgmask.graphics.endFill();

            let alertbg = new egret.Shape();
            alertBox.addChild(alertbg);
            alertbg.graphics.beginFill(0xffffff);
            alertbg.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,popHeight + gh*0.075,gh*0.04);
            alertbg.graphics.endFill();
            alertbg.alpha = 0.9;
            alertbg.mask = bgmask;
            alertBox.addChild(alertText);
            alertBox.x = gw/2 - GetWidth(alertBox)/2;
            alertBox.y = gh*0.5 - GetHeight(alertBox)/2 - gh*0.045;
        /** "确定背景"-以及它的mask */
            let yesmask = new egret.Shape();
            alertBox.addChild(yesmask);
            yesmask.graphics.beginFill(0x000000);
            yesmask.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,popHeight + gh*0.07,gh*0.04);
            yesmask.graphics.endFill();

            let yesLayer = new egret.Shape();
            alertBox.addChild(yesLayer);
            yesLayer.graphics.beginFill(0xf8f8f8);
            yesLayer.graphics.drawRect(0,popHeight,GetWidth(alertText)/2 + gh*0.04,gh*0.07);
            yesLayer.graphics.endFill();
            yesLayer.alpha = 0.9;
            yesLayer.mask = yesmask;
        /** "确定文本"*/
            let yesField = new egret.TextField();
            alertBox.addChild(yesField);
            textScaleFun(yesField,gh*0.028/gh,0x1383FE);
            yesField.text = "是";
            yesField.width = textWidth/2;
            yesField.textAlign = "center";
            yesField.x = GetWidth(yesLayer)/2 - GetWidth(yesField)/2;
            yesField.y = popHeight + gh*0.0225;
        /** "否定背景"-以及它的mask */
            let nomask = new egret.Shape();
            alertBox.addChild(nomask);
            nomask.graphics.beginFill(0x000000);
            nomask.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,popHeight + gh*0.07,gh*0.04);
            nomask.graphics.endFill();

            let noLayer = new egret.Shape();
            alertBox.addChild(noLayer);
            noLayer.graphics.beginFill(0xf8f8f8);
            noLayer.graphics.drawRect(GetWidth(alertText)/2 + gh*0.04,popHeight,GetWidth(alertText)/2 + gh*0.04,gh*0.07);
            noLayer.graphics.endFill();
            noLayer.alpha = 0.9;
            noLayer.mask = nomask;
        /** "否定文本" */
            let noField = new egret.TextField();
            alertBox.addChild(noField);
            textScaleFun(noField,gh*0.028/gh,0x1383FE);
            noField.text = "否";
            noField.width = textWidth/2;
            noField.textAlign = "center";
            noField.x = GetWidth(yesLayer) + GetWidth(noLayer)/2 - GetWidth(noField)/2;
            noField.y = popHeight + gh*0.0225;
        /**弹窗 分割线 */
            let line = new egret.Shape();
            alertBox.addChild(line);
            line.alpha = 0.9;
            // line.graphics.lineStyle(1,0x444444,0.9);
            // line.graphics.moveTo(alertbg.x,popHeight);
            // line.graphics.lineTo(alertbg.x + GetWidth(alertBox),popHeight);
            line.graphics.lineStyle(2,0xffffff,0.4);
            line.graphics.moveTo(alertbg.x+2,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)*0.1,popHeight);
            line.graphics.moveTo(alertbg.x + GetWidth(alertBox)*0.9,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)-2,popHeight);
            line.graphics.lineStyle(2,0x999999,0.4);
            line.graphics.moveTo(alertbg.x + GetWidth(alertBox)*0.1,popHeight);
            line.graphics.lineTo(alertbg.x + GetWidth(alertBox)*0.9,popHeight);
        /**按钮 分割线 */
            let btnLine = new egret.Shape();
            alertBox.addChild(btnLine);
            btnLine.alpha = 0.9;
            btnLine.graphics.lineStyle(3,0xffffff,0.4);
            btnLine.graphics.moveTo(popWidth/2,popHeight+3);
            btnLine.graphics.lineTo(popWidth/2,popHeight+gh*0.07-3);
        /** "yes"点击事件 */
            yesLayer.touchEnabled = true;
            yesLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,GameLayer);
            alertLayer.addEventListener(egret.TouchEvent.TOUCH_END,touchend,GameLayer);
            function touchbegin(){
                yesLayer.alpha = 0.7;
            }
            function touchend(){
                yesLayer.alpha = 0.9;
            }
            yesLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
                yesLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,GameLayer);
                alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END,touchend,GameLayer);
                GameLayer.removeChild(alertLayer);
                if(yesCallback){
                    yesCallback.call(thisObj);
                }
            },GameLayer);
        /** "no"点击事件 */
            noLayer.touchEnabled = true;
            noLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,noTouchbegin,GameLayer);
            alertLayer.addEventListener(egret.TouchEvent.TOUCH_END,noTouchend,GameLayer);
            function noTouchbegin(){
                noLayer.alpha = 0.7;
            }
            function noTouchend(){
                noLayer.alpha = 0.9;
            }
            noLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
                noLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,noTouchbegin,GameLayer);
                alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END,noTouchend,GameLayer);
                GameLayer.removeChild(alertLayer);
                if(noCallback){
                    noCallback.call(thisObj);
                }
            },GameLayer);
	}
    /**判断是否为整数 */
    export function isInteger(obj) {
        return typeof obj === 'number' && obj%1 === 0;
    }

    /**打字机效果 */
    export function typerFun(txt,speed,loopcallback,callback?,thisObj?){
        let str = txt+"";
        let len = str.length;
        let num = 0;
        let result = "";
        let typerInt = egret.setInterval(function(){
            if (num<len) {
                num++;
                if(num%2==1){
                    result = str.substring(0,num);
                }else{
                    result = str.substring(0,num)+"_";
                }
            }else{
                egret.clearInterval(typerInt);
                result = str.substring(0,num);
                // this.daziChannel.stop();
                if (callback) {callback.call(this)}
            }
            loopcallback.call(this,result);
        },thisObj,speed);
        // },30);
    }

    /**画虚线 */
        // let xuxian = zXuain( 0x31053A, 2, new egret.Point(this.arcLayer.x,this.arcLayer.y) 
        // ,new egret.Point(this.arcLayer.x+gh*0.11,this.arcLayer.y-gh*0.03),gh*0.006,gh*0.004);
        // descLayer.addChild(xuxian);

        // let zhixian = drawZhian( 0x31053A, 2, new egret.Point(this.arcLayer.x,this.arcLayer.y) 
        // ,new egret.Point(this.arcLayer.x+gh*0.11,this.arcLayer.y-gh*0.03));
        // descLayer.addChild(zhixian);
        // xuxian.mask = zhixian;
    /**直虚线 */
    export function zXuain(color,thickness,pt1,pt2,xdlen,jage):egret.Shape{
        let shape = new egret.Shape();
        let num = 0;
        let num1 = 0;
        let num2 = egret.Point.distance(pt1,pt2);
        shape.x = pt1.x;
        shape.y = pt1.y;
        let p1 = new egret.Point(0,0);
        let p2 = new egret.Point(pt2.x-pt1.x,pt2.y-pt1.y);
        shape.graphics.lineStyle(thickness,color);
        shape.graphics.moveTo(p1.x,p1.y);
        let q2 = {x:p1.x,y:p1.y};
        while(num1<num2){
            if(num%2==0){
                q2 = xyFun3(q2.x,q2.y,p2.x,p2.y,xdlen);
                num1+=xdlen;
                shape.graphics.lineTo(q2.x,q2.y);
            }else{
                q2 = xyFun3(q2.x,q2.y,p2.x,p2.y,jage);
                num1+=jage;
                shape.graphics.moveTo(q2.x,q2.y);
            }
            num++;
        }
        shape.graphics.endFill();
        return shape;
    }
    /**画直线 */
    export function drawZhian(color,thickness,p1,p2):egret.Shape{
        let shape = new egret.Shape();
        shape.graphics.lineStyle(thickness,color);
        shape.graphics.moveTo(0,0);
        shape.graphics.lineTo(p2.x-p1.x,p2.y-p1.y);
        shape.graphics.endFill();
        shape.x = p1.x;
        shape.y = p1.y;
        
        return shape;
    }


}



