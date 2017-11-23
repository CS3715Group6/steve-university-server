/**
 * updates campus description by inputting new description in a text area and click the "Submit" button
 *
 * @author Ling
 */

//store new description in local storage
function createNewNortern()
{
	var value = document.getElementById("newNorthernDescription").value;
	localStorage.setItem("newNorthernDescription", value);	
	updateNorthernDescription(value);
}

function createNewSouthern()
{
	var value = document.getElementById("newSouthernDescription").value;
	localStorage.setItem("newSouthernDescription", value);	
	updateSouthernDescription(value);
}

function createNewEastern()
{
	var value = document.getElementById("newEasternDescription").value;
	localStorage.setItem("newEasternDescription", value);	
	updateEasternDescription(value);
}

//update campus description in the corresponding p elements
function updateNorthernDescription(value)
{
	var northernDescription = document.getElementById("northernDescription");
	northernDescription.innerHTML = value;	
}

function updateSouthernDescription(value)
{
	var southernDescription = document.getElementById("southernDescription");
	southernDescription.innerHTML = value;	
}

function updateEasternDescription(value)
{
	var easeternDescription = document.getElementById("easternDescription");
	easeternDescription.innerHTML = value;	
}

