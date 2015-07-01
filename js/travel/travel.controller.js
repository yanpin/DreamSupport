app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location, $facebook, $rootScope) {
    if ($rootScope.flash) {
        if ($rootScope.flash.count > 1)
            $rootScope.flash = null;
        else
            $rootScope.flash.count++;
    }
    Travel.getList({ user_id: $cookies.get('user_id') }).then(function (travels) {
        $scope.travels = travels;
    });

    $scope.user_name = $cookies.get('user_name');

    $scope.create = function (tarvel) {
        tarvel.user_id = $cookies.get('user_id');
        Travel.post(tarvel).then(function (response) {
            if (response) {
                $location.path('/route/' + response.id);
            }
        })
    }

    $scope.remove = function (travel) {
        travel.remove().then(function() {
            for (var key in $scope.travels) {
                if ($scope.travels[key].id == travel.id) {
                    $scope.travels.splice(key, 1);
                    break;
                }
            }
        });
    }

    $scope.signout = function () {
        $cookies.remove('user_id');
        $cookies.remove('user_name');
        $facebook.logout();
        $location.path('/');
    }
})