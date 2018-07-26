<?php
	error_reporting(0);
	session_start();
	$mysqli_con=mysqli_connect("localhost","isdu_timetable","cGOomDAMOPcJos9u&","isdu_timetable");

	if (mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
		exit();
}
	
	$stmt = $mysqli_con->prepare("SELECT `custom` FROM `timetable` WHERE `id` = ?");
	$stmt->bind_param("s",$_SESSION['id']);
	$stmt->execute();
	$stmt->bind_result($cus);
	$stmt->fetch();
	$stmt->close();
	$custom=$cus;
	$school=$_SESSION['school'];
	$a=json_decode($school);
	$b=json_decode($custom);
	$c['obj']=$a['obj'];
	$c['custom']=$b;
		echo $c;
?>