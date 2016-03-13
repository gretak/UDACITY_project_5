
function app() {

    var map;

    function initMap() {
        var mainPlace = new google.maps.LatLng(55.9333, 23.3167);

        var mapOptions = {
            center: mainPlace,
            zoom: 11
        };

        map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
    }


    var markers = ko.observableArray([{
        title: "Rekyva Lake",
        lat: 55.86667,
        lng: 23.30000,
        link: "More info",
        description: "Rekyva is the largest watershed lake in Lithuania.",
        webaddress: "https://lt.wikipedia.org/wiki/R%C4%97kyvos_e%C5%BEeras"
    }, {
        title: "Saint Disciple Peter and Paul Cathedral",
        lat: 55.97667,
        lng: 23.37000,
        link: "More info",
        description: "Built in 1626. Gained cathedral status after Pope John Paul II tour in 1997. Great example of renaisschitecture.",
        webaddress: "https://en.wikipedia.org/wiki/Roman_Catholic_Diocese_of_%C5%A0iauliai"
    }, {
        title: "Siauliai University",
        lat: 55.9264,
        lng: 23.3044,
        link: "Visit website",
        description: "Siauliai University is the biggest university in the Northern Lithuania and belongs both to regional and classical types.",
        webaddress: "http://www.su.lt"
    }, {
        title: "Shoping Mall",
        lat: 55.8963,
        lng: 23.24667,
        link: "Visit website",
        description: "Akropolis shopping centre in Siauliai, opened in spring 2009, and offering an area of 50,000 m2, combines rational size of a shopping and recreation centre.",
        webaddress: "http://www.akropolis.lt"
    }, {
        title: "Shoping Mall",
        lat: 55.9463,
        lng: 23.33667,
        link: "Visit website",
        description: "Saules miestas, opened in 2007 spring, is one of the most recent and probably the most modern shopping and entertainment centre in Siauliai City. The total area of the shopping centre is 41,526 m², there are located  integrated bus station,",
        webaddress: "http://www.saulesmiestas.lt/en"
    }, {
        title: "Siauliai International Airport",
        lat: 55.8939,
        lng: 23.3947,
        link: "Visit website",
        description: "Home to the NATO Baltic Air Policing forward deployment, providing airspace security for the three Baltic members of NATO.",
        webaddress: "http://www.siauliai-airport.com"
    }, {
        title: "Hill of Crosses",
        lat: 56.0153,
        lng: 23.4167,
        link: "Visit website",
        description: "The Hill of Crosses ia an historical architectural monument, it is a unique composition of folk art.",
        webaddress: "http://www.hillofcrosses.com"
    }]);


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
                position: new google.maps.LatLng(lat, lng),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: '../img/icon.png'
            });

            bounds.extend(this.marker.position);
        };

        var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < markers().length; i++) {
            markers()[i].pointer = new Pointer(map, markers()[i].title, markers()[i].lat, markers()[i].lng, markers()[i].link, markers()[i].description, markers()[i].webaddress);
            var description = markers()[i].pointer.description();
            var title = markers()[i].pointer.title();
            var link = markers()[i].pointer.link();
            var webaddress = markers()[i].pointer.webaddress();

            google.maps.event.addListener(markers()[i].pointer.marker, 'click', (function(pointer, description, infowindow, title, webaddress, link) {

                return function() {
                    infowindow.setContent("<div class ='info-window'>" + '<h2>' + title + '</h2>' + '<p class="description">' + description + '</p>' + '<p>' + '<a href="' + webaddress + '">' + link + '</a>' + '</p>' + "</div>");
                    infowindow.open(map, pointer.marker);
                    pointer.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        pointer.marker.setAnimation(null);
                    }, 750);
                };
            })(markers()[i].pointer, description, infowindow, title, webaddress, link));
        }

        map.fitBounds(bounds);

        self.locations = ko.observableArray(markers());
        self.visibleLocations = ko.observableArray();
        self.query = ko.observable('');
        self.search = ko.computed(function() {
            self.visibleLocations.removeAll();
            var filter = self.query().toLowerCase();

            ko.utils.arrayFilter(self.locations(), function(location) {
                var searchIndex = location.title.toLowerCase().indexOf(filter);
                if (searchIndex >= 0) {
                    location.pointer.marker.setVisible(true);
                    self.visibleLocations.push(location);
                } else {
                    location.pointer.marker.setVisible(false);
                }
            });
            return self.visibleLocations();
        });

        self.listItemClick = function(item) {
            clickedMarker = item.pointer.marker;
            google.maps.event.trigger(clickedMarker, 'click');
        };
    };


    var viewModel;


    function startApp() {
        initMap();
        viewModel = new ViewModel();
        ko.applyBindings(viewModel);
    }

    startApp();

}