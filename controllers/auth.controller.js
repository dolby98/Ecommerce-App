// Controller logic for all CRUD queries for User/Admin authprizations

const db = require('../models');
const config = require("../config/auth.config");

const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

const User = db.User;
const Role = db.Role;


//Register/Sign Up Controller

// exports.register = async (req,res)=>{
//     console.log(req.body);
//     // console.log(db);
//     await User.create({
//         username:req.body.username,
//         email:req.body.email,
//         password:bcrypt.hashSync(req.body.password,10),
//         mobile:req.body.mobile
//     }).then(userResp=>{
//         console.log(userResp);
//         console.log("User created");
//         console.log(req.body);
//         if(req.body.roles){
//             console.log("Inside If");
//             Role.findAll({
//                 where:{
//                     name:{
//                         [Op.or] : req.body.roles
//                     }
//                 }
//             }).then(roles=>{
//                 console.log("*******Roles*********");
//                 console.log(roles);
//                 userResp.setRoles(roles).then(resp=>{
//                     res.status(201).send("User succesfully created");    
//                 });
//                 console.log("Where am I");
//             }).catch(err=>{
//                 console.log(err);
//                 res.status(500).send({
//                     message:err.message
//                 });
//             });
//         }
//         else{ //default role-> 1-customer
//             userResp.setRoles([1]).then(resp=>{
//                 res.status(201).send("User has succesfully created");
//             })
//         }
        
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).send({
//             message:err.message
//         });
//     });
// }

exports.register = async (req,res)=>{
    console.log(req.body);
    let resp,roles;
    // console.log(db);
    try{
        userResp = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10),
            mobile:req.body.mobile
        });

        if(req.body.roles){
            console.log("Inside If");

            roles = await Role.findAll({
                where:{
                    name:{
                        [Op.or] : req.body.roles
                    }
                }
            }); 
            console.log("*******Roles*********");

            resp = await userResp.setRoles(roles);
            res.status(201).send("User succesfully created");
            
        }
        else{
            resp = await userResp.setRoles([1]);
            res.status(201).send("User has succesfully created");
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message:err.message
        });
    }
}


// Login/Sign In Controller

exports.login = async (req,res)=>{
    await User.findOne({
        where:{
            username : req.body.username
        }
    }).then(async userResp=>{
        if(!userResp){
            return res.status(404).send({
                message : "User not found"
            })
        }
        
        
        var isValidPassword = bcrypt.compareSync(req.body.password,userResp.password);
        
        if(!isValidPassword){
            return res.status(401).send({
                message : "Invalid Password"
            })
        }

        console.log(isValidPassword);
        
        var token = await jwt.sign(
            {id:userResp.username},
            config.secret,
            {expiresIn: 3600}
        );
        
        console.log(token);

        var authorities = [];
        await userResp.getRoles().then(roles=>{
            console.log("******Inside add roles to resp*****");
            console.log(roles);
            for(let i=0; i<roles.length; i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            console.log(authorities);
        });

        res.status(200).send({
            id : userResp.username,
            username : userResp.username,
            email : userResp.email,
            roles : authorities,
            mobile : userResp.mobile,
            accessToken : token
        });
        
    }).catch(err=>{
        res.status(500).send({
            message:err.message
        });
    });
}