let goldNums = 0 ;
module Lgs {
    /**
     * 金币，利用对象池
     */
	export class LGold extends egret.MovieClip{
        private static cacheDict:Object = {};
        /**生产*/
        public static produce():LGold
        {
            goldNums++;
            var textureName = "gold_png";
            if(LGold.cacheDict[textureName]==null) LGold.cacheDict[textureName] = [];
            var dict:LGold[] = LGold.cacheDict[textureName];
            var gold:LGold;
            if(dict.length>0) {
                gold = dict.pop();
            } else {
                let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("gold_json"),RES.getRes("gold_png"));
                gold = new LGold(mcDataFactory.generateMovieClipData("gold"));
                gold.scaleX = gold.scaleY = 0.8;
                gold.frameRate = 8;
                gold.anchorOffsetX = gold.width/2;
                gold.anchorOffsetY = gold.height/2;
            }

            if(goldNums%2==0){
                gold.gotoAndPlay("run",-1);
            }else{
                gold.gotoAndPlay("run2",-1);
            }
            return gold;
        }
        /**回收*/
        public static reclaim(bullet:LGold):void
        {
            var textureName: string = bullet.textureName;
            if(LGold.cacheDict[textureName]==null) LGold.cacheDict[textureName] = [];
            var dict:LGold[] = LGold.cacheDict[textureName];
            if(dict.indexOf(bullet)==-1) dict.push(bullet);
        }

        public textureName:string;//可视为金币类型名
        public constructor(movieClipData:egret.MovieClipData) {
            super();
            this.movieClipData = movieClipData;
            this.scaleX = this.scaleY = initScale;
		}
	}
}