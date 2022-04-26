const config = require("../config/auth.config");
const db = require('../models');


const User = db.User;


const jwt = require("jsonwebtoken");
//verify the Token

const verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    // ["Authorization"]

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        });
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            console.log(err);
            return res.status(401).send({
                message : "Unauthorized"
            });
        }
        console.log(decoded);
        req.userId = decoded.id;
        console.log("***Hello from upper function****");
        console.log(req.userId);
        next();
    });
};


const isAdmin = (req,res,next)=>{
    console.log("**************************************");
    console.log(req.userId);
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            
            for(let i=0; i<roles.length; i++){
                console.log(roles[i].name);
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Require Admin Roles"
            });

            return;
        });
    });
}

const authJWT = {verifyToken, isAdmin};

module.exports = authJWT;
