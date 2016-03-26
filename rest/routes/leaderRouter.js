var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaders = require('../models/leaderships');
var Verify = require('./verify');
var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Leaders.find({}, function (err, leader) {
            if (err)
                throw err;
            res.json(leader);
        });
    })
    
    .post(Verify.verifyAdmin, function (req, res, next) {
        Leaders.create(req.body, function (err, leader) {
            if (err)
                throw err;
            
            console.log('Leader created!');
            
            var id = leader._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            
            res.end('Added leader with id:' + id);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Leaders.remove({}, function (err, resp) {
            if (err)
                throw err;
            res.json(resp);
        });
    });

router.route('/:id')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Leaders.findById(req.params.id, function (err, leader) {
            if (err)
                throw err;
            
            res.json(leader);
        });
    })
    
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Leaders.findByIdAndRemove(req.params.id, function (err, resp) {
            if (err)
                throw err;
            
            res.json(resp);
        });
    })
    
    .put(Verify.verifyAdmin, function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function (err, leader) {
            if (err)
                throw err;
            
            res.json(leader);
        });
    });


module.exports = router;