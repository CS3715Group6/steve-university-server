/**
 * Central file that handles all tasks upon page loading for all campus pages
 * @author Alex Gillis 
 */

window.onload = init;

function init(){
	
	//TESTING ONLY
	//localStorage.clear();
	
	storeHardcodedCourses(); //courseDisplay.js
	createCatalogueTable(); //courseDisplay.js
	var registerBtn = document.getElementById("registerBtn");
	registerBtn.onclick = registerBtnClicked; //registration.js
	
	var addCatalogueBtn = document.getElementById("catalogueBtn");
	addCatalogueBtn.onclick = addToCatalogue; //courseDisplay.js
	var removeCatalogueBtn = document.getElementById("removeBtn");
	removeCatalogueBtn.onclick = removeFromCatalogue; //courseDisplay.js
	var courseOptions = document.getElementById("courseNumber");
	courseOptions.onchange = generateSlots;
}