// Controller logic for all CRUD queries for cart

const db = require('../models');

const Cart = db.Cart;
const User = db.User;
const Product = db.Product;
//create and save cart details

exports.create = (req,res)=>{
    //check userId(username) of person to create/modify cart
    const cart = {
        userUsername : req.userId, //we are fetching that in middleware

    }

    //Finds if a cart for user exists else creates a cart
    Cart.findOrCreate({
        where:{
            userUsername : req.userId
        },
        defaults : {cart}
    }).then(response=>{
        console.log(`cart created for user: [${req.userId}]`);
        res.status(201).send(response);
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error occured"
        });
    })

    // Cart.create(cart).then(response=>{
    //     console.log(`cart created for user: [${req.userId}]`);
    //     res.status(201).send(response);
    // }).catch(err=>{
    //     res.status(500).send({
    //         message : "Internal Error occured"
    //     });
    // });
}

exports.update = (req,res)=>{
    //check cart id, then check products to be updated if valid then update
    console.log(req.userId);
    Cart.findOne({
        where:{
            userUsername : req.userId
        }
    }).then(cartResp=>{
        if(!cartResp){
            res.status(404).send({
                message : "Cart for the user not found"
            });
            return;
        }
        const cartId = cartResp.id;
        console.log(cartResp);
        console.log("*******cartResp********** "+cartId);
        Product.findAll({
            where:{
                id : req.body.productIds 
            }
        }).then(productList=>{
            console.log("********I am produclist*********");
            console.log(productList);
            if(productList.length==0){
                console.log("****AM i entering no products loop?*****");
                res.status(404).send({
                    message : "Products does not exist"
                });
                return;
            }
            console.log("*******beforesetProducts********** "+cartId);
            cartResp.setProducts(productList).then(async resp=>{

                let addedProducts = []
                let addedTotal = 0;
                console.log("*****Added products to cart***** "+cartId);
                await cartResp.getProducts().then(cartproducts=>{
                    console.log("*****Get all products from cart***** "+cartId);
                    console.log(cartproducts);
                    for(let i=0; i<cartproducts.length; i++){
                        addedProducts.push({
                            id : cartproducts[i].id,
                            name : cartproducts[i].name,
                            price : cartproducts[i].price
                        });
                        addedTotal += cartproducts[i].price;
                    }

                    console.log("*****Update total price to cart*****");
                    console.log(cartId);
                    Cart.update({totalPrice : addedTotal},{
                        where:{
                            id : cartId
                        }
                    });

                    console.log("*****Send success back*****");
                    console.log(cartId);
                    res.status(200).send({
                        cartId : cartId,
                        products : addedProducts,
                        totalCost : addedTotal
                    });
                });

            });

        })
    }).catch(err=>{
        res.status(500).send({
            message:"Internal server error occured"
        });
    });
}


//get all products for the user in its cart
exports.getCartDetails = (req,res)=>{

    Cart.findOne({
        where:{
            userUsername:req.userId
        }
    }).then(cartResp=>{
        if(!cartResp){
            res.status(404).send({
                message : "cart for the user not found"
            });
            return;
        }

        const cartId = cartResp.id;
        const addedProducts = [];

        cartResp.getProducts().then(cartproducts=>{

            for(let i=0; i<cartproducts.length; i++){
                addedProducts.push({
                    id : cartproducts[i].id,
                    name : cartproducts[i].name,
                    price : cartproducts[i].price
                });
                
            }
            res.status(200).send({
                cartId : cartId,
                products : addedProducts,
                cartTotal : cartResp.totalPrice
            });
        });

    }).catch(err=>{
        res.status(500).send({
            message : "Internal server error occurred"
        });
    });
    
}
