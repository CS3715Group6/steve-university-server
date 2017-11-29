/**
 * 
 */

var fs = require("fs");

function registrationObj(courseNum, sectNum){
	
	this.courseSelect = courseNum;
	this.sectionSelect = sectNum;
}

function courseCatalogue(cName, cNum, cRoom, cSlot){
	
	this.name = cName;
	this.num = cNum;
	this.room = cRoom;
	this.slot = cSlot;
}

function eventObj(eventDay, eventTitle, eventDescription)
{
	this.eventDay = eventDay;
	this.eventTitle = eventTitle;
	this.eventDescription = eventDescription;
}

function start(response){	
	fs.readFile("index.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function events(response, postData){	
	//Save event data to JSON file
	//Also give a generic response
	var data = postData.split("&");
	var info = [];
	for(var i = 0; i < data.length; i++)
	{
		var split = data[i].split("=");
		console.log("Split Data: " + split);
		
		while(split[1].includes("+"))
		{
			split[1] = split[1].replace("+", " ");
		}
		info.push(split[1]);
	}	
	console.log("info without + sign: " + info);	
	
	var event = new eventObj(info[0], info[1],info[2]);
	
	fs.readFile("events.json", 'utf8', function(err, data){
	    if (err){
	    	
	    } else {
	    	var obj = [];
	    	
	    	if(Array.isArray(JSON.parse(data))){
	    		obj = JSON.parse(data);
	    	}
	    	else {
	    		obj = JSON.parse("[" + data + "]");
	    	}
		    
		    obj.push(event); 
		    var json = JSON.stringify(obj);
		    fs.writeFile("events.json", json, 'utf8', function(){
				console.log("Written to json file.");
			});
	    }
	});
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("The event has been added to the sidebar. Please hit back on your browser to return to the previous page.");
	response.end();
}

function removeCourse(response, postData){
	
	var data = postData.split("&");	
	var regInfo = [];
	
	for(var i = 0; i < data.length; i++){
		
		var split = data[i].split("=");
		
		while(split[1].includes("+")){
			split[1] = split[1].replace("+", " ");
		}
		
		regInfo.push(split[1]);
	}
	
	var studentNum = regInfo[0];
	var course = new courseCatalogue(regInfo[0], regInfo[1],regInfo[2],regInfo[3]);
	
	fs.readFile("Campus/courseData.json", 'utf8', function readFileCallback(err, data){
	    if (err){

	    } else {
	    	var obj = [];
	    	
	    	if(Array.isArray(JSON.parse(data))){
	    		obj = JSON.parse(data);
	    	}
	    	else {
	    		obj = JSON.parse("[" + data + "]");
	    	}
		    
	    	obj = obj.filter(function(el) {
	    		var currObj = el.name + el.num + el.slot;
	    		var testObj = course.name + course.num + course.slot
	    	    return currObj !== testObj;
	    	});
 
		    var json = JSON.stringify(obj);
		    fs.writeFile("Campus/courseData.json", json, 'utf8', function(){
				console.log("Written to json file.");
			});
	    }
	});
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("The Course has been removed from the catalogue. Please hit back on your browser to return to the previous page.");
	response.end();
}

function addCourse(response, postData){
	var data = postData.split("&");	
	var regInfo = [];
	
	for(var i = 0; i < data.length; i++){
		
		var split = data[i].split("=");
		
		console.log("Split Data: " + split);
		if(split[1].includes("+")){
			split[1] = split[1].replace("+", " ");
		}
		
		while(split[1].includes("+")){
			split[1] = split[1].replace("+", " ");
		}
		
		regInfo.push(split[1]);
	}
	
	console.log(regInfo);
//	
//	for(var j = 0; j < regInfo.length; j++){
//		
//		console.log("RegInfo Data: " + regInfo[i]);
//		while(regInfo[i].includes("+")){
//			regInfo[i] = regInfo[i].replace("+", " ");
//		}
//	}
	
	var studentNum = regInfo[0];
	var course = new courseCatalogue(regInfo[0], regInfo[1],regInfo[2],regInfo[3]);
	
	fs.readFile("Campus/courseData.json", 'utf8', function readFileCallback(err, data){
	    if (err){
	    	
	    	var jso = [];
	    	jso.push(JSON.stringify(course));
	    	fs.writeFile("Campus/courseData.json", jso, 'utf8', function(){
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
		    
		    obj.push(course); 
		    var json = JSON.stringify(obj);
		    fs.writeFile("Campus/courseData.json", json, 'utf8', function(){
				console.log("Written to json file.");
			});
	    }
	});
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("The Course has been added to the catalogue. Please hit back on your browser to return to the previous page.");
	response.end();
}

function registration(response, postData){
	
	console.log("Registration Called");
	fs.writeFile(studentNum.toString() + ".json", jso, 'utf8', function(){
		console.log("Written to json file.");
	});
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
	var reg = new registrationObj(regInfo[1], regInfo[2]);
	
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

exports.removeCourse = removeCourse;
exports.addCourse = addCourse;
exports.start = start;
exports.registration = registration;
exports.events = events;
exports.serveFile = serveFile;

