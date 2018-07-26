module Lgs {
	export class LBg extends egret.DisplayObjectContainer{
		public constructor(bgSpeed) {
			super();
			this.bgSpeed = bgSpeed;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private bgmapArr:any[] = [];
		private bgmap1;
		public bgSpeed;
		private onAddToStage(){
			this.bgmap1 = createBitmapByName("gameBg1_jpg");
			this.addChild(this.bgmap1);
			this.bgmap1.x = gw/2 - GetWidth(this.bgmap1)/2;
			this.bgmap1.y = gh+218 - GetHeight(this.bgmap1);

			let bgmap2 = createBitmapByName("gameBg2_jpg");
			let bgHeight = GetHeight(bgmap2);
			let bgCount = Math.ceil(dh/bgHeight)+1;
			for(let i=0;i<bgCount;i++){
				let bgmap = createBitmapByName("gameBg2_jpg");
				this.addChild(bgmap);
				bgmap.x = gw/2 - GetWidth(bgmap)/2;
				bgmap.y = this.bgmap1.y - GetHeight(bgmap)*(bgCount-i);

				this.bgmapArr.push(bgmap);
			}

			this.bgmapArr.push(this.bgmap1);
		}

		public play(){
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
		};
		public stop(){
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
		};
		private onframe(){
			for(let i=0;i<this.bgmapArr.length;i++){
				let bgmap = this.bgmapArr[i];
				bgmap.y += this.bgSpeed;
				if(bgmap.y>gh+(dh-gh)){
					if(bgmap.texture!=RES.getRes("gameBg1_jpg")){
						bgmap.y = this.bgmapArr[0].y - GetHeight(bgmap);
						this.bgmapArr.splice(i,1);
						this.bgmapArr.unshift(bgmap);
					}else{
						this.bgmapArr.splice(i,1);
						LremoveChild(bgmap);
					}
				}
			}
		}

		private removedFun(){
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
			
		}
	}
}