module Lgs
{
    /**
     * 障碍物，利用对象池
      [9,7],
      [57,7],
      [57,56],
      [9,56],

      66,18,48  147.32
      */
    export class LRock extends egret.Bitmap
    {
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string):LRock
        {
			/**rock1_png, rock2_png, rock3_png*/
            if(LRock.cacheDict[textureName]==null)  LRock.cacheDict[textureName] = [];
            var dict:LRock[] = LRock.cacheDict[textureName];
            var rock:LRock;
            if(dict.length>0) {
                rock = dict.pop();
            } else {
                rock = new LRock(RES.getRes(textureName),textureName);
                rock.anchorOffsetX = 9;
                rock.scaleX = rock.scaleY = initScale*750/7/(48+9);
            }
            return rock;
        }
        public static hitRect = [
            [9,7],
            [57,7],
            [57,56],
            [9,56]
        ]
        /**回收*/
        public static reclaim(rock:LRock):void
        {
            var textureName: string = rock.textureName;
            if(LRock.cacheDict[textureName]==null) LRock.cacheDict[textureName] = [];
            var dict:LRock[] = LRock.cacheDict[textureName];
            if(dict.indexOf(rock)==-1) dict.push(rock);
        }

        public textureName:string;//可视为子弹类型名
        public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
		}
    }
}
