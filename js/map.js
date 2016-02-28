   
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

//function Model() {
  //Define stuff here to hold your information such as lists of markers, places, and other data you need
//}
//var MODEL = new Model();

// function ViewModel(){
//     var self = this;
//     self.data = ko.observableArray(markers);
//     self.filter = ko.observable('');
//     self.search = function(value){
//         self.markers.removeAll();
//         for (var i=0; i<markers.length; i++){
//          //   console.log(markers[]);
//             self.data().push(markers[i]);
//         };
//     };

// self.personMarkers = function() {
//     for (var i = 0; i < self.markers().length; i++) {
//     new addMarker(self.markers()[i].lat(), self.markers()[i].long(), self.people()[i].nameTitle());
//     };
//   };

//   self.personMarkers();
  
//};


//ko.applyBindings(new ViewModel());

Really all you should be using knockout for is the list view, the search bar, and possibly the map markers.

markers: visible or not in your filtering loop


