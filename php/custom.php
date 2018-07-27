<?php
	error_reporting(0);
	session_start();
	$class_name=$_GET['class_name'];
	$class_place=$_GET['class_place'];
	$class_week=$_GET['class_week'];
	$start_time=$_GET['start_time'];
	$end_time=$_GET['end_time'];
	$week_day=$_GET['week_day'];
	$teacher=$_GET['teacher'];
	$note=$_GET['note'];
	$custom=array("${class_name}","${class_place}","${class_week}","${start_time}","${end_time}","${week_day}","${teacher}","${note}",);




	$mysqli_con=mysqli_connect("localhost","isdu_timetable","cGOomDAMOPcJos9u&","isdu_timetable");

	if (mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
		exit();
}	
	${id}=$_SESSION['id'];
	$name=1;
	$stmt = $mysqli_con->prepare("SELECT `custom` FROM `timetable` WHERE `id` = ?");
	$stmt->bind_param("s",$_SESSION['id']);
	$stmt->execute();
	$stmt->bind_result($cus);
	$stmt->fetch();
	$stmt->close();
	$tom=json_decode($cus);
	$tom[]=$custom;
	$jscustom=json_encode($tom);
	$sql = "INSERT INTO timetable (id, name,custom)
	VALUES ('${id}', '${name}', ''${jscustom}')";
?>