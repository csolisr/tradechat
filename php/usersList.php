<?php
	if (!empty($_GET["usr"])) {
		$conn = mysql_connect("localhost", "root", "N00b0r1337") or die(mysql_error());
		$db = mysql_select_db("project") or die(mysql_error);

		$sqlQuery = "SELECT id, usr FROM users WHERE usr = '".$_GET["usr"]."'";

		$sqlResult = mysql_query($sqlQuery, $conn) or die(mysql_error());

		$sqlArr = array();
		$sqlCounter = 0;

		while($row = mysql_fetch_array($sqlResult)) {
			$sqlRow = array();

			$sqlRow["id"] = $row["id"];
			$sqlRow["usr"] = $row["usr"];

			$sqlArr[$sqlCounter] = $sqlRow;
			$sqlCounter++;
		}
		if ($sqlCounter > 0 ){
			echo '{"userExists":true}';
		} else {
			echo '{"userExists":false}';
		}
	}
?>
