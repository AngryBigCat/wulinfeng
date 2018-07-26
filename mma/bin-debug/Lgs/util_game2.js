/**信息展示 */
var gameInfoView;
/**数据提示 数据组 */
var LTipsArr = [];
var myDebug = true;
var myImg2;
var Lgs;
(function (Lgs) {
    // showloading();
    function load1() {
        var waitLayer = new egret.Sprite();
        $gameStage.addChild(waitLayer);
        var waitSHape = Lgs.makeaShape(0x000000, 0.4, [0, 0, dw, dh]);
        waitLayer.addChild(waitSHape);
        /**loadingPoint */
        var loadPointArr = [];
        var pointRadius = gh * 0.0055;
        var loadingRadius = gh * 0.022;
        var loadingLayer = new egret.Sprite();
        waitLayer.addChild(loadingLayer);
        loadingLayer.x = gw / 2 - gh * 0.0025;
        loadingLayer.y = gh * 0.436;
        for (var i = 0; i < 8; i++) {
            var point1 = new egret.Shape();
            loadingLayer.addChild(point1);
            point1.graphics.beginFill(0xffffff);
            point1.graphics.drawCircle(0, 0, pointRadius);
            point1.graphics.endFill();
            var point = Lgs.xyFun2(Math.PI * 2 * ((i + 1) / 8), loadingRadius, 0, 0);
            point1.x = point.x;
            point1.y = point.y;
            Lgs.removedTweens(point1);
            loadPointArr.push(point1);
        }
        loadingLayer.visible = false;
        function loadingStart() {
            var _loop_1 = function (i) {
                var point1 = loadPointArr[i];
                Lgs.removedTweens(point1);
                point1.alpha = 0.7;
                egret.Tween.get(point1).wait(i * 130).call(function () {
                    egret.Tween.get(point1, { loop: true }).to({ alpha: 0.1 }, 910);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < loadPointArr.length; i++) {
                _loop_1(i);
            }
        }
        loadingLayer.visible = true;
        loadingStart.call(this);
    }
    Lgs.load1 = load1;
    function load2() {
        var waitLayer = new egret.Sprite();
        $gameStage.addChild(waitLayer);
        var waitSHape = Lgs.makeaShape(0x000000, 0.4, [0, 0, dw, dh]);
        waitLayer.addChild(waitSHape);
        /**loadingPoint */
        var loadPointArr = [];
        var pointRadius = gh * 0.0055;
        var loadingLayer = new egret.Sprite();
        waitLayer.addChild(loadingLayer);
        loadingLayer.x = gw / 2 - pointRadius * 3 * 2;
        loadingLayer.y = gh * 0.34;
        for (var i = 0; i < 5; i++) {
            var point1 = new egret.Shape();
            loadingLayer.addChild(point1);
            point1.graphics.beginFill(0xffffff);
            point1.graphics.drawArc(0, 0, pointRadius, 0, Math.PI * 2);
            point1.graphics.endFill();
            point1.x = pointRadius * 3 * i;
            Lgs.removedTweens(point1);
            loadPointArr.push(point1);
        }
        // loadingLayer.visible = false;
        loadingStart.call(this);
        function loadingStart() {
            for (var i = 0; i < loadPointArr.length; i++) {
                var point1 = loadPointArr[i];
                Lgs.removedTweens(point1);
                point1.alpha = 0.7;
                egret.Tween.get(point1, { loop: true }).wait(i * 200).to({ alpha: 0 }, 400).to({ alpha: 0.7 }, 400).wait((4 - i) * 200);
            }
        }
    }
    Lgs.load2 = load2;
    /**飘云 */
    function floatCloud() {
        var cloudLayer = new egret.Sprite();
        // let clouddataArr = ["cloud1_png","cloud3_png","cloud2_png","cloud3_png"];
        var clouddataArr = ["home_cloud_png"];
        var cloudArr = [];
        for (var i = 0; i < 10; i++) {
            var cloud1 = Lgs.createBitmapByName(clouddataArr[0]);
            cloudLayer.addChild(cloud1);
            cloud1.x = gw * 1 / 10 * (i + 1);
            cloud1.y = gh * 0.3 + gh * Math.random() * 0.15;
            cloudArr.push(cloud1);
        }
        cloudLayer.addEventListener(egret.Event.ENTER_FRAME, onframe, this);
        Lgs.removedListener(cloudLayer, egret.Event.ENTER_FRAME, onframe, this);
        function onframe() {
            for (var i = 0; i < cloudArr.length; i++) {
                var cloud1 = cloudArr[i];
                cloud1.x -= gh * 0.01 * (cloud1.width / 127);
            }
            for (var i = 0; i < cloudArr.length; i++) {
                var cloud1 = cloudArr[i];
                if (cloud1.x < pw_sx - Lgs.GetWidth(cloud1)) {
                    cloud1.x = gw - pw_sx;
                    cloud1.y = gh * 0.3 + gh * Math.random() * 0.15;
                }
            }
        }
        return cloudLayer;
    }
    Lgs.floatCloud = floatCloud;
    /**addQR2 */
    function addQR2(x, y, height, visible, qrUrl) {
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
            myImg.src = $staticUrl + "/resource/assets/QR.png";
        }
        myImg2.id = "QR2";
        gameDiv.appendChild(myImg2);
        var timer = egret.setInterval(function () {
            IsQRloadComplete = QRloadComplete2(x, y, height);
            if (visible) {
                myImg2.style.display = 'block';
            }
            else {
                myImg2.style.display = 'none';
            }
            if (IsQRloadComplete) {
                egret.clearInterval(timer);
            }
        }, this, 33);
        /**返回QR是否加载完成 */
        function QRloadComplete2(x, y, height) {
            if (document.getElementById('QR2')['complete']) {
                setQRposition2(x, y, height);
                return true;
            }
            else {
                return false;
            }
        }
    }
    Lgs.addQR2 = addQR2;
    /**设置QR位置 */
    function setQRposition2(x, y, height, visible) {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg2.width / myImg2.height;
        myImg2.style.height = height;
        var heightNum = (height.replace("%", "")) / 100;
        var widthNum = (heightNum * window.innerHeight) * w_h;
        myImg2.style.width = widthNum + "px";
        var left_x = window.innerWidth / 2 - widthNum / 2 + window.innerHeight * x;
        var left_y = window.innerHeight * y;
        myImg2.style.left = left_x + 'px';
        myImg2.style.top = left_y + 'px';
        myImg2.style.position = "absolute";
        if (visible) {
            myImg2.style.display = 'block';
        }
        else {
            myImg2.style.display = 'none';
        }
    }
    Lgs.setQRposition2 = setQRposition2;
    /**提示锁定竖屏游戏 */
    function uprightTipsFun() {
        var uprightResultLayer = new egret.Sprite();
        uprightResultLayer.touchEnabled = true;
        // uprightResultLayer.rotation = 90;
        // uprightResultLayer.x = gw;
        var uprightShape = new egret.Shape();
        uprightResultLayer.addChild(uprightShape);
        uprightShape.graphics.beginFill(0x000000);
        uprightShape.graphics.drawRect(0, 0, gw, gh);
        uprightShape.graphics.endFill();
        // let hengping = createBitmapByName("hengping_png");
        // uprightResultLayer.addChild(hengping);
        // hengping.x = gh/2 - GetWidth(hengping)/2;
        // hengping.y = gw/2 - GetHeight(hengping);
        var hpTipsField = new egret.TextField();
        uprightResultLayer.addChild(hpTipsField);
        Lgs.textScaleFun(hpTipsField, 0.07, 0xffffff);
        hpTipsField.textAlign = "center";
        hpTipsField.text = "请锁定竖屏横置手机以获得最佳体验"; /**\n 换行*/
        hpTipsField.x = gw / 2 - Lgs.GetWidth(hpTipsField) / 2;
        hpTipsField.y = gh / 2 - Lgs.GetHeight(hpTipsField) / 2 - gh * 0.03;
        return uprightResultLayer;
    }
    Lgs.uprightTipsFun = uprightTipsFun;
    /**弹窗动画 */
    function winEnterAni(tcShape, winLayer, 
        /** "scale01" "scale21" "up" "down" "right" "left" */
        aniStyle, callback, thisObj) {
        var shapeAlpha = tcShape.alpha;
        tcShape.alpha = 0;
        winLayer.alpha = 0;
        winLayer.width = gw;
        winLayer.height = gh;
        winLayer.anchorOffsetX = gw / 2;
        winLayer.anchorOffsetY = gh / 2;
        winLayer.x = gw / 2;
        winLayer.y = gh / 2;
        egret.Tween.get(tcShape).to({ alpha: shapeAlpha }, 320, egret.Ease.quadOut);
        egret.Tween.get(winLayer).to({ alpha: 1 }, 320, egret.Ease.quadOut);
        switch (aniStyle) {
            case "scale01":
                winLayer.x = gw / 2;
                winLayer.scaleX = winLayer.scaleY = 0;
                egret.Tween.get(winLayer).to({ scaleX: 1, scaleY: 1 }, 320, egret.Ease.backOut).call(aniEndFun, thisObj);
                break;
            case "scale21":
                winLayer.x = gw / 2;
                winLayer.scaleX = winLayer.scaleY = initScale * 2;
                egret.Tween.get(winLayer).to({ scaleX: 1, scaleY: 1 }, 320, egret.Ease.backOut).call(aniEndFun, thisObj);
                break;
            case "up":
                winLayer.y = gh * 1.5;
                egret.Tween.get(winLayer).to({ y: gh * 0.5 }, 370, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "down":
                winLayer.y = -gh * 1.5;
                egret.Tween.get(winLayer).to({ y: gh * 0.5 }, 370, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "left":
                winLayer.x = gw * 1.5;
                egret.Tween.get(winLayer).to({ x: gw * 0.5 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "right":
                winLayer.x = -gw * 1.5;
                egret.Tween.get(winLayer).to({ x: gw * 0.5 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "fadeIn":
                winLayer.alpha = 0;
                egret.Tween.get(winLayer).to({ alpha: 1 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
        }
        function aniEndFun() {
            if (callback) {
                callback.call(thisObj);
            }
        }
    }
    Lgs.winEnterAni = winEnterAni;
    function winCloseAni(tcShape, winLayer, aniStyle, callback, thisObj, delay) {
        var delaynum = 0;
        delay ? delaynum = delaynum : delaynum = 0;
        egret.Tween.get(tcShape).wait(delaynum).to({ alpha: 0 }, 320);
        egret.Tween.get(winLayer).wait(delaynum).to({ alpha: 0 }, 320);
        switch (aniStyle) {
            case "scale01":
                egret.Tween.get(winLayer).wait(delaynum).to({ scaleX: 0, scaleY: 0 }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "scale21":
                egret.Tween.get(winLayer).wait(delaynum).to({ scaleX: 2, scaleY: 2 }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "up":
                egret.Tween.get(winLayer).wait(delaynum).to({ y: -gh }, 370, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "down":
                egret.Tween.get(winLayer).wait(delaynum).to({ y: gh }, 370, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "left":
                egret.Tween.get(winLayer).wait(delaynum).to({ x: -gw }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "right":
                egret.Tween.get(winLayer).wait(delaynum).to({ x: gw }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "fadeOut":
                egret.Tween.get(winLayer).wait(delaynum).to({ alpha: 0 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
        }
        function aniEndFun() {
            if (callback) {
                callback.call(thisObj);
            }
        }
    }
    Lgs.winCloseAni = winCloseAni;
    /**仅支持Bitmap的Btn2的闪光按钮模型2 */
    function BtnMode2(obj, notBtn) {
        var thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + Lgs.GetWidth(obj) / 2;
        obj.y = obj.y + Lgs.GetHeight(obj) / 2;
        var Btn33 = Lgs.createBitmapByName("Btn33_png");
        Lgs.scaleFun(Btn33, Lgs.GetHeight(obj) / gh);
        obj.parent.addChild(Btn33);
        var obj2 = new egret.Bitmap();
        obj2.texture = obj.texture;
        obj2.scaleX = obj2.scaleY = thisScale * 0.95;
        obj.parent.addChild(obj2);
        obj2.anchorOffsetX = obj.anchorOffsetX;
        obj2.anchorOffsetY = obj.anchorOffsetY;
        obj2.x = obj.x;
        obj2.y = obj.y - Lgs.GetHeight(obj) * 0.05;
        Btn33.mask = obj2;
        Btn33.x = obj2.x - Lgs.GetWidth(obj) / 2 - Lgs.GetWidth(Btn33);
        Btn33.y = obj2.y - Lgs.GetHeight(obj) / 2;
        Btn33.alpha = 0.7;
        Lgs.removedTweens(Btn33);
        egret.Tween.get(Btn33, { loop: true })
            .wait(1000)
            .to({ x: obj.x + Lgs.GetWidth(obj) / 2 }, 1000);
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            Lgs.LremoveChild(obj2);
            Lgs.LremoveChild(Btn33);
        }, obj);
        if (!notBtn) {
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                egret.Tween.get(obj).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                    .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
                egret.Tween.get(obj2).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                    .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
            }, this);
        }
    }
    Lgs.BtnMode2 = BtnMode2;
    /**LInfoView 信息展示 debug,
     * textArr = [[数据名称,数据的值],[数据名称,数据的值]];
    */
    function LInfoView(textArr) {
        if (gameInfoView && gameInfoView.parent) {
            gameInfoView.parent.removeChild(gameInfoView);
        }
        gameInfoView = new egret.Sprite();
        GameLayer.addChild(gameInfoView);
        // gameInfoView.touchEnabled = true;
        var tsShape = new egret.Shape();
        gameInfoView.addChild(tsShape);
        tsShape.graphics.beginFill(0x000000);
        tsShape.graphics.drawRect(0, 0, gw, gh);
        tsShape.graphics.endFill();
        tsShape.alpha = 0;
        var tsBox = new egret.Sprite();
        gameInfoView.addChild(tsBox);
        var tsbg = new egret.Shape();
        tsBox.addChild(tsbg);
        for (var i = 0; i < textArr.length; i++) {
            var tsText = new egret.TextField();
            tsText.text = textArr[i][0] + ":";
            Lgs.textScaleFun(tsText, 0.022, 0x333333);
            // tsText.textAlign = "center";
            // tsText.width = gh*0.38;
            tsText.x = 0;
            tsText.y = gh * 0.03 * i;
            tsBox.addChild(tsText);
            var tsText2 = new egret.TextField();
            tsText2.text = textArr[i][1] + "";
            Lgs.textScaleFun(tsText2, 0.022, 0x333333);
            // tsText2.textAlign = "center";
            // tsText2.width = gh*0.38;
            tsText2.x = tsText.x + Lgs.GetWidth(tsText) + gh * 0.01;
            tsText2.y = tsText.y;
            tsBox.addChild(tsText2);
        }
        tsbg.graphics.beginFill(0xFFBC01);
        tsbg.graphics.drawRect(0, 0, Lgs.GetWidth(tsBox) + gh * 0.025, Lgs.GetHeight(tsBox) + gh * 0.025);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.8;
        tsbg.x = -gh * 0.025 / 2;
        tsbg.y = -gh * 0.025 / 2;
        tsBox.x = gw - Lgs.GetWidth(tsbg) + gh * 0.025 / 2;
        tsBox.y = gh * 0.025 / 2;
    }
    Lgs.LInfoView = LInfoView;
    /**LTips 数据提示 debug*/
    function LTips(obj, objName, callback) {
        if (!myDebug) {
            return false;
        }
        var tsLayer = new egret.Sprite();
        GameLayer.parent.addChild(tsLayer);
        tsLayer.touchEnabled = true;
        var tsText = new egret.TextField();
        if (objName) {
            tsText.text = objName + ":" + obj + " >> " + typeof (obj);
        }
        else {
            tsText.text = obj + " >> " + typeof (obj);
        }
        Lgs.textScaleFun(tsText, 0.022, 0xffffff);
        tsText.textAlign = "center";
        tsText.width = gh * 0.38;
        tsText.x = gw / 2 - Lgs.GetWidth(tsText) / 2;
        tsText.y = 10;
        var tsbg = new egret.Shape();
        tsLayer.addChild(tsbg);
        tsbg.graphics.beginFill(0xff0000);
        tsbg.graphics.drawRect(0, 0, gw, Lgs.GetHeight(tsText) + 20);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.85;
        tsbg.x = gw / 2 - Lgs.GetWidth(tsbg) / 2;
        tsLayer.addChild(tsText);
        if (LTipsArr.length > 0) {
            tsLayer.y = LTipsArr[LTipsArr.length - 1].y + Lgs.GetHeight(LTipsArr[LTipsArr.length - 1]);
        }
        LTipsArr.push(tsLayer);
        tsLayer.touchEnabled = true;
        tsLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            tsLayer.parent.removeChild(tsLayer);
            if (callback) {
                callback.call(this);
            }
            for (var i = 0; i < LTipsArr.length; i++) {
                var thiscue = LTipsArr[i];
                if (thiscue.hashCode == tsLayer.hashCode) {
                    LTipsArr.splice(i, 1);
                }
            }
            for (var i = 0; i < LTipsArr.length; i++) {
                var thiscue = LTipsArr[i];
                if (i == 0) {
                    thiscue.y = 0;
                }
                else {
                    thiscue.y = LTipsArr[i - 1].y + Lgs.GetHeight(LTipsArr[i - 1]);
                }
            }
        }, this);
    }
    Lgs.LTips = LTips;
})(Lgs || (Lgs = {}));
//# sourceMappingURL=util_game2.js.map