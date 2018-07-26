var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lgs;
(function (Lgs) {
    var LBgm = (function (_super) {
        __extends(LBgm, _super);
        function LBgm() {
            var _this = _super.call(this) || this;
            _this.canRun = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LBgm.prototype.onAddToStage = function () {
            this.bgmLayer = Lgs.createBitmapByName('musicOn_png');
            Lgs.scaleFun(this.bgmLayer, 0.06);
            this.addChild(this.bgmLayer);
            this.bgmLayer.touchEnabled = true;
            this.x = gw - pw_sx - Lgs.GetWidth(this) - gh * 0.015;
            this.y = gh * 0.02;
            Lgs.BtnMode(this.bgmLayer);
            this.bgmLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.on_off, this);
            if (this.canRun) {
                this.Timer = new egret.Timer(30);
                this.Timer.addEventListener(egret.TimerEvent.TIMER, this.Run, this);
            }
            /**直接播放bgm */
            if (egret.localStorage.getItem(localbgmStr) != "pause") {
                if (egret.localStorage.getItem(localbgmStr) == null)
                    egret.localStorage.setItem(localbgmStr, "play");
                this.play();
            }
            else {
                this.pause();
            }
        };
        LBgm.prototype.setnewPosition = function (x, y, rotate) {
            this.x = x;
            this.y = y;
            if (rotate || rotate == 0) {
                this.rotation = rotate;
            }
        };
        LBgm.prototype.setinitPosition = function () {
            this.rotation = 0;
            this.x = gw - pw_sx - Lgs.GetWidth(this) - gh * 0.016;
            this.y = gh * 0.016;
        };
        LBgm.prototype.Run = function () {
            this.bgmLayer.rotation += 2;
        };
        LBgm.prototype.on_off = function () {
            if (this.isPlay) {
                // canMusic = false;
                egret.localStorage.setItem(localbgmStr, "pause");
                stopOtherAudio("bgm");
                this.pause();
            }
            else {
                // canMusic = true;
                egret.localStorage.setItem(localbgmStr, "play");
                this.play();
            }
            // playAudio("touchBtn",0);
        };
        LBgm.prototype.play = function () {
            if (this.canRun) {
                this.Timer.start();
            }
            this.isPlay = true;
            this.bgmLayer.texture = RES.getRes('musicOn_png');
            $('#bgm')[0].play();
        };
        LBgm.prototype.pause = function () {
            if (this.canRun) {
                this.bgmLayer.rotation = 0;
                this.Timer.stop();
            }
            this.isPlay = false;
            this.bgmLayer.texture = RES.getRes('musicOff_png');
            $('#bgm')[0].pause();
        };
        LBgm.prototype.show = function () {
            this.bgmLayer.visible = true;
        };
        LBgm.prototype.hide = function () {
            this.bgmLayer.visible = false;
        };
        return LBgm;
    }(egret.DisplayObjectContainer));
    Lgs.LBgm = LBgm;
    __reflect(LBgm.prototype, "Lgs.LBgm");
})(Lgs || (Lgs = {}));
(function (Lgs) {
    var LScreen = (function (_super) {
        __extends(LScreen, _super);
        function LScreen(canRun) {
            var _this = _super.call(this) || this;
            _this.isShow = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LScreen.prototype.onAddToStage = function () {
            this.touchEnabled = true;
            this.screenMask = new egret.Shape();
            this.addChild(this.screenMask);
            var matrix = new egret.Matrix();
            matrix.createGradientBox(gh, gh, Math.PI * 0.5, 0, 0);
            this.screenMask.graphics.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000, 0x000000, 0x000000], [0, 0.7, 0.7, 0], [255 * 0.38, 255 * 0.4, 255 * 0.52, 255 * 0.54], matrix);
            this.screenMask.graphics.drawRect(0, 0, gh, gh);
            this.screenMask.graphics.endFill();
            this.screenMask.x = (gw - gh) / 2;
            this.screenMask.alpha = 0.5;
            this.loadText = new egret.TextField();
            this.addChild(this.loadText);
            Lgs.textScaleFun(this.loadText, 0.028, 0xffffff);
            this.loadText.text = "网络请求中";
            this.loadText.x = gw / 2 - Lgs.GetWidth(this.loadText) / 2;
            this.loadText.y = gh * 0.42;
            this.loadText.alpha = 0.8;
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("loading_json"), RES.getRes("loading_png"));
            this.loadingMc = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
            this.loadingMc.scaleX = this.loadingMc.scaleY = initScale * 0.4;
            this.addChild(this.loadingMc);
            this.loadingMc.x = gw / 2 - Lgs.GetWidth(this.loadingMc) / 2;
            this.loadingMc.frameRate = 18;
            this.loadingMc.y = gh * 0.46;
            this.loadingMc.gotoAndPlay("run", -1);
        };
        LScreen.prototype.loadingShow = function (txt) {
            this.touchEnabled = true;
            this.visible = true;
            this.loadingMc.play();
            txt ? txt = txt : txt = "网络请求中";
            this.loadText.text = txt;
            this.loadText.x = gw / 2 - Lgs.GetWidth(this.loadText) / 2;
        };
        LScreen.prototype.loadingHide = function () {
            this.visible = false;
            this.loadingMc.stop();
        };
        return LScreen;
    }(egret.DisplayObjectContainer));
    Lgs.LScreen = LScreen;
    __reflect(LScreen.prototype, "Lgs.LScreen");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LBgm.js.map