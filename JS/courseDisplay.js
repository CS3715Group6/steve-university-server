/**
 * Displays all available courses in alphabetical order
 * Since we are currently only using local storage and haven't covered how to create our own JSON files yet, 
 * on the very first loading of the page the script takes all the courses that are hardcoded and adds them to local storage.
 * 
 * catalogueArray stores the keys for the actual course catalogue data.
 * @author Alex Gillis 
 */


function createRegistrationList(catalogueEntries){ 
	
	var courseSelect = document.getElementById("courseNumber");
	
	while(courseSelect.hasChildNodes()){
		courseSelect.removeChild(courseSelect.lastChild);
	}
	
	//Get all courses with no duplicates
	var coursesNoDupes = [];
	for(var i = 0; i < catalogueEntries.length; i++){
		
		var courseNum = catalogueEntries[i].num;
		if(!coursesNoDupes.includes(courseNum)){
			coursesNoDupes.push(courseNum);
		}
	}
	
	//Add unique courses to course select options
	for(var i = 0; i < coursesNoDupes.length; i++){
		//Create the course number selection options
		var courseOption = document.createElement("option");
		var courseNum = coursesNoDupes[i];
		var courseTxtNode = document.createTextNode(courseNum);
		
		courseOption.appendChild(courseTxtNode);
		courseOption.setAttribute("value", courseTxtNode.data);
		courseSelect.appendChild(courseOption);
	}
	
	generateSlots();
}

//Called when the course select options are changed
function generateSlots(){
	
	var sectionSelect = document.getElementById("section");
	while(sectionSelect.hasChildNodes()){
		sectionSelect.removeChild(sectionSelect.lastChild);
	}
	
	var courseSelect = document.getElementById("courseNumber");
	var selCourse = courseSelect.value;
	var catalogueEntries = getSortedCatalogueEntries(getCatalogueArray());
	var slots = []
	
	//Find all the slots for the selected course
	for(var i = 0; i < catalogueEntries.length; i++){
		var courseNum = catalogueEntries[i].num;
		if(selCourse == courseNum){
			var courseSect = catalogueEntries[i].slot;
			slots.push(courseSect);
		}
	}
	
	//Create the course slots options selection
	for(var i = 0; i < slots.length; i++){
		var courseSection = document.createElement("option");
		var courseSect = slots[i];
		var courseSectTxtNode = document.createTextNode(courseSect);
		
		courseSection.appendChild(courseSectTxtNode);
		courseSection.setAttribute("value",courseSectTxtNode.data);
		sectionSelect.appendChild(courseSection);
	}
}

function createCatalogueTable()
{
	var catalogueTbl = document.getElementById("courses");
	var catalogueKeys = getCatalogueArray();
	var allCourseEntries = getSortedCatalogueEntries(catalogueKeys);
	
	//Destory Previous Table rows
	while(catalogueTbl.hasChildNodes()){
		catalogueTbl.removeChild(catalogueTbl.lastChild);
	}

	//Create Table Headers
	var tblHeaderTxt = ["Course Name", "Course Number", "Room Number", "Time Slot"];
	var headerRow = document.createElement("tr");
	for(var x = 0; x < tblHeaderTxt.length; x++){
		
		var headerth = document.createElement('th');
		var textNode = document.createTextNode(tblHeaderTxt[x]);
		headerth.appendChild(textNode);
		headerRow.appendChild(headerth);
	}
	catalogueTbl.appendChild(headerRow);

	//Add Course Entries to the table
	for(var i = 0; i < allCourseEntries.length; i++){
		var courseRow = document.createElement("tr");
		var entry = allCourseEntries[i];
		var entryData = Object.values(entry);
		
		for(var j = 0; j < 4; j++){
			var course_td = document.createElement('td');
			var txtNode = document.createTextNode(entryData[j]);
			course_td.appendChild(txtNode);
			courseRow.appendChild(course_td);
		}
		catalogueTbl.appendChild(courseRow);
	}
	
	//Creates the registration list
	createRegistrationList(allCourseEntries);
}

//Alphabetical sorting function
function compare(entry1,entry2){
	if(entry1.name.toLowerCase() < entry2.name.toLowerCase())
		return -1;
	if(entry1.name.toLowerCase() > entry2.name.toLowerCase())
		return 1;
	return 0;
}

function storeHardcodedCourses(){
	
	var catalogueArray = getCatalogueArray();
	
	if(catalogueArray.length < 1){ //True if first time viewing the page. 
		var catalogue = document.getElementById("courses");
		
		//Iterates through the table row by row, and td by td.
		for(var i = 1, row; row = catalogue.rows[i]; i++){ //Skip row 1 since it contains table headers
			
			var info = [];
			
			for(var j = 0, cell; cell = row.cells[j]; j++){
				info.push(cell.innerText);
			}
			
			var entry = new catalogueEntry(info[0],info[1],info[2],info[3]);
			var catalogueKey = createCatalogueKey(entry);
			
			saveEntryToLocalStorage(entry, catalogueKey);
		}
	}
}

