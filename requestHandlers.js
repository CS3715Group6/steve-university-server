/**
 * 
 */

var fs = require("fs");

function start(response){
	
	fs.readFile("index.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function eastern(response){
	
	fs.readFile("../Campus/eastern.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function upload(response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

function serveFile(response, fileName, contentType){
	
  fs.readFile(fileName, function(err, data){
    if(err){
      response.writeHead(404);
      response.write("Not Found!");
    }
    else{
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
}


exports.start = start;
exports.upload = upload;
exports.serveFile = serveFile;
exports.eastern = eastern;

