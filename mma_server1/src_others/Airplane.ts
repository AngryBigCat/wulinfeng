/**
 * Created by shaorui on 14-6-7.
 */
module Lgs
{
    /**
     * 飞机，利用对象池
     */
    export class Airplane extends egret.DisplayObjectContainer
    {
        private static cacheDict:Object = {};
		/**
        /**生产*/
        public static produce(textureName:string,fireDelay:number):Airplane
        {	
            if(Airplane.cacheDict[textureName]==null) Airplane.cacheDict[textureName] = [];
            var dict:Airplane[] = Airplane.cacheDict[textureName];
            var theFighter:Airplane;
            let typeBlood = 0;
            switch (textureName){
                case "plane1_png":
                    typeBlood = 3;
                    break;
                case "move1_png":
                    typeBlood = 1;
                    break;
                case "stay1_png":
                    typeBlood = 1;
                    break;
            }
            if(dict.length>0) {
                theFighter = dict.pop();                
            } else {            
                theFighter = new Airplane(RES.getRes(textureName),fireDelay,textureName,typeBlood);
            }
            theFighter.remainderBullet = 1;
            theFighter.blood = typeBlood;
            return theFighter;
        }
        /**回收*/
        public static reclaim(theFighter:Airplane):void
        {
			var textureName: string = theFighter.textureName;
            if(Airplane.cacheDict[textureName]==null)
                Airplane.cacheDict[textureName] = [];
            var dict:Airplane[] = Airplane.cacheDict[textureName];
            if(dict.indexOf(theFighter)==-1)
                dict.push(theFighter);
        }

        /**飞机位图*/
        public bmp:egret.Bitmap;
        /**创建子弹的时间间隔*/
        public fireDelay:number;

        /**最大子弹发射数量*/
        public remainderBullet:number=1;
        /**弹幕数量*/
        public fireNums:number=1;

        /**定时射*/
        public fireTimer:egret.Timer;
        /**飞机生命值*/
        public blood:number = 10;
        /**飞机生命值*/
        private typeBlood:number = 10;
		//可视为飞机类型名
		public textureName:string;
        public constructor(texture:egret.Texture,fireDelay:number,textureName:string,blood:number) {
            super();
            this.fireDelay = fireDelay;
            this.bmp = new egret.Bitmap(texture);
			this.textureName = textureName;
			this.blood = blood;
			this.typeBlood = blood;
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        }
        /**开火*/
        public fire():void {
            this.fireTimer.start();
        }
        /**停火*/
        public stopFire():void {
            this.fireTimer.stop();
        }
        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
            if(this.textureName!="plane1_png"){
                if(this.y>-GetHeight(this)){
                    if(this.remainderBullet>0){
                        this.remainderBullet--; 
                        this.dispatchEventWith("createBullet");
                    }
                }
            }else{
                this.dispatchEventWith("createBullet");
            }
        }
    }
}