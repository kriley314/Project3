//Dependencies
// =======================================================
const Product = require('../models/product.js');

//Routes
// =======================================================
module.exports = (app) => {

	//adding sequelize code to get all products and return them as JSON
	app.get('/api/all', function(req, res) {
		Product.findAll({}).then(function(result) {
			res.json(result);
		});
	});

	//adding sequelize code to get specific item and return it as JSON
	app.get('/api/:name', function(req, res) {
		Product.findAll({
			where: {
				route_name: req.params.name
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.get('/api/:gender', function(req, res) {
		Product.findAll({
			where: {
				gender: req.params.gender
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	// Add sequelize code to create a product
	app.post("/api/new", function(req, res) {
	Product.create({
	  product_name: req.body.product_name,
	  route_name: req.body.route_name,
	  product_kind: req.body.product_kind,
	  gender: req.body.gender,
	  images: req.body.images,
	  price: req.body.price,
	  stock_quantity: req.body.stock_quantity
	})
	.then(function() {
	  res.end();
	});
	});

	// Add sequelize code to delete a product
	app.post("/api/delete", function(req, res) {
	Product.destroy({
	  where: {
	    id: req.body.id
	  }
	}).then(function() {
	  res.end();
	});
	});
}