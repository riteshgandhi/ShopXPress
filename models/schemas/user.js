/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    User Schema
 * @version:        1 
 */

const Schema  = require('mongoose').Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String
});

module.exports = userSchema;