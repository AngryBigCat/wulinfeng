let snowing1:Lgs.snowing;
module Lgs {
	export class keyPage extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?) {
			super();
			if(callback) this.callback=callback;
			if(thisObj) this.thisObj=thisObj;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage1,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any = false;
		private thisObj:any = false;
		private sureBtn:egret.Bitmap;
		private ruleBtn:egret.Bitmap;
		/**邀请码 */
		private inviteCode:any = false;;
		private onAddToStage1(){
			// get_tokenAjax(this.onAddToStage,this.onAddToStage,this);
		}
		private onAddToStage(data){
			let _THIS = this;
			this.touchEnabled = true;
			this.inviteCode =  data.token;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);
			let homebg = createBitmapByName("homeBg_jpg");
			bgLayer.addChild(homebg);
			homebg.x = gw/2 - GetWidth(homebg)/2;
		/**飘雪 */
			snowing1 = new Lgs.snowing("snowing");
			snowing1.minSudu = gh*0.0025;
			snowing1.maxSudu = gh*0.0045;
			snowing1.canWind = true;
			this.stage.addChild(snowing1);
			snowing1.play();
		/**其他元件 */
			// let homeTitle = createBitmapByName("homeTitle_png");
			// bgLayer.addChild(homeTitle);
			// homeTitle.x = gw/2 - GetWidth(homeTitle)/2;
			// homeTitle.y = gh*0.055;

			// let logo = createBitmapByName("logo_png");
			// bgLayer.addChild(logo);
			// logo.x = gw/2 - GetWidth(logo)/2;
			// logo.y = gh*0.28;
		/**keyBox */
			let keyBox = new LInput();
			fgLayer.addChild(keyBox);
			keyBox.setBg("inputBox_png",
			{
				name:"inputView_png",
				x:(264-4-174)/2,
				y:40
			},{
				x:8,
				y:30,
				width:264 - 18,
				height:97 - 40,
		},0.024);
			keyBox.input.textColor = 0x010E43;
			keyBox.input.bold = true;
			textScaleFun(keyBox.input,0.028);
			keyBox.x = gw/2 - GetWidth(keyBox)/2;
			keyBox.y = gh*0.508;
			// this.inviteCode = "AFGH76576";
			if(this.inviteCode){
				keyBox.input.type = egret.TextFieldType.DYNAMIC;
				keyBox.input.text = this.inviteCode;
				keyBox.inputed = true;
				keyBox.input.textColor = 0x010E43;
				keyBox.input.alpha = 0.9;
				keyBox.inputtips.alpha = 0;
			}
		/**按钮 */
			let sureBtn = createBitmapByName("sureBtn_png");
			fgLayer.addChild(sureBtn);
			BtnMode(sureBtn);
			sureBtn.x = gw/2;
			sureBtn.y = gh*0.66;

			let ruleBtn = createBitmapByName("ruleBtn_png");
			fgLayer.addChild(ruleBtn);
			BtnMode(ruleBtn);
			ruleBtn.x = gw/2;
			ruleBtn.y = gh*0.765;

			// let num1 = 0;
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP,testFun,this);
			// function testFun(){
			// 	this.removeEventListener(egret.TouchEvent.TOUCH_TAP,testFun,this);
			// 	num1++;
			// 	errorAni(keyBox);
			// 	LMsg("您取消了抽奖"+num1,function(){
			// 		this.addEventListener(egret.TouchEvent.TOUCH_TAP,testFun,this);
			// 	},this);
			// }
		/**动画 */
			let keyBoxy = keyBox.y;
			keyBox.y = gh*1.1;
			let sureBtny = sureBtn.y;
			sureBtn.y = gh*1.1;
			let ruleBtny = ruleBtn.y;
			ruleBtn.y = gh*1.1;
			egret.Tween.get(keyBox).to({y:keyBoxy},500,egret.Ease.backOut);
			egret.Tween.get(sureBtn).to({y:sureBtny},550,egret.Ease.backOut);
			egret.Tween.get(ruleBtn).to({y:ruleBtny},600,egret.Ease.backOut);
		/**事件监听 */
			sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
			removedListener(sureBtn,egret.TouchEvent.TOUCH_TAP,submitFun,this);
			ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,ruleFun,this);
			removedListener(ruleBtn,egret.TouchEvent.TOUCH_TAP,ruleFun,this);

			function submitFun(){
				sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
				// $(".keyInput").hide();
				if(this.inviteCode){
					// 退出动画
					LMsg("登陆成功");
					egret.Tween.get(keyBox).to({y:gh*1.2},500,egret.Ease.quadIn);
					egret.Tween.get(sureBtn).to({y:gh*1.2},400,egret.Ease.quadIn);
					egret.Tween.get(ruleBtn).to({y:gh*1.2},300,egret.Ease.quadIn).wait(300).call(function(){
						let homeLayer = new LHomePage();
						GameLayer.addChild(homeLayer);
						LremoveChild(this);
					},this);
				}else{
					egret.setTimeout(function() {
						if(keyBox.inputed){
							let key = keyBox.input.text.replace(/\s+/g,"");
							// Ajax
							// showloading();
							// game_tokenAjax(key,function(data){
							// 	hideloading();
							// 	// 退出动画
							// 	LMsg("登陆成功");
							// 	egret.Tween.get(keyBox).to({y:gh*1.2},500,egret.Ease.quadIn);
							// 	egret.Tween.get(sureBtn).to({y:gh*1.2},400,egret.Ease.quadIn);
							// 	egret.Tween.get(ruleBtn).to({y:gh*1.2},300,egret.Ease.quadIn).wait(300).call(function(){
							// 		let homeLayer = new LHomePage();
							// 		GameLayer.addChild(homeLayer);
							// 		LremoveChild(this);
							// 	},this);
							// },function(data){
							// 	hideloading();
							// 	errorAni(keyBox);
							// 	LMsg(data.msg,function(){
							// 		// $(".keyInput").show();
							// 		sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
							// 	},this);
							// },this);
						}else{
							errorAni(keyBox);
							LAlert('请输入口令',function(){
								// $(".keyInput").show();
								sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
							},this);
						}
					},this,120);
				}
			}
			function ruleFun(){
				let ruleLayer = new ruleView();
				GameLayer.addChild(ruleLayer);
			}
		/**输入错误动画 */
			function errorAni(obj){
				let shocka = new Lgs.ShockUtils();
				shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
				let num = 8;
				shocka._target = obj;
				shocka.start(num);//num是震动次数
			}
		/**forTest */

		}
	/**移除/退出本界面 */
		private removedFun(){
			if(this.callback){
				this.callback.call(this.thisObj);
			}
		}
	}
}
