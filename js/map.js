    function initMap() {

        var locations =
        [['Siauliai University', 55.9264, 23.3244],
        ['Shoping center', 55.933333, 23.316667],
        ['Siauliai Airport',55.8939, 23.3947],
        ['Hill of Crosses (Monument)', 56.0153, 23.4167]
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 55.9333,
                lng: 23.3167
            },
            zoom: 11
            });

        var infoBubble = new google.maps.InfoBubble();
        var marker, i;


        for (i = 0; i < locations.length; i++) {  
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                infoBubble.setContent(locations[i][0]);
                infoBubble.open(map, marker);
                }
            })(marker, i));
            }
    }
