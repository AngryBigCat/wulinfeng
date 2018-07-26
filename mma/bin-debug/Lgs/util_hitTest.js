var Lgs;
(function (Lgs) {
    /**
     * 多边形碰撞(适用于凸多边形) 投影法SAT
     * default:"aabb","poly"
     * */
    function satHitTest1(obj1, obj2, hitStyle, arr1, arr2) {
        if (!hitStyle) {
            hitStyle = "aabb";
        }
        if (!arr1) {
            arr1 = [
                [0, 0],
                [obj1.width, 0],
                [obj1.width, obj1.height],
                [0, obj1.height]
            ];
        }
        if (!arr2) {
            arr2 = [
                [0, 0],
                [obj2.width, 0],
                [obj2.width, obj2.height],
                [0, obj2.height]
            ];
        }
        if (obj1.visible && obj2.visible) {
            var qts = [];
            var pts = [];
            for (var i = 0; i < arr1.length; i++) {
                var qt = obj1.localToGlobal(arr1[i][0], arr1[i][1]);
                qts.push(qt);
            }
            for (var i = 0; i < arr2.length; i++) {
                var pt = obj2.localToGlobal(arr2[i][0], arr2[i][1]);
                pts.push(pt);
            }
            /**画出碰撞多边形 */
            Lgs.debugDrawshape(obj1, 0x339933, qts);
            Lgs.debugDrawshape(obj2, 0xff0000, pts);
            if (hitStyle == "poly") {
                var qps = {
                    "points": qts
                };
                var pps = {
                    "points": pts
                };
                return PolyVsPoly(qps, pps);
            }
            else if (hitStyle == "aabb") {
                var aabb1 = {
                    "xMin": qts[0].x,
                    "yMin": qts[1].y,
                    "xMax": qts[2].x,
                    "yMax": qts[3].y
                };
                var aabb2 = {
                    "xMin": pts[0].x,
                    "yMin": pts[1].y,
                    "xMax": pts[2].x,
                    "yMax": pts[3].y
                };
                return AABBvsAABB(aabb1, aabb2);
            }
        }
        return false;
    }
    Lgs.satHitTest1 = satHitTest1;
    /**
     * SAT其他函数
     * */
    function PolyVsPoly(p1, p2) {
        //check the normal in p1
        for (var i = 0; i < p1.points.length - 1; i++) {
            var edge = Minus(p1.points[i], p1.points[i + 1]);
            var normal = Normal(edge);
            var isOverlap = CheckCollide(normal, p1, p2);
            if (!isOverlap)
                return false;
        }
        //check normal in p2
        for (var i = 0; i < p2.points.length - 1; i++) {
            var edge = Minus(p2.points[i], p2.points[i + 1]);
            var normal = Normal(edge);
            var isOverlap = CheckCollide(normal, p1, p2);
            if (!isOverlap)
                return false;
        }
        return true;
    }
    Lgs.PolyVsPoly = PolyVsPoly;
    function AABBvsAABB(aabb1, aabb2) {
        //check X axis
        if (aabb1.xMin > aabb2.xMax)
            return false;
        if (aabb1.xMax < aabb2.xMin)
            return false;
        //check Y axis
        if (aabb1.yMin > aabb2.yMax)
            return false;
        if (aabb1.yMax < aabb2.yMin)
            return false;
        return true;
    }
    Lgs.AABBvsAABB = AABBvsAABB;
    function CheckCollide(axis, p1, p2) {
        var min1 = Dot(p1.points[0], axis);
        var max1 = Dot(p1.points[0], axis);
        for (var k = 1; k < p1.points.length; k++) {
            var v = Dot(p1.points[k], axis);
            if (v > max1)
                max1 = v;
            if (v < min1)
                min1 = v;
        }
        var min2 = Dot(p2.points[0], axis);
        var max2 = Dot(p2.points[0], axis);
        for (var k = 1; k < p2.points.length; k++) {
            var v = Dot(p2.points[k], axis);
            if (v > max2)
                max2 = v;
            if (v < min2)
                min2 = v;
        }
        if (!IsOverlap(min1, max1, min2, max2))
            return false;
        return true;
    }
    Lgs.CheckCollide = CheckCollide;
    function IsOverlap(min1, max1, min2, max2) {
        if (min1 > max2)
            return false;
        if (max1 < min2)
            return false;
        return true;
    }
    Lgs.IsOverlap = IsOverlap;
    function Minus(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    Lgs.Minus = Minus;
    function Normal(v) {
        return new Vector(-v.y, v.x);
    }
    Lgs.Normal = Normal;
    function Dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    Lgs.Dot = Dot;
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Lgs.Vector = Vector;
    /**object矩形线段相交 适用于旋转相交(对象线段必定重叠的相交)*/
    function LHitTestObject(obj1, obj2) {
        if (obj1.visible && obj2.visible) {
            var q1 = obj1.localToGlobal(0, 0);
            var q2 = obj1.localToGlobal(obj1.width, 0);
            var q3 = obj1.localToGlobal(obj1.width, obj1.height);
            var q4 = obj1.localToGlobal(0, obj1.height);
            var p1 = obj2.localToGlobal(0, 0);
            var p2_1 = obj2.localToGlobal(obj2.width, 0);
            var p3 = obj2.localToGlobal(obj2.width, obj2.height);
            var p4 = obj2.localToGlobal(0, obj2.height);
            /**画出碰撞多边形 */
            // debugDrawshape(obj1,[q1,q2,q3,q4],0x339933);
            // debugDrawshape(obj2,[p1,p2,p3,p4],0xff0000);
            /** */
            var qArr = [q1, q2, q3, q4];
            var pArr = [p1, p2_1, p3, p4];
            for (var qo = 0; qo < qArr.length; qo++) {
                var qq2 = qo + 1;
                if (qo == qArr.length - 1) {
                    qq2 = 0;
                }
                for (var po = 0; po < pArr.length; po++) {
                    var pp2 = po + 1;
                    if (po == pArr.length - 1) {
                        pp2 = 0;
                    }
                    var isHit = segmentsIntr(qArr[qo], qArr[qq2], pArr[po], pArr[pp2]);
                    if (isHit)
                        return true;
                }
            }
        }
        return false;
    }
    Lgs.LHitTestObject = LHitTestObject;
    /**object矩形线段相交 自由设定基于object位置的碰撞大小 */
    function LHitTestObject2(obj1, obj2, arr1, arr2) {
        if (!arr1) {
            arr1 = [
                [0, pw_sy],
                [obj1.width, pw_sy],
                [obj1.width, obj1.height + pw_sy],
                [0, obj1.height + pw_sy]
            ];
            arr2 = [
                [0, pw_sy],
                [obj2.width, pw_sy],
                [obj2.width, obj2.height + pw_sy],
                [0, obj2.height + pw_sy]
            ];
        }
        if (obj1.visible && obj2.visible) {
            var q1 = obj1.localToGlobal(arr1[0][0], arr1[0][1]);
            var q2 = obj1.localToGlobal(arr1[1][0], arr1[1][1]);
            var q3 = obj1.localToGlobal(arr1[2][0], arr1[2][1]);
            var q4 = obj1.localToGlobal(arr1[3][0], arr1[3][1]);
            var p1 = obj2.localToGlobal(arr2[0][0], arr2[0][1]);
            var p2_2 = obj2.localToGlobal(arr2[1][0], arr2[1][1]);
            var p3 = obj2.localToGlobal(arr2[2][0], arr2[2][1]);
            var p4 = obj2.localToGlobal(arr2[3][0], arr2[3][1]);
            /**画出碰撞多边形 */
            debugDrawshape(obj1, 0x339933, [q1, q2, q3, q4]);
            debugDrawshape(obj2, 0xff0000, [p1, p2_2, p3, p4]);
            /** */
            var qArr = [q1, q2, q3, q4];
            var pArr = [p1, p2_2, p3, p4];
            for (var qo = 0; qo < qArr.length; qo++) {
                var qq2 = qo + 1;
                if (qo == qArr.length - 1) {
                    qq2 = 0;
                }
                for (var po = 0; po < pArr.length; po++) {
                    var pp2 = po + 1;
                    if (po == pArr.length - 1) {
                        pp2 = 0;
                    }
                    var isHit = segmentsIntr(qArr[qo], qArr[qq2], pArr[po], pArr[pp2]);
                    if (isHit)
                        return true;
                }
            }
        }
        return false;
    }
    Lgs.LHitTestObject2 = LHitTestObject2;
    /**矩形碰撞 设置根据原大小的改变的数值碰撞 可以不设置*/
    function LHitTest(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [0, 0, -0, -0];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, -0, -0];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = obj1.x - obj1.anchorOffsetX * obj1.scaleX + hitRect1[0];
        rect1.y = obj1.y - obj1.anchorOffsetY * obj1.scaleY + hitRect1[1];
        rect1.width = rect1.width * obj1.scaleX + hitRect1[2];
        rect1.height = rect1.height * obj1.scaleY + hitRect1[3];
        rect2.x = obj2.x - obj2.anchorOffsetX * obj2.scaleX + hitRect2[0];
        rect2.y = obj2.y - obj2.anchorOffsetY * obj2.scaleY + hitRect2[1];
        rect2.width = rect2.width * obj2.scaleX + hitRect2[2];
        rect2.height = rect2.height * obj2.scaleY + hitRect2[3];
        return rect1.intersects(rect2);
    }
    Lgs.LHitTest = LHitTest;
    /**矩形碰撞2 设置碰撞大小碰撞位置基于object 可以不设置*/
    function LHittestShape(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [0, 0, Lgs.GetWidth(obj1), Lgs.GetHeight(obj1)];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, Lgs.GetWidth(obj2), Lgs.GetHeight(obj2)];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = obj1.x - obj1.anchorOffsetX * obj1.scaleX + hitRect1[0];
        rect1.y = obj1.y - obj1.anchorOffsetY * obj1.scaleY + hitRect1[1];
        rect1.width = hitRect1[2];
        rect1.height = hitRect1[3];
        rect2.x = obj2.x - obj2.anchorOffsetX * obj2.scaleX + hitRect2[0];
        rect2.y = obj2.y - obj2.anchorOffsetY * obj2.scaleY + hitRect2[1];
        rect2.width = hitRect2[2];
        rect2.height = hitRect2[3];
        /**画出碰撞矩形 */
        /** */
        return rect1.intersects(rect2);
    }
    Lgs.LHittestShape = LHittestShape;
    /**矩形碰撞2.2 直接设置碰撞大小 碰撞位置随意设置 可以不设置*/
    function LHittestShape2(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [
                obj1.x - obj1.anchorOffsetX * obj1.scaleX,
                obj1.y - obj1.anchorOffsetY * obj1.scaleY,
                Lgs.GetWidth(obj1), Lgs.GetHeight(obj1)
            ];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, Lgs.GetWidth(obj2), Lgs.GetHeight(obj2)];
            hitRect2 = [
                obj2.x - obj2.anchorOffsetX * obj2.scaleX,
                obj2.y - obj2.anchorOffsetY * obj2.scaleY,
                Lgs.GetWidth(obj2), Lgs.GetHeight(obj2)
            ];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = hitRect1[0];
        rect1.y = hitRect1[1];
        rect1.width = hitRect1[2];
        rect1.height = hitRect1[3];
        rect2.x = hitRect2[0];
        rect2.y = hitRect2[1];
        rect2.width = hitRect2[2];
        rect2.height = hitRect2[3];
        /**画出碰撞矩形 */
        /** */
        return rect1.intersects(rect2);
    }
    Lgs.LHittestShape2 = LHittestShape2;
    /**点在矩形内 */
    function LHitTestPoint(point, obj2) {
        var pointer = new egret.Point(point.x, point.y);
        if (pointer.x >= obj2.x - obj2.anchorOffsetX * obj2.scaleX
            && pointer.x <= obj2.x - obj2.anchorOffsetX * obj2.scaleX + Lgs.GetWidth(obj2)
            && pointer.y >= obj2.y - obj2.anchorOffsetY * obj2.scaleY
            && pointer.y <= obj2.y - obj2.anchorOffsetY * obj2.scaleY + Lgs.GetHeight(obj2)) {
            return true;
        }
        return false;
    }
    Lgs.LHitTestPoint = LHitTestPoint;
    /**点与四边形相交 ----*/
    function LHitTestPoint2(point, obj, arr) {
        if (!arr) {
            arr = [
                [0, 0],
                [obj.width, 0],
                [obj.width, obj.height],
                [0, obj.height]
            ];
        }
        if (obj.visible) {
            var q1 = obj.localToGlobal(arr[0][0], arr[0][1]);
            var q2 = obj.localToGlobal(arr[1][0], arr[1][1]);
            var q3 = obj.localToGlobal(arr[2][0], arr[2][1]);
            var q4 = obj.localToGlobal(arr[3][0], arr[3][1]);
            /**画出碰撞多边形 */
            // debugDrawshape(obj,[q1,q2,q3,q4],0x339933);
            // drawPoint(point,0xff0000);
            /** */
            var hitNum = 0;
            var qArr = [q1, q2, q3, q4];
            for (var qo = 0; qo < qArr.length; qo++) {
                var qq2 = qo + 1;
                if (qo == qArr.length - 1) {
                    qq2 = 0;
                }
                if (segmentsIntr(qArr[qo], qArr[qq2], point, { x: 0, y: gh })) {
                    hitNum++;
                }
                ;
            }
            if (hitNum % 2 == 1) {
                return true;
            }
        }
        return false;
    }
    Lgs.LHitTestPoint2 = LHitTestPoint2;
    /**点在四边形内 跳一跳*/
    function LHitTestPoint3(point, obj, arr) {
        function GetCross(p1, p2, p) {
            return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
        }
        function IsPointInMatrix(p, p1, p2, p3, p4) {
            return GetCross(p1, p2, p) * GetCross(p3, p4, p) >= 0 && GetCross(p2, p3, p) * GetCross(p4, p1, p) >= 0;
            //return false;
        }
        if (!arr) {
            arr = [
                [0, 0],
                [obj.width, 0],
                [obj.width, obj.height],
                [0, obj.height]
            ];
        }
        if (obj.visible) {
            var p1 = obj.localToGlobal(arr[0][0], arr[0][1]);
            var p2_3 = obj.localToGlobal(arr[1][0], arr[1][1]);
            var p3 = obj.localToGlobal(arr[2][0], arr[2][1]);
            var p4 = obj.localToGlobal(arr[3][0], arr[3][1]);
            /**画出碰撞多边形 */
            // debugDrawshape(obj,[p1,p2,p3,p4],0x339933);
            // drawPoint(point,0xff0000);
            /** */
            if (IsPointInMatrix(point, p1, p2_3, p3, p4)) {
                return true;
            }
        }
        return false;
    }
    Lgs.LHitTestPoint3 = LHitTestPoint3;
    /**判断线段相交方程 3*/
    function segmentsIntr(a, b, c, d) {
        // 三角形abc 面积的2倍  
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
        // 三角形abd 面积的2倍  
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
        if (area_abc * area_abd >= 0) {
            return false;
        }
        // 三角形cda 面积的2倍  
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍  
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
        var area_cdb = area_cda + area_abc - area_abd;
        if (area_cda * area_cdb >= 0) {
            return false;
        }
        //计算交点坐标  
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x), dy = t * (b.y - a.y);
        return { x: a.x + dx, y: a.y + dy };
    }
    Lgs.segmentsIntr = segmentsIntr;
    /**画出碰撞形状 */
    function debugDrawshape(obj, color, positionData) {
        if (!(obj["debugShape"] instanceof egret.Shape)) {
            if (!obj["debugShape_onclear"]) {
                var debugShape1_1 = new egret.Shape();
                GameLayer.addChild(debugShape1_1);
                obj["debugShape"] = debugShape1_1;
                debugShapeArr.push(obj);
                obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    debugShape1_1.graphics.clear();
                    Lgs.LremoveChild(debugShape1_1);
                    obj["debugShape"] = "";
                }, obj);
            }
            else {
                var debugShape_onclear = obj["debugShape_onclear"];
                obj["debugShape"] = debugShape_onclear;
                obj["debugShape_onclear"] = "";
                debugShapeArr.push(obj);
            }
        }
        var debugShape = obj['debugShape'];
        debugShape.graphics.clear();
        if (obj.visible && obj.parent) {
            debugShape.graphics.lineStyle(2, color);
            debugShape.graphics.moveTo(positionData[0].x, positionData[0].y + pw_sy);
            for (var i = 1; i < positionData.length; i++) {
                debugShape.graphics.lineTo(positionData[i].x, positionData[i].y + pw_sy);
            }
            debugShape.graphics.lineTo(positionData[0].x, positionData[0].y + pw_sy);
        }
    }
    Lgs.debugDrawshape = debugDrawshape;
    ;
    var debugShapeArr = [];
    function clearShape() {
        for (var i = 0; i < debugShapeArr.length; i++) {
            var debugShape2 = debugShapeArr[i]["debugShape"];
            debugShapeArr[i]["debugShape_onclear"] = debugShape2;
            debugShapeArr[i]["debugShape"] = "";
            if ((debugShape2 instanceof egret.Shape)) {
                debugShape2.graphics.clear();
            }
        }
        debugShapeArr = [];
    }
    Lgs.clearShape = clearShape;
    ;
    /**画出点· */
    function drawPoint(obj, color) {
        if (!(obj["debugShape"] instanceof egret.Shape)) {
            if (!obj["debugShape_onclear"]) {
                var debugShape1 = new egret.Shape();
                GameLayer.addChild(debugShape1);
                obj["debugShape"] = debugShape1;
                debugShapeArr.push(obj);
            }
            else {
                var debugShape_onclear = obj["debugShape_onclear"];
                obj["debugShape"] = debugShape_onclear;
                obj["debugShape_onclear"] = "";
                debugShapeArr.push(obj);
            }
        }
        var debugShape = obj['debugShape'];
        debugShape.graphics.clear();
        debugShape.graphics.beginFill(color);
        debugShape.graphics.drawCircle(obj.x, obj.y, 2.5);
        debugShape.graphics.endFill();
    }
    Lgs.drawPoint = drawPoint;
    ;
})(Lgs || (Lgs = {}));
//# sourceMappingURL=util_hitTest.js.map