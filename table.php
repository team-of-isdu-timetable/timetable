<?php
	error_reporting(0);
	/*//custom
	error_reporting(0);
	var_dump($_POST);
	$class=$_POST['class_name'];
	$place=$_POST['class_place'];
	$teacher=$_POST['class_teacher'];
	$note=$_POST['note'];
	$date=array("$class","$place","$teacher","$note");
	$custom=implode(",",$date);
	var_dump($class);
	echo $custom;

	$servername = "localhost";
	$username = "root";
	$password = "kdm565";
	$dbname = "isdu_timetable";
	// 创建连接
	$conn = new mysqli($servername, $username, $password, $dbname);
	// 检测连接
	if ($conn->connect_error) {
		die("连接失败: " . $conn->connect_error);
	}
	$sql = "insert into timetable (openID, name, school,custom)
	values ('openID', 'name',NULL, '$custom')";
	if ($conn->query($sql) === TRUE) {
		echo "新记录插入成功";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$conn->close();*/
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c92caabe8a65cee&&redirect_uri=https%3A%2F%2Fsduonline.cn%2Fplayground%2Ftimetable%2Findex.php&response_type=code&scope=snsapi_base&state=isdu#wechat_redirect");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    $output = curl_exec($ch);
	var_dump($_GET);
	
	
	session_start();
error_reporting(0);

/*function hashCode32( $s )
{
    $h = 0;
    $len = strlen($s);
    for($i = 0; $i < $len; $i++)
    {
        $h = overflow32(31 * $h + ord($s[$i]));
    }

    return $h;
}

function overflow32($v)
{
    $v = $v % 4294967296;
    if ($v > 2147483647) return $v - 4294967296;
    elseif ($v < -2147483648) return $v + 4294967296;
    else return $v;
}*/
	
if(1)
{
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
	var_dump($tableput);
}
   /*if(1) {
		
          
        $hashCode = hashCode32($code);
        $url = "https://sduonline.cn/isdu-new/oauth/info/".$code."/".$hashCode;
			$sc = curl_init();
		curl_setopt($sc, CURLOPT_URL, $url);
		curl_setopt($sc, CURLOPT_HEADER, 0);
		curl_setopt($sc, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36");
		curl_setopt($sc, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($sc, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($sc, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($sc, CURLOPT_FOLLOWLOCATION, 1);
		$scput = curl_exec($sc);
		curl_close($sc);
		$_SESSION['code'] = $code;
            $_SESSION['openID'] = $jsoninfo['obj']['info']['openId'];
            $_SESSION['unionID'] = $jsoninfo['obj']['info']['unionID'];
            $_SESSION['headimgurl'] = $jsoninfo['obj']['info']['headImgUrl'];
            $_SESSION['nickname'] = $jsoninfo['obj']['info']['nickname'];

		$jsoninfo = json_decode($scput,true);
		var_dump($scput);
}
    
*/

ob_flush();
session_start();
$_SESSION['id'] = $jsoninfo['obj']['id'];
$_SESSION['token'] = $jsoninfo['obj']['token'];
 if(isset($_SESSION['id'])) {
	
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

        $jsoninfo = json_decode($SCput,true);
		var_dump($SCput);
}
?>