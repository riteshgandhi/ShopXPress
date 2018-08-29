/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Routes configuration
 * @version:        1 
 */

const express = require('express');
const router = express.Router();

// import controllers 
const productController = require('./controllers/productController');
const productExportController = require('./controllers/productExportController');
const userController = require('./controllers/userController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

// This is the default route method.
router.get('/', (req, res, next) => {
    //res.redirect('/products');
    res.redirect('/index');
});

// configure routes
router.get('/index', productController.index);

router.get('/product/manager', productController.productManager);
router.get('/product/search/:searchText', productController.search);
router.get('/product/add', productController.add);
router.post('/product/add', productController.saveNew);
router.get('/product/edit/:id', productController.edit);
router.post('/product/edit/:id', productController.saveExisting);
router.get('/product/delete/:id', productController.remove);
router.post('/product/uploadimage', productController.uploadImage)

router.get('/product/export/json', productExportController.exportJSON);
router.get('/product/export/xml', productExportController.exportXML);
router.get('/product/export/json/:name', productExportController.exportByNameJSON);
router.get('/product/export/xml/:name', productExportController.exportByNameXML);
router.get('/product/export/json/start/:start/end/:end', productExportController.exportByPriceRangeJSON);
router.get('/product/export/xml/start/:start/end/:end', productExportController.exportByPriceRangeXML);

router.get('/user/manager', userController.userManager);
router.get('/user/create', userController.showCreateUser);
router.post('/user/create', userController.create);
router.get('/user/signin', userController.showSignin);
router.post('/user/signin', userController.signIn);
router.get('/user/signout', userController.signOut);
router.get('/user/orders/:id', orderController.userOrders);

router.get('/cart/add/:id/qty/:quantity', cartController.add);
router.get('/cart/remove/:id', cartController.remove);
router.get('/cart/removeAll', cartController.removeAll);
router.get('/cart/view', cartController.view);
router.get('/cart/signin', cartController.forceSignIn);
router.get('/cart/checkout', orderController.submitOrder);

// export router
module.exports = router;
