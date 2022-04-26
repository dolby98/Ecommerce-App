// Controller logic for all CRUD queries for Category

const db = require('../models');

const Category = db.Category;


//Create and save new Category
exports.create = (req,res)=>{
    console.log(req.body);
    //Validating the request
    // if(!req.body.name){
    //     res.status(400).send({
    //         message:"Name of category can not be empty"
    //     });
    //     return;
    // }

    //If valid request then we add category to our database Category
    const category = {
        name: req.body.name,
        description: req.body.description
    }

    Category.create(category).then(response=>{
        console.log(`category name: [${response} got inserted in db]`);
        res.status(201).send(response);
    }).catch(err=>{
        console.log(`Error occured: [${err} while inserting category into db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//Update an existing category
exports.update = (req,res)=>{
    
    //Validating the request
    // if(!req.body.name){
    //     res.status(400).send({
    //         message:"Name of category can not be empty"
    //     });
    //     return;
    // }
    
    //If valid request then we update category to our database Category
    const category = {
        name: req.body.name,
        description: req.body.description
    }

    const categoryId = req.params.id;

    Category.update(category,{
        where:{
            id:categoryId
        }
    }).then((response)=>{
        console.log(`category name: [${response} got updated in db]`);
        res.status(200).send("Successfully updated");
    }).catch((err)=>{
        console.log(`category name: [${err} while updating in db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//To delete a category
exports._delete = (req,res)=>{
    
    const categoryId = req.params.id;
    
    Category.destroy({
        where:{
            id: categoryId
        }
    }).then(response=>{
        console.log(`category name: [${response} got deleted in db]`);
        res.status(200).send("Succesfullly deleted");
    }).catch(err=>{
        console.log(`category name: [${err} while deleting from db]`);
        res.status(500).send({
            message:"Error occured while storing data in DB"
        });
    });
}

//Get a category info based on its ID
exports.findOne = (req,res)=>{

    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(500).send({
            message:"Error occured while fetching category data for the category id from DB"
        });
    });
}


//get category info for all attributes where a column vakue matches given attribute
exports.findAll = (req,res)=>{
    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where:{
                name: categoryName
            }
        })
    }
    else{
        promise = Category.findAll();
    }

    promise.then(response=>{
        console.log(response);
        console.log("HI");
        res.status(200).json(response);
    }).catch(err=>{
        res.status(500).send({
            message:"Error occured while fetching category data for all category by name of category from DB"
        });
    });
}
