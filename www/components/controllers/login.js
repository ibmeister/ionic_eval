app.controller('LoginController', ['$rootScope', '$scope', '$http', '$routeParams', '$mdToast', '$location', 'URLFactory',
    function ($rootScope, $scope, $http, $routeParams, $mdToast, $location, URLFactory) {

    $scope.signup = function(){
        $location.path( 'signup/');
    };

    $scope.$parent.showLogout = false;

    $scope.go = function(path){
        $location.path(path);
    };

    $scope.login = function(){
        $http.post(URLFactory.getAuthURL(), $scope.loginform).success(function(){
            $http.get(URLFactory.getUserURL()).success(function (e) {
                $rootScope.user = e;
                showToast('User logged in successfully!');
                $scope.$parent.showLogout = true;
                $location.path('home/');
            }).error(function(e){
                if(e !== null && e.error !== undefined){
                    showToast(e.error);
                }else{
                    showToast('Internal Server Error. Contact Administrator!');
                }
            });

        }).error(function(e){
            if(e !== null && e.error !== undefined){
                showToast(e.error);
            }else{
                showToast('Internal Server Error. Contact Administrator!');
            }
        });
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