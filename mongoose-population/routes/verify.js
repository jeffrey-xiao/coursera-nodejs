var User = require('../models/user');
var jwt = require('jsonwebtoken');

var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {
        // if there is a token, then verify using jwt
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // no token
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {
        // if there is a token, then verify using jwt
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // save to request for use in other routes
                req.decoded = decoded;
                if (req.decoded._doc.admin)
                    next();
                else {
                    var err = new Error('You do not have admin privileges!');
                    return next(err);
                }
            }
        });
    } else {
        // no token
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};