module Lgs {
	export class LQuestion extends egret.Sprite{
		public constructor(num:number) {
			super();
			if(num<19){
				this.count = 60;
			}else{
				this.count = 60 - 30*((num-19)/6);
			}
			this.level = num;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private questionList = RES.getRes("banks_json");
		private qList = [];
		private correct:any;
		private Parent;
		/**是否单选题 */
		private isDanxuan = false;
		private level = 0;
		/**本关倒计时 */
		private count = 60;
		/**本关用时 */
		private useTime = 0;
		/**本关用时毫秒 */
		private useTiming = 0;
		private valid:any = "noChoice";
		private onAddToStage(){
			this.qList = this.questionList.list;
			this.correct = this.qList[this.level].correct;
			if(this.qList[this.level].IsAlone=="1"){
				this.isDanxuan = true;
			}else{
				this.isDanxuan = false;				
			}

			this.Parent = this.parent;
			let _THIS = this;
			let bgLayer = new egret.Sprite();
			GameLayer.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);

			let bgShape = new egret.Shape();
			bgLayer.addChild(bgShape);
			bgShape.graphics.beginFill(0x000000);
			bgShape.graphics.drawRect(0,0,gw,gh);
			bgShape.graphics.endFill();
			bgShape.alpha = 0.7;

			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
		/**背景 元件 */
			let quBg = createBitmapByName("quBg_png");
			winLayer.addChild(quBg);
			quBg.x = gw/2 - GetWidth(quBg)/2 - gh*0.016;
			quBg.y = gh*0.072;

			let mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("panda_json"),RES.getRes("panda_png"));
			let panda = new egret.MovieClip(mcDataFactory.generateMovieClipData("dati"));
			winLayer.addChild(panda);
			panda.scaleX = panda.scaleY = initScale;
			panda.anchorOffsetX = panda.width/2;
			panda.anchorOffsetY = panda.height/2;
			panda.x = gw/2 - gh*0.2;
			panda.y = gh*0.87; 
			panda.gotoAndPlay("run",-1);
		/**倒计时、关卡数 */
			let timeLeftField = new egret.TextField();
			winLayer.addChild(timeLeftField);
			textScaleFun(timeLeftField,0.0215);
			timeLeftField.fontFamily = "YaHei";
			timeLeftField.textColor = 0x8F2D00;
			timeLeftField.text = hmsFun(this.count);
			timeLeftField.bold = true;
			timeLeftField.x = gw/2 - GetWidth(timeLeftField)/2;
			timeLeftField.y = gh*0.134;

