/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Mongoose Client
 * @version:        1 
 */

const credentials = require('./credentials');   // import credentials
const mongoose = require('mongoose');           // import mongoose
const product = require('../schemas/product');
const user = require('../schemas/user');
const order = require('../schemas/order');

let connection;                                 // variable to hold instance of db connection

mongoose.Promise = global.Promise;  // set promise

/**
 * Method to establish connection with MongoDB
 */
const connectDB = () => {
    // generate db connection string
    let dbUrl = `mongodb://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`;
    connection = mongoose.createConnection(dbUrl);
};

const getModel = (modelName, modelSchema) => {
    if (connection == null) connectDB();
    return connection.model(modelName, modelSchema);
};

const getProductModel = () => {
    return getModel('productModel', product);
};

const getUserModel = () => {
    return getModel('userModel', user);
};

const getOrderModel = () => {
    return getModel('orderModel', order);
};

module.exports = {
    getProductModel,
    getOrderModel,
    getUserModel
};