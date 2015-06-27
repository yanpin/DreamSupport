app.controller('MsgCtrl', function ($scope, Msg, $routeParams) {
    Msg.getList({post_id: $routeParams.postId}).then(function (msgs) {
        $scope.msgs = msgs;
    })
    $scope.MsgDelete = function(msg){
    	Msg.one(msg.id).remove() // 既然這行要用id那你幹嘛把變數叫做msgid
    }
    $scope.Msgmodify = function(msg_modify){
     	delete msg_modify.editMode;
     	msg_modify.put();
    	//console.log(msgmodify) 
    	//Msg.one('id', msgmodify.id).put();

    }
})