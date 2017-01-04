'use strict';
/* Controllers */
var currentUser = 'null';
function mainCtrl($scope, $location, $rootScope, $http) {
    $scope.currentUser = {};
    $http.get('/api/onlineStatus').success(function (data) {
        if (data.user) {
            $scope.currentUser = {'name': data.user.username};
            currentUser = data.user.username;
            $location.path('/publishJob');
        }
        else
            $location.path('/signin');
    });
    $scope.showAuth = function () {
        if (currentUser != 'null') {
            $scope.currentUser.name = currentUser;
            return true;
        }
        else
            return false;
    }
}


function IndexCtrl($scope, $http) {

}

function SigninCtrl($scope, $http, $location) {
    $scope.error = false;
    $scope.form = {};
    $scope.submitPost = function () {
        $http.post('/signin/post', $scope.form).success(function (response) {
            if (response.user) {
                currentUser = response.user.username;
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
