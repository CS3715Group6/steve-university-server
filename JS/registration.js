/**
 * Enrolls a student in the selected course.
 * Currently assumes there is only one student in the school, as per assignment instructions.
 * A Student currently cannot unregister from a course as it was not in the assignment requirements.
 * 
 * courseArray stores the keys for the actual course registration data
 * @author Alex Gillis 
 */
function studentChanged(){
	
	var stuIDSelect = document.getElementById("studentNumber");
	var stuNum = stuIDSelect.options[stuIDSelect.selectedIndex].text;
	
	getCourseInfoFromServer(stuNum);
}

function getCourseInfoFromServer(stuNum){
	
	var url = "" + stuNum + ".json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function() {
		
		if(request.status == 200){
			buildCourseTable(request.responseText);
		}
		else{
			removeOldTable();
		}
	};
	request.send(null);
}

function removeOldTable(){
	
	//var courseArray = getCourseArray();
	var courseTbl = document.getElementById("studentCourseList");

	//Destory Previous Table rows
	while(courseTbl.hasChildNodes()){
		courseTbl.removeChild(courseTbl.lastChild);
	}

	//Create Table Headers
	var tblHeaderTxt = ["Course Number", "Time Slot"];
	var headerRow = document.createElement("tr");
	for(var x = 0; x < tblHeaderTxt.length; x++){
		
		var headerth = document.createElement('th');
		var textNode = document.createTextNode(tblHeaderTxt[x]);
		headerth.appendChild(textNode);
		headerRow.appendChild(headerth);
	}
	courseTbl.appendChild(headerRow);
	
	return courseTbl;
}
function buildCourseTable(courseData){
	
	var allInfo = JSON.parse(courseData);

	var courseTbl = removeOldTable();
	
	//Add Course Entries to the table
	if(!Array.isArray(allInfo)){
		var courseRow = document.createElement("tr");
		var courseInfo = allInfo;
		
		var course_td1 = document.createElement('td');
		var txtNode1 = document.createTextNode(courseInfo.courseSelect);
		course_td1.appendChild(txtNode1);
		courseRow.appendChild(course_td1);
		var course_td2 = document.createElement('td');
		var txtNode2 = document.createTextNode(courseInfo.sectionSelect);
		course_td2.appendChild(txtNode2);
		courseRow.appendChild(course_td2);

		courseTbl.appendChild(courseRow);
	}
	else{
		for(var i = 0; i < allInfo.length; i++){
			var courseRow = document.createElement("tr");
			var courseInfo = allInfo[i];
			
			var course_td1 = document.createElement('td');
			var txtNode1 = document.createTextNode(courseInfo.courseSelect);
			course_td1.appendChild(txtNode1);
			courseRow.appendChild(course_td1);
			var course_td2 = document.createElement('td');
			var txtNode2 = document.createTextNode(courseInfo.sectionSelect);
			course_td2.appendChild(txtNode2);
			courseRow.appendChild(course_td2);
	
			courseTbl.appendChild(courseRow);
	
		}	
	}
}

//Called on student.html onload
function displayRegisteredCourses(courseData){
	
	var stuIDSelect = document.getElementById("studentNumber");
	var stuNum = stuIDSelect.options[stuIDSelect.selectedIndex].text;
	getCourseInfoFromServer(stuNum);

}

function registerBtnClicked(){
	
	var courseSelect = document.getElementById("courseNumber");
	var sectionSelect = document.getElementById("section");
	
	var courseNum = courseSelect.options[courseSelect.selectedIndex].text;
	var sectionNum = sectionSelect.options[sectionSelect.selectedIndex].text;
	
	var courseInfo = new course(courseNum,sectionNum);
	
	saveCourseInfo(courseInfo);
	
	alert("You have registered for " + courseNum);
}

function stuPageRegisterBtn(){
	
//	var courseTxt = document.getElementById("courseNum").value;
//	var sectionTxt = document.getElementById("timeSlot").value;
//
//	var courseInfo = new course(courseTxt,sectionTxt);
//	
//	saveCourseInfo(courseInfo);
//	displayRegisteredCourses();
}

function saveCourseInfo(course){
	
	var key = course.courseNum + course.sectionNum;
	var value = JSON.stringify(course);
	
	if( addCourseArray(key) ){ //Returns true if successfully set
		localStorage.setItem(key, value);
		alert("You have registered for " + course.courseNum);
		
		//TESTING
//		var courseArray = getCourseArray();
//		for(i = 0; i < courseArray.length; i++){
//			var currKey = courseArray[i];
//			var courseInfo = JSON.parse(localStorage[currKey]);
//			alert(courseInfo.courseNum + " " + courseInfo.sectionNum);
//		}
	}
}

//Course Object Constructor
function course(num, section){
	
	this.courseNum = num;
	this.sectionNum = section;
}

//Gets the array of course keys for which the student has registered from local storage. 
function getCourseArray(){
	
	var courseArray = localStorage.getItem("courseArray");
	if(!courseArray){
		courseArray = []
		localStorage.setItem("courseArray", JSON.stringify(courseArray));
	}
	else {
		courseArray = JSON.parse(courseArray); //Turns JSON string back into a JavaScript object
	}
	return courseArray;
}

//Add to the array of course keys for which the student has registered. 
//Returns True if successfully set, False otherwise
function addCourseArray(key){
	
	var courseArray = getCourseArray();
	
	if(courseArray.includes(key)){ //Check if already registered
		alert("You are already registered for this course.")
		return false;
	}
	else{
		courseArray.push(key);
		localStorage.setItem("courseArray", JSON.stringify(courseArray));
		return true;
	}
}





















