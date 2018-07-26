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
    var resultPage = (function (_super) {
        __extends(resultPage, _super);
        function resultPage(data, callback, thisObj) {
            var _this = _super.call(this) || this;
            _this.rankSelectNum = 0;
            _this.resultData = data;
            _this.score = data.score;
            if (callback) {
                _this.callback = callback;
                _this.thisObj = thisObj;
            }
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        resultPage.prototype.onAddToStage = function () {
            isResult = true;
            // bgmViewer.show();
            var _THIS = this;
            this.touchEnabled = true;
            var players = RES.getRes("playerdata_json");
            var nameNums = Math.floor(Math.random() * playerSpic.length);
            var player = players.data[nameNums];
            change(nameNums);
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            // this.resultShape = makeaShape(0x000000,0.9);
            // bgLayer.addChild(this.resultShape);
            this.resultShape = Lgs.createBitmapByName("resultBg_jpg", "bg");
            bgLayer.addChild(this.resultShape);
            /**winLayer */
            var winLayer = new egret.Sprite();
            bgLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.width = gh;
            /**彩带 ----*/
            // let cds = new snowing("snowing");
            // winLayer.addChild(cds);
            /**战力数据 */
            var per1 = Math.max(0.3, this.resultData.cs2 / 50);
            var per2 = Math.max(0.3, (this.resultData.cs3 + this.resultData.cs4) / 600);
            var per3 = Math.max(0.3, this.resultData.cs1 / 23);
            /**三角战力图  */
            var sanjiaoLayer = new egret.Sprite();
            bgLayer.addChild(sanjiaoLayer);
            sanjiaoLayer.x = gw / 2 + gh * 0.055;
            sanjiaoLayer.y = gh * 0.194;
            /**三角背景 */
            var p0 = Lgs.createBitmapByName("one_png");
            // sanjiaoLayer.addChild(p0);
            p0.x = gh * 0.102;
            p0.y = gh * 0.107;
            p0.alpha = 0;
            var p1 = Lgs.createBitmapByName("one_png");
            p1.x = gh * 0.1015;
            p1.y = gh * 0.025;
            var p2 = Lgs.createBitmapByName("one_png");
            p2.x = gh * 0.032;
            p2.y = gh * 0.146;
            var p3 = Lgs.createBitmapByName("one_png");
            p3.x = gh * 0.17;
            p3.y = gh * 0.146;
            Lgs.BtnMode(p0, true);
            Lgs.BtnMode(p1, true);
            Lgs.BtnMode(p2, true);
            Lgs.BtnMode(p3, true);
            var pshape = new egret.Shape();
            sanjiaoLayer.addChild(pshape);
            pshape.graphics.lineStyle(0, 0xffffff);
            pshape.graphics.beginFill(0xCEA4A5);
            pshape.graphics.moveTo(p1.x, p1.y);
            pshape.graphics.lineTo(p2.x, p2.y);
            pshape.graphics.lineTo(p3.x, p3.y);
            pshape.graphics.endFill();
            // pshape.alpha = 0.3;
            /**三角前景 */
            var q0 = new egret.Point(p0.x, p0.y);
            var q1 = new egret.Point(p1.x, p1.y);
            var q2 = new egret.Point(p2.x, p2.y);
            var q3 = new egret.Point(p3.x, p3.y);
            q1.y = p0.y - per1 * (p0.y - p1.y);
            var q23 = Lgs.xyFun(q2.x - q0.x, q2.y - q0.y, egret.Point.distance(q0, q2) * per2);
            q2.x = q23.x + q0.x;
            q2.y = q23.y + q0.y;
            q23 = Lgs.xyFun(q3.x - q0.x, q3.y - q0.y, egret.Point.distance(q0, q3) * per3);
            q3.x = q23.x + q0.x;
            q3.y = q23.y + q0.y;
            var qshape = new egret.Shape();
            sanjiaoLayer.addChild(qshape);
            qshape.graphics.lineStyle(0, 0xffffff);
            qshape.graphics.beginFill(0xB63539);
            qshape.graphics.moveTo(q1.x, q1.y);
            qshape.graphics.lineTo(q2.x, q2.y);
            qshape.graphics.lineTo(q3.x, q3.y);
            qshape.graphics.endFill();
            p1.x = q1.x;
            p1.y = q1.y;
            p2.x = q2.x;
            p2.y = q2.y;
            p3.x = q3.x;
            p3.y = q3.y;
            sanjiaoLayer.addChild(p1);
            sanjiaoLayer.addChild(p2);
            sanjiaoLayer.addChild(p3);
            /**三角 */
            var sanjiaoBg = Lgs.createBitmapByName("sanjiaoBg_png");
            sanjiaoLayer.addChild(sanjiaoBg);
            /**头像-昵称-武魂--分数-排名*/
            var headLayer = new egret.Sprite();
            winLayer.addChild(headLayer);
            var headBg = Lgs.createBitmapByName("hbg_png");
            headLayer.addChild(headBg);
            var headShape = new egret.Shape();
            headLayer.addChild(headShape);
            headShape.graphics.beginFill(0xff0000);
            headShape.graphics.drawCircle(0, 0, 109 / 2);
            headShape.graphics.endFill();
            headShape.x = gh * 0.0715;
            headShape.y = gh * 0.0603;
            headLayer.x = gw / 2 - gh * 0.285;
            headLayer.y = gh * 0.11 + gh * 0.056;
            Lgs.addBitmapByUrl(headShape.x - 109 / 2, headShape.y - 109 / 2, 109, headLayer, $headImg, "headImg", function (head) {
                head.mask = headShape;
                /**长按保存与二维码 */
                var saveqr = Lgs.createBitmapByName("saveqr_png");
                bgLayer.addChild(saveqr);
                saveqr.x = gw / 2 - Lgs.GetWidth(saveqr) / 2;
                saveqr.y = gh * 0.77;
                var rectangle = new egret.Rectangle(0, 0, gw, gh);
                var screen_shot = new Lgs.LScreenShot();
                var ascreen_shot = screen_shot.addShareImg(this, "jpg", rectangle, 1);
                $(".shareImg").show();
                btnViewFun.call(this, function () {
                    /**三角图动画 */
                    p1.x = q0.x;
                    p1.y = q0.y;
                    p2.x = q0.x;
                    p2.y = q0.y;
                    p3.x = q0.x;
                    p3.y = q0.y;
                    egret.Tween.get(p1).to({ x: q1.x, y: q1.y }, 1000);
                    egret.Tween.get(p2).to({ x: q2.x, y: q2.y }, 1000);
                    egret.Tween.get(p3, { onChange: function () {
                            qshape.graphics.clear();
                            qshape.graphics.lineStyle(0, 0xffffff);
                            qshape.graphics.beginFill(0xB63539);
                            qshape.graphics.moveTo(p1.x, p1.y);
                            qshape.graphics.lineTo(p2.x, p2.y);
                            qshape.graphics.lineTo(p3.x, p3.y);
                            qshape.graphics.endFill();
                        }, onChangeObj: this }).to({ x: q3.x, y: q3.y }, 1000);
                    var diss = Lgs.createBitmapByName("diss_png");
                    bgLayer.addChild(diss);
                    diss.x = gw / 2 - Lgs.GetWidth(diss) / 2;
                    diss.y = pw_sy;
                    Lgs.LremoveChild(saveqr);
                });
            }, this);
            var namesLayer = new egret.Sprite();
            bgLayer.addChild(namesLayer);
            var nickName = new egret.TextField();
            namesLayer.addChild(nickName);
            Lgs.textScaleFun(nickName, 0.027, 0x000000);
            nickName.bold = true;
            nickName.text = $nickName;
            var wuhunBg = Lgs.createBitmapByName("wuhunBg_png");
            namesLayer.addChild(wuhunBg);
            var wuhunField = new egret.TextField();
            namesLayer.addChild(wuhunField);
            Lgs.textScaleFun(wuhunField, 0.0195, 0xffffff);
            wuhunField.bold = true;
            wuhunField.text = player[1];
            nickName.y = gh * 0.01;
            wuhunBg.y = gh * 0.055;
            wuhunField.x = gh * 0.01;
            wuhunField.y = gh * 0.06;
            namesLayer.x = gw / 2 - gh * 0.15;
            namesLayer.y = gh * 0.118 + gh * 0.056;
            var scoreLayer = new egret.Sprite();
            bgLayer.addChild(scoreLayer);
            var scoreField1 = new egret.TextField();
            scoreLayer.addChild(scoreField1);
            Lgs.textScaleFun(scoreField1, 0.022, 0x000000);
            scoreField1.text = "武魂战斗力：";
            var rankField1 = new egret.TextField();
            scoreLayer.addChild(rankField1);
            Lgs.textScaleFun(rankField1, 0.022, 0x000000);
            rankField1.textColor = 0x000000;
            rankField1.text = "全国排名：";
            rankField1.x = Lgs.GetWidth(scoreField1) - Lgs.GetWidth(rankField1);
            rankField1.y = Lgs.GetHeight(scoreField1) + gh * 0.017;
            var scoreField2 = new egret.TextField();
            scoreLayer.addChild(scoreField2);
            Lgs.textScaleFun(scoreField2, 0.034, 0xAE3B3E);
            scoreField2.italic = true;
            scoreField2.bold = true;
            scoreField2.text = this.resultData.score;
            var rankField2 = new egret.TextField();
            scoreLayer.addChild(rankField2);
            Lgs.textScaleFun(rankField2, 0.034, 0xAE3B3E);
            rankField2.italic = true;
            rankField2.bold = true;
            rankField2.text = this.resultData.myRank;
            scoreField2.x = gh * 0.14;
            rankField2.x = gh * 0.14;
            scoreField2.y = Lgs.GetHeight(scoreField1) - Lgs.GetHeight(scoreField2) + gh * 0.003;
            rankField2.y = rankField1.y + Lgs.GetHeight(rankField1) - Lgs.GetHeight(rankField2) + gh * 0.003;
            scoreLayer.x = gw / 2 - gh * 0.255;
            scoreLayer.y = gh * 0.244 + gh * 0.056;
            /**数字递增效果 ----*/
            // numAddAni.call(this,0,136,1400,function(num){
            // 	scoreField2.text = num+"";
            // },this);
            /**数字递增效果 */
            function numAddAni(s_num, e_num, time, fun, thisObj) {
                var fps = 33;
                var num1 = Math.ceil(time / fps);
                var num2 = Math.ceil((e_num - s_num) / (time / fps));
                var timer = new egret.Timer(fps, num1);
                timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    s_num += num2;
                    if (s_num >= e_num)
                        s_num = e_num;
                    fun.call(this, s_num);
                }, thisObj);
                timer.start();
            }
            /**其他显示 */
            var textLayer = new egret.Sprite();
            bgLayer.addChild(textLayer);
            var text1 = Lgs.createBitmapByName("r_text1_png");
            textLayer.addChild(text1);
            var nameText = Lgs.createBitmapByName(playerSpic[nameNums][0]);
            textLayer.addChild(nameText);
            var text2 = Lgs.createBitmapByName("r_text2_png");
            textLayer.addChild(text2);
            nameText.x = text1.x + Lgs.GetWidth(text1);
            nameText.y = -gh * 0.02;
            text2.x = nameText.x + Lgs.GetWidth(nameText) + gh * 0.003;
            textLayer.x = gw / 2 - Lgs.GetWidth(textLayer) / 2;
            textLayer.y = gh * 0.422;
            /*选手图片 选手信息*/
            var picBg = Lgs.createBitmapByName("picBg_png");
            bgLayer.addChild(picBg);
            picBg.x = gw / 2 - gh * 0.24;
            picBg.y = gh * 0.501;
            var pics = Lgs.createBitmapByName(playerSpic[nameNums][2]);
            bgLayer.addChild(pics);
            pics.x = picBg.x + (Lgs.GetWidth(picBg) - Lgs.GetWidth(pics)) / 2 - 1;
            pics.y = picBg.y + (Lgs.GetHeight(picBg) - Lgs.GetHeight(pics)) / 2 - 1.8;
            picBg.scaleX = picBg.scaleY = pics.scaleX = pics.scaleY = 0.85;
            var infoText = new egret.TextField();
            bgLayer.addChild(infoText);
            Lgs.textScaleFun(infoText, 0.02, 0x000000);
            infoText.x = gw / 2 - gh * 0.03;
            infoText.y = gh * 0.515;
            infoText.lineSpacing = gh * 0.006;
            infoText.textFlow = [
                { text: "武魂：" + player[1], style: {} },
                { text: "\n外号：" + player[2], style: {} },
                { text: "\n年龄：" + player[3], style: {} },
                { text: "\n身高：" + player[4], style: {} },
                { text: "\n出身：" + player[5], style: {} },
                { text: "\n特点：" + player[6], style: {} }
            ];
            /**按钮 */
            function btnViewFun(callback) {
                callback.call(this);
                var infoMore = Lgs.createBitmapByName("infoMore_png");
                winLayer.addChild(infoMore);
                infoMore.scaleX = infoMore.scaleY = 1.2;
                infoMore.x = gw / 2 - gh * 0.03;
                infoMore.y = gh * 0.675;
                Lgs.BtnMode(infoMore);
                var rankBtn = Lgs.createBitmapByName("rankBtn_png");
                winLayer.addChild(rankBtn);
                Lgs.BtnMode(rankBtn);
                rankBtn.x = gw / 2 - gh * 0.19;
                rankBtn.y = gh * 0.805;
                var matchsBtn = Lgs.createBitmapByName("matchsBtn_png");
                winLayer.addChild(matchsBtn);
                Lgs.BtnMode(matchsBtn);
                matchsBtn.x = gw / 2;
                matchsBtn.y = gh * 0.805;
                var shareBtn = Lgs.createBitmapByName("shareBtn_png");
                winLayer.addChild(shareBtn);
                Lgs.BtnMode(shareBtn);
                shareBtn.x = gw / 2 + gh * 0.19;
                shareBtn.y = gh * 0.805;
                var hdBtn = Lgs.createBitmapByName("hdBtn_png");
                winLayer.addChild(hdBtn);
                Lgs.BtnMode(hdBtn);
                hdBtn.x = gw / 2 - gh * 0.19;
                hdBtn.y = gh * 0.895;
                var moreBtn = Lgs.createBitmapByName("moreBtn_png");
                winLayer.addChild(moreBtn);
                Lgs.BtnMode(moreBtn);
                moreBtn.x = gw / 2;
                moreBtn.y = gh * 0.895;
                var replayBtn = Lgs.createBitmapByName("replayBtn_png");
                winLayer.addChild(replayBtn);
                Lgs.BtnMode(replayBtn);
                replayBtn.x = gw / 2 + gh * 0.19;
                replayBtn.y = gh * 0.895;
                /**事件 */
                pics.touchEnabled = true;
                pics.addEventListener(egret.TouchEvent.TOUCH_TAP, infoMoreFun, this);
                Lgs.removedListener(pics, egret.TouchEvent.TOUCH_TAP, infoMoreFun, this);
                infoMore.addEventListener(egret.TouchEvent.TOUCH_TAP, infoMoreFun, this);
                Lgs.removedListener(infoMore, egret.TouchEvent.TOUCH_TAP, infoMoreFun, this);
                rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, rankFun, this);
                Lgs.removedListener(rankBtn, egret.TouchEvent.TOUCH_TAP, rankFun, this);
                matchsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, matchsFun, this);
                Lgs.removedListener(matchsBtn, egret.TouchEvent.TOUCH_TAP, matchsFun, this);
                shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, shareFun, this);
                Lgs.removedListener(shareBtn, egret.TouchEvent.TOUCH_TAP, shareFun, this);
                hdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, hdFun, this);
                Lgs.removedListener(hdBtn, egret.TouchEvent.TOUCH_TAP, hdFun, this);
                moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, moreFun, this);
                Lgs.removedListener(moreBtn, egret.TouchEvent.TOUCH_TAP, moreFun, this);
                replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replayFun, this);
                Lgs.removedListener(replayBtn, egret.TouchEvent.TOUCH_TAP, this.replayFun, this);
            }
            /**进入动画 */
            /**结束Ajax */
            // let netScore = parseInt(decbase64(this.resultData.code5))/5-8;			
            // if(this.score!=netScore){
            // 	let wg_str = this.score+":"+netScore;
            // 	let wgdata = {
            // 		code7:wg_str,
            // 		code8:this.resultData.code6
            // 	}
            // 	ajax2(wgdata);
            // }
            /**方法Fun */
            function infoMoreFun() {
                $(".shareImg").hide();
                info3Fun();
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
            function matchsFun() {
                $(".shareImg").hide();
                plan3Fun();
            }
            function shareFun() {
                $(".shareImg").hide();
                bgmViewer.hide();
                var shareLayer = Lgs.sharePage();
                GameLayer.addChild(shareLayer);
            }
            function hdFun() {
                $(".shareImg").hide();
                $(".hudong").show();
            }
            function moreFun() {
                $(".shareImg").hide();
                more3Fun();
            }
        };
        /**排行榜 ----*/
        resultPage.prototype.rankFun = function () {
            // playAudio("touchBtn",0);
            // let rankLayer = new LRankPage();
            // GameLayer.addChild(rankLayer);
        };
        /**再来一次 */
        resultPage.prototype.replayFun = function (evt) {
            var evtObj = evt.currentTarget;
            evtObj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.replayFun, this);
            isResult = false;
            $(".shareImg").hide();
            stopAudio("result");
            // playAudio("touchBtn",0);
            /**返回首页 */
            var homeLayer = new Lgs.LHomePage();
            GameLayer.addChild(homeLayer);
            Lgs.LremoveChild(this);
            if (this.callback)
                this.callback.call(this.thisObj);
            /**返回游戏 */
            // showloading();
            // startGameAjax(function(data){
            // 	hideloading();
            // 	shareFn();
            // 	let startData = {
            // 		"scode":data.scode,
            // 		"gcode1":data.gcode1,
            // 		"gcode2":data.gcode2,
            // 		"firstgame":data.firstgame
            // 	}
            // 	let gameLayer = new GameContainer(startData);
            // 	GameLayer.addChild(gameLayer);
            // 	LremoveChild(this);
            // 	if(this.callback) this.callback.call(this.thisObj);
            // },function(data){
            // 	hideloading();
            // 	LAlert(data.msg);
            // },this);
        };
        resultPage.prototype.rankViewFun = function () {
            this.rankView = new egret.Sprite();
            GameLayer.addChild(this.rankView);
            this.rankView.touchEnabled = true;
            var rankShape = new egret.Shape();
            this.rankView.addChild(rankShape);
            rankShape.graphics.beginFill(0xffffff);
            rankShape.graphics.drawRect(0, 0, gw, gh);
            rankShape.graphics.endFill();
            var rankBg = Lgs.createBitmapByName("rankBg_jpg");
            this.rankView.addChild(rankBg);
            rankBg.x = gw / 2 - Lgs.GetWidth(rankBg) / 2;
            rankBg.y = 0;
            rankShape.graphics.beginFill(0x6F5FFF);
            rankShape.graphics.drawRect(0, 0, gw, Lgs.GetHeight(rankBg));
            rankShape.graphics.endFill();
            this.rankView.x = gw - pw_sx;
            /**按钮 */
            var rank_back = Lgs.createBitmapByName("rank_back_png");
            this.rankView.addChild(rank_back);
            Lgs.BtnMode(rank_back);
            rank_back.x = pw_sx + Lgs.GetWidth(rank_back) / 2;
            rank_back.y = gh * 0.005 + Lgs.GetHeight(rank_back) / 2;
            var rankBtnsArr = [];
            for (var i = 0; i < 3; i++) {
                var rank_btn1 = Lgs.createBitmapByName("rank_btn" + (i + 1) + "_jpg");
                this.rankView.addChild(rank_btn1);
                Lgs.BtnMode(rank_btn1);
                rank_btn1.x = gw / 2 + Lgs.GetWidth(rank_btn1) * (i - 1);
                rank_btn1.y = gh * 0.122;
                rank_btn1["selectId"] = i;
                if (rank_btn1["selectId"] == this.rankSelectNum) {
                    rank_btn1.texture = RES.getRes("rank_btnv" + (i + 1) + "_jpg");
                }
                rank_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, selectRankFun, this);
                Lgs.removedListener(rank_btn1, egret.TouchEvent.TOUCH_TAP, selectRankFun, this);
                rankBtnsArr.push(rank_btn1);
            }
            /**排行榜切换事件 */
            function selectRankFun(evt) {
                var evtObj = evt.currentTarget;
                if (this.rankSelectNum == evtObj["selectId"])
                    return false;
                this.rankSelectNum = evtObj["selectId"];
                for (var i = 0; i < rankBtnsArr.length; i++) {
                    rankBtnsArr[i].texture = RES.getRes("rank_btn" + (i + 1) + "_jpg");
                }
                evtObj.texture = RES.getRes("rank_btnv" + (this.rankSelectNum + 1) + "_jpg");
            }
            /**监听事件 */
            rank_back.addEventListener(egret.TouchEvent.TOUCH_TAP, rankBackFun, this);
            Lgs.removedListener(rank_back, egret.TouchEvent.TOUCH_TAP, rankBackFun, this);
            function rankBackFun() {
                // egret.Tween.get(this).to({x:0},300,egret.Ease.quadOut).call(function(){
                // 	this.addListener();
                // },this);
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: 1, y: 1 }, 300, egret.Ease.quadOut).call(function () {
                    // this.addListener();
                }, this);
                egret.Tween.get(this.rankView).to({ x: gw - pw_sx }, 300, egret.Ease.quadOut);
                egret.Tween.get(this.rankLayer).to({ x: gw - pw_sx }, 300, egret.Ease.quadOut).call(function () {
                    Lgs.LremoveChild(this.rankLayer);
                }, this);
            }
        };
        /**排行榜 view启动器----*/
        resultPage.prototype.rankFun1 = function () {
            // this.removeListener();
            this.rankView.x = gw - pw_sx;
            egret.Tween.get(this.rankView).to({ x: 0 }, 300, egret.Ease.quadOut);
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9, x: gw * 0.05, y: gh * 0.05 }, 300, egret.Ease.quadOut).wait(30).call(function () {
                this.rankLayer = new Lgs.LRankPage();
                GameLayer.addChild(this.rankLayer);
            }, this);
            // egret.Tween.get(this).to({x:-gw*0.2},300,egret.Ease.quadOut).wait(30).call(function(){
            // 	this.rankLayer = new LRankPage();
            // 	GameLayer.addChild(this.rankLayer);
            // },this);
        };
        resultPage.prototype.removedFun = function () {
        };
        return resultPage;
    }(egret.DisplayObjectContainer));
    Lgs.resultPage = resultPage;
    __reflect(resultPage.prototype, "Lgs.resultPage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=resultPage.js.map