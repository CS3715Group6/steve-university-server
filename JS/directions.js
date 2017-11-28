/**
 * 
 */
window.onload = init;

function init(){
	var button = document.getElementById("directions_button");
	button.onclick=handleButtonClick;
}
function handleButtonClick(){
	getMyLocation();
	
}
function getMyLocation() {
	if (navigator.geolocation) {
		displayLocation(new coordinates(48.614518, -53.713885));
		//navigator.geolocation.getCurrentPosition(displayLocation);
	} else {
			alert("Geolocation not supported");
	}
}

function coordinates(lat, long){
	this.latitude = lat;
	this.longitude = long;
}
	
function displayLocation(coords) {
	
	var latitude = coords.latitude;
	var longitude = coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
		
	var km = getDistance(coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from Steve University";
	myMap(latitude, longitude);
	initialize();
}
	
function getDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
	Math.cos(startLatRads) * Math.cos(destLatRads) *
	Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
}
	
function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}
	
var ourCoords = {
	latitude: 47.614518,
	longitude: -52.713885
};
	
	
function myMap(startCoords, destCoords) {
	var pointA = new google.maps.LatLng(startCoords, destCoords),
    pointB = new google.maps.LatLng(ourCoords.latitude, ourCoords.longitude);
		
	var mapProp= {		
    center:new google.maps.LatLng(startCoords, destCoords),
    zoom:5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp),
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
    	map: map
    }),
	markerA = new google.maps.Marker({
		position: pointA,
		title: "Our Current Location",
		label: "You are here",
		map: map
	}),
	markerB = new google.maps.Marker({
		position: pointB,
		title: "Steve University",
		label: "Steve University Campus",
		map: map
	});

	
	  getRoute(directionsService, directionsDisplay, pointA, pointB);

}

function getRoute(directionsService, directionsDisplay, pointA, pointB) {
		directionsService.route({
				origin: pointA,
				destination: pointB,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed ' + status);
			}
		});
}
initMap();






