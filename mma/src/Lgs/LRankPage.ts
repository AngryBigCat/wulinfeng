module Lgs {
	export class LRankPage extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?,rankData?,num?) {
			super();
			if(callback) this.callback=callback;
			if(thisObj) this.thisObj=thisObj;
			if(rankData) this.rankData=rankData;
			if(num) this.closeNum=num;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any = false;
		private thisObj:any = false;
		/**关闭方式 */
		private closeNum = 1;
		private rankData:any = false;

		private bgLayer;
		private fgLayer;
		private winLayer;
		private rankShape;
		private listWidth;
		private listHeight;
		private onAddToStage(){
			// bgmViewer.hide();
			let _THIS = this;
			this.touchEnabled = true;
		/**层级 */
			this.bgLayer = new egret.Sprite();
			this.addChild(this.bgLayer);
			this.winLayer = new egret.Sprite();
			this.addChild(this.winLayer);
			this.fgLayer = new egret.Sprite();
			this.addChild(this.fgLayer);
		/**背景 */
			this.rankShape = makeaShape(0x000000,0.7);
			this.bgLayer.addChild(this.rankShape);

			let rankbg = createBitmapByName("rankbg_png");
			this.winLayer.addChild(rankbg);
			rankbg.x = gw/2 - GetWidth(rankbg)/2;
			rankbg.y = gh*0.091;
		/**我的排名(样式) */
			let myRankLayer = new egret.Sprite();
			this.winLayer.addChild(myRankLayer);
			myRankLayer.y = gh*0.22;
			/**排名 */
			let myrankField = new egret.TextField();
			myRankLayer.addChild(myrankField);
			textScaleFun(myrankField,0.024,0x5B5B5C);
			myrankField.bold = true;
			// myrankField.stroke = 3;
			// myrankField.strokeColor = 0x000000;
			myrankField.text = "未上榜";
			myrankField.x = gw/2 - gh*0.098;
			// myrankField.y = 0;
			/**分数 */
			let myrankScore = new egret.TextField();
			myRankLayer.addChild(myrankScore);
			textScaleFun(myrankScore,0.026);
			myrankScore.bold = true;
			myrankScore.stroke = 3;
			myrankScore.strokeColor = 0x000000;
			myrankScore.text = "0";
			myrankScore.x = gw/2 + gh*0.15 - GetWidth(myrankScore)/2;
			// myrankScore.y = 0;
		/**ajax提示 */
			let loadField = new egret.TextField();
			this.winLayer.addChild(loadField);
			textScaleFun(loadField,0.024,0x096388);
			loadField.bold = true;
			loadField.text = "正在获取排行榜...";
			loadField.x = gw/2 - GetWidth(loadField)/2;
			loadField.y = gh*0.4;
		/**Ajax getRank */
			showloading();
			if(!this.rankData){
				getRanklistAjax(function(data){
					// data.ranklist = [];
					rankView.call(this,data);
				},function(data){
					hideloading();
					LAlert(data.msg);
					loadField.text = data.msg;
					loadField.x = gw/2 - GetWidth(loadField)/2;
				},this);
			}else{
				rankView.call(this,this.rankData);
			}
			// hideloading();
		/**按钮 */
			let rank_back = createBitmapByName("closeBtn_png");
			// this.winLayer.addChild(rank_back);
			BtnMode(rank_back);
			// rank_back.x = gw - pw_sx - GetWidth(rank_back)/2 - gh*0.015;
			rank_back.x = gw/2;
			rank_back.y = gh*0.89;
		/**监听事件 */
			rank_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankCloseFun,this);
			removedListener(rank_back,egret.TouchEvent.TOUCH_TAP,this.rankCloseFun,this);
		/**rankView */
			function rankView(datas){
				hideloading();
				// console.log(datas);				
				let data = datas;
				if(data.ranklist.length==0){
					loadField.text = "暂时还没有人进入排行榜哦！";
					loadField.x = gw/2 - GetWidth(loadField)/2;
				}else{
					LremoveChild(loadField);
				}
			/**我的排名(设置) */
				if(data.player.playerRank!=0){
					myrankField.text = data.player.playerRank;
					textScaleFun(myrankField,0.026,0xffffff);
					myrankField.stroke = 3;
					myrankField.strokeColor = 0x000000;
					myrankField.x = gw/2 - gh*0.1;
					
				}
				if(!data.player.topScore){
					data.player.topScore = 0;
				}
				myrankScore.text = data.player.topScore+"";
				myrankScore.x = gw/2 + gh*0.15 - GetWidth(myrankScore)/2;
			/**滚动视图范围 scrollView */
				let ulLayer = new egret.Sprite();
				// ulLayer.touchEnabled = true;
				let ulShape = new egret.Shape();
				ulLayer.addChild(ulShape);
				for(let i=0;i<data.ranklist.length;i++){
					let listLayer = listView.call(this,data.ranklist[i],i+1);
					ulLayer.addChild(listLayer);
					listLayer.y = gh*0.02 + (this.listHeight)*i;
				}

				let scrollView = new egret.ScrollView();
				this.winLayer.addChild(scrollView);
				scrollView.setContent(ulLayer);
				scrollView.width = this.listWidth;
				scrollView.height = gh*0.602;
				scrollView.x = gw/2 - GetWidth(scrollView)/2;
				scrollView.y = gh*0.261;
				scrollView.horizontalScrollPolicy = "off";
				scrollView.verticalScrollPolicy = "on";
				scrollView.scrollSpeed = 0.5;
				scrollView.scrollBeginThreshold = 1;
				scrollView.bounces = true;

				this.winLayer.addChild(rank_back);
				ulShape.graphics.beginFill(0x000000);
				// ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),Math.max(scrollView.height,GetHeight(ulLayer)+gh*0.051));
				ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),Math.max(scrollView.height,GetHeight(ulLayer)+gh*0.051));
				ulShape.graphics.endFill();
				ulShape.alpha = 0;
			/**优化内存 不显示的List visible = false */
				// scrollView.addEventListener(egret.Event.ENTER_FRAME,scrollonframe,this);
				// removedListener(scrollView,egret.Event.ENTER_FRAME,scrollonframe,this);
				// function scrollonframe(){
				// 	for(let i=0;i<ulLayer.numChildren;i++){
				// 		let listObj = ulLayer.getChildAt(i);
				// 		if(listObj.y+listObj.height*2<scrollView.scrollTop||listObj.y-listObj.height>=scrollView.scrollTop+scrollView.height){
				// 			if(listObj.visible){
				// 				// egret.Tween.removeTweens(listObj);
				// 				listObj.visible = false;
				// 			}
				// 		}else{
				// 			if(!listObj.visible){
				// 				// listObj.scaleX = listObj.scaleY = 0;
				// 				// listObj.x = listObj.width/2;
				// 				// egret.Tween.get(listObj).to({x:0,scaleX:1,scaleY:1},320,egret.Ease.circOut);
				// 				listObj.visible = true;
				// 			}
				// 		}
				// 	}
				// }
			/**相反的 */
				// let rankbgLayer2 = new egret.Sprite();
				// rankbgLayer2.y = gh*0.05;

				// let ulShape2 = new egret.Shape();
				// rankbgLayer2.addChild(ulShape2);
				// ulShape2.graphics.beginFill(0x000000);
				// ulShape2.graphics.drawRect(0,0,scrollView.width + scrollView.getMaxScrollTop()
				// ,scrollView.height);
				// ulShape2.graphics.endFill();
				// ulShape2.alpha = 1;

				// let scrollView2 = new egret.ScrollView();
				// this.winLayer.addChild(scrollView2);
				// scrollView2.setContent(rankbgLayer2);
				// scrollView2.width = scrollView.width;
				// scrollView2.height = scrollView.height;
				// scrollView2.x = gw/2 - GetWidth(scrollView2)/2 - gh*0.01;
				// scrollView2.y = gh*0.278;
				// scrollView2.horizontalScrollPolicy = "on";
				// scrollView2.verticalScrollPolicy = "off";
				// scrollView2.scrollSpeed = 0.32;
				// scrollView2.scrollBeginThreshold = 10;
				// scrollView2.bounces = true;
				// scrollView2.alpha = 0;

				// scrollView2.addEventListener(egret.Event.ENTER_FRAME,timerHand,this);
				// removedListener(scrollView2,egret.Event.ENTER_FRAME,timerHand,this);
				// // console.log(scrollView.getMaxScrollTop());
				// // console.log(scrollView2.getMaxScrollLeft());
				// scrollView2.scrollLeft = scrollView.getMaxScrollTop();
				// function timerHand(){
				// 	scrollView.scrollTop = scrollView.getMaxScrollTop() - scrollView2.scrollLeft;
				// 	// console.log(scrollView.scrollTop);
				// 	// console.log(scrollView2.scrollLeft);
				// }
				// /**相反的 end */
				// for(let i=0;i<ulLayer.numChildren;i++){
				// 	let listObj = ulLayer.getChildAt(i);
				// 	listObj.anchorOffsetX = listObj.width/2;
				// 	listObj.x = listObj.anchorOffsetX*listObj.scaleX;					
				// }
			/**滚动条 */
				// let scrollLayer = new egret.Sprite();
				// this.winLayer.addChild(scrollLayer);
				// let scrollbg = createBitmapByName("scrollbg_png");
				// scrollLayer.addChild(scrollbg);
				// scrollbg.alpha = 0;
				// // scrollLayer.visible = false;
				// if(data.ranklist.length==0){
				// 	scrollLayer.visible = false;
				// }
				// // let scrollsMask = createBitmapByName("scrollbg_png");
				// // scrollLayer.addChild(scrollsMask);
				// scaleYFun(scrollbg,scrollView.height/gh);
				// // scaleYFun(scrollsMask,scrollView.height/gh);
				// let scrollsMask = new egret.Shape();;
				// scrollLayer.addChild(scrollsMask);
				// scrollsMask.graphics.beginFill(0x000000);
				// scrollsMask.graphics.drawRect(0,0,GetWidth(scrollbg),GetHeight(scrollbg));
				// scrollsMask.graphics.endFill();
				// let scrolls = createBitmapByName("scrolls_png");
				// if(GetHeight(ulLayer)>GetHeight(scrollView)){
				// 	let scrollsH = GetHeight(scrollView)/GetHeight(ulLayer) * GetHeight(scrollLayer);
				// 	// scaleYFun(scrolls,scrollsH/gh);
				// }else{
				// 	// scaleYFun(scrolls,GetHeight(scrollLayer)/gh);				
				// }
				// let isDrag = false;
				// if(GetHeight(ulShape)>scrollView.height){
				// 	DragFun({
				// 		"obj":scrolls,
				// 		"stage":scrolls,
				// 		"moveStage":this,
				// 		"callStage":this
				// 	},{
				// 		"downFun":function(obj){
				// 			egret.ScrollTween.removeTweens(scrollView);
				// 			isDrag = true;
				// 		},
				// 		"moveFun":function(obj){},
				// 		"upFun":function(obj){
				// 			egret.ScrollTween.removeTweens(scrollView);
				// 			isDrag = false;	
				// 		},
				// 	},{
				// 		"downObj":0,
				// 		"moveObj":0,
				// 		"upObj":0
				// 	},"y");
				// }

				// scrollLayer.addChild(scrolls);
				// scrolls.mask = scrollsMask;
				// scrolls.x = GetWidth(scrollbg)/2 - GetWidth(scrolls)/2;
				// scrollLayer.x = scrollView.x + GetWidth(scrollView) + gh*0.013;
				// scrollLayer.y = scrollView.y + GetHeight(scrollView)/2 - GetHeight(scrollLayer)/2 - 0;
				// /**滚动条的滚动高度 */
				// let scrollLayerH = GetHeight(scrollLayer) - GetHeight(scrolls);
				// /**最大距离 */
				// let maxHeight = GetHeight(ulLayer) - GetHeight(scrollView);
				// scrollLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
				// removedListener(scrollLayer,egret.Event.ENTER_FRAME,onframe,this);
				// function onframe(){
				// 	if(isDrag){
				// 		let scrollsy = scrolls.y;
				// 		if(scrollsy<0){
				// 			scrollsy = 0;
				// 		}
				// 		if(scrollsy>scrollLayerH){
				// 			scrollsy = scrollLayerH;
				// 		}
				// 		scrollView.scrollTop = maxHeight*scrollsy/(scrollLayerH);
				// 	}else{
				// 		let scrollsy = scrollView.scrollTop/maxHeight*scrollLayerH;
				// 		scrolls.y = scrollsy;
				// 	}
				// }
			/**弹出动画 */
				// BtnMode(this.winLayer,true);
				// this.winLayer.x = gw/2;
				// this.winLayer.scaleX = this.winLayer.scaleY = 0;
				// egret.Tween.get(this.winLayer).to({scaleX:1,scaleY:1},280,egret.Ease.backOut);
				// rankBg.alpha = 0;
				// egret.Tween.get(rankBg).to({alpha:1},320);
			}
		/**listView */
			function listView(oneData,ranksnum):egret.Sprite{				
				let listLayer = new egret.Sprite();
			/**listBg */
				let listBg = createBitmapByName("listBg_png");
				listLayer.addChild(listBg);
				if(ranksnum==1) {
					this.listWidth = GetWidth(listBg);
					this.listHeight = GetHeight(listBg) + gh*0.011;
				};
				// listBg.y = this.listHeight - GetHeight(listBg);
				// listBg.alpha = 0.5;
			/**头像 */
				let headLayer = new egret.Sprite();
				let headIndex = listLayer.getChildIndex(listBg);
				listLayer.addChildAt(headLayer,headIndex);
				/**没有头像的背景 */
				let headBg = createBitmapByName("headBg_jpg");
				headBg.x = gh*0.01;
				headBg.y = GetHeight(listBg)/2- GetHeight(headBg)/2;
				// headLayer.addChild(headBg);
				addBitmapByUrl(headBg.x,headBg.y,GetHeight(headBg),headLayer,oneData.headImg,"headImg");
			/**排名+昵称 */
				let ranksField = new egret.TextField();
				listLayer.addChild(ranksField);
				textScaleFun(ranksField,0.025,0xF03353);
				/**太多排名时用来缩小字体 */
				// ranksField.text = ranksnum;
				// textScaleXFun(ranksField,ranksField.text,0.05,0.08);
				ranksField.bold = true;
				// ranksField.text = "NO."+ranksnum+"";
				ranksField.textFlow = <Array<egret.ITextElement>>[
					{text: "NO."+ranksnum+"", style: {"size": 28.5}}
					,{text: "\n", style: {}}
					,{text: oneData.nickName.substring(0,10), style: {"textColor":0x157086,"size": 23.75}}

				];
				ranksField.x = gh*0.09;
				ranksField.y = gh*0.018;
				// BtnMode(ranksField,true);
				/**特殊字体 */
				// let ranksField = new egret.BitmapText();
				// listLayer.addChild(ranksField);
				// ranksField.font = RES.getRes("rankNum_fnt");
				// ranksField.text = ranksnum+"";
				// BtnMode(ranksField,true);
				// ranksField.x = gh*0.083;
				// ranksField.y = this.listHeight/2;
				if(ranksnum==1||ranksnum==2||ranksnum==3){
					// ranksField.visible = false;
					let rankPlate = createBitmapByName("plate"+ranksnum+"_png");
					// BtnMode(rankPlate,true);
					listLayer.addChild(rankPlate);
					rankPlate.x = ranksField.x + GetWidth(ranksField) + gh*0.005;
					rankPlate.y = ranksField.y + gh*0.004;
				}
			/**昵称 */
				// let nickName = new egret.TextField();
				// listLayer.addChild(nickName);
				// textScaleFun(nickName,0.02,0x157086);
				// nickName.size = 23.75;
				// nickName.bold = true;
				// nickName.text = oneData.nickName.substring(0,10);
				// nickName.width = gh*0.11;
				// nickName.textAlign = "left";
				// nickName.lineSpacing = gh*0.001;
				// nickName.x = ranksField.x ;
				// nickName.y = gh*0.05;
			/**成绩 */
				let scoreField = new egret.TextField();
				listLayer.addChild(scoreField);
				textScaleFun(scoreField,0.026,0xF03353);
				scoreField.bold = true;
				scoreField.text = oneData.topScore;
				scoreField.x = gh*0.39 - GetWidth(scoreField);
				scoreField.y = GetHeight(listBg)/2 - GetHeight(scoreField)/2;

				let scoreField2 = new egret.TextField();
				listLayer.addChild(scoreField2);
				textScaleFun(scoreField2,0.018,0xF03353);
				scoreField2.bold = true;
				scoreField2.text = "亿";
				scoreField2.x = scoreField.x + GetWidth(scoreField) + gh*0.005;
				scoreField2.y = scoreField.y + GetHeight(scoreField) - GetHeight(scoreField2);
			//
				// ranksField.cacheAsBitmap=true;
				// nickName.cacheAsBitmap=true;
				// scoreField.cacheAsBitmap=true;
				// scoreField2.cacheAsBitmap=true;
			/**用时---- */
				// let useTimeField = new egret.TextField();
				// listLayer.addChild(useTimeField);
				// useTimeField.text = Math.round(oneData.useTime/1000)+"s";
				// useTimeField.textColor = 0x555555;
				// textScaleFun(useTimeField,0.024);
				// useTimeField.x = gh*0.595 - GetWidth(useTimeField)/2;
				// useTimeField.y = this.listHeight/2 - GetHeight(useTimeField)/2;
			/**样式替换 ----*/

			/** */
				return listLayer;
			}

		/**动画 */
			winEnterAni(this.rankShape,this.winLayer,"scale01");
		/**forTest */
		
		}

		private rankCloseFun(){
			// playAudio("toucuBtn",0);
			if(this.callback) this.callback.call(this.thisObj);
			winCloseAni(this.rankShape,this.winLayer,"scale01",()=>{
				LremoveChild(this);
			},this);
		}

		private removedFun(){

		}

	}
}