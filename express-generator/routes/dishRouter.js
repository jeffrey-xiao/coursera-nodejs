var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    
    .get(function (req, res, next) {
        res.end('Getting all dishes');
    })
    
    .post(function (req, res, next) {
        res.end('Adding dish: ' + req.body.name + ' with description: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting all dishes');
    });

router.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    
    .get(function (req, res, next) {
        res.end('Getting dish ' + req.params.id);
    })
    
    .delete(function (req, res, next) {
        res.end('Deleting dish ' + req.params.id);
    })
    
    .put(function (req, res, next) {
        res.write('Updating dish ' + req.params.id + '\n');
        res.end('Information: ' + req.body.name + ' with details: ' + req.body.description);
    });

module.exports = router;