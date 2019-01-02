'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');


exports.register = (req, res) => {
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.passwordHash = undefined;
            return res.json(user);
        }
    });
};

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.passwordHash)) {
                res.status(401).json({
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                return res.json({
                    token: jwt.sign({
                        email: user.email,
                        fullName: user.fullName,
                        _id: user._id
                    }, 'RESTFULAPIs')
                });
            }
        }
    });
};

exports.me = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(404).json({
                message: 'User details not found.'
            });
        } else if (user) {
            res.json(user);
        }
    });
};

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();     
        return;   
    } else {
        return res.status(401).json({
            message: 'Unauthorized user!'
        });
    }    
};