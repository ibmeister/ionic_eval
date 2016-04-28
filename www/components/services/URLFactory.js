app.factory('URLFactory', [function(){
    var factory = {};
    var baseURL = "http://" + window.location.hostname +":48484/evaluationsapi/";

    factory.getMobileServiceURL = function(){
        return baseURL + "mobile_service/"
    };

    factory.getAuthURL = function(){
        return baseURL + "auth/";
    };

    factory.getUserURL = function(){
        return factory.getMobileServiceURL() + "user/"
    };

    factory.getUserSignupURL = function(){
        return factory.getUserURL() + "signup/"
    };

    factory.getGroupsURL = function(){
        return factory.getMobileServiceURL() + "groups/";
    };

    factory.getCoursesURL = function(){
        return factory.getMobileServiceURL() + "courses/";
    };

    factory.getAllCoursesURL = function(){
        return factory.getMobileServiceURL() + "allcourses/";
    };

    factory.getCourseURL = function(id){
        return factory.getCoursesURL() + id + '/';
    };

    factory.getGroupsByCourseURL = function(id){
        return factory.getGroupsURL() + "bycourseid/" + id + "/";
    };

    factory.getGroupsSubscribeURL = function(id){
        return factory.getGroupsURL() + "subscribe/" + id + "/";
    };

    factory.getCreateGroupURL = function(courseid, groupName){
        return factory.getGroupsURL() + "creategroup/" + groupName + "/" + courseid + "/";
    };

    factory.getEvaluationStagesURL = function(courseid){
        return factory.getCourseURL(courseid) + "evaluation_stages" + '/';
    };

    factory.getMemberEvaluationsURL = function(){
        return factory.getMobileServiceURL() + "member_evaluations" + '/';
    };

    factory.getGroupEvaluationsURL = function(){
        return factory.getMobileServiceURL() + "group_evaluations" + '/';
    };

    factory.getGroupURL = function(id){
        return factory.getGroupsURL() + id + '/';
    };

    factory.getGroupMembersURL = function(groupid){
        return factory.getGroupURL(groupid) + "users" + '/';
    };

    factory.getResetPasswordURL = function(){
        return factory.getMobileServiceURL() + "resetpassword" + '/';
    };

    return factory;
}]);