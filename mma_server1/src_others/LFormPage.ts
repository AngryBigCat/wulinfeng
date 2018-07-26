module Lgs {
	export class LFormPage extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?) {
			super();
			if(callback) this.callback=callback;
			if(thisObj) this.thisObj=thisObj;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any = false;
		private thisObj:any = false;
		private gh = gh;
		private gw = gw;
		private closeBtn:egret.Bitmap;
		private submitBtn:egret.Bitmap;
		/**用于防止多次点击的屏蔽层 */
		private onAddToStage(){
			let _THIS = this;
			this.touchEnabled = true;
			// let layerShape = makeaShape(0xCC3B36,1);
			// this.addChild(layerShape);
			let formBg = createBitmapByName("ruleBg_jpg");
			this.addChild(formBg);
			formBg.x = gw/2 - GetWidth(formBg)/2;
		/**表单 */
			this.formLayer = new egret.Sprite();
			this.addChild(this.formLayer);

			// let formbg = createBitmapByName("formbg_png");
			// this.formLayer.addChild(formbg);
			// formbg.x = gw/2 - GetWidth(formbg)/2;
			// formbg.y = gh*0.154;
			let formbg = new egret.Sprite();
			this.formLayer.addChild(formbg);
			formbg.width = gw;
			formbg.height = gh;

			this.input1 = new LInput(0.02);
			this.formLayer.addChild(this.input1);
			this.input1.setDefault("请填写姓名",0x222222,0x444444);
			this.input1.x = gw/2 - GetWidth(this.input1)/2 + 3;
			this.input1.y = gh*0.39;

			this.input2 = new LInput(0.02);
			this.formLayer.addChild(this.input2);
			this.input2.setDefault("手机号码",0x222222,0x444444);
			this.input2.x = gw/2 - GetWidth(this.input1)/2 + 3;
			this.input2.y = gh*0.545;
			// this.input2.input.type = egret.TextFieldInputType.TEXT;
			this.input2.input.inputType = "tel";
			this.input2.input.maxChars = 11;

			this.input3 = new LInput(0.02);
			this.formLayer.addChild(this.input3);
			this.input3.setDefault("请输入工会卡号",0x222222,0x444444);
			this.input3.x = gw/2 - GetWidth(this.input1)/2 + 3;
			this.input3.y = gh*0.717;
		/**输入框提交按钮 2017-08-25*/
			this.submitBtn = createBitmapByName("submitBtn_png");
			this.formLayer.addChild(this.submitBtn);
			BtnMode(this.submitBtn);
			this.submitBtn.x = formbg.x + GetWidth(formbg)/2 + 4*initScale;
			this.submitBtn.y = gh*0.88;
		/**表单无关部分 */
			let leftP = createBitmapByName("leftP_png");
			this.addChild(leftP);
			leftP.x = pw_sx;
			leftP.y = gh*0.05;
			let rightP = createBitmapByName("rightP_png");
			this.addChild(rightP);
			rightP.x = gw - pw_sx - GetWidth(rightP);
			rightP.y = gh*0.05;
			leftP.scaleX = leftP.scaleY = initScale*1.1;
			rightP.scaleX = rightP.scaleY = initScale*1.1;


			let leftPx = leftP.x;
			let rightPx = rightP.x;
			leftP.x = leftPx - GetWidth(leftP);
			rightP.x = rightPx + GetWidth(rightP);
			egret.Tween.get(leftP).wait(400).to({x:leftPx},600,egret.Ease.quadOut);
			egret.Tween.get(rightP).wait(600).to({x:rightPx},600,egret.Ease.quadOut);
		/**end */
		/**选择框赋值 */
			// $(".select1").on("change",function(){
			// 	playAudio("point");
			// 	_THIS.input2.setVal($(this).val());
			// });
			// $(".select2").on("change",function(){
			// 	playAudio("point");
			// 	_THIS.input3.setVal($(this).val());			
			// });
		/**动画 */
			this.formLayer.y = gh;
			egret.Tween.get(this.formLayer).to({y:0},500,egret.Ease.quadOut);

		/**事件 */
			this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
		}
		private formLayer:egret.Sprite;
		private input1:LInput;
		private input2:LInput;
		private input3:LInput;
	/**当使用html内容时在LAlert结束时重新显示html内容 */
		private htmlAppear(){
			// $('.inviteBg').show();
		}
		private htmlHide(noerror?:boolean){
			if(!noerror){
				this.erroAni();
			}
			// $('.inviteBg').hide();
		}
	/**提交表单 */
		private submitFun(evt:egret.TouchEvent){
			// playAudio("touchBtn");
			let _THIS = this;
			this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
			egret.setTimeout(function() {
				if(this.input1.inputed&&this.input2.inputed&&this.input3.inputed){
					if(!checkPhone(parseInt(this.input2.input.text))){
						this.htmlHide();
						LAlert("请输入有效的电话号码!",this.htmlAppear,this);
						return false;
					}

					let userInfo = {
						"name":this.input1.input.text,
						"mobile":this.input2.input.text,
						"cardId":this.input3.input.text
					}
					_THIS.htmlHide(true);
					showloading();					
					setInfoAjax(userInfo,function(data){
						hideloading();
						LAlert("提交成功!",function(){
							// $isMember = true;
							egret.Tween.get(this.formLayer).to({y:-gh},380,egret.Ease.backIn).call(function(){
								GameLayer.removeChild(this);
								let gamelayer = new GameContainer(true);
								GameLayer.addChild(gamelayer);
								if(this.thisObj){
									this.thisObj.visible = true;
								}
							},this);
						},_THIS);
					},function(data){
						LAlert(data.msg);
						this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,_THIS);
					},this);
				}else{
					this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
					if(!this.input1.inputed){
						this.htmlHide();
						LAlert("请填写您的姓名!",this.htmlAppear,this);
						return false;
					}
					if(!this.input2.inputed){
						this.htmlHide();
						LAlert("请输入您的手机号!",this.htmlAppear,this);
						return false;
					}
					if(!this.input3.inputed){
						this.htmlHide();
						LAlert("请输入您的工会卡号!",this.htmlAppear,this);
						return false;
					}
				}
			},this, 120);

		}
	/**输入错误动画 */
		private erroAni(){
			let shocka = new Lgs.ShockUtils();
			shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
			let num = 8;
			shocka._target = this.formLayer;
			shocka.start(num);//num是震动次数
		}
	/**退出表单页 */
		private exitForm(){
			this.formLayer.y = gh;
			GameLayer.removeChild(this);
			if(this.thisObj){
				this.thisObj.visible = true;
			}
		}

		private removedFun(){
			this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.submitFun,this);
			// this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.exitForm,this);

		}

	}
}

		/**去填写信息 ----*/
			// function formFun(){
			// 	let tcLayer = new egret.Sprite();
			// 	this.addChild(tcLayer);

			// 	let tcShape = new egret.Shape();
			// 	tcLayer.addChild(tcShape);
			// 	tcShape.graphics.beginFill(0x000000);
			// 	tcShape.graphics.drawRect(0,0,gw,gh);
			// 	tcShape.graphics.endFill();
			// 	tcShape.alpha = 0.7;

			// 	let winLayer = new egret.Sprite();
			// 	tcLayer.addChild(winLayer);
			// 	winLayer.width = gw;
			// 	winLayer.height = gh;

			// 	let formbg = createBitmapByName("formbg_png");
			// 	winLayer.addChild(formbg);
			// 	formbg.x = gw/2 - GetWidth(formbg)/2;
			// 	formbg.y = gh*0.1;
			// /**输入框 */
			// 		let name1 = new LInput();
			// 		winLayer.addChild(name1);
			// 		let inputBg1 = new egret.Shape();
			// 		inputBg1.graphics.beginFill(0xffffff);
			// 		inputBg1.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
			// 		inputBg1.graphics.endFill();
			// 		name1.setDefault(" 请输入姓名...");
			// 		name1.setBg(inputBg1,false,{x:gh*0.01,y:0,width:GetWidth(inputBg1)-gh*0.02,height:GetHeight(inputBg1)},0.02);
			// 		name1.x = gw/2-gh*0.06;
			// 		name1.y = gh*0.437 + gh*0.089*0;
			// 		name1.input.maxChars = 10;

			// 		let phone1 = new LInput();
			// 		winLayer.addChild(phone1);
			// 		let inputBg2 = new egret.Shape();
			// 		inputBg2.graphics.beginFill(0xffffff);
			// 		inputBg2.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
			// 		inputBg2.graphics.endFill();
			// 		phone1.setDefault(" 请输入有效号码...");
			// 		phone1.setBg(inputBg2,false,{x:gh*0.01,y:0,width:GetWidth(inputBg2)-gh*0.02,height:GetHeight(inputBg2)},0.02);
			// 		phone1.x = gw/2-gh*0.06;
			// 		phone1.y = gh*0.437 + gh*0.089*1;
			// 		phone1.input.maxChars = 11;
			// 		phone1.input.inputType = "tel";

			// 		let city1 = new LInput();
			// 		winLayer.addChild(city1);
			// 		let inputBg3 = new egret.Shape();
			// 		inputBg3.graphics.beginFill(0xffffff);
			// 		inputBg3.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
			// 		inputBg3.graphics.endFill();
			// 		city1.setDefault(" 请输入您所在的城市...");
			// 		city1.setBg(inputBg3,false,{x:gh*0.01,y:0,width:GetWidth(inputBg3)-gh*0.02,height:GetHeight(inputBg3)},0.02);
			// 		city1.x = gw/2-gh*0.06;
			// 		city1.y = gh*0.437 + gh*0.089*2;
			// /**按钮 */
			// 	let submitBtn = createBitmapByName("submitBtn_png");
			// 	winLayer.addChild(submitBtn);
			// 	BtnMode(submitBtn);
			// 	submitBtn.x = gw/2;
			// 	submitBtn.y = gh*0.807;
			// /**动画 */
			// 	winEnterAni(tcShape,winLayer,"scale01");
			// /**事件 */
			// 	submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
			// 	removedListener(submitBtn,egret.TouchEvent.TOUCH_TAP,submitFun,this);
			// 	function submitFun(){
			// 		egret.setTimeout(function() {
			// 			if(city1.inputed&&phone1.inputed&&name1.inputed){
			// 				if(!checkPhone(phone1.input.text.replace(/\s+/g,""))){
			// 					LAlert("请输入有效号码");
			// 					errorAni(phone1);
			// 				}else{
			// 					let userInfo = {
			// 						name:name1.input.text.replace(/\s+/g,""),
			// 						mobile:phone1.input.text.replace(/\s+/g,""),
			// 						city:city1.input.text
			// 					}
			// 					// Ajax
			// 					// showloading();
			// 					// setInfoAjax(userInfo,function(data){
			// 						// hideloading();
			// 						// playAudio("touchBtn",0);
			// 						LMsg("信息提交成功");
			// 						// this.replayFun.call(this);
			// 						winCloseAni(tcShape,winLayer,"scale01",function(){

			// 						},this);
			// 					// },function(data){
			// 						// hideloading();
			// 						// LAlert(data.msg);
			// 					// },this);
			// 				}
			// 			}else{
			// 				if(!name1.inputed){
			// 					LAlert("请输入您的姓名");
			// 					errorAni(name1);
			// 				}else if(!phone1.inputed){
			// 					LAlert("请输入您的手机号码");
			// 					errorAni(phone1);
			// 				}else if(!city1.inputed){
			// 					LAlert("请输入您的所在城市");
			// 					errorAni(city1);
			// 				}
			// 			}
			// 		},this,120);
			// 	}
			// /**输入错误动画 */
			// 	function errorAni(obj){
			// 		if(!obj["shakeX"]){
			// 			obj["shakeX"] = obj.x;
			// 			obj["shakeY"] = obj.y;
			// 		}else{
			// 			obj.x = obj["shakeX"];
			// 			obj.y = obj["shakeY"];
			// 		}
			// 		let shocka = new Lgs.ShockUtils();
			// 		shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
			// 		let num = 8;
			// 		shocka._target = obj;
			// 		shocka.start(num);//num是震动次数
			// 	}
			// }
