const db = require('../models');

const Category = db.Category;

const validateCategoryRequest = (req,res,next)=>{

    if(!req.body.name){
        res.status(400).send({
            message:"Name of category can not be empty"
        });
        return;
    }
    next();
}

const validateproductRequestByCreate = async (req,res,next)=>{
    
    if(!req.body.name || !req.body.price){
        console.log("******Inside name checks*****");
        res.status(400).send({
            message:"Name or price of product can not be empty"
        });
        return;
    }

    if(req.body.categoryId){ //If categoryId is provided
        console.log("******Inside id checks*****");
        const isCategoryValid = await Category.findByPk(req.body.categoryId).then(response=>{
            if(!response){
                console.log("******Inside invalid id checks*****");
                res.status(400).send({ //If categoryId is not valid
                    message:`Category Id is not a valid value : ${req.body.categoryId}`
                });
                return false;
            }
            return true;
            //If category id passed is correct so next middleware part
        });
        if(!isCategoryValid){
            return;
        }
        
    }
    else{ //Category Id is not provided
        console.log("******Inside blank id checks*****");
        res.status(400).send({
            message:"Category Id of product can not be empty"
        });
        return;
    }

    if(req.body.price<=0){
        console.log("******Inside negative checks*****");
        res.status(400).send({
            message: "Price cannot be 0 or lesser than 0"
        });
        return;
    }

    next();
}

const validateproductRequestByUpdate = async (req,res,next)=>{
    
    if(!req.body.name || !req.body.price){
        console.log("******Inside name checks*****");
        res.status(400).send({
            message:"Name or price of product can not be empty"
        });
        return;
    }

    if(req.params.id){ //If categoryId is provided
        console.log("******Inside id checks*****");
        const isCategoryValid = await Category.findByPk(req.params.id).then(response=>{
            if(!response){
                console.log("******Inside invalid id checks*****");
                res.status(400).send({ //If categoryId is not valid
                    message:`Category Id is not a valid value : ${req.params.id}`
                });
                return false;
            }
            return true;
            // next(); //category id passed is correct so next middleware part
        });
        if(!isCategoryValid){
            return;
        }
        
    }
    else{ //Category Id is not provided
        console.log("******Inside blank id checks*****");
        res.status(400).send({
            message:"Category Id of product can not be empty"
        });
        return;
    }

    if(req.body.price<=0){
        console.log("******Inside negative checks*****");
        res.status(400).send({
            message: "Price cannot be 0 or lesser than 0"
        });
        return;
    }

    next();
}

const validateCategoryRequestInParams = async (req,res,next)=>{
    const categoryID = req.params.categoryID;
    console.log(categoryID);
    if(categoryID){ //If categoryId is provided
        await Category.findByPk(categoryID).then(response=>{
            if(!response){
                res.status(400).send({ //If categoryId is not valid
                    message:`Category Id is not a valid value : ${categoryID}`
                });
                return;
            }
            next(); //category id passed is correct so next middleware part
        }).catch(err=>{
            res.status(500).send({
                message:"Some internal error occured"
            })
        })
    }
    else{
        res.status(400).send({
            message: `Category Id is not available`
        })
        return;
    }
}

module.exports = {validateCategoryRequest, validateproductRequestByCreate, validateCategoryRequestInParams, validateproductRequestByUpdate};
