app.controller('MsgCreateCtrl', function ($scope, Msg, $routeParams) {
    $scope.leaveMsg = function (msg) {
        msg['post_id'] = $routeParams.postId;
        console.log(msg['post_id'] = $routeParams.postId) 
        Msg.post(msg);

    }
})