const models = require('../../../models');
const authController = require('../../../controllers/auth.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const User = models.User;
const Role = models.Role;
const newUser = require('../mockdata/newUser.json');
const bcrypt = require('bcrypt');
const config = require("../../../config/auth.config");
const jwt = require('jsonwebtoken');
// Tests for signup Method 

// 1.1 Test when signup is successful when user provides role
// 1.2 Test when signup is successful when user not provides role
// 2.1 Test when signup fails when user provides inexistent role

beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
});

describe("Tests for sign up method of auth controller", ()=>{

    it("Successfull signup when user not provides any role", async ()=>{

        req.body = newUser.user2;

        const resFromCreate = {
            setRoles:async()=> Promise.resolve()
        }

        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(()=>Promise.resolve(resFromCreate));
        
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(()=>Promise.resolve());

        await authController.register(req,res); //need to wait for register to complete

        await expect(spyOnCreate).toHaveBeenCalled();

        await expect(spyOnFindAll).not.toHaveBeenCalled();
        
        await expect(User.create).toHaveBeenCalled();
        
        await expect(Role.findAll).not.toHaveBeenCalled();

        console.log(res.send.mock);

        expect(res.status).toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith("User has succesfully created");
        
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it("Successfull signup when user provides role", async ()=>{
        //defining a variable so that it does not render again and again.

        req.body = newUser.user1;
        
        const resFromCreate = {
            setRoles:async()=> Promise.resolve()
        }

        console.log(resFromCreate);
        
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(()=>Promise.resolve(resFromCreate));
        
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(()=>Promise.resolve());
        console.log(res.status.mock);
        await authController.register(req,res); //need to wait for register to complete
        //validating if the test is passing successfully or not
        
        // await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        
        await expect(spyOnCreate).toHaveBeenCalled();
        
        await expect(User.create).toHaveBeenCalled();
        
        await expect(Role.findAll).toHaveBeenCalled();
        
        console.log(res.send.mock);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith("User succesfully created");
        
        expect(res.status).toHaveBeenCalledWith(201);
        
        
    });


    console.log("Going to second test");

    it("Failed signup for internal error in Create User", async()=>{

        let req = mockRequest();
        let res = mockResponse();
        req.body = newUser.user3;
        
        const resFromCreate = {
            setRoles:async()=> Promise.resolve()
        }
        
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(()=>Promise.reject(Error("Error occured")));
        
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(()=>Promise.resolve());
        // console.log(res.status.mock);
        await authController.register(req,res); //need to wait for register to complete
        //validating if the test is passing successfully or not
        
        // await expect(spyOnCreate).toHaveBeenCalled();
        // await expect(spyOnFindAll).toHaveBeenCalled();
        
        await expect(spyOnCreate).toHaveBeenCalled();
        
        await expect(User.create).toHaveBeenCalled();
        
        // await expect(Role.findAll).toHaveBeenCalled();
        
        // console.log(res.send.mock);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith({
            message : "Error occured"
        });
        
        expect(res.status).toHaveBeenCalledWith(500);

    });

    it("Failed signup for internal error in Find roles", async()=>{

        let req = mockRequest();
        let res = mockResponse();
        req.body = newUser.user1;
        
        const resFromCreate = {
            setRoles:async()=> Promise.resolve()
        }
        
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(()=>Promise.resolve(resFromCreate));
        
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(()=>Promise.reject(Error("Error occured")));
        // console.log(res.status.mock);
        await authController.register(req,res); //need to wait for register to complete
        //validating if the test is passing successfully or not
        
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        
        await expect(spyOnCreate).toHaveBeenCalled();
        
        await expect(User.create).toHaveBeenCalled();
        
        await expect(Role.findAll).toHaveBeenCalled();
        
        // console.log(res.send.mock);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith({
            message : "Error occured"
        });
        
        expect(res.status).toHaveBeenCalledWith(500);

    });

    
});


// describe("Tests for sign in method of auth controller", ()=>{

//     it("Successfull signin", async ()=>{

//         req.body = newUser.user4;

//         queryParam = {
//             where:{
//                 username : req.body.username
//             }
//         }

