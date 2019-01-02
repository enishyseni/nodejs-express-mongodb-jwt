'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.samplevalue = (req, res) => {
    res.json('value01');
};

exports.sampleuser = (req, res) => {
    User.findOne({
        email: 'sample@user.com'
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(404).json({
                message: 'Sample data not available.'
            });
        } else if (user) {
            res.json(user);
        }
    });
};