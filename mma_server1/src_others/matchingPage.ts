module Lgs {
	export class matchingPage extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?) {
			super();		
			if(callback){
				this.callback = callback;
				this.thisObj = thisObj;
			}
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any=false;
		private thisObj:any=false;
		/**匹配状态 */
		private matchState:number = 0;
		private match_cancel:egret.Bitmap;
		private waitInterval;
		private onAddToStage(){
			bgmViewer.hide();
			bgmViewer.pause();
			// playAudio("matching",0);
			let _THIS = this;
			this.touchEnabled = true;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);

			let gameBg = new egret.Shape();
			bgLayer.addChild(gameBg);
			gameBg.graphics.beginFill(0x6F5FFF);
			gameBg.graphics.drawRect(0,0,gw,gh);
			gameBg.graphics.endFill();
		/**其他元件 */
			/**vs */
			let match_vs = createBitmapByName("match_vs_jpg");
			fgLayer.addChild(match_vs);
			match_vs.x = gw/2 - GetWidth(match_vs)/2;
			match_vs.y = gh*0.256;
			match_vs.alpha = 0;
			/**loadingPoint */
			let loadPointArr = [];
			let pointRadius = gh*0.0055;
			let loadingLayer = new egret.Sprite();
			bgLayer.addChild(loadingLayer);
			loadingLayer.x = gw/2 - pointRadius*3*2;
			loadingLayer.y = gh*0.34;
			for(let i=0;i<5;i++){
				let point1 = new egret.Shape();
				loadingLayer.addChild(point1);
				point1.graphics.beginFill(0xffffff);
				point1.graphics.drawArc(0,0,pointRadius,0,Math.PI*2);
				point1.graphics.endFill();
				point1.x = pointRadius*3*i;
				removedTweens(point1);
				loadPointArr.push(point1);
			}
			loadingLayer.visible = false;
			function loadingStart(){
				for(let i=0;i<loadPointArr.length;i++){
					let point1 = loadPointArr[i];
					removedTweens(point1);
					point1.alpha = 0.7;
					egret.Tween.get(point1,{loop:true}).wait(i*200).to({alpha:0},400).to({alpha:0.7},400).wait((4-i)*200);
				}
			}
			/**匹配提示文案 */
			let maxWaitTime = 20;
			let firstWaitTime = 20;
			let matching_field = new egret.TextField();
			fgLayer.addChild(matching_field);
			textScaleFun(matching_field,0.025);
			matching_field.textColor = 0xffffff;
			matching_field.text = "匹配中，预计等待"+maxWaitTime+"s";
			matching_field.x = gw/2 - GetWidth(matching_field)/2;
			matching_field.y = gh*0.015;
			this.waitInterval = egret.setInterval(function(){				
				if(maxWaitTime>0){
					maxWaitTime--;
					matching_field.text = "匹配中，预计等待"+maxWaitTime+"s";
					matching_field.x = gw/2 - GetWidth(matching_field)/2;
				}else{
					firstWaitTime --;
					if(firstWaitTime<0){
						cancelFun.call(this);
					}
					if(maxWaitTime==0){
						matching_field.text = "正在优先为你匹配 . . .";
						matching_field.x = gw/2 - GetWidth(matching_field)/2;
					}
				}
			},this,1000);
		/**昵称 */
			let mynickName = new egret.TextField();
			fgLayer.addChild(mynickName);
			textScaleFun(mynickName,0.022);
			mynickName.textColor = 0xffffff;
			mynickName.text = "cfms";
			mynickName.x = gw/2 - gh*0.15 - GetWidth(mynickName)/2;
			mynickName.y = gh*0.405;

			let enemynickName = new egret.TextField();
			fgLayer.addChild(enemynickName);
			textScaleFun(enemynickName,0.022);
			enemynickName.textColor = 0xffffff;
			enemynickName.text = "AAA小妖精";
			enemynickName.x = gw/2 + gh*0.15  - GetWidth(enemynickName)/2;
			enemynickName.y = gh*0.405;

			mynickName.visible = false;
			enemynickName.visible = false;
		/**头像 */
			/**我的头像 */
			let myheadLayer = new egret.Sprite();
			fgLayer.addChild(myheadLayer);
			let myheadBg = createBitmapByName("match_headBg1_png");
			myheadLayer.x = gw/2 - GetWidth(myheadBg)/2;
			myheadLayer.y = gh*0.367;
			addBitmapByUrl(myheadBg.x,myheadBg.y,GetHeight(myheadBg),myheadLayer,$headImg,"headImg",function(bitmap){
				myheadLayer.addChild(myheadBg);
				bitmap.mask = myheadBg;
			},this,);
		/**匹配中动画元件 */
			let headBgLayer = new egret.Sprite();
			bgLayer.addChild(headBgLayer);

			let headBg4 = new egret.Shape();
			headBgLayer.addChild(headBg4);
			headBg4.graphics.beginFill(0xffffff);
			headBg4.graphics.drawArc(0,0,720/2,0,Math.PI*2);
			headBg4.graphics.endFill();
			headBg4.x = gw/2;
			headBg4.y = gh*0.367 + GetHeight(myheadBg)/2;

			let headBg3 = new egret.Shape();
			headBgLayer.addChild(headBg3);
			headBg3.graphics.beginFill(0xffffff);
			headBg3.graphics.drawArc(0,0,720/2,0,Math.PI*2);
			headBg3.graphics.endFill();
			headBg3.x = gw/2;
			headBg3.y = gh*0.367 + GetHeight(myheadBg)/2;

			let headBg2 = new egret.Shape();
			headBgLayer.addChild(headBg2);
			headBg2.graphics.beginFill(0xffffff);
			headBg2.graphics.drawArc(0,0,720/2,0,Math.PI*2);
			headBg2.graphics.endFill();
			headBg2.x = gw/2;
			headBg2.y = gh*0.367 + GetHeight(myheadBg)/2;
		/**匹配中动画 */
			headBg2.alpha = 0;
			headBg2.scaleX = headBg2.scaleY = 1;
			headBg3.alpha = 0.3*2/3;
			headBg3.scaleX = headBg3.scaleY = 2/3;
			headBg4.alpha = 0.3*1/3;
			headBg4.scaleX = headBg4.scaleY = 1/3;
			removedTweens(headBg2);
			removedTweens(headBg3);
			removedTweens(headBg4);
			egret.Tween.get(headBg2).to({alpha:0,scaleX:1,scaleY:1},0).call(function(){
				headBgLayer.setChildIndex(headBg2,headBgLayer.numChildren);
				headBg2.alpha = 0.3;
				headBg2.scaleX = headBg2.scaleY = 0;
				egret.Tween.get(headBg2,{loop:true}).to({alpha:0,scaleX:1,scaleY:1},3000).call(function(){
					headBgLayer.setChildIndex(headBg2,headBgLayer.numChildren);
				},this);
			},this);
			egret.Tween.get(headBg3).to({alpha:0,scaleX:1,scaleY:1},1000).call(function(){
				headBgLayer.setChildIndex(headBg3,headBgLayer.numChildren);
				headBg3.alpha = 0.3;
				headBg3.scaleX = headBg3.scaleY = 0;
				egret.Tween.get(headBg3,{loop:true}).to({alpha:0,scaleX:1,scaleY:1},3000).call(function(){
					headBgLayer.setChildIndex(headBg3,headBgLayer.numChildren);
				},this);
			},this);
			egret.Tween.get(headBg4).to({alpha:0,scaleX:1,scaleY:1},2000).call(function(){
				headBgLayer.setChildIndex(headBg4,headBgLayer.numChildren);
				headBg4.alpha = 0.3;
				headBg4.scaleX = headBg4.scaleY = 0;
				egret.Tween.get(headBg4,{loop:true}).to({alpha:0,scaleX:1,scaleY:1},3000).call(function(){
					headBgLayer.setChildIndex(headBg4,headBgLayer.numChildren);
				},this)
			},this);
		/**按钮 */
			this.match_cancel = createBitmapByName("match_cancel_png");
			fgLayer.addChild(this.match_cancel);
			BtnMode(this.match_cancel);
			this.match_cancel.x = gw/2;
			this.match_cancel.y = gh*0.8;
		/**事件监听 */
			this.match_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,cancelFun,this);
			removedListener(this.match_cancel,egret.TouchEvent.TOUCH_TAP,cancelFun,this);
			// this.match_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,match_success,this);
			// removedListener(this.match_cancel,egret.TouchEvent.TOUCH_TAP,match_success,this);
			/**取消匹配 */
			function cancelFun(){
				if(this.matchState==0){
					this.matchState = -1;
					egret.clearInterval(this.waitInterval);

					egret.Tween.get(this).to({alpha:0},320).call(function(){
						LremoveChild(this);
					},this);
				}
			}
			/**匹配成功 */
			function match_success(){
				if(this.matchState==0){
					this.matchState = 1;
					egret.clearInterval(this.waitInterval);

					LremoveChild(this.match_cancel);
					LremoveChild(headBgLayer);
					matching_field.text = "匹配成功，准备开始";
					matching_field.x = gw/2 - GetWidth(matching_field)/2;

					enemynickName.text = "AAA小妖精";
					enemynickName.x = gw/2 + gh*0.15 - GetWidth(enemynickName)/2;
					mynickName.visible = true;
					enemynickName.visible = true;
					loadingLayer.visible = true;
					loadingStart.call(this);

					// myheadLayer.x = gw/2 - gh*0.15 - GetWidth(myheadLayer)/2;
					// myheadLayer.y = gh*0.231;
					/**对手头像 */
					let enemyheadLayer = new egret.Sprite();
					fgLayer.addChild(enemyheadLayer);
					let enemyheadBg = createBitmapByName("match_headBg1_png");
					enemyheadLayer.x = gw/2 - GetWidth(enemyheadBg)/2;
					enemyheadLayer.y = gh*0.4;
					addBitmapByUrl(enemyheadBg.x,enemyheadBg.y,GetHeight(enemyheadBg),enemyheadLayer,$headImg,"headImg",function(bitmap){
						enemyheadLayer.addChild(enemyheadBg);
						bitmap.mask = enemyheadBg;
						enemyheadLayer.alpha = 0;
						/**匹配成功动画 */
						egret.Tween.get(myheadLayer).to({x:gw/2 - gh*0.15 - GetWidth(myheadLayer)/2,y:gh*0.231},300).call(function(){
							egret.Tween.get(match_vs).to({alpha:1},200);
							egret.Tween.get(enemyheadLayer).wait(100).to({alpha:1,x:gw/2 + gh*0.15 - GetWidth(enemyheadLayer)/2,y:gh*0.231},300)
							.wait(400).call(function(){
								if(this.callback){
									this.callback.call(this.thisObj);
								}
								egret.Tween.get(this).to({alpha:0},500);
								// let gameLayer = new GameContainer();
								// GameLayer.addChild(gameLayer);
								// gameLayer.alpha = 0;
								// egret.Tween.get(gameLayer).to({alpha:1},500);
							},this);
						},this);
					},this,);
				}
			}
		/**forTest */
			// cancelFun.call(this);
			// match_success.call(this);
		}
	/**移除监听 */
		private removedFun(){

		}
	}
}
