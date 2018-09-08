var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
if (isAndroid!==1) {
    $("body").css({"font-family":"PingFang SC"});
}

﻿//  test_data={"obj":[
//      {"courseName":"a","teacher":"a","week":"1111111111111111111","property":"a","weekday":"2","courseOrder":"2","room":"a","weekReadable":"a"},
//          {"courseName":"b","teacher":"b","week":"1111111111111111111","property":"b","weekday":"1","courseOrder":"1","room":"b","weekReadable":"b"}],
//      "custom":[
//          {"class_name":"b","teacher":"b","class_week":"1111111111111111111","start_time":"15:00","week_day":"5","end_time":"16:30","class_place":"b","note":"aaa"},
//          {"class_name":"b","teacher":"b","class_week":"1111111111111111111","start_time":"08:00","week_day":"7","end_time":"08:01","class_place":"b","note":"aaa"},
//          {"class_name":"b","teacher":"b","class_week":"1111111111111111111","start_time":"15:00","week_day":"5","end_time":"16:30","class_place":"b","note":"aaa"}]};
// data=test_data;
//----------------------------第一学期or第二学期---------------------------
 var TodayDate = new Date();
 var month = TodayDate.getMonth() + 1,
     isSummer = false;
 if (month >= 5 && month <= 9) {
     isSummer = true;
 }
var colors = ['#f27979', '#f8a66f', '#f2c261', '#b8d574', '#6ad4b3', '#71b5e9','#b193d9'],

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
    var $add_class = $('<div class="add_class"></div>');
    tbClass.append($add_class);
    for (var i = 0; i < 5; i++) {
        var $row = $('<div class="row"></div>');
        for (var j = 0; j < 7; j++) {
            $row.append('<div class="cell" data-day="'+ (j+1) +'" data-class="'+ (i+1) +'"></div>')
        }
        tbClass.append($row);
    }
    //-------------------------------------填充-开始时间-选择栏
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
            if (j<=9) {
                $minute+='<div class="minutenum" >'+ "0"+(j) +'</div>';
            }else{
                $minute+='<div class="minutenum" >'+ (j) +'</div>';
            }
        }
        $minute+='<div class="minutenum" ></div><div class="minutenum" ></div></div>';

        choosestarttime.append($minute);
        chooseendtime.append($minute);
        }
        get_data();
    }

var days = ['一<br><p>MON</p> ', '二<br><p>TUE</p>', '三<br><p>WED</p>', '四<br><p>THU</p>', '五<br><p>FRI</p>', '六<br><p>SAT</p>', '日<br><p>SUN</p>'];
// 初始化表格
function init() {
    var $tbDay = $('#tb-day'),
        $tbTime = $('#tb-time');
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
    var $weekList = '<div class="weekList">';
    for (var j = 0; j < 20; j++) {
        if (j<9) {
            $weekList+='<div class="chooseWeekNum">'+ "0"+(j+1) +'</div>';
        }else{
            $weekList+='<div class="chooseWeekNum">'+ (j+1) +'</div>';}
    }
    $(".chooseWeekList").append($weekList);
    clear();
}
init();


//-----------------------------------------------第几周-----------------------------------------------------
var termBegin = { year:2018, month: 9, date: 10 }//开学第一周星期一
var now_week;
function getWeek_day() {//获取当前周、星期
    var current = {};//当前时间
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth()
    var date = now.getDate()
    var day = now.getDay()
    current.day = day;
    if (day == 0){
        current.day = 7;
    }
    var month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        month_days[1] = 29
    }
    var days = date - termBegin.date;
    if (termBegin.month > month || termBegin.month == month && days < 0){//当前在假期则判为第一周第一天
        current = { week: 0, day: 1 };
    } else {
        for (let m = termBegin.month; m < month; m++){
            days += month_days[m];
            var week = Math.floor(days / 7)
            current.week = week>19?19:week
        }
    }
    now_week=current.week

    return current;

}
getWeek_day();
 var data;
function get_data() {
    $.ajax({
        type:"get",
        url:"php/school.php",
        dataType:"json",
        success:function (res) {      /*test.json*/
            if (!res) { alert('网络错误'); return;}
            // if (!res.ok) {
            //     alert(res.msg);
            // }
            else if (res.obj.length === 0){
                alert('当前课表为空, 请登录教务系统核对.');
            }else {
                data = res;
                render(data);
            }
        }
    });
}
// render(data);
function render(data) {
    $('#tb-week').html('第' + now_week+ '周');/*data.week*/
    var weeksNum = data.obj[0].week.length;
    for (var i = 1; i <= weeksNum; i++) {
        $("#select-week").append("<li onclick='weekChange($(this));clickSelect()'><p>第" + i  + "周</p><img src='img/check.png'></li>");
        if (i == now_week) {
            $("#select-week").children("li").eq(i-1).addClass("checked");
        }
    }
    showData(data, now_week)
}

