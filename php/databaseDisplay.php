<?php
	$conn = mysql_connect("localhost", "root", "N00b0r1337") or die(mysql_error());
	$db = mysql_select_db("project") or die(mysql_error);

	$sqlQuery = "SELECT * FROM messages";
	$sqlResult = mysql_query($sqlQuery, $conn) or die(mysql_error());
	while($row = mysql_fetch_array($sqlResult)) {
		$id = $row["id"];
		echo $id;
		echo "<br/>";
		$usr = $row["usr"];
		echo $usr;
		echo "<br/>";
	}
	echo mysql_result($sqlResult, 0, "NUMBER") or die(mysql_error());
?>