//         const resFromFindOne = {
//             email : "testUser@gmail.com",
//             username : req.body.username,
//             mobile : 98766666,
//             password : bcrypt.hashSync(newUser.user4.password,10),
//             getRoles:async()=> Promise.resolve([
//                 {
//                     name : "admin"
//                 },
//                 {
//                     name : "user"
//                 }
//             ])
//         };

//         var token = await jwt.sign(
//             {id:req.body.username},
//             config.secret,
//             {expiresIn: 3600}
//         );

//         const spyOnfindOne = jest.spyOn(User, 'findOne').mockImplementation((queryParam)=>Promise.resolve(resFromFindOne));
    
//         await authController.login(req,res); //need to wait for register to complete

//         await expect(spyOnfindOne).toHaveBeenCalled();
//         await expect(User.findOne).toHaveBeenCalled();
//         await expect(User.findOne).toHaveBeenCalledTimes(1);

//         console.log(res.send.mock);

//         expect(res.send).toHaveBeenCalled();

//         expect(res.status).toHaveBeenCalled();
        
//         expect(res.send).toHaveBeenCalledWith({
//             id : req.body.username,
//             email : "testUser@gmail.com",
//             username : req.body.username,
//             roles : ["ROLE_ADMIN","ROLE_USER"],
//             mobile : 98766666,
//             accessToken : token
//         });
        
//         expect(res.status).toHaveBeenCalledWith(200);
//     });

//     it("Error signin Invalid user", async ()=>{

//         req.body = newUser.user4;

//         queryParam = {
//             where:{
//                 username : req.body.username
//             }
//         }

//         const spyOnfindOne = jest.spyOn(User, 'findOne').mockImplementation((queryParam)=>Promise.resolve(null));
    
//         await authController.login(req,res); //need to wait for register to complete

//         await expect(spyOnfindOne).toHaveBeenCalled();
//         await expect(User.findOne).toHaveBeenCalled();
//         // await expect(User.findOne).toHaveBeenCalledTimes(1);

//         console.log(res.send.mock);

//         expect(res.send).toHaveBeenCalled();

//         expect(res.status).toHaveBeenCalled();
        
//         expect(res.send).toHaveBeenCalledWith({
//             message : "User not found"
//         });
        
//         expect(res.status).toHaveBeenCalledWith(404);
//     });

//     it("Error signin invalid password", async ()=>{

//         req.body = newUser.user4;
//         queryParam = {
//             where:{
//                 username : req.body.username
//             }
//         }

//         const resFromFindOne = {
//             username : newUser.user4.username,
//             password : bcrypt.hashSync(newUser.user4.password,10)
//         };

//         const spyOnfindOne = jest.spyOn(User, 'findOne').mockImplementation((queryParam)=>Promise.resolve(resFromFindOne));
//         req.body.password = "wrong-password";
//         await authController.login(req,res); //need to wait for register to complete

//         await expect(spyOnfindOne).toHaveBeenCalled();
//         await expect(User.findOne).toHaveBeenCalled();

//         console.log(res.send.mock);

//         expect(res.send).toHaveBeenCalled();

//         expect(res.status).toHaveBeenCalled();
        
//         expect(res.send).toHaveBeenCalledWith({
//             message : "Invalid Password"
//         });
        
//         expect(res.status).toHaveBeenCalledWith(401);
//     });

//     it("Error signin catch", async ()=>{

//         req.body = newUser.user4;
//         queryParam = {
//             where:{
//                 username : req.body.username
//             }
//         }

//         const spyOnfindOne = jest.spyOn(User, 'findOne').mockImplementation((queryParam)=>Promise.reject(Error("Error occured")));

//         await authController.login(req,res); //need to wait for register to complete

//         await expect(spyOnfindOne).toHaveBeenCalled();
//         await expect(User.findOne).toHaveBeenCalled();

//         console.log(res.send.mock);

//         expect(res.send).toHaveBeenCalled();

//         expect(res.status).toHaveBeenCalled();
        
//         expect(res.send).toHaveBeenCalledWith({
//             message : "Error occured"
//         });
        
//         expect(res.status).toHaveBeenCalledWith(500);
//     });
// })

