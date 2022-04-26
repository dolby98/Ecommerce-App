const authController = require("../controllers/auth.controller.js");
const { verifyRegister } = require("../middlewares");


module.exports = (app)=>{
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next();

    });

    app.post('/ecomm/api/v1/auth/login', authController.login);
    app.post('/ecomm/api/v1/auth/register',[verifyRegister.checkDuplicateUsernameOrEmailorMobile, verifyRegister.checkIfRolesExists], authController.register);
}