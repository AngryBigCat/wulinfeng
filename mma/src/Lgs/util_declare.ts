declare function playAudio(id:string,startTime?:number,noTouch?:boolean);
declare function stopAudio(id:string);
declare function stopOtherAudio(id:string|boolean);
declare function checkPhone(s);
/**横着的 竖屏模式 */
declare var canMusic:boolean;
declare var iszhp:boolean;
declare var $nickName;
declare var $headImg;

/**oss静态链接 */
declare var $staticUrl;
declare var $qrUrl;
/**是否填写了手机号/提交了个人信息 */
declare var $haveMobile:boolean;

/**是否助力页面 */
declare var IsZhuli:boolean;
/**当前-分享界面/分享后要移除的界面 */
    let shareObj = new egret.Sprite();
/**其他 */
    declare var prize_index;
    declare var myPrizeLayer;
    /**玩家本局游戏等级 */
    let $thisLevel = 0;
    /**第一次进入游戏 */
    let openGame1=false;
    let $titleJson:any;
    let $cid;
    declare var WeixinJSBridge;
    declare var $topScore:number;
    declare var $newUser:boolean;
/**本游戏需要（单独） */
    /**赛事图片 */
    declare var matchImgs:string[];

    declare function info3Fun(); 
    declare function list3Fun(data); 
    declare function plan3Fun(); 
    declare function more3Fun(); 
    declare function change(num);
