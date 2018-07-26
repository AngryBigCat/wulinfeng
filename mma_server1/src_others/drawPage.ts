module Lgs {
	export class drawPage extends egret.DisplayObjectContainer{
		public constructor(data,callback?,thisObj?) {
			super();			
			if(callback){
				this.callback = callback;
				this.thisObj = thisObj;
			}
			this.leftTimes = Number(data.surplus);
			this.drawId = Number(data.level)-1;

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any=false;
		private thisObj:any=false;
		/**剩余抽奖次数 */
		private leftTimes:number;
		/**抽奖等级 0,1,2,3*/
		private drawId:number;
		private prize_name;
		private onAddToStage(){
			this.touchEnabled = true;
			// var zjindex = 3;
		/** */
			/**中奖等次 1,2,3,4*/
			let drawlv = 0;
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let winLayer = new egret.Sprite();
			this.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;
			/**抽奖屏蔽层 */
			let huiseShape = new egret.Shape();
			huiseShape.touchEnabled = true;
			this.addChild(huiseShape);
			huiseShape.graphics.beginFill(0x00000);
			huiseShape.graphics.drawRect(0,0,gw,gh);
			huiseShape.graphics.endFill();
			huiseShape.alpha = 0;
			huiseShape.visible = false;

			let drawbg = createBitmapByName("ruleBg_jpg");
			bgLayer.addChild(drawbg);
			drawbg.x = gw/2 - GetWidth(drawbg)/2;
			// x:356
			// y:350
			/**this.drawId 3等级最高为Top */
			let drawbgdatArr = [
				"drawbg1_png",
				"drawbg2_png",
				"drawbg3_png",
				"drawbg4_png",
			];

			let anxy = [
				[312,303],
				[313.5,305],
				[313,306],
				[313,305]
			];

			let drawbg1 = createBitmapByName(drawbgdatArr[this.drawId]);
			winLayer.addChild(drawbg1);
			drawbg1.anchorOffsetX = anxy[this.drawId][0];
			drawbg1.anchorOffsetY = anxy[this.drawId][1];
			drawbg1.x = gw/2;
			drawbg1.y = gh*0.454;

			let drawZhen = createBitmapByName("drawZhen_png");
			winLayer.addChild(drawZhen);	
			BtnMode(drawZhen);	
			drawZhen.anchorOffsetX = 124;
			drawZhen.anchorOffsetY = 143.1;
			drawZhen.x = gw/2;
			drawZhen.y = drawbg1.y;
		/**抽奖按钮 事件 */
			let drawBtn = new egret.Shape();;
			winLayer.addChild(drawBtn);
			drawBtn.graphics.beginFill(0x000000);
			drawBtn.graphics.drawArc(0,0,GetWidth(drawZhen)*0.8/2,0,Math.PI*2);
			drawBtn.graphics.endFill();
			drawBtn.alpha = 0;
			// drawBtn.touchEnabled = true;
			drawBtn.x = drawZhen.x;
			drawBtn.y = drawZhen.y;

			let canTouch = true;
			drawZhen.addEventListener(egret.TouchEvent.TOUCH_TAP,touchToRun,this);
			removedListener(drawZhen,egret.TouchEvent.TOUCH_TAP,touchToRun,this);
			let speed0 = 3;
			let speed1 = 0;
			let speed2 = 150;
			let run = false;
		/**抽奖事件 */
			let noPrize:boolean = false;
			function touchToRun(){
				if(canTouch){
					// showloading();
					// drawBeforeAjax(function(data){
					// 	hideloading();
					// 	drawFun.call(this);
					// },function(data){
					// 	hideloading();
					// 	LAlert2(data.msg,function(){
					// 		drawFun.call(this);
					// 	},function(){
					// 		LMsg("您取消了抽奖");
					// 	},this);
					// },this);
				}else{
					if(noPrize){
						LAlert("此阶段奖品发放完了,抽奖机会保留");
					}else{
						// LAlert("本轮已经抽过奖啦！");
						LAlert("您已经抽过奖啦！");
					}
				}

				function drawFun(){
					canTouch = false;
					huiseShape.visible = true;
					// drawAjax(function(datas){
					// 	let data = {
					// 		"not_prize":false,
					// 		"not_money":false,
					// 		"prize_index": datas.prize_index,
					// 		"prize_name": datas.prize_name,
					// 	}
					// 	if(data.not_prize||data.not_money){
					// 		noPrize = true;
					// 		LAlert("此阶段奖品发放完了,抽奖机会保留");
					// 		huiseShape.visible = false;
					// 	}else{
					// 		drawlv = Number(data.prize_index);
					// 		this.prize_name = data.prize_name;
					// 		setSngleFun.call(this);
					// 		this.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
					// 		run = true;
					// 		egret.setTimeout(function() {
					// 			run = false;
					// 		},this,4000);
					// 		/**跟新剩余抽奖次数显示 */
					// 		this.leftTimes --;
					// 		leftField.text = "目前有剩余"+ this.leftTimes +"次抽奖机会";
					// 		leftField.x = gw/2 - GetWidth(leftField)/2;
					// 	}
					// },function(data){
					// 	LAlert(data.msg);
					// },this);
				}
			}
		/**角度数组1 */
				let lv1:any = [
					// 4
					90,// 1
					116,// 2
					148,// 3
					180,// 4
					360+90,
				];
				let lv2:any = [
					// 4
					22.5,// 3
					111,// 1
					179.5,// 2
					360-101,// 4
					360+22.5,
				];
				let lv3:any = [
					// 4
					0,// 3
					69,// 2
					360-171,// 1
					360-79,// 4
					360+0,
				];
				let lv4:any = [
					// 1
					52,// 2
					141,// 4
					360-150,// 3
					360-71,// 1
					360+52,
				];
			let lvArr = [lv1,lv2,lv3,lv4];
			let lvvv = lvArr[this.drawId];
			// let QAQ = Math.floor(Math.random()*360)-180;
			let QAQ = 0;
			function setSngleFun(){
				let drawlv1 = (drawlv-1)%5;
				if(this.drawId==0){
					drawlv1 = (drawlv-1)%5;
				}else if(this.drawId==1){
					if(drawlv==1){
						drawlv1 = 1;
					}
					if(drawlv==2){
						drawlv1 = 2;
					}
					if(drawlv==3){
						drawlv1 = 0;
					}
					if(drawlv==4){
						drawlv1 = 3;
					}
				}else if(this.drawId==2){
					if(drawlv==1){
						drawlv1 = 2;
					}
					if(drawlv==2){
						drawlv1 = 1;
					}
					if(drawlv==3){
						drawlv1 = 0;
					}
					if(drawlv==4){
						drawlv1 = 3;
					}
				}else if(this.drawId==3){
					if(drawlv==1){
						drawlv1 = 3;
					}
					if(drawlv==2){
						drawlv1 = 0;
					}
					if(drawlv==3){
						drawlv1 = 2;
					}
					if(drawlv==4){
						drawlv1 = 1;
					}
				}
				/**区间改为 两边度数同时-5 */
				QAQ = (lvvv[drawlv1]+5) + Math.floor(Math.random()*((lvvv[drawlv1+1]-lvvv[drawlv1]-10)));
				// QAQ = 181 182 183 已解决;
				if(QAQ>180){
					QAQ = -(360 - QAQ);
					if(QAQ<=-180){
						QAQ = Math.abs(QAQ)-180;
					}
				}
			}
		/**onframe */
			function onframe(){
				if(run){
					if(speed1<speed2){
						speed1+=0.5;
					}
					drawbg1.rotation += speed1;
				}else{
					if(speed1>speed0){
						speed1-=1;
						drawbg1.rotation += speed1;
					}else{
						speed1 = speed0;
						let rotate = drawbg1.rotation;
						drawbg1.rotation += speed1;
						let rotate2 = rotate+speed1;
						let QAQ2 = QAQ;
						if(QAQ>-180&&QAQ<-176){
							QAQ2 = -176;
						}
						if(rotate<QAQ2&&rotate2>=QAQ2){
							this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
							drawbg1.rotation = QAQ;
							egret.setTimeout(function(){
								this.zhongjiangla();
								// canTouch = true;
								huiseShape.visible = false;
								nextcjBtn.texture = RES.getRes("nextcjBtn_png");
								nextcjBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,nextcjFun2,this);
								nextcjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,nextcjFun,this);
							},this,500);

						}
					}
				}
			}
		/**返回按钮 事件 */
			let drawBackBtn = createBitmapByName("prizeBack_png");
			winLayer.addChild(drawBackBtn);
			BtnMode(drawBackBtn);
			drawBackBtn.x = gw/2-gh*0.19;
			drawBackBtn.y = gh*0.075;

			drawBackBtn.once(egret.TouchEvent.TOUCH_TAP,outPage,this);
			removedListener(drawBackBtn,egret.TouchEvent.TOUCH_TAP,outPage,this);
			function outPage(){
				egret.Tween.get(this).to({alpha:0},320).call(function(){
					LremoveChild(this);
				},this);
			}
		/**历史成绩按钮 事件 */
			let drawHistory = createBitmapByName("drawHistory_png");
			winLayer.addChild(drawHistory);
			BtnMode(drawHistory);
			drawHistory.x = gw/2+gh*0.19;
			drawHistory.y = gh*0.075;

			drawHistory.addEventListener(egret.TouchEvent.TOUCH_TAP,historyFun,this);
			removedListener(drawHistory,egret.TouchEvent.TOUCH_TAP,historyFun,this);
			function historyFun(){
				let historyLayer = new historyPage();
				GameLayer.addChild(historyLayer);
			}
		/**剩余次数显示 ----*/
			let leftField = new egret.TextField();
			// winLayer.addChild(leftField);
			leftField.text = "目前有剩余"+ this.leftTimes +"次抽奖机会";
			textScaleFun(leftField,0.022);
			leftField.x = gw/2 - GetWidth(leftField)/2;
			leftField.y = gh*0.76;
		/**我的奖品按钮 事件 */
			let myPrizeBtn = createBitmapByName("myPrizeBtn_png");
			winLayer.addChild(myPrizeBtn);
			BtnMode(myPrizeBtn);
			myPrizeBtn.x = gw/2;
			myPrizeBtn.y = gh*0.81;

			myPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,myPrizeFun,this);
			removedListener(myPrizeBtn,egret.TouchEvent.TOUCH_TAP,myPrizeFun,this);
			function myPrizeFun(){
				let gamelayer = new LPrizePage();
				this.addChild(gamelayer);
			}
		/**下一轮抽奖按钮 事件 ----*/
			let nextcjBtn = createBitmapByName("nextcjBtn2_png");
			// winLayer.addChild(nextcjBtn);
			BtnMode(nextcjBtn);
			nextcjBtn.x = gw/2 + gh*0.15;
			nextcjBtn.y = gh*0.858;

			nextcjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,nextcjFun2,this);
			removedListener(nextcjBtn,egret.TouchEvent.TOUCH_TAP,nextcjFun2,this);
			function nextcjFun(){
				nextcjBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,nextcjFun,this);
				// continuousAjax.call(this,function(data){
				// 	let gamelayer = new LDrawPage(data);
				// 	this.parent.addChild(gamelayer);
				// 	this.parent.removeChild(this);
				// },function(data){
				// 	nextcjBtn.texture = RES.getRes("nextcjBtn2_png");
				// 	LAlert("您的抽奖机会已经用完啦！");
				// 	nextcjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,nextcjFun,this);
				// });
			}
			function nextcjFun2(){
				LAlert("抽完本轮才能进入下一轮抽奖哦~");		
			}
		/**弹出动画 */
			BtnMode(winLayer,true);
			winLayer.x = gw/2;
			winLayer.scaleX = winLayer.scaleY = 0;
			egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},280,egret.Ease.quadOut);
			bgLayer.alpha = 0;
			egret.Tween.get(bgLayer).to({alpha:1},320,egret.Ease.quadOut);

		}
		/**恭喜中奖弹窗 */
		private zhongjiangla(){
			let zjLayer = new egret.Sprite();
			this.addChild(zjLayer);
			zjLayer.touchEnabled = true;

			let zjShape = new egret.Shape();
			zjLayer.addChild(zjShape);
			zjShape.graphics.beginFill(0x00000);
			zjShape.graphics.drawRect(0,0,gw,gh);
			zjShape.graphics.endFill();
			zjShape.alpha = 0.7;

			let zjbg = createBitmapByName("zhongjiangbg_png");
			zjLayer.addChild(zjbg);
			zjbg.x = gw/2 - GetWidth(zjbg)/2;
			zjbg.y = gh*0.183;

			// let prize_name = new egret.TextField();
			// prize_name.text = this.prize_name;
			// zjLayer.addChild(prize_name);
			// // prize_name.textColor = 0xffffff;
			// // textScaleFun(prize_name,0.22);
			// prize_name.x = gw/2 - GetWidth(prize_name)/2;
			// // prize_name.y = gh*0.1;

			let zjSure = createBitmapByName("zjSure_png");
			zjLayer.addChild(zjSure);
			BtnMode(zjSure);
			zjSure.x = gw/2;
			zjSure.y = gh*0.56;
			
			zjSure.once(egret.TouchEvent.TOUCH_TAP,function(){
				// let prizeLayer = new LPrizePage(function(){
				// 	snowing1.play();
				// 	snowing1.visible = true;
				// 	let homeLayer = new LHomePage();
				// 	GameLayer.addChild(homeLayer);
				// },this);
				let prizeLayer = new LPrizePage();
				GameLayer.addChild(prizeLayer);
				LremoveChild(zjLayer);
				LremoveChild(this);
				if(this.callback){
					this.callback.call(this.thisObj);
				}
			},this);
		/**forTest */

		}
	/**移除/退出本界面 */
		private removedFun(){
			// if(this.callback){
			// 	this.callback.call(this.thisObj);
			// }
		}
	}
}
