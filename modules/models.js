var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({
    username : {type:String },
    password : {type:String },
    stuName : {type: String },
    stuGroup: {type: String },
    isStudent : {type: Boolean },
    isTA: {type: Boolean },
    isAdmin: {type: Boolean },
    isTeacher: {type: Boolean },
    stuScore: {type: Array },
    stuRank: {type: Array },
    taindex: {type: Number },
    judgeGroup: {type: Array },
    judgeStudents: {type: Array },
    correspondTA: {type: String },
    assignments : []
});

var groupSchema = new Schema({
    students: {type: Array , required: true},
    matchingGroup: {type: Array , required: true},
    bematchGroup: {type: Array , required: true},
    index: {type: String , required: true},
    correspondTA: {type: Array , required: true}
});
var Group = mongoose.model('Group', groupSchema);

var sourceSchema = new Schema ({
    index: {type: String },
    submissions: {type: Array , required: true}
});
var Source = mongoose.model('Source', sourceSchema);

var submissionSchema = new Schema ({
    index: {type: String , required: true},
    timeStamp: {type: String , required: true},
    location: {type: String , required: true}
});
var Submission = mongoose.model('Submission', submissionSchema);

var commentSchema = new Schema({
    index : {type: String , required: true},
    jobIndex: {type: String , required: true},
    title: {type: String , required: true},
    timeStamp: {type: String , required: true},
    body: {type: String , required: true},
    senderId: {type: String , required: true},
    senderName: {type: String , required: true},
    senderGroup: {type: String , required: true},
    receiverId : {type: String , required: true},
    receiverName: {type: String , required: true},
    receiverGroup: {type: String , required: true},
    receiverSource: {type: String , required: true},
    score: {type: String , required: true}
});
var Comment = mongoose.model('Comment', commentSchema);

var jobsSchema = new Schema ({
    jobPool: {type: Array , required: true},
    index: {type: String , required: true}
});
var Jobs = mongoose.model('Jobs', jobsSchema);

var jobSchema = new Schema({
    title: {type: String , required: true},
    refer: {type: String , required: true},
    index: {type: String , required: true},
    available: {type: Boolean , required: true},
    startDate: {type: String},
    endDate: {type: String},
    assessDate: {type: String}
});


var assignmentsSchema = new Schema({
    index: {type: String , required: true},
    assPool: {type: Array , required: true}
});
var Assignmants = mongoose.model('Assignments', assignmentsSchema);

var asignmentSchema = new Schema({
    index: {type: String },
    job : {type: Object },
    recvComment: {type: Array },
    sendComment: {type: Array },
    assessGroup: {type: String },
    timeStamp: {type: String },
    finished: {type: String },
    taComment: {type: Array },
    rank: {type: String },
    position: {type: Object },
    ended: {type: Boolean },
    source: {type: Object },
    github: {type: String},
    scorelist: {type: Array},
    score:{type:Number, required:true}
});
var Assignment = mongoose.model('Assignment', asignmentSchema);

userSchema.methods.checkUserValid = function(username,password){
    return User.findOne({ "username": username, "password": password }).then(function(user){
        if(user) {

            return Promise.resolve(user);
        }
        else{
            var error = "提示：错误的用户名或者密码";
            return Promise.reject(error);
        }
    });
};


var User = mongoose.model('User', userSchema);
var Job = mongoose.model('Job', jobSchema);
module.exports = {
    User :  User,
    Group : Group,
    Source : Source,
    Submission :Submission,
    Comment : Comment,
    Job :Job,
    Jobs:Jobs
};


// module.exports.User= User;
// module.exports.Group = Group;
// module.exports.Source = Source;
// module.exports.Submission = Submission;
// module.exports.Comment = Comment;
// module.exports.Job = Job;
// module.exports.Jobs = Jobs;
// module.exports.Assignmants = Assignmants;
// module.exports.Assignment = Assignment;
// module.exports.userSchema = userSchema;
// module.exports.groupSchema = groupSchema;



