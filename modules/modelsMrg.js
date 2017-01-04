var userSchema = require('./models').userSchema;
var User = require('./models').User;

userSchema.statics.checkUserValid = function(username,password){
    return User.findOne({ "username": username, "password": password }).then(function(user){
        if(user)
            return Promise.resolve(user);
        else{
            var error = "提示：错误的用户名或者密码";
            return Promise.reject(error);
        }
    })
};

userSchema.methods.checkIsAdmin = function(username){
    return User.findOne({'username':username}).then(function(user){
        if(user.isAdmin)
            return Promise.resolve(user);
        else
            return Promise.reject(user);
    });
}


