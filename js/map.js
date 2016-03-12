   
//function initMap() {
function app() {

var map;

function initMap(){
  var mainPlace = new google.maps.LatLng(55.9333,23.3167);
          
          var mapOptions = {
           center: mainPlace,
            zoom: 11
            };

  map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
  }

var markers = ko.observableArray ([
        {
            title: "Rekyva Lake",
            lat: 55.86667,
            lng: 23.30000,
            link: "More info",
            description: "Rekyva is the largest watershed lake in Lithuania.",
            webaddress: "https://lt.wikipedia.org/wiki/R%C4%97kyvos_e%C5%BEeras"
        },
        {
            title: "Saint Disciple Peter and Paul Cathedral",
            lat: 55.97667,
            lng: 23.37000,
            link: "More info",
            description: "Tt example of renaisschitecture. Some historical accounts.",
            webaddress: "https://en.wikipedia.org/wiki/Roman_Catholic_Diocese_of_%C5%A0iauliai"
        },
        {
            title: "Siauliai University",
            lat: 55.9264,
            lng: 23.3044,
            link: "Visit website",
            description: "Siauliai University is the biggest university in the Northern Lithuania and belongs both to regional and classical types.",
            webaddress: "http://www.su.lt"
        },
        {
            title: "Shoping Mall",
            lat: 55.8963,
            lng: 23.24667,
            link: "Visit website",
            description: "Akropolis shopping centre in Siauliai, opened in spring 2009, and offering an area of 50,000 m2, combines rational size of a shopping and recreation centre.",
            webaddress: "http://www.akropolis.lt"
        },
        {
            title: "Shoping Mall",
            lat: 55.9463,
            lng: 23.33667,
            link: "Visit website",
            description: "Saules miestas, opened in 2007 spring, is one of the most recent and probably the most modern shopping and entertainment centre in Siauliai City. The total area of the shopping centre is 41,526 m², there are located  integrated bus station,",
            webaddress: "http://www.saulesmiestas.lt/en"
        },
        {
            title: "Siauliai International Airport",
            lat: 55.8939,
            lng: 23.3947,
            link: "Visit website",
            description: "Home to the NATO Baltic Air Policing forward deployment, providing airspace security for the three Baltic members of NATO.",
            webaddress: "http://www.siauliai-airport.com"
        },
        {
            title: "Hill of Crosses",
            lat: 56.0153,
            lng: 23.4167,
            link: "Visit website",
            description: "The Hill of Crosses ia an historical architectural monument, it is a unique composition of folk art.",
            webaddress: "http://www.hillofcrosses.com"
        }
]);


var ViewModel = function() {
    var self = this;
    var bounds = new google.maps.LatLngBounds();

    var Pointer = function(map, title, lat, lng, link, description, webaddress) {
        this.title = ko.observable(title);
        this.lat = ko.observable(lat);
        this.lng = ko.observable(lng);
        this.link = ko.observable(link);
        this.description = ko.observable(description);
        this.webaddress = ko.observable(webaddress);

        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'css/icon.png'
        });

        bounds.extend(this.marker.position);
    };

        // google.maps.event.addListener(map, 'click', function() {
        // infowindow.close();
        // });
var infowindow = new google.maps.InfoWindow();

        for (i=0; i<markers().length; i++) {
            markers()[i].pointer = new Pointer(map, markers()[i].title, markers()[i].lat, markers()[i].lng, markers()[i].link, markers()[i].description, markers()[i].webaddress);
            var content = markers()[i].pointer.description();
            var heading = markers()[i].pointer.title();

            google.maps.event.addListener(markers()[i].pointer.marker,'click', (function(pointer, content, infowindow, heading){
                
                return function() {
                  //  viewModel.getinfo(heading, infowindow);
                  infowindow.setContent('<h1>' + heading + '</h1>' + '<a href="' + content + '">' + 'Wikipedia Link to ' +
                  heading + '</a>');
                    infowindow.open(map, pointer.marker);
                    pointer.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {pointer.marker.setAnimation(null); }, 750);
                };
            }) (markers()[i].pointer, content, infowindow, heading));
        }

  //      console.log(bounds);
        map.fitBounds(bounds);

        self.locations = ko.observableArray(markers());
        self.visibleLocations = ko.observableArray();
        self.query = ko.observable('');
        self.search = ko.computed(function(){
            self.visibleLocations.removeAll();
            var filter = self.query().toLowerCase();

            ko.utils.arrayFilter(self.locations(), function(location){
                var searchIndex = location.title.toLowerCase().indexOf(filter);
                if (searchIndex>=0) {
                    location.pointer.marker.setVisible(true);
                    self.visibleLocations.push(location);
                }
                else{
                    location.pointer.marker.setVisible(false);
                }
            });
            return self.visibleLocations();
        });

//};

// self.getinfo = function(heading, infowindow) {
//     //get Wiki articles
//     var thePlace = heading;
//     var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + thePlace  +
//                   '&format=json&callback=wikiCallback';
//     $.ajax({
//       url: wikiUrl,
//       dataType: "jsonp",
//       timeout: 8000,
//       //jsonp: "callback",
//       success: function ( response) {
//           var articleStr = response[0];
//           var url = 'http://en.wikipedia.org/wiki/' + articleStr;

//           content = url;
//           infowindow.setContent('<h4>' + heading + '</h4>' + '<a href="' + content + '">' + 'Wikipedia Link to ' +
//                   heading + '</a>');
//         }

//     }).fail(function(x, t, m) {
//         if (t==='timeout'){alert("got timeout");
//           } else {
//             alert(t);
//           }
//   });

//   }; //end getWikis

self.listItemClick = function(item) {
  clickedMarker = item.pointer.marker;
  google.maps.event.trigger(clickedMarker, 'click');
  };
};
var viewModel;

    // function initialize() {

    // }

    function startApp(){
        initMap();
    viewModel = new ViewModel();
    ko.applyBindings(viewModel);
}

startApp();
}
 //   google.maps.event.addDomListener(window, 'load', initialize);


//     self.points = ko.observableArray(markers);
//     self.query = ko.observable('');
//     self.search = ko.computed(function(){
//     return ko.utils.arrayFilter(self.points(), function(point){
//         console.log(point.lat, point.lng);
//       return point.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
//     });
//   });
// };

// ko.applyBindings(new viewModel());

// inserted from beer exp

//     $.getJSON("js/data.json", function( json ) { 

//         for (i = 0; i < json.markers.length; i++) { 

//          var data = json.markers[i];
//          var myLatlng = new google.maps.LatLng(data.lat, data.lng);
         
//          marker = new google.maps.Marker({
//             map: map,
//             animation: google.maps.Animation.DROP,
//             icon: 'css/icon.png',
//             position: myLatlng,
//             title: data.title,
//         });

//          (function (marker, data) {
//             google.maps.event.addListener(marker, 'click', function(e) {
//                 infoWindow.setContent("<div class ='info-window'>"+'<h2>'+data.title+'</h2>'+'<p class="description">'+data.description+'</p>'+'<p>'+'<a href="'+data.webaddress+'">'+data.link+'</a>'+'</p>'+"</div>");
//                 infoWindow.open(map, marker);
//             });
//         })(marker, data);
//     }
// });  
//}

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
//     new addMarker(self.markers()[i].lat(), self.markers()[i].long(), self.people()[i].titleTitle());
//     };
//   };

//   self.personMarkers();
  
//};


//ko.applyBindings(new ViewModel());

//Really all you should be using knockout for is the list view, the search bar, and possibly the map markers.

//markers: visible or not in your filtering loop


