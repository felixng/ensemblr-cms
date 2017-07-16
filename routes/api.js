var keystone = require('keystone');
var _ = require('lodash')
var express = keystone.express;
var router = express.Router();

// var Production = require('../models/Production');
var Production = keystone.list('Production');
router.route('/productions').get(function(req, res) {
    Production.model.find().exec(function(err, docs) {
        if (err) res.send(err);
        res.json(docs);
    });
});

router.route('/productions/twitters').get(function(req, res) {
    Production.model.find().where('twitter').ne(null).exec(function(err, docs) {
        if (err) res.send(err);

        var handles = docs.map(function(doc) {
        	return doc.twitter;
        });

        res.json(_.uniq(handles));
    });
});

router.route('/productions/twitter/:handle').get(function(req, res) {
    Production.model.find().where('twitter', req.params.handle).exec(function(err, docs) {
        if (err) res.send(err);
        res.json(docs);
    });
});

router.route('/production/:id').get(function(req, res) {
    Production.model.findById(req.params.id).exec(function(err, docs) {
        if (err) res.send(err);
        res.json(docs);
    });
});

module.exports = {
	router: router
}