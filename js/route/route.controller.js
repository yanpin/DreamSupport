app.controller('RouteCtrl', function ($scope, $log, Travel, Locations, $routeParams) {

    $scope.wait = true;

    Travel.one($routeParams.travel_id).get().then(function (travel) {
        $scope.travel = travel;
        Locations.getList({travel_id: $routeParams.travel_id}).then(function (locations) {
            $scope.locations = locations;
            $scope.wait = false;

            for(var i = 0; i <= $scope.locations.length - 1; i++){
                console.log($scope.locations[i].type);
                if($scope.locations[i].type == 'start'){    
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|S|E72323|FFFFFF'
                }else if($scope.locations[i].type == 'midway'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|M|5cb85c|FFFFFF'
                }else if($scope.locations[i].type == 'end'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|E|f0ad4e|FFFFFF'
                }

                $scope.address = {
                    latitude: $scope.locations[i].lat,
                    longitude: $scope.locations[i].lng,
                    title: $scope.locations[i].name,
                    id: $scope.locations[i].id,
                    icon: $scope.icon
                }

                if ($scope.locations.length != 0) {
                    $scope.createType = 'midway';
                }
                $scope.randomMarkers.push($scope.address);
            }
        })
    })

    $scope.weathersIcon = {
        '多雲短暫陣雨': 'wi-hail',
        '晴時多雲': 'wi-day-cloudy',
        '晴午後短暫雷陣雨': 'wi-day-rain-wind'
    };
    $scope.loadInformation = function (location) {
        $scope.search = true;
        Locations.one(location.id).get().then(function (response) {
            location.weathers = response.weathers.weatherElement;
            for (var i = 0; i < location.weathers.length; i++) {
                var weather = location.weathers[i];
                if (weather.elementName == 'Wx') {
                    location.weathers = weather.time;
                    break;
                }
            }
            console.log(location.weathers);
            for (var i = 0; i < location.weathers.length; i++) {
                var weather = location.weathers[i];
                var time = new Date(weather.startTime);
                weather.startTime = parseInt(time.getMonth() + 1) + '/' + time.getDate();
                var time = new Date(weather.endTime);
                weather.endTime = parseInt(time.getMonth() + 1) + '/' + time.getDate();
                location.weathers[i] = weather;
            }
            location.hospitals = response.hospitals;
            $scope.search = false;
            setMapCenter(location.lat, location.lng, 10);
        });
    };

    $scope.createType = 'start';

    $scope.createStart = function() {
        $scope.input_toolbar = {
            title: '建立起點',
            name: '起點地址',
            body: '備註'
        };
        $scope.createMode = true;
    }

    $scope.createMidway = function() {
        $scope.input_toolbar = {
            title: '建立中繼點',
            name: '中繼點地址',
            body: '備註'
        };
        $scope.createType = 'midway';
        $scope.createMode = true;
    }
    $scope.createEnd = function() {
        $scope.input_toolbar = {
            title: '建立終點',
            name: '終點地址',
            body: '備註'
        };
        $scope.createType = 'end';
        $scope.createMode = true;
    }

    $scope.create_button_disable = false;

    $scope.createLocation = function(createLocal) {
        $scope.create_button_disable = true;
        createLocal.type = $scope.createType;
        createLocal.order = $scope.locations.length;

        createLocal.lat = $scope.latlng.A;
        createLocal.lng = $scope.latlng.F;
        createLocal.travel_id = $routeParams.travel_id;
        delete createLocal.$$hashKey;

        Locations.post(createLocal).then(function(response) {
            $scope.locations.push(createLocal);
            $scope.createType = 'midway';
            $scope.createMode = false;
            $scope.create_button_disable = false;
        });

    }

    $scope.randomMarkers = [];
    $scope.options = {
        scrollwheel: false
    };


    var geocoder = new google.maps.Geocoder();

    var setMapCenter = function (lat, lng, zoom) {
        $scope.map = {
            center: {
                latitude: lat,
                longitude: lng
            },
            zoom: zoom,
        };
    }
    setMapCenter(23.60451, 120.1010, 8);


    $scope.getLatLng = function(address) {
        geocoder.geocode({
            'address': address

        }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                $scope.icon ;
                $scope.latlng = results[0].geometry.location;
                setMapCenter(results[0].geometry.location.A, results[0].geometry.location.F, 8);
                $scope.address = {
                    latitude: results[0].geometry.location.A,
                    longitude: results[0].geometry.location.F,
                    title: address,
                    id: 1,
                }

                if($scope.createType == 'start'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|S|E72323|FFFFFF'
                } else if($scope.createType == 'midway'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|M|5cb85c|FFFFFF'
                } else if($scope.createType == 'end'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|E|f0ad4e|FFFFFF'
                }
                $scope.address = {
                    latitude: results[0].geometry.location.A,
                    longitude: results[0].geometry.location.F,
                    title: address,
                    id: 0, 
                    icon: $scope.icon
                }    
                
                $scope.randomMarkers.push($scope.address);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

   

})