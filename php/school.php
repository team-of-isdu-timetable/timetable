<?php
	error_reporting(0);
	session_start();
	$custom=$_SESSION['custom'];
	$school=$_SESSION['school'];
	$a=json_decode($school);
	$b=json_decode($custom);
	$c['obj']=$a['obj'];
	$c['custom']=$b;
		echo $c;
?>