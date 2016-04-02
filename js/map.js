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
        lng: 23.30000
    }, {
        title: "Saint Disciple Peter and Paul Cathedral",
        lat: 55.97667,
        lng: 23.37000
    }, {
        title: "Siauliai University",
        lat: 55.9264,
        lng: 23.3044
    }, {
        title: "Akropolis Shoping Mall",
        lat: 55.8963,
        lng: 23.24667
    }, {
        title: "Saules miestas Shoping Mall",
        lat: 55.9463,
        lng: 23.33667
    }, {
        title: "Siauliai International Airport",
        lat: 55.8939,
        lng: 23.3947
    }, {
        title: "Hill of Crosses",
        lat: 56.0153,
        lng: 23.4167
    }]);


    var ViewModel = function() {
        var self = this;
        var bounds = new google.maps.LatLngBounds();

        var Pointer = function(map, title, lat, lng, description) {
            this.title = ko.observable(title);
            this.lat = ko.observable(lat);
            this.lng = ko.observable(lng);
            this.description = ko.observable(description);

            this.marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: 'img/icon.png'
            });

            bounds.extend(this.marker.position);
        };

        var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < markers().length; i++) {
            markers()[i].pointer = new Pointer(map, markers()[i].title, markers()[i].lat, markers()[i].lng, markers()[i].description);
            var description = markers()[i].pointer.description();
            var title = markers()[i].pointer.title();


            google.maps.event.addListener(markers()[i].pointer.marker, 'click', (function(pointer, description, infowindow, title) {

                return function() {
                    viewModel.getWikis(title, infowindow);
                    infowindow.open(map, pointer.marker);
                    pointer.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        pointer.marker.setAnimation(null);
                    }, 750);
                };
            })(markers()[i].pointer, description, infowindow, title));
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

    self.getWikis = function(title, infowindow) {

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + title  +
                  '&format=json&callback=wikiCallback',
      dataType: "jsonp",
      timeout: 6000,
      success: function (response) {

          description = 'http://en.wikipedia.org/wiki/' + response[0];
          infowindow.setContent("<div class ='info-window'>" + '<h3>' + title + '</h3>' + '<p class="description">' + '<a href="' + description + '">' + '<img style= "width: 40px;" src="img/info.png">'+'</a>' + '</p>'+'</div>');
        }

    }).fail(function(x, t, m) {
        if (t==='timeout'){alert("You are offline");
          } else {
            alert(t);
          }
  });

  };


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