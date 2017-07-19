var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Production Model
 * =============
 */

var Production = new keystone.List('Production', {
	singular: 'Production',
	plural: 'Productions',
	map: { name: 'name' },
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-lastUpdated',
});

Production.add({
	name: { type: String, required: true },
	genre: { type: String },
	showTime: { type: String },
	duration: { type: String, },
	previewFrom: { type: Types.Date, },
	openingNight: { type: Types.Date, },
	bookingUntil: { type: Types.Date, },
	closing: { type: Types.Date, },
	twitter: { type: String, width: 'small' },
	overrideTwitter: { type: Boolean, default: false, width: 'small' },
	facebook: { type: String, width: 'small' },
	createdAt: { type: Date, default: Date.now },
	lastModified: { type: Date, default: Date.now },
	groupBookingAvailable: { type: Boolean, default: false, width: 'small' },
});

// Production.schema.pre('save', function (next) {
// 	this.wasNew = this.isNew;
// 	next();
// });

// Production.schema.post('save', function () {
// 	if (this.wasNew) {
// 		this.sendNotificationEmail();
// 	}
// });

// Production.schema.methods.sendNotificationEmail = function (callback) {
// 	if (typeof callback !== 'function') {
// 		callback = function () {};
// 	}
// 	var Production = this;
// 	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
// 		if (err) return callback(err);
// 		new keystone.Email({
// 			templateExt: 'hbs',
// 			templateEngine: require('express-handlebars'),
// 			templateName: 'production-notification',
// 		}).send({
// 			to: admins,
// 			from: {
// 				name: 'Ensemblr',
// 				email: 'contact@ensemblr.co',
// 			},
// 			subject: 'New Production for Ensemblr',
// 			Production: Production,
// 		}, callback);
// 	});
// };

Production.defaultSort = '-createdAt';
Production.defaultColumns = 'name, productionType, createdAt';
Production.register();
