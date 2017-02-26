var nav, sideNav, sideNavClose;
window.onload = function () {
	nav = document.getElementById("hamburger");
	sideNav = document.getElementById("nav");
	sideNavClose = document.getElementById("close");
	nav.onclick = function () {
		sideNav.style.marginRight = 0;
		sideNavClose.onclick = function () {
			sideNav.style.marginRight = "-300px";
		};
	};
	
};

	var map;
	var src = "normal";

	var marker;
	function initMap() {
		var position = {
			coords: {
				latitude: 34.746958,
				longitude: -86.581305
			}
		};
		map = new google.maps.Map(document.getElementById('map'), {
			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			zoom: 9,
			styles: [{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#faf5ed"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5a6"}]},{"featureType":"road","elementType":"all","stylers":[{"weight":"1.00"},{"gamma":"1.8"},{"saturation":"0"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ffb200"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"gamma":"1"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"hue":"#b000ff"},{"saturation":"23"},{"lightness":"-4"},{"gamma":"0.80"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a0daf2"}]}]
		});
		
		marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		});
	}

	var kmlLayer;
	function loadKmlLayer(src, map) {
		kmlLayer = new google.maps.KmlLayer(src, {
			suppressInfoWindows: true,
			preserveViewport: true,
			map: map
		});
	}

	$("#searchForm").submit(function (e) {
		var search = $("#searchInput").val();
		console.log(search);
		e.preventDefault();
		$.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyBAXhGzuVE4kTNs1OesWKJ7RCH7pSylGfs",
			method: "GET"
		}).done(function (data) {
			if (data.results.length > 0) {
				map.setCenter(data.results[0].geometry.location);
				map.setZoom(9);
				
				if (marker) { marker.setMap(null); }
				marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
				});
				
			} else {
				console.log("No results!");
			}
		});

	});

	$("#datasheets li a").click(function (e) {
		if (kmlLayer) { kmlLayer.setMap(null); }
		if ($(this).data("map") != "normal") {
			loadKmlLayer("http://45.32.193.77/" + $(this).data("map"), map);
		}
		
		$("#datasheets li a.active").removeClass("active");
		$(this).addClass("active");
		sideNav.style.marginRight = "-300px";
	});
	

