	// webView = new WebView(context);
    // if (webView != null) {
     //    webView.clearFormData();
     //    webView.clearHistory();
     //    webView.clearMatches();
     //    webView.clearSslPreferences();
	// 	CookieSyncManager.createInstance(context);
	// 	CookieManager cookieManager = CookieManager.getInstance();
     //    cookieManager.removeAllCookie();
     //    CookieSyncManager.getInstance().sync();
     //    webView.setWebChromeClient(null);
     //    webView.setWebViewClient(null);
     //    webView.getSettings().setJavaScriptEnabled(false);
     //    webView.clearCache(true);
	// }
var colors = ['#fb7f88', '#fcf497', '#9fe4cf', '#5fcff1', '#b4a7f3', '#f4a7ce'],
    colorUsed = [],
    existingName = {};
function getColor() {
    var total = colors.length,
        ramdom = Math.random();
    var num = Math.floor(total * ramdom);
    return num;
}

//清空表格
    var tbClass = $('#tb-class');
function clear() {

    var choosestarttime = $('.choosestarttime');
    var chooseendtime=$('.chooseendtime');
    tbClass.empty();
    colors = colors.concat(colorUsed);
    colorUsed = [];
    existingName = {};

    for (var i = 0; i < 5; i++) {
        var $row = $('<div class="row"></div>');
        for (var j = 0; j < 7; j++) {
            $row.append('<div class="cell" data-day="'+ (j+1) +'" data-class="'+ (i+1) +'"></div>')
        }
        tbClass.append($row);
    }
    for (var i = 0; i < 1; i++) {
        var $hour = '<div class="hour">';
            $hour+='<div class="hournum"></div><div class="hournum"></div>';
                for (var j = 0; j < 12; j++) {
                    if (j<9) {
                        $hour+='<div class="hournum">'+ "0"+(j+1) +'</div>';
                    }else{
                        $hour+='<div class="hournum">'+ (j+1) +'</div>';
                    }
                }
        $hour+='<div class="hournum"></div><div class="hournum"></div></div>';
        choosestarttime.append($hour);
        chooseendtime.append($hour);

    }
    for (var i = 0; i < 1; i++) {
        var $minute = '<div class="minute">';
        $minute+='<div class="minutenum" ></div><div class="minutenum" ></div>';
        for (var j = 0; j < 60; j++) {
            if (j<9) {
                $minute+='<div class="minutenum" >'+ "0"+(j+1) +'</div>';
            }else{
                $minute+='<div class="minutenum" >'+ (j+1) +'</div>';
            }
        }
        $minute+='<div class="minutenum" ></div><div class="minutenum" ></div></div>';

        choosestarttime.append($minute);
        chooseendtime.append($minute);
        }
    }

var days = ['一<br>MON ', ' 二<br>TUE', '三<br>WED', '四<br>THU', '五<br>FRI', '六<br>SAT', '日<br>SUN'];
// 初始化表格
function init() {
    var $tbDay = $('#tb-day'),
        $tbTime = $('#tb-time');
    var todayDate = new Date();
    var month = todayDate.getMonth() + 1,
        isSummer = false;
    if (month >= 5 && month <= 9) {
        isSummer = true;
    }
    for (var i = 0; i < 7; i++) {
        $tbDay.append('<div>' + days[i] + '</div>');
    }
    for (var i = 1; i <= 10; i++) {
        if (i == 1 || i == 2) {
            $tbTime.append('<div>' + i + '<p>' + (i + 7) + ':00</p></div>');
        } else if (i == 3 || i == 4) {
            $tbTime.append('<div>' + i + '<p>' + (i + 7) + ':10</p></div>');
        } else if (i >= 5 && i <= 8) {
            if (isSummer) {
                $tbTime.append('<div>' + i + '<p>' + (i + 9) + ':00</p></div>');
            } else {
                $tbTime.append('<div>' + i + '<p>' + (i + 8) + ':30</p></div>');
            }
        } else {
            if (isSummer) {
                $tbTime.append('<div>' + i + '<p>' + (i + 10) + ':00</p></div>');
            } else {
                $tbTime.append('<div>' + i + '<p>' + (i + 9) + ':30</p></div>');
            }
        }

    }

    clear();
}
init();

