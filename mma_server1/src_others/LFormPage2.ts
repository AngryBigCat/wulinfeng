module Lgs {
	export class LFormPage2 extends egret.DisplayObjectContainer{
		public constructor(data:any,callback?,thisObj?) {
			super();
			if(callback) this.callback=callback;
			if(thisObj) this.thisObj=thisObj
			this.data = data;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any = false;
		private thisObj:any = false;
		private data:any;

		private gh = gh;
		private gw = gw;

		private winLayer:egret.Sprite;
		private closeBtn:egret.Bitmap;
		private submitBtn:egret.Bitmap;
		/**用于防止多次点击的屏蔽层 */
		private onAddToStage(){
			let _THIS = this;
			this.touchEnabled = true;
		/**层级、背景*/
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let formBg = createBitmapByName("homeBg_jpg","bg");
			this.addChild(formBg);
			this.winLayer = new egret.Sprite();
			this.addChild(this.winLayer);
			this.winLayer.width = gw;
			this.winLayer.height = gh;

			let setInfoBg = createBitmapByName("setInfoBg_png");
			this.winLayer.addChild(setInfoBg);
			setInfoBg.x = gw/2 - GetWidth(setInfoBg)/2;
			setInfoBg.y = gh*0.012;
		/**表单 */
			let formbg = new egret.Sprite();
			this.winLayer.addChild(formbg);
			formbg.width = gw;
			formbg.height = gh;

			this.input1 = new LInput(0.02);
			this.winLayer.addChild(this.input1);
			this.input1.setDefault("请输入您的姓名...",0x444444,0x999999);
			this.input1.x = gw/2 - gh*0.1;
			this.input1.y = gh*0.45;
			// this.input1.input.type = egret.TextFieldInputType.TEXT;
			this.input1.setBg(false,false,{x:0,y:0,width:gh*0.273,height:gh*0.03});

			this.input2 = new LInput(0.02);
			this.winLayer.addChild(this.input2);
			this.input2.setDefault("请输入有效号码...",0x444444,0x999999);
			this.input2.x = gw/2 - gh*0.1;
			this.input2.y = gh*0.527;
			// this.input2.input.type = egret.TextFieldInputType.TEXT;
			this.input2.input.inputType = "tel";
			this.input2.input.maxChars = 11;
			this.input2.setBg(false,false,{x:0,y:0,width:gh*0.273,height:gh*0.03});

			this.input3 = new LInput(0.02);
			this.winLayer.addChild(this.input3);
			this.input3.setDefault("请输入您的正确地址，例：省，市，街道，社区...",0x444444,0x999999);
			this.input3.x = gw/2 - gh*0.1;
			this.input3.y = gh*0.606;
			// this.input3.input.type = egret.TextFieldInputType.TEXT;
			this.input3.input.multiline = true;
			this.input3.input.lineSpacing = gh*0.01;
			this.input3.setBg(false,false,{x:0,y:0,width:gh*0.273,height:gh*0.095});
		/**输入框提交按钮 2018-02-22*/
			this.submitBtn = createBitmapByName("getBtn_png");
			this.winLayer.addChild(this.submitBtn);
			BtnMode(this.submitBtn);
			this.submitBtn.x = gw/2;
			this.submitBtn.y = gh*0.855;
		/**表单无关部分 */
			// let logo = createBitmapByName("gameLogo_png");
			// bgLayer.addChild(logo);
			// logo.x = gw/2 - gh*0.28;
			// logo.y = gh*0.016;

			// let scoreBg = createBitmapByName("resultScoreBg_png");
			// bgLayer.addChild(scoreBg);
			// scoreBg.x = gw/2 - GetWidth(scoreBg)/2;
			// scoreBg.y = gh*0.063;
				
			// let scoreField = new egret.TextField();
			// bgLayer.addChild(scoreField);
			// textScaleFun(scoreField,0.042);
			// scoreField.textColor = 0xAC710B;
			// scoreField.text = this.data.score+"";
			// scoreField.x = gw/2 - GetWidth(scoreField)/2;
			// scoreField.y = gh*0.075;

			// let formText1 = createBitmapByName("formText1_png");
			// bgLayer.addChild(formText1);
			// formText1.x = gw/2 - GetWidth(formText1)/2;
			// formText1.y = gh*0.173;

			// let redBag = createBitmapByName("redBag_png");
			// bgLayer.addChild(redBag);
			// redBag.x = gw/2 - GetWidth(redBag)/2;
			// redBag.y = gh*0.265;
		// end
		/**按钮 */

		/**动画 */
			BtnMode(this.winLayer,true);
			this.winLayer.scaleX = this.winLayer.scaleY = 0;
			egret.Tween.get(this.winLayer).wait(50).to({scaleX:1,scaleY:1},320,egret.Ease.backOut);
		/**事件 */
			this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
			removedListener(this.submitBtn,egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
		/**forTest */
			// this.erroMsg();
		}
		private input1:LInput;
		private input2:LInput;
		private input3:LInput;
	/**提交表单 */
		private submitFun(evt:egret.TouchEvent){
			// playAudio("touchBtn");
			let _THIS = this;
			this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
			egret.setTimeout(function() {
				let tipmsg = "";
				let checkOk = true;
				if(!this.input3.inputed){
					checkOk = false;
					tipmsg = "请输入您的收货地址！";
				}
				if(!this.input2.inputed){
					checkOk = false;
					tipmsg = "请输入您的手机号！";
				}
				if(!this.input1.inputed){
					checkOk = false;
					tipmsg = "请输入您的姓名！";
				}

				if(this.input1.inputed&&this.input3.inputed&&this.input2.inputed){
					if(!checkPhone(parseInt(this.input2.input.text))){
						checkOk = false;
						tipmsg = "请输入有效的电话号码！";
					}else{
						let userInfo = {
							"name":this.input1.input.text,
							"mobile":this.input2.input.text,
							"address":this.input3.input.text
						}
						// Ajax
						showloading();
						setInfoAjax(userInfo,function(data){
							hideloading();
							egret.Tween.get(this.winLayer).to({scaleX:0,scaleY:0,alpha:0},320,egret.Ease.quadOut);
							egret.Tween.get(this.winLayer).wait(150).call(function(){
								LremoveChild(this);
								LMsg("您已经成功提交收货信息!");
								this.callback.call(this.thisObj);
							},this);
						},function(data){
							hideloading();
							checkOk = false;
							tipmsg = data.msg;
							// LAlert("该手机号已绑定其他微信账号\n请重新输入");
						},this);
					}
				}

				if(!checkOk){
					LAlert(tipmsg);
					checkOk = false;
					this.erroAni();
					this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
				};
			},this, 120);		
		}
	/**输入错误弹窗 ----*/
		private erroMsg(){
			let erroMsgLayer = new egret.Sprite();
			this.addChild(erroMsgLayer);
			erroMsgLayer.touchEnabled = true;

			let formBg2 = createBitmapByName("formBg2_jpg");
			erroMsgLayer.addChild(formBg2);
			formBg2.x = gw/2 - GetWidth(formBg2)/2;

			let win2Layer = new egret.Sprite();
			erroMsgLayer.addChild(win2Layer);
			win2Layer.width = gw;
			win2Layer.height = gh;

			let msgBox = createBitmapByName("msgBox_png");
			win2Layer.addChild(msgBox);
			msgBox.x = gw/2 - GetWidth(msgBox)/2;
			msgBox.y = gh*0.175;

			let msgText1 = createBitmapByName("msgText1_png");
			win2Layer.addChild(msgText1);
			msgText1.x = gw/2 - GetWidth(msgText1)/2;
			msgText1.y = gh*0.302;

			let Ithink = createBitmapByName("Ithink_png");
			win2Layer.addChild(Ithink);
			BtnMode(Ithink);
			Ithink.x = gw/2;
			Ithink.y = gh*0.518;

			winEnterAni(formBg2,win2Layer,"scale01");
			Ithink.addEventListener(egret.TouchEvent.TOUCH_TAP,closeMsg,this);
			removedListener(Ithink,egret.TouchEvent.TOUCH_TAP,closeMsg,this);
			function closeMsg(){
				winCloseAni(win2Layer,"scale01",function(){
					LremoveChild(erroMsgLayer);
				},this);
			}
		}
	/**输入错误动画 */
		private erroAni(){
			let shocka = new ShockUtils();
			shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
			let num = 8;
			shocka._target = this.winLayer;
			shocka.start(num);//num是震动次数
		}
		private erroAni2(obj){
			let shocka = new ShockUtils();
			shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
			let num = 8;
			shocka._target = obj;
			shocka.start(num);//num是震动次数
		}
	//
		private removedFun(){

		}

	}
}