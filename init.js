var User = require('./modules/models').User;

module.exports = {
    initUser: function () {
        User.remove({}, function (err, docs) {//删除所有的记录
            console.log('remove success');
        });
        var TeacherEntity = new User({
            "username": 't',
            "password": 't',
            'stuName': 'noname',
            'isStudent': false,
            "isTA": false,
            "isTeacher": true,
            "isAdmin": false,
            "stuGroup": -1,
            "taindex": 0,
            "judgeGroup": [-1],
            "judgeStudents": [-1],
            "correspondTA": "-1",
            "stuScore": [-1],
            "stuRank": [-1]

        });
        TeacherEntity.save(function (err, doc) {
            if (err) {
                console.log("error :" + err);
            } else {
                console.log("Saving Teacher success!");
            }
        });

        for (var i = 0; i < 20; i++) {
            var StudentEntity = new User({
                "username": 's' + i,
                "password": 's' + i,
                'stuName': 'noname',
                'isStudent': true,
                "isTA": false,
                "isTeacher": false,
                "isAdmin": false,
                "stuGroup": Math.floor(i / 4),
                "taindex": 0,
                "judgeGroup": [-1],
                "judgeStudents": [-1],
                "correspondTA": 'ta' + Math.floor(i / 4),
                "stuScore": [-1],
                "stuRank": [-1],
                "assignments": [
                    {
                        "index": 1,
                        "github": "http://ourjs.com/detail/53ad24edb984bb4659000013",
                        "finished": 1483762332000.0,
                        "timeStamp": 1483330332000.0,

                        "job": {
                            "title": "Homework1 Recipe",
                            "refer": "http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+1+-+Recipe",
                            "available": true
                        },
                        "score": 60,
                        "taComment": "ta暂时没有评价"
                    },
                    {
                        "index": 2,
                        "github": "#",
                        "timeStamp": 1483416732000.0,
                        "finished": 1483848732000.0,
                        "job": {
                            "title": "Homework2 Movie ",
                            "refer": "http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review",
                            "available": true
                        }
                    },
                    {
                        "job": {
                            "available": true,
                            "refer": "http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+3+-+Ring+Menu",
                            "title": "Homework3 Ring Menu"
                        },
                        "timeStamp": 1483543392000.0,
                        "finished": 1483716192000.0,
                        "github": "#",
                        "index": 3
                    }
                ]

            });
            (function (i) {
                StudentEntity.save(function (err, doc) {
                    if (err) {
                        console.log("error :" + err);
                    } else {
                        console.log("Saving Student " + i);
                    }
                })
            })(i);
        };

        for (var i = 0; i < 4; i++) {
            var TaEntity = new User({
                "username": 'ta' + i,
                "password": 'ta' + i,
                'stuName': 'noname',
                'isStudent': false,
                "isTA": true,
                "isTeacher": false,
                "isAdmin": false,
                "stuGroup": -1,
                "taindex": i,
                "judgeGroup": [i],
                "judgeStudents": [-1],
                "correspondTA": "-1",
                "stuScore": [-1],
                "stuRank": [-1]
            });

            (function (i) {
                TaEntity.save(function (err, doc) {
                    if (err) {
                        console.log("error :" + err);
                    } else {
                        console.log("Saving Ta " + i);
                    }
                });
            })(i)
        }
    }
}