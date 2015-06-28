app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location, $facebook) {

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
                if (travels[key].id == travel.id) {
                    delete travels[key];
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