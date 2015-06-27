app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location) {
    $cookies.put('user_id', '123');

    Travel.getList({ user_id: $cookies.get('user_id') }).then(function (travels) {
        $scope.travels = travels;
        console.log(travels);
    });

    $scope.create = function (tarvel) {
        tarvel.user_id = $cookies.get('user_id');
        Travel.post(tarvel).then(function (response) {
            if (response) {
                $location.path('/route/' + response.id);
            }
        })
    }
})