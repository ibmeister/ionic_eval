app.controller('SignupController', ['$scope', '$http', '$routeParams', '$mdToast', '$location', 'URLFactory',
    function ($scope, $http, $routeParams, $mdToast, $location, URLFactory) {

        $scope.userID = $routeParams.id;
        $scope.user = {};
        $scope.user.id = 0;
        $scope.user.created_on = null;
        $scope.user.need_password_reset = false;


        $scope.save = function(){
            if($scope.user.password !== $scope.confirmPassword){
                showToast("Passwords do not match");
            }else{
                $http.post(URLFactory.getUserSignupURL(), $scope.user).success(function(){
                    showToast('User created successfully!');
                    $location.path('/');
                }).error(function(e){
                    if(e !== null && e.error !== undefined){
                        showToast(e.error);
                    }else{
                        showToast('Internal Server Error. Contact Administrator!');
                    }
                });
            }
        };

        var showToast = function(content) {
            var toast = $mdToast.simple()
                .content(content)
                .action('OK')
                .highlightAction(false)
                .position('top right');
            $mdToast.show(toast);
        };


}]);