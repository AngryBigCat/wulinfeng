var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Lgs;
(function (Lgs) {
    /**
     * Created by Channing on 2014/12/6.
     * Bug Fixes by c5 on 2015/1/2.
     * 震动
     */
    var ShockUtils = (function () {
        function ShockUtils() {
            this.posScale = 1.5;
            this.mapPoss = [new egret.Point(0 * this.posScale, 3 * this.posScale), new egret.Point(3 * this.posScale, 2 * this.posScale), new egret.Point(-3 * this.posScale, -2 * this.posScale)];
            this.spritePoss = [new egret.Point(5 * this.posScale, 0 * this.posScale), new egret.Point(-5 * this.posScale, 0 * this.posScale), new egret.Point(5 * this.posScale, 0 * this.posScale)];
            this._shockLength = 0;
            this._shockCount = 0;
            this._rx = 0;
            this._ry = 0;
            this._type = 0;
            this._repeatCount = 0;
            this._isRunning = false;
            // let shocka = new Lgs.ShockUtils();
            // shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
            // let num = 100;
            // shocka._target = GameLayer;
            // shocka.start(num);//num是震动次数
        }
        ShockUtils.prototype.destroy = function () {
            this.stop();
            this._target = null;
        };
        ShockUtils.prototype.shock = function (type) {
            if (type === void 0) { type = 0; }
            this._type = type;
            if (this._type == ShockUtils.MAP) {
                this._shockPoss = this.mapPoss.concat();
                this._shockLength = this._shockPoss.length;
            }
            else if (this._type == ShockUtils.SPRITE) {
                this._shockPoss = this.spritePoss.concat();
                this._shockLength = this._shockPoss.length;
            }
        };
        ShockUtils.prototype.start = function (num) {
            if (num === void 0) { num = 1; }
            if (this._isRunning) {
                this.stop();
            }
            this.repeatCount = num;
            this._shockCount = 0;
            if (this._target) {
                this._isRunning = true;
                this._rx = this._target.x;
                this._ry = this._target.y;
                egret.Ticker.getInstance().register(this.onShockEnter, this);
            }
        };
        ShockUtils.prototype.stop = function () {
            this._isRunning = false;
            if (this._target) {
                this._target.x = this._rx;
                this._target.y = this._ry;
                egret.Ticker.getInstance().unregister(this.onShockEnter, this);
            }
        };
        ShockUtils.prototype.onShockEnter = function (e) {
            var maxCount = this._shockLength * this._repeatCount;
            if (this._shockCount >= maxCount) {
                this.stop();
                return;
            }
            var index = this._shockCount % this._shockLength;
            var pos = this._shockPoss[index];
            if (this._target) {
                this._target.x = this._rx + pos.x;
                this._target.y = this._ry + pos.y;
            }
            this._shockCount++;
        };
        Object.defineProperty(ShockUtils.prototype, "repeatCount", {
            get: function () {
                return this._repeatCount;
            },
            set: function (value) {
                this._repeatCount = value;
            },
            enumerable: true,
            configurable: true
        });
        return ShockUtils;
    }());
    ShockUtils.MAP = 0;
    ShockUtils.SPRITE = 1;
    Lgs.ShockUtils = ShockUtils;
    __reflect(ShockUtils.prototype, "Lgs.ShockUtils");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=ShockUtils.js.map