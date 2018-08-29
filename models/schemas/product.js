/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Product Schema
 * @version:        1 
 */

const Schema  = require('mongoose').Schema;

const productSchema = new Schema({
    productName: String,
    productDescription: String,
    imagePath: String,
    productPrice: Number,
    productQuantity: Number
});

module.exports = productSchema;

