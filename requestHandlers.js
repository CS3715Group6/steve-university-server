/**
 * 
 */

var fs = require("fs");

function registration(courseNum, sectNum){
	
	this.courseSelect = courseNum;
	this.sectionSelect = sectNum;
}

function start(response){
	
	fs.readFile("index.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function post(response, postData){
	
	var data = postData.split("&");	
	var regInfo = [];
	
	for(var i = 0; i < data.length; i++){
		
		var split = data[i].split("=");
		
		if(split[1].includes("+")){
			split[1] = split[1].replace("+", " ");
		}
		
		regInfo.push(split[1]);
	}
	
	var studentNum = regInfo[0];
	var reg = new registration(regInfo[1],regInfo[2]);
	
	fs.readFile(studentNum.toString() + ".json", 'utf8', function readFileCallback(err, data){
	    if (err){
	    	
	    	var jso = [];
	    	jso.push(JSON.stringify(reg));
	    	fs.writeFile(studentNum.toString() + ".json", jso, 'utf8', function(){
	    		console.log("Written to json file.");
	    	});
	    } else {
	    	var obj = [];
	    	
	    	if(Array.isArray(JSON.parse(data))){
	    		obj = JSON.parse(data);
	    	}
	    	else {
	    		obj = JSON.parse("[" + data + "]");
	    	}
		    
		    obj.push(reg); 
		    var json = JSON.stringify(obj);
		    fs.writeFile(studentNum.toString() + ".json", json, 'utf8', function(){
				console.log("Written to json file.");
			});
	    }
	});
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You are now registered. Please hit back on your browser to return to the previous page.");
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

