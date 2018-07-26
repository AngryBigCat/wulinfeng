declare var localbgmStr;
module Lgs {
	export class LBgm extends egret.DisplayObjectContainer{
		public isPlay:boolean;
		private canRun:boolean = false;
		constructor(){
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public bgmLayer:egret.Bitmap;
		private Timer:egret.Timer;
		private onAddToStage(){
			this.bgmLayer = createBitmapByName('musicOn_png');
			scaleFun(this.bgmLayer,0.06);
			this.addChild(this.bgmLayer);
			this.bgmLayer.touchEnabled = true;
			this.x = gw - pw_sx - GetWidth(this) - gh*0.015;
			this.y = gh*0.02;
			BtnMode(this.bgmLayer);

			this.bgmLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.on_off,this);
			if(this.canRun){
				this.Timer = new egret.Timer(30);
				this.Timer.addEventListener(egret.TimerEvent.TIMER,this.Run,this);
			}
			/**直接播放bgm */
			if(egret.localStorage.getItem(localbgmStr)!="pause"){
				if(egret.localStorage.getItem(localbgmStr)==null)
					egret.localStorage.setItem(localbgmStr,"play");
				this.play();
			}else{
				this.pause();
			}
		}
		public setnewPosition(x:number,y:number,rotate?:number){
			this.x = x;
			this.y = y;	
			if(rotate||rotate==0){
				this.rotation = rotate;
			}
		}
		public setinitPosition(){
			this.rotation = 0;
			this.x = gw - pw_sx - GetWidth(this) - gh*0.016;
			this.y = gh*0.016;
		}

		private Run(){
			this.bgmLayer.rotation += 2;
		}
		private on_off(){
			if(this.isPlay){
				// canMusic = false;
				egret.localStorage.setItem(localbgmStr,"pause");
				stopOtherAudio("bgm");
				this.pause();
			}else{
				// canMusic = true;
				egret.localStorage.setItem(localbgmStr,"play");
				this.play();
			}
			// playAudio("touchBtn",0);
		}
		public play(){
			if(this.canRun){
				this.Timer.start();
			}
			this.isPlay = true;
			this.bgmLayer.texture = RES.getRes('musicOn_png');
            $('#bgm')[0].play();
		}
		public pause(){
			if(this.canRun){
				this.bgmLayer.rotation = 0;
				this.Timer.stop();
			}
			this.isPlay = false;
			this.bgmLayer.texture = RES.getRes('musicOff_png');
            $('#bgm')[0].pause();
		}
		public show(){
			this.bgmLayer.visible = true;
		}
		public hide(){
			this.bgmLayer.visible = false;
		}
	}

}

module Lgs {
	export class LScreen extends egret.DisplayObjectContainer{
		constructor(canRun?:boolean){
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private screenMask:egret.Shape;
		private loadText:egret.TextField;
		private loadingMc:egret.MovieClip;
		private onAddToStage(){
			this.touchEnabled = true;
			this.screenMask = new egret.Shape();
			this.addChild(this.screenMask);
			let matrix = new egret.Matrix();
			matrix.createGradientBox(gh, gh, Math.PI*0.5, 0, 0);
			this.screenMask.graphics.beginGradientFill(egret.GradientType.LINEAR,[0x000000,0x000000,0x000000,0x000000],[0,0.7,0.7,0],[255*0.38,255*0.4,255*0.52,255*0.54],matrix);
			this.screenMask.graphics.drawRect(0,0,gh,gh);
			this.screenMask.graphics.endFill();
			this.screenMask.x = (gw-gh)/2;
			this.screenMask.alpha = 0.5;

			this.loadText = new egret.TextField();
			this.addChild(this.loadText);
			textScaleFun(this.loadText,0.028,0xffffff);
			this.loadText.text = "网络请求中";
			this.loadText.x = gw/2 - GetWidth(this.loadText)/2;
			this.loadText.y = gh*0.42;
			this.loadText.alpha = 0.8;

			let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("loading_json"),RES.getRes("loading_png"));
			this.loadingMc = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
			this.loadingMc.scaleX = this.loadingMc.scaleY = initScale*0.4;
			this.addChild(this.loadingMc);
			this.loadingMc.x = gw/2 - GetWidth(this.loadingMc)/2;
			this.loadingMc.frameRate=18;
			this.loadingMc.y = gh*0.46;
			this.loadingMc.gotoAndPlay("run",-1);
		}
		private isShow = false;
		public loadingShow(txt?:string){
			this.touchEnabled = true;
			this.visible = true;
			this.loadingMc.play();
			txt? txt=txt:txt="网络请求中";
			this.loadText.text = txt;
			this.loadText.x = gw/2 - GetWidth(this.loadText)/2;
		}
		public loadingHide(){
			this.visible = false;
			this.loadingMc.stop();
		}
	}
}
