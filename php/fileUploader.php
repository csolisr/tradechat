<?php
	$upload = $_FILES["attachButton"];
	if (!empty($_FILES["attachButton"])){
		$v = $_FILES["attachButton"];
		$n = $v["name"];
		$r = $v["tmp_name"];

		$f = dirname(__FILE__);

		move_uploaded_file($r, "$f/$n");
	}
?>
