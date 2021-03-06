var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promotions.find({}, function (err, promotion) {
            if (err)
                throw err;
            res.json(promotion);
        });
    })
    
    .post(Verify.verifyAdmin, function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err)
                throw err;
            
            console.log('Promotion created!');
            
            var id = promotion._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            
            res.end('Added promotion with id:' + id);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Promotions.remove({}, function (err, resp) {
            if (err)
                throw err;
            res.json(resp);
        });
    });

router.route('/:id')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promotions.findById(req.params.id, function (err, promotion) {
            if (err)
                throw err;
            
            res.json(promotion);
        });
    })
    
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.id, function (err, resp) {
            if (err)
                throw err;
            
            res.json(resp);
        });
    })
    
    .put(Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err)
                throw err;
            
            res.json(promotion);
        });
    });


module.exports = router;