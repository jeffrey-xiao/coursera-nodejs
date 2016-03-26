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
        res.end('Getting all leaders');
    })
    
    .post(function (req, res, next) {
        res.end('Adding leader: ' + req.body.name + ' with description: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting all leaders');
    });

router.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    
    .get(function (req, res, next) {
        res.end('Getting leader ' + req.params.id);
    })
    
    .delete(function (req, res, next) {
        res.end('Deleting leader ' + req.params.id);
    })
    
    .put(function (req, res, next) {
        res.write('Updating leader ' + req.params.id + '\n');
        res.end('Information: ' + req.body.name + ' with details: ' + req.body.description);
    });

module.exports = router;