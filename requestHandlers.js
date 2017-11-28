/**
 * 
 */

var fs = require("fs");

function registration(stuNum, courseNum, sectNum){
	
	this.studentSelect = stuNum;
	this.courseSelect = courseNum;
	this.sectionSelect = sectNum;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function start(response){
	
	fs.readFile("index.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function post(response, postData){
	
	var reg = JSON.parse(postData);
	var studentNum = reg.studentSelect;
	var course = reg.courseSelect;
	var section = reg.sectionSelect;
	
	console.log("Post with postData: " + studentNum + " " + course + " " + section);
	
	var json = JSON.stringify(course);
	fs.writeFile(studentNum.toString() + ".json", json, 'utf8', function(){
		console.log("Written to json file.");
	});
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Post");
	response.end();
}

function serveFile(response, fileName, contentType){
	
	console.log("Serving File: " + fileName + "  |   ContentType: " + contentType);
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
exports.post = post;
exports.serveFile = serveFile;

