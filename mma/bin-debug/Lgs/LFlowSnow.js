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
    var LFlowSnow = (function (_super) {
        __extends(LFlowSnow, _super);
        function LFlowSnow() {
            var _this = _super.call(this) || this;
            /**数量 */
            _this.csNums = 40;
            /**最小缩放大小 +1*/
            _this.scale1 = 0.7;
            /**最远距离 */
            _this.maxJuli = gh * 0.5;
            /**最小下降速度 */
            _this.minSudu = gh * 0.0015;
            /**最大下降速度 minSudu+maxSudu*/
            _this.maxSudu = gh * 0.0035;
            /**x范围 */
            _this.csw = gw * 0.9;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LFlowSnow.prototype.onAddToStage = function () {
            var _THIS = this;
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            var cddataArr = ["cd1_png", "cd2_png", "cd3_png", "cd4_png", "cd5_png", "cd6_png", "cd7_png", "cd8_png", "cd9_png"];
            var cdsArr = [];
            for (var i = 0; i < this.csNums; i++) {
                var cdnum = Math.floor(Math.random() * cddataArr.length);
                var cds = Lgs.createBitmapByName(cddataArr[cdnum]);
                bgLayer.addChild(cds);
                cds.scaleX = cds.scaleY = initScale * (this.scale1 + Math.random());
                cds.rotation = Math.random() * 180;
                cds.x = (gw - this.csw) / 2 + Math.random() * this.csw;
                cds.y = -Lgs.GetHeight(cds) - gh * 0.1 + Math.random() * gh * 0.5;
                cds["speed2"] = Math.random() * this.maxSudu + this.minSudu;
                cds["r0"] = cds.rotation;
                cds["rr"] = 20 + Math.random() * 20;
                var rss = Math.floor(Math.random() * 2);
                if (rss == 0) {
                    cds["rs"] = 3;
                }
                else {
                    cds["rs"] = -3;
                }
                cdsArr.push(cds);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, onframe, this);
            Lgs.removedListener(this, egret.Event.ENTER_FRAME, onframe, this);
            function onframe() {
                for (var i = 0; i < cdsArr.length; i++) {
                    var thiscds = cdsArr[i];
                    thiscds.y += thiscds["speed2"];
                    thiscds.rotation += thiscds["rs"];
                    if (thiscds.rotation >= thiscds["r0"] + thiscds["rr"] || thiscds.rotation <= thiscds["r0"] + thiscds["rr"]) {
                        thiscds["rr"] = -thiscds["rr"];
                    }
                }
                var _loop_1 = function (i) {
                    var thiscds = cdsArr[i];
                    if (thiscds.y > this_1.maxJuli) {
                        egret.Tween.get(thiscds).to({ alpha: 0 }, 500).call(function () {
                            addCDS.call(this, thiscds);
                        }, this_1);
                    }
                };
                var this_1 = this;
                for (var i = 0; i < cdsArr.length; i++) {
                    _loop_1(i);
                }
            }
            function addCDS(thisCDS) {
                var cdnum = Math.floor(Math.random() * cddataArr.length);
                // let thisCDS = createBitmapByName(cddataArr[cdnum]);
                thisCDS.texture = RES.getRes(cddataArr[cdnum]);
                // bgLayer.addChild(thisCDS);
                thisCDS.scaleX = thisCDS.scaleY = initScale * (this.scale1 + Math.random());
                thisCDS.rotation = Math.random() * 180;
                thisCDS.x = (gw - this.csw) / 2 + Math.random() * this.csw;
                thisCDS.y = -Lgs.GetHeight(thisCDS) * 2;
                thisCDS["speed2"] = Math.random() * this.maxSudu + this.minSudu;
                thisCDS["r0"] = thisCDS.rotation;
                thisCDS["rr"] = 20 + Math.random() * 20;
                var rss = Math.floor(Math.random() * 2);
                if (rss == 0) {
                    thisCDS["rs"] = 3;
                }
                else {
                    thisCDS["rs"] = -3;
                }
                thisCDS.alpha = 1;
                // cdsArr.push(thisCDS);
            }
        };
        LFlowSnow.prototype.removedFun = function () {
        };
        return LFlowSnow;
    }(egret.DisplayObjectContainer));
    Lgs.LFlowSnow = LFlowSnow;
    __reflect(LFlowSnow.prototype, "Lgs.LFlowSnow");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LFlowSnow.js.map