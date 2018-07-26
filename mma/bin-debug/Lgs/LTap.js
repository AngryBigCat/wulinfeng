var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by shaorui on 14-6-7.
 */
var Lgs;
(function (Lgs) {
    /**
     * tap，利用对象池
     */
    var LTap = (function (_super) {
        __extends(LTap, _super);
        function LTap(texture, textureName) {
            var _this = _super.call(this, texture) || this;
            _this.textureName = textureName;
            return _this;
        }
        /**生产*/
        LTap.produce = function (textureName) {
            if (LTap.cacheDict[textureName] == null)
                LTap.cacheDict[textureName] = [];
            var dict = LTap.cacheDict[textureName];
            var bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
                bullet.scaleX = bullet.scaleY = 1;
                bullet.alpha = 1;
            }
            else {
                bullet = new LTap(RES.getRes(textureName), textureName);
                Lgs.BtnMode(bullet, true);
                if (textureName == "tap1_png") {
                    bullet.touchEnabled = true;
                }
            }
            return bullet;
        };
        /**回收*/
        LTap.reclaim = function (bullet) {
            var textureName = bullet.textureName;
            if (LTap.cacheDict[textureName] == null)
                LTap.cacheDict[textureName] = [];
            var dict = LTap.cacheDict[textureName];
            if (dict.indexOf(bullet) == -1)
                dict.push(bullet);
        };
        return LTap;
    }(egret.Bitmap));
    LTap.cacheDict = {};
    Lgs.LTap = LTap;
    __reflect(LTap.prototype, "Lgs.LTap");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LTap.js.map