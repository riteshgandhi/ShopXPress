/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Controller Class for Product
 * @version:        1 
 */

const formidable = require('formidable');				// helps in upload of the image to server
const path = require('path');							// import path
const fs = require('fs');								// import fs
const shared = require('../shared');
const productAPI = require('../models/API/productAPI');

/**
 * Method to render View to add new Product
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const add = (req, res, next) => {
	res.render('admin/newProduct', { title: "Add Product" });
};

/**
 * Method to save product details after add
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const saveNew = (req, res, next) => {
	productAPI.add(req.body.productName, req.body.productDescription, 
		req.body.imagePath, req.body.productPrice, req.body.productQuantity, (err) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			res.redirect('/product/manager');			
		}
	});
};

/**
 * Method to edit product record
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const edit = (req, res, next) => {
	let id = req.params.id;

	productAPI.getByID(id, (err, product) => {
		if (err) {
			shared.showError(res, err.message);
		} else if (!product) {
			shared.show404(res);
		} else {
			res.render('admin/editProduct',
			{
				title: "Edit Product",
				product: {
					id: product._id,
					productName: product.productName,
					productDescription: product.productDescription,
					imagePath: product.imagePath,
					productPrice: product.productPrice,
					productQuantity: product.productQuantity
				}
			});
		}
	});
};

/**
 * Method to save product record after modification 
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const saveExisting = (req, res, next) => {
	let id = req.params.id;
	productAPI.update(id, req.body.productName, req.body.productDescription, 
		req.body.imagePath, req.body.productPrice, req.body.productQuantity, (err) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			res.redirect('/product/manager');
		}
	});
};

/**
 * Method to delete products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const remove = (req, res, next) => {
	let id = req.params.id;
	productAPI.remove(id, (err) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			res.redirect('/product/manager');
		}
	});
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const productManager = (req, res, next) => {
	getProducts((err, products) => {
		if (err) {
			shared.show404(res);
		} else {
			res.render('admin/productList', { title: "Product Manager", productList: products });
		}
	});
};

/**
 * get all products
 * @param {err, products} callback 
 */
const getProducts = (callback) => {
	productAPI.getAllProducts((err, products) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, products);
		}
	});
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const search = (req, res, next) => {
	let searchText = req.params.searchText;		
	productAPI.search(searchText, (err, products) => {
		if (err) {
			shared.show404(res);
		} else {
			shared.showIndex(req, res, products);
		}		
	})
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const index = (req, res, next) => {
	getProducts((err, products) => {
		if (err) {
			shared.show404(res);
		} else {
			shared.showIndex(req, res, products);			
		}
	});
};

const uploadImage = (req, res, next) => {
	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	let productsImages = path.dirname(require.main.filename) + '\\public\\images\\products\\';
	form.uploadDir = productsImages;

	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	form.on('file', (field, file) => {
		fs.rename(file.path, path.join(productsImages, file.name), (err) => {
			if (err) {
				console.log('Error in renaming file');
			}
		});
	});

	// log any errors that occur
	form.on('error', (err) => {
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', () => {
		res.end('success');
	});

	// parse the incoming request containing the form data
	form.parse(req);
};

// module exports
module.exports = {
	add,
	edit,
	remove,
	saveNew,
	saveExisting,
	search,
	productManager,
	index,
	uploadImage,
}