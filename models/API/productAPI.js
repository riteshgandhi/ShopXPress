/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Product APIs
 * @version:        1 
 */

const mongoClient = require('../dbhelpers/mongodb-connect');
const productModel = mongoClient.getProductModel();

/**
 * Get product record by id
 * @param {prodyct id} id 
 * @param {err, product} callback 
 */
const getByID = (id, callback) => {
	productModel.findById(id, (err, product) => {
		if (err) {
            callback(err, null);
        } else {
            if (product) {
                callback(null, product);
            } else {
                let err = new Error("Product not found");
                callback(err, null);
            }
        }
	});
};

/**
 * Add new product
 * @param {string} productName 
 * @param {string} productDescription 
 * @param {string} imagePath 
 * @param {number} productPrice 
 * @param {number} productQuantity 
 * @param {err} callback 
 */
const add = (productName, productDescription, imagePath, 
    productPrice, productQuantity, callback) => {
    let product = new productModel();
    fillModel(product, productName, productDescription, imagePath, 
        productPrice, productQuantity, (err) => {
        if (err) {
            callback(err);
        } else {
            save(product, (err) => {
                callback(err);
            });
        }
    });
};

/**
 * Update existing product
 * @param {product id} productID 
 * @param {string} productName 
 * @param {string} productDescription 
 * @param {string} imagePath 
 * @param {number} productPrice 
 * @param {number} productQuantity 
 * @param {err} callback 
 */
const update = (productID, productName, productDescription, imagePath, productPrice, productQuantity, callback) => {
    getByID(productID, (err, product) => {
        if (err) {
            callback(err);
        } else {
            fillModel(product, productName, productDescription, imagePath, 
                productPrice, productQuantity, (err) => {
                if (err) {
                    callback(err);
                } else {
                    save(product, (err) => {
                        callback(err);
                    });
                }
            });
        }
    });
};

/**
 * delete product
 * @param {product id} id 
 * @param {err} callback 
 */
const remove = (id, callback) => {
    getByID(id, (err, product) => {
        if (err) {
            callback(err);
        } else {
            product.remove((err) => {
                callback(err);
            });
        }
    });
};

/**
 * 
 * @param {productModel} model 
 * @param {string} productName 
 * @param {string} productDescription 
 * @param {string} imagePath 
 * @param {number} productPrice 
 * @param {number} productQuantity 
 */
const fillModel = (model, productName, productDescription, imagePath, 
    productPrice, productQuantity, callback) => {
    let err = null;
    try {
        model.productName = productName;
        model.productDescription = productDescription;
        model.imagePath = imagePath,
        model.productPrice = productPrice;
        model.productQuantity = productQuantity;
    } catch (error) {
        err = error;            
    }
    callback(err);
}

/**
 * Saves the productModel
 * @param {productModel} model 
 * @param {err} callback 
 */
const save = (model, callback) => {
	model.save((err) => {
        callback(err);
	});
};

/**
 * returns the populated product list 
 * @param {data} products 
 */
const fillProductList = (products) => {
    return products.map((product) => {
        return {
            id: product.id,
            productName: product.productName,
            productDescription: product.productDescription,
            imagePath: product.imagePath,
            productPrice: product.productPrice,
            productQuantity: product.productQuantity
        }
    });
}

/**
 * Gets the list of all products
 * @param {err, products} callback 
 */
const getAllProducts = (callback) => {
	productModel.find({}, (err, products) => {
        if (err) {
            callback(err, null);
        } else {
            let results = fillProductList(products);
            callback(null, results);
        };
	});
};

/**
 * Gets the list of products by name 
 * @param {complete or part of } productName 
 * @param {err, products} callback 
 */
const getProductsByName = (productName, callback) => {
    productModel.find({productName: { $regex: '.*' + productName + '.*', $options: 'i' }}, (err, products) => {
        if (err) {
            callback(err, null);
        } else {
            let results = fillProductList(products);
            callback(null, results);
        };
	});
};

/**
 * Gets products by name or description
 * @param {complete or part of product name or description} searchText 
 * @param {err, products} callback 
 */
const search = (searchText, callback) => {
    let expr1 = {productName: { $regex: '.*' + searchText + '.*', $options: 'i' }};
    let expr2 = {productDescription: { $regex: '.*' + searchText + '.*', $options: 'i' }};
    productModel.find({$or: [expr1, expr2]}, (err, products) => {
        if (err) {
            callback(err, null);
        } else {
            let results = fillProductList(products);
            callback(null, results);
        };
    });
};

/**
 * Gets list of products by Price Range
 * @param {number} startRange 
 * @param {number} endRange 
 * @param {err, products} callback 
 */
const getProductsByPriceRange = (startRange, endRange, callback) => {
	productModel.find({
        productPrice : { $gte :  startRange},
        productPrice : { $lte :  endRange}}, (err, products) => {
        if (err) {
            callback(err, null);
        } else {
            let results = fillProductList(products);
            callback(null, results);
        };
	});
};


module.exports = {
    add,
    update,
    remove,
    getByID,
    getAllProducts,
    getProductsByName,
    getProductsByPriceRange,
    search
}