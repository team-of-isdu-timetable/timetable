<?php
	error_reporting(0);
	session_start();
	$mysqli_con=mysqli_connect("localhost","isdu_timetable","cGOomDAMOPcJos9u&","isdu_timetable");

	if (mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
		exit();
	}
	
	function object_array($array) {  
		if(is_object($array)) {  
		    $array = (array)$array;  
		 } if(is_array($array)) {  
		     foreach($array as $key=>$value) {  
		         $array[$key] = object_array($value);  
		         }  
		 }  
		 return $array;  
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
	$b=object_array($a);
	$c['obj']=$b['obj'];
	$d=json_decode($custom);
	$c['custom']=$d;
	echo json_encode($c);
	
?>