//--------------------------------------------填课表-------------------------------------
function showData(data, weekNum){
    var occupyPlace = [];
    for (var i = 0, n = data.obj.length; i < n; i++) {
        var item = data.obj[i], color;
        var day = String(item.weekday),
            courseOrder = String(item.courseOrder);
        if (item.courseName in existingName) {
            color = existingName[item.courseName];
        } else {
            if (colors.length == 0) {
                colors = colorUsed;
                colorUsed = [];
            }
            color = colors.splice(getColor(), 1)[0];
            colorUsed.push(color);
            existingName[item.courseName] = color;
        }
        if (occupyPlace.indexOf(day + courseOrder) == -1) {//位置为空
            occupyPlace.push(day + courseOrder);
            if (item.week.slice(weekNum - 1,weekNum) != 1) {
                color = "#c5c5c5";
            }
            tbClass.find('.row').eq(item.courseOrder - 1).find('div').eq(day - 1)
                .html(item.courseName + '@' + item.room + ' ' + item.teacher)
                .css({background: color})
                .attr({name: item.courseName, posi: item.room, teacher: item.teacher});
        } else {
            if (item.week.slice(weekNum - 1,weekNum) == 1) {
                tbClass.find('.row').eq(item.courseOrder - 1).find('div').eq(day - 1)
                    .html(item.courseName + '@' + item.room + ' ' + item.teacher)
                    .css({background: color})
                    .attr({name: item.courseName, posi: item.room, teacher: item.teacher});
            }
        }
    }
    //----------------------------自定义课表------------------------
    var add_class_box=$("#tb-class>.add_class");
    for (var i = 0, n = data.custom.length; i < n; i++) {
        var c_item = data.custom[i], color;
        var c_day = c_item.week_day;
        var $add_class_content='<br>'+c_item.start_time + '<br>' + c_item.end_time + ' <br>' + c_item.teacher;
        //'<div></div><p>课程名称：'+c_item.class_name + '</p><p>课程教师：' + c_item.class_place + '</p><p>老师 ' + c_item.teacher+'</p><p>备注'+c_item.note+'</p>'
        var $duringTime,start_hour,start_min,end_hour,end_min,top;
        start_hour=c_item.start_time.slice(0,2);
        start_min=c_item.start_time.slice(3,2);
        end_hour=c_item.end_time.slice(0,2);
        end_min=c_item.end_time.slice(3,2);
        $duringTime=((end_hour-start_hour)*60+(end_min-start_min));
        if (start_hour<=12) {
            top=((start_hour-8)*60+start_min)/4;
        }else {
            if (start_hour < 19) {
                if (isSummer) {
                    top = ((start_hour - 10) * 60 + start_min) / 4;
                } else {
                    top = ((start_hour - 10) * 60 + start_min + 30) / 4;
                }
            } else {
                if (isSummer) {
                    top = ((start_hour - 11) * 60 + start_min) / 4;
                } else {
                    top = ((start_hour - 11) * 60 + start_min + 30) / 4;
                }
            }
        }


        color = colors.splice(getColor(), 1)[0];
        if (c_item.class_week.slice(weekNum - 1,weekNum) != 1) {
            color = "#c5c5c5";
        }
        // alert($duringTime);
        add_class_box.append('<div class="added_class" onclick="showMyClass($(this))" order="'+i+'"s_time="'+c_item.start_time+'" data-day="'+c_day+'" name="'+c_item.class_name+'" note="'+c_item.note+'"style="height: '+$duringTime/4+'vw;width:13.25vw;position:absolute;top: '+top+'vw;left:'+(c_day*13.25-13.25)+'vw;background:'+ color+';overflow: hidden;">'+$add_class_content+'</div>');
}
}

