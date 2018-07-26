var Lgs;
(function (Lgs) {
    function sharePage(callBack, thisObj) {
        // playAudio("touchBtn");
        bgmViewer.hide();
        var shareLayer = new egret.Sprite();
        // GameLayer.addChild(shareLayer);
        shareLayer.touchEnabled = true;
        shareObj = shareLayer;
        var shareShape = Lgs.makeaShape(0x000000, 0.85);
        shareLayer.addChild(shareShape);
        var sharebg = Lgs.createBitmapByName("sharebg_png");
        shareLayer.addChild(sharebg);
        sharebg.x = gw - pw_sx - Lgs.GetWidth(sharebg) - gh * 0.015;
        sharebg.y = pw_sy + gh * 0.015;
        shareLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            Lgs.LremoveChild(shareLayer);
            bgmViewer.show();
        }, this);
        shareLayer["closeAni"] = function () {
            Lgs.LremoveChild(shareLayer);
            bgmViewer.show();
        };
        return shareLayer;
    }
    Lgs.sharePage = sharePage;
})(Lgs || (Lgs = {}));
function shareOkClose() {
    if (shareObj && shareObj.parent) {
        if (shareObj["closeAni"]) {
            shareObj["closeAni"]();
        }
        else {
            Lgs.LremoveChild(shareObj);
        }
    }
}
//# sourceMappingURL=sharePage.js.map