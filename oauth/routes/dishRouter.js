var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function (err, dish) {
            if (err)
                throw err;
            res.json(dish);
        });
    })
    
    .post(Verify.verifyAdmin, function (req, res, next) {
        Dishes.create(req.body, function (err, dish) {
            if (err)
                throw err;
            
            console.log('Dish created!');
            
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            
            res.end('Added dish with id:' + id);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.remove({}, function (err, resp) {
            if (err)
                throw err;
            res.json(resp);
        });
    });

router.route('/:id')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.findById(req.params.id)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
            if (err)
                throw err;
            
            res.json(dish);
        });
    })
    
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.id, function (err, resp) {
            if (err)
                throw err;
            
            res.json(resp);
        });
    })
    
    .put(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err)
                throw err;
            
            res.json(dish);
        });
    });
router.route('/:id/comments')
    .get(Verify.verifyOrdinaryUser, function (req, res, net) {
        Dishes.findById(req.params.id)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
            if (err)
                throw err;
            res.json(dish.comments);
        });
    })
    
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (err)
                throw err;
            
            req.body.postedBy = req.decoded._doc._id;
            
            dish.comments.push(req.body);
            
            dish.save(function (err, dish) {
                if (err)
                    throw err;
                console.log('Updated comments!');
                res.json(dish);
            });
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (err)
                throw err;
            dish.comments = [];
            
            dish.save(function (err, result) {
                if (err)
                    throw err;
                
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end("Deleted all comments!");
            });
        });
    });

router.route('/:dishId/comments/:commentId')
    .get(Verify.verifyOrdinaryUser, function (req, res, net) {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
            if (err)
                throw err;
            
            res.json(dish.comments.id(req.params.commentId));
        });
    })
    
    .put(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err)
                throw err;
            
            if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
                var err = new Error('You are not authorized to perform this operation! You did not create this comment!');
                err.status = 403;
                
                return next(err);
            }
            
            dish.comments.id(req.params.commentId).remove();
            
            req.body.postedBy = req.decoded._doc._id;
            
            dish.comments.push(req.body);
            
            dish.save(function (err, dish) {
                if (err)
                    throw erro;
                console.log('Updated comment: ' + req.params.commentId);
                res.json(dish);
            });
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err)
                throw err;
            
            if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
                var err = new Error('You are not authorized to perform this operation! You did not create this comment!');
                err.status = 403;
                
                return next(err);
            }
            
            console.log(dish.comments);
            console.log(req.params.commentId);
            
            dish.comments.id(req.params.commentId).remove();
            
            dish.save(function (err, resp) {
                if (err)
                    throw erro;
                res.json(resp);
            });
        });
    });

module.exports = router;