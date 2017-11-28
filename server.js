/**
 * Port: 3336
 */

function start(route, handle){
	
	var http = require("http");
	var url = require("url");
	
	function onRequest(request, response){

		var postData = "";
		var pathname = url.parse(request.url).pathname;
		//route(handle, pathname, response, request);
		
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, request, postData);
		});
	}
	
	http.createServer(onRequest).listen(3336);
	console.log("Server has started.");
}

exports.start = start;