			let levelField = new egret.BitmapText();
			winLayer.addChild(levelField);
			levelField.font = RES.getRes("levelNum_fnt");
			levelField.text = (this.level+1)+"";
			levelField.x = gw/2 - GetWidth(levelField)/2;
			levelField.y = gh*0.185;
		/**onframe */
			this.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
			removedListener(this,egret.Event.ENTER_FRAME,onframe,this);
			let qst = egret.getTimer();
			function onframe(){
				// console.log(11111);
				let qnt = egret.getTimer();
				this.useTiming = qnt - qst;
				this.useTime = parseInt((qnt - qst)/1000+"");
				let countTime = this.count-this.useTime;				
				if(countTime<=0){
					countTime = 0;
					this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
					for(let i=0;i<aShapeArr.length;i++){
						aShapeArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,selectView,this);
					}
					nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,nextFun,this);
					playAudio("error");
					LAlert("时间到!",function(){
						winCloseAni(bgShape,winLayer,"scale01",function(){
							LremoveChild(this);
							this.inCorrectFun();
						},this,500);
					},this);
				}
				timeLeftField.text = hmsFun(countTime);
			}
		/**题目显示 */
			let questionLayer = new egret.Sprite();
			winLayer.addChild(questionLayer);
			let qShape = new egret.Shape();
			questionLayer.addChild(qShape);
			let qField = new egret.TextField();
			questionLayer.addChild(qField);
			textScaleFun(qField,0.023);
			qField.textColor = 0x581703;
			qField.bold = true;
			qField.fontFamily = "YaHei";
			qField.width = gh*0.34;
			qField.lineSpacing = 7;
			if(this.isDanxuan){
				qField.text = this.qList[this.level].question;
			}else{
				qField.textFlow = <Array<egret.ITextElement>>[
					{text: this.qList[this.level].question}
					, {text: "(多选题)", style: {"textColor": 0x4C8CF5, }}
				];
			}
			qField.x = gh*0.38/2 - GetWidth(qField)/2;
			qField.y = gh*0.02;
			qShape.graphics.beginFill(0xFFF8DC);
			qShape.graphics.drawRoundRect(0,0,gh*0.38,GetHeight(qField)+gh*0.04,gh*0.04);
			qShape.graphics.endFill();
			questionLayer.x = gw/2 - gh*0.19;
			questionLayer.y = gh*0.275;
		/**答案选项 */
			let y1 = questionLayer.y + questionLayer.height + gh*0.03;
			let answerLayerArr = [];
			let aFieldArr = [];
			let aShapeArr = [];
			let sShapeArr = [];
			let atextArr = ["A","B","C","D"];
			for(let i=0;i<4;i++){
				let answerLayer = new egret.Sprite();
				winLayer.addChild(answerLayer);
				answerLayerArr.push(answerLayer);
				let sShape = new egret.Shape();
				answerLayer.addChild(sShape);
				let aShape = new egret.Shape();
				answerLayer.addChild(aShape);

				let afield1 = new egret.TextField();
				answerLayer.addChild(afield1);
				textScaleFun(afield1,0.019);
				afield1.textColor = 0x581703;
				afield1.bold = true;
				afield1.fontFamily = "YaHei";
				afield1.lineSpacing = 5;
				afield1.text = atextArr[i]+".";
				afield1.x = gh*0.015;
				afield1.y = gh*0.015;

				let afield = new egret.TextField();
				answerLayer.addChild(afield);
				textScaleFun(afield,0.019);
				afield.textColor = 0x581703;
				afield.bold = true;
				afield.fontFamily = "YaHei";
				afield.width = gh*0.34;
				afield.lineSpacing = 5;
				afield.text = this.qList[this.level][atextArr[i]];
				afield.x = afield1.x + GetWidth(afield1);
				afield.y = afield1.y;

				aShape.graphics.beginFill(0xFFF8DC);
				aShape.graphics.drawRoundRect(0,0,gh*0.38,GetHeight(afield)+gh*0.03,gh*0.03);
				aShape.graphics.endFill();
				answerLayer.x = gw/2 - gh*0.38/2;
				answerLayer.y = y1;
				y1 = y1 + GetHeight(answerLayer) + gh*0.012;

				aShape['sid'] = i;
				aShape.touchEnabled = true;				
				aShape.addEventListener(egret.TouchEvent.TOUCH_TAP,selectView,this);
				removedListener(aShape,egret.TouchEvent.TOUCH_TAP,selectView,this);

				sShape['inSlect'] = false;

				aFieldArr.push(afield);
				aShapeArr.push(aShape);
				sShapeArr.push(sShape);
			}
			/**选中数组 */
			let inSelectArr = [0,0,0,0];
			/**选择显示 */
			function selectView(evt:egret.TouchEvent){
				let selector = evt.currentTarget;
				let sid = selector.sid
				let afield = aFieldArr[sid];
				let sShape = sShapeArr[sid];				
				this.valid = sid;
				if(this.isDanxuan){
					for(let i=0;i<sShapeArr.length;i++){
						if(i!==sid){
							sShapeArr[i].graphics.clear();
						}else{
							sShapeArr[i].graphics.clear();
							sShapeArr[i].graphics.beginFill(0xae730c);
							sShapeArr[i].graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
							sShapeArr[i].graphics.endFill();
						}
					}
				}else{
					if(sShape['inSlect']){
						let addSelect = false;
						for(let i=0;i<inSelectArr.length;i++){
							if(inSelectArr[i]==sid){
								addSelect = false;
							}
						}
						sShape.graphics.clear();
						sShape['inSlect'] = false;
						inSelectArr[sid] = 0;
					}else{
						sShape.graphics.clear();
						sShape.graphics.beginFill(0xae730c);
						sShape.graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
						sShape.graphics.endFill();
						sShape['inSlect'] = true;
						inSelectArr[sid] = 1;
					}
					// console.log(inSelectArr);
				}
			}
		/**按钮 */
			let nextBtn = createBitmapByName("nextBtn_png");
			winLayer.addChild(nextBtn);
			BtnMode(nextBtn);
			nextBtn.x = gw/2;
			nextBtn.y = gh*0.823;
		/**动画 */
			winEnterAni(bgShape,winLayer,"scale01");
		/**事件 */
			nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,nextFun,this);
			removedListener(nextBtn,egret.TouchEvent.TOUCH_TAP,nextFun,this);
			/**判断 */
			function nextFun(){
				let valid = this.valid;
				let afield = aFieldArr[valid];
				let sShape = sShapeArr[valid];
				if(this.isDanxuan){
					if(valid!="noChoice"){
						this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
						for(let i=0;i<aShapeArr.length;i++){
							aShapeArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,selectView,this);
						}
						nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,nextFun,this);
						/**是否正确 */
						let isZhengque = false;
						if(atextArr[valid]==this.correct){
							isZhengque = true;
						}
						if(isZhengque){
							sShape.graphics.clear();
							sShape.graphics.beginFill(0x04881d);
							sShape.graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
							sShape.graphics.endFill();
							playAudio("correct");
							winCloseAni(bgShape,winLayer,"scale01",function(){
								LremoveChild(this);
								this.correctFun();
							},this,500);
						}else{
							sShape.graphics.clear();
							sShape.graphics.beginFill(0xe60000);
							sShape.graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
							sShape.graphics.endFill();
							let shocka = new Lgs.ShockUtils();
							shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
							let num = 10;
							shocka._target = answerLayerArr[valid];
							shocka.start(num);//num是震动次数

							playAudio("error");
							winCloseAni(bgShape,winLayer,"scale01",function(){
								LremoveChild(this);
								this.inCorrectFun();

							},this,500);
						}			
					}else{
						LMsg("请选择一个答案！");
					}
				}else{
					let haveSelect = false;
					for(let i=0;i<inSelectArr.length;i++){
						if(inSelectArr[i]==1){
							haveSelect = true;
						}
					}
					if(haveSelect){
						this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
						for(let i=0;i<aShapeArr.length;i++){
							aShapeArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,selectView,this);
						}
						nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,nextFun,this);
						/**是否正确 */
						let isZhengque = false;
						let inSelectStr = "";
						for(let i=0;i<inSelectArr.length;i++){
							if(inSelectArr[i]==1){
								inSelectStr+=atextArr[i];
							}
						}
						if(inSelectStr==this.correct){
							isZhengque = true;
						}
						if(isZhengque){
							for(let i=0;i<inSelectArr.length;i++){
								if(inSelectArr[i]!=0){
									sShapeArr[i].graphics.clear();
									sShapeArr[i].graphics.beginFill(0x04881d);
									sShapeArr[i].graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
									sShapeArr[i].graphics.endFill();
								}
							}
							playAudio("correct");
							winCloseAni(bgShape,winLayer,"scale01",function(){
								LremoveChild(this);
								this.correctFun();
							},this,500);
						}else{
							for(let i=0;i<inSelectArr.length;i++){
								if(inSelectArr[i]!=0){
									sShapeArr[i].graphics.clear();
									sShapeArr[i].graphics.beginFill(0xe60000);
									sShapeArr[i].graphics.drawRoundRect(-gh*0.0025,-gh*0.0025,gh*0.385,GetHeight(afield)+gh*0.035,gh*0.035);
									sShapeArr[i].graphics.endFill();

									let shocka = new Lgs.ShockUtils();
									shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
									let num = 10;
									shocka._target = answerLayerArr[i];
									shocka.start(num);//num是震动次数
								}
							}
							playAudio("error");
							winCloseAni(bgShape,winLayer,"scale01",function(){
								LremoveChild(this);
								this.inCorrectFun();
							},this,500);
						}
					}else{
						LMsg("本题为多选题，请至少选择一个答案！");
					}
				}
			}
			/**时间到 */
			function timeOutFun(){ }
		}
		/**答对后 */
		private correctFun(){
			let data = {
				"useTime":this.useTime,
				"useTiming":this.useTiming
			}
			this.Parent.dispatchEventWith("correct",false,data);
		}
		/**答错后 */
		private inCorrectFun(){
			this.Parent.dispatchEventWith("error");
		}
		/**再来一次 */
		private replayFun(){
			LremoveChild(this.Parent);
			let homeLayer = new LHomePage();
			GameLayer.addChild(homeLayer);

		}

		private removedFun(){


		}

	}
}