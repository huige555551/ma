/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var User = require("../modules/models").User;
var Job = require('../modules/models').Job;
var mongoose = require('mongoose');

// GET
exports.onlineStatus = function (req, res) {
    if (req.session.user)
        return res.json({"user": req.session.user});
    else
        return res.json({"user": null});
};

function dataToSecond(dateString) {
    //time:"2013-02-15 21:00:00"
    var date = new Date(dateString);
    var time = date.getTime();//转换成秒
    return time;
}
function secondToDate(time) {
    var date = new Date(time);
    var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return time;
}
//老师发布作业
exports.jobPost = function (req, res) {
    var job = {
        'title': req.body.title,
        'refer': req.body.refer,
        'available': true,
        'index': '0'
    };
    //例如："2013-02-15 21:00:00"
    var time = req.body.startYear + '-' + req.body.startMonth + '-' + req.body.startDay + " " + req.body.startHour + ':' + req.body.startMinute + ':' + req.body.startSecond;
    job.startDate = parseInt(dataToSecond(time));
    job.endDate = parseInt(dataToSecond(time)) + parseInt(req.body.duration) * (24 * 60 * 60) * 1000;
    job.assessDate = parseInt(dataToSecond(time)) + parseInt(req.body.duration) * (24 * 60 * 60) * 1000;
    //update Student Database
    console.log(job.startDate, job.endDate);
    User.find({'isStudent': true}).then(function (students) {
        if (students) {
            for (var i = 0; i < students.length; i++) {
                console.log(students[i]);
                var newAssignment = students[i].assignments;
                newAssignment.push(
                    {
                        'index': students[i].assignments.length + 1,
                        'github': '#',
                        'timeStamp': job.startDate,
                        'finished': job.endDate,
                        'job': {
                            'title': req.body.title,
                            'refer': req.body.refer,
                            'available': true,
                        }
                    });
                User.findByIdAndUpdate(students[i]._id, {$set: {'assignments': newAssignment}}, function (err, docs) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    else {
                        console.log('success', docs);
                    }
                });
            }
            res.json(true);
        }
        else {
            console.log('No student Exist!');
            res.json('No student Exist!')
        }
    });
}
//学生获取所有作业
exports.assignments = function (req, res) {
    var user = req.session.user;
    User.findOne({'username': user.username}).then(function (data) {
        if (data)
            res.json({'assignments': data.assignments});
        else
            res.json(false);
    })
}
//学生提交作业
exports.assignmentsPost = function (req, res) {
    var userId = req.body.userId;
    var assignmentIndex = req.body.index;
    var github = req.body.github;
    console.log(userId, assignmentIndex, github);

    User.findById(userId, function (err, user) {
        var newAssignments = user.assignments;
        newAssignments[assignmentIndex - 1].github = github;
        User.findByIdAndUpdate(userId, {$set: {'assignments': newAssignments}}, function (err, docs) {
            console.log('doc', docs);
            res.json({status: 1, error: '修改成功！'});
        })
    })
}
//ta获取要批改的作业
exports.correctJob = function (req, res) {
    User.find({'correspondTA': req.session.user.username, 'isStudent': true}).then(function (JudgeStudent) {
        if (JudgeStudent)
            res.json({students: JudgeStudent});
        else
            res.json({students: null});
    });
}
//ta提交要批改的作业
exports.correctJobPost = function (req, res) {
    var correctJob = req.body;
    console.log(req.body);
    User.findById(correctJob.userId, function (err, user) {
        if (user) {
            var newAssignments = user.assignments;
            newAssignments[correctJob.assignmentIndex - 1].score = correctJob.score;
            newAssignments[correctJob.assignmentIndex - 1].taComment = correctJob.comment;
            User.findByIdAndUpdate(correctJob.userId, {$set: {'assignments': newAssignments}}, function (err, docs) {
                console.log('doc', docs);
                res.json({status: 1, error: '评分成功！'});
            })
        }
        else
            res.json({status: 0, error: '没有找到该用户！'})
    });

}
//老师获取所有人的分数
exports.allScores = function (req, res) {
    User.find({'isStudent': true}).then(function (allStudent) {
        console.log(allStudent.length);
        if (allStudent)
            res.json({allStudent: allStudent});
        else
            res.json({allStudent: null});
    });
}