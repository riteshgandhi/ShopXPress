/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Order APIs
 * @version:        1 
 */

const mongoClient = require('../dbhelpers/mongodb-connect');
const orderModel = mongoClient.getOrderModel();        // get orderModel
const userAPI = require('../API/userAPI');
const productAPI = require('../API/productAPI');

const submit = (currentUser, shoppingCart, callback) => {
    let order = new orderModel({
        orderDate: new Date(),
        user: currentUser,
        shoppingCart: shoppingCart
    });
	order.save((err) => {
		if (!err) {
            // update inventory
            for (let item in shoppingCart.cartItems) {
                let cartItem = shoppingCart.cartItems[item];
                //get product
                productAPI.getByID(cartItem.productID, (err, product) => {
                    if (!err) {
                        // update quantity
                        product.productQuantity -= cartItem.quantity;
                        product.save((err) => {
                            if (err) {
                                callback(err);
                            }
                        });
                    }
                });
            }
        }
        callback(err);
	});
};

const userOrders = (userID, callback) => {
    let results = null;
    let userDisplayName = null;
    userAPI.getByID(userID, (err, user) => {
        if (!err) {
            userDisplayName = user.firstName + ' ' + user.lastName;
            orderModel.find({user: userID},
                (err, userOrders) => {
                    if (!err) {
                        results = userOrders.map((userOrder) => {
                            return {
                                orderID: userOrder._id,
                                orderDate: userOrder.orderDate,
                                orderItems: userOrder.shoppingCart,
                            }
                        });
                        callback(err, results, userDisplayName);
                    }
            });
        }
    });
};

module.exports = {
    submit,
    userOrders
}
