app.controller('ResetPasswordController', ['$scope', '$http', '$routeParams', '$mdToast', '$location', 'URLFactory',
    function ($scope, $http, $routeParams, $mdToast, $location, URLFactory) {

        $scope.user = {};


        $scope.save = function(){
            if($scope.user.newPassword !== $scope.user.confirmPassword){
                showToast("Passwords don't match");
            }else{
                $http.post(URLFactory.getResetPasswordURL(), $scope.user).success(function(e){
                    showToast("Password reset successful");
                    $location.path('/home');
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