app.controller('RouteCtrl', function ($scope, $log) {
    $scope.travel = {
        name: '放棄的夢被打碎'
    };
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

    $scope.createStart = function () {
        $scope.input_toolbar = {
            title: '建立起點',
            name: '起點地址',
            body: '備註'
        };
        $scope.createMode = true;
    }

    $scope.createMidway = function () {
        $scope.input_toolbar = {
            title: '建立中繼點',
            name: '中繼點地址',
            body: '備註'
        };
        $scope.createType = 'midway';
        $scope.createMode = true;
    }
    $scope.createEnd = function () {
        $scope.input_toolbar = {
            title: '建立終點',
            name: '終點地址',
            body: '備註'
        };
        $scope.createType = 'end';
        $scope.createMode = true;
    }

    $scope.createLocation = function (local) {
        local.type = $scope.createType;
        $scope.createType = 'other';
        $scope.createMode = false;
        $scope.local = {};
        $scope.locations.push(local);
    }

     $scope.randomMarkers = [];
    $scope.options = {scrollwheel: false};

    //基礎位置設定
    $scope.map = {
      center: {
        latitude: 23.60451,
        longitude: 120.1010
      },
      zoom: 8,
    };

    $scope.array = {
      latitude: 23.8911837121222, 
      longitude: 120.94801959289578, 
      title: "m0", 
      id: 0,
      icon:'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|A|FF0000|000000'
    }
    //標籤設定
    var GetMarker = function() {
      //這裡寫post拿Obj
      console.log($scope.array)
      return $scope.array;
    };
    
    //處理json標記用
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function() {
      var markers = [];    

      console.log(markers.push(GetMarker($scope.map.bounds)))
      $scope.randomMarkers = markers;
      //回傳到hmtl的最終資料
    }, true);
    $scope.array123 = {
          latitude: 27.8911837121222, 
          longitude: 120.94801959289578, 
          title: "m0", 
          id: 0,
          icon:'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|A|FF0000|000000'
    }
    
    var events = {
      places_changed: function (searchBox) {
        var place = searchBox.getPlaces();

        // 移動位置
        $scope.map = {
          "center": {
            "latitude": place[0].geometry.location.lat(),
            "longitude": place[0].geometry.location.lng()
          },
          "zoom": 8
        };
        console.log($scope.array123);
        var markers = [];    
        markers.push($scope.array123);
        $scope.randomMarkers = markers;
      }
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events};

    
})