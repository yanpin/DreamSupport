app.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})

app.controller('DemoCtrl', function ($scope, $facebook) {
  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
        console.log(response);
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }
  
  refresh();
});

app.controller('TravelCtrl', function ($scope, Travel, $cookies, $location) {
    $cookies.put('user_id', '123');

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
})
