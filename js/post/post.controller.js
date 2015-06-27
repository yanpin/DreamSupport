app.controller('PostCtrl', function ($scope, Post) {
    Post.getList().then(function(posts) {
        $scope.posts = posts;
    });
})