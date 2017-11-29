/**
 * Add new events to the sidebar
 * 
 * @author Ling
 */
var events;

function createEventSideBar(allEventEntries)
{
	for(var i=0; i<allEventEntries.length; i++)
	{
		var event = document.createElement("li");
		var title = document.createElement("h4");
		var description = document.createElement("p");
		var monday = document.getElementById("monday");
		var tuesday = document.getElementById("tuesday");
		var wednesday = document.getElementById("wednesday");	
		var thursday = document.getElementById("thursday");
		var friday = document.getElementById("friday");
		
		var entry = allEventEntries[i];
		var entryData = Object.values(entry);
		
		title.innerHTML = entryData[1];
		description.innerHTML = entryData[2];
		event.appendChild(title);
		event.appendChild(description);	
		
		if (entryData[0] == "Monday")
		{
			monday.appendChild(event);
		}
		else if (entryData[0] == "Tuesday")
		{
			tuesday.appendChild(event);
		}
		else if (entryData[0] == "Wednesday")
		{
			wednesday.appendChild(event);
		}	
		else if (entryData[0] == "Thursday")
		{
			thursday.appendChild(event);
		}	
		else 
		{
			friday.appendChild(event);
		}					
	}
}
	
function getEventData()
{
	var url = "events.json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function() 
	{		
		if(request.status == 200)
		{
			events = JSON.parse(request.responseText);
			createEventSideBar(events);
		}
	};
	request.send(null);
}








