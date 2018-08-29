/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Shopping Cart APIs
 * @version:        1 
 */

const productAPI = require('./productAPI');

const add = (id, shoppingCart, newQuantity, callback) => {
    productAPI.getByID(id, (err, product) => {
        if (!err) {
            // check the stock
            let totalCartQuantity = Number(newQuantity);
            if (shoppingCart.cartTotalItems > 0) {
                let cartItem = shoppingCart.cartItems[id];
                if (cartItem) {
                    totalCartQuantity += cartItem.quantity;
                }
            }
            if (Number(product.productQuantity) < Number(totalCartQuantity)) {
                err = new Error(`Sorry. There is not enough quantity for Product ${product.productName} in stock`);
            } else {
                shoppingCart.add(product, id, newQuantity);
            }
        }
        callback(err, product);
    });
};

const remove = (id, shoppingCart, callback) => {
    let err = null;
    try {
        if (shoppingCart.cartTotalItems > 0) {
            let cartItem = shoppingCart.cartItems[id];
            if (cartItem) {
                shoppingCart.cartTotalItems -= cartItem.quantity;
                shoppingCart.cartTotal -= cartItem.price;
                delete shoppingCart.cartItems[id];
                cartItem = null;
            }
        } else {
            err = new Error('There are no items in the cart');
        }
    } catch (error) {
        err = error;        
    }
    callback(err);
};

module.exports = {
    add,
    remove
};