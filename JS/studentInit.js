/**
 * Handles the startup of the student.html page
 * @author Alex Gillis 
 */

window.onload = init;

function init(){
	
	//TESTING ONLY
	//localStorage.clear();
	
	displayRegisteredCourses(); //registration.js
	
	var registerBtn = document.getElementById("registerBtn");
	registerBtn.onclick = stuPageRegisterBtn; //registration.js
}