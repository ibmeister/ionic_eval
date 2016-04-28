
app.controller('GroupController', ['$scope', '$http', '$routeParams', '$mdToast', '$location', 'URLFactory',
    function ($scope, $http, $routeParams, $mdToast, $location, URLFactory) {
        $scope.courses = [];
        //$scope.coursegroups = [];
        $scope.groups = [];

        $scope.subscribe = {};
        $scope.create = {};

        $http.get(URLFactory.getGroupsURL()).success(function(groups){
            $scope.groups = groups;
            for (var i = 0; i < $scope.groups.length; i++){
                addCourse($scope.groups[i]);
            }
        }).error(function(e){
            if(e !== null && e.error !== undefined){
                showToast(e.error);
            }else{
                showToast('Internal Server Error. Contact Administrator!');
            }
        });

        var addCourse = function(group){
            $http.get(URLFactory.getCourseURL(group.course_id)).success(function(course) {
                group.course = course;
            }).error(function(e){
                if(e !== null && e.error !== undefined){
                    showToast(e.error);
                }else{
                    showToast('Internal Server Error. Contact Administrator!');
                }
            });
        };

        $http.get(URLFactory.getAllCoursesURL()).success(function(courses) {
            $scope.courses = courses;
        });


        $scope.subscribe = function () {
            if ($scope.subscribe.selectedGroup !== undefined && $scope.subscribe.selectedGroup !== null){
                $http.get(URLFactory.getGroupsSubscribeURL($scope.subscribe.selectedGroup.id)).success(function(){
                    showToast('Subscribed to group!');
                    $location.path( 'home/');
                }).error(function(e){
                    if(e !== null && e.error !== undefined){
                        showToast(e.error);
                    }else{
                        showToast('Internal Server Error. Contact Administrator!');
                    }
                });
            }
        };

        $scope.changeCourse = function() {
            $scope.coursegroups = [];
            $scope.subscribe.selectedGroup = null;
            $http.get(URLFactory.getGroupsByCourseURL($scope.subscribe.selectedCourse.id)).success(function(groups) {
                $scope.coursegroups = groups;
            }).error(function(e){
                if(e !== null && e.error !== undefined){
                    showToast(e.error);
                }else{
                    showToast('Internal Server Error. Contact Administrator!');
                }
            });
        };

        $scope.create = function () {
            if ($scope.create.selectedCourse !== undefined && $scope.create.selectedCourse !== null && $scope.create.groupName !== undefined && $scope.create.groupName.trim() !== ""){
                $http.get(URLFactory.getCreateGroupURL($scope.create.selectedCourse.id, $scope.create.groupName)).success(function(){
                    showToast('Group Created Successfully!');
                    $location.path( 'home/');
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



