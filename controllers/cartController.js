/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Controller Class for Shopping Cart
 * @version:        1 
 */

const shared = require('../shared');
const cartAPI = require('../models/API/cartAPI');

/**
 * Method to render View to view the cart
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const view = (req, res, next) => {
    let shoppingCart = shared.getCurrentCart(req);
    res.render('cart/viewCart', { title: "Shopping Cart", cart: shoppingCart });
};

/**
 * Method to add items to cart
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const add = (req, res, next) => {
    let id = req.params.id;
    let newQuantity = req.params.quantity;
    let shoppingCart = shared.getCurrentCart(req);
    cartAPI.add(id, shoppingCart, newQuantity, (err, product) => {
        if (err) {
            shared.logFlashError(req, `Unable to added product to the cart. Error: ${err.message}`);
        } else {
            req.session.currentCart = shoppingCart;
            shared.logFlashSuccess(req, `Product ${product.productName} added to the cart`);
        }
        shared.redirectHome(res);
    });
};

const remove = (req, res, next) => {
    let id = req.params.id;
    let shoppingCart = shared.getCurrentCart(req);
    cartAPI.remove(id, shoppingCart, (err) => {
        if (err) {
            shared.showError(res, err.message);
        } else {
            req.session.currentCart = shoppingCart;
        }
    });
    res.redirect('/cart/view');
};

const removeAll = (req, res, next) => {
    shared.clearCart(req);
    shared.redirectHome(res);
};

const forceSignIn = (req, res, next) => {
    req.session.forceSignIn = true;
    res.redirect('/user/signin');
};

module.exports = {
    add,
    remove,
    removeAll,
    view,
    forceSignIn
};