app.controller('ShowCtrl', function ($scope, Post, $routeParams) {
    Post.one($routeParams.postId).get().then(function (post) {
        $scope.post = post;
    });
})