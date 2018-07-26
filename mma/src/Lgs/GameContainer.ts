
let ajax1 = true;
module Lgs {
	export class GameContainer extends egret.DisplayObjectContainer{
		public constructor(data,callback?,thisObj?) {
			super();
			if(callback){
				this.callback = callback;
				this.thisObj = thisObj;
			}
			this.startData = data;
			this.firstgame = data.firstgame;			
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		/**回调函数 */
		private callback;
		private thisObj;
		private startData;
        /**我的成绩*/
        private myScore:number = 0;

        private _lastTime:number;
		private g_timing;
		private g_timing2;
		private endTime;
		private startTime;
		private startTime2;
		/**重力 */
		private g = 0.9;
		private downSpeed = 0;
		private isOver1 = false;
		private isOver2 = false;
		private isOver3 = false;
		private isOver4 = false;
		private gameInfo:any;
		private onAddToStage(){
			// bgmViewer.setnewPosition(gw - pw_sx - gh*0.02,gh-GetHeight(bgmViewer) - gh*0.02,90);
			// bgmViewer.setnewPosition(pw_sx + gh*0.02,GetHeight(bgmViewer) + gh*0.02,-90);
			// bgmViewer.hide();
			this.touchEnabled = true;
			let _THIS = this;
		/**层级 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);
		/**forTest */
			this.descView1();
			// this.descView2();
			// this.descView3();
			// this.resultFun(true);
		}
		private firstgame;
		/**游戏介绍 */
		private descView1(callback?,thisObj?,data?){
			let descLayer = new egret.Sprite();
			GameLayer.addChild(descLayer);
			descLayer.touchEnabled = true;

			let descBg = createBitmapByName("g1_hbg_jpg","bg");
			descLayer.addChild(descBg);

			let descBg2 = createBitmapByName("g1_hbg2_png");
			descLayer.addChild(descBg2);
			descBg2.x = gw/2 - GetWidth(descBg2)/2;
			descBg2.y = gh*0.492;

			let p1 = createBitmapByName("g1_p1_png");
			descLayer.addChild(p1);
			p1.x = gw/2 - GetWidth(p1)/2;
			p1.y = -gh*0.006;

			let p2 = createBitmapByName("g1_p2_png");
			descLayer.addChild(p2);
			p2.x = gw/2 - gh*0.255;
			p2.y = gh*0.187;

			let p3 = createBitmapByName("g1_p3_png");
			descLayer.addChild(p3);
			p3.x = gw/2 - gh*0.145;
			p3.y = gh*0.185;

			let p4 = createBitmapByName("g1_p4_png");
			descLayer.addChild(p4);
			p4.x = gw/2 - GetWidth(p4)/2;
			p4.y = gh*0.733;

			let continue1 = createBitmapByName("g1_p5_png");
			descLayer.addChild(continue1);
			continue1.x = gw/2 - GetWidth(continue1)/2;
			continue1.y = gh*0.9;
			continue1.alpha = 0;
		/**动画 */
			p1.alpha = 0;
			egret.Tween.get(p1).to({alpha:1},500);
			let p2x = p2.x;
			p2.alpha = 0;
			p2.x = gw/2 + gh*0.255;
			egret.Tween.get(p2).to({x:p2x},500,egret.Ease.backOut);
			egret.Tween.get(p2).to({alpha:1},500);
			BtnMode(p3,true);
			let p3x = p3.x;
			let p3y = p3.y;
			p3.x = p3x + gh*0.25;
			p3.y = p3y - gh*0.1;
			p3.alpha = 0;
			p3.scaleX = p3.scaleY = 2;
			egret.Tween.get(p3).wait(820).to({scaleX:1,scaleY:1,x:p3x,y:p3y},320,egret.Ease.backOut);
			egret.Tween.get(p3).wait(820).to({alpha:1},320).call(function(){
				removedTweens(continue1);
				egret.Tween.get(continue1).to({alpha:0.5}).call(function(){
					egret.Tween.get(continue1,{loop:true})
					.to({alpha:1},500)
					.to({alpha:0.5},500);
				},this);
				descLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
			},this);
			let p4y = p4.y;
			p4.y = gh - pw_sy;
			egret.Tween.get(p4).wait(500).to({y:p4y},320,egret.Ease.backOut);
		/**事件 */
			descLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
			function startOne(){
				descLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
				egret.Tween.get(descLayer).to({alpha:0.3},500).call(function(){
					LremoveChild(descLayer);
					this.game1();
				},this);
			}
		}
		private descView2(callback?,thisObj?,data?){
			let descLayer = new egret.Sprite();
			GameLayer.addChild(descLayer);
			descLayer.touchEnabled = true;

			let descBg = createBitmapByName("g1_hbg_jpg","bg");
			descLayer.addChild(descBg);

			let descBg2 = createBitmapByName("g1_hbg2_png");
			descLayer.addChild(descBg2);
			descBg2.x = gw/2 - GetWidth(descBg2)/2;
			descBg2.y = gh*0.492;

			let p1 = createBitmapByName("g2_p1_png");
			descLayer.addChild(p1);
			p1.x = gw/2 - GetWidth(p1)/2;
			p1.y = -gh*0.006;

			let p2 = createBitmapByName("g2_p2_png");
			descLayer.addChild(p2);
			p2.x = gw/2 - gh*0.255;
			p2.y = gh*0.187;

			let p3 = createBitmapByName("g2_p3_png");
			descLayer.addChild(p3);
			p3.x = gw/2 - gh*0.255;
			p3.y = gh*0.11;

			let p4 = createBitmapByName("g2_p4_png");
			descLayer.addChild(p4);
			p4.x = gw/2 - GetWidth(p4)/2 + gh*0.012;
			p4.y = gh*0.76;

			let continue1 = createBitmapByName("g2_p5_png");
			descLayer.addChild(continue1);
			continue1.x = gw/2 - GetWidth(continue1)/2 + gh*0.01;
			continue1.y = gh*0.885;
			continue1.alpha = 0;
		/**动画 */
			p1.alpha = 0;
			egret.Tween.get(p1).to({alpha:1},500);
			let p2x = p2.x;
			p2.alpha = 0;
			p2.x = gw/2 + gh*0.255;
			egret.Tween.get(p2).to({x:p2x},500,egret.Ease.backOut);
			egret.Tween.get(p2).to({alpha:1},500);
			BtnMode(p3,true);
			let p3x = p3.x;
			let p3y = p3.y;
			p3.x = p3x + gh*0.25;
			p3.y = p3y - gh*0.1;
			p3.alpha = 0;
			p3.scaleX = p3.scaleY = 2;
			egret.Tween.get(p3).wait(820).to({scaleX:1,scaleY:1,x:p3x,y:p3y},320,egret.Ease.backOut);
			egret.Tween.get(p3).wait(820).to({alpha:1},320).call(function(){
				removedTweens(continue1);
				egret.Tween.get(continue1).to({alpha:0.5}).call(function(){
					egret.Tween.get(continue1,{loop:true})
					.to({alpha:1},500)
					.to({alpha:0.5},500);
				},this);
				descLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
			},this);
			let p4y = p4.y;
			p4.y = gh - pw_sy;
			egret.Tween.get(p4).wait(500).to({y:p4y},320,egret.Ease.backOut);
		/**事件 */
			descLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
			function startOne(){
				descLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);				
				egret.Tween.get(descLayer).to({alpha:0.3},500).call(function(){
					LremoveChild(descLayer);
					this.game2();
				},this);
			}
		}
		private descView3(callback?,thisObj?,data?){
			let descLayer = new egret.Sprite();
			GameLayer.addChild(descLayer);
			descLayer.touchEnabled = true;

			let descBg = createBitmapByName("g1_hbg_jpg","bg");
			descLayer.addChild(descBg);

			let descBg2 = createBitmapByName("g1_hbg2_png");
			descLayer.addChild(descBg2);
			descBg2.x = gw/2 - GetWidth(descBg2)/2;
			descBg2.y = gh*0.492;

			let p1 = createBitmapByName("g3_p1_png");
			descLayer.addChild(p1);
			p1.x = gw/2 - GetWidth(p1)/2;
			p1.y = gh*0.001;

			let p2 = createBitmapByName("g3_p2_png");
			descLayer.addChild(p2);
			p2.x = gw/2 - gh*0.255;
			p2.y = gh*0.187;

			let p3 = createBitmapByName("g3_p3_png");
			descLayer.addChild(p3);
			p3.x = gw/2 - gh*0.232;
			p3.y = gh*0.24;

			let p4 = createBitmapByName("g3_p4_png");
			descLayer.addChild(p4);
			p4.x = gw/2 - GetWidth(p4)/2;
			p4.y = gh*0.748;

			let continue1 = createBitmapByName("g3_p5_png");
			descLayer.addChild(continue1);
			continue1.x = gw/2 - GetWidth(continue1)/2;
			continue1.y = gh*0.84;
			continue1.alpha = 0;
		/**动画 */
			p1.alpha = 0;
			egret.Tween.get(p1).to({alpha:1},500);
			let p2x = p2.x;
			p2.alpha = 0;
			p2.x = gw/2 + gh*0.255;
			egret.Tween.get(p2).to({x:p2x},500,egret.Ease.backOut);
			egret.Tween.get(p2).to({alpha:1},500);
			BtnMode(p3,true);
			let p3x = p3.x;
			let p3y = p3.y;
			p3.x = p3x + gh*0.25;
			p3.y = p3y - gh*0.1;
			p3.alpha = 0;
			p3.scaleX = p3.scaleY = 2;
			egret.Tween.get(p3).wait(820).to({scaleX:1,scaleY:1,x:p3x,y:p3y},320,egret.Ease.backOut);
			egret.Tween.get(p3).wait(820).to({alpha:1},320).call(function(){
				removedTweens(continue1);
				egret.Tween.get(continue1).to({alpha:0.5}).call(function(){
					egret.Tween.get(continue1,{loop:true})
					.to({alpha:1},500)
					.to({alpha:0.5},500);
				},this);
				descLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
			},this);
			let p4y = p4.y;
			p4.y = gh - pw_sy;
			egret.Tween.get(p4).wait(500).to({y:p4y},320,egret.Ease.backOut);
		/**事件 */
			function startOne(){
				descLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP,startOne,this);
				egret.Tween.get(descLayer).to({alpha:0.3},500).call(function(){
					LremoveChild(descLayer);
					this.game3();
				},this);
			}
		}
		private game1(){
		/**层级背景 */
			let gameLayer = new egret.Sprite();
			this.addChild(gameLayer);
			let bgLayer = new egret.Sprite();
			gameLayer.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			gameLayer.addChild(fgLayer);
			let gbg = createBitmapByName("g1bg_jpg","bg");
			bgLayer.addChild(gbg);
			let gfg = createBitmapByName("g1fg_png");
			fgLayer.addChild(gfg);
			gfg.scaleX = gfg.scaleY = 2;
			gfg.x = gw/2 - GetWidth(gfg)/2;
			gfg.y = gh/2 - GetHeight(gfg)/2;

			let countLayer = new egret.Sprite();
			bgLayer.addChild(countLayer);
			countLayer.y = gh*0.07;

			let countnums = new egret.BitmapText();
			countLayer.addChild(countnums);
			countnums.font = RES.getRes("nums_fnt");
			countnums.text = "15s";
			countnums.x = gw/2 - GetWidth(countnums)/2;

			let countbg = createBitmapByName("countbg_png");
			countLayer.addChild(countbg);
			countbg.x = gw/2 - GetWidth(countbg)/2;
			countbg.y = 74;
			let countfg = createBitmapByName("countfg_png");
			countLayer.addChild(countfg);
			countfg.x = gw/2 - GetWidth(countfg)/2;
			countfg.y = 74;
			let countfg2 = createBitmapByName("countfg_png");
			countLayer.addChild(countfg2);
			countfg2.x = gw/2 - gh*0.5;
			countfg2.y = 74;
			countfg.mask = countfg2;
		/**游戏1 */
			let acts = createBitmapByName("g1ready_png");
			bgLayer.addChild(acts);
			acts.x = gw/2 - GetWidth(acts)/2;
			acts.y = gh*0.282;

			let touchMask = makeaShape(0x000000,0);
			fgLayer.addChild(touchMask);
			touchMask.touchEnabled = true;

			let actStrArr = ["g1_act1_png","g1_act2_png","g1_act3_png","g1_act4_png","g1_act5_png","g1_act6_png"];
			let numArr = [0,1,2,3,4,5];
		/**游戏变量 */
			let ct1 = 15000;
			// let ct1 = 300;
			let st1 = 0;
			let et1 = 0;
			let ut1 = 0;
			let rt1 = 0;
			let changeCount = 1300;

			let isTouch = false;
			let g1Score = 0;
		/**事件 */
			function niceFun(evt:egret.TouchEvent){
				if(!isTouch){
					playAudio("g1m",0,true);
					isTouch = true;
					// console.log("nice");
					g1Score+=1;
					let evtObj = evt.currentTarget;
					egret.Tween.get(evtObj)
					.to({scaleX:2,scaleY:2,alpha:0},100).call(function(){
						LremoveChild(tap2);
						LTap.reclaim(evtObj);
					},this);
				}
			}
			let tapXArr = [];
			let tap2:LTap;
			function errorFun(evt:egret.TouchEvent){
				if(!isTouch){
					// playAudio("g1m",0,true);
					isTouch = true;
					LremoveChild(tap2);
					// console.log("error");
					rt1 += 1000;

					let tapX = LTap.produce("tapX_png");
					fgLayer.addChild(tapX);
					tapX.x = evt.stageX;
					tapX.y = evt.stageY;

					tapX.alpha = 0;
					tapX.scaleX = tapX.scaleY = 2;
					tapXArr.push(tapX);
					egret.Tween.get(tapX).to({scaleX:1,scaleY:1,alpha:1},100,egret.Ease.backOut);
				}
			}
		/**切换动作 */
			function changeAct(){
				isTouch = true;
				for(let i=0;i<tapXArr.length;i++){
					let tapX = tapXArr[i];
					LremoveChild(tapX);
					tapXArr.splice(i,1);
					i--;
				}
				let tap1 = LTap.produce("tap1_png");
				fgLayer.addChild(tap1);
				tap1.addEventListener(egret.TouchEvent.TOUCH_TAP,niceFun,this);
				removedListener(tap1,egret.TouchEvent.TOUCH_TAP,niceFun,this);
				tap2 = tap1;

				removedTweens(tap1);
				egret.Tween.get(tap1,{loop:true})
				.to({alpha:0.5},200)
				.to({alpha:1},200);

				let actR = Math.floor(Math.random()*numArr.length);
				let resNum = numArr[actR];
				acts.texture = RES.getRes(actStrArr[resNum]);
				numArr.splice(actR,1);
				if(numArr.length<1)
					numArr = [0,1,2,3,4,5];
				switch(resNum){
					case 0:
						tap1.x = gw/2 + gh*0.185;
						tap1.y = gh*0.805;
					break;
					case 1:
						tap1.x = gw/2 - gh*0.2;
						tap1.y = gh*0.58;
					break;
					case 2:
						tap1.x = gw/2 + gh*0.21;
						tap1.y = gh*0.63;
					break;
					case 3:
						tap1.x = gw/2 + gh*0.18;
						tap1.y = gh*0.335;
					break;
					case 4:
						tap1.x = gw/2 - gh*0.195;
						tap1.y = gh*0.762;
					break;
					case 5:
						tap1.x = gw/2 - gh*0.19;
						tap1.y = gh*0.397;
					break;
				}
				isTouch = false;
				et1 = egret.getTimer();
				let ut2 = (et1-st1)+rt1;
				changeCount = Math.max(500,1300-(ut2*(1300/ct1)));
				egret.setTimeout(function(){
					LremoveChild(tap1);
					if(!this.isOver1){
						changeAct.call(this);
					}
				},this,changeCount);
			}
		/**开始游戏 */
			egret.setTimeout(function(){
				changeAct.call(this);
				st1 = egret.getTimer();
				touchMask.addEventListener(egret.TouchEvent.TOUCH_TAP,errorFun,this);
				removedListener(touchMask,egret.TouchEvent.TOUCH_TAP,errorFun,this);
				countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
				removedListener(countLayer,egret.Event.ENTER_FRAME,onframe,this);
			},this,320);
		/**预创建一些对象 */
			createObj.call(this);
			function createObj(){
				let i:number=0;
				let objArr:any[] = [];
				for(i=0;i<3;i++){
					var tap1 = LTap.produce("tap1_png");
					objArr.push(tap1);
				}
				for(i=0;i<3;i++) {
					tap1 = objArr.pop();
					LTap.reclaim(tap1);
				}
				for(i=0;i<3;i++){
					var tapX = LTap.produce("tapX_png");
					objArr.push(tapX);
				}
				for(i=0;i<3;i++) {
					tapX = objArr.pop();
					LTap.reclaim(tapX);
				}
			}
		/**onframe */
			function onframe(){
				et1 = egret.getTimer();
				ut1 = (et1-st1)+rt1;
				let txt1 = Math.ceil((ct1-(ut1))/1000);
				if(txt1<=0) {
					txt1 = 0;
					ut1 = ct1;
					if(!this.isOver1){
						this.isOver1 = true;
						countLayer.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
						LremoveChild(touchMask);
						LremoveChild(tap2);
						this.gs1 = g1Score;
						this.result1(function(){
							LremoveChild(gameLayer);
						},this);
					}
				};
				countnums.text = txt1+"s";
				countfg2.x =countfg.x-(countfg.x-(gw/2-gh*0.5))*ut1/ct1;
			}
		}
		private gs1:number=0;
		private gs2:number=0;
		private gs3:number=0;
		private gs4:number=0;
		private result1(callback,thisObj){
			let resultLayer = new egret.Sprite();
			this.addChild(resultLayer);
			let resultShape = makeaShape(0xffffff,0.4);
			resultLayer.addChild(resultShape);

			let r_1 = createBitmapByName("r_1_png");
			resultLayer.addChild(r_1);
			r_1.x = gw/2 - gh*0.025;
			r_1.y = -gh*0.097;
			let r_2 = createBitmapByName("r_2_png");
			resultLayer.addChild(r_2);
			r_2.x = gw/2 - gh*0.34;
			r_2.y = gh*0.604;

			let rbg = createBitmapByName("rbg_png");
			resultLayer.addChild(rbg);
			rbg.x = gw/2 - gh*0.262;
			rbg.y = gh*0.298;

			let headLayer = new egret.Sprite();
			resultLayer.addChild(headLayer);
			let headBg = createBitmapByName("r_headbg_png");
			headLayer.addChild(headBg);
			let headShape = new egret.Shape();
			headLayer.addChild(headShape);
			headShape.graphics.beginFill(0xff0000);
			headShape.graphics.drawCircle(0,0,138/2);
			headShape.graphics.endFill();
			headShape.x = gh*0.0722;
			headShape.y = gh*0.0606;
			addBitmapByUrl(headShape.x-138/2,headShape.y-138/2,138,headLayer,$headImg,"headImg"
			,function(head){
				head.mask = headShape;
			},this);
			headLayer.x = gw/2 - gh*0.2;
			headLayer.y = gh*0.283;

			let nickName = new egret.TextField();
			resultLayer.addChild(nickName);
			textScaleFun(nickName,0.025,0xffffff);
			nickName.text = $nickName;
			nickName.bold = true;
			nickName.x = gw/2 + gh*0.01 - GetWidth(nickName)/2;
			nickName.y = gh*0.362;

			let textbg = createBitmapByName("r1_textbg_png");
			resultLayer.addChild(textbg);
			textbg.x = gw/2 - GetWidth(textbg)/2;
			textbg.y = gh*0.445;
			
			let scoreLayer = new egret.Sprite();
			resultLayer.addChild(scoreLayer);
			let text1 = createBitmapByName("r1_text1_png");
			scoreLayer.addChild(text1);
			let scoreField = new egret.TextField();
			scoreLayer.addChild(scoreField);
			textScaleFun(scoreField,0.04,0xF2E4CA);
			scoreField.bold = true;
			scoreField.text = this.gs1+"";
			let text2 = createBitmapByName("r1_text2_png");
			scoreLayer.addChild(text2);
			scoreField.x = text1.x + GetWidth(text1) + gh*0.01;
			scoreField.y = GetHeight(text1) - GetHeight(scoreField) - 2;
			text2.x = scoreField.x + GetWidth(scoreField) + gh*0.01;
			scoreLayer.x = gw/2 - GetWidth(scoreLayer)/2;
			scoreLayer.y = gh*0.504;

			let start2Btn = createBitmapByName("start2Btn_png");
			resultLayer.addChild(start2Btn);
			BtnMode(start2Btn);
			start2Btn.x = gw/2 - gh*0.005;
			start2Btn.y = gh*0.705;
			egret.setTimeout(function(){
				start2Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,start2Fun,this);
				removedListener(start2Btn,egret.TouchEvent.TOUCH_TAP,start2Fun,this);
			},this,1000);
			function start2Fun(){
				start2Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,start2Fun,this);
				if(callback) callback.call(thisObj);
				LremoveChild(resultLayer);
				this.descView2();
			}
		}
		private game2(){
			let gameLayer = new egret.Sprite();
			this.addChild(gameLayer);
			let bgLayer = new egret.Sprite();
			gameLayer.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			gameLayer.addChild(fgLayer);
			let gbg = createBitmapByName("g1bg_jpg","bg");
			bgLayer.addChild(gbg);
			let gfg = createBitmapByName("g1fg_png");
			fgLayer.addChild(gfg);
			gfg.scaleX = gfg.scaleY = 2;
			gfg.x = gw/2 - GetWidth(gfg)/2;
			gfg.y = gh/2 - GetHeight(gfg)/2;

			let countLayer = new egret.Sprite();
			fgLayer.addChild(countLayer);
			countLayer.y = gh*0.07;

			let countnums = new egret.BitmapText();
			countLayer.addChild(countnums);
			countnums.font = RES.getRes("nums_fnt");
			countnums.text = "3s";
			countnums.x = gw/2 - GetWidth(countnums)/2;

			let countbg = createBitmapByName("countbg_png");
			countLayer.addChild(countbg);
			countbg.x = gw/2 - GetWidth(countbg)/2;
			countbg.y = 74;
			let countfg = createBitmapByName("countfg_png");
			countLayer.addChild(countfg);
			countfg.x = gw/2 - GetWidth(countfg)/2;
			countfg.y = 74;
			let countfg2 = createBitmapByName("countfg_png");
			countLayer.addChild(countfg2);
			countfg2.x = gw/2 - gh*0.5;
			countfg2.y = 74;
			countfg.mask = countfg2;
		/**游戏人物 */
			let acts = createBitmapByName("g2_act1_png");
			bgLayer.addChild(acts);
			acts.x = pw_sx;
			acts.y = gh*0.22;
		/**前景-ready321 */
			let readyLayer = new egret.Sprite();
			fgLayer.addChild(readyLayer);
			
			let readBg = createBitmapByName("g2_readybg_jpg","bg");
			readyLayer.addChild(readBg);
			let nums = createBitmapByName("g2_num3_png");
			readyLayer.addChild(nums);
			nums.x = gw/2 - GetWidth(nums)/2;
			nums.y = gh*0.295;
			BtnMode(nums,true);
			let nums2 = createBitmapByName("g2_go_png");
			readyLayer.addChild(nums2);
			nums2.x = gw/2 - GetWidth(nums2)/2;
			nums2.y = gh*0.295;
			BtnMode(nums2,true);
			nums2.alpha = 0;
			let numsArr = ["g2_num3_png","g2_num2_png","g2_num1_png","g2_go_png"];
			let num = 0;
			egret.Tween.get(nums).wait(50).to({scaleX:2,scaleY:2,alpha:0},700);
			let readyInt = egret.setInterval(function(){
				num++;
				nums.texture = RES.getRes(numsArr[num]);
				nums.scaleX = nums.scaleY = 1;
				nums.alpha = 1;
				if(num>=numsArr.length-1){
					egret.clearInterval(readyInt);
					nums.scaleX = nums.scaleY = 0.5;
					egret.Tween.get(nums).to({scaleX:1,scaleY:1},300,egret.Ease.quadIn).call(function(){
						nums2.alpha = 1;
						nums2.scaleX = nums2.scaleY = 1;
						// playAudio("g1m",0);
						egret.Tween.get(nums2).to({scaleX:2,scaleY:2,alpha:0},400,egret.Ease.quadOut);
						egret.Tween.get(readyLayer).to({alpha:0},400,egret.Ease.quadOut).call(function(){
							LremoveChild(readyLayer);
							playAudio("g2m",0);
							st1 = egret.getTimer();
							countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
							removedListener(countLayer,egret.Event.ENTER_FRAME,onframe,this);
							GameLayer.addEventListener("onShake",shakeFun,this);
						},this);
					},this);
				}else{
					egret.Tween.get(nums).wait(50).to({scaleX:2,scaleY:2,alpha:0},700);
				}
			},this,1000);
		/**事件 */
			let ct1 = 3000;
			let st1 = egret.getTimer();
			let et1 = 0;
			let ut1 = 0;
			function onframe(){
				et1 = egret.getTimer();
				ut1 = et1 - st1;
				let txt1 = Math.ceil((ct1-ut1)/1000);
				if(txt1<=0) {
					txt1 = 0;
					ut1 = ct1;
					if(!this.isOver2){
						this.isOver2 = true;
						countLayer.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
						GameLayer.removeEventListener("onShake",shakeFun,this);
						this.gs2 = maxSpeed;
						this.result2(function(){
							LremoveChild(gameLayer);
						},this);
					}
				};
				countnums.text = txt1+"s";
				countfg2.x =countfg.x-(countfg.x-(gw/2-gh*0.5))*ut1/ct1;
			}

			let bitmapNum = 0;
			let maxSpeed = 0;
			function shakeFun(evt:egret.Event){
				maxSpeed = Math.max(maxSpeed,Math.floor(evt.data/1000));
				bitmapNum++;
				if(bitmapNum%2==1){
					acts.texture = RES.getRes("g2_act2_png");
				}else{
					acts.texture = RES.getRes("g2_act1_png");
				}
			}
		}
		private result2(callback,thisObj){
			let resultLayer = new egret.Sprite();
			this.addChild(resultLayer);
			let resultShape = makeaShape(0xffffff,0.4);
			resultLayer.addChild(resultShape);

			let r_1 = createBitmapByName("r_1_png");
			resultLayer.addChild(r_1);
			r_1.x = gw/2 - gh*0.025;
			r_1.y = -gh*0.097;
			let r_2 = createBitmapByName("r_2_png");
			resultLayer.addChild(r_2);
			r_2.x = gw/2 - gh*0.34;
			r_2.y = gh*0.604;

			let rbg = createBitmapByName("rbg_png");
			resultLayer.addChild(rbg);
			rbg.x = gw/2 - gh*0.262;
			rbg.y = gh*0.298;

			let headLayer = new egret.Sprite();
			resultLayer.addChild(headLayer);
			let headBg = createBitmapByName("r_headbg_png");
			headLayer.addChild(headBg);
			let headShape = new egret.Shape();
			headLayer.addChild(headShape);
			headShape.graphics.beginFill(0xff0000);
			headShape.graphics.drawCircle(0,0,138/2);
			headShape.graphics.endFill();
			headShape.x = gh*0.0722;
			headShape.y = gh*0.0606;
			addBitmapByUrl(headShape.x-138/2,headShape.y-138/2,138,headLayer,$headImg,"headImg"
			,function(head){
				head.mask = headShape;
			},this);
			headLayer.x = gw/2 - gh*0.2;
			headLayer.y = gh*0.283;

			let nickName = new egret.TextField();
			resultLayer.addChild(nickName);
			textScaleFun(nickName,0.025,0xffffff);
			nickName.text = $nickName;
			nickName.bold = true;
			nickName.x = gw/2 + gh*0.01 - GetWidth(nickName)/2;
			nickName.y = gh*0.362;

			let textbg = createBitmapByName("r2_textbg_png");
			resultLayer.addChild(textbg);
			textbg.x = gw/2 - GetWidth(textbg)/2;
			textbg.y = gh*0.446;
			
			let scoreLayer = new egret.Sprite();
			resultLayer.addChild(scoreLayer);
			let scoreField = new egret.TextField();
			scoreLayer.addChild(scoreField);
			textScaleFun(scoreField,0.04,0xF2E4CA);
			scoreField.bold = true;
			scoreField.text = this.gs2+"";
			let text2 = createBitmapByName("r2_text2_png");
			scoreLayer.addChild(text2);
			scoreField.y = GetHeight(text2) - GetHeight(scoreField) - 2;
			text2.x = scoreField.x + GetWidth(scoreField) + gh*0.01;
			scoreLayer.x = gw/2 - GetWidth(scoreLayer)/2;
			scoreLayer.y = gh*0.505;

			let start3Btn = createBitmapByName("start3Btn_png");
			resultLayer.addChild(start3Btn);
			BtnMode(start3Btn);
			start3Btn.x = gw/2 - gh*0.005;
			start3Btn.y = gh*0.705;
			start3Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,start3Fun,this);
			removedListener(start3Btn,egret.TouchEvent.TOUCH_TAP,start3Fun,this);
			function start3Fun(){
				start3Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,start3Fun,this);
				LremoveChild(resultLayer);
				if(callback) callback.call(thisObj);
				this.descView3();
			}
		}
		private game3(){
			let gameLayer = new egret.Sprite();
			this.addChild(gameLayer);
			let bgLayer = new egret.Sprite();
			gameLayer.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			gameLayer.addChild(fgLayer);
			let gbg = createBitmapByName("g1bg_jpg","bg");
			bgLayer.addChild(gbg);
			let gfg = createBitmapByName("g1fg_png");
			fgLayer.addChild(gfg);
			gfg.scaleX = gfg.scaleY = 2;
			gfg.x = gw/2 - GetWidth(gfg)/2;
			gfg.y = gh/2 - GetHeight(gfg)/2;

			let countLayer = new egret.Sprite();
			fgLayer.addChild(countLayer);
			countLayer.y = gh*0.07;

			let countnums = new egret.BitmapText();
			countLayer.addChild(countnums);
			countnums.font = RES.getRes("nums_fnt");
			countnums.text = "3s";
			countnums.x = gw/2 - GetWidth(countnums)/2;

			let countbg = createBitmapByName("countbg_png");
			countLayer.addChild(countbg);
			countbg.x = gw/2 - GetWidth(countbg)/2;
			countbg.y = 74;
			let countfg = createBitmapByName("countfg_png");
			countLayer.addChild(countfg);
			countfg.x = gw/2 - GetWidth(countfg)/2;
			countfg.y = 74;
			let countfg2 = createBitmapByName("countfg_png");
			countLayer.addChild(countfg2);
			countfg2.x = gw/2 - gh*0.5;
			countfg2.y = 74;
			countfg.mask = countfg2;
		/**游戏 */
		/**人物 */
			let ready1 = createBitmapByName("ready1_png");
			bgLayer.addChild(ready1);
			ready1.x = gw/2 - gh*0.255;
			ready1.y = gh*0.2;

			let acts = createBitmapByName("g3_act1_png");
			bgLayer.addChild(acts);
			acts.x = gw/2 - gh*0.25;
			acts.y = gh*0.195;
			acts.alpha = 0;
		/**血量 */
			let bloodnum1 = 3;
			let bloodnum2 = 3;

			let blayer1 = new egret.Sprite();
			fgLayer.addChild(blayer1);
			let blayer2 = new egret.Sprite();
			fgLayer.addChild(blayer2);

			let bloodbg1 = createBitmapByName("bloodbg1_png");
			blayer1.addChild(bloodbg1);
			bloodbg1.x = pw_sx - gh*0.02;
			bloodbg1.y = 0;

			let bloodbg2 = createBitmapByName("bloodbg2_png");
			blayer2.addChild(bloodbg2);
			bloodbg2.x = gw - GetWidth(bloodbg2) + gh*0.02;
			bloodbg2.y = 0;

			let blood1Arr = [];
			let blood2Arr = [];
			for(let i=0;i<3;i++){
				let blood1 = createBitmapByName("blood1_png");
				blayer1.addChild(blood1);
				blood1.x = pw_sx+gh*0.06 - 21*i;
				blood1.y = gh*0.043;

				let blood2 = createBitmapByName("blood2_png");
				blayer2.addChild(blood2);
				blood2.x = gw-gh*0.06-GetWidth(blood2) + 21*i;
				blood2.y = gh*0.043;

				blood1Arr.push(blood1);
				blood2Arr.push(blood2);
			}
		/**扣血方法 */
			function reduceBlood(num){
				if(num==1){
					bloodnum1--;
				}else{
					bloodnum2--;
				}
				let arr = blood1Arr;
				let shockaObj = blayer1;
				if(num==2){
					arr = blood2Arr;
					shockaObj = blayer2;
				}
				let blood = arr[0];
				arr.splice(0,1);
				blood.texture = RES.getRes("blood3_png");
				
				let shocka = new Lgs.ShockUtils();
				shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
				let shockanum = 10;
				shocka._target = shockaObj;
				shocka.start(shockanum);//num是震动次数

				if(num==1){
					// let redlight = makeaShape(0xff0000,0.3);
					// resultLayer.addChild(redlight);
					let redlight = createBitmapByName("red_light_png");
					fgLayer.addChild(redlight);
					egret.Tween.get(redlight)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0},100);
				}
			}
			// reduceBlood.call(this,1);
			// reduceBlood.call(this,1);
			// reduceBlood.call(this,2);
		/**切换动作 */
			let roundnum = 1;
			let touchNum = 6+Math.floor(Math.random()*10);
			function changeAct(){
				let tapLayer1 = new egret.Sprite();
				fgLayer.addChild(tapLayer1);
				tapLayer = tapLayer1;

				let tap2 = LTap.produce("tap2_png");
				tapLayer1.addChild(tap2);
				BtnMode(tap2);
				tap2.addEventListener(egret.TouchEvent.TOUCH_TAP,niceFun,this);
				removedListener(tap2,egret.TouchEvent.TOUCH_TAP,niceFun,this);

				removedTweens(tapLayer1);
				egret.Tween.get(tapLayer1,{loop:true})
				.to({alpha:0.5},200)
				.to({alpha:1},200);

				let textureName = "g3_act"+roundnum+"_png";
				acts.texture = RES.getRes(textureName);
					// ready1.alpha = 0;
					// acts.alpha = 1;
				switch(textureName){
					case "g3_act1_png":
						ready1.alpha = 0;
						acts.alpha = 1;
						tap2.x = gw/2 + gh*0.14;
						tap2.y = gh*0.73;
					break;
					case "g3_act2_png":
						tap2.x = gw/2 - gh*0.137;
						tap2.y = gh*0.55;
					break;
					case "g3_act3_png":
						tap2.x = gw/2 + gh*0.205;
						tap2.y = gh*0.44;
					break;
				}

				let touchText1 = new egret.TextField();
				tapLayer1.addChild(touchText1);
				textScaleFun(touchText1,0.042,0xA72120);
				touchText1.bold = true;
				touchText1.text = touchNum+"";
				BtnMode(touchText1,true);
				touchText1.x = tap2.x + gh*0.005;
				touchText1.y = tap2.y - gh*0.003;
				touchText = touchText1;
			}
		/**事件 */
			let tapLayer:egret.Sprite;
			let touchText:egret.TextField;
			function niceFun(evt:egret.TouchEvent){
				let evtObj = evt.currentTarget;
				playAudio("g3m",0,true);
				touchNum--;
				touchText.text = touchNum+"";
				if(touchNum>0){
					touchText.anchorOffsetX = touchText.width/2;
					touchText.anchorOffsetY = touchText.height/2;
					touchText.x = evtObj.x + gh*0.005;
					touchText.y = evtObj.y - gh*0.003;
				}else{
					reduceBlood.call(this,2);
					roundnum++;
					LremoveChild(tapLayer);
					if(roundnum<=3){
						ct1 = ct0;
						touchNum = 6+Math.floor(Math.random()*10);
						changeAct.call(this);
						st1 = egret.getTimer();
						countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
					}else if(roundnum>3){
						overFun.call(this);
					}
					evtObj.removeEventListener(egret.TouchEvent.TOUCH_TAP,niceFun,this);
				}
			}
		/**事件onframe */
			let ct0 = 3000;
			let ct1 = ct0;
			let st1 = 0;
			let et1 = 0;
			let ut1 = 0;
			function onframe(){
				et1 = egret.getTimer();
				ut1 = et1 - st1;
				let txt1 = Math.ceil((ct1-ut1)/1000);
				if(txt1<=0) {
					txt1 = 0;
					ut1 = ct1;
					reduceBlood.call(this,1);
					roundnum++;
					if(roundnum<=3){
						LremoveChild(tapLayer);
						ct1 = ct0;
						touchNum = 6+Math.floor(Math.random()*10);
						changeAct.call(this);
						st1 = egret.getTimer();
						countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
					}else if(roundnum>3){
						overFun.call(this);
					}
				};
				countnums.text = txt1+"s";
				countfg2.x =countfg.x-(countfg.x-(gw/2-gh*0.5))*ut1/ct1;
			}
		/**开始游戏 */
			egret.setTimeout(function(){
				ready1.texture = RES.getRes("ready2_png");
				egret.setTimeout(function(){
					changeAct.call(this);
					st1 = egret.getTimer();
					countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
					removedListener(countLayer,egret.Event.ENTER_FRAME,onframe,this);
				},this,320);
			},this,320);
		/**结束输赢判断 */
			function overFun(){
				if(!this.isOver3){
					this.isOver3 = true;
					countLayer.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
					this.gs3 = (3-bloodnum2)*50;
					if(bloodnum1>bloodnum2){
						/**进入绝杀时间 */
						jsTime.call(this);
						LremoveChild(countLayer);
					}else{
						LremoveChild(countLayer);
						LremoveChild(acts);
						LremoveChild(blayer1);
						LremoveChild(blayer2);
						LremoveChild(tapLayer);
						this.resultFun(true);
					}
				}
			}
		/**开始绝杀 */
			function jsTime(){
				let jsText = createBitmapByName("jsText_png");
				fgLayer.addChild(jsText);
				jsText.x = gw/2 - gh*0.31;
				jsText.y = gh*0.076;
				let jsText2 = createBitmapByName("jsText_png");
				fgLayer.addChild(jsText2);
				jsText2.x = gw/2 - gh*0.31;
				jsText2.y = gh*0.076;
				jsText2.alpha = 0;

				acts.alpha = 0;
				ready1.alpha = 1;
				ready1.texture = RES.getRes("ready2_png");

				BtnMode(jsText,true);
				jsText.scaleX = jsText.scaleY = 0;
				BtnMode(jsText2,true);
				egret.Tween.get(jsText).to({alpha:1,scaleX:1,scaleY:1},320,egret.Ease.quadIn)
				.call(function(){
					jsText2.alpha = 1;
					egret.Tween.get(jsText2).to({scaleX:2,scaleY:2,alpha:0},500,egret.Ease.quadOut).call(function(){
						// egret.Tween.get(jsText2)
						this.game4();
						LremoveChild(gameLayer);
					},this);
				},this);
			}
		}
		private game4(){
			let gameLayer = new egret.Sprite();
			this.addChild(gameLayer);
			let bgLayer = new egret.Sprite();
			gameLayer.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			gameLayer.addChild(fgLayer);
			let gbg = createBitmapByName("g1bg_jpg","bg");
			bgLayer.addChild(gbg);
			let gfg = createBitmapByName("g1fg_png");
			fgLayer.addChild(gfg);
			gfg.scaleX = gfg.scaleY = 2;
			gfg.x = gw/2 - GetWidth(gfg)/2;
			gfg.y = gh/2 - GetHeight(gfg)/2;

			let countLayer = new egret.Sprite();
			fgLayer.addChild(countLayer);
			countLayer.y = gh*0.07;

			let countnums = new egret.BitmapText();
			countLayer.addChild(countnums);
			countnums.font = RES.getRes("nums_fnt");
			countnums.text = "3s";
			countnums.x = gw/2 - GetWidth(countnums)/2;

			let countbg = createBitmapByName("countbg_png");
			countLayer.addChild(countbg);
			countbg.x = gw/2 - GetWidth(countbg)/2;
			countbg.y = 74;
			let countfg = createBitmapByName("countfg_png");
			countLayer.addChild(countfg);
			countfg.x = gw/2 - GetWidth(countfg)/2;
			countfg.y = 74;
			let countfg2 = createBitmapByName("countfg_png");
			countLayer.addChild(countfg2);
			countfg2.x = gw/2 - gh*0.5;
			countfg2.y = 74;
			countfg.mask = countfg2;
		/**游戏 */
		/**人物 */
			let jsact1 = createBitmapByName("jsact1_png");
			bgLayer.addChild(jsact1);
			jsact1.x = gw/2 -GetWidth(jsact1)/2;
			jsact1.y = gh*0.285;
			
			let doublehit = createBitmapByName("doublehit_png");
			bgLayer.addChild(doublehit);
			doublehit.x = gw/2 - gh*0.155;
			doublehit.y = gh*0.305;
			
			let dg1 = createBitmapByName("dg1_png","bg");
			bgLayer.addChild(dg1);
		/**动画 */
			let aniNum = 0;
			egret.setInterval(function(){
				aniNum++;
				if(aniNum%2==1){
					dg1.texture = RES.getRes("dg2_png");
				}else{
					dg1.texture = RES.getRes("dg1_png");
				}
			},this,120);

			BtnMode(doublehit,true);
			removedTweens(doublehit);
			egret.Tween.get(doublehit,{loop:true})
			.to({scaleX:1.1,scaleY:1.1},120)
			.to({scaleX:1,scaleY:1},120);

			dg1.touchEnabled = true;
			dg1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,doubHit,this);
			dg1.addEventListener(egret.TouchEvent.TOUCH_END,doubHit,this);
			removedListener(dg1,egret.TouchEvent.TOUCH_BEGIN,doubHit,this);
			removedListener(dg1,egret.TouchEvent.TOUCH_END,doubHit,this);
		/**连击 */
			let hitnum = 0;
			function doubHit(){
				hitnum++;
				if(hitnum%2==1){
					playAudio("g3m",0,true);
					jsact1.texture = RES.getRes("jsact2_png");
				}else{
					jsact1.texture = RES.getRes("jsact1_png");
				}
			}
		/**onframe事件 */
			let ct1 = 3000;
			let st1 = 0;
			let et1 = 0;
			let ut1 = 0;
		
			st1 = egret.getTimer();
			countLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
			removedListener(countLayer,egret.Event.ENTER_FRAME,onframe,this);
			function onframe(){
				et1 = egret.getTimer();
				ut1 = et1 - st1;
				let txt1 = Math.ceil((ct1-ut1)/1000);
				if(txt1<=0) {
					txt1 = 0;
					ut1 = ct1;
					if(!this.isOver4){
						this.isOver4 = true;
						countLayer.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
						dg1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,doubHit,this);
						dg1.removeEventListener(egret.TouchEvent.TOUCH_END,doubHit,this);
						this.gs4 = Math.ceil(hitnum/2)*10;
						LremoveChild(gameLayer);
						this.resultFun(false);
					}
				};
				countnums.text = txt1+"s";
				countfg2.x =countfg.x-(countfg.x-(gw/2-gh*0.5))*ut1/ct1;
			}
		}
		/**onframe ----*/
		private onframe(){
			this.endTime = egret.getTimer();
			this.g_timing2 = this.endTime - this.startTime2;
			//为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
			var nowTime:number = egret.getTimer();
			var fps:number = 1000/(nowTime-this._lastTime);
			this._lastTime = nowTime;
			// var speedOffset:number = 30/fps;
			var speedOffset:number = 1;
			
		}
		/**血量显示 ----*/
		private bloodView(num):void {
		}
		/**分数显示 ----*/
		private addScore(num):void {
		}
        /**游戏碰撞检测 ----*/
        private gameHitTest():void {	
        }
		/**开始游戏 ----*/
		private gameStart(isFirst?:boolean){
			/**start */
			this.startTime = egret.getTimer();
			if(isFirst){
				this.startTime2 = egret.getTimer();
				removedListener(this,egret.Event.ENTER_FRAME,this.onframe,this);
			}
		}
		/**游戏暂停 ---- */
		private gamePause(){
			this.g_timing += this.endTime - this.startTime;	
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
		}
		/**游戏结束 ----*/
		private gameStop(){
			// LMsg("GameOver");
			this.g_timing = this.endTime - this.startTime;
			/**停止游戏 */
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onframe,this);
			// this.resultFun();
		}
		/**游戏结果 */
		private resultFun(isFail){
			this.myScore = (this.gs1*10)+this.gs2+this.gs3+this.gs4;
			let resultLayer = new egret.Sprite();
			this.addChild(resultLayer);
			resultLayer.touchEnabled = true;
			let stnu = this.startData.gcode1/($cid+1);
			let ls = ((this.gs1*10)+this.gs2+this.gs3+this.gs4)*($cid+stnu+1);
			let gamecode1 = this.startData.gcode1;
			let gamecode2 = this.startData.gcode2;
			this.gameInfo = {
				cs1:this.gs1,
				cs2:this.gs2,
				cs3:this.gs3,
				cs4:this.gs4,
				code1:ls,
				code2:gamecode1,
				code3:gamecode2
			}			
			/**Ajax */
			let gameData = {
				score:this.myScore,
				gameInfo:this.gameInfo
			}
			let enddata = {
				cs1:this.gs1,
				cs2:this.gs2,
				cs3:this.gs3,
				cs4:this.gs4,
				score:this.myScore,
				myRank:0
			}
			let mydata = {
				code:encbase64(gameData)
			}

			showloading("正在提交成绩...");
			endGameAjax(mydata,function(data){
				hideloading();
				enddata.myRank = data.myRank;
			/**执行 */
				if(!isFail){
					let successBg = createBitmapByName("successBg_jpg","bg");
					resultLayer.addChild(successBg);

					let successText = createBitmapByName("successText_png");
					resultLayer.addChild(successText);
					successText.x = gw/2 - GetWidth(successText)/2;
					successText.y = gh*0.689;

					let continue1 = createBitmapByName("continue1_png");
					resultLayer.addChild(continue1);
					continue1.x = gw/2 - GetWidth(continue1)/2;
					continue1.y = gh*0.91;
				/**成功动画 */
					successBg.alpha = 0;
					egret.Tween.get(successBg).to({alpha:1},700);

					let successTexty = successText.y;
					successText.y = successTexty - gh*0.05;
					successText.alpha = 0;
					egret.Tween.get(successText).to({alpha:1},700);
					egret.Tween.get(successText).to({y:successTexty},1000,egret.Ease.quadOut);

					continue1.alpha = 1;
					removedTweens(continue1);
					egret.setTimeout(function(){
						egret.Tween.get(continue1,{loop:true})
						.to({alpha:0.5},500)
						.to({alpha:1},500);
					},this,500);
					egret.setTimeout(function(){
						resultLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,overViewFun1,this);
						removedListener(resultLayer,egret.TouchEvent.TOUCH_TAP,overViewFun1,this);
					},this,1500);
				}else{
					playAudio("g3f",0);
					let failShape = makeaShape(0x000000,0);
					resultLayer.addChild(failShape);

					let failBg = createBitmapByName("failBg_png");
					resultLayer.addChild(failBg);
					failBg.x = gw/2 - gh*0.235;
					failBg.y = gh*0.373;
					let failBg2 = createBitmapByName("failBg_png");
					resultLayer.addChild(failBg2);
					failBg2.x = gw/2 - gh*0.235;
					failBg2.y = gh*0.373;

					let failText = createBitmapByName("failText_png");
					resultLayer.addChild(failText);
					failText.x = gw/2 - GetWidth(failText)/2;
					failText.y = gh*0.172;

					let continue2 = createBitmapByName("continue2_png");
					resultLayer.addChild(continue2);
					continue2.x = gw/2 - GetWidth(continue2)/2;
					continue2.y = gh*0.885;	
				/**失败动画 */
					failBg2.alpha = 0.5;
					egret.Tween.get(failBg2)
					.to({alpha:0.3,x:failBg.x+gh*0.01,y:failBg.y-gh*0.01},1000)
					.to({alpha:0.5,x:failBg.x,y:failBg.y},1000);

					let failTexty = failText.y;
					failText.y = failTexty - gh*0.05;
					failText.alpha = 0;
					egret.Tween.get(failText).to({alpha:1},700);
					egret.Tween.get(failText).to({y:failTexty},1000,egret.Ease.quadOut);

					continue2.alpha = 1;
					removedTweens(continue2);
					egret.setTimeout(function(){
						egret.Tween.get(continue2,{loop:true})
						.to({alpha:0.5},500)
						.to({alpha:1},500);
					},this,500);
					egret.setTimeout(function(){
						resultLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,overViewFun1,this);
						removedListener(resultLayer,egret.TouchEvent.TOUCH_TAP,overViewFun1,this);
					},this,1500);
				/**红光动画 */
					// let redlight = makeaShape(0xff0000,0.3);
					// resultLayer.addChild(redlight);
					let redlight = createBitmapByName("red_light_png");
					resultLayer.addChild(redlight);
					egret.Tween.get(redlight)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0.6},100)
					.to({alpha:1},100)
					.to({alpha:0},100);
				}
			/**其他动画 */
				let shocka = new Lgs.ShockUtils();
				shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
				let shockanum = 10;
				shocka._target = GameLayer;
				shocka.start(shockanum);//num是震动次数
			},function(data){
				hideloading();
				LAlert(data.msg);
				showloading(data.msg);
			},this);
		/**结果显示1 */
			function overViewFun1(){
				overViewFun.call(this,enddata);
			}
		/**事件 */
			function overViewFun(data){
				LremoveChild(this);
				let resultpage = new resultPage(data);
				GameLayer.addChild(resultpage);
			}
		}
		/**再来一次/回到首页 */
		private replayFun(){
			LremoveChild(this);
			LremoveChild(this);
			let homeLayer = new LHomePage();	
			GameLayer.addChild(homeLayer);
		}
	/** loopTimes:0 无限循环*/
		private playMusic(textureName,startTime?:number,loopTimes?:number){
			startTime? startTime = startTime:startTime=0;
			loopTimes? loopTimes = loopTimes:loopTimes=1;
			// if(isiOS){
			// 	playAudio(textureName,0,true);
			// }else{
				var musicRes = RES.getRes(textureName);
				var sChannel = musicRes.play(startTime, loopTimes);
			// }
		}
	/**移除监听 */
		private removedFun(){

		}
	}
}

