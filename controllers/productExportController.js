/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Controller Class for Product Data Export functionalities
 * @version:        1 
 */

const js2xmlparser = require("js2xmlparser");			// helps in export of array in XML format
const productAPI = require('../models/API/productAPI');
const shared = require('../shared');

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
const exportJSON = (req, res, next) => {
	exportProductList('json', res);
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const exportXML = (req, res, next) => {
	exportProductList('xml', res);
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const exportByNameJSON = (req, res, next) => {
	exportProductListByName('json', req, res);
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const exportByNameXML = (req, res, next) => {
	exportProductListByName('xml', req, res);
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const exportByPriceRangeJSON = (req, res, next) => {
	exportProductListByRange('json', req, res);
};

/**
 * Method to list all Products
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const exportByPriceRangeXML = (req, res, next) => {
	exportProductListByRange('xml', req, res);
};

const exportProductList = (format, res) => {
	getProducts((err, products) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			if (format == 'json') {
				exportData('json', products, res);
			} else if (format == 'xml') {
				exportData('xml', products, res);
			}
		}
	});
};

const exportProductListByName = (format, req, res) => {
	let productName = req.params.name;

	productAPI.getProductsByName(productName, (err, products) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			if (format == 'json') {
				exportData('json', products, res);
			} else if (format == 'xml') {
				exportData('xml', products, res);
			}
		}
	});
};

const exportProductListByRange = (format, req, res) => {
	let startRange = req.params.start;
	let endRange = req.params.end;

	productAPI.getProductsByPriceRange(startRange, endRange, (err, products) => {
		if (err) {
			shared.showError(res, err.message);
		} else {
			if (format == 'json') {
				exportData('json', products, res);
			} else if (format == 'xml') {
				exportData('xml', products, res);
			}
		}
	});
};

const exportData = (format, data, res) => {
	if (format == "xml") {
		let productXML = js2xmlparser.parse("products", data)
		res.type('application/xml');
		res.send(productXML);
	} else if (format == "json") {
		// res.type('application/json');
		res.json(data);
	}
};

module.exports = {
    exportJSON,
    exportXML,
    exportByNameJSON,
    exportByNameXML,
    exportByPriceRangeJSON,
    exportByPriceRangeXML
};

