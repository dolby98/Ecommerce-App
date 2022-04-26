const db = require('../models');


const User = db.User;



const checkDuplicateUsernameOrEmailorMobile = async (req,res,next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;

    if(!username){
        res.status(400).send({
            message:"username cannot be empty"
        });
        return;
    }

    const isUserAlreadyPresent = await User.findByPk(username).then(userResp=>{
        if(userResp){
            res.status(409).send({
                message:"username already exists"
            });
            return true;
        }
        return false;
    });
    if(isUserAlreadyPresent){
        return;
    }

    if(!email){
        res.status(400).send({
            message:"email cannot be empty"
        });
        return;
    }

    console.log("****About to check email*****");
    const isEmailAlreadyPresent = await User.findOne({
        where:
        {
            email:email
        }
    }).then(userResp=>{
        if(userResp){
            res.status(409).send({
                message:"Email already exists"
            });
            return true;
        }
        return false;
    });
    if(isEmailAlreadyPresent){
        return;
    }



    if(!password){
        res.status(400).send({
            message:"password cannot be empty"
        });
        return;
    }

    if(!mobile){
        res.status(400).send({
            message:"mobile cannot be empty"
        });
        return;
    }

    const isMobileAlreadyPresent = await User.findOne({
        where:
        {
            mobile:mobile
        }
    }).then(userResp=>{
        if(userResp){
            res.status(409).send({
                message:"Mobile number already exists"
            });
            return true;
        }
        return false;
    });
    if(isMobileAlreadyPresent){
        return;
    }

    next();
    
}

const checkIfRolesExists = async (req,res,next)=>{
    
    if(req.body.roles){
        
        for(let role of req.body.roles){
            console.log("***Checking inside exits role middleware&*****");
            const isNotRole = await db.Role.findOne({
                where:{
                    name : role
                }
            }).then(roleResp=>{
                if(!roleResp){
                    res.status(400).send({
                        message : "Role does not exist : " + role
                    });
                    return true;
                }
                return false;
            });
            if(isNotRole){
                return;
            }
        }
    }

    next();

}

module.exports = {checkDuplicateUsernameOrEmailorMobile, checkIfRolesExists};