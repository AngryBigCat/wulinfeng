module Lgs {
	export class LScreenShot{
		public constructor() {

		}
		private shotScale:number = 1;
		private drawRecet:egret.Rectangle = new egret.Rectangle(0,0,gw,gh);
		private renderTexture:egret.RenderTexture = new egret.RenderTexture();

	/**截屏与保存 
	 * obj：egret.DisplayObject 截取对象
	 * type:string "png"/"jpg"
	 * drawRecet:egret.Rectangle 截取范围
	 * shotScale:number 切割缩放比例
	*/
		public saveIMG(obj:egret.DisplayObject,type:string,drawRecet?:egret.Rectangle,shotScale?:number){
			if(drawRecet){
				this.drawRecet = drawRecet;
			}
			if(shotScale){
				this.shotScale = shotScale;
			}

			this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
			if(type=="png"){
				this.renderTexture.saveToFile("image/png","download.png",this.drawRecet);
			}else if(type=="jpg"){
				this.renderTexture.saveToFile("image/jpeg","download.jpg",this.drawRecet);
			}
		}
	/**截屏
	 * obj：egret.DisplayObject 截取对象
	 * type:string "png"/"jpg"
	 * drawRecet:egret.Rectangle 截取范围
	 * shotScale:number 切割缩放比例
	*/
		public creatShotBitmap(obj:egret.DisplayObject,type:string,drawRecet?:egret.Rectangle,shotScale?:number):egret.Bitmap {
			if(drawRecet){
				this.drawRecet = drawRecet;
			}
			if(shotScale){
				this.shotScale = shotScale;
			}
			this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
			let result = new egret.Bitmap();
			result.texture = this.renderTexture;
			return result;
		}
	/**生成图片地址url
	 * obj：egret.DisplayObject 截取对象
	 * type:string "png"/"jpg"
	 * drawRecet:egret.Rectangle 截取范围
	 * shotScale:number 切割缩放比例
	*/
		public addShareImg(obj:egret.DisplayObject,type:string,drawRecet?:egret.Rectangle,shotScale?:number) {
			if(drawRecet){
				this.drawRecet = drawRecet;
			}
			if(shotScale){
				this.shotScale = shotScale;
			}
			this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
			let imgurl = this.renderTexture.toDataURL("image/jpeg",new egret.Rectangle(0, 0, 750, 1206));
			let myImg2 = $(".shareImg");
			myImg2.attr("src",imgurl);
		}

	}
}