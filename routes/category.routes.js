//It will all API route to go to the controller for logic handling of API

// const app = require('../app.js');

const categoryController = require('../controllers/category.controller.js');
const {requestValidator, authJWT} = require('../middlewares')

module.exports = function(app){

    //POST to create category
    
    app.post('/ecomm/api/v1/categories', [authJWT.verifyToken, authJWT.isAdmin, requestValidator.validateCategoryRequest], categoryController.create)

    //PUT to update category
    app.put('/ecomm/api/v1/categories/:id', [authJWT.verifyToken, authJWT.isAdmin, requestValidator.validateCategoryRequest], categoryController.update);

    //DELETE to delete the category
    app.delete('/ecomm/api/v1/categories/:id',[authJWT.verifyToken, authJWT.isAdmin], categoryController._delete);

    //GET to get data based on id
    app.get('/ecomm/api/v1/categories/:id', categoryController.findOne);

    //GET data for all category having query option {name}
    app.get('/ecomm/api/v1/categories', categoryController.findAll);

}
