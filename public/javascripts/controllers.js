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
//根据角色从index中跳转到不同的页面
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

function TeacherCtrl($scope, $http, $location) {
    $scope.job = {
        title: 'Homework2 Movie Review',
        refer: 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review',
        startYear: '2017',
        startMonth: '01',
        startDay: '03',
        startHour: '12',
        startMinute: '12',
        startSecond: '12',
        duration: '5'
    }
    $scope.postJob = function () {
        $http.post('/api/jobs', $scope.job).success(function (res) {
            if (res == 'true')
                $scope.publish = true;
            else
                $scope.publish = false;
        })
    };
}
function AllScoresCtrl($scope, $http, $timeout) {
    var allStudents = [];
    $http.get('/api/allScores').success(function (response) {
        console.log('allStudents', response);
        allStudents = response.allStudent;
        $scope.students = response.allStudent;
    });
    $scope.nowtime = Date.parse(new Date());
    $scope.submitScoreAndComment = function (score, comment, userId, assignmentIndex) {
        $scope.errorShow = false;
        $http.post('/api/correctJob', {
            score: score,
            comment: comment,
            userId: userId,
            assignmentIndex: assignmentIndex
        }).success(function (response) {
            console.log(response);
            if (response.status == '1') {
                $scope.errorShow = true;
                $scope.error = '上传成功'
                $timeout(function () {
                    $scope.errorShow = false;
                }, 2000);
            }
        })
    }
}
function TaCtrl($scope, $http, $timeout) {
    $scope.nowtime = Date.parse(new Date());
    $http.get('/api/correctJob').success(function (response) {
        console.log(response);
        if (response.students)
            $scope.students = response.students;
        else
            $scope.error = '你没有批改的学生';
    });
    $scope.submitScoreAndComment = function (score, comment, userId, assignmentIndex) {
        $scope.errorShow = false;
        $http.post('/api/correctJob', {
            score: score,
            comment: comment,
            userId: userId,
            assignmentIndex: assignmentIndex
        }).success(function (response) {
            console.log(response);
            if (response.status == '1') {
                $scope.errorShow = true;
                $scope.error = '上传成功'
                $timeout(function () {
                    $scope.errorShow = false;
                }, 2000);
            }
        })
    }
}

function StudentCtrl($scope, $http, $location, $timeout) {
    $scope.myVar = false;
    $scope.nowtime = Date.parse(new Date());
    $http.get('/api/assignments').success(function (response) {
        if (response.assignments) {
            console.log('assignments', response.assignments);
            $scope.assignments = response.assignments;
        }
    });
    $scope.submitSource = function (assignmentGithub, assignmentIndex) {
        $http.post('/api/assignments', {
            github: assignmentGithub,
            index: assignmentIndex,
            userId: userId
        }).success(function (response) {
            console.log(response);
            if (response.status == '1') {
                $scope.submitSuccess = true;
                $timeout(function () {
                    console.log($scope.submitSuccess);
                    $scope.submitSuccess = false;
                }, 2000);
            }
            else
                $scope.submitSuccess = false;
        })
    };
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

function SignoutCtrl($scope, $http, $location) {
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




