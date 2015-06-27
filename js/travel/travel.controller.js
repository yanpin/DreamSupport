app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location) {
    $cookies.put('user_id', '123');
    $scope.create = function (tarvel) {
        tarvel.user_id = $cookies.get('user_id');
        console.log(tarvel);
        Travel.post(tarvel).then(function (response) {
            if (response) {
                $location.path('/route');
            }
        })
    }
})