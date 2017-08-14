<?php
	//echo var_dump($_GET);
	//echo var_dump($_POST);
	//echo '<input type="hidden" value="'.time().'"/><p>'.time().'</p><br/>';
	$lastPost = $_GET["lastPost"];
	if (!empty($lastPost)) {
		$conn = mysql_connect("localhost", "root", "N00b0r1337") or die(mysql_error());
		$db = mysql_select_db("project") or die(mysql_error);

		//TODO: Verify if this syntax is valid.
		//TODO: Reimplement to use datetime
		//TODO: Investigate syntax of datetime
		$sqlQuery = "SELECT id, usr, time, content FROM messages WHERE time > '".$lastPost."'";
		$sqlResult = mysql_query($sqlQuery, $conn) or die(mysql_error());
		$sqlArr = array();
		$sqlCounter = 0;
		//This must return two arrays
		//The first one contains the lastPost
		//The second one is the series of arrays listed in order
		
		//TODO: Must somehow delete posts after time passes
		while($row = mysql_fetch_array($sqlResult)) {
			$sqlRow = array();

			$sqlRow["id"] = $row["id"];
			$sqlRow["usr"] = $row["usr"];
			$sqlRow["time"] = $row["time"];
			$sqlRow["content"] = $row["content"];

			$sqlArr[$sqlCounter] = $sqlRow;
			
			$sqlCounter++;
		}
		$sqlSuperArray = array();
		//Calculate what's the highest (most recent) time
		$mostRecent = "0000-00-00 00:00:00";
		if(!empty($sqlArr)) {
			for($i=0,$s=count($sqlArr); $i<$s; ++$i) {
				if ($sqlArr[$i]["time"] > $mostRecent){
					$mostRecent = $sqlArr[$i]["time"];
				}
			}
		} else {
			$mostRecent = $lastPost;
		}
		$sqlSuperArray["lastPost"] = $mostRecent;
		$sqlSuperArray["messageArray"] = $sqlArr;
		$sqlJSON = json_encode($sqlSuperArray);
		echo $sqlJSON;
	}
?>
