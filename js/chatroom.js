//TODO: ping chatDriver with nickname
//TODO: chatDriver must delete the nickname after X seconds without answering
//TODO: old files should be removed after X hours
//TODO: lastPost becomes undefined somewhere somehow; can't pinpoint
var lastPost = "0000-00-00 00:00:00";

var reloadChat = function(){
	//  Workflow:
	//- Chatroom requests info starting from lastPost (default to 0)
	//- Server receives lastPost and returns two arrays
	//- First array contains latest lastPost
	//- Second array contains a subarray with all posts from last update
	$.getJSON("http://localhost/~csolisr/web/Proyecto/php/chatDriver.php",
	{"lastPost": lastPost},
	function(data) {
		//Render the received data
		var renderedData = "";
		if (data["messageArray"]){
			for (var i=0; i<data["messageArray"].length; ++i){
				var current = data["messageArray"][i];
				var usr = current["usr"];
				/*var time = new Date(current["time"]*1000);
				var content = current["content"];

				var timeDisplay = time.getFullYear()+"-"+
				                  time.getMonth()+"-"+
				                  time.getDate()+" "+
								  time.getHours()+":"+
								  time.getMinutes()+":"+
								  time.getSeconds();
				*/
				var timeDisplay = current["time"];
				renderedData += "<div class='renderedData'>";
				renderedData += "<b> "+usr+": </b>";
				renderedData += current["content"];
				renderedData += " <i>(at "+timeDisplay+")</i>";
				renderedData += "</div>\n";
				$("#chatlog").append(renderedData);
			}
		}

		lastPost = data["lastPost"];
	});
}

var postMsg = function(msg){
	//Draw the user name from your cookie
	var usr = "";
	if (document.cookie) {
		var cookieList = document.cookie.split(";");
		for (var i=0; i<cookieList.length; ++i){
			var cookieValues = cookieList[i];
			while (cookieValues.charAt(0) == " "){
				var cookieLen = cookieValues.length;
				cookieValues = cookieValues.substring(1, cookieLen);
			}
			if (cookieValues.indexOf("username=") == 0){
				var ulen= "username=".length;
				var clen = cookieValues.length;
				usr = cookieValues.substring(ulen, clen);
			}
		}
	}
	//The time and id parameters are obtained server-side
	//Prepare the JSON payload
	var payloadUsername = usr;
	//var payloadTime = new Date();
	//payloadTime.setTime(payloadTime.getTime());
	var payloadMessage = msg;
	//var JSONPayload = JSON.stringify({"username": payloadUsername,"time": payloadTime,"message": payloadMessage});
	//var JSONPayload = JSON.stringify({"username": payloadUsername,"message": payloadMessage});
	var JSONPayload = {"username": payloadUsername, "message": payloadMessage};
	//var JSONPayload = JSON.stringify([payloadUsername, payloadMessage] );
	return JSONPayload;
}

window.setInterval(reloadChat, 1000);
//Button functions
$(document).ready(function(){
	//Functionality for sendButton
	$("#sendButton").click(function(){
		//Draw message from the #message field
		var msg = $("#message").val();
		var JSONPayload = postMsg(msg);
		//Send the payload
		$.getJSON("http://localhost/~csolisr/web/Proyecto/php/postMessage.php",
		JSONPayload,
		function(data) {
			//Clear the post
			if (data["requestValid"]=="true"){
				$("#message").val("");
			}
		});
	});

	//TODO: Functionality for attachButton
	//$('#attachButton').click(function(e){
		
		//return false;
	//});
});
