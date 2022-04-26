//It will all API route to go to the controller for logic handling of API

// const app = require('../app.js');

const cartController = require('../controllers/cart.controller.js');
const {authJWT} = require('../middlewares')

module.exports = function(app){

    //POST to create Cart
    
    app.post('/ecomm/api/v1/cart', [authJWT.verifyToken], cartController.create)

    //PUT to update Cart
    app.put('/ecomm/api/v1/cart', [authJWT.verifyToken], cartController.update);

    // //DELETE to delete the category
    // app.delete('/ecomm/api/v1/categories/:id',[authJWT.verifyToken, authJWT.isAdmin], categoryController._delete);

    // GET to get sll products in cart of user
    app.get('/ecomm/api/v1/cart', [authJWT.verifyToken], cartController.getCartDetails);

    // //GET data for all category having query option {name}
    // app.get('/ecomm/api/v1/categories', categoryController.findAll);

}
