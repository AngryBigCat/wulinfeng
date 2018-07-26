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
    var loadUI = (function (_super) {
        __extends(loadUI, _super);
        function loadUI() {
            var _this = _super.call(this) || this;
            _this.htmlResnum = 69;
            _this.total = 0;
            /** 进度条样式是否加载完成 */
            _this.jdtiao_ok = false;
            _this.loadsArr = [];
            return _this;
        }
        loadUI.prototype.setProgress = function (current, total, text) {
            if (this.jdtiao_ok) {
                if (current == 1) {
                    this.total = total;
                }
                this.loadText.text = Math.floor(current / (total + this.htmlResnum) * 100) + "%";
                this.loadText.x = gw / 2 - Lgs.GetWidth(this.loadText) / 2;
                // this.loadAni.x = this.jdtiao.x + GetWidth(this.jdtiao) - GetWidth(this.loadAni)/2;
                // this.jdtiao.x = gw/2 - GetWidth(this.jdtiao)/2 - GetWidth(this.jdtiao) + GetWidth(this.jdtiao)*current/total;
                // this.jdtiao.x = gw/2 - GetWidth(this.jdbg)/2 - 1 - GetWidth(this.jdtiao) + GetWidth(this.jdtiao)*current/total;
                this.zhezhao.x = this.jdtiao.x - gh * 0.265 + gh * 0.265 * current / (total + this.htmlResnum);
            }
        };
        /** 进度样式创建 */
        loadUI.prototype.createLoading = function () {
            this.touchEnabled = true;
            $gameStage = this.stage;
            /**横屏提示 */
            // uprightTipsLayer = Lgs.uprightTipsFun();
            // this.stage.addChild(uprightTipsLayer);
            // uprightTipsLayer.rotation = 90;
            // uprightTipsLayer.x = gh;
            // uprightTipsLayer.visible = false;
            // if(window.innerWidth<window.innerHeight){
            // 	uprightTipsLayer.visible = false;
            // }
            /**bg */
            // let loadShape = new egret.Shape();
            // this.addChild(loadShape);
            // loadShape.graphics.beginFill(0xffffff);
            // loadShape.graphics.drawRect(0,0,gw,gh);
            // loadShape.graphics.endFill();
            var loadBg = Lgs.createBitmapByName("loadBg_jpg", "bg");
            this.addChild(loadBg);
            // let loadingField = createBitmapByName("loadingField_png");
            // this.addChild(loadingField);
            // loadingField.x = gw/2 - GetWidth(loadingField)/2;
            // loadingField.y = gh*0.44;
            /**其他元件 */
            var eye = Lgs.createBitmapByName("eye_png");
            this.addChild(eye);
            eye.x = gw / 2 + gh * 0.125;
            eye.y = gh * 0.141;
            // eye.alpha = 0.5;
            var load_light = Lgs.createBitmapByName("load_light_png");
            this.addChild(load_light);
            load_light.x = pw_sx;
            load_light.y = -gh * 0.005;
            Lgs.BtnMode(eye, true);
            Lgs.removedTweens(eye);
            egret.Tween.get(eye, { loop: true })
                .to({ alpha: 0.3 }, 1000)
                .to({ alpha: 1 }, 1000);
            load_light.alpha = 0.5;
            Lgs.removedTweens(load_light);
            egret.Tween.get(load_light, { loop: true })
                .to({ alpha: 0.9 }, 1500)
                .to({ alpha: 0.5 }, 1500);
            var load_title = Lgs.createBitmapByName("load_title_png");
            this.addChild(load_title);
            load_title.x = gw / 2 - gh * 0.255;
            load_title.y = gh * 0.097;
            load_title.alpha = 0;
            Lgs.BtnMode(load_title, true);
            load_title.scaleX = load_title.scaleY = 3;
            egret.Tween.get(load_title).wait(100).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceOut);
            egret.Tween.get(load_title).wait(100).to({ alpha: 1 }, 500);
            // let enterBtn = createBitmapByName("enterBtn_png");
            // this.addChild(enterBtn);
            // BtnMode(enterBtn);
            // enterBtn.x = gw/2;
            // enterBtn.y = gh*0.975;
            // enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,enterFun,this);
            // removedListener(enterBtn,egret.TouchEvent.TOUCH_TAP,enterFun,this);
            // function enterFun(evt:egret.TouchEvent){
            // 	// var s = RES.getRes("nomusic_mp3");
            // 	// var sChannel = s.play(0, 1);
            // }
            // let loadingText = createBitmapByName("loadText_png");
            // this.addChild(loadingText);
            // loadingText.x = gw/2 - GetWidth(loadingText)/2 + gh*0.02;
            // loadingText.y = gh*0.7;
            // let loadingText = new egret.TextField();
            // this.addChild(loadingText);
            // textScaleFun(loadingText,0.018);
            // loadingText.text = "正在加载中...";
            // loadingText.x = gw/2 - GetWidth(loadingText)/2;
            // loadingText.y = gh*0.66;
            /**gameslogo */
            // let gamelogo = createBitmapByName("loadLogo_png");
            // this.addChild(gamelogo);
            // gamelogo.x = gw/2 - GetWidth(gamelogo)/2;
            // gamelogo.y = gh*0.175;
            /**圆圈进度条 */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.4;
            // this.jdbg = createBitmapByName("jdbg_png");
            // this.jdbg.anchorOffsetX = this.jdbg.width/2;
            // this.jdbg.anchorOffsetY = this.jdbg.height/2;
            // jdLayer.addChild(this.jdbg);
            // this.jdbg.x = gw/2;
            // // this.jdtiao = createBitmapByName("jdfg_png");
            // // this.jdtiao.anchorOffsetX = this.jdtiao.width/2;
            // // this.jdtiao.anchorOffsetY = this.jdtiao.height/2;
            // // jdLayer.addChild(this.jdtiao);
            // // this.jdtiao.x = gw/2;
            // this.arcShape = new egret.Shape();
            // jdLayer.addChild(this.arcShape);
            // this.arcShape.x = gw/2;
            // this.arcShape.rotation = -90;
            /**图片进度条 */
            var jdLayer = new egret.Sprite();
            this.addChild(jdLayer);
            jdLayer.y = gh * 0.755;
            this.jdbg = Lgs.createBitmapByName("jdbg_png");
            jdLayer.addChild(this.jdbg);
            this.jdbg.x = gw / 2 - Lgs.GetWidth(this.jdbg) / 2;
            this.jdtiao = Lgs.createBitmapByName("jdfg_png");
            jdLayer.addChild(this.jdtiao);
            // this.jdtiao.x = gw/2 - GetWidth(this.jdtiao)/2;
            this.jdtiao.x = this.jdbg.x;
            this.jdtiao.y = this.jdbg.y;
            this.zhezhao = Lgs.createBitmapByName("jdfg_png");
            jdLayer.addChild(this.zhezhao);
            // this.zhezhao.x = this.jdtiao.x - GetWidth(this.zhezhao);
            this.zhezhao.x = this.jdtiao.x - gh * 0.265;
            this.zhezhao.y = this.jdtiao.y;
            this.jdtiao.mask = this.zhezhao;
            /**图片进度条 width5 length */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.435;
            // for(let i=0;i<5;i++){
            // 	let loadChicken = createBitmapByName("loadChicken_png");
            // 	jdLayer.addChild(loadChicken);
            // 	loadChicken.x = gw/2 - GetWidth(loadChicken)/2 - GetWidth(loadChicken)*2 + GetWidth(loadChicken)*i;
            // 	loadChicken.alpha = 0;
            // 	this.loadsArr.push(loadChicken);
            // }
            /**进度条动画MovieClip */
            // let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("loadAni_json"),RES.getRes("loadAni_png"));
            // this.loadAni = new egret.MovieClip(mcDataFactory.generateMovieClipData("loadAni"));
            // jdLayer.addChild(this.loadAni);
            // // this.addChild(this.loadAni);
            // this.loadAni.scaleX = initScale*-1;
            // this.loadAni.scaleY = initScale;
            // this.loadAni.anchorOffsetX = this.loadAni.width/2;
            // this.loadAni.anchorOffsetY = this.loadAni.height/2;
            // this.loadAni.x = this.jdtiao.x + GetWidth(this.jdtiao) - GetWidth(this.loadAni)/2;
            // this.loadAni.y = this.jdtiao.y - GetHeight(this.loadAni)/2;
            // this.loadAni.gotoAndPlay("run",-1);
            // removedTweens(this.loadAni);
            // let loadAniy = this.loadAni.y;
            // egret.Tween.get(this.loadAni,{loop:true})
            // .to({y:loadAniy-gh*0.015},500)
            // .to({y:loadAniy},500);
            /**进度条动画bitmap */
            // this.loadAni = createBitmapByName("loadAni_png");
            // jdLayer.addChild(this.loadAni);
            // this.loadAni.anchorOffsetX = this.loadAni.width/2;
            // this.loadAni.anchorOffsetY = this.loadAni.height/2;
            // this.loadAni.x = this.jdtiao.x + GetWidth(this.jdtiao) - GetWidth(this.loadAni)/2;
            // this.loadAni.y = this.jdtiao.y + GetHeight(this.jdtiao)/2;
            // let loadAniy = this.loadAni.y;
            // egret.Tween.get(this.loadAni,{loop:true})
            // .to({y:loadAniy - gh*0.03},500)
            // .to({y:loadAniy},500);
            // this.loadAni.addEventListener(egret.Event.ENTER_FRAME,loadOnframe,this);
            // removedFromStage(this.loadAni,false,[loadOnframe,this]);
            // let _THIS = this;
            // function loadOnframe(){
            // 	_THIS.loadAni.rotation += 3;
            // }
            /**纯色进度条 */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.61;
            // this.jdbg = new egret.Shape();
            // jdLayer.addChild(this.jdbg);
            // this.jdbg.graphics.beginFill(0x185A8A);
            // this.jdbg.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.jdbg.graphics.endFill();
            // this.jdbg.x = gw/2 - GetWidth(this.jdbg)/2;
            // this.jdbg.y = 0;
            // this.jdtiao = new egret.Shape();
            // jdLayer.addChild(this.jdtiao);
            // this.jdtiao.graphics.beginFill(0xffffff);
            // // this.jdtiao.graphics.drawRoundRect(0,0,gh*0.36-gh*0.006,gh*0.02-gh*0.006,gh*0.02-gh*0.006);
            // this.jdtiao.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.jdtiao.graphics.endFill();
            // // this.jdtiao.x = this.jdbg.x + gh*0.003;
            // // this.jdtiao.y = this.jdbg.y + gh*0.003;
            // this.jdtiao.x = this.jdbg.x;
            // this.jdtiao.y = this.jdbg.y;
            // this.zhezhao = new egret.Shape();
            // jdLayer.addChild(this.zhezhao);
            // this.zhezhao.graphics.beginFill(0xffffff);
            // // this.zhezhao.graphics.drawRoundRect(0,0,gh*0.36-gh*0.006,gh*0.02-gh*0.006,gh*0.02-gh*0.006);
            // this.zhezhao.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.zhezhao.graphics.endFill();
            // this.zhezhao.x = this.jdtiao.x;
            // this.zhezhao.y = this.jdtiao.y;
            // this.jdtiao.mask = this.zhezhao;
            /**loadingAni or notAni*/
            // let loadingDataFactory = new egret.MovieClipDataFactory(RES.getRes("loading_json"),RES.getRes("loading_png"));
            // let loadingAni = new egret.MovieClip(loadingDataFactory.generateMovieClipData("loading"));
            // this.addChild(loadingAni);
            // loadingAni.scaleX = loadingAni.scaleY = initScale;
            // loadingAni.gotoAndStop(3);
            // loadingAni.x = gw/2 - GetWidth(loadingAni)/2;;
            // loadingAni.y = gh*0.73;
            // loadingAni.gotoAndPlay("run",-1);
            /**进度字体 */
            this.loadText = new egret.TextField();
            Lgs.textScaleFun(this.loadText, 0.0165, 0xffffff);
            // this.loadText.stroke = 4;
            // this.loadText.strokeColor = 0x000000;	
            this.addChild(this.loadText);
            this.loadText.text = 0 + "%";
            this.loadText.x = gw / 2 - Lgs.GetWidth(this.loadText) / 2;
            this.loadText.y = gh * 0.87;
            /**进度字体 特殊字体 */
            // this.loadText = new egret.BitmapText();
            // this.loadText.font = RES.getRes('perNum_fnt');
            // this.addChild(this.loadText);
            // this.loadText.text  = 0+"%";
            // scaleFun(this.loadText,0.038);			
            // this.loadText.x = gw/2 - GetWidth(this.loadText)/2;
            // this.loadText.y = gh*0.63;
            /**进度条样式加载完成 */
            this.jdtiao_ok = true;
        };
        loadUI.prototype.drawAecShape = function (angle) {
            angle = angle % 361;
            this.arcShape.graphics.clear();
            this.arcShape.graphics.lineStyle(gh * 0.015, 0xffffff, 1);
            this.arcShape.graphics.drawArc(0, 0, Lgs.GetWidth(this.jdbg) / 2 - gh * 0.014, 0, angle * Math.PI / 180, false);
            this.arcShape.graphics.endFill();
            // this.jdbg.mask = this.arcShape;
        };
        /**移除loadUI时执行 */
        loadUI.prototype.RemovedFun = function () {
        };
        return loadUI;
    }(egret.Sprite));
    Lgs.loadUI = loadUI;
    __reflect(loadUI.prototype, "Lgs.loadUI");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=loadUI.js.map