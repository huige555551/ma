'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
    }).when('/signin', {
        templateUrl: 'partials/signin',
        controller: SigninCtrl
    }).when('/signout', {
        templateUrl: 'partials/signout',
        controller: SignoutCtrl
    }).when('/teacher', {
        templateUrl: 'partials/teacher',
        controller: TeacherCtrl
    }).when('/allScores', {
        templateUrl: 'partials/allScores',
        controller: AllScoresCtrl
    }).when('/ta', {
        templateUrl: 'partials/ta',
        controller: TaCtrl
    }).when('/student', {
        templateUrl: 'partials/student',
        controller: StudentCtrl
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);