module Lgs {
	export class historyPage extends egret.DisplayObjectContainer{
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
		private onAddToStage(){
			bgmViewer.show();
			let _THIS = this;
			this.touchEnabled = true;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let winLayer = new egret.Sprite();
			this.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;
			let homebg = createBitmapByName("ruleBg_jpg");
			bgLayer.addChild(homebg);
			homebg.x = gw/2 - GetWidth(homebg)/2;
		/**按钮 */
			let backBtn = createBitmapByName("prizeBack_png");
			winLayer.addChild(backBtn);
			BtnMode(backBtn);
			backBtn.x = gw/2 - gh*0.19;
			backBtn.y = gh*0.075;
		/**其他元件 */
			let title = createBitmapByName("historyTitle_png");
			bgLayer.addChild(title);
			title.x = gw/2 - gh*0.055;
			title.y = gh*0.06;

			let titlex = title.x;
			title.x = backBtn.x - GetWidth(backBtn);
			egret.Tween.get(title).to({alpha:1,x:titlex},320);
		/**事件监听 */
			backBtn.once(egret.TouchEvent.TOUCH_TAP,outFun,this);
			removedListener(backBtn,egret.TouchEvent.TOUCH_TAP,outFun,this);
			function outFun(){
				egret.Tween.get(this).to({alpha:0},320).call(function(){
					LremoveChild(this);
				},this);
			}
		/**ajax提示 */
			let loadField = new egret.TextField();
			winLayer.addChild(loadField);
			loadField.text = "正在获取排行榜...";
			loadField.fontFamily = "YaHei";
			loadField.textColor = 0xffffff;
			textScaleFun(loadField,0.028);
			loadField.x = gw/2 - GetWidth(loadField)/2;
			loadField.y = gh*0.38;
		/**Ajax */
			// showloading();
			// historyAjax(function(datas){
			// 	hideloading();
			// 	let data = {
			// 		"historyList":datas.historyArr
			// 	}
			// 	rankView.call(this,data);
			// },function(datas){
			// 	hideloading();
			// 	let data = {
			// 		"historyList":datas.historyArr
			// 	}
			// 	rankView.call(this,data);
			// },this);
		/**rankView */
			function rankView(datas){
				// console.log(datas);				
				let data = datas;
				if(data.historyList.length==0){
					loadField.text = "你目前还没有历史成绩哦！";
					loadField.x = gw/2 - GetWidth(loadField)/2;
				}else{
					winLayer.removeChild(loadField);
				}
			/**滚动视图范围 */
				let ulLayer = new egret.Sprite();
				ulLayer.touchEnabled = true;
				let ulShape = new egret.Shape();
				ulLayer.addChild(ulShape);
				for(let i=0;i<data.historyList.length;i++){
					let listLayer = listView(data.historyList[i],i+1);
					ulLayer.addChild(listLayer);
					listLayer.y = gh*0.01 + (listLayer["bgheight"])*i;
				}

				let scrollView = new egret.ScrollView();
				winLayer.addChild(scrollView);
				scrollView.setContent(ulLayer);
				scrollView.width = GetWidth(ulLayer);
				scrollView.height = gh*0.81;
				scrollView.x = gw/2 - GetWidth(scrollView)/2;
				scrollView.y = gh*0.155;
				scrollView.horizontalScrollPolicy = "off";
				scrollView.verticalScrollPolicy = "on";
				scrollView.scrollSpeed = 0.5;
				scrollView.scrollBeginThreshold = 10;
				scrollView.bounces = true;

				ulShape.graphics.beginFill(0x000000);
				ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),GetHeight(ulLayer)+gh*0.051);
				ulShape.graphics.endFill();
				ulShape.alpha = 0;
			/**优化内存 不显示的List visible = false */
				scrollView.addEventListener(egret.Event.ENTER_FRAME,scrollonframe,_THIS);
				removedListener(scrollView,egret.Event.ENTER_FRAME,scrollonframe,_THIS);
				function scrollonframe(){
					for(let i=0;i<ulLayer.numChildren;i++){
						let listObj = ulLayer.getChildAt(i);
						if(listObj.y+listObj.height*2<scrollView.scrollTop||listObj.y-listObj.height>=scrollView.scrollTop+scrollView.height){
							if(listObj.visible){
								listObj.visible = false;
								egret.Tween.removeTweens(listObj);
							}
						}else{
							if(!listObj.visible){
								listObj.visible = true;
								listObj.scaleX = listObj.scaleY = 0;
								listObj.x = listObj.width/2;
								egret.Tween.get(listObj).to({x:0,scaleX:1,scaleY:1},320,egret.Ease.circOut);
							}
						}
					}
				}
			}
		/**listView */
			function listView(oneData,ranksnum):egret.Sprite{				
				let listLayer = new egret.Sprite();
			/**listBg */
				let listBg = createBitmapByName("hitListbg_png");
				listLayer.addChild(listBg);
				listLayer["bgheight"] = GetHeight(listBg) + gh*0.03;
				// listBg.y = listLayer["bgheight"] - GetHeight(listBg);
			/**成绩 */
				let scoreField = new egret.TextField();
				listLayer.addChild(scoreField);
				textScaleFun(scoreField,0.037);
				scoreField.fontFamily = "YaHei";
				scoreField.text = "成绩："+oneData.score+"金币";
				scoreField.textColor = 0x001850;
				scoreField.x = GetWidth(listBg)/2 - GetWidth(scoreField)/2;
				scoreField.y = gh*0.023;
			/**时间 */
				let timeField = new egret.TextField();
				listLayer.addChild(timeField);
				textScaleFun(timeField,0.028);
				timeField.fontFamily = "YaHei";
				timeField.text = oneData.endTime;
				timeField.textColor = 0x3AA6F1;
				timeField.x = GetWidth(listBg)/2 - GetWidth(timeField)/2;
				timeField.y = gh*0.075;
			/** */
				return listLayer;
			}
		/**弹出动画 */
			winLayer.alpha = 0;
			egret.Tween.get(winLayer).to({alpha:1},280,egret.Ease.quadOut);
			bgLayer.alpha = 0;
			egret.Tween.get(bgLayer).to({alpha:1},320,egret.Ease.quadOut);
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