// 点击课程查看详细信息
$(".cell").click( function() {
    var $infos = $('.info'), $this = $(this);
    if(!$this.attr('name')) {
        $(".myclass").css({"display":"block"});
        $('#overlay').fadeIn(300);
        return;
    }
    $infos.eq(0).html('课程名称：'+$this.attr('name'));
    $infos.eq(1).html('上课时间：'+'星期'+days[$this.attr('data-day')-1].slice(0,1)+'第'+($this.attr('data-class')) + '大节');
    $infos.eq(2).html('上课地点：'+$this.attr('posi'));
    $infos.eq(3).html('上课老师：'+$this.attr('teacher'));
    $('#overlay').fadeIn(300);
    $('#detail').fadeIn(300);
});
//-----------------------------自定义的详细信息
$(".added_class").css({"opacity":"1"});

function showMyClass(obj) {
    $(".add_class").children("div.checked").removeClass("checked");
    obj.addClass("get_marked");
    var $infos = $('.info2');
    $infos.eq(0).html('开始时间：'+$this.attr('s_time'));
    $infos.eq(1).html('上课日期：'+'星期'+days[$this.attr('data-day')-1].slice(0,1));
    $infos.eq(2).html('课程名称：'+$this.attr('name'));
    $infos.eq(3).html('备注：'+$this.attr('note'));
    $("#overlay").fadeIn(300);
    $("#detail2").fadeIn(300);
    alert("2");
}
function hideInfo() {
    $('#overlay').stop().fadeOut(300);
    $('.feedback').stop().fadeOut(300);
    $('.changeBackcolor').stop().fadeOut(300);
    $('.tool-list').stop().fadeOut(300);
    $('#detail').stop().fadeOut(300);
    $('#detail2').stop().fadeOut(300);
    $(".get_marked").removeClass("get_marked");
    $('.tool-list').stop().fadeOut(300);
    $('.myclass').stop().fadeOut(300);

}
$('#overlay').click(hideInfo);
$('#hide').click(hideInfo);
$(".delete").click(function () {
    $.ajax({type: "post",
        url: "php/delete.php",
        data: {delete_item:$(".get_marked").attr("order")},
        dataType: "json",
        success:function () {
            // $("#tb-time").empty();
            // $("#tb-day").empty();
            // $(".add_class").empty();
            // $("#select-week").empty();
            // $(".choosestarttime").empty();
            // $(".chooseendtime").empty();
            // init();
            alert("将在下次登陆消失");
        }
    }
);});
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
        $('.week-listbtn').css({'margin-top':'4px'});
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
    function step(now,fx) {
        $(this).css('-webkit-transform','rotate('+now+'deg)');
        $(this).css('-moz-transform','rotate('+now+'deg)');
        $(this).css('-ms-transform','rotate('+now+'deg)');
        $(this).css('-o-transform','rotate('+now+'deg)');
        $(this).css('transform','rotate('+now+'deg)');
    }
    $("#select-week").children("li.checked").removeClass("checked");
    obj.addClass("checked");
    $('#select-week').slideUp("100");
    var weekNum = obj.index() + 1;
    stat = 0;
    $('.week-listbtn').css({'top':'0px'});
    $('.week-listbtn').animate({borderSpacing: -135 }, {step: step,
        duration:'50' },'linear');
    $('#select-week').slideUp("100");
    if (weekNum==0){
        $('#tb-week').html("放假中");
    } else{
        $('#tb-week').html('第' + weekNum + '周');
        if (weekNum !==now_week) {
            $("#presentweek").children(".words").text("非当前周");
        } else {
            $("#presentweek").children(".words").css({"color":"white"}).text("当前周");
        }
    }

    showData(data, weekNum);
}
//--------------------左上角工具列表------------------------------
function showList(){
    var content=$(".tool-list").css("display");
    if (content=="none") {
        $(".tool-list").slideDown("100");
    }else{
        $(".tool-list").slideUp("100");
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
    $("header").css({"background-color":" #1588b4"});
    $(".plus_shadow").css({"box-shadow":"0vw 1vw 1vw #c6c6c6"});
    $(".plus").css({"background-color":" #1588b4"});
    $(".changeBackcolor").css({"display":"none"});
    $(".cell").css({"opacity":"1"});
    $(".changeBackcolor>div>img").css({"display":"none"});
    $(".color1>img").css({"display":"block"});
     $('#overlay').stop().fadeOut(300);
}
function color2(){
    $("#tb-class").css({"background-color":" #3a4043"});
    $("#tb-time").css({"background-color":" #3a4043"});
    $("#tb-day").css({"background-color":" #3a4043"});
    $("#table").css({"background-color":" #3a4043"});
    $("#tb-day div").css({"background-color":" #3a4043"});
    $(".plus_shadow").css({"box-shadow":"0vw 1vw 1vw #2c3133"});
    $(".plus").css({"background-color":" #1588b4"});
    $("header").css({"background-color":" #3a4043"});
    $(".changeBackcolor").css({"display":"none"});
    $(".cell").css({"opacity":"0.8"});
    $(".changeBackcolor>div>img").css({"display":"none"});
    $(".color2>img").css({"display":"block"});
     $('#overlay').stop().fadeOut(300);
}
function color3(){
    $("#tb-class").css({"background-color":" #f5e2ca"});
    $("#tb-time").css({"background-color":" #f5e2ca"});
    $("#tb-day").css({"background-color":" #f5e2ca"});
    $("#table").css({"background-color":" #f5e2ca"});
    $("#tb-day div").css({"background-color":" #f5e2ca"});
    $("header").css({"background-color":" #c43c53"});
    $(".plus_shadow").css({"box-shadow":"0vw 1vw 1vw #bfb09d"});
    $(".plus").css({"background-color":" #fb4d4d"});
    $(".changeBackcolor").css({"display":"none"});
    $("#presentweek").css({"color":"#fff"});
    $(".cell").css({"opacity":"1"});
    $(".changeBackcolor>div>img").css({"display":"none"});
    $(".color3>img").css({"display":"block"});
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
    // $(".plus_shadow").css({"box-shadow":" 0 0 0 #4b4f50"});
    $("header").css({"background-color":" #000000"});
    $(".changeBackcolor").css({"display":"none"});
    $(".cell").css({"opacity":"0.7"});
    $(".changeBackcolor>div>img").css({"display":"none"});
    $(".color4>img").css({"display":"block"});
     $('#overlay').stop().fadeOut(300);
}
function openFeedback(){
    $(".feedback").css({"display":"block"});
    $("#overlay").css({"display":"block"});
    $(".tool-list").css({"display":"none"});
}
//------------------------------打开添加自定义课表----------
function openLoadMyClass(){
    var content=$("#overlay").css("display");
    if (content=="none"){
        $(".myclass").css({"display":"block"});
        $('#overlay').css({"display":"block"});
    }else{

    }

}
function chooseStartTime() {
    $(".choosestarttime").css({"display":"block"});
    $(".overlay-transp").css({"display":"block"});
    $(".choosestarttime_place").css({"display":"block"});
    $(".time>.s_time").css({"border":"0.4vw solid #1588b4","border-top-width":"0","border-left-width":"0","border-right-width":"0"})
}
function chooseEndTime() {
    $(".chooseendtime").css({"display":"block"});
    $(".overlay-transp").css({"display":"block"});
    $(".chooseendtime_place").css({"display":"block"});
    $(".time>.e_time").css({"border":"0.4vw solid #1588b4","border-top-width":"0","border-left-width":"0","border-right-width":"0"});
}
function loseFocus() {
    $(".choosestarttime").css({"display":"none"});
    $(".chooseendtime").css({"display":"none"});
    $(".overlay-transp").css({"display":"none"});
    $(".choosestarttime_place").css({"display":"none"});
    $(".chooseendtime_place").css({"display":"none"});
    $(".chooseWeekList").css({"display":"none"});
    $(".time>.e_time").css({"border":"0.3vw solid #777777","border-top-width":"0","border-left-width":"0","border-right-width":"0"});
    $(".time>.s_time").css({"border":"0.3vw solid #777777","border-top-width":"0","border-left-width":"0","border-right-width":"0"});

}
    //------------------------------------选择开始时间-----------------------
    var $startHour = document.querySelector(".choosestarttime>.hour");
    $startHour.addEventListener("touchend", function (){
        setTimeout(function () {
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
        },500);
        });
    var $startMin = document.querySelector(".choosestarttime>.minute");
    $startMin.addEventListener("touchend", function (){
        setTimeout(function () {
            var $minNum = $(".choosestarttime>.minute").scrollTop();
            for (var j = 0; j < 60; j++) {
                if (j * 24 <= $minNum && $minNum < (j + 1) * 24) {
                    $minNum = j * 24
                }
            }
            $(".choosestarttime>.minute").scrollTop($minNum);
            $(".choosestarttime>.minute>.minutenum").css({color: "#777777", "font-weight": "normal"});
            $(".choosestarttime>.minute>.minutenum").eq($minNum / 24 + 2).css({
                "color": "#1588b4",
                "font-weight": "bold"
            });
            if ($minNum / 24 + 1 <=10) {
                document.querySelector("#choosen_minute").innerHTML = "0" + ($minNum / 24);
            } else {
                document.querySelector("#choosen_minute").innerHTML = ($minNum / 24);
            }
    },500)});
    //  ---------------------------结束时间--------------------------
    var $endHour = document.querySelector(".chooseendtime>.hour");
    $endHour.addEventListener("touchend", function (){
        setTimeout(function () {
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
    },500)});

    var $endMin = document.querySelector(".chooseendtime>.minute");
    $endMin.addEventListener("touchend", function (){
        setTimeout(function () {
        var $minNum=$(".chooseendtime>.minute").scrollTop();
        for (var j=0;j<60;j++) {
            if (j*24<=$minNum && $minNum<(j+1)*24) {
                $minNum=j*24
            }
        }
        $(".chooseendtime>.minute").scrollTop($minNum);
        $(".chooseendtime>.minute>.minutenum").css({color:"#777777","font-weight":"normal"});
        $(".chooseendtime>.minute>.minutenum").eq($minNum/24+2).css({"color":"#1588b4","font-weight": "bold"});
        if ($minNum/24+1<=10) {
            document.querySelector("#choosen_end_minute").innerHTML="0"+($minNum/24);
        }else{
            document.querySelector("#choosen_end_minute").innerHTML=($minNum/24);
        }
    },500)});
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
        $(".chooseWeekList").css({"display":"none"});
    })
    $("#chooseByMyMind").click(function () {
        $("#chooseByMyMind").css({"color":"#1588b4"});
        $("#chooseAllWeek").css({"color":"#777777"});
        $(".chooseWeekList").css({"display":"block"});
        $(".overlay-transp").css({"display":"block"});
    })
    $(".chooseWeekList>.weekList>.chooseWeekNum").click(function () {
        if ($(this).css("color")=="rgb(21, 136, 180)"){
            $(this).css({"color":"#777777"});
        }else{
            $(this).css({"color":"#1588b4"});
        }


    })

