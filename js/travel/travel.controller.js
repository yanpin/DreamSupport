app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location, $facebook) {

    Travel.getList({ user_id: $cookies.get('user_id') }).then(function (travels) {
        $scope.travels = travels;
        console.log(travels);
    });

    $scope.create = function (tarvel) {
        tarvel.user_id = $cookies.get('user_id');
        console.log(tarvel);
        Travel.post(tarvel).then(function (response) {
            if (response) {
                $location.path('/route/' + response.id);
            }
        })
    }

    $scope.logout = function () {
        $facebook.logout();
    }
})