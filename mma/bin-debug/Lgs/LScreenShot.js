var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Lgs;
(function (Lgs) {
    var LScreenShot = (function () {
        function LScreenShot() {
            this.shotScale = 1;
            this.drawRecet = new egret.Rectangle(0, 0, gw, gh);
            this.renderTexture = new egret.RenderTexture();
        }
        /**截屏与保存
         * obj：egret.DisplayObject 截取对象
         * type:string "png"/"jpg"
         * drawRecet:egret.Rectangle 截取范围
         * shotScale:number 切割缩放比例
        */
        LScreenShot.prototype.saveIMG = function (obj, type, drawRecet, shotScale) {
            if (drawRecet) {
                this.drawRecet = drawRecet;
            }
            if (shotScale) {
                this.shotScale = shotScale;
            }
            this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
            if (type == "png") {
                this.renderTexture.saveToFile("image/png", "download.png", this.drawRecet);
            }
            else if (type == "jpg") {
                this.renderTexture.saveToFile("image/jpeg", "download.jpg", this.drawRecet);
            }
        };
        /**截屏
         * obj：egret.DisplayObject 截取对象
         * type:string "png"/"jpg"
         * drawRecet:egret.Rectangle 截取范围
         * shotScale:number 切割缩放比例
        */
        LScreenShot.prototype.creatShotBitmap = function (obj, type, drawRecet, shotScale) {
            if (drawRecet) {
                this.drawRecet = drawRecet;
            }
            if (shotScale) {
                this.shotScale = shotScale;
            }
            this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
            var result = new egret.Bitmap();
            result.texture = this.renderTexture;
            return result;
        };
        /**生成图片地址url
         * obj：egret.DisplayObject 截取对象
         * type:string "png"/"jpg"
         * drawRecet:egret.Rectangle 截取范围
         * shotScale:number 切割缩放比例
        */
        LScreenShot.prototype.addShareImg = function (obj, type, drawRecet, shotScale) {
            if (drawRecet) {
                this.drawRecet = drawRecet;
            }
            if (shotScale) {
                this.shotScale = shotScale;
            }
            this.renderTexture.drawToTexture(obj, this.drawRecet, this.shotScale);
            var imgurl = this.renderTexture.toDataURL("image/jpeg", new egret.Rectangle(0, 0, 750, 1206));
            var myImg2 = $(".shareImg");
            myImg2.attr("src", imgurl);
        };
        return LScreenShot;
    }());
    Lgs.LScreenShot = LScreenShot;
    __reflect(LScreenShot.prototype, "Lgs.LScreenShot");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LScreenShot.js.map