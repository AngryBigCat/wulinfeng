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
    /**
     * 圆与多边形 投影法SAT
     * hitStr:"poly_circle","circle_circle"
     *
     * 未完成
     *
     * */
    function satHitTest2(obj1, obj2, hitStr, arr1, arr2) {
        if (!arr1) {
            arr1 = [
                [0, 0],
                [obj1.width, 0],
                [obj1.width, obj1.height],
                [0, obj1.height]
            ];
            arr2 = [
                [0, 0],
                [obj2.width, 0],
                [obj2.width, obj2.height],
                [0, obj2.height]
            ];
        }
        if (obj1.visible && obj2.visible) {
            var q1 = obj1.localToGlobal(arr1[0][0], arr1[0][1]);
            var q2 = obj1.localToGlobal(arr1[1][0], arr1[1][1]);
            var q3 = obj1.localToGlobal(arr1[2][0], arr1[2][1]);
            var q4 = obj1.localToGlobal(arr1[3][0], arr1[3][1]);
            var p1 = obj2.localToGlobal(arr2[0][0], arr2[0][1]);
            var p2_1 = obj2.localToGlobal(arr2[1][0], arr2[1][1]);
            var p3 = obj2.localToGlobal(arr2[2][0], arr2[2][1]);
            var p4 = obj2.localToGlobal(arr2[3][0], arr2[3][1]);
            /**画出碰撞四边形 */
            Lgs.debugDrawshape(obj1, 0x339933, [q1, q2, q3, q4]);
            Lgs.debugDrawshape(obj2, 0xff0000, [p1, p2_1, p3, p4]);
        }
        function CircleVsCircle(c1, c2) {
            var xSqr = c1.centerX - c2.centerX;
            xSqr *= xSqr;
            var ySqr = c1.centerY - c2.centerY;
            ySqr *= ySqr;
            //get the distance^2
            var distanceSqr = xSqr + ySqr;
            var radiusSum = c1.radius + c2.radius;
            if (distanceSqr <= radiusSum * radiusSum)
                return true;
            else
                return false;
        }
        function PolyVsCircle(p1, c2) {
        }
    }
    Lgs.satHitTest2 = satHitTest2;
    /**意在创建一个碰撞形状类 可以增加贴图
     *
     * 未完成
     *
     * */
    var LHitShape233 = (function (_super) {
        __extends(LHitShape233, _super);
        function LHitShape233() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LHitShape233.prototype.onAddToStage = function () {
        };
        LHitShape233.prototype.hitTest = function () {
            // LHittestShape(this.hitShape);
        };
        LHitShape233.prototype.removedFun = function () {
        };
        return LHitShape233;
    }(egret.DisplayObjectContainer));
    Lgs.LHitShape233 = LHitShape233;
    __reflect(LHitShape233.prototype, "Lgs.LHitShape233");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=util_test.js.map