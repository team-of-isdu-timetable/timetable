<?php
session_start();
error_reporting(0);

$code = $_GET['code'];

$table = curl_init();
curl_setopt($table, CURLOPT_URL, "https://sduonline.cn/isdu-new/oauth/".$code."/isdu");
curl_setopt($table, CURLOPT_HEADER, 0);
curl_setopt($table, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36");
curl_setopt($table, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($table, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($table, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($table, CURLOPT_FOLLOWLOCATION, 1);
$tableput = curl_exec($table);
curl_close($table);

$jsoninfo = json_decode($tableput,true);

$_SESSION['id'] = $jsoninfo['obj']['id'];
$_SESSION['token'] = $jsoninfo['obj']['token'];

$headers = array();
$id = $_SESSION['id'];
$token = $_SESSION['token'];
$headers[] = 'X-Authorization:'.$token;
$url = "https://sduonline.cn/isdu-new/academic/table/".$id;

$SC = curl_init();
curl_setopt($SC, CURLOPT_URL, $url);
curl_setopt($SC, CURLOPT_HEADER, 0);
curl_setopt($SC, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36");
curl_setopt($SC, CURLOPT_HTTPHEADER, $headers);
curl_setopt($SC, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($SC, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($SC, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($SC, CURLOPT_FOLLOWLOCATION, 1);
$SCput = curl_exec($SC);
curl_close($SC);

$l=array();
$custom=json_encode($l);
$_SESSION['school']=$SCput;
$mysqli_con=mysqli_connect("localhost","isdu_timetable","cGOomDAMOPcJos9u&","isdu_timetable");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
$stmt = $mysqli_con->prepare("INSERT INTO `table` (`id`, `custom`) VALUES (?, ?) ");
$stmt->bind_param("s s", $_SESSION['id'], $custom);
$stmt->execute();
$stmt->close();
ob_flush();

?>
<!DOCTYPE html>
<html>
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >
        <title>课程表</title>
        <link rel="stylesheet" type="text/css" href="styles/table.css">
    </head>
    <body>
        <header>
            <div class="tool">
            	<div class="tool-button"  onclick="showList()">
					<!-- tool-button -->
                    <img src="img/tool-button.png">
				</div>
            	<ul class="tool-list">
            		<li class="changeColor" onclick="changeColor()">修改背景</li>
            		<li class="tool-feedback" onclick="openFeedback()">错误反馈</li>
            	</ul>
            </div>
            <div id="presentweek">
                    <div class="words">当前周</div>
            </div>
            <div class="week" >
                <div class="week-num">
                    <div id="tb-week"></div>
                    <div class="week-listbtn" onclick="clickSelect($('.week-listbtn'));"></div>
                    <ul class="select" id="select-week">
                    </ul>
                </div>
            </div>
        </header>
        <div class="addMyClass" onclick="openLoadMyClass()">
            	<div class="plus" >
                </div>
            <img src="img/plus.png">
        </div>
        <div class=plus_shadow></div>
        <section id="table">
            <div id="tb-time"></div>
            <div id="tb-right">
                <!-- <div id="tb-week"></div> -->
                <div id="tb-main">
                    <div id="tb-day"></div>
                    <div id="tb-class">
					</div>
                </div>
            </div>
        </section>
        
        <div id="overlay" style="display: none;"></div>
        <div id="detail" style="display: none;">
            <div class="info"></div>
            <div class="info"></div>
            <div class="info"></div>
            <div class="info"></div>
        </div>
		<div id="detail2">
			<div class="info2"></div>
			<div class="info2"></div>
			<div class="info2"></div>
			<div class="info2"></div>
			<div class="delete">删除</div>
		</div>
        <div class="changeBackcolor" style="display: none;">
        	<div class="changeBackcolor-bg"></div>
        	<div class="color1" onclick="color1()"><img id="color_1"src="img/check.png"> </div>
        	<div class="color2" onclick="color2()"><img src="img/check.png"></div>
        	<div class="color3" onclick="color3()"><img src="img/check.png"></div>
        	<div class="color4" onclick="color4()"><img src="img/check.png"></div>
        </div>
       <div class="feedback">
			<p>错误反馈请在后台输入“客服”呼叫小i</p>
		</div>
		<div class="myclass">
			<p>添加课程</p>
			<form class="myclass_form" action="" method="post">
				<input type="text" id="class_name"  placeholder="课程名称"></p>
				<input type="text" id="class_place" placeholder="上课地点"></p>
				<div class="time"  onclick="chooseStartTime()">
					<p>·</P>
					<div class="s_time">
						<span>开始时间</span>
						<div id="choosen_hour">08</div>
						<div id="choosen_colon">:</div>
						<div id="choosen_minute">00</div>
					</div>
				</div>
				<div class="choosestarttime">
					<div class="a_pm">
						<div class="am">
							AM
						</div>
						<div class="pm">
							PM
						</div>
						<div class="colon">:</div>
					</div>
				</div>
				<div class="choosestarttime_place"></div>
				<div class="time"  onclick="chooseEndTime()">
					<p>·</P>
					<div class="e_time">
						<span>结束时间</span>
						<div id="choosen_end_hour">08</div>
						<div id="choosen_end_colon">:</div>
						<div id="choosen_end_minute">00</div>
					</div>
				</div>
				<div class="chooseendtime">
					<div class="a_pm">
						<div class="am" >
							AM
						</div>
						<div class="pm">
							PM
						</div>
						<div class="colon">:</div>
					</div>
				</div>
				<div class="chooseendtime_place"></div>
				<!--周次选择-->
				<div class="chooseWeek">
					<div class="chooseWeekName">周次选择</div>
					<div id="choosenWeekDay">
							<select>
								<option value="1">周一</option>
								<option value="2">周二</option>
								<option value="3">周三</option>
								<option value="4">周四</option>
								<option value="5">周五</option>
								<option value="6">周六</option>
								<option value="7">周日</option>
							</select>
					</div>
				</div>
				<div id="chooseAllWeek">全部周</div>
				<div id="chooseByMyMind">自定义</div>
				<div class="chooseWeekList"></div>
				<!-- 周次选择 -->
				<input type="text" id="class_teacher" placeholder="任课老师"></p>
				<input type="text" id="note" placeholder="备注信息"></p>
				<input type="button" style="border:0vw;" id="submitMyClass" value="添加">
				<div class="overlay-transp" onclick="loseFocus()"></div>
			</form>
			<div class="submitSuccess">
                <img src="img/success.jpg">
                <p>提交成功</p>
            </div>
			<div class="submitFail">
                <img src="img/fail.jpg">
                <p>提交失败</p>
            </div>
			<div class="overlay_top">

            </div>
		</div>
        <script src="scripts/jquery-3.1.1.min.js"></script><!-- scripts/jquery-3.1.1.min.js -->
        <script src="scripts/table.js"></script>
    </body>
</html>