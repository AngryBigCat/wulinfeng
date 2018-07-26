var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var localStartGame2 = false;
var Lgs;
(function (Lgs) {
    var LHomePage = (function (_super) {
        __extends(LHomePage, _super);
        function LHomePage(callback, thisObj, rankData, num) {
            var _this = _super.call(this) || this;
            _this.callback = false;
            _this.thisObj = false;
            if (callback)
                _this.callback = callback;
            if (thisObj)
                _this.thisObj = thisObj;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LHomePage.prototype.onAddToStage = function () {
            // bgmViewer.show();
            var _THIS = this;
            this.touchEnabled = true;
            var isJump = false;
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            // let homebg = createBitmapByName("homeBg_jpg","bg");
            // bgLayer.addChild(homebg);
            var homebg = Lgs.makeaShape(0xffffff, 0.9);
            bgLayer.addChild(homebg);
            var cgLayer = new egret.Sprite();
            bgLayer.addChild(cgLayer);
            /**其他元件 */
            var home_mask = Lgs.createBitmapByName("home_mask_jpg");
            fgLayer.addChild(home_mask);
            home_mask.x = gw / 2 - Lgs.GetWidth(home_mask) / 2;
            home_mask.y = gh;
            /**跳过动画按钮 */
            var jumpBtn = Lgs.createBitmapByName("jumpBtn_png");
            this.addChild(jumpBtn);
            Lgs.BtnMode(jumpBtn, true);
            jumpBtn.x = gw / 2;
            jumpBtn.y = gh * 0.95;
            jumpBtn.visible = false;
            function jumpFun() {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, jumpFun, this);
                ani5to6.call(this);
            }
            /**动画 */
            if (localStartGame2) {
                jumpFun.call(this);
            }
            else {
                aniFun1.call(this);
            }
            function aniFun1() {
                if (isJump)
                    return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var bg1 = Lgs.createBitmapByName("homebg1_jpg", "bg");
                aniLayer.addChild(bg1);
                var text1 = Lgs.createBitmapByName("text1_png");
                aniLayer.addChild(text1);
                text1.x = gw / 2 - gh * 0.26;
                text1.y = gh * 0.275;
                var name1 = Lgs.createBitmapByName("name1_png");
                aniLayer.addChild(name1);
                name1.x = gw / 2 - gh * 0.165;
                name1.y = gh * 0.09;
                Lgs.BtnMode(name1, true);
                var hero1_1 = Lgs.createBitmapByName("hero1_1_png");
                aniLayer.addChild(hero1_1);
                hero1_1.x = gw / 2 - gh * 0.17;
                hero1_1.y = gh * 0.42;
                var hero1_2 = Lgs.createBitmapByName("hero1_2_png");
                aniLayer.addChild(hero1_2);
                hero1_2.x = gw / 2 - gh * 0.19;
                hero1_2.y = gh * 0.42;
                var hero1_3 = Lgs.createBitmapByName("hero1_2_png");
                aniLayer.addChild(hero1_3);
                hero1_3.x = gw / 2 - gh * 0.19;
                hero1_3.y = gh * 0.42;
                Lgs.BtnMode(hero1_3, true);
                bg1.alpha = 0;
                egret.Tween.get(bg1).to({ alpha: 1 }, 1000);
                name1.alpha = 0;
                text1.alpha = 0;
                var text1x = text1.x;
                text1.x = text1.x - gh * 0.05;
                egret.Tween.get(text1).to({ alpha: 1 }, 500);
                egret.Tween.get(text1).to({ x: text1x }, 1500, egret.Ease.quadOut);
                hero1_1.alpha = 0;
                hero1_2.alpha = 0;
                hero1_3.alpha = 0;
                egret.Tween.get(hero1_1).to({ alpha: 1 }, 320);
                var hero1_1x = hero1_1.x;
                egret.Tween.get(hero1_1).to({ x: hero1_1x - gh * 0.02 }, 1500, egret.Ease.quadOut).call(function () {
                    // egret.Tween.get(hero1_1).to({alpha:0},320);
                    hero1_1.alpha = 0;
                    hero1_2.alpha = 1;
                    hero1_3.alpha = 1;
                    egret.Tween.get(hero1_3).to({ alpha: 0, scaleX: 2, scaleY: 2 }, 320, egret.Ease.quadOut);
                    playAudio("long", 0);
                    var name1x = name1.x;
                    var name1y = name1.y;
                    name1.x = name1.x - gh * 0.15;
                    name1.y = name1.y - gh * 0.15;
                    name1.scaleX = name1.scaleY = 3;
                    egret.Tween.get(name1).to({ alpha: 1 }, 200);
                    egret.Tween.get(name1).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.circIn);
                    egret.Tween.get(name1).to({ x: name1x, y: name1y }, 300, egret.Ease.circIn).wait(800).call(function () {
                        egret.Tween.get(aniLayer).to({ alpha: 0 }, 320).call(function () {
                            Lgs.LremoveChild(aniLayer);
                        }, this);
                        aniFun2.call(this);
                    }, this);
                }, this);
            }
            function aniFun2() {
                if (isJump)
                    return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var bg2 = Lgs.createBitmapByName("homebg2_jpg", "bg");
                aniLayer.addChild(bg2);
                var text2 = Lgs.createBitmapByName("text2_png");
                aniLayer.addChild(text2);
                text2.x = gw / 2 + gh * 0.14;
                text2.y = gh * 0.116;
                var name2 = Lgs.createBitmapByName("name2_png");
                aniLayer.addChild(name2);
                name2.x = gw / 2 - gh * 0.275;
                name2.y = gh * 0.089;
                Lgs.BtnMode(name2, true);
                var hero2_1 = Lgs.createBitmapByName("hero2_1_png");
                aniLayer.addChild(hero2_1);
                hero2_1.x = gw / 2 - gh * 0.27;
                hero2_1.y = gh * 0.355;
                var hero2_2 = Lgs.createBitmapByName("hero2_2_png");
                aniLayer.addChild(hero2_2);
                hero2_2.x = gw / 2 - gh * 0.29;
                hero2_2.y = gh * 0.355;
                var hero2_3 = Lgs.createBitmapByName("hero2_2_png");
                aniLayer.addChild(hero2_3);
                hero2_3.x = gw / 2 - gh * 0.29;
                hero2_3.y = gh * 0.355;
                Lgs.BtnMode(hero2_3, true);
                bg2.alpha = 0;
                egret.Tween.get(bg2).to({ alpha: 1 }, 1000);
                name2.alpha = 0;
                text2.alpha = 0;
                var text1x = text2.x;
                text2.x = text2.x - gh * 0.05;
                egret.Tween.get(text2).to({ alpha: 1 }, 500);
                egret.Tween.get(text2).to({ x: text1x }, 1500, egret.Ease.quadOut);
                hero2_1.alpha = 0;
                hero2_2.alpha = 0;
                hero2_3.alpha = 0;
                egret.Tween.get(hero2_1).to({ alpha: 1 }, 320);
                var hero1_1x = hero2_1.x;
                egret.Tween.get(hero2_1).to({ x: hero1_1x - gh * 0.02 }, 1500, egret.Ease.quadOut).call(function () {
                    // egret.Tween.get(hero2_1).to({alpha:0},320);
                    hero2_1.alpha = 0;
                    hero2_2.alpha = 1;
                    hero2_3.alpha = 1;
                    egret.Tween.get(hero2_3).to({ alpha: 0, scaleX: 2, scaleY: 2 }, 320, egret.Ease.quadOut);
                    playAudio("hu", 0);
                    var name1x = name2.x;
                    var name1y = name2.y;
                    name2.x = name2.x - gh * 0.15;
                    name2.y = name2.y - gh * 0.1;
                    name2.scaleX = name2.scaleY = 3;
                    egret.Tween.get(name2).to({ alpha: 1 }, 200);
                    egret.Tween.get(name2).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.circIn);
                    egret.Tween.get(name2).to({ x: name1x, y: name1y }, 300, egret.Ease.circIn).wait(800).call(function () {
                        egret.Tween.get(aniLayer).to({ alpha: 0 }, 320).call(function () {
                            Lgs.LremoveChild(aniLayer);
                        }, this);
                        aniFun3.call(this);
                    }, this);
                }, this);
            }
            function aniFun3() {
                if (isJump)
                    return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var bg3 = Lgs.createBitmapByName("homebg3_jpg", "bg");
                aniLayer.addChild(bg3);
                var text3 = Lgs.createBitmapByName("text3_png");
                aniLayer.addChild(text3);
                text3.x = gw / 2 - gh * 0.256;
                text3.y = gh * 0.31;
                var name3 = Lgs.createBitmapByName("name3_png");
                aniLayer.addChild(name3);
                name3.x = gw / 2 - gh * 0.25;
                name3.y = gh * 0.1;
                Lgs.BtnMode(name3, true);
                var hero3_1 = Lgs.createBitmapByName("hero3_1_png");
                aniLayer.addChild(hero3_1);
                hero3_1.x = gw / 2 - gh * 0.13;
                hero3_1.y = gh * 0.431;
                var hero3_2 = Lgs.createBitmapByName("hero3_2_png");
                aniLayer.addChild(hero3_2);
                hero3_2.x = gw / 2 - gh * 0.15;
                hero3_2.y = gh * 0.431;
                var hero3_3 = Lgs.createBitmapByName("hero3_2_png");
                aniLayer.addChild(hero3_3);
                hero3_3.x = gw / 2 - gh * 0.15;
                hero3_3.y = gh * 0.431;
                // BtnMode(hero3_3,true);
                hero3_3.anchorOffsetX = 280;
                hero3_3.anchorOffsetY = 294;
                hero3_3.x = hero3_3.x + 280;
                hero3_3.y = hero3_3.y + 294;
                bg3.alpha = 0;
                egret.Tween.get(bg3).to({ alpha: 1 }, 1000);
                name3.alpha = 0;
                text3.alpha = 0;
                var text1x = text3.x;
                text3.x = text3.x - gh * 0.05;
                egret.Tween.get(text3).to({ alpha: 1 }, 500);
                egret.Tween.get(text3).to({ x: text1x }, 1500, egret.Ease.quadOut);
                hero3_1.alpha = 0;
                hero3_2.alpha = 0;
                hero3_3.alpha = 0;
                egret.Tween.get(hero3_1).to({ alpha: 1 }, 320);
                var hero1_1x = hero3_1.x;
                egret.Tween.get(hero3_1).to({ x: hero1_1x - gh * 0.02 }, 1500, egret.Ease.quadOut).call(function () {
                    // egret.Tween.get(hero3_1).to({alpha:0},320);
                    hero3_1.alpha = 0;
                    hero3_2.alpha = 1;
                    hero3_3.alpha = 1;
                    egret.Tween.get(hero3_3).to({ alpha: 0, scaleX: 2, scaleY: 2 }, 320, egret.Ease.quadOut);
                    playAudio("feng", 0);
                    var name1x = name3.x;
                    var name1y = name3.y;
                    name3.x = name3.x - gh * 0.15;
                    name3.y = name3.y - gh * 0.1;
                    name3.scaleX = name3.scaleY = 3;
                    egret.Tween.get(name3).to({ alpha: 1 }, 200);
                    egret.Tween.get(name3).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.circIn);
                    egret.Tween.get(name3).to({ x: name1x, y: name1y }, 300, egret.Ease.circIn).wait(800).call(function () {
                        egret.Tween.get(aniLayer).to({ alpha: 0 }, 320).call(function () {
                            Lgs.LremoveChild(aniLayer);
                        }, this);
                        aniFun4.call(this);
                    }, this);
                }, this);
            }
            function aniFun4() {
                if (isJump)
                    return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var aniShape = Lgs.makeaShape(0x000000, 0.9);
                aniLayer.addChild(aniShape);
                var layer1 = new egret.Sprite();
                aniLayer.addChild(layer1);
                var layer2 = new egret.Sprite();
                aniLayer.addChild(layer2);
                var layer3 = new egret.Sprite();
                aniLayer.addChild(layer3);
                var bg1 = Lgs.createBitmapByName("hpbg4_1_png", "bg");
                layer1.addChild(bg1);
                var bg2 = Lgs.createBitmapByName("hpbg4_2_png", "bg");
                layer2.addChild(bg2);
                var bg3 = Lgs.createBitmapByName("hpbg4_3_png", "bg");
                layer3.addChild(bg3);
                var hero1 = Lgs.createBitmapByName("hp4_1_png");
                layer1.addChild(hero1);
                hero1.x = gw / 2 - gh * 0.295;
                hero1.y = gh * 0.112;
                var hero2 = Lgs.createBitmapByName("hp4_2_png");
                layer2.addChild(hero2);
                hero2.x = gw / 2 + gh * 0.025;
                hero2.y = gh * 0.024;
                var hero3 = Lgs.createBitmapByName("hp4_3_png");
                layer3.addChild(hero3);
                hero3.x = gw / 2 - gh * 0.14;
                hero3.y = gh * 0.555;
                hero3.anchorOffsetX = hero3.width / 2;
                hero3.anchorOffsetY = hero3.height * 0.8;
                hero3.x = hero3.x + hero3.anchorOffsetX;
                hero3.y = hero3.y + hero3.anchorOffsetY;
                var hero3_2 = Lgs.createBitmapByName("hp4_3_png");
                layer3.addChild(hero3_2);
                hero3_2.x = gw / 2 - gh * 0.14;
                hero3_2.y = gh * 0.555;
                hero3_2.anchorOffsetX = hero3_2.width / 2;
                hero3_2.anchorOffsetY = hero3_2.height * 0.8;
                hero3_2.x = hero3_2.x + hero3_2.anchorOffsetX;
                hero3_2.y = hero3_2.y + hero3_2.anchorOffsetY;
                hero3_2.alpha = 0;
                var hpsui = Lgs.createBitmapByName("hpsui_png");
                aniLayer.addChild(hpsui);
                hpsui.scaleX = hpsui.scaleY = 2;
                hpsui.x = gw / 2 - Lgs.GetWidth(hpsui) / 2;
                hpsui.y = gh / 2 - Lgs.GetHeight(hpsui) / 2;
                hpsui.alpha = 0;
                var layer1x = layer1.x;
                var layer2x = layer2.x;
                // let layer3x = layer3.x;
                var layer1y = layer1.y;
                var layer2y = layer2.y;
                var layer3y = layer3.y;
                layer1.x = pw_sx - Lgs.GetWidth(hero1);
                layer1.y = pw_sy - Lgs.GetHeight(hero1);
                layer2.x = gw - Lgs.GetWidth(hero1);
                layer2.y = pw_sy - Lgs.GetHeight(hero2);
                layer3.y = gh - pw_sy - Lgs.GetHeight(hero3);
                egret.Tween.get(layer1).to({ x: layer1x, y: layer1y }, 320, egret.Ease.circInOut);
                egret.Tween.get(layer2).wait(160 * 1).to({ x: layer2x, y: layer2y }, 320, egret.Ease.circInOut);
                egret.Tween.get(layer3).wait(160 * 2).to({ y: layer1y }, 320, egret.Ease.circIn);
                var hero1x = hero1.x;
                var hero2x = hero2.x;
                var hero3x = hero3.x;
                var hero1y = hero1.y;
                var hero2y = hero2.y;
                var hero3y = hero3.y;
                hero1.x = hero1x - gh * 0.02;
                hero1.y = hero1y + gh * 0.02;
                hero2.x = hero2x + gh * 0.02;
                hero2.y = hero2y - gh * 0.01;
                hero3.x = hero3x + gh * 0.02;
                hero3.y = hero3y + gh * 0.02;
                hero3_2.x = hero3x + gh * 0.02;
                hero3_2.y = hero3y + gh * 0.02;
                hero3.scaleX = hero3.scaleY = 0.5;
                egret.Tween.get(hero1).to({ x: hero1x, y: hero1y }, 5000, egret.Ease.quadOut);
                egret.Tween.get(hero2).wait(320 * 1).call(function () {
                    playAudio("so", 0);
                }).to({ x: hero2x, y: hero2y }, 5000, egret.Ease.quadOut);
                egret.Tween.get(hero3).wait(320 * 2).call(function () {
                    playAudio("so", 0);
                }).to({ x: hero3x, y: hero3y }, 5000, egret.Ease.quadOut);
                egret.Tween.get(hero3_2).wait(320 * 2).call(function () {
                    playAudio("so", 0);
                }).to({ x: hero3x, y: hero3y }, 5000, egret.Ease.quadOut);
                egret.Tween.get(hero3).wait(320 * 2).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.quadIn).call(function () {
                    hero3_2.alpha = 1;
                    egret.Tween.get(hero3_2).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 320, egret.Ease.quadOut);
                    playAudio("boli", 0);
                    egret.Tween.get(hpsui).wait(200).call(function () {
                        hpsui.alpha = 1;
                        var shocka = new Lgs.ShockUtils();
                        shocka.shock(Lgs.ShockUtils.MAP); // ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
                        var num = 6;
                        shocka._target = GameLayer;
                        shocka.start(num); //num是震动次数
                        egret.Tween.get(aniLayer).wait(800).to({ alpha: 0 }, 320).call(function () {
                            Lgs.LremoveChild(aniLayer);
                            aniFun5.call(this);
                        }, this);
                    }, this);
                }, this);
            }
            /**类似歌词效果 图片*/
            function aniFun5() {
                jumpBtn.visible = true;
                jumpBtn.alpha = 0.5;
                Lgs.removedTweens(jumpBtn);
                egret.Tween.get(jumpBtn).to({ alpha: 0.5 }).call(function () {
                    egret.Tween.get(jumpBtn, { loop: true })
                        .to({ alpha: 1 }, 500)
                        .to({ alpha: 0.5 }, 500);
                }, this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, jumpFun, this);
                Lgs.removedListener(this, egret.TouchEvent.TOUCH_TAP, jumpFun, this);
                if (isJump)
                    return;
                home_mask.visible = false;
                // return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var bg = Lgs.createBitmapByName("prefaceBg_jpg", "bg");
                aniLayer.addChild(bg);
                var preface1 = Lgs.createBitmapByName("preface_1_png");
                aniLayer.addChild(preface1);
                preface1.x = gw / 2 - gh * 0.35;
                preface1.y = -gh * 0.1;
                var preface2 = Lgs.createBitmapByName("preface_2_png");
                aniLayer.addChild(preface2);
                preface2.x = gw / 2 - gh * 0.21;
                preface2.y = -gh * 0.05;
                var preface3 = Lgs.createBitmapByName("preface_3_png");
                aniLayer.addChild(preface3);
                preface3.x = gw / 2 + gh * 0.045;
                preface3.y = gh * 0.562;
                var textLayer = new egret.Sprite();
                aniLayer.addChild(textLayer);
                var texts = [
                    "公元618年      唐朝建立",
                    "开武举之先河",
                    "引武林众豪杰争相逐鹿",
                    "转眼1400年后武林风再起",
                    "无数英雄豪杰再次剑指武林宝座"
                ];
                var textArr = [];
                var nums = -1;
                for (var i = 0; i < texts.length; i++) {
                    var ptlayer = new egret.Sprite();
                    textLayer.addChild(ptlayer);
                    var pbs = Lgs.createBitmapByName("pb" + (i + 1) + "_png");
                    ptlayer.addChild(pbs);
                    var pts = Lgs.createBitmapByName("pt" + (i + 1) + "_png");
                    ptlayer.addChild(pts);
                    pts.x = pbs.x + Lgs.GetWidth(pbs) / 2 - Lgs.GetWidth(pts) / 2;
                    pts.y = pbs.y + Lgs.GetHeight(pbs) / 2 - Lgs.GetHeight(pts) / 2;
                    Lgs.BtnMode(pbs, true);
                    Lgs.BtnMode(pts, true);
                    Lgs.BtnMode(ptlayer, true);
                    ptlayer.x = gw / 2;
                    ptlayer.y = gh * 0.36 + gh * 0.065 * i;
                    ptlayer["pic1"] = pts;
                    ptlayer["pic2"] = pbs;
                    pbs.scaleX = pbs.scaleY = pts.width / pbs.width;
                    ptlayer["picScale"] = pts.width / pbs.width;
                    pbs.alpha = 0;
                    textArr.push(ptlayer);
                }
                preface1.alpha = .5;
                preface2.alpha = 0;
                preface3.alpha = 1;
                egret.Tween.get(preface2).to({ alpha: 1 }, 1000);
                Lgs.removedTweens(preface1);
                Lgs.removedTweens(preface3);
                egret.Tween.get(preface1, { loop: true })
                    .to({ alpha: 1 }, 1500)
                    .to({ alpha: .5 }, 1500);
                egret.Tween.get(preface3, { loop: true })
                    .to({ alpha: .5 }, 1500)
                    .to({ alpha: 1 }, 1500);
                textAniFuc.call(this);
                function textAniFuc() {
                    nums++;
                    if (textArr[nums - 1]) {
                        var ptlayer0_1 = textArr[nums - 1];
                        egret.Tween.get(ptlayer0_1["pic2"]).wait(675)
                            .to({ scaleX: ptlayer0_1["picScale"], scaleY: ptlayer0_1["picScale"] }, 900, egret.Ease.quadOut)
                            .to({ alpha: 0 }, 320);
                        egret.Tween.get(ptlayer0_1["pic1"]).wait(675 + 900).to({ alpha: 1 }, 320).call(function () {
                            if (nums == 5) {
                                egret.Tween.get(ptlayer0_1["pic1"]).wait(675 + 900 + 320).call(function () {
                                    egret.Tween.removeTweens(preface1);
                                    egret.Tween.removeTweens(preface2);
                                    egret.Tween.removeTweens(preface3);
                                    egret.Tween.get(preface1).to({ alpha: 0 }, 400);
                                    egret.Tween.get(preface2).to({ alpha: 0 }, 400);
                                    egret.Tween.get(preface3).to({ alpha: 0 }, 400).call(function () {
                                        ani5to6.call(this);
                                        Lgs.LremoveChild(aniLayer);
                                    }, this);
                                    egret.Tween.get(textLayer).to({ alpha: 0 }, 400);
                                }, this);
                            }
                        }, this);
                    }
                    if (textArr[nums]) {
                        var ptlayer = textArr[nums];
                        egret.Tween.get(ptlayer["pic1"]).wait(410).to({ alpha: 0 }, 320);
                        egret.Tween.get(ptlayer["pic2"]).wait(410)
                            .to({ alpha: 1 }, 320)
                            .to({ scaleX: 1, scaleY: 1 }, 900, egret.Ease.quadOut).call(function () {
                            if (nums < 5) {
                                textAniFuc.call(this);
                            }
                        }, this);
                    }
                }
            }
            /**类似歌词效果 文字*/
            function aniFun55() {
                if (isJump)
                    return;
                home_mask.visible = false;
                // return;
                var aniLayer = new egret.Sprite();
                cgLayer.addChild(aniLayer);
                var bg = Lgs.createBitmapByName("prefaceBg_jpg", "bg");
                aniLayer.addChild(bg);
                var preface1 = Lgs.createBitmapByName("preface_1_png");
                aniLayer.addChild(preface1);
                preface1.x = gw / 2 - gh * 0.35;
                preface1.y = -gh * 0.1;
                var preface2 = Lgs.createBitmapByName("preface_2_png");
                aniLayer.addChild(preface2);
                preface2.x = gw / 2 - gh * 0.21;
                preface2.y = -gh * 0.05;
                var preface3 = Lgs.createBitmapByName("preface_3_png");
                aniLayer.addChild(preface3);
                preface3.x = gw / 2 + gh * 0.045;
                preface3.y = gh * 0.562;
                var textLayer = new egret.Sprite();
                aniLayer.addChild(textLayer);
                var texts = [
                    "公元618年      唐朝建立",
                    "开武举之先河",
                    "引武林众豪杰争相逐鹿",
                    "转眼1400年后武林风再起",
                    "无数英雄豪杰再次剑指武林宝座"
                ];
                var textArr = [];
                var nums = -1;
                for (var i = 0; i < texts.length; i++) {
                    var prefaceText = new egret.TextField();
                    textLayer.addChild(prefaceText);
                    // textScaleFun(prefaceText,0.02,0x1E1E1E,"楷体,sans-serif");
                    Lgs.textScaleFun(prefaceText, 0.02, 0x1E1E1E);
                    prefaceText.bold = true;
                    prefaceText.text = texts[i];
                    prefaceText.x = gw / 2 - Lgs.GetWidth(prefaceText) / 2;
                    prefaceText.y = gh * 0.552 + gh * 0.048 * i;
                    Lgs.BtnMode(prefaceText, true);
                    prefaceText.alpha = 0.5 * (2 - i);
                    textArr.push(prefaceText);
                }
                preface1.alpha = .5;
                preface2.alpha = 0;
                preface3.alpha = 1;
                egret.Tween.get(preface2).to({ alpha: 1 }, 1000);
                Lgs.removedTweens(preface1);
                Lgs.removedTweens(preface3);
                egret.Tween.get(preface1, { loop: true })
                    .to({ alpha: 1 }, 1500)
                    .to({ alpha: .5 }, 1500);
                egret.Tween.get(preface3, { loop: true })
                    .to({ alpha: .5 }, 1500)
                    .to({ alpha: 1 }, 1500);
                textAniFuc.call(this);
                function textAniFuc() {
                    nums++;
                    var _loop_1 = function (i) {
                        var prefaceText = textArr[i];
                        var prefaceTexty = prefaceText.y - gh * 0.048;
                        var scale = 1;
                        var alpha = 1;
                        if (nums === i) {
                            prefaceTexty = prefaceText.y - gh * (0.552 - 0.445);
                            scale = 1.5;
                        }
                        if (i === nums - 1) {
                            prefaceTexty = prefaceText.y - gh * (0.445 - 0.382);
                        }
                        alpha = 1 - Math.abs(i - nums) * 0.34;
                        egret.Tween.get(prefaceText).to({ y: prefaceTexty, alpha: alpha }, 1600).call(function () {
                            if (i == 0) {
                                if (nums < 8) {
                                    textAniFuc.call(this);
                                }
                                if (nums == 6) {
                                    egret.Tween.removeTweens(preface1);
                                    egret.Tween.removeTweens(preface2);
                                    egret.Tween.removeTweens(preface3);
                                    egret.Tween.get(preface1).to({ alpha: 0 }, 400);
                                    egret.Tween.get(preface2).to({ alpha: 0 }, 400);
                                    egret.Tween.get(preface3).to({ alpha: 0 }, 400);
                                    egret.Tween.get(textLayer).to({ alpha: 0 }, 400).call(function () {
                                        ani5to6.call(this);
                                        Lgs.LremoveChild(aniLayer);
                                    }, this);
                                }
                            }
                        }, this_1);
                        egret.Tween.get(prefaceText, { onChange: function () {
                                prefaceText.x = gw / 2;
                            }, onChangeObj: this_1 }).to({ scaleX: scale, scaleY: scale }, 1600);
                        egret.setTimeout(function () {
                            if (nums === i)
                                prefaceText.textColor = 0xC60C0D;
                            if (i === nums - 1)
                                prefaceText.textColor = 0x1E1E1E;
                        }, this_1, Math.floor(1600 / 3));
                        egret.setTimeout(function () {
                            if (nums === i)
                                prefaceText.textColor = 0xC60C0D;
                            if (i === nums - 1)
                                prefaceText.textColor = 0x1E1E1E;
                        }, this_1, Math.floor(1600 / 3 * 2));
                    };
                    var this_1 = this;
                    for (var i = 0; i < textArr.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            function ani5to6() {
                if (!isJump) {
                    isJump = true;
                    Lgs.LremoveChild(jumpBtn);
                    Lgs.LremoveChild(cgLayer);
                    Lgs.LremoveChild(home_mask);
                    aniFun6.call(this);
                }
                else {
                    return;
                }
            }
            function aniFun6() {
                var aniLayer = new egret.Sprite();
                bgLayer.addChild(aniLayer);
                var bg = Lgs.createBitmapByName("prefaceBg_jpg", "bg");
                aniLayer.addChild(bg);
                var letter_text = Lgs.createBitmapByName("letter_text_png");
                aniLayer.addChild(letter_text);
                letter_text.x = gw / 2 - Lgs.GetWidth(letter_text) / 2;
                letter_text.y = gh * 0.172;
                var letter_blood = Lgs.createBitmapByName("letter_blood_png");
                aniLayer.addChild(letter_blood);
                letter_blood.x = gw / 2 - gh * 0.332;
                letter_blood.y = gh * 0.153;
                var letter_hero = Lgs.createBitmapByName("letter_hero_png");
                aniLayer.addChild(letter_hero);
                letter_hero.x = gw / 2 - gh * 0.345;
                letter_hero.y = gh * 0.408;
                var letter = Lgs.createBitmapByName("letter_png");
                aniLayer.addChild(letter);
                Lgs.BtnMode(letter);
                letter.anchorOffsetX = 264;
                letter.anchorOffsetY = 245;
                letter.x = gw / 2 + gh * 0.005;
                letter.y = gh * 0.522;
                letter.alpha = 0;
                letter.rotation = -5;
                Lgs.removedTweens(letter);
                letter_text.alpha = 0;
                letter_hero.alpha = 0;
                letter_blood.alpha = 0;
                var herox = letter_hero.x;
                var heroy = letter_hero.y;
                letter_hero.x = herox - gh * 0.03;
                letter_hero.y = heroy + gh * 0.025;
                egret.Tween.get(letter_text).to({ alpha: 1 }, 3000, egret.Ease.quadOut);
                egret.Tween.get(letter_hero).wait(250).to({ alpha: 1 }, 1000, egret.Ease.quadOut);
                egret.Tween.get(letter_hero).wait(250).to({ x: herox, y: heroy }, 1000, egret.Ease.quadOut);
                letter.scaleX = letter.scaleY = 3;
                egret.Tween.get(letter).wait(800).call(function () {
                    playAudio("zs", 0);
                }, this).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.circIn);
                egret.Tween.get(letter).wait(800).to({ alpha: 1 }, 500).call(function () {
                    letter.addEventListener(egret.TouchEvent.TOUCH_TAP, openLetter, this);
                    Lgs.removedListener(letter, egret.TouchEvent.TOUCH_TAP, openLetter, this);
                    egret.Tween.get(letter_blood).to({ alpha: 1 }, 160, egret.Ease.quadOut).call(function () {
                        egret.Tween.get(letter, { loop: true })
                            .to({ rotation: 5 }, 75).to({ rotation: -5 }, 75)
                            .to({ rotation: 5 }, 75).to({ rotation: -5 }, 75)
                            .to({ rotation: 5 }, 75).to({ rotation: -5 }, 75)
                            .to({ rotation: 0 }, 75 / 2).wait(600);
                    }, this);
                    ;
                }, this);
                var rankBtn = Lgs.createBitmapByName("rankBtn_png");
                if (!openGame1) {
                    aniLayer.addChild(rankBtn);
                    Lgs.BtnMode(rankBtn);
                    rankBtn.x = gw - Lgs.GetWidth(rankBtn) / 2 - gh * 0.02;
                    rankBtn.y = gh * 0.93;
                    rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, rankFun, this);
                    Lgs.removedListener(rankBtn, egret.TouchEvent.TOUCH_TAP, rankFun, this);
                }
                function rankFun() {
                    $(".shareImg").hide();
                    Lgs.showloading();
                    Lgs.getRanklistAjax(function (data) {
                        Lgs.hideloading();
                        // data.rankList = [];
                        list3Fun.call(this, data);
                    }, function (data) {
                        Lgs.hideloading();
                        Lgs.LAlert(data.msg);
                    }, this);
                }
                function openLetter() {
                    Lgs.LremoveChild(rankBtn);
                    letter.removeEventListener(egret.TouchEvent.TOUCH_TAP, openLetter, this);
                    descFun.call(this, function () {
                        egret.Tween.get(aniLayer).to({ alpha: 0 }, 1000).call(function () {
                            Lgs.LremoveChild(aniLayer);
                        }, this);
                        Lgs.LremoveChild(letter_text);
                        Lgs.LremoveChild(letter_blood);
                        Lgs.LremoveChild(letter);
                    });
                }
            }
            function descFun(callback) {
                var descLayer = new egret.Sprite();
                bgLayer.addChild(descLayer);
                descLayer.touchEnabled = true;
                var winLayer = new egret.Sprite();
                descLayer.addChild(winLayer);
                winLayer.width = gw;
                winLayer.height = gh;
                var rules = Lgs.createBitmapByName("rules_png");
                winLayer.addChild(rules);
                rules.x = gw / 2 - Lgs.GetWidth(rules) / 2;
                rules.y = gh * 0.085;
                var startBtn = Lgs.createBitmapByName("startBtn_png");
                winLayer.addChild(startBtn);
                Lgs.BtnMode(startBtn);
                startBtn.x = gw / 2;
                startBtn.y = gh * 0.875;
                var startText = Lgs.createBitmapByName("startText_png");
                winLayer.addChild(startText);
                Lgs.BtnMode(startText, true);
                startText.x = startBtn.x;
                startText.y = startBtn.y;
                winLayer.scaleX = winLayer.scaleY = 0;
                Lgs.winEnterAni(false, winLayer, "scale01");
                egret.Tween.get(startText, { loop: true })
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 240).to({ scaleX: 1, scaleY: 1 }, 240)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 240).to({ scaleX: 1, scaleY: 1 }, 240);
                startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, startFun, this);
                Lgs.removedListener(startBtn, egret.TouchEvent.TOUCH_TAP, startFun, this);
                function startFun() {
                    startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, startFun, this);
                    this.startFun(function () {
                        if (callback)
                            callback.call(this);
                        egret.Tween.get(descLayer).to({ alpha: 0 }, 1000);
                    });
                }
            }
            /**按钮 ----*/
            // this.startBtn = createBitmapByName("startBtn_png");
            // fgLayer.addChild(this.startBtn);
            // BtnMode(this.startBtn);
            // this.startBtn.x = gw/2;
            // this.startBtn.y = gh*0.71;
            // this.ruleBtn = createBitmapByName("ruleBtn_png");
            // fgLayer.addChild(this.ruleBtn);
            // BtnMode(this.ruleBtn);
            // this.ruleBtn.x = gw/2;
            // this.ruleBtn.y = gh*0.85;
            // this.rankBtn = createBitmapByName("rankBtn_png");
            // fgLayer.addChild(this.rankBtn);
            // BtnMode(this.rankBtn);
            // this.rankBtn.x = gw/2;
            // this.rankBtn.y = gh*0.95;
            /**动画 */
            /**事件监听 ----*/
            // this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankFun,this);
            // removedListener(this.rankBtn,egret.TouchEvent.TOUCH_TAP,this.rankFun,this);
            // this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startFun,this);
            // removedListener(this.startBtn,egret.TouchEvent.TOUCH_TAP,this.startFun,this);
            // this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ruleFun,this);
            // removedListener(this.ruleBtn,egret.TouchEvent.TOUCH_TAP,this.ruleFun,this);
            /**forTest */
            // this.startFun();
            // this.ruleFun();
            // this.rankFun();
        };
        /**开始游戏 */
        LHomePage.prototype.startFun = function (callback) {
            // var s = RES.getRes("nomusic_mp3");
            // var sChannel = s.play(0, 1);
            Lgs.showloading();
            Lgs.startGameAjax(function (data) {
                Lgs.hideloading();
                localStartGame2 = true;
                openGame1 = false;
                if (callback)
                    callback.call(this);
                egret.setTimeout(function () {
                    var startData = {
                        "scode": data.scode,
                        "gcode1": data.gcode1,
                        "gcode2": data.gcode2,
                        "firstgame": data.firstgame
                    };
                    var gameLayer = new Lgs.GameContainer(startData);
                    GameLayer.addChild(gameLayer);
                    Lgs.LremoveChild(this);
                }, this, 800);
            }, function (data) {
                Lgs.hideloading();
                Lgs.LAlert(data.msg);
            }, this);
        };
        LHomePage.prototype.removeFun = function () {
            Lgs.LremoveChild(this);
        };
        LHomePage.prototype.rankFun = function () {
            this.rankLayer = new Lgs.LRankPage();
            GameLayer.addChild(this.rankLayer);
        };
        /**移除监听 */
        LHomePage.prototype.removedFun = function () {
        };
        return LHomePage;
    }(egret.DisplayObjectContainer));
    Lgs.LHomePage = LHomePage;
    __reflect(LHomePage.prototype, "Lgs.LHomePage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LHomePage.js.map