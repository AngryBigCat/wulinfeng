module Lgs {
	export class activityEndPage extends egret.DisplayObjectContainer{
		public constructor() {
			super();

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private onAddToStage(){
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			bgLayer.touchEnabled = true;

			let zhuliBg = createBitmapByName("ruleBg2_jpg");
			bgLayer.addChild(zhuliBg);
			zhuliBg.x = gw/2 - GetWidth(zhuliBg)/2;

			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;

			let activityEndBg = createBitmapByName("activityEndBg_png");
			winLayer.addChild(activityEndBg);
			activityEndBg.x = gw/2 - GetWidth(activityEndBg)/2;
			activityEndBg.y = gh*0.24;

			winEnterAni(zhuliBg,winLayer,"scale01");

			this.once(egret.TouchEvent.TOUCH_TAP,function(){
				winCloseAni(winLayer,"scale01",function(){
					LremoveChild(this);
				},this);
			},this);
		}
		private removedFun(){
			
		}

	}
}
