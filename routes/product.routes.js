//It will all API route to go to the controller for logic handling of API for Products

// const app = require('../app.js');

const productController = require('../controllers/product.controller.js');
const {requestValidator, authJWT} = require('../middlewares');

module.exports = function(app){

    //POST to create category
    app.post('/ecomm/api/v1/products',[authJWT.verifyToken, authJWT.isAdmin, requestValidator.validateproductRequestByCreate], productController.create)

    //PUT to update category
    app.put('/ecomm/api/v1/products/:id',[authJWT.verifyToken, authJWT.isAdmin, requestValidator.validateproductRequestByUpdate], productController.update);

    //DELETE to delete the category
    app.delete('/ecomm/api/v1/products/:id',[authJWT.verifyToken, authJWT.isAdmin], productController._delete);

    //GET to get data based on id
    app.get('/ecomm/api/v1/products/:id', productController.findOne);

    //GET data for all category having query option {name}
    app.get('/ecomm/api/v1/products', productController.findAll);

    //GET all products of a category ID
    app.get('/ecomm/api/v1/products/category/:categoryID/products',[requestValidator.validateCategoryRequestInParams], productController.getProductsByCategory);

}
