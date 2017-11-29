/**
 * a single js file that handles window.onload for the index page
 * 
 * @author Ling
 */

window.onload = init;

function init(){
	
	//the campus description update section
	//get campus description update buttons
	var northernButton = document.getElementById("updateNorthernDescription");
	var southernButton = document.getElementById("updateSouthernDescription");
	var easternButton = document.getElementById("updateEasternDescription");
	
	//create button handlers
	northernButton.onclick = createNewNortern;
	southernButton.onclick = createNewSouthern;
	easternButton.onclick = createNewEastern;
	
	//ensure campus descriptions are persistent with those in local storage 
	var newNorthernDescription =localStorage.getItem("newNorthernDescription");
	var newSouthernDescription = localStorage.getItem("newSouthernDescription");
	var newEasternDescription = localStorage.getItem("newEasternDescription");
	if(newSouthernDescription)
	{
		updateNorthernDescription(newNorthernDescription);	
	}
	if(newSouthernDescription)
	{
		updateSouthernDescription(newSouthernDescription);	
	}
	if(newEasternDescription)
	{
		updateEasternDescription(newEasternDescription);	
	}
	
	//the event update section
	//get the event update button
//	var button = document.getElementById("updateEvent");
//	button.onclick = createNewEvent; //handler
//	
//	var eventArray = getEventArray(); //addEvent.js
//	
//	//ensure events are persistent with local storage
//	for (var i = 0; i < eventArray.length; i++)
//	{
//		var key = eventArray[i];
//		var eventObj = JSON.parse(localStorage.getItem(key));
//		addEventToDom(key, eventObj);
//	}
	
	getEventData(); //addEvents.js	
}