//-----------------提交我的自定义课表--------------------------
$("#submitMyClass").click(function () {
    var start_time;
    var end_time;
    var start_a_pm=$(".choosestarttime>.a_pm>.am").css("color");
    var end_a_pm=$(".chooseendtime>.a_pm>.am").css("color");
    var class_week="";
    if (start_a_pm=="rgb(21, 136, 180)"){
        start_time=$("#choosen_hour").html()+":"+$("#choosen_minute").html()
    }else{
        start_time=(parseInt($("#choosen_hour").html())+12)+":"+$("#choosen_minute").html()
    }
    if (end_a_pm=="rgb(21, 136, 180)"){
        end_time=$("#choosen_end_hour").html()+":"+$("#choosen_end_minute").html()
    }else{
        end_time=(parseInt($("#choosen_end_hour").html())+12)+":"+$("#choosen_end_minute").html()
    }
    if ($("#chooseAllWeek").css("color")=="rgb(21, 136, 180)"){
        for (var i=0;i<19;i++){
            class_week+="1"
        }
    }else{
        $(".weekList>.chooseWeekNum").each(function () {
            if ($(this).css("color")=="rgb(21, 136, 180)") {
                class_week+="1";
            }else{
                class_week+="0";
            }
            }
        )
    }
    //检查输入的时间------------------------------------------------------------
    var sub=0;
    if (start_time.slice(0,2)<8||start_time.slice(0,2)>21||end_time.slice(0,2)<8||end_time.slice(0,2)>21){
        alert("请选择合适（上课）区间");
    }else{
        if (isSummer){
            if (start_time.slice(0,2)>=12&&start_time.slice(0,2)<14){
                alert("请选择合适（上课）区间，吃饭警告");
            }else{
                if (start_time.slice(0,2)>=18&&start_time.slice(0,2)<19) {
                    alert("请选择合适（上课）区间，吃饭警告");
            }else{
                if (end_time.slice(0,2)>=12&&end_time.slice(0,2)<14) {
                    alert("请选择合适（上课）区间，吃饭警告");
                }else{if (end_time.slice(0,2)>=18&&end_time.slice(0,2)<19){
                    alert("请选择合适（上课）区间，吃饭警告");
                } else{
                    if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                        alert("请选择合适（上课）区间");
                    } else{
                        if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                            if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                                alert("请选择合适（上课）区间");
                            }else{
                                sub = 1;
                            }
                        }else{
                            sub = 1;
                        }
                    }
                }
            }
        }}}
        else{
            if (start_time.slice(0,2)<12) {
                if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                    alert("请选择合适（上课）区间");
                } else{
                    if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                        if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                            alert("请选择合适（上课）区间");
                        }else{
                            sub = 1;
                        }
                    }else{
                        sub = 1;
                    }
                }
            }else {
                if (start_time.slice(0,2)<=13&&start_time.slice(3,5)<30) {
                    alert("请选择合适（上课）区间，吃饭警告");
                    sub=0;
                }else {
                    if (start_time.slice(0,2)<=17&&start_time.slice(3,5)<=30){
                        if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                            alert("请选择合适（上课）区间");
                        } else{
                            if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                                if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                                    alert("请选择合适（上课）区间");
                                }else{
                                    sub = 1;
                                }
                            }else{
                                sub = 1;
                            }
                        }
                    } else{
                        if (start_time.slice(0,2)<=18&&start_time.slice(3,5)<30){
                            alert("请选择合适（上课）区间");
                            sub=0;
                        } else{
                            if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                                alert("请选择合适（上课）区间");
                            } else{
                                if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                                    if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                                        alert("请选择合适（上课）区间");
                                    }else{
                                        sub = 1;
                                    }
                                }else{
                                    sub = 1;
                                }
                            }
                        }
                    }
                }

            }
            if (end_time.slice(0,2)<12) {
                if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                    alert("请选择合适（上课）区间");
                } else{
                    if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                        if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                            alert("请选择合适（上课）区间");
                        }else{
                            sub = 1;
                        }
                    }else{
                        sub = 1;
                    }
                }
            }else {
                if (end_time.slice(0,2)<=13&&end_time.slice(3,5)<30) {
                    alert("请选择合适（上课）区间，吃饭警告");
                    sub=0;
                }else {
                    if (end_time.slice(0,2)<=17&&end_time.slice(3,5)<=30){
                        if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                            alert("请选择合适（上课）区间");
                        } else{
                            if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                                if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                                    alert("请选择合适（上课）区间");
                                }else{
                                    sub = 1;
                                }
                            }else{
                                sub = 1;
                            }
                        }
                    } else{
                        if (end_time.slice(0,2)<=18&&end_time.slice(3,5)<30){
                            alert("请选择合适（上课）区间");
                            sub=0;
                        } else{
                            if (end_time.slice(0,2)-start_time.slice(0,2)<0){
                                alert("请选择合适（上课）区间");
                            } else{
                                if (end_time.slice(0,2)-start_time.slice(0,2)==0) {
                                    if (end_time.slice(3,5)-start_time.slice(3,5)<=0) {
                                        alert("请选择合适（上课）区间");
                                    }else{
                                        sub = 1;
                                    }
                                }else{
                                    sub = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (sub){
        $.ajax({type: "post",
            url: "php/custom.php",
            data: {class_name:$("#class_name").val(),
                class_place:$("#class_place").val(),
                start_time:start_time,
                end_time:end_time,
                week_day:$("#choosenWeekDay>select").val(),
                class_week:class_week,
                teacher:$("#class_teacher").val(),
                note:$("#note").val()},
            dataType: "json",
            success: function(){
                $("#class_name").val("");
                $("#class_place").val("");
                $("#choosen_hour").innerHTML="08";
                $("#choosen_minute").innerHTML="00";
                $("#choosen_end_hour").innerHTML="08";
                $("#choosen_end_minute").innerHTML="00";
                $("#choosenWeekDay>select").val("1");
                $("#chooseAllWeek").css({"color":"#1588b4"});
                $("#chooseByMyMind").css({"color":"#777777"});
                $("#class_teacher").val("");
                $("#note").val("");
                $(".submitSuccess").fadeIn(500);
                $(".overlay_top").fadeIn(500);
                $(".submitSuccess").fadeOut(500);
                $(".overlay_top").fadeOut(500);
                // $("#tb-time").empty();
                // $("#tb-day").empty();
                // $(".add_class").empty();
                // $("#select-week").empty();
                // $(".choosestarttime").empty();
                // $(".chooseendtime").empty();
                // init();
                alert("将在下次登陆出现");
            },
            error:function () {
                $(".submitFail").fadeIn(500);
                $(".overlay_top").fadeIn(500);
                $(".submitFail").fadeOut(500);
                $(".overlay_top").fadeOut(500);
            }
        });
     }
    });


