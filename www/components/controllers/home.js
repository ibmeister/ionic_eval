app.controller('HomeController', ['$rootScope', '$scope', '$http', '$routeParams', '$mdToast', '$location', 'URLFactory',
    function ($rootScope, $scope, $http, $routeParams, $mdToast, $location, URLFactory) {

        $scope.groups = [];
        $scope.selected = {};
        $scope.stages = [];

        $http.get(URLFactory.getGroupsURL()).success(function(groups){
            $scope.groups = groups;
        }).error(function(e){
            if(e !== null && e.error !== undefined){
                showToast(e.error);
            }else{
                showToast('Internal Server Error. Contact Administrator!');
            }
        });


        $scope.submit = function () {
            var stage = $scope.selected.stage;
            if(stage !== undefined && stage !== null){
                $rootScope.stage = $scope.selected.stage;
                $rootScope.group = $scope.selected.group;
                $location.path( 'evaluation/');

            }
        };

        $scope.changeGroup= function() {
            $scope.stages = [];
            $scope.selected.stage = null;
            $http.get(URLFactory.getEvaluationStagesURL($scope.selected.group.course_id)).success(function(stages){
                $scope.stages = stages;
            }).error(function(e){
                if(e !== null && e.error !== undefined){
                    showToast(e.error);
                }else{
                    showToast('Internal Server Error. Contact Administrator!');
                }
            });
        };

        $scope.manageGroups = function(){
            $location.path('group/');
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



