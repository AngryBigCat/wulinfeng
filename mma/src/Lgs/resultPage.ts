

declare var isResult:boolean;
declare var playerSpic:string[];
module Lgs {
	export class resultPage extends egret.DisplayObjectContainer{
		public constructor(data,callback?,thisObj?) {			
			super();
			this.resultData = data;
			this.score = data.score;
			if(callback){
				this.callback = callback;
				this.thisObj = thisObj;				
			}
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback;
		private thisObj;
		private resultShape;
		private score;
		private resultData;
		private onAddToStage(){
			isResult = true;
			// bgmViewer.show();
			let _THIS = this;
			this.touchEnabled = true;
			let players = RES.getRes("playerdata_json");
			let nameNums = Math.floor(Math.random()*playerSpic.length);
			let player = players.data[nameNums];
			change(nameNums);
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);
			// this.resultShape = makeaShape(0x000000,0.9);
			// bgLayer.addChild(this.resultShape);
			this.resultShape = createBitmapByName("resultBg_jpg","bg");
			bgLayer.addChild(this.resultShape);
		/**winLayer */
			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
			winLayer.width = gw;
			winLayer.width = gh;
		/**彩带 ----*/
			// let cds = new snowing("snowing");
			// winLayer.addChild(cds);
		/**战力数据 */
			let per1 = Math.max(0.3,this.resultData.cs2/50);
			let per2 = Math.max(0.3,(this.resultData.cs3+this.resultData.cs4)/600);
			let per3 = Math.max(0.3,this.resultData.cs1/23);			
		/**三角战力图  */
			let sanjiaoLayer = new egret.Sprite();
			bgLayer.addChild(sanjiaoLayer);
			sanjiaoLayer.x = gw/2 + gh*0.055;
			sanjiaoLayer.y = gh*0.194;
			/**三角背景 */
			let p0 = createBitmapByName("one_png");
			// sanjiaoLayer.addChild(p0);
			p0.x = gh*0.102;
			p0.y = gh*0.107;
			p0.alpha = 0;
			let p1 = createBitmapByName("one_png");
			p1.x = gh*0.1015;
			p1.y = gh*0.025;
			let p2 = createBitmapByName("one_png");
			p2.x = gh*0.032;
			p2.y = gh*0.146;
			let p3 = createBitmapByName("one_png");
			p3.x = gh*0.17;
			p3.y = gh*0.146;
			BtnMode(p0,true);
			BtnMode(p1,true);
			BtnMode(p2,true);
			BtnMode(p3,true);
			let pshape = new egret.Shape();
			sanjiaoLayer.addChild(pshape);
			pshape.graphics.lineStyle(0,0xffffff);
			pshape.graphics.beginFill(0xCEA4A5);
			pshape.graphics.moveTo(p1.x,p1.y);
			pshape.graphics.lineTo(p2.x,p2.y);
			pshape.graphics.lineTo(p3.x,p3.y);
			pshape.graphics.endFill();
			// pshape.alpha = 0.3;
			/**三角前景 */
			let q0 = new egret.Point(p0.x,p0.y);
			let q1 = new egret.Point(p1.x,p1.y);
			let q2 = new egret.Point(p2.x,p2.y);
			let q3 = new egret.Point(p3.x,p3.y);
			q1.y = p0.y - per1*(p0.y-p1.y);

			let q23 = xyFun(q2.x-q0.x,q2.y-q0.y,egret.Point.distance(q0,q2)*per2);
			q2.x = q23.x + q0.x;
			q2.y = q23.y + q0.y;
				q23 = xyFun(q3.x-q0.x,q3.y-q0.y,egret.Point.distance(q0,q3)*per3);
			q3.x = q23.x + q0.x;
			q3.y = q23.y + q0.y;

			let qshape = new egret.Shape();
			sanjiaoLayer.addChild(qshape);
			qshape.graphics.lineStyle(0,0xffffff);
			qshape.graphics.beginFill(0xB63539);
			qshape.graphics.moveTo(q1.x,q1.y);
			qshape.graphics.lineTo(q2.x,q2.y);
			qshape.graphics.lineTo(q3.x,q3.y);
			qshape.graphics.endFill();
			p1.x = q1.x;
			p1.y = q1.y;
			p2.x = q2.x;
			p2.y = q2.y;
			p3.x = q3.x;
			p3.y = q3.y;

			sanjiaoLayer.addChild(p1);
			sanjiaoLayer.addChild(p2);
			sanjiaoLayer.addChild(p3);
			/**三角 */
			let sanjiaoBg = createBitmapByName("sanjiaoBg_png");
			sanjiaoLayer.addChild(sanjiaoBg);
		/**头像-昵称-武魂--分数-排名*/
			let headLayer = new egret.Sprite();
			winLayer.addChild(headLayer);
			let headBg = createBitmapByName("hbg_png");
			headLayer.addChild(headBg);
			let headShape = new egret.Shape();
			headLayer.addChild(headShape);
			headShape.graphics.beginFill(0xff0000);
			headShape.graphics.drawCircle(0,0,109/2);
			headShape.graphics.endFill();
			headShape.x = gh*0.0715;
			headShape.y = gh*0.0603;
			headLayer.x = gw/2 - gh*0.285;
			headLayer.y = gh*0.11 + gh*0.056;

			addBitmapByUrl(headShape.x-109/2,headShape.y-109/2,109,headLayer,$headImg,"headImg"
			,function(head){
				head.mask = headShape;
			/**长按保存与二维码 */
				let saveqr = createBitmapByName("saveqr_png");
				bgLayer.addChild(saveqr);
				saveqr.x = gw/2 - GetWidth(saveqr)/2;
				saveqr.y = gh*0.77;

				let rectangle = new egret.Rectangle(0,0,gw,gh);
				let screen_shot = new LScreenShot();
				let ascreen_shot = screen_shot.addShareImg(this,"jpg",rectangle,1);
				$(".shareImg").show();
				btnViewFun.call(this,function(){
				/**三角图动画 */
					p1.x = q0.x;
					p1.y = q0.y;
					p2.x = q0.x;
					p2.y = q0.y;
					p3.x = q0.x;
					p3.y = q0.y;
					egret.Tween.get(p1).to({x:q1.x,y:q1.y},1000);
					egret.Tween.get(p2).to({x:q2.x,y:q2.y},1000);
					egret.Tween.get(p3,{onChange:function(){
						qshape.graphics.clear();
						qshape.graphics.lineStyle(0,0xffffff);
						qshape.graphics.beginFill(0xB63539);
						qshape.graphics.moveTo(p1.x,p1.y);
						qshape.graphics.lineTo(p2.x,p2.y);
						qshape.graphics.lineTo(p3.x,p3.y);
						qshape.graphics.endFill();
					},onChangeObj:this}).to({x:q3.x,y:q3.y},1000);


					let diss = createBitmapByName("diss_png");
					bgLayer.addChild(diss);
					diss.x = gw/2 - GetWidth(diss)/2;
					diss.y = pw_sy;
					LremoveChild(saveqr);
				});
			},this);

			let namesLayer = new egret.Sprite();
			bgLayer.addChild(namesLayer);
			let nickName = new egret.TextField();
			namesLayer.addChild(nickName);
			textScaleFun(nickName,0.027,0x000000);
			nickName.bold = true;
			nickName.text = $nickName;
			let wuhunBg = createBitmapByName("wuhunBg_png");
			namesLayer.addChild(wuhunBg);
			let wuhunField = new egret.TextField();
			namesLayer.addChild(wuhunField);
			textScaleFun(wuhunField,0.0195,0xffffff);
			wuhunField.bold = true;
			wuhunField.text = player[1];
			nickName.y = gh*0.01;
			wuhunBg.y = gh*0.055;
			wuhunField.x = gh*0.01;
			wuhunField.y = gh*0.06;
			namesLayer.x = gw/2 - gh*0.15;
			namesLayer.y = gh*0.118 + gh*0.056;

			let scoreLayer = new egret.Sprite();
			bgLayer.addChild(scoreLayer);
			let scoreField1 = new egret.TextField();
			scoreLayer.addChild(scoreField1);
			textScaleFun(scoreField1,0.022,0x000000);
			scoreField1.text = "武魂战斗力：";
			let rankField1 = new egret.TextField();
			scoreLayer.addChild(rankField1);
			textScaleFun(rankField1,0.022,0x000000);
			rankField1.textColor = 0x000000;
			rankField1.text = "全国排名：";
			rankField1.x = GetWidth(scoreField1) - GetWidth(rankField1);
			rankField1.y = GetHeight(scoreField1) + gh*0.017;
			let scoreField2 = new egret.TextField();
			scoreLayer.addChild(scoreField2);
			textScaleFun(scoreField2,0.034,0xAE3B3E);
			scoreField2.italic = true;
			scoreField2.bold = true;
			scoreField2.text = this.resultData.score;
			let rankField2 = new egret.TextField();
			scoreLayer.addChild(rankField2);
			textScaleFun(rankField2,0.034,0xAE3B3E);
			rankField2.italic = true;		
			rankField2.bold = true;
			rankField2.text = this.resultData.myRank;
			scoreField2.x = gh*0.14;
			rankField2.x = gh*0.14;
			scoreField2.y = GetHeight(scoreField1) - GetHeight(scoreField2) + gh*0.003;
			rankField2.y = rankField1.y + GetHeight(rankField1) - GetHeight(rankField2) + gh*0.003;
			scoreLayer.x = gw/2 - gh*0.255;
			scoreLayer.y = gh*0.244 + gh*0.056;
		/**数字递增效果 ----*/
			// numAddAni.call(this,0,136,1400,function(num){
			// 	scoreField2.text = num+"";
			// },this);
			/**数字递增效果 */
			function numAddAni(s_num:number,e_num:number,time:number,fun:Function,thisObj){
				let fps = 33;
				let num1 = Math.ceil(time/fps);
				let num2 = Math.ceil((e_num-s_num)/(time/fps));
				let timer = new egret.Timer(fps,num1);
				timer.addEventListener(egret.TimerEvent.TIMER,function(){
					s_num+=num2;
					if(s_num>=e_num) s_num = e_num;
					fun.call(this,s_num);
				},thisObj);
				timer.start();
			}
		/**其他显示 */
			let textLayer = new egret.Sprite();
			bgLayer.addChild(textLayer);
			let text1 = createBitmapByName("r_text1_png");
			textLayer.addChild(text1);
			let nameText = createBitmapByName(playerSpic[nameNums][0]);
			textLayer.addChild(nameText);
			let text2 = createBitmapByName("r_text2_png");
			textLayer.addChild(text2);
			nameText.x = text1.x + GetWidth(text1);
			nameText.y = -gh*0.02;
			text2.x = nameText.x + GetWidth(nameText) + gh*0.003;
			textLayer.x = gw/2 - GetWidth(textLayer)/2;
			textLayer.y = gh*0.422;
		/*选手图片 选手信息*/
			let picBg = createBitmapByName("picBg_png");
			bgLayer.addChild(picBg);
			picBg.x = gw/2 - gh*0.24;
			picBg.y = gh*0.501;

			let pics = createBitmapByName(playerSpic[nameNums][2]);
			bgLayer.addChild(pics);
			pics.x = picBg.x + (GetWidth(picBg)-GetWidth(pics))/2-1;
			pics.y = picBg.y + (GetHeight(picBg)-GetHeight(pics))/2-1.8;
			picBg.scaleX = picBg.scaleY = pics.scaleX = pics.scaleY = 0.85;

			let infoText = new egret.TextField();
			bgLayer.addChild(infoText);
			textScaleFun(infoText,0.02,0x000000);
			infoText.x = gw/2 - gh*0.03;
			infoText.y = gh*0.515;
			infoText.lineSpacing = gh*0.006;
			infoText.textFlow = <Array<egret.ITextElement>>[
					{text: "武魂："+player[1], style: {}}
				, {text: "\n外号："+player[2], style: {}}
				, {text: "\n年龄："+player[3], style: {}}
				, {text: "\n身高："+player[4], style: {}}
				, {text: "\n出身："+player[5], style: {}}
				, {text: "\n特点："+player[6], style: {}}
			];
		/**按钮 */
			function btnViewFun(callback){
				callback.call(this);

				let infoMore = createBitmapByName("infoMore_png");
				winLayer.addChild(infoMore);
				infoMore.scaleX = infoMore.scaleY = 1.2;
				infoMore.x = gw/2 - gh*0.03;
				infoMore.y = gh*0.675;
				BtnMode(infoMore);

				let rankBtn = createBitmapByName("rankBtn_png");
				winLayer.addChild(rankBtn);
				BtnMode(rankBtn);
				rankBtn.x = gw/2 - gh*0.19;
				rankBtn.y = gh*0.805;

				let matchsBtn = createBitmapByName("matchsBtn_png");
				winLayer.addChild(matchsBtn);
				BtnMode(matchsBtn);
				matchsBtn.x = gw/2;
				matchsBtn.y = gh*0.805;

				let shareBtn = createBitmapByName("shareBtn_png");
				winLayer.addChild(shareBtn);
				BtnMode(shareBtn);
				shareBtn.x = gw/2 + gh*0.19;
				shareBtn.y = gh*0.805;

				let hdBtn = createBitmapByName("hdBtn_png");
				winLayer.addChild(hdBtn);
				BtnMode(hdBtn);
				hdBtn.x = gw/2 - gh*0.19;
				hdBtn.y = gh*0.895;

				let moreBtn = createBitmapByName("moreBtn_png");
				winLayer.addChild(moreBtn);
				BtnMode(moreBtn);
				moreBtn.x = gw/2;
				moreBtn.y = gh*0.895;

				let replayBtn = createBitmapByName("replayBtn_png");
				winLayer.addChild(replayBtn);
				BtnMode(replayBtn);
				replayBtn.x = gw/2 + gh*0.19;
				replayBtn.y = gh*0.895;
			/**事件 */
				pics.touchEnabled = true;
				pics.addEventListener(egret.TouchEvent.TOUCH_TAP,infoMoreFun,this);
				removedListener(pics,egret.TouchEvent.TOUCH_TAP,infoMoreFun,this);
				infoMore.addEventListener(egret.TouchEvent.TOUCH_TAP,infoMoreFun,this);
				removedListener(infoMore,egret.TouchEvent.TOUCH_TAP,infoMoreFun,this);

				rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,rankFun,this);
				removedListener(rankBtn,egret.TouchEvent.TOUCH_TAP,rankFun,this);
				matchsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,matchsFun,this);
				removedListener(matchsBtn,egret.TouchEvent.TOUCH_TAP,matchsFun,this);
				shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,shareFun,this);
				removedListener(shareBtn,egret.TouchEvent.TOUCH_TAP,shareFun,this);
				hdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,hdFun,this);
				removedListener(hdBtn,egret.TouchEvent.TOUCH_TAP,hdFun,this);
				moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,moreFun,this);
				removedListener(moreBtn,egret.TouchEvent.TOUCH_TAP,moreFun,this);
				replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.replayFun,this);
				removedListener(replayBtn,egret.TouchEvent.TOUCH_TAP,this.replayFun,this);
			}
		/**进入动画 */
		/**结束Ajax */
			// let netScore = parseInt(decbase64(this.resultData.code5))/5-8;			
			// if(this.score!=netScore){
			// 	let wg_str = this.score+":"+netScore;
			// 	let wgdata = {
			// 		code7:wg_str,
			// 		code8:this.resultData.code6
			// 	}
			// 	ajax2(wgdata);
			// }
		/**方法Fun */
			function infoMoreFun(){
				$(".shareImg").hide();
				info3Fun();
			}
			function rankFun(){
				$(".shareImg").hide();
				showloading();
				getRanklistAjax(function(data){
					hideloading();
					// data.rankList = [];
					list3Fun.call(this,data);
				},function(data){
					hideloading();
					LAlert(data.msg);
				},this);
			}
			function matchsFun(){
				$(".shareImg").hide();
				plan3Fun();
			}
			function shareFun(){
				$(".shareImg").hide();
				bgmViewer.hide();
				let shareLayer = sharePage();
				GameLayer.addChild(shareLayer);
			}
			function hdFun(){
				$(".shareImg").hide();
				$(".hudong").show();
			}
			function moreFun(){
				$(".shareImg").hide();
				more3Fun();
			}
		}
	/**排行榜 ----*/
		private rankFun(){
			// playAudio("touchBtn",0);
			// let rankLayer = new LRankPage();
			// GameLayer.addChild(rankLayer);
		}
	/**再来一次 */
		private replayFun(evt:egret.TouchEvent){
			let evtObj = evt.currentTarget;
			evtObj.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.replayFun,this)
			isResult = false;
			$(".shareImg").hide();
			stopAudio("result");
			// playAudio("touchBtn",0);
		/**返回首页 */
			let homeLayer = new LHomePage();
			GameLayer.addChild(homeLayer);
			LremoveChild(this);
			if(this.callback) this.callback.call(this.thisObj);
		/**返回游戏 */
			// showloading();
			// startGameAjax(function(data){
			// 	hideloading();
			// 	shareFn();
			// 	let startData = {
			// 		"scode":data.scode,
			// 		"gcode1":data.gcode1,
			// 		"gcode2":data.gcode2,
			// 		"firstgame":data.firstgame
			// 	}
			// 	let gameLayer = new GameContainer(startData);
			// 	GameLayer.addChild(gameLayer);
			// 	LremoveChild(this);
			// 	if(this.callback) this.callback.call(this.thisObj);
			// },function(data){
			// 	hideloading();
			// 	LAlert(data.msg);
			// },this);

		}
	/**排行榜 view----*/
		private rankView:egret.Sprite;
		private rankLayer:egret.Sprite;
		private rankSelectNum:number=0;
		private rankViewFun(){
			this.rankView = new egret.Sprite();
			GameLayer.addChild(this.rankView);
			this.rankView.touchEnabled = true;

			let rankShape = new egret.Shape();
			this.rankView.addChild(rankShape);
			rankShape.graphics.beginFill(0xffffff);
			rankShape.graphics.drawRect(0,0,gw,gh);
			rankShape.graphics.endFill();
			let rankBg = createBitmapByName("rankBg_jpg");
			this.rankView.addChild(rankBg);
			rankBg.x = gw/2 - GetWidth(rankBg)/2;
			rankBg.y = 0;
			rankShape.graphics.beginFill(0x6F5FFF);
			rankShape.graphics.drawRect(0,0,gw,GetHeight(rankBg));
			rankShape.graphics.endFill();
			this.rankView.x = gw - pw_sx;
		/**按钮 */
			let rank_back = createBitmapByName("rank_back_png");
			this.rankView.addChild(rank_back);
			BtnMode(rank_back);
			rank_back.x = pw_sx + GetWidth(rank_back)/2;
			rank_back.y = gh*0.005 + GetHeight(rank_back)/2;

			let rankBtnsArr = [];
			for(let i=0;i<3;i++){
				let rank_btn1 = createBitmapByName("rank_btn"+(i+1)+"_jpg");
				this.rankView.addChild(rank_btn1);
				BtnMode(rank_btn1);
				rank_btn1.x = gw/2 + GetWidth(rank_btn1)*(i-1);
				rank_btn1.y = gh*0.122;
				rank_btn1["selectId"] = i;
				if(rank_btn1["selectId"]==this.rankSelectNum){
					rank_btn1.texture = RES.getRes("rank_btnv"+(i+1)+"_jpg");
				}
				rank_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,selectRankFun,this);
				removedListener(rank_btn1,egret.TouchEvent.TOUCH_TAP,selectRankFun,this);
				rankBtnsArr.push(rank_btn1);
			}
		/**排行榜切换事件 */
			function selectRankFun(evt:egret.TouchEvent){
				let evtObj = evt.currentTarget;
				if(this.rankSelectNum==evtObj["selectId"]) return false;
				this.rankSelectNum = evtObj["selectId"];
				for(let i=0;i<rankBtnsArr.length;i++){
					rankBtnsArr[i].texture = RES.getRes("rank_btn"+(i+1)+"_jpg");
				}
				evtObj.texture = RES.getRes("rank_btnv"+(this.rankSelectNum+1)+"_jpg");
			}
		/**监听事件 */
			rank_back.addEventListener(egret.TouchEvent.TOUCH_TAP,rankBackFun,this);
			removedListener(rank_back,egret.TouchEvent.TOUCH_TAP,rankBackFun,this);
			function rankBackFun(){
				// egret.Tween.get(this).to({x:0},300,egret.Ease.quadOut).call(function(){
				// 	this.addListener();
				// },this);
				egret.Tween.get(this).to({scaleX:1,scaleY:1,x:1,y:1},300,egret.Ease.quadOut).call(function(){
					// this.addListener();
				},this);
				egret.Tween.get(this.rankView).to({x:gw - pw_sx},300,egret.Ease.quadOut);
				egret.Tween.get(this.rankLayer).to({x:gw-pw_sx},300,egret.Ease.quadOut).call(function(){
					LremoveChild(this.rankLayer);
				},this);
			}
		}
	/**排行榜 view启动器----*/
		private rankFun1(){
			// this.removeListener();
			this.rankView.x = gw - pw_sx;
			egret.Tween.get(this.rankView).to({x:0},300,egret.Ease.quadOut);

			egret.Tween.get(this).to({scaleX:0.9,scaleY:0.9,x:gw*0.05,y:gh*0.05},300,egret.Ease.quadOut).wait(30).call(function(){
				this.rankLayer = new LRankPage();
				GameLayer.addChild(this.rankLayer);
			},this);

			// egret.Tween.get(this).to({x:-gw*0.2},300,egret.Ease.quadOut).wait(30).call(function(){
			// 	this.rankLayer = new LRankPage();
			// 	GameLayer.addChild(this.rankLayer);
			// },this);
		}
		private removedFun(){
			
		}
	}
}

