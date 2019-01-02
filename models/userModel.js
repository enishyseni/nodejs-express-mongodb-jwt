'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserModel = new Schema({
    email: {
        unique: true,
        lowercase: true,
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserModel.methods.comparePassword = (password, passwordHash) => { return bcrypt.compareSync(password, passwordHash); };

mongoose.model('User', UserModel);