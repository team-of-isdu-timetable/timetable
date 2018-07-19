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
    $('.load').stop().fadeOut(300);
    $('.mytest').stop().fadeOut(300);
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
function openFeedback(){
     $(".feedback").css({"display":"block"});
     $("#overlay").css({"display":"block"});
     $(".tool-list").css({"display":"none"});
}
function openLoad(){
    var content=$("#overlay").css("display");
    if (content=="none"){
        $(".load").css({"display":"block"});
        $('#overlay').css({"display":"block"});
        $(".plus").css({"box-shadow":" 0 0 0 #4b4f50"});
    }else{
        
    }
}
function openLoadMyTest(){
    $(".mytest").css({"display":"block"});
	$(".load").css({"display":"none"});
    $('#overlay').css({"display":"block"});
}
function openLoadMyClass(){
    $(".myclass").css({"display":"block"});
	$(".load").css({"display":"none"});
    $('#overlay').css({"display":"block"});
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
