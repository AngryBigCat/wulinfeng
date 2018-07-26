var loadingScreen;
var initScale = gh / 1206;
/**游戏底层 */
var GameLayer;
var myImg;
// -webkit-overflow-scrolling: touch;
var IsQRloadComplete = false;
var LMsgArr = [];
var oldLMsgArr = [];
var Lgs;
(function (Lgs) {
    function encbase64(contentObj) {
        var originalStr = JSON.stringify(contentObj);
        // console.log("原始josn字符串" + originalStr);
        var bytes = new egret.ByteArray();
        bytes.writeUTFBytes(originalStr);
        var out = egret.Base64Util.encode(bytes.buffer);
        // console.log("编码后的文字：" + out);
        return out;
    }
    Lgs.encbase64 = encbase64;
    function decbase64(out) {
        var arrayBuffer = egret.Base64Util.decode(out);
        var messageBytes = new egret.ByteArray(arrayBuffer);
        messageBytes.position = 0;
        // console.log("解码后的文字：" + messageBytes.readUTFBytes(messageBytes.length));
        return messageBytes.readUTFBytes(messageBytes.length);
    }
    Lgs.decbase64 = decbase64;
    /**LMsg 消息提示*/
    function LMsg(text, callback, thisObj) {
        if (oldLMsgArr.length == 0) {
            var tsLayer_1 = new egret.Sprite();
            $gameStage.addChild(tsLayer_1);
            var tsBox = new egret.Sprite();
            tsLayer_1.addChild(tsBox);
            var tsText = new egret.TextField();
            textScaleFun(tsText, 0.028, 0xffffff);
            tsText.text = text;
            tsText.stroke = 4;
            tsText.bold = true;
            tsText.strokeColor = 0x111111;
            tsText.textAlign = "center";
            tsText.width = gh * 0.38;
            tsBox.addChild(tsText);
            tsLayer_1["tsText"] = tsText;
            tsLayer_1.x = gw / 2 - GetWidth(tsLayer_1) / 2;
            tsLayer_1.y = gh * 0.38;
            var tsLayery = tsLayer_1.y;
            tsLayer_1.alpha = 0;
            LMsgArr.push(tsLayer_1);
            egret.Tween.get(tsLayer_1).wait(280).to({ y: tsLayery - gh * 0.05 }, 2000, egret.Ease.quadOut);
            egret.Tween.get(tsLayer_1).to({ alpha: 1 }, 280).wait(1700).to({ alpha: 0 }, 300, egret.Ease.quadOut)
                .call(function () {
                tsLayer_1.visible = false;
                LMsgArr.splice(0, 1);
                oldLMsgArr.push(tsLayer_1);
            }, this);
        }
        else {
            // &&LMsgArr.length>3
            var tsLayer_2 = oldLMsgArr[0];
            // $gameStage.stage.addChild(tsLayer);
            // $gameStage.stage.setChildIndex(tsLayer,0);
            oldLMsgArr.splice(0, 1);
            LMsgArr.push(tsLayer_2);
            tsLayer_2["tsText"].text = text;
            tsLayer_2.x = gw / 2 - GetWidth(tsLayer_2) / 2;
            tsLayer_2.y = gh * 0.38;
            var tsLayery = tsLayer_2.y;
            tsLayer_2.alpha = 0;
            tsLayer_2.visible = true;
            egret.Tween.get(tsLayer_2).wait(280).to({ y: tsLayery - gh * 0.05 }, 2000, egret.Ease.quadOut);
            egret.Tween.get(tsLayer_2).to({ alpha: 1 }, 280).wait(1700).to({ alpha: 0 }, 300, egret.Ease.quadOut)
                .call(function () {
                LMsgArr.splice(0, 1);
                oldLMsgArr.push(tsLayer_2);
            }, this);
        }
        egret.setTimeout(function () {
            if (callback) {
                callback.call(thisObj);
            }
        }, this, 800);
    }
    Lgs.LMsg = LMsg;
    function showloading(txt) {
        if (!txt)
            txt = "";
        loadingScreen.loadingShow(txt);
    }
    Lgs.showloading = showloading;
    function hideloading() {
        loadingScreen.loadingHide();
    }
    Lgs.hideloading = hideloading;
    /**正常版本 LAlert 弹出提示*/
    function LAlert(text, callback, thisObj) {
        var alertLayer = new egret.Sprite();
        $gameStage.addChild(alertLayer);
        alertLayer.touchEnabled = true;
        var alertShape = makeaShape(0x000000, 0.4, [0, 0, dw, dh]);
        alertLayer.addChild(alertShape);
        /**alert弹窗 */
        var alertBox = new egret.Sprite();
        alertLayer.addChild(alertBox);
        var textWidth = gh * 0.38;
        var popWidth = gh * 0.38 + gh * 0.08;
        /**alert弹窗文本 */
        var alertText = new egret.TextField();
        textScaleFun(alertText, gh * 0.0225 / gh, 0x222222);
        alertText.width = textWidth;
        alertText.textAlign = "center";
        alertText.lineSpacing = gh * 0.01;
        alertText.text = text + "";
        alertText.x = popWidth / 2 - GetWidth(alertText) / 2;
        alertText.y = gh * 0.04;
        var popHeight = GetHeight(alertText) + gh * 0.08;
        /**alert弹窗文本"背景"以及它的mask */
        var bgmask = new egret.Shape();
        alertBox.addChild(bgmask);
        bgmask.graphics.beginFill(0xffffff);
        bgmask.graphics.drawRect(0, 0, popWidth, popHeight);
        bgmask.graphics.endFill();
        var alertbg = new egret.Shape();
        alertBox.addChild(alertbg);
        alertbg.graphics.beginFill(0xffffff);
        alertbg.graphics.drawRoundRect(0, 0, popWidth, popHeight + gh * 0.075, gh * 0.04);
        alertbg.graphics.endFill();
        alertbg.alpha = 0.9;
        alertbg.mask = bgmask;
        alertBox.addChild(alertText);
        alertBox.x = gw / 2 - GetWidth(alertBox) / 2;
        alertBox.y = gh * 0.5 - GetHeight(alertBox) / 2 - gh * 0.045;
        /**alert弹窗文本"确定背景"以及它的mask */
        var closemask = new egret.Shape();
        alertBox.addChild(closemask);
        closemask.graphics.beginFill(0x000000);
        closemask.graphics.drawRoundRect(0, 0, popWidth, popHeight + gh * 0.07, gh * 0.04);
        closemask.graphics.endFill();
        var closeLayer = new egret.Shape();
        alertBox.addChild(closeLayer);
        closeLayer.graphics.beginFill(0xf8f8f8);
        closeLayer.graphics.drawRect(0, popHeight, popWidth, gh * 0.07);
        closeLayer.graphics.endFill();
        closeLayer.alpha = 0.9;
        closeLayer.mask = closemask;
        /**alert弹窗分割线 */
        var line = new egret.Shape();
        alertBox.addChild(line);
        line.alpha = 0.9;
        // line.graphics.lineStyle(1,0x444444,0.9);
        // line.graphics.moveTo(alertbg.x,popHeight);
        // line.graphics.lineTo(alertbg.x + GetWidth(alertBox),popHeight);
        line.graphics.lineStyle(2, 0xffffff, 0.4);
        line.graphics.moveTo(alertbg.x + 2, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) * 0.1, popHeight);
        line.graphics.moveTo(alertbg.x + GetWidth(alertBox) * 0.9, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) - 2, popHeight);
        line.graphics.lineStyle(2, 0x444444, 0.4);
        line.graphics.moveTo(alertbg.x + GetWidth(alertBox) * 0.1, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) * 0.9, popHeight);
        /**alert弹窗"确定文本" */
        var closeField = new egret.TextField();
        alertBox.addChild(closeField);
        closeField.text = "OK";
        textScaleFun(closeField, gh * 0.028 / gh, 0x1383FE);
        closeField.width = textWidth;
        closeField.textAlign = "center";
        closeField.x = popWidth / 2 - GetWidth(closeField) / 2;
        closeField.y = popHeight + gh * 0.0225;
        /**alert弹窗点击事件 */
        closeLayer.touchEnabled = true;
        closeLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, $gameStage);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, touchend, $gameStage);
        function touchbegin() {
            closeLayer.alpha = 0.7;
        }
        function touchend() {
            closeLayer.alpha = 0.9;
        }
        closeLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            closeLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, $gameStage);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, touchend, $gameStage);
            LremoveChild(alertLayer);
            if (callback) {
                callback.call(thisObj);
            }
        }, $gameStage);
    }
    Lgs.LAlert = LAlert;
    /**从父级移除 */
    function LremoveChild(obj) {
        if (obj.parent && !obj.parent.removeChild)
            console.log(obj.parent);
        if (obj.parent != null && obj != null)
            obj.parent.removeChild(obj);
    }
    Lgs.LremoveChild = LremoveChild;
    /**移除监听 */
    function removedListener(obj, listenerStyle, afun, thisObj) {
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            obj.removeEventListener(listenerStyle, afun, thisObj);
        }, thisObj);
    }
    Lgs.removedListener = removedListener;
    /**移除缓动 */
    function removedTweens(obj) {
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            egret.Tween.removeTweens(obj);
        }, obj);
    }
    Lgs.removedTweens = removedTweens;
    function DragFun(
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
        callbacks, 
        /** callback
         * downObj:obj-egret.DisplayObject,
         * moveObj:obj-egret.DisplayObject,
         * upObj:obj-egret.DisplayObject
         */
        callbacksObjs, 
        /**支持移动的方向 x:水平方向 y:垂直方向*/
        moveSlide, moveXianzhi) {
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
        var funs = {
            "downFun": function (evt, obj) { },
            "moveFun": function (evt, obj) { },
            "upFun": function (evt, obj) { },
        };
        var cbObjs = {
            "downObj": objs.callStage,
            "moveObj": objs.callStage,
            "upObj": objs.callStage
        };
        if (callbacks) {
            funs = callbacks;
        }
        if (callbacksObjs) {
            cbObjs = callbacksObjs;
        }
        /**是否被拖动 */
        var heroTouch = false;
        var movex = 0;
        var movey = 0;
        // objs.obj.touchEnabled = true;
        objs.stage.touchEnabled = true;
        objs.moveStage.touchEnabled = true;
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.moveStage, egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        function touchdown(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                funs.downFun.call(cbObjs.downObj, evt);
                heroTouch = true;
                movex = objs.obj.x - evt.stageX;
                movey = objs.obj.y - evt.stageY;
                objs.moveStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
            }
        }
        function touchmove(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                if (heroTouch) {
                    funs.moveFun.call(cbObjs.moveObj, evt);
                    var tx = evt.stageX + movex;
                    var ty = evt.stageY + movey;
                    tx = Math.max(pw_sx - gh * 0.02 + objs.obj.anchorOffsetX * objs.obj.scaleX, tx);
                    tx = Math.min(gw - pw_sx + gh * 0.02 - (GetWidth(objs.obj) - objs.obj.anchorOffsetX * objs.obj.scaleX), tx);
                    ty = Math.max(-gh * 0.02 + objs.obj.anchorOffsetY * objs.obj.scaleY, ty);
                    ty = Math.min(gh - GetHeight(objs.obj) / 2 + objs.obj.anchorOffsetY * objs.obj.scaleY, ty);
                    if (moveSlide) {
                        if (moveSlide == "x") {
                            objs.obj.x = tx;
                            if (moveXianzhi) {
                                if (objs.obj.x < gw / 2 + moveXianzhi[0]) {
                                    objs.obj.x = gw / 2 + moveXianzhi[0];
                                }
                                else if (objs.obj.x > gw / 2 + moveXianzhi[1]) {
                                    objs.obj.x = gw / 2 + moveXianzhi[1];
                                }
                            }
                        }
                        else if (moveSlide == "y") {
                            objs.obj.y = ty;
                            if (moveXianzhi) {
                                if (objs.obj.y < moveXianzhi[0]) {
                                    objs.obj.x = moveXianzhi[0];
                                }
                                else if (objs.obj.x > moveXianzhi[1]) {
                                    objs.obj.x = moveXianzhi[1];
                                }
                            }
                        }
                    }
                    else {
                        objs.obj.x = tx;
                        objs.obj.y = ty;
                    }
                }
            }
        }
        function touchup(evt) {
            funs.upFun.call(cbObjs.upObj, evt);
            heroTouch = false;
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        }
        objs.obj["removeDrag"] = function () {
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        };
        /**待测试 */
        objs.obj["addDrag"] = function () {
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        };
    }
    Lgs.DragFun = DragFun;
    ;
    function PullFun(
        /** 拖动对象集
         * obj:obj-egret.DisplayObject 被拖动的对象,
         * stage:obj-egret.DisplayObject 触发拖动的对象,
         * moveStage:obj-egret.DisplayObject 拖动触发区域 对象,
         * callStage:obj-egret.DisplayObject 拖动的定义域
         */
        objs, downFun, update, upFun, moveSpeed, moveSlide, moveXianzhi) {
        var xzx1 = 0;
        var xzx2 = 0;
        var xzy1 = gw;
        var xzy2 = gw;
        if (moveXianzhi) {
            if (moveSlide == "x") {
                xzx1 = moveXianzhi[0];
                xzx2 = moveXianzhi[1];
            }
            else if (moveSlide == "y") {
                xzy1 = moveXianzhi[0];
                xzy2 = moveXianzhi[1];
            }
            else {
                xzx1 = moveXianzhi[0];
                xzx2 = moveXianzhi[1];
                xzy1 = moveXianzhi[2];
                xzy2 = moveXianzhi[3];
            }
        }
        /**是否被拖动 */
        var heroTouch1 = false;
        var heroTouch = false;
        var movex = 0;
        var movey = 0;
        objs.stage.touchEnabled = true;
        objs.moveStage.touchEnabled = true;
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.moveStage, egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        objs.obj.addEventListener(egret.Event.ENTER_FRAME, pullOnframe, objs.callStage);
        removedListener(objs.obj, egret.Event.ENTER_FRAME, pullOnframe, objs.callStage);
        function pullOnframe() {
            if (heroTouch1 && objs.obj.x != movex) {
                if (moveSlide) {
                    if (moveSlide == "x") {
                        var p1 = xyFun3(objs.obj.x, objs.obj.y, movex - objs.obj.x, 0, moveSpeed);
                        if ((objs.obj.x < movex && objs.obj.x + p1.a2 <= movex) || (objs.obj.x > movex && objs.obj.x + p1.a2 >= movex)) {
                            objs.obj.x = p1.x;
                        }
                        else {
                            objs.obj.x = movex;
                        }
                    }
                    else if (moveSlide == "y") {
                        var p1 = xyFun3(objs.obj.x, objs.obj.y, 0, movey - objs.obj.y, moveSpeed);
                        if ((objs.obj.y < movey && objs.obj.y + p1.b2 <= movey) || (objs.obj.y > movey && objs.obj.y + p1.b2 >= movey)) {
                            objs.obj.y = p1.y;
                        }
                        else {
                            objs.obj.y = movey;
                        }
                    }
                }
                else {
                    var p1 = xyFun3(objs.obj.x, objs.obj.y, movex - objs.obj.x, movey - objs.obj.y, moveSpeed);
                    if ((objs.obj.x < movex && objs.obj.x + p1.a2 <= movex) || (objs.obj.x > movex && objs.obj.x + p1.a2 >= movex)) {
                        objs.obj.x = p1.x;
                    }
                    else {
                        objs.obj.x = movex;
                    }
                    if ((objs.obj.y < movey && objs.obj.y + p1.b2 <= movey) || (objs.obj.y > movey && objs.obj.y + p1.b2 >= movey)) {
                        objs.obj.y = p1.y;
                    }
                    else {
                        objs.obj.y = movey;
                    }
                }
                update.call(objs.callStage);
            }
        }
        function touchdown(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                heroTouch = true;
                movex = evt.stageX;
                movey = evt.stageY;
                movex = Math.max(movex, xzx1 + objs.obj.anchorOffsetX);
                movex = Math.min(movex, xzx2 + objs.obj.anchorOffsetX - GetWidth(objs.obj));
                movey = Math.max(movey, xzy1 + objs.obj.anchorOffsetY);
                movey = Math.min(movey, xzy2 + objs.obj.anchorOffsetY - GetHeight(objs.obj));
                heroTouch1 = true;
                objs.moveStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
                downFun.call(objs.callStage);
            }
        }
        function touchmove(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                if (heroTouch) {
                    movex = evt.stageX;
                    movey = evt.stageY;
                    movex = Math.max(movex, xzx1 + objs.obj.anchorOffsetX);
                    movex = Math.min(movex, xzx2 + objs.obj.anchorOffsetX - GetWidth(objs.obj));
                    movey = Math.max(movey, xzy1 + objs.obj.anchorOffsetY);
                    movey = Math.min(movey, xzy2 + objs.obj.anchorOffsetY - GetHeight(objs.obj));
                }
            }
        }
        function touchup(evt) {
            heroTouch = false;
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
            upFun.call(objs.callStage);
        }
        objs.obj["removePull"] = function () {
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
            objs.stage.removeEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
            objs.obj.removeEventListener(egret.Event.ENTER_FRAME, pullOnframe, objs.callStage);
        };
        /**待测试 */
        objs.obj["addPull"] = function () {
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
            objs.stage.addEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
            objs.obj.addEventListener(egret.Event.ENTER_FRAME, pullOnframe, objs.callStage);
        };
    }
    Lgs.PullFun = PullFun;
    ;
    /**canMinus 返回的值是否可以为负数 */
    function GetWidth(obj, canMinus) {
        var result = obj.width * obj.scaleX;
        if (!canMinus) {
            result = Math.abs(obj.width * obj.scaleX);
        }
        return result;
    }
    Lgs.GetWidth = GetWidth;
    function GetHeight(obj, canMinus) {
        var result = obj.height * obj.scaleY;
        if (!canMinus) {
            result = Math.abs(obj.height * obj.scaleY);
        }
        return result;
    }
    Lgs.GetHeight = GetHeight;
    function createBitmapByName(name, style, rect) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.scaleX = result.scaleY = initScale;
        if (style == "bg") {
            result.x = gw / 2 - GetWidth(result) / 2;
            result.y = gh / 2 - GetHeight(result) / 2;
        }
        if (rect) {
            if (GetWidth(result) > dw) {
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(result, new egret.Rectangle((GetWidth(result) - dw) / 2, 0, dw, GetHeight(result)));
                result.texture = renderTexture;
            }
            if (GetHeight(result) > dh) {
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(result, new egret.Rectangle(0, (GetHeight(result) - dh) / 2, GetWidth(result), dh));
                result.texture = renderTexture;
            }
        }
        return result;
    }
    Lgs.createBitmapByName = createBitmapByName;
    function makeaShape(color, alpha, rect) {
        var result = new egret.Shape();
        result.graphics.beginFill(color);
        rect ?
            result.graphics.drawRect(rect[0], rect[1], rect[2], rect[3])
            : result.graphics.drawRect(0, (gh - dh) / 2, dw, dh);
        result.graphics.endFill();
        result.alpha = alpha;
        return result;
    }
    Lgs.makeaShape = makeaShape;
    /**通过URL加载外部图片 */
    function addBitmapByUrl(x, y, height, thisParent, headurl, style, callBack, thisObj) {
        RES.getResByUrl(headurl, function (texture) {
            //将加载完的资源进行显示
            var result;
            texture ? result = new egret.Bitmap(texture) : result = createBitmapByName("noheadimg_jpg");
            scaleFun(result, (height) / gh);
            if (style && style == "headImg") {
                if (result.width > result.height) {
                    scaleFunStr(result, (height + 2) / gh, "x");
                }
            }
            result.anchorOffsetX = result.width / 2;
            result.anchorOffsetY = result.height / 2;
            result.x = x + GetWidth(result) / 2;
            result.y = y + GetHeight(result) / 2;
            this.addChild(result);
            this.dispatchEventWith("imgOk");
            if (callBack) {
                callBack.call(thisObj, result);
            }
        }, thisParent, RES.ResourceItem.TYPE_IMAGE);
    }
    Lgs.addBitmapByUrl = addBitmapByUrl;
    /**根据高等比缩放 */
    function scaleFun(obj, height_num) {
        if (obj && obj.height) {
            obj.scaleX = obj.scaleY = gh * height_num / obj.height;
        }
    }
    Lgs.scaleFun = scaleFun;
    /**缩放至指定size_num x,y,_x,_y*/
    function scaleFunStr(obj, size_num, styleStr) {
        switch (styleStr) {
            case "x":
                obj.scaleX = gh * size_num / obj.width;
                break;
            case "y":
                obj.scaleY = gh * size_num / obj.height;
                break;
            case "_x":
                obj.scaleX = obj.scaleY = gh * size_num / obj.width;
                break;
            case "_y":
                obj.scaleX = obj.scaleY = gh * size_num / obj.width;
                break;
        }
    }
    Lgs.scaleFunStr = scaleFunStr;
    /**Arial */
    function textScaleFun(obj, height_num, textColor, fontFamily) {
        var result = new egret.TextField();
        if (textColor || textColor == 0x000000)
            obj.textColor = textColor;
        fontFamily ? obj.fontFamily = fontFamily : obj.fontFamily = "sans-serif";
        result.fontFamily = obj.fontFamily;
        result.text = "Mrz默认值qgy";
        if (result.text && result.height != 0) {
            while (result.height < gh * height_num) {
                result.size++;
            }
            while (result.height > gh * height_num) {
                result.size--;
            }
        }
        obj.size = result.size;
    }
    Lgs.textScaleFun = textScaleFun;
    function textScaleXFun(obj, objText, maxWidth) {
        var result = new egret.TextField();
        result.fontFamily = obj.fontFamily;
        result.text = objText;
        result.size = obj.size;
        if (result.text && result.width != 0) {
            while (result.width > gh * maxWidth) {
                result.size--;
            }
        }
        obj.size = result.size;
    }
    Lgs.textScaleXFun = textScaleXFun;
    /**addQR */
    function addQR(x, y, height, visible, qrUrl) {
        gameDiv = document.getElementsByClassName("egret-player")[0];
        if ($("#QR").attr("src")) {
            myImg.style.display = 'none';
        }
        else {
            myImg = document.createElement("img");
            myImg.style.display = 'none';
        }
        if (qrUrl) {
            myImg.src = qrUrl;
        }
        else {
            myImg.src = $staticUrl + "resource/assets/GameUtil/QR.png";
        }
        myImg.id = "QR";
        gameDiv.appendChild(myImg);
        var timer = egret.setInterval(function () {
            IsQRloadComplete = QRloadComplete(x, y, height);
            if (visible) {
                myImg.style.display = 'block';
            }
            else {
                myImg.style.display = 'none';
            }
            if (IsQRloadComplete) {
                egret.clearInterval(timer);
            }
        }, this, 33);
        /**返回QR是否加载完成 */
        function QRloadComplete(x, y, height) {
            if (document.getElementById('QR')['complete']) {
                setQRposition(x, y, height);
                return true;
            }
            else {
                return false;
            }
        }
    }
    Lgs.addQR = addQR;
    /**设置QR位置 */
    function setQRposition(x, y, height, visible) {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg.width / myImg.height;
        myImg.style.height = height;
        var heightNum = (height.replace("%", "")) / 100;
        var widthNum = (heightNum * window.innerHeight) * w_h;
        myImg.style.width = widthNum + "px";
        var left_x = window.innerWidth / 2 - widthNum / 2 + window.innerHeight * x;
        var left_y = window.innerHeight * y;
        myImg.style.left = left_x + 'px';
        myImg.style.top = left_y + 'px';
        myImg.style.position = "absolute";
        if (visible) {
            myImg.style.display = 'block';
        }
        else {
            myImg.style.display = 'none';
        }
    }
    Lgs.setQRposition = setQRposition;
    function removeQR() {
        myImg.style.display = 'none';
    }
    Lgs.removeQR = removeQR;
    /**仅支持Btn的按钮模型 */
    function BtnMode(obj, notBtn) {
        var thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + GetWidth(obj) / 2;
        obj.y = obj.y + GetHeight(obj) / 2;
        if (!notBtn) {
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, btnView, this);
            removedListener(obj, egret.TouchEvent.TOUCH_BEGIN, btnView, this);
        }
        function btnView(evt) {
            var btnobj = evt.currentTarget;
            egret.Tween.get(btnobj).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
        }
    }
    Lgs.BtnMode = BtnMode;
    /**为圆形shape Btn添加按钮样式 */
    function BtnModeArcShape(obj, notBtn) {
        var thisScale = obj.scaleX;
        if (!notBtn) {
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, btnView, this);
            removedListener(obj, egret.TouchEvent.TOUCH_BEGIN, btnView, this);
        }
        function btnView(evt) {
            var btnobj = evt.currentTarget;
            egret.Tween.get(btnobj).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
        }
    }
    Lgs.BtnModeArcShape = BtnModeArcShape;
    /**知道方向x1,y1,长度z2,求移动方向x2y2 */
    function xyFun(x1, y1, z2) {
        // 弧度
        var hd = Math.atan2(x1, y1);
        var sin = Math.sin(hd); // 得到∠a的对边比斜边;
        var cos = Math.cos(hd); // 得到∠a的临边比斜边
        var x2 = z2 * sin; // 得到对边
        var y2 = z2 * cos; // 得到临边
        return { "x": x2, "y": y2 };
    }
    Lgs.xyFun = xyFun;
    /**
     * 知道角度hd 半径r 求方向大小a2,b2
     * 知道原点x1,y1 求末点x2,y2
     *
     * 计算弧度的两种方式
     * hd = Math.PI/180*rotate ||
     * hd = Math.atan2(x1,y1)
     */
    function xyFun2(hd, r, x1, y1) {
        var sin = Math.sin(hd); // 得到∠a的对边比斜边
        var cos = Math.cos(hd); // 得到∠a的临边比斜边
        var a2 = r * sin; // 得到对边
        var b2 = r * cos; // 得到临边
        var x2 = x1 + a2;
        var y2 = y1 + b2;
        return {
            "a2": a2,
            "b2": b2,
            "x": x2,
            "y": y2
        };
    }
    Lgs.xyFun2 = xyFun2;
    /**
     * 知道长a1高b1的直角三角形 知道c2是新三角形的斜边 求方向大小a2,b2
     * 知道原点x1,y1 方向a1,b1(方向是向量差) 求x2,y2
     */
    function xyFun3(x1, y1, a1, b1, c2) {
        // var c1 = Math.sqrt(a1*a1+b1*b1);
        var hd = Math.atan2(a1, b1);
        var sin = Math.sin(hd); // 得到∠a的对边比斜边
        var cos = Math.cos(hd); // 得到∠a的临边比斜边
        var a2 = c2 * sin; // 得到对边
        var b2 = c2 * cos; // 得到临边
        var x2 = x1 + a2;
        var y2 = y1 + b2;
        return {
            "a2": a2,
            "b2": b2,
            "x": x2,
            "y": y2
        };
    }
    Lgs.xyFun3 = xyFun3;
    /**摇杆 */
    function zFun(a, b, r) {
        if (a * a + b * b <= r * r) {
            return true;
        }
        else {
            return false;
        }
    }
    Lgs.zFun = zFun;
    /**00:00:60 */
    function hmsFun($num) {
        var $timeCount = $num;
        var $h1 = Math.floor($timeCount / 60 / 60);
        var $m1 = Math.floor($timeCount / 60) % 60;
        var $s1 = Math.floor($timeCount) % 60;
        if ($h1 < 10) {
            $h1 = "0" + $h1;
        }
        if ($m1 < 10) {
            $m1 = "0" + $m1;
        }
        if ($s1 < 10) {
            $s1 = "0" + $s1;
        }
        var $hms1 = $h1 + ":" + $m1 + ":" + $s1;
        return $hms1;
    }
    Lgs.hmsFun = hmsFun;
    /**LAlert2 弹出提示 */
    function LAlert2(text, yesCallback, noCallback, thisObj) {
        var alertLayer = new egret.Sprite();
        GameLayer.addChild(alertLayer);
        alertLayer.touchEnabled = true;
        var alertShape = makeaShape(0x000000, 0.4, [0, 0, dw, dh]);
        alertLayer.addChild(alertShape);
        /** 弹窗 */
        var alertBox = new egret.Sprite();
        alertLayer.addChild(alertBox);
        var textWidth = gh * 0.38;
        var popWidth = gh * 0.38 + gh * 0.08;
        /** 弹窗文本 */
        var alertText = new egret.TextField();
        textScaleFun(alertText, gh * 0.0225 / gh, 0x222222);
        alertText.width = textWidth;
        alertText.textAlign = "center";
        alertText.lineSpacing = gh * 0.01;
        alertText.text = text;
        alertText.x = popWidth / 2 - GetWidth(alertText) / 2;
        alertText.y = gh * 0.04;
        var popHeight = GetHeight(alertText) + gh * 0.08;
        /** 弹窗文本"背景"-以及它的mask */
        var bgmask = new egret.Shape();
        alertBox.addChild(bgmask);
        bgmask.graphics.beginFill(0xffffff);
        bgmask.graphics.drawRect(0, 0, GetWidth(alertText) + gh * 0.08, popHeight);
        bgmask.graphics.endFill();
        var alertbg = new egret.Shape();
        alertBox.addChild(alertbg);
        alertbg.graphics.beginFill(0xffffff);
        alertbg.graphics.drawRoundRect(0, 0, GetWidth(alertText) + gh * 0.08, popHeight + gh * 0.075, gh * 0.04);
        alertbg.graphics.endFill();
        alertbg.alpha = 0.9;
        alertbg.mask = bgmask;
        alertBox.addChild(alertText);
        alertBox.x = gw / 2 - GetWidth(alertBox) / 2;
        alertBox.y = gh * 0.5 - GetHeight(alertBox) / 2 - gh * 0.045;
        /** "确定背景"-以及它的mask */
        var yesmask = new egret.Shape();
        alertBox.addChild(yesmask);
        yesmask.graphics.beginFill(0x000000);
        yesmask.graphics.drawRoundRect(0, 0, GetWidth(alertText) + gh * 0.08, popHeight + gh * 0.07, gh * 0.04);
        yesmask.graphics.endFill();
        var yesLayer = new egret.Shape();
        alertBox.addChild(yesLayer);
        yesLayer.graphics.beginFill(0xf8f8f8);
        yesLayer.graphics.drawRect(0, popHeight, GetWidth(alertText) / 2 + gh * 0.04, gh * 0.07);
        yesLayer.graphics.endFill();
        yesLayer.alpha = 0.9;
        yesLayer.mask = yesmask;
        /** "确定文本"*/
        var yesField = new egret.TextField();
        alertBox.addChild(yesField);
        textScaleFun(yesField, gh * 0.028 / gh, 0x1383FE);
        yesField.text = "是";
        yesField.width = textWidth / 2;
        yesField.textAlign = "center";
        yesField.x = GetWidth(yesLayer) / 2 - GetWidth(yesField) / 2;
        yesField.y = popHeight + gh * 0.0225;
        /** "否定背景"-以及它的mask */
        var nomask = new egret.Shape();
        alertBox.addChild(nomask);
        nomask.graphics.beginFill(0x000000);
        nomask.graphics.drawRoundRect(0, 0, GetWidth(alertText) + gh * 0.08, popHeight + gh * 0.07, gh * 0.04);
        nomask.graphics.endFill();
        var noLayer = new egret.Shape();
        alertBox.addChild(noLayer);
        noLayer.graphics.beginFill(0xf8f8f8);
        noLayer.graphics.drawRect(GetWidth(alertText) / 2 + gh * 0.04, popHeight, GetWidth(alertText) / 2 + gh * 0.04, gh * 0.07);
        noLayer.graphics.endFill();
        noLayer.alpha = 0.9;
        noLayer.mask = nomask;
        /** "否定文本" */
        var noField = new egret.TextField();
        alertBox.addChild(noField);
        textScaleFun(noField, gh * 0.028 / gh, 0x1383FE);
        noField.text = "否";
        noField.width = textWidth / 2;
        noField.textAlign = "center";
        noField.x = GetWidth(yesLayer) + GetWidth(noLayer) / 2 - GetWidth(noField) / 2;
        noField.y = popHeight + gh * 0.0225;
        /**弹窗 分割线 */
        var line = new egret.Shape();
        alertBox.addChild(line);
        line.alpha = 0.9;
        // line.graphics.lineStyle(1,0x444444,0.9);
        // line.graphics.moveTo(alertbg.x,popHeight);
        // line.graphics.lineTo(alertbg.x + GetWidth(alertBox),popHeight);
        line.graphics.lineStyle(2, 0xffffff, 0.4);
        line.graphics.moveTo(alertbg.x + 2, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) * 0.1, popHeight);
        line.graphics.moveTo(alertbg.x + GetWidth(alertBox) * 0.9, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) - 2, popHeight);
        line.graphics.lineStyle(2, 0x999999, 0.4);
        line.graphics.moveTo(alertbg.x + GetWidth(alertBox) * 0.1, popHeight);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox) * 0.9, popHeight);
        /**按钮 分割线 */
        var btnLine = new egret.Shape();
        alertBox.addChild(btnLine);
        btnLine.alpha = 0.9;
        btnLine.graphics.lineStyle(3, 0xffffff, 0.4);
        btnLine.graphics.moveTo(popWidth / 2, popHeight + 3);
        btnLine.graphics.lineTo(popWidth / 2, popHeight + gh * 0.07 - 3);
        /** "yes"点击事件 */
        yesLayer.touchEnabled = true;
        yesLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
        function touchbegin() {
            yesLayer.alpha = 0.7;
        }
        function touchend() {
            yesLayer.alpha = 0.9;
        }
        yesLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            yesLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
            GameLayer.removeChild(alertLayer);
            if (yesCallback) {
                yesCallback.call(thisObj);
            }
        }, GameLayer);
        /** "no"点击事件 */
        noLayer.touchEnabled = true;
        noLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, noTouchbegin, GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, noTouchend, GameLayer);
        function noTouchbegin() {
            noLayer.alpha = 0.7;
        }
        function noTouchend() {
            noLayer.alpha = 0.9;
        }
        noLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            noLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, noTouchbegin, GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, noTouchend, GameLayer);
            GameLayer.removeChild(alertLayer);
            if (noCallback) {
                noCallback.call(thisObj);
            }
        }, GameLayer);
    }
    Lgs.LAlert2 = LAlert2;
    /**判断是否为整数 */
    function isInteger(obj) {
        return typeof obj === 'number' && obj % 1 === 0;
    }
    Lgs.isInteger = isInteger;
    /**打字机效果 */
    function typerFun(txt, speed, loopcallback, callback, thisObj) {
        var str = txt + "";
        var len = str.length;
        var num = 0;
        var result = "";
        var typerInt = egret.setInterval(function () {
            if (num < len) {
                num++;
                if (num % 2 == 1) {
                    result = str.substring(0, num);
                }
                else {
                    result = str.substring(0, num) + "_";
                }
            }
            else {
                egret.clearInterval(typerInt);
                result = str.substring(0, num);
                // this.daziChannel.stop();
                if (callback) {
                    callback.call(this);
                }
            }
            loopcallback.call(this, result);
        }, thisObj, speed);
        // },30);
    }
    Lgs.typerFun = typerFun;
    /**画虚线 */
    // let xuxian = zXuain( 0x31053A, 2, new egret.Point(this.arcLayer.x,this.arcLayer.y) 
    // ,new egret.Point(this.arcLayer.x+gh*0.11,this.arcLayer.y-gh*0.03),gh*0.006,gh*0.004);
    // descLayer.addChild(xuxian);
    // let zhixian = drawZhian( 0x31053A, 2, new egret.Point(this.arcLayer.x,this.arcLayer.y) 
    // ,new egret.Point(this.arcLayer.x+gh*0.11,this.arcLayer.y-gh*0.03));
    // descLayer.addChild(zhixian);
    // xuxian.mask = zhixian;
    /**直虚线 */
    function zXuain(color, thickness, pt1, pt2, xdlen, jage) {
        var shape = new egret.Shape();
        var num = 0;
        var num1 = 0;
        var num2 = egret.Point.distance(pt1, pt2);
        shape.x = pt1.x;
        shape.y = pt1.y;
        var p1 = new egret.Point(0, 0);
        var p2 = new egret.Point(pt2.x - pt1.x, pt2.y - pt1.y);
        shape.graphics.lineStyle(thickness, color);
        shape.graphics.moveTo(p1.x, p1.y);
        var q2 = { x: p1.x, y: p1.y };
        while (num1 < num2) {
            if (num % 2 == 0) {
                q2 = xyFun3(q2.x, q2.y, p2.x, p2.y, xdlen);
                num1 += xdlen;
                shape.graphics.lineTo(q2.x, q2.y);
            }
            else {
                q2 = xyFun3(q2.x, q2.y, p2.x, p2.y, jage);
                num1 += jage;
                shape.graphics.moveTo(q2.x, q2.y);
            }
            num++;
        }
        shape.graphics.endFill();
        return shape;
    }
    Lgs.zXuain = zXuain;
    /**画直线 */
    function drawZhian(color, thickness, p1, p2) {
        var shape = new egret.Shape();
        shape.graphics.lineStyle(thickness, color);
        shape.graphics.moveTo(0, 0);
        shape.graphics.lineTo(p2.x - p1.x, p2.y - p1.y);
        shape.graphics.endFill();
        shape.x = p1.x;
        shape.y = p1.y;
        return shape;
    }
    Lgs.drawZhian = drawZhian;
})(Lgs || (Lgs = {}));
//# sourceMappingURL=util_game.js.map