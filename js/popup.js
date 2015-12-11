// JavaScript Document
 document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(message) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('注意 有警告', {
      icon: 'alert.png',
      body: message,
    });
	/*
	setTimeout(function(){
		notification.cancel();
	},200);*/
	setTimeout(notification.close.bind(notification), 2000);
	//notification.cancel();
    //notification.onclick = function () {
    //  window.open("http://www.google.com.tw");      
    //};
    
  }

}
 joinsocket();
 
  $(function() {
	  $('#noticeme').click(function(){
		  notifyMe('check');
		  });
	    
  });
  
function joinsocket(){
	notifyMe('連線holyshit...');
	var socket = io('ws://localhost:3000');
	
	socket.on('message', function(msg){
		var myRe = /^command:/;
		if(msg.match(myRe)){
			msg = msg.replace(myRe,'');
			var OBJjson = $.parseJSON(msg);
			var data = OBJjson[0];
			var toiletname = (data.toiletID==1)?'6F':'7F';
			switch(data.command){
				case 'lock':
					if(data.value=="false"){ 
						notifyMe('廁所'+toiletname+'，開門了！快去搶！');
					}
					break;
				default:
					
					break;
				}
			}
		
	
	  });
	
	
	
	
	}
  /*
function joinsocket(){
		if(typeof(EventSource) !== "undefined") {
			var source = new EventSource("http://172.19.7.235/alertserver/alert.html");
			source.onmessage = function(event) {
				notifyMe(event.data);
				$("#result").html(event.data);
				//document.getElementById("result").innerHTML += event.data + "<br>";
			};
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
		}	
	}
*/