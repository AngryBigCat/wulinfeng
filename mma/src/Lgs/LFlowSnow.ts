module Lgs {
	export class LFlowSnow extends egret.DisplayObjectContainer{
		public constructor() {
			super();

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		/**数量 */
		private csNums = 40;
		/**最小缩放大小 +1*/
		private scale1 = 0.7;
		/**最远距离 */
		private maxJuli = gh*0.5;
		/**最小下降速度 */
		private minSudu = gh*0.0015;
		/**最大下降速度 minSudu+maxSudu*/
		private maxSudu = gh*0.0035;
		/**x范围 */
		private csw = gw*0.9;
		
		private onAddToStage(){
			let _THIS = this;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);

			let cddataArr = ["cd1_png","cd2_png","cd3_png","cd4_png","cd5_png","cd6_png","cd7_png","cd8_png","cd9_png"];
			let cdsArr = [];
			for(let i=0;i<this.csNums;i++){
				let cdnum = Math.floor(Math.random()*cddataArr.length);
				let cds = createBitmapByName(cddataArr[cdnum]);
				bgLayer.addChild(cds);
				cds.scaleX = cds.scaleY = initScale*(this.scale1+Math.random());
				cds.rotation = Math.random()*180;
				cds.x = (gw-this.csw)/2 + Math.random()*this.csw;
				cds.y = -GetHeight(cds) - gh*0.1 + Math.random()*gh*0.5;
				cds["speed2"] = Math.random()*this.maxSudu + this.minSudu;
				cds["r0"] = cds.rotation;
				cds["rr"] = 20+Math.random()*20;
				let rss = Math.floor(Math.random()*2);
				if(rss==0){
					cds["rs"] = 3;
				}else{
					cds["rs"] = -3;
				}
				cdsArr.push(cds);

			}

			this.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
			removedListener(this,egret.Event.ENTER_FRAME,onframe,this);
			function onframe(){
				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					thiscds.y += thiscds["speed2"];
					thiscds.rotation += thiscds["rs"];
					if(thiscds.rotation>=thiscds["r0"]+thiscds["rr"]||thiscds.rotation<=thiscds["r0"]+thiscds["rr"]){
						thiscds["rr"] = -thiscds["rr"];
					}
				}

				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					if(thiscds.y>this.maxJuli){
						egret.Tween.get(thiscds).to({alpha:0},500).call(function(){
							addCDS.call(this,thiscds);
						},this);
					}
				}

			}

			function addCDS(thisCDS:egret.Bitmap){
				let cdnum = Math.floor(Math.random()*cddataArr.length);
				// let thisCDS = createBitmapByName(cddataArr[cdnum]);
				thisCDS.texture = RES.getRes(cddataArr[cdnum]);
				// bgLayer.addChild(thisCDS);
				thisCDS.scaleX = thisCDS.scaleY = initScale*(this.scale1+Math.random());
				thisCDS.rotation = Math.random()*180;
				thisCDS.x = (gw-this.csw)/2 + Math.random()*this.csw;
				thisCDS.y = -GetHeight(thisCDS)*2;
				thisCDS["speed2"] = Math.random()*this.maxSudu + this.minSudu;
				thisCDS["r0"] = thisCDS.rotation;
				thisCDS["rr"] = 20+Math.random()*20;
				let rss = Math.floor(Math.random()*2);
				if(rss==0){
					thisCDS["rs"] = 3;
				}else{
					thisCDS["rs"] = -3;
				}
				thisCDS.alpha = 1;
				// cdsArr.push(thisCDS);
			}

		}
		private removedFun(){

		}
	}
}

