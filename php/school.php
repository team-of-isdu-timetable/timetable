<?php
	error_reporting(0);
	session_start();
	$custom=$_SESSION['custom'];
	$_SESSION['school'][]=$custom;
		echo $_SESSION['school'];
?>