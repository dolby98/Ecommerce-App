// Controller logic for all CRUD queries for Product


const parseOData = require("odata-sequelize");
const db = require('../models');
const sequelize = require('sequelize');

const Product = db.Product;


//Create and save new Product into a Category
exports.create = (req,res)=>{
    console.log(req.body);
    //Validating the request
    // if(!req.body.name || !req.body.price){
    //     res.status(400).send({
    //         message:"Name or price of product can not be empty"
    //     });
    //     return;
    // }

    //If valid request then we add product to our database Products
    const product = {
        name: req.body.name,
        description: req.body.description,
        price : req.body.price,
        categoryId: req.body.categoryId
    }

    Product.create(product).then(response=>{
        console.log(response);
        console.log(`Product name: [${response} got inserted in db]`);
        res.status(201).send(response);
    }).catch(err=>{
        console.log(err);
        console.log(`Error occured: [${err} while inserting category into db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//Update an existing category
exports.update = (req,res)=>{
    
    //Validating the request
    // if(!req.body.name || !req.body.price){
    //     res.status(400).send({
    //         message:"Name or price of product can not be empty"
    //     });
    //     return;
    // }
    
    //If valid request then we update category to our database Category
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId
    }

    const productId = req.params.id;

    Product.update(product,{
        where:{
            id:productId
        }
    }).then((response)=>{
        console.log(`product name: [${response} got updated in db]`);
        res.status(200).send("Successfully updated");
    }).catch((err)=>{
        console.log(`product name: [${err} while updating in db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//To delete a category
exports._delete = (req,res)=>{
    
    const productId = req.params.id;
    
    Product.destroy({
        where:{
            id: productId
        }
    }).then(response=>{
        console.log(`product name: [${response} got deleted in db]`);
        res.status(200).send("Succesfullly deleted");
    }).catch(err=>{
        console.log(`product name: [${err} while deleting from db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//Get a category info based on its ID
exports.findOne = (req,res)=>{

    const productId = req.params.id;

    Product.findByPk(productId).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(500).send({
            message:"Error occured while fetching product data for the product id from DB"
        });
    });
}


//get category info for all attributes where a column vakue matches given attribute
exports.findAll = (req,res)=>{
    console.log("****I am query*****");
    
    const formedQuery = decodeURI(req.url.split("?")[1]);
    console.log(formedQuery);
    const query = parseOData(formedQuery,sequelize);
    let promise;
    
    promise = Product.findAll(query);

    // let productName = req.query.name;
    // let promise;
    // if(productName){
    //     promise = Product.findAll({
    //         where:{
    //             name: productName
    //         }
    //     })
    // }
    // else{
    //     promise = Product.findAll();
    // }

    promise.then(response=>{
        console.log(response);
        console.log("HI");
        res.status(200).json(response);
    }).catch(err=>{
        res.status(500).send({
            message:"Error occured while fetching product data for all category by name of product from DB"
        });
    });
}

exports.getProductsByCategory = (req,res)=>{

    const categoryID = req.params.categoryID;
    console.log(categoryID);
    Product.findAll({
        where:{
            categoryId: categoryID
        }
    }).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        console.log(err);
        res.status(500).send({
            message:"Some internal server error occured while fetching all products for the category"
        })
    })

}
