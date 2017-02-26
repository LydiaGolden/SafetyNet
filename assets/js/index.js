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

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: new google.maps.LatLng(34.737394, -86.590026),
			zoom: 9,
			styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#BBBBBB"}]},
        {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#141014"}]},
         {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#321343"}]},
        {"featureType":"road","elementType":"geometry","stylers":[{"saturation":-100},{"lightness":45}]},
        {"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},
        {"featureType":"water","elementType":"geometry","stylers":[{"color":"#812C0A"},{"visibility":"on"}]}]
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

	var marker;
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
	

