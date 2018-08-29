/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Order Schema
 * @version:        1 
 */

const Schema  = require('mongoose').Schema;

const orderSchema = new Schema({
    orderDate: Date,
    user: {type: Schema.Types.ObjectId, ref: 'userModel'},
    shoppingCart: {type: Object, required: true}
});

module.exports = orderSchema;