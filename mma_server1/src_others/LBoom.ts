module Lgs {
    /**
     * 爆炸效果，利用对象池
     */
	export class LBoom extends egret.MovieClip{
        private static cacheDict:Object = {};
        /**生产*/
        public static produce():LBoom
        {
            var textureName = "boom_png";
            if(LBoom.cacheDict[textureName]==null) LBoom.cacheDict[textureName] = [];
            var dict:LBoom[] = LBoom.cacheDict[textureName];
            var boom:LBoom;
            if(dict.length>0) {
                boom = dict.pop();
            } else {
                let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("boom_json"),RES.getRes("boom_png"));
                boom = new LBoom(mcDataFactory.generateMovieClipData("boom"));
                boom.frameRate = 12;
                boom.anchorOffsetX = boom.width/2;
                boom.anchorOffsetY = boom.height/2;
				boom.scaleX = boom.scaleY = 1.2;
            }
            return boom;
        }
        /**回收*/
        public static reclaim(boom:LBoom):void
        {
            var textureName: string = boom.textureName;
            if(LBoom.cacheDict[textureName]==null) LBoom.cacheDict[textureName] = [];
            var dict:LBoom[] = LBoom.cacheDict[textureName];
            if(dict.indexOf(boom)==-1) dict.push(boom);
        }

        public textureName:string;//可视为爆炸效果类型名
        public constructor(movieClipData:egret.MovieClipData) {
            super();
            this.movieClipData = movieClipData;
            this.scaleX = this.scaleY = initScale;
		}
	}
}