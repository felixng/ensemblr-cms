var keystone = require('keystone');
var _ = require('lodash')
var express = keystone.express;
var router = express.Router();
var Fuse = require("fuse.js");
var ignoreHandles = ['E_N_O', 'enballet', 'The_Globe', 'oldvictheatre'];


// var Production = require('../models/Production');
var Affiliate = keystone.list('Affiliate');
var Production = keystone.list('Production');
router.route('/productions').get(function(req, res) {
    Production.model.find().exec(function(err, docs) {
        if (err) res.send(err);
        res.json(docs);
    });
});

router.route('/productions/twitters').get(function(req, res) {
    Production.model.find().where('twitter').ne(null).ne('').exec(function(err, docs) {
        if (err) res.send(err);

        var handles = docs.map(function(doc) {
        	return {
        		id: doc._id,
        		handle: doc.twitter,
                name: doc.name
        	}
        });

        var uniqueHandles = _.uniqBy(handles, function(item){
        	return item.handle;
        })
        ignoreHandles.map(function(doc) {
        	uniqueHandles = _.pull(uniqueHandles, doc);	
        });

        res.json(uniqueHandles);
    });
});

router.route('/productions/twitter/:handle').get(function(req, res) {
    Production.model.find().where('twitter', req.params.handle).exec(function(err, docs) {
        if (err) res.send(err);
        res.json(docs);
    });
});

router.route('/affiliate/search/:query').get(function(req, res) {
    Affiliate.model.find().exec(function(err, productions) {
        if (err) res.send(err);

        var query = req.params.query.toLowerCase()
                                    .replace('musical', '')
                                    .replace('the', '');

        var options = {
            shouldSort: true,
            includeScore: true, //0.5 = Bad, Hamilton mapped to Hamlet
            keys: ['product_name'],
        }

        var fuse = new Fuse(productions, options);
        res.json(fuse.search(query));
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