var data;
/*render(data);*/
$.getJSON('/isdu/wx/api/getSchedule', function (res) {      /*test.json*/
    if (!res) { alert('网络错误'); return;}
    if (!res.ok) {
        alert(res.msg);
    }
    else if (res.obj.length === 0){
        alert('当前课表为空, 请登录教务系统核对.');
    }else {
        data = res;
        render(data);
    }
});

function render(data) {
    $('#tb-week').html('第' + data.msg + '周');/*data.week*/
    var weeksNum = data.obj[0].week.length;
    for (var i = 1; i <= weeksNum; i++) {
        $("#select-week").append("<li onclick='weekChange($(this));clickSelect()'><p>第" + i  + "周</p><img src='images/check.png'></li>");
        if (i == data.msg) {
            $("#select-week").children("li").eq(i-1).addClass("checked");
        }
    }
    showData(data, data.msg)
}

function showData(data, weekNum){
    var occupyPlace = [];
    for (var i = 0, n = data.obj.length; i < n; i++) {
        var item = data.obj[i], color;
        var day = String(item.day),
            courseOrder = String(item.courseOrder);
            
        if (item.name in existingName) {
            color = existingName[item.name];
        } else {
            if (colors.length == 0) {
                colors = colorUsed;
                colorUsed = [];
            }
            color = colors.splice(getColor(), 1)[0];
            colorUsed.push(color);
            existingName[item.name] = color;
        }

        if (occupyPlace.indexOf(day + courseOrder) == -1) {//位置为空
            occupyPlace.push(day + courseOrder);
            if (item.week.slice(weekNum - 1,weekNum) != 1) {
                color = "#ccc";
            }
            tbClass.find('.row').eq(item.courseOrder - 1).find('div').eq(item.day - 1)
                .html(item.name + '@' + item.posi + ' ' + item.teacher)
                .css({background: color})
                .attr({name: item.name, posi: item.posi, teacher: item.teacher});
        } else {
            if (item.week.slice(weekNum - 1,weekNum) == 1) {
                tbClass.find('.row').eq(item.courseOrder - 1).find('div').eq(item.day - 1)
                    .html(item.name + '@' + item.posi + ' ' + item.teacher)
                    .css({background: color})
                    .attr({name: item.name, posi: item.posi, teacher: item.teacher});
            }
        }
    }
}

// 点击课程查看详细信息
tbClass.on('click', '.cell', function() {
    var $infos = $('.info'), $this = $(this);
    if(!$this.attr('name')) {
        return;
    }
    $infos.eq(0).html('课程名称：'+$this.attr('name'));
    $infos.eq(1).html('上课时间：'+'星期'+days[$this.attr('data-day')-1]+'第'+($this.attr('data-class')) + '大节');
    $infos.eq(2).html('上课地点：'+$this.attr('posi'));
    $infos.eq(3).html('上课老师：'+$this.attr('teacher'));
    $('#overlay').fadeIn(300);
    $('#detail').fadeIn(300);
});
function hideInfo() {
    $('#overlay').stop().fadeOut(300);
    $('.feedback').stop().fadeOut(300);
    $('.changeBackcolor').stop().fadeOut(300);
    $('.tool-list').stop().fadeOut(300);
    $('#detail').stop().fadeOut(300);
    $('.tool-list').stop().fadeOut(300);
    $('.myclass').stop().fadeOut(300);
}
$('#overlay').click(hideInfo);
$('#hide').click(hideInfo);

