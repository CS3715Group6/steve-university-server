/**
 * Add new events to the sidebar
 * 
 * @author Ling
 */

function createNewEvent()
{	
	var eventArray = getEventArray();
	var currentDate = new Date();
	var eventDay = document.getElementById("eventday").value;
	var eventTitle = document.getElementById("eventtitle").value;
	var eventDescription = document.getElementById("eventdescription").value;
	var key = "event_" + currentDate.getTime();
	var eventObj = 
	{
		"day" : eventDay,
		"title" : eventTitle,
		"description" :	eventDescription
	};
	localStorage.setItem(key, JSON.stringify(eventObj));
	eventArray.push(key);
	localStorage.setItem("eventArray", JSON.stringify(eventArray));
	AddEventToDom(key, eventObj);	
}

function addEventToDom(key, eventObj)
{
	var event = document.createElement("li");
	var title = document.createElement("h4");
	var description = document.createElement("p");
	event.setAttribute("id", key);
	var monday = document.getElementById("monday");
	var tuesday = document.getElementById("tuesday");
	var wednesday = document.getElementById("wednesday");	
	var thursday = document.getElementById("thursday");
	var friday = document.getElementById("friday");
		
	title.innerHTML = eventObj.title;
	description.innerHTML = eventObj.description;
	event.appendChild(title);
	event.appendChild(description);	
	
	if (eventObj.day == "monday")
	{
		monday.appendChild(event);
	}
	else if (eventObj.day == "tuesday")
	{
		tuesday.appendChild(event);
	}
	else if (eventObj.day == "wednesday")
	{
		wednesday.appendChild(event);
	}	
	else if (eventObj.day == "thursday")
	{
		thursday.appendChild(event);
	}	
	else 
	{
		friday.appendChild(event);
	}	
}

function getEventArray()
{
	var eventArray = localStorage.getItem("eventArray");
	if (!eventArray)
	{
		eventArray = [];
		localStorage.setItem("eventArray", JSON.stringify(eventArray));
	}
	else
	{
		eventArray = JSON.parse(eventArray);
	}
	return eventArray;
}






