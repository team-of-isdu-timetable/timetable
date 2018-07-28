<?php
	error_reporting(0);
	session_start();
	$s=array("courseName"=>"高数","property"=>"必修","teacher"=>"高数","week"=>"11111111111111111111111","weekday"=>"1","courseOrder"=>"1","room"=>"233","weekReadable"=>"1-18周");
	$t=array("courseName"=>"高数","property"=>"必修","teacher"=>"高数","week"=>"11111111111111111111111","weekday"=>"1","courseOrder"=>"2","room"=>"233","weekReadable"=>"1-18周");
	$v=array($s,$t);
	$y=json_encode($v);
	
	$u=json_decode($y);
	$mysqli_con=mysqli_connect("localhost","root","kdm565","isdu_timetable");
	$id=2;
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
	$id=1;
	$stmt = $mysqli_con->prepare("SELECT `custom` FROM `time` WHERE `id` = ?");
	$stmt->bind_param("s",$id);
	$stmt->execute();
	$stmt->bind_result($cus);
	$stmt->fetch();
	$stmt->close();
	$custom=$cus;
	$_SESSION['custom']=$cus;
	$school=$_SESSION['school'];
	$a=json_decode($school);
	$b=object_array($a);
	$c['obj']=$u;
	$d=json_decode($custom);
	$c['custom']=$d;
	echo json_encode($c);
	
?>