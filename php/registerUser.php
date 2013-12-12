<?php
	if (!empty($_GET["username"])) {
		$conn = mysql_connect("localhost", "root", "N00b0r1337") or die(mysql_error());
		$db = mysql_select_db("project") or die(mysql_error);

		$usr = $_GET["username"];

		$sqlQuery = "INSERT INTO users (usr) VALUES ('".$usr."')";
		$sqlResult = mysql_query($sqlQuery, $conn) or die(mysql_error());
		echo '{"requestValid":"true"}'; //Must work to reach here or else there will be no answer... hopefully
	} else {
		echo '{"requestValid":"false"}';
	}
?>