//选周
var stat = 0;
function clickSelect() {
    function step(now,fx) {
        $(this).css('-webkit-transform','rotate('+now+'deg)');
        $(this).css('-moz-transform','rotate('+now+'deg)');
        $(this).css('-ms-transform','rotate('+now+'deg)');
        $(this).css('-o-transform','rotate('+now+'deg)');
        $(this).css('transform','rotate('+now+'deg)');
    }
    if (stat == 0) {
        stat = 1;
        $('.week-listbtn').css({'top':'5px'});
        $('.week-listbtn').animate({borderSpacing: 45 }, {step: step,
            duration:'50' },'linear');
        $('#select-week').slideDown("100");
    } else {
        stat = 0;
        $('.week-listbtn').css({'top':'0px'});
        $('.week-listbtn').animate({borderSpacing: -135 }, {step: step,
            duration:'50' },'linear');
        $('#select-week').slideUp("100");
    };
}
function weekChange(obj) {
    $("#select-week").children("li.checked").removeClass("checked");
    obj.addClass("checked");
    var weekNum = obj.index() + 1;
    $('#tb-week').html('第' + weekNum + '周');
    if (weekNum != data.msg) {
        $("#presentweek").children(".circle").css({"background":"#c84665"});
        $("#presentweek").children(".words").css({"color":"#c84665"}).text("非当前周");
    } else {
        $("#presentweek").children(".circle").css({"background":"white"});
        $("#presentweek").children(".words").css({"color":"white"}).text("当前周");
    }
    showData(data, weekNum);
}
function showList(){
    var content=$(".tool-list").css("display");
    if (content=="none") {
        $(".tool-list").css({"display":"block"});
    }else{
        $(".tool-list").css({"display":"none"});
    }
    $('#overlay').css({"display":"block"});
    
}
function changeColor(){
    $(".changeBackcolor").css({"display":"block"});
    $(".tool-list").css({"display":"none"});
    $('#overlay').css({"display":"block"});
}
function color1(){
    $("#tb-class").css({"background-color":" #fff"});
    $("#tb-time").css({"background-color":" #fff"});
    $("#tb-day").css({"background-color":" #fff"});
    $("#table").css({"background-color":" #fff"});
    $("#tb-day div").css({"background-color":" #fff"});
    $("header").css({"background-color":" #0c516b"});
    $(".plus_shadow").css({"box-shadow":"1vw 1vw 1vw #c6c6c6"});
    $(".plus").css({"background-color":" #0c516b"});
    $(".changeBackcolor").css({"display":"none"});
     $('#overlay').stop().fadeOut(300);
}
function color2(){
    $("#tb-class").css({"background-color":" #4b4f50"});
    $("#tb-time").css({"background-color":" #4b4f50"});
    $("#tb-day").css({"background-color":" #4b4f50"});
    $("#table").css({"background-color":" #4b4f50"});
    $("#tb-day div").css({"background-color":" #4b4f50"});
    $(".plus_shadow").css({"box-shadow":"1vw 1vw 1vw #2c3133"});
    $(".plus").css({"background-color":" #0c516b"});
    $("header").css({"background-color":" #0c516b"});
    $(".changeBackcolor").css({"display":"none"});
     $('#overlay').stop().fadeOut(300);
}
function color3(){
    $("#tb-class").css({"background-color":" #f5e2ca"});
    $("#tb-time").css({"background-color":" #f5e2ca"});
    $("#tb-day").css({"background-color":" #f5e2ca"});
    $("#table").css({"background-color":" #f5e2ca"});
    $("#tb-day div").css({"background-color":" #f5e2ca"});
    $("header").css({"background-color":" #c43c53"});
    $(".plus_shadow").css({"box-shadow":"1vw 1vw 1vw #bfb09d"});
    $(".plus").css({"background-color":" #0c516b"});
    $(".changeBackcolor").css({"display":"none"});
     $('#overlay').stop().fadeOut(300);
}
function color4(){
    $("#tb-class").css({"background-color":" #000000"});
    $("#tb-time").css({"background-color":" #000000"});
    $("#tb-day").css({"background-color":" #000000"});
    $("#table").css({"background-color":" #000000"});
    $("#tb-day div").css({"background-color":" #000000"});
    $("header").css({"background-color":" #000000"});
    $(".plus").css({"background-color":" #2a3c4b"});
    $(".plus_shadow").css({"box-shadow":" 0 0 0 #4b4f50"});
    $("header").css({"background-color":" #000000"});
    $(".changeBackcolor").css({"display":"none"});
     $('#overlay').stop().fadeOut(300);
}
function chooseStartTime() {
    $(".choosestarttime").css({"display":"block"});
    $(".overlay-transp").css({"display":"block"});
    $(".choosestarttime_place").css({"display":"block"});
}
function loseFocus() {
    $(".choosestarttime").css({"display":"none"});
    $(".chooseendtime").css({"display":"none"});
    $(".overlay-transp").css({"display":"none"});
    $(".choosestarttime_place").css({"display":"none"});
    $(".chooseendtime_place").css({"display":"none"});

}
function chooseEndTime() {
    $(".chooseendtime").css({"display":"block"});
    $(".overlay-transp").css({"display":"block"});
    $(".chooseendtime_place").css({"display":"block"});
}

