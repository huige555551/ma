'use strict';
/* Controllers */
var currentUser = 'null';
var isLogin = false;
var isStudent = false;
var isTA = false;
var isTeacher = false;
var isAdmin = false;
var userId = 'null';
function mainCtrl($scope, $location, $http) {
    $scope.currentUser = {};
    $scope.showAuth = function () {
        if (currentUser != 'null') {
            $scope.currentUser.name = currentUser;
            return true;
        }
        else
            return false;
    }
}

function IndexCtrl($scope, $http, $location) {

    $http.get('/api/onlineStatus').success(function (response) {
        if (response.user) {
            $scope.currentUser = {'username': response.user.username};
            currentUser = response.user.username;
            isLogin = true;
            isStudent = response.user.isStudent;
            isTA = response.user.isTA;
            isTeacher = response.user.isTeacher;
            isAdmin = response.user.isAdmin;
            if (isTA)
                $location.path('/ta');
            else if (isTeacher)
                $location.path('/teacher');
            else if (isStudent) {
                $location.path('/student');
            }
        }
        else
            $location.path('/signin');
    });
}

function TeacherCtrl($scope, $http, $location){
    $scope.job = {
        title       : 'Homework2 Movie Review',
        refer       : 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review',
        startYear   : '2017',
        startMonth  : '01',
        startDay    : '03',
        startHour   : '12',
        startMinute : '12',
        startSecond : '12',
        duration    : '5'
    }
    $scope.postJob = function(){
        $http.post('/api/jobs', $scope.job).success(function (res) {
            if(res=='true')
                $scope.publish = true;
            else
                $scope.publish = false;
        })
    };
}

function TaCtrl($scope, $http){

}

function StudentCtrl($scope, $http, $location){
    $http.get('/api/assignments').success(function (response){
      if(response.assignments){
          console.log(response.assignments);
          $scope.assignments = response.assignments;
          $scope.nowtime = Date.parse(new Date());
      }
    });
    $scope.submitSource = function(assignmentGithub, assignmentIndex) {

        $http.post('/api/assignments', {github :assignmentGithub, index:assignmentIndex, userId:userId}).success(function(response) {
            console.log(response);
            if(response.status == '1')
                $scope.submitSuccess = true;
            else
                $scope.submitSuccess = false;
        })
    }
}
function SigninCtrl($scope, $http, $location) {
    $scope.error = false;
    $scope.form = {};
    $scope.submitPost = function () {
        $http.post('/signin/post', $scope.form).success(function (response) {
            if (response.user) {
                currentUser = response.user.username;
                userId = response.user._id;
                isLogin = true;
                isStudent = response.user.isStudent;
                isTA = response.user.isTA;
                isTeacher = response.user.isTeacher;
                isAdmin = response.user.isAdmin;
                $scope.currentUser.username = currentUser;
                $location.path('/');
            } else
                $scope.error = true;
        });
    };
}

function PublishJobCtrl($scope, $http, $location) {


}
function SignoutCtrl($scope, $http, $location){
    $http.get('/signout').success(function (data) {
        currentUser = 'null';
        isLogin = false;
        isStudent = false;
        isTA = false;
        isTeacher = false;
        isAdmin = false;
        $scope.currentUser = 'null';
        console.log('signout');
        $location.path('/signin');
    })
}

function ReadPostCtrl($scope, $http, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).success(function (data) {
        $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/post/' + $routeParams.id).success(function (data) {
        $scope.form = data.post;
    });

    $scope.editPost = function () {
        $http.put('/api/post/' + $routeParams.id, $scope.form).success(function (data) {
            $location.url('/readPost/' + $routeParams.id);
        });
    };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).success(function (data) {
        $scope.post = data.post;
    });

    $scope.deletePost = function () {
        $http.delete('/api/post/' + $routeParams.id).success(function (data) {
            $location.url('/');
        });
    };

    $scope.home = function () {
        $location.url('/');
    };
}
