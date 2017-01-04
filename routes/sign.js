// POST
var User = require("../modules/models").User;
var mongoose = require('mongoose');
exports.signinPost = function (req, res) {
    var user = req.body;
    var userEntity = new User(user);
    console.log('test');
    userEntity.checkUserValid(user.username,user.password).then(function(user){
        req.session.user = user;
        res.json({'user':user});
    }).catch(function(err){
        res.json({'user':null});
    });
};

exports.signout = function (req, res) {
    delete req.session.user;
    console.log("session has been deleted!");
    res.json(true);
};
