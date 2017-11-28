/**
 * 
 */
var fs = require("fs");

var css = "/.css";
var jpg = "/.jpg";
var js = "/.js";
var html = "/.html";

function route(handle, pathname, response, request, postData){
	
	console.log("Routing Pathname: " + pathname + "  ||  ");

	if(typeof handle[pathname] === 'function'){
		handle[pathname](response, postData);		
	}
	else if(/^\/[a-zA-Z0-9\/]*.html$/.test(request.url.toString())){
		handle[html](response, request.url.toString().substring(1), "text/html");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		handle[css](response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\-\_/]*.jpg$/.test(request.url.toString())){
		handle[jpg](response, request.url.toString().substring(1), "image/jpg");
	}
	else if(/^\/[a-zA-Z0-9\-\_/]*.js$/.test(request.url.toString())){
		handle[js](response, request.url.toString().substring(1), "application/javascript");
	}
	else if(/^\/[a-zA-Z0-9\-\_\./]*.json$/.test(request.url.toString())){
		handle[js](response, request.url.toString().substring(1), "application/json");
	}
	else {
		console.log("No Request Handler.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Error 404");
		response.end();
	}
}

exports.route = route;
