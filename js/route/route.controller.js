app.controller('RouteCtrl', function ($scope, $log, Travel, Locations, $routeParams) {
    $scope.travelId ;
    

    Travel.getList({user_id: '123'}).then(function (travels) {
        $scope.travels = travels;      
        $scope.i = $scope.travels.length - 1;
        //抓最後一筆obj
        $scope.travelId = $scope.travels[$scope.i].id;
        //console.log($scope.travelId);
        $scope.travel  = { 
            name:$scope.travels[$scope.i].name
        }
    })
    Locations.getList({travel_id: $scope.travelId}).then(function (locations) {
        $scope.locations = locations;
        console.log($scope.travelId, Locations);
    })
    

    $scope.locations = [{
        name: '天龍國',
        remark: '墨鏡是本體',
    }, {
        name: '民主聖地',
        remark: 'U質選擇'
    }, {
        name: '高譚市',
        remark: '小丑',
    }];

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
        local.travel_id = $scope.travelId;
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
                console.log(address);
                if($scope.createType == 'start'){    
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|S|E72323|FFFFFF'
                    
                }else if($scope.createType == 'midway'){
                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|M|5cb85c|FFFFFF'
                    
                }else if($scope.createType == 'end'){

                    $scope.icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|E|f0ad4e|FFFFFF'
                    
                }
                $scope.address = {
                    latitude: results[0].geometry.location.A,
                    longitude: results[0].geometry.location.F,
                    title: address,
                    id: 0, 
                    icon: $scope.icon
                }
                $scope.uploaddata = {
                    name:       address,
                    order:      '',
                    remark:     '',
                    lat:        results[0].geometry.location.A,
                    lng:        results[0].geometry.location.F,
                    icon:       '',
                    type:       $scope.createType,
                    travel_id:  $scope.travelId 
                }
                
                
                var markers = [];
                markers.push($scope.address);
                $scope.randomMarkers = markers;
                
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

   

})