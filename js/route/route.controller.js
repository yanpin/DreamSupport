app.controller('RouteCtrl', function ($scope) {
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
})