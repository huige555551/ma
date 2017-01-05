var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var routes = require('./routes');
var api = require('./routes/api');
var sign = require('./routes/sign');
var mongoose = require('mongoose');
var User = require('./modules/models').User;
var init = require('./init');

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/myAchievement');
var db = mongoose.connection;
db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new FileStore(),
  resave :false,
  saveUninitialized :false,
  secret: 'keyboard cat'
}));
User.remove({},function(err,docs){//删除id为4的记录
  console.log('remove success');
});
(function (){
  var UserEntity = new User({
    "username": 's3',
    "password": 's3',
    'stuName': 'noname',
    'isStudent':true,
    "isTA": false,
    "isTeacher": false,
    "isAdmin": false,
    "stuGroup": -1,
    "taindex": 0,
    "judgeGroup": [-1],
    "judgeStudents": [-1],
    "correspondTA": "-1",
    "stuScore": [-1],
    "stuRank": [-1],
  });
  UserEntity.save(function(err,doc){
    if(err){
      console.log("error :" + err);
    } else {
      console.log("Saving "+doc);
    }
  });
})();
(function (){
  var UserEntity = new User({
    "username": 't',
    "password": 't',
    'stuName': 'noname',
    'isStudent':false,
    "isTA": false,
    "isTeacher": true,
    "isAdmin": false,
    "stuGroup": -1,
    "taindex": 0,
    "judgeGroup": [-1],
    "judgeStudents": [-1],
    "correspondTA": "-1",
    "stuScore": [-1],
    "stuRank": [-1],
  });
  UserEntity.save(function(err,doc){
    if(err){
      console.log("error :" + err);
    } else {
      console.log("Saving "+doc);
    }
  });
})();
(function (){
  var UserEntity = new User({
    "username": 'ta',
    "password": 'ta',
    'stuName': 'noname',
    'isStudent':false,
    "isTA": true,
    "isTeacher": false,
    "isAdmin": false,
    "stuGroup": -1,
    "taindex": 0,
    "judgeGroup": [-1],
    "judgeStudents": [-1],
    "correspondTA": "-1",
    "stuScore": [-1],
    "stuRank": [-1],
  });
  UserEntity.save(function(err,doc){
    if(err){
      console.log("error :" + err);
    } else {
      console.log("Saving "+doc);
    }
  });
})();
(function (){
  var UserEntity = new User({
    "username": 's',
    "password": 's',
    'stuName': 'noname',
    'isStudent':true,
    "isTA": false,
    "isTeacher": false,
    "isAdmin": false,
    "stuGroup": -1,
    "taindex": 0,
    "judgeGroup": [-1],
    "judgeStudents": [-1],
    "correspondTA": "-1",
    "stuScore": [-1],
    "stuRank": [-1],
    "assignments": [
      {
        "job": {
          "available": true,
          "refer": "http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review",
          "title": "Homework2 Movie Review"
        },
        "finished": 1483848732000.0,
        "timeStamp": 1483416732000.0,
        "github": "http://ourjs.com/detail/53ad24edb984bb4659000013",
        "index": 1
      }
    ]
  });
  UserEntity.save(function(err,doc){
    if(err){
      console.log("error :" + err);
    } else {
      console.log("Saving "+doc);
    }
  });
})();
// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
// app.get('/api/posts', api.posts);
// app.get('/api/post/:id', api.post);
// app.post('/signin/post',sign.signinPost);
app.post('/signin/post',sign.signinPost);
// app.post('/signup/post',sign.signupPost);
app.get('/signout',sign.signout);
// app.post('/api/post', api.addPost);
app.get('/api/onlineStatus',api.onlineStatus);
app.get('/api/assignments', api.assignments);
app.post('/api/assignments', api.assignmentsPost);
app.post('/api/jobs',api.jobPost);
// app.get('/api/assignment',api.jobs);

// app.put('/api/post/:id', api.editPost);
// app.put('/api/post/:id/hidden',api.hiddenPost);
// app.delete('/api/post/:id', api.deletePost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
