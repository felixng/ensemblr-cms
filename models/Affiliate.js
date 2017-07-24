var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Affiliate Model
 * =============
 */

var Affiliate = new keystone.List('Affiliate', {
	singular: 'Affiliate',
	plural: 'Affiliates',
	map: { name: 'product_name' },
    autokey: { path: 'slug', from: 'product_name', unique: true },
    defaultSort: '-lastUpdated',
});

Affiliate.add({
	product_name: { type: String, required: true },
	description: { type: String },
	merchant_image_url: { type: Types.Url, },
	aw_thumb_url: { type: Types.Url, },
	currency: { type: String },
	search_price: { type: Number, },
	display_price: { type: String },
	aw_deep_link: { type: Types.Url, },
	// openingNight: { type: Types.Date, },
	// bookingUntil: { type: Types.Date, },
	// closing: { type: Types.Date, },
	// twitter: { type: String, width: 'small' },
	// overrideTwitter: { type: Boolean, default: false, width: 'small' },
	// facebook: { type: String, width: 'small' },
	// createdAt: { type: Date, default: Date.now },
	// lastModified: { type: Date, default: Date.now },
	// groupBookingAvailable: { type: Boolean, default: false, width: 'small' },
});

// Affiliate.schema.pre('save', function (next) {
// 	this.wasNew = this.isNew;
// 	next();
// });

// Affiliate.schema.post('save', function () {
// 	if (this.wasNew) {
// 		this.sendNotificationEmail();
// 	}
// });

// Affiliate.schema.methods.sendNotificationEmail = function (callback) {
// 	if (typeof callback !== 'function') {
// 		callback = function () {};
// 	}
// 	var Affiliate = this;
// 	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
// 		if (err) return callback(err);
// 		new keystone.Email({
// 			templateExt: 'hbs',
// 			templateEngine: require('express-handlebars'),
// 			templateName: 'Affiliate-notification',
// 		}).send({
// 			to: admins,
// 			from: {
// 				name: 'Ensemblr',
// 				email: 'contact@ensemblr.co',
// 			},
// 			subject: 'New Affiliate for Ensemblr',
// 			Affiliate: Affiliate,
// 		}, callback);
// 	});
// };

Affiliate.defaultSort = '-createdAt';
Affiliate.defaultColumns = 'product_name, display_price';
Affiliate.register();
