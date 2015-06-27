app.controller('RouteCtrl', function ($scope, $log, Travel, Locations, $routeParams) {

    Travel.one($routeParams.travel_id).get().then(function (travel) {
        $scope.travel = travel;
        //console.log(travel);
        Locations.getList({travel_id: $routeParams.travel_id}).then(function (locations) {
            $scope.locations = locations;
            
            for(i=0;i<=$scope.locations.length-1;i++){
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
                console.log($scope.address);

                $scope.randomMarkers.push($scope.address);
            }
            
        })

    })
    
    $scope.weather = {
        message: '有午後雷陣雨'
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

    $scope.createLocation = function(local) {
      
        local.type = $scope.createType;
        $scope.createType = 'other';
        $scope.createMode = false;
        local.order = $scope.locations.length;
        $scope.locations.push(local);

        local.lat = $scope.latlng.A;
        local.lng = $scope.latlng.F;
        local.travel_id = $routeParams.travel_id;
        delete local.$$hashKey;
        
        console.log(local);
        Locations.post(local);

    }

    $scope.randomMarkers = [];
    $scope.options = {
        scrollwheel: false
    };


    var geocoder = new google.maps.Geocoder();
    //基礎位置設定
    $scope.map = {
        center: {
            latitude: 23.60451,
            longitude: 120.1010
        },
        zoom: 8,
    };
    
    
    $scope.uploaddata
    $scope.getLatLng = function(address) {
        geocoder.geocode({
            'address': address

        }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                $scope.icon ;
                $scope.latlng = results[0].geometry.location;
                $scope.map = {
                    center: {
                        latitude: results[0].geometry.location.A,
                        longitude: results[0].geometry.location.F
                    }
                };
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