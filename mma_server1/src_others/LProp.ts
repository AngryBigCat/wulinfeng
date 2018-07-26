module Lgs {
    /**
     * 道具，利用对象池
     */
	export class LProp extends egret.MovieClip{
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName):LProp
        {
            if(LProp.cacheDict[textureName]==null) LProp.cacheDict[textureName] = [];
            var dict:LProp[] = LProp.cacheDict[textureName];
            var prop:LProp;
            if(dict.length>0) {
                prop = dict.pop();
            } else {
                let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("props_json"),RES.getRes("props_png"));
                prop = new LProp(mcDataFactory.generateMovieClipData(textureName));
                prop.textureName = textureName;
                prop.scaleX = prop.scaleY = initScale;
                prop.anchorOffsetX = prop.width/2;
                prop.anchorOffsetY = prop.height/2;
            }
            prop.gotoAndPlay("run",-1);
            return prop;
        }
        /**回收*/
        public static reclaim(prop:LProp):void
        {
            var textureName: string = prop.textureName;
            if(LProp.cacheDict[textureName]==null) LProp.cacheDict[textureName] = [];
            var dict:LProp[] = LProp.cacheDict[textureName];
            if(dict.indexOf(prop)==-1) dict.push(prop);
        }

        public textureName:string;//可视为道具类型名
        public constructor(movieClipData:egret.MovieClipData) {
            super();
            this.movieClipData = movieClipData;
            this.scaleX = this.scaleY = initScale;
		}
	}
}