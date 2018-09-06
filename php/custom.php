<?php
	error_reporting(0);
	session_start();
	$custom=$_POST;
	$id=$_SESSION['id'];
	$mysqli_con=mysqli_connect("localhost","isdu_timetable","cGOomDAMOPcJos9u&","isdu_timetable");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
} else if(1) {
	
	$stmt = $mysqli_con->prepare("SELECT `custom` FROM `table` WHERE `id` = ?");
	$stmt->bind_param("s",$id);
	$stmt->execute();
	$stmt->bind_result($b);
	$stmt->fetch();
	$stmt->close();
	$g=json_decode($b);
	$g[]=$custom;
	$a=json_encode($g);
	$stmt = $mysqli_con->prepare("UPDATE `table` SET`custom`=? WHERE `id`=? ");
    $stmt->bind_param("s s", $a,$id);
    $stmt->execute();
    $stmt->close();
	
}
?>