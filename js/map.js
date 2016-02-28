    function initMap() {

        var markers = [
        {
            "title": 'Rekyva Lake',
            "lat": '55.86667',
            "lng": '23.30000',
            "link": 'More info',
            "description": 'Rekyva is the largest watershed lake in Lithuania.',
            "webaddress": 'https://lt.wikipedia.org/wiki/R%C4%97kyvos_e%C5%BEeras'
        },
        {
            "title": 'Saint Disciple Peter and Paul Cathedral',
            "lat": '55.97667',
            "lng": '23.37000',
            "link": 'More info',
            "description": 'The church is Lithuania most prominent example of renaissance-mannerist architecture.Some historical accounts consider this one of the oldest sundials in Lithuania, dating it to around 1625 or shortly after.',
            "webaddress": 'https://en.wikipedia.org/wiki/Roman_Catholic_Diocese_of_%C5%A0iauliai'
        },
        {
            "title": 'Siauliai University',
            "lat": '55.9264',
            "lng": '23.3044',
            "link": 'Visit website',
            "description": 'Siauliai University is the biggest university in the Northern Lithuania and belongs both to regional and classical types.',
            "webaddress": 'http://www.su.lt'
        },
        {
            "title": 'Shoping Mall',
            "lat": '55.89633',
            "lng": '23.246667',
            "link": 'Visit website',
            "description": 'Akropolis shopping centre in Siauliai, opened in spring 2009, and offering an area of 50,000 m2, combines rational size of a shopping and recreation centre.',
            "webaddress": 'http://www.akropolis.lt'
        },
        {
            "title": 'Shoping Mall',
            "lat": '55.94633',
            "lng": '23.336667',
            "link": 'Visit website',
            "description": 'Saules miestas, opened in 2007 spring, is one of the most recent and probably the most modern shopping and entertainment centre in Siauliai City. The total area of the shopping centre is 41,526 m², there are located  integrated bus station,',
            "webaddress": 'http://www.saulesmiestas.lt/en'
        },
        {
            "title": 'Siauliai International Airport',
            "lat": '55.8939',
            "lng": '23.3947',
            "link": 'Visit website',
            "description": 'Home to the NATO Baltic Air Policing forward deployment, providing airspace security for the three Baltic members of NATO.',
            "webaddress": 'http://www.siauliai-airport.com'
        },
        {
            "title": 'Hill of Crosses',
            "lat": '56.0153',
            "lng": '23.4167',
            "link": 'Visit website',
            "description": 'The Hill of Crosses ia an historical architectural monument, it is a unique composition of folk art.',
            "webaddress": 'http://www.hillofcrosses.com'
        }
        ];


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


        for (i = 0; i < markers.length; i++) {  
            var data = markers[i];
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
    }
    
