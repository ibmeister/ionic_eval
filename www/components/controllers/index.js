app.controller('IndexController', ['$scope', '$location', '$http', 'URLFactory' , function($scope, $location, $http, URLFactory){
    
    $scope.go = function(path){
        $location.path( path );
    };
    
    $scope.logout = function(){
        $http.put(URLFactory.getAuthURL()).success(function(){
             $location.path('/');
       });
    };

    $scope.showLogout = true;

    $scope.resetPassword = function(){
        $location.path('/resetpassword');
    }
}]);
