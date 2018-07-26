var jw = $(window).width();
var jh = $(window).height();
$('html').css('font-size', jh * 0.02);
if(screen.height == 812 && screen.width == 375){
    $('.plan_title').find('div').css('font-size','0.8rem');
}
var matchImgs = [
    "images/sc1.png",
    "images/sc2.png",
    "images/sc3.png",
    "images/sc4.png"
];
var isResult = false;
$(function(){
    $('.close').on('click',function() {
        if(isResult){
            $(".shareImg").show();
        }
        $(this).parent().parent().hide();
    })

    $('.plan_title span').on('click',function() {
        $(".shareImg").show();
        $('.plan_title span').removeClass('active');
        $(this).addClass('active');
        //点击切换赛事安排的图写这儿
        $('.swiper-container-s2 img').attr('src', matchImgs[$(this).attr('data-val')-1]);
        swiper_s2.update();
    })
});

var c, d, e, f = false;
var swiper1, swiper_s2, swiper_s1, swiper_s3;
function info3Fun(){
    $('.info').show();
    if (!f) {
        swiper_s3 = new Swiper('.swiper-container-s3', {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto',
            scrollbar: $('.swiper-container-s3').find('.swiper-scrollbar'),
            scrollbarHide: false,
            scrollbarDraggable: true,
        });
    } else {
        swiper_s3.update();
    }
    f = true;
}
function list3Fun(data){
    // data.player
    // data.ranklist
    if(data.ranklist.length==0){
    }else{
        $('.swiper-container-s1 tbody').html(''); 
        for (var i=0; i<data.ranklist.length; i++) {
            var one = data.ranklist[i];
            $('.swiper-container-s1 tbody').append("<tr>"
            +"<td>"+(i+1)+"</td>"
            +"<td><div class='head_bg'><img src='"+one.headImg+"'></div></td>"
            +"<td>"+one.nickName+"</td>"
            +"<td>"+one.topScore+"</td></tr>");
        }
        $('.my_grade tbody').html('');
        $('.my_grade tbody').append("<tr>"
        +"<td>"+data.player.playerRank+"</td>"
        +"<td><div class='head_bg'><img src='"+$headImg+"'></div></td>"
        +"<td>"+$nickName+"</td>"
        +"<td>"+data.player.topScore+"</td></tr>");
    }
    $('.list').show();
    if (!e) {
        swiper_s1 = new Swiper('.swiper-container-s1', {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto',
            scrollbar: $('.swiper-container-s1').find('.swiper-scrollbar'),
            scrollbarHide: false,
            scrollbarDraggable: true,
        })
    }else{
        swiper_s1.update();
    }
    e = true;
}
function plan3Fun(){
    $('.plan').show();
    if (!d) {
        swiper_s2 = new Swiper('.swiper-container-s2', {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto',
            scrollbar: $('.swiper-container-s2').find('.swiper-scrollbar'),
            scrollbarHide: false,
            scrollbarDraggable: true,
        })
    }
    d = true;
}
function more3Fun(){
    $('.more').show();
    if (!c) {
        swiper1 = new Swiper('.swiper-container-top', {
            // effect : 'fade',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
        });
    }
    c = true;
}

var playerdataarrs;
var $indexcode=getQueryStringByName('code');
if($indexcode){
    $.ajax({
        type: 'GET',
        url: 'images/res2.json',
        dataType: 'json',
        cache: false,
        success: function(data) {
            playerdataarrs = data['index'];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("res2 error");
        }
    });
}
var playerSpic = [
    ["pn1_png","pic1.jpg","pic1_jpg","info1.png"],
    ["pn2_png","pic2.jpg","pic2_jpg","info2.png"],
    ["pn3_png","pic3.jpg","pic3_jpg","info3.png"],
    ["pn4_png","pic4.jpg","pic4_jpg","info4.png"],
    ["pn5_png","pic5.jpg","pic5_jpg","info5.png"],
    ["pn6_png","pic6.jpg","pic6_jpg","info6.png"],
    ["pn7_png","pic7.jpg","pic7_jpg","info7.png"],
    ["pn8_png","pic8.jpg","pic8_jpg","info8.png"],
    ["pn9_png","pic9.jpg","pic9_jpg","info9.png"],
    ["pn11_png","pic11.jpg","pic11_jpg","info11.png"],
    ["pn12_png","pic12.jpg","pic12_jpg","info12.png"],
    ["pn13_png","pic13.jpg","pic13_jpg","info13.png"],
    ["pn14_png","pic14.jpg","pic14_jpg","info14.png"],
    ["pn15_png","pic15.jpg","pic15_jpg","info15.png"],
    ["pn16_png","pic16.jpg","pic16_jpg","info16.png"],
    ["pn17_png","pic17.jpg","pic17_jpg","info17.png"],
];
function change(num) {
    // console.log(num);
    $('.info_img').attr('src', 'images/'+playerSpic[num][3]);
    $('.photo_left img').attr('src', 'resource/assets/resultPage/'+playerSpic[num][1]);
    // var info = playerdataarrs[num];
    // $('.photo_name').html(info[0]);
    // $('.photo_nickname').html('(' + info[1] + ')');
    // var num1 = 2;
    // $('.photo_info').find('p').each(function() {
    //     $(this).find('span').html(info[num1]);
    //     num1++;
    // });
    // $('.photo_txt').html(info[num1]);

    // $('.photo_prize p').remove();
    // for (var i = num1+1; i <= info.length - 1; i++) {
    //     $('.photo_prize').append('<p>' + info[i] + '</p>');
    // };
}