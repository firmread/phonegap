var map;
		  
$(document).on('pageinit', '#mapScreen', function(){  
	map = L.map('map'); 				L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 16
}).addTo(map);
			 
	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
			 
	map.locate({setView: true, maxZoom: 16});    
});
		  
function onLocationFound(e) {
	L.marker(e.latlng).addTo(map);
}

function onLocationError(e) {
	alert(e.message);
}