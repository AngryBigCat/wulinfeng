/**
 * Created by shaorui on 14-6-7.
 */
module Lgs
{
    /**
     * tap，利用对象池
     */
    export class LTap extends egret.Bitmap
    {
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string):LTap
        {
            if(LTap.cacheDict[textureName]==null)  LTap.cacheDict[textureName] = [];
            var dict:LTap[] = LTap.cacheDict[textureName];
            var bullet:LTap;
            if(dict.length>0) {
                bullet = dict.pop();
                bullet.scaleX = bullet.scaleY = 1;
                bullet.alpha = 1;
            } else {
                bullet = new LTap(RES.getRes(textureName),textureName);
                BtnMode(bullet,true);
                if(textureName=="tap1_png"){
                    bullet.touchEnabled = true;
                }
            }
            return bullet;
        }
        /**回收*/
        public static reclaim(bullet:LTap):void
        {
            var textureName: string = bullet.textureName;
            if(LTap.cacheDict[textureName]==null) LTap.cacheDict[textureName] = [];
            var dict:LTap[] = LTap.cacheDict[textureName];
            if(dict.indexOf(bullet)==-1) dict.push(bullet);
        }

        public textureName:string;//可视为tap类型名
        public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
		}
    }
}
