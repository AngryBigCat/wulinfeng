module Lgs {
	export class LInput extends egret.DisplayObjectContainer{
		public constructor(textHeight?:number,defaultField?:string) {
			super();
			if(textHeight){
				this.textHeight = textHeight;
			}
			if(defaultField){
				this.defaultText = defaultField;
			}
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}

		/**inputBg */
		public inputBg:any;
		/**input本体 */
		public input:egret.TextField;
		/**是否输入 */
		public inputed:boolean = false;
		/**输入提示bitmap */
		public inputtips:any;
		/**文本高度 */
		private textHeight:number = 0.024;
		/**输入提示text */
		private defaultText:string = "";
		private defaultColor:number = 0x000000;
		private default2Color:number = 0x000000;

		/**
		 * @ inputBg {textureName}.
		 * @ inputtips {textureName}.
		 * @ inputPosition {x,y,width,height}.
		 */
		public setBg(inputBg:any,inputtips:any,inputPosition?:any,textHeight?){
			if(inputBg){
				LremoveChild(this.inputBg);
				this.inputBg = inputBg;
				this.addChildAt(this.inputBg,0);
			}else{
				// forTest1
				LremoveChild(this.inputBg);
			}
			if(inputtips){
				LremoveChild(this.inputtips);
				this.inputtips = inputtips;
				this.addChild(this.inputtips);
				this.inputtips.x = inputtips.x;
				this.inputtips.y = inputtips.y;
			}else{
				LremoveChild(this.inputtips);
			}
			if(inputPosition){
				this.input.x = inputPosition.x;
				this.input.y = inputPosition.y;
				this.input.width = inputPosition.width;
				this.input.height = inputPosition.height;
				// forTest2
				// this.inputBg.graphics.clear();
				// this.inputBg.graphics.beginFill(0xff0000);
				// this.inputBg.graphics.drawRect(inputPosition.x,inputPosition.y,inputPosition.width,inputPosition.height);
				// this.inputBg.graphics.endFill();
			}
			if(textHeight){
				this.textHeight = textHeight;
				textScaleFun(this.input,this.textHeight);	
			}
		}

		private onAddToStage(){
			let _THIS = this;

			// this.inputBg = createBitmapByName("formInput_png");
			// this.addChild(this.inputBg);
			this.inputBg = new egret.Shape();
			this.addChild(this.inputBg);
			this.inputBg.graphics.beginFill(0xff0000);
			this.inputBg.graphics.drawRect(0,0,gh*0.4,gh*0.08);
			this.inputBg.graphics.endFill();
			this.inputBg.alpha = 0.5;

			this.inputtips = createBitmapByName("formtips_png");
			// this.addChild(this.inputtips);
			// this.inputtips.x = GetWidth(this.inputBg)/2 - GetWidth(this.inputtips)/2;
			// this.inputtips.y = 40;

			this.input = new egret.TextField();
			this.addChild(this.input);
			this.input.textColor = 0x000000;
			textScaleFun(this.input,this.textHeight);
			this.input.type = egret.TextFieldType.INPUT;
			this.input.x = gh*0.01;
			// this.input.y = 20;
			this.input.width = GetWidth(this.inputBg)-gh*0.02;
			this.input.height = GetHeight(this.inputBg)-20;
			this.input.textAlign = "left";
			this.input.verticalAlign = "middle";
			// this.input.maxChars = 12;
			// this.input.inputType = "tel";
			// this.input.setFocus();
			this.setDefault(this.defaultText);

			this.input.addEventListener(egret.FocusEvent.FOCUS_IN,this.focusIn,this);
			this.input.addEventListener(egret.FocusEvent.FOCUS_OUT,this.focusOut,this);
		}

		private focusIn(){
			this.input.textAlign = "left";
			if(!this.inputed){
				this.input.textColor = this.defaultColor;
				this.input.alpha = 0.9;
				this.input.text = "";
				this.inputtips.alpha = 0;
			}			
		}
		private focusOut(){
			this.input.textAlign = "left";				
			if(this.input.text == ""){
				this.input.text = this.defaultText;
				this.input.textColor = this.default2Color;
				this.input.alpha = 0.6;
				this.inputtips.alpha = 1;
				this.inputed = false;
			}else{
				this.inputed = true;
			}
		}

		public setVal(string1:string){
			this.input.textAlign = "left";
			this.input.text = string1;
			if(this.input.text == ""){
				this.input.text = this.defaultText;
				this.input.textColor = this.default2Color;
				this.input.alpha = 0.6;
				this.inputtips.alpha = 1;
				this.inputed = false;
			}else{
				this.input.textColor = this.defaultColor;
				this.input.alpha = 0.9;
				this.inputtips.alpha = 0;
				this.inputed = true;
			}
		}

		public setDefault(text:string,defaultColor?:number,defaultColor2?:number){
			this.defaultText = text;
			this.input.text = text;
			if(defaultColor){
				this.defaultColor = defaultColor;
				this.default2Color = defaultColor2;
			}
			if(defaultColor2){
				this.default2Color = defaultColor2;
			}
			this.input.textColor = this.default2Color;
			this.input.alpha = 0.6;
		}

		private removedFun(){
			this.input.removeEventListener(egret.FocusEvent.FOCUS_IN,this.focusIn,this);
			this.input.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.focusOut,this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
	}
}