//Saves actual entry info to local storage with catalogue key
function saveEntryToLocalStorage(entry, key){
	
	if( addCatalogueArray(key) ){ //Returns true if successfully set
		
		entry = JSON.stringify(entry);
		localStorage.setItem(key, entry); //Stores catalogue entry into local storage with catalogueKey
	}
}

//The Key is all the course text concatenated together
function createCatalogueKey(entry){
	
	var key;
	var values = Object.values(entry);
	key = values[0];
	for(var i = 1; i < values.length; i++){
		key += values[i];
	}
	return key;
}

function getCatalogueArray(){
	
	var catalogueArray = localStorage.getItem("catalogueArray");
	if(!catalogueArray){
		catalogueArray = [];
		localStorage.setItem("catalogueArray", JSON.stringify(catalogueArray));
	}
	else{
		catalogueArray = JSON.parse(catalogueArray);
	}
	return catalogueArray;
}

function getSortedCatalogueEntries(catalogueKeys){
	
	var allCourseEntries = [];
	for(i = 0; i < catalogueKeys.length; i++){
		var currKey = catalogueKeys[i];
		var courseEntry = JSON.parse(localStorage[currKey]);
		allCourseEntries.push(courseEntry);
	}
	
	allCourseEntries.sort(compare); //Sorts alphabetically
	return allCourseEntries;
}

//Add to the array of catalogue keys for which the student has registered. 
//Returns True if successfully set, False otherwise
function addCatalogueArray(key){
	
	var catalogueArray = getCatalogueArray();
	
	if(catalogueArray.includes(key)){ //Check if already registered
		alert("This course is already in the catalogue.")
		return false;
	}
	else{
		catalogueArray.push(key);
		localStorage.setItem("catalogueArray", JSON.stringify(catalogueArray));
		return true;
	}
}

//Object that defines a entry into the catalogue. IE) One row in the courses table
function catalogueEntry(courseName, courseNum, roomNum, timeSlot){
	this.name = courseName;
	this.num = courseNum;
	this.room = roomNum;
	this.slot = timeSlot;
}

//Triggers when the add catalogue button is hit
function addToCatalogue(){
	var entry = createEntryFromTextbox();
	var entryKey = createCatalogueKey(entry);
	saveEntryToLocalStorage(entry, entryKey);
	createCatalogueTable();
}

//Triggers when the remove catalogue button is hit
function removeFromCatalogue(){
	var entry = createEntryFromTextbox();
	var entryKey = createCatalogueKey(entry);
	var removedCArray = getRemovedCoursesArray();
	
	var catalogueArray = getCatalogueArray();
	if(catalogueArray.includes(entryKey)) {
		
		//Save removed Courses
		if(!removedCArray.includes(entryKey)){
			removedCArray.push(entryKey);
			localStorage.setItem("removedCourses", JSON.stringify(removedCArray))
		}
		
		catalogueArray = catalogueArray.filter(function(e) { return e !== entryKey });
		localStorage.setItem("catalogueArray", JSON.stringify(catalogueArray));
		
		createCatalogueTable();
	}
}

//Creates a new course entry from the textbox's in the add to catalogue form
function createEntryFromTextbox(){
	
	var cName = document.getElementById("cName").value;
	var cNum = document.getElementById("cNum").value;
	var cRoom = document.getElementById("cRoom").value;
	var cSlot = document.getElementById("cSlot").value;
	
	var courseEntry = new catalogueEntry(cName, cNum, cRoom, cSlot);
	return courseEntry;
}


function createRemovedCourseTable(){
	var courseTbl = document.getElementById("preCourses");
	var courseKeys = getRemovedCoursesArray();
	var allCourseEntries = getSortedCatalogueEntries(courseKeys);
	
	//Destory Previous Table rows
	while(courseTbl.hasChildNodes()){
		courseTbl.removeChild(courseTbl.lastChild);
	}

	//Create Table Headers
	var tblHeaderTxt = ["Course Name", "Course Number", "Room Number", "Time Slot"];
	var headerRow = document.createElement("tr");
	for(var x = 0; x < tblHeaderTxt.length; x++){
		
		var headerth = document.createElement('th');
		var textNode = document.createTextNode(tblHeaderTxt[x]);
		headerth.appendChild(textNode);
		headerRow.appendChild(headerth);
	}
	courseTbl.appendChild(headerRow);

	//Add Course Entries to the table
	for(var i = 0; i < allCourseEntries.length; i++){
		var courseRow = document.createElement("tr");
		var entry = allCourseEntries[i];
		var entryData = Object.values(entry);
		
		for(var j = 0; j < 4; j++){
			var course_td = document.createElement('td');
			var txtNode = document.createTextNode(entryData[j]);
			course_td.appendChild(txtNode);
			courseRow.appendChild(course_td);
		}
		courseTbl.appendChild(courseRow);
	}
}


function getRemovedCoursesArray(){
	var courseArray = localStorage.getItem("removedCourses");
	if(!courseArray){
		courseArray = [];
		localStorage.setItem("removedCourses", JSON.stringify(courseArray));
	}
	else{
		courseArray = JSON.parse(courseArray);
	}
	return courseArray;
}















