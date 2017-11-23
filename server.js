/**
 * Port: 3336
 */

function start(route, handle){
	
	var http = require("http");
	var url = require("url");
	
	function onRequest(request, response){

		var pathname = url.parse(request.url).pathname;
		route(handle, pathname, response, request);
	}
	
	http.createServer(onRequest).listen(3336);
	console.log("Server has started.");
}

exports.start = start;