module Lgs {
    /**
     * 圆与多边形 投影法SAT
     * hitStr:"poly_circle","circle_circle"
     * 
     * 未完成
     * 
     * */
    export function satHitTest2(obj1,obj2,hitStr,arr1?,arr2?){
        if(!arr1){
            arr1 = [
                [0,0],
                [obj1.width,0],
                [obj1.width,obj1.height],
                [0,obj1.height]
            ];
            arr2 = [
                [0,0],
                [obj2.width,0],
                [obj2.width,obj2.height],
                [0,obj2.height]
            ];
        }
        if(obj1.visible&&obj2.visible){
            let q1 = obj1.localToGlobal(arr1[0][0],arr1[0][1]);
            let q2 = obj1.localToGlobal(arr1[1][0],arr1[1][1]);
            let q3 = obj1.localToGlobal(arr1[2][0],arr1[2][1]);
            let q4 = obj1.localToGlobal(arr1[3][0],arr1[3][1]);

            let p1 = obj2.localToGlobal(arr2[0][0],arr2[0][1]);
            let p2 = obj2.localToGlobal(arr2[1][0],arr2[1][1]);
            let p3 = obj2.localToGlobal(arr2[2][0],arr2[2][1]);
            let p4 = obj2.localToGlobal(arr2[3][0],arr2[3][1]);
            /**画出碰撞四边形 */
            Lgs.debugDrawshape(obj1,0x339933,[q1,q2,q3,q4]);
            Lgs.debugDrawshape(obj2,0xff0000,[p1,p2,p3,p4]);
            // hitStr


        }

        function CircleVsCircle(c1, c2) {
            var xSqr = c1.centerX - c2.centerX;
            xSqr *= xSqr;
            var ySqr = c1.centerY - c2.centerY;
            ySqr *= ySqr;
            //get the distance^2
            var distanceSqr = xSqr + ySqr;

            var radiusSum = c1.radius + c2.radius;

            if(distanceSqr <= radiusSum*radiusSum)
                return true;
            else
                return false;
        }

        function PolyVsCircle(p1, c2) {

        }
    }
    /**意在创建一个碰撞形状类 可以增加贴图 
     * 
     * 未完成 
     * 
     * */
    export class LHitShape233 extends egret.DisplayObjectContainer{
        public constructor(){
            super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
        }
        private onAddToStage(){
            
        }
        private hitShape;
        private hitTest(){
            // LHittestShape(this.hitShape);
            
        }
        private removedFun(){

        }
    }
}