/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Shopping Cart Schema
 * @version:        1 
 */

module.exports = function shoppingCart(cart) {
    this.cartItems = cart.cartItems || {};
    this.cartTotalItems = cart.cartTotalItems || 0;
    this.cartTotal = cart.cartTotal || 0;

    this.add = (product, id, qty) => {
        let cartItem = this.cartItems[id];
        if (!cartItem) {
            cartItem = this.cartItems[id] = { productID: id, productName: product.productName, quantity: Number(qty), price: 0 };
        } else {
            this.cartTotalItems = this.cartTotalItems - cartItem.quantity;
            cartItem.quantity = Number(cartItem.quantity) + Number(qty);
            this.cartTotal -= cartItem.price;
        }
        cartItem.price = product.productPrice * cartItem.quantity;
        this.cartTotalItems += cartItem.quantity;
        this.cartTotal += cartItem.price;
    };
};
