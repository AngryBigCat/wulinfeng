module Lgs {
	export function sharePage(callBack?:Function,thisObj?):egret.Sprite{
		// playAudio("touchBtn");
		bgmViewer.hide();

		let shareLayer = new egret.Sprite();
		// GameLayer.addChild(shareLayer);
		shareLayer.touchEnabled = true;
		shareObj = shareLayer;

		let shareShape = makeaShape(0x000000,0.85);
		shareLayer.addChild(shareShape);

		let sharebg = createBitmapByName("sharebg_png");
		shareLayer.addChild(sharebg);
		sharebg.x = gw - pw_sx - GetWidth(sharebg) - gh*0.015;
		sharebg.y = pw_sy + gh*0.015;

		shareLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
			LremoveChild(shareLayer);
			bgmViewer.show();
		},this);

		shareLayer["closeAni"] = function(){
			LremoveChild(shareLayer);
			bgmViewer.show();
		}
		return shareLayer;
	}
}

function shareOkClose(){
	if(shareObj&&shareObj.parent){
		if(shareObj["closeAni"]){
			shareObj["closeAni"]();
		}else{
			Lgs.LremoveChild(shareObj);	
		}
	}
}