<?php
	error_reporting(0);
	$custom=$_POST;
	$id=1;
	$mysqli_con=mysqli_connect("localhost","root","991003","isdu_timetable");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
} else if(1) {
	
	$stmt = $mysqli_con->prepare("SELECT `custom` FROM `time` WHERE `id` = ?");
	$stmt->bind_param("s",$id);
	$stmt->execute();
	$stmt->bind_result($b);
	$stmt->fetch();
	$stmt->close();
	$g=json_decode($b);
	//$v=array_merge($custom,$g);
	$g[]=$custom;
	$a=json_encode($g);
	
	echo($a);
	//echo$a;
	
	
	//var_dump($r);
	$stmt = $mysqli_con->prepare("UPDATE `time` SET`custom`=? WHERE id=1 ");
    $stmt->bind_param("s", $a);
    $stmt->execute();
    $stmt->close();
	
}
?>