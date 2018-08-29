/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Controller Class for Order
 * @version:        1 
 */

const shared = require('../shared');
const orderAPI = require('../models/API/orderAPI');

const submitOrder = (req, res, next) => {
    let shoppingCart = shared.getCurrentCart(req);
    orderAPI.submit(req.session.currentUser, shoppingCart, (err) => {
        if (err) {
            shared.logFlashError(req, err.message);
        } else {
            shared.clearCart(req);
            shared.logFlashSuccess(req, `Order placed successfully. Order Total: ${shared.formatAmount(shoppingCart.cartTotal)}`);
            shared.redirectHome(res);
        }
    });
};

const userOrders = (req, res,  next) => {
    orderAPI.userOrders(req.params.id, (err, results, userDisplayName) => {
        if (err) {
            shared.showError(res, err.message);
        } else {
            res.render('admin/orderList', { title: "Customer Orders", orderList: results, custName: userDisplayName});
        }
    });
};

module.exports = {
    submitOrder,
    userOrders,
    userOrders
};