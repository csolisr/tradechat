$(document).ready(function(){
	$("#loginButton").click(function(){
		/*
		$.ajax({
			url: "http://localhost/~csolisr/web/Proyecto/usersList.php",
			crossDomain: true,
			dataType: "json",
			type: "GET",
			timeout: 1000
		}).done(function(data) {
		*/
		var username = $("#user").val();
		$.getJSON("http://localhost/~csolisr/web/Proyecto/php/usersList.php",
		{"usr": username},
		function(data) {
			if (!data["userExists"]) {
				//Hide the error message
				$(".help-inline").css("display", "hidden");
				//TODO: Register this user in the database
				$.getJSON("http://localhost/~csolisr/web/Proyecto/php/registerUser.php",
				{"username":username},
				function(data) {
					if (data["requestValid"]=="true"){
						var now = new Date();
						now.setTime(now.getTime());
						var expiration = 1000*60*60; //1 hour
						//TODO: Expire the session and disreserve the name
						//after an hour of inactivity.
						var expirationDate = new Date(now.getTime() + expiration);
						document.cookie = "username="+username+";"+
										  "expires="+expirationDate.toGMTString()+";"+
										  "path=/;";
						//TODO: Actually reading this cookie on the chat!
						window.location = "http://localhost/~csolisr/web/Proyecto/chatroom.html";
					}
				});
			} else {
				$(".help-inline").css("display", "inline");
			}
		});
	});
});