function openFeedback(){
     $(".feedback").css({"display":"block"});
     $("#overlay").css({"display":"block"});
     $(".tool-list").css({"display":"none"});
}
function openLoadMyClass(){
    var content=$("#overlay").css("display");
    if (content=="none"){
        $(".myclass").css({"display":"block"});
        $('#overlay').css({"display":"block"});
    }else{

    }
}


// function submitMyClass(){
//     var myClassName=getElementById("#myClassName");
//     var myClassPort=getElementById("#myClassPort");
//         myClassTime=getElementById("#myClassTime");
//         myClassWeek=getElementById("#myClassWeek");
//         myClassTeacher=getElementById("#myClassTeacher");
//         myClassPS=getElementById("myClassPS");
//         myClass=new array;
//         for (var i = myClass.length;i<10 ;i++) {
//             myClass[i]={name:myClassName,port:myClassPort,time:myClassTime,week:myClassWeek,teacher:myClassTeacher,ps:myClassPS};
//             break;
// }
/////

///
///
//
////

// function submmitMyClass(){
//     var form=document.getElementById("form");
//     var name_arr=new Array;
//     var value_arr= new Array;
//     for(var i=0;i<form.elements.length;i++){
//         if(form.elements[i].type!="submit"){
//                     name_arr.push(form.elements[i].name);
//                     value_arr.push(form.elements[i].value);
//                 }
//     }
//     var myClass=new Object;
//     for(var j=0;j<10;j++){
//         var myClass[j]=new Array;}
//     var j=0 
//     if (typeof(myClass[j]!=="undefined"){
//         j=j+1;
//     }else if{
//         for(var i=0;i<name_arr.length;i++){
//                     myClass[j+1][name_arr[i]]=value_arr[i];        
//             }
    //------------------------------------选择开始时间-----------------------
    var $startHour = document.querySelector(".choosestarttime>.hour");
    $startHour.addEventListener("touchend", function (){
        var $Num=$(".choosestarttime>.hour").scrollTop();
        for (var i=0;i<12;i++) {
            if (i*24<=$Num && $Num<(i+1)*24) {
                $Num=i*24
            }
        }
        $(".choosestarttime>.hour").scrollTop($Num);
        $(".choosestarttime>.hour>.hournum").css({color:"#777777","font-weight":"normal"});
        $(".choosestarttime>.hour>.hournum").eq($Num/24+2).css({"color":"#1588b4","font-weight": "bold"});
        if ($Num/24+1<10) {
            document.querySelector("#choosen_hour").innerHTML="0"+($Num/24+1);
        }else{
            document.querySelector("#choosen_hour").innerHTML=($Num/24+1);
        }
        })

    var $startMin = document.querySelector(".choosestarttime>.minute");
    $startMin.addEventListener("touchend", function (){
        var $minNum=$(".choosestarttime>.minute").scrollTop();
        for (var j=0;j<60;j++) {
            if (j*24<=$minNum && $minNum<(j+1)*24) {
                $minNum=j*24
            }
        }
        $(".choosestarttime>.minute").scrollTop($minNum);
        $(".choosestarttime>.minute>.minutenum").css({color:"#777777","font-weight":"normal"});
        $(".choosestarttime>.minute>.minutenum").eq($minNum/24+2).css({"color":"#1588b4","font-weight": "bold"});
        if ($minNum/24+1<10) {
            document.querySelector("#choosen_minute").innerHTML="0"+($minNum/24+1);
        }else{
            document.querySelector("#choosen_minute").innerHTML=($minNum/24+1);
        }
    })
    //  ---------------------------结束时间--------------------------
    var $endHour = document.querySelector(".chooseendtime>.hour");
    $endHour.addEventListener("touchend", function (){
        var $Num=$(".chooseendtime>.hour").scrollTop();

        for (var i=0;i<12;i++) {
            if (i*24<=$Num && $Num<(i+1)*24) {
                $Num=i*24
            }
        }

        $(".chooseendtime>.hour").scrollTop($Num);

        // console.log( $(".choosestarttime>.hour>.hournum").eq(3))
        $(".chooseendtime>.hour>.hournum").css({color:"#777777","font-weight":"normal"});
        $(".chooseendtime>.hour>.hournum").eq($Num/24+2).css({"color":"#1588b4","font-weight": "bold"});
        if ($Num/24+1<10) {
            document.querySelector("#choosen_end_hour").innerHTML="0"+($Num/24+1);
        }else{
            document.querySelector("#choosen_end_hour").innerHTML=($Num/24+1);
        }
    })

    var $endMin = document.querySelector(".chooseendtime>.minute");
    $endMin.addEventListener("touchend", function (){
        var $minNum=$(".chooseendtime>.minute").scrollTop();
        for (var j=0;j<60;j++) {
            if (j*24<=$minNum && $minNum<(j+1)*24) {
                $minNum=j*24
            }
        }
        $(".chooseendtime>.minute").scrollTop($minNum);
        $(".chooseendtime>.minute>.minutenum").css({color:"#777777","font-weight":"normal"});
        $(".chooseendtime>.minute>.minutenum").eq($minNum/24+2).css({"color":"#1588b4","font-weight": "bold"});
        if ($minNum/24+1<10) {
            document.querySelector("#choosen_end_minute").innerHTML="0"+($minNum/24+1);
        }else{
            document.querySelector("#choosen_end_minute").innerHTML=($minNum/24+1);
        }
    })
    //-------------------------am  pm-----------------------------
    $(".choosestarttime>.a_pm>.am").click(function(){
        $(".choosestarttime>.a_pm>.am").css({color:"#1588b4","font-size":"5vw"});
        $(".choosestarttime>.a_pm>.pm").css({"color":"#777777","font-size":"4.5vw"});
    });
    $(".choosestarttime>.a_pm>.pm").click(function(){
        $(".choosestarttime>.a_pm>.pm").css({"color":"#1588b4","font-size":"5vw"});
        $(".choosestarttime>.a_pm>.am").css({"color":"#777777","font-size":"4.5vw"});
    });
    $(".chooseendtime>.a_pm>.am").click(function(){
        $(".chooseendtime>.a_pm>.am").css({"color":"#1588b4","font-size":"5vw"});
        $(".chooseendtime>.a_pm>.pm").css({"color":"#777777","font-size":"4.5vw"});
    });
    $(".chooseendtime>.a_pm>.pm").click(function(){
        $(".chooseendtime>.a_pm>.pm").css({"color":"#1588b4","font-size":"5vw"});
        $(".chooseendtime>.a_pm>.am").css({"color":"#777777","font-size":"4.5vw"});
    });
    //-----------------------------填充周次选择---------------------
    $("#chooseAllWeek").click(function () {
        $("#chooseAllWeek").css({"color":"#1588b4"});
        $("#chooseByMyMind").css({"color":"#777777"});
    })
    $("#chooseByMyMind").click(function () {
        $("#chooseByMyMind").css({"color":"#1588b4"});
        $("#chooseAllWeek").css({"color":"#777777"});
        var $weekList = '<div class="weekList">';
            for (var j = 0; j < 12; j++) {
                if (j<9) {
                    $weekList+='<div class="chooseWeekNum">'+ "0"+(j+1) +'</div>';
                }else{
                    $weekList+='<div class="chooseWeekNum">'+ (j+1) +'</div>';}
            }
             $(".chooseWeekList").append($weekList);
    })

