module Lgs {
	export class LPrizePage extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?) {
			super();
			if(callback) this.callback=callback;
			if(thisObj) this.thisObj=thisObj;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any = false;
		private thisObj:any = false;
		private onAddToStage(){
			// bgmViewer.hide();
			let _THIS = this;
			this.touchEnabled = true;
		/**背景+元件 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(bgLayer);

			let winBg = createBitmapByName("ruleBg_jpg");
			bgLayer.addChild(winBg);
			winBg.x = gw/2 - GetWidth(winBg)/2;
		// 其他
		/**broadcast */
			let broadcastLayer = new egret.Sprite();
			bgLayer.addChild(broadcastLayer);
			broadcastLayer.graphics.beginFill(0x010E43);
			broadcastLayer.graphics.drawRect(0,0,gw,gh*0.052);
			broadcastLayer.graphics.endFill();
			let bHeight = gh*0.052;

			let broadcast = createBitmapByName("broadcast_png");
			broadcastLayer.addChild(broadcast);
			broadcast.x = pw_sx + gh*0.02;
			broadcast.y = bHeight/2 - GetHeight(broadcast)/2;

			let msgFieldArr = [];
			for(let i=0;i<3;i++){
				let bText = new egret.TextField();
				broadcastLayer.addChild(bText);
				bText.text = "恭喜xxx获得了二等奖亲子游。";
				textScaleFun(bText,0.019);
				bText.x = broadcast.x + GetWidth(broadcast) + gh*0.015;
				if(i==0){
					bText.y = bHeight/2 - GetHeight(bText)/2;
				}else{
					bText.y = -GetHeight(bText);					
				}
				msgFieldArr.push(bText);
			}

			let msgMask = new egret.Sprite();
			bgLayer.addChild(msgMask);
			msgMask.graphics.beginFill(0x000000);
			msgMask.graphics.drawRect(0,0,gw,bHeight);
			msgMask.graphics.endFill();
			msgMask.x = broadcastLayer.x;
			msgMask.y = broadcastLayer.y;
			broadcastLayer.mask = msgMask;

			let msgsArr = [];
			let msg_st = egret.getTimer();
			let msgNum = 0;
			function msgOnframe(){
				let msg_et = egret.getTimer();
				if(msg_et-msg_st>=4000){
					msg_st = msg_et;
					let lastBText = msgFieldArr[msgNum];
					msgNum++;
					if(msgNum>msgFieldArr.length-1){ msgNum = 0;  }
					let nowBText = msgFieldArr[msgNum];

					egret.Tween.get(lastBText).to({alpha:0,y:bHeight},1000);
					nowBText.alpha = 0;
					nowBText.y = -GetHeight(nowBText);
					egret.Tween.get(nowBText).to({alpha:1,y:bHeight/2 - GetHeight(nowBText)/2},1000);
				}
			}
		/**winLayer */
			let winLayer = new egret.Sprite();
			this.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;
		/**prizeBox */
			// let prizeBox = createBitmapByName("prizeBox_png");
			// winLayer.addChild(prizeBox);
			// prizeBox.x = gw/2 - GetWidth(prizeBox)/2;
			// prizeBox.y = gh*0.0935;
		/**按钮 */
			let prizeCloseBtn = createBitmapByName("prizeBack_png");
			// winLayer.addChild(prizeCloseBtn);
			BtnMode(prizeCloseBtn);
			prizeCloseBtn.x = gw/2 - gh*0.2;
			prizeCloseBtn.y = gh*0.121;
			/**历史成绩按钮 */
			let drawHistory = createBitmapByName("drawHistory_png");
			// winLayer.addChild(drawHistory);
			BtnMode(drawHistory);
			drawHistory.x = gw/2 + gh*0.2;
			drawHistory.y = gh*0.121;
		/**监听事件 */
			prizeCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,rankCloseFun,this);
			removedListener(prizeCloseBtn,egret.TouchEvent.TOUCH_TAP,rankCloseFun,this);
			drawHistory.addEventListener(egret.TouchEvent.TOUCH_TAP,historyFun,this);
			removedListener(drawHistory,egret.TouchEvent.TOUCH_TAP,historyFun,this);
			function historyFun(){
				let historyLayer = new historyPage();
				GameLayer.addChild(historyLayer);
			}
		/**ajax提示 */
			let loadField = new egret.TextField();
			// winLayer.addChild(loadField);
			loadField.text = "正在获取我的奖品列表...";
			loadField.textColor = 0xEB5346;
			textScaleFun(loadField,0.022);
			loadField.x = gw/2 - GetWidth(loadField)/2;
			loadField.y = gh*0.38;
		/**Ajax myPrizeAjax */
			// showloading("正在获取我的奖品列表...");
			// myPrizeAjax(function(datas){
				// hideloading();
				// let data = {
				// 	'prizeList':[
				// 		{
				// 			'level':datas.prize_index,
				// 			'name':datas.prize_name,
				// 			'prize_type':datas.prize_type,
				// 			'noTime':datas.noTime
				// 		}
				// 	],
				// 	"msg":datas.prizeArr
				// }
				// prizeView.call(this,data);
				/**others */				
				// let dataMsg = data.msg;
				// msgsArr = dataMsg;
				// for(let i=0;i<msgFieldArr.length;i++){
				// 	msgFieldArr[i].text = msgsArr[i];
				// }
				// broadcastLayer.addEventListener(egret.Event.ENTER_FRAME,msgOnframe,this);
				// removedListener(broadcastLayer,egret.Event.ENTER_FRAME,msgOnframe,this);
			// },function(data){
				// hideloading();
				// loadField.text = '您还没有获得奖品哦';
				// loadField.x = gw/2 - GetWidth(loadField)/2;

				// winLayer.addChild(prizeCloseBtn);
				// winLayer.addChild(drawHistory);

				// let noPrize = createBitmapByName("noPrize_png");
				// winLayer.addChild(noPrize);
				// noPrize.x = gw/2 - GetWidth(noPrize)/2;
				// noPrize.y = gh*0.38;
				// /**others */				
				// let dataMsg = data.prizeArr;
				// msgsArr = dataMsg;
				// console.log(msgsArr[0]);
				// for(let i=0;i<msgFieldArr.length;i++){
				// 	msgFieldArr[i].text = msgsArr[i];
				// }
				// broadcastLayer.addEventListener(egret.Event.ENTER_FRAME,msgOnframe,this);
				// removedListener(broadcastLayer,egret.Event.ENTER_FRAME,msgOnframe,this);
			// },this);
		/**prizeView */
			function prizeView(datas){
				// console.log(datas);
				let data = datas;
				if(data.prizeList.length==0){
					loadField.text = "您还没有获得奖品哦~";
					loadField.x = gw/2 - GetWidth(loadField)/2;

					let noPrize = createBitmapByName("noPrize_png");
					winLayer.addChild(noPrize);
					noPrize.x = gw/2 - GetWidth(noPrize)/2;
					noPrize.y = gh*0.38;
				}else{
					LremoveChild(loadField);
				}
			/**滚动视图范围 */
				let ulLayer = new egret.Sprite();
				ulLayer.touchEnabled = true;
				ulLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE,scrollFun,_THIS);
				removedListener(ulLayer,egret.TouchEvent.TOUCH_MOVE,scrollFun,_THIS);
				function scrollFun(){
					// playAudio("scroll");
				}
				let ulShape = new egret.Shape();
				ulLayer.addChild(ulShape);
				for(let i=0;i<data.prizeList.length;i++){
					if(data.prizeList[i].trophyType!="THANK_YOU"){
						let listLayer = listView.call(this,data.prizeList[i],i+1);
						ulLayer.addChild(listLayer);
						listLayer.y = gh*0.007 + (listLayer["bgheight"]+gh*0.015)*i;
					}
				}

				let scrollView = new egret.ScrollView();
				winLayer.addChild(scrollView);
					winLayer.addChild(prizeCloseBtn);
					winLayer.addChild(drawHistory);
				scrollView.setContent(ulLayer);
				scrollView.width = GetWidth(ulLayer);
				scrollView.height = gh;
				scrollView.x = gw/2 - GetWidth(scrollView)/2;
				scrollView.y = 0;
				scrollView.horizontalScrollPolicy = "off";
				scrollView.verticalScrollPolicy = "on";
				scrollView.scrollSpeed = 0.5;
				scrollView.scrollBeginThreshold = 10;
				scrollView.bounces = false;

				ulShape.graphics.beginFill(0x000000);
				// ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),Math.max(scrollView.height,GetHeight(ulLayer)+gh*0.051));
				ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),GetHeight(ulLayer)+gh*0.051);
				ulShape.graphics.endFill();
				ulShape.alpha = 0;
			/**优化内存 不显示的List visible = false */
				// scrollView.addEventListener(egret.Event.ENTER_FRAME,scrollonframe,_THIS);
				// removedListener(scrollView,egret.Event.ENTER_FRAME,scrollonframe,_THIS);
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
				// let rulebgLayer2 = new egret.Sprite();
				// rulebgLayer2.y = gh*0.05;

				// let ulShape2 = new egret.Shape();
				// rulebgLayer2.addChild(ulShape2);
				// ulShape2.graphics.beginFill(0x000000);
				// ulShape2.graphics.drawRect(0,0,scrollView.width + scrollView.getMaxScrollTop()
				// ,scrollView.height);
				// ulShape2.graphics.endFill();
				// ulShape2.alpha = 1;

				// let scrollView2 = new egret.ScrollView();
				// winLayer.addChild(scrollView2);
				// scrollView2.setContent(rulebgLayer2);
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

				// scrollView2.addEventListener(egret.Event.ENTER_FRAME,timerHand,_THIS);
				// removedListener(scrollView2,egret.Event.ENTER_FRAME,timerHand,_THIS);
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
				// winLayer.addChild(scrollLayer);
				// let scrollbg = createBitmapByName("scrollbg_png");
				// scrollLayer.addChild(scrollbg);
				// scrollbg.alpha = 0;
				// // scrollLayer.visible = false;
				// if(data.prizeList.length==0){
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
				// 			"obj":scrolls,
				// 			"stage":scrolls,
				// 			"moveStage":_THIS,
				// 			"callStage":_THIS
				// 		},{
				// 			"downFun":function(obj){
				// 				egret.ScrollTween.removeTweens(scrollView);
				// 				isDrag = true;
				// 			},
				// 			"moveFun":function(obj){},
				// 			"upFun":function(obj){
				// 				egret.ScrollTween.removeTweens(scrollView);
				// 				isDrag = false;	
				// 			},
				// 		},{
				// 			"downObj":0,
				// 			"moveObj":0,
				// 			"upObj":0
				// 	},"y");
				// }

				// scrollLayer.addChild(scrolls);
				// scrolls.mask = scrollsMask;
				// scrolls.x = GetWidth(scrollbg)/2 - GetWidth(scrolls)/2;
				// scrollLayer.x = scrollView.x + GetWidth(scrollView) + gh*0.005;
				// scrollLayer.y = scrollView.y + GetHeight(scrollView)/2 - GetHeight(scrollLayer)/2 - 0;
				// /**滚动条的滚动高度 */
				// let scrollLayerH = GetHeight(scrollLayer) - GetHeight(scrolls);
				// /**最大距离 */
				// let maxHeight = GetHeight(ulLayer) - GetHeight(scrollView);
				// scrollLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,_THIS);
				// removedListener(scrollLayer,egret.Event.ENTER_FRAME,onframe,_THIS);
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
				BtnMode(winLayer,true);
				winLayer.x = gw/2;
				winLayer.scaleX = winLayer.scaleY = 0;
				egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},280,egret.Ease.quadOut);
				bgLayer.alpha = 0;
				egret.Tween.get(bgLayer).to({alpha:1},320,egret.Ease.quadOut);
			}
		/**listView */
			function listView(oneData,ranksnum):egret.Sprite{				
				let listLayer = new egret.Sprite();
			/**listBg */
				let listBg = createBitmapByName("plistBg_png");
				listLayer.addChild(listBg);
				listLayer["bgheight"] = GetHeight(listBg);
				listBg.y = listLayer["bgheight"] - GetHeight(listBg) + gh*0.21 + gh*0.08;
				let liWidth = GetWidth(listBg);

				let descPic = "";
				if(oneData.level=="1"){
					descPic = "prize1_png";
				}else if(oneData.level=="2"){
					descPic = "prize2_png";
				}else if(oneData.level=="3"){
					descPic = "prize3_png";
				}else if(oneData.level=="4"){
					descPic = "prize4_png";
				}
				let pDesc = createBitmapByName(descPic);
				listLayer.addChild(pDesc);
				pDesc.x = liWidth/2 - GetWidth(pDesc)/2;
				pDesc.y = gh*0.075 + gh*0.21 + gh*0.08;
			/**其他 */
				let yeti = createBitmapByName("yeti_png");
				listLayer.addChild(yeti);
				yeti.x = gh*0.38;
				yeti.y = gh*0.18;
			/**使用/领取按钮 */
				let useBtn = createBitmapByName("lqBtn_png");
				listLayer.addChild(useBtn);
				useBtn.x = liWidth/2 - GetWidth(useBtn)/2;
				// useBtn.y = gh*0.405 + gh*0.21;
				useBtn.y = gh*0.67 + gh*0.05;
				BtnMode(useBtn);

				let hxBtn = createBitmapByName("hxBtn_png");
				listLayer.addChild(hxBtn);
				hxBtn.x = liWidth/2 - GetWidth(hxBtn)/2;
				// hxBtn.y = gh*0.525 + gh*0.21;
				hxBtn.y = gh*0.67 + gh*0.05;
				BtnMode(hxBtn);

				if(oneData.prize_type==1){
					useBtn.visible = true;
					hxBtn.visible = false;
				}else if(oneData.prize_type==2){
					useBtn.visible = false;
					hxBtn.visible = true;
				}else if(oneData.prize_type==3){
					useBtn.visible = false;
					hxBtn.visible = true;
					hxBtn.texture = RES.getRes('hxedBtn_png');
				}

				useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,useFun,this);
				removedListener(useBtn,egret.TouchEvent.TOUCH_TAP,useFun,this);
				if(oneData.prize_type!=3){
					hxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,hxFun,this);
					removedListener(hxBtn,egret.TouchEvent.TOUCH_TAP,hxFun,this);
				}
			/**领取 */
				function useFun(){
					if(oneData.noTime){
						LAlert("活动已结束不能领奖了哦~");
					}else{
						prize_index = oneData.level;
						$(".reward").html(oneData.name);
						$(".liuzi").show();
						myPrizeLayer = listLayer;
						listLayer.once("liziComplete",liuziComplete,this);
						removedListener(listLayer,"liziComplete",liuziComplete,this)
					}
					function liuziComplete(){
						useBtn.visible = false;
						hxBtn.visible = true;
					}
				}
			/**核销 */
				function hxFun(){
					let hxLayer = new egret.Sprite();
					GameLayer.addChild(hxLayer);
					hxLayer.touchEnabled = true;

					let hxShape = new egret.Shape();
					hxLayer.addChild(hxShape);
					hxShape.graphics.beginFill(0x000000);
					hxShape.graphics.drawRect(0,0,gw,gh);
					hxShape.graphics.endFill();
					hxShape.alpha = 0.6;

					let hxBg = createBitmapByName("hxBg_png");
					hxLayer.addChild(hxBg);
					hxBg.x = gw/2 - GetWidth(hxBg)/2;
					hxBg.y = gh*0.286;
					/**input */

					let hxInput = new egret.TextField();
					hxLayer.addChild(hxInput);
					textScaleFun(hxInput,0.024);
					hxInput.type = egret.TextFieldType.INPUT;
					hxInput.bold = true;
					hxInput.textColor = 0x011657;
					// hxInput.text = "KLSA9D4TJU";
					hxInput.text = "";
					hxInput.height = gh*0.028;
					hxInput.width = gh*0.22;
					hxInput.x = gw/2 - gh*0.06;
					hxInput.y = gh*0.395;
				/**按钮 */
					let sureBtn = createBitmapByName("zjSure_png");
					hxLayer.addChild(sureBtn);
					BtnMode(sureBtn);
					sureBtn.x = gw/2;
					sureBtn.y = gh*0.558;

					let outBtn = createBitmapByName("hxClose_png");
					hxLayer.addChild(outBtn);
					BtnMode(outBtn);
					outBtn.x = gw/2 + gh*0.2;
					outBtn.y = gh*0.29;
				/**事件 */
					sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
					removedListener(sureBtn,egret.TouchEvent.TOUCH_TAP,submitFun,this);
					function submitFun(){
						let hxCode = hxInput.text.replace(/\s+/g,"");
						if(hxCode){
						// 核销Ajax
							// showloading();
							// veriAjax(hxCode,function(data){
							// 	hideloading();
							// 	LAlert(data.msg);
							// 	LremoveChild(hxLayer);
							// 	hxBtn.texture = RES.getRes('hxedBtn_png');
							// 	hxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,hxFun,this);
							// },function(data){
							// 	LAlert(data.msg);
							// 	hideloading();
							// },this);
						}						
					}

					outBtn.once(egret.TouchEvent.TOUCH_TAP,outFun,this);
					removedListener(outBtn,egret.TouchEvent.TOUCH_TAP,outFun,this);
					function outFun(){
						LremoveChild(hxLayer);
					}
				}
			/**样式替换 ----*/
				// if(oneData.biaoji==0){

				// }
			/** */
				return listLayer;
			}
			// function (){

			// }
		/**退出/关闭 */
			function rankCloseFun(){
				playAudio("touchBtn",0);
				// egret.Tween.get(bgLayer).to({alpha:0},320);
				// egret.Tween.get(winLayer).to({alpha:0,scaleX:0,scaleY:0},320,egret.Ease.backIn).call(function(){
				// 	LremoveChild(this);
				// },this);
				egret.Tween.get(this).to({alpha:0},320).call(function(){
					LremoveChild(this);
					if(this.callback){
						this.callback.call(this.thisObj);
					}
				},this);
			}
		/**forTest */

		}
		private removedFun(){
			
		}

	}
}