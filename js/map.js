   
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.9333,
            lng: 23.3167
        },
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infoWindow = new google.maps.InfoWindow();
    var marker, i;

    $.getJSON("js/data.json", function( json ) { 

        for (i = 0; i < json.markers.length; i++) { 

         var data = json.markers[i];
         var myLatlng = new google.maps.LatLng(data.lat, data.lng);
         marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'css/icon.png',
            position: myLatlng,
            title: data.title
        });

         (function (marker, data) {
            google.maps.event.addListener(marker, 'click', function(e) {
                infoWindow.setContent("<div class ='info-window'>"+'<h2>'+data.title+'</h2>'+'<p class="description">'+data.description+'</p>'+'<p>'+'<a href="'+data.webaddress+'">'+data.link+'</a>'+'</p>'+"</div>");
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }

});
